import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { beforeEach, describe, expect, it } from "vitest";

import { Callout } from "@/components/content/callout";
import { ResearchCard } from "@/components/content/research-card";
import { ResearchDetail } from "@/components/content/research-detail";
import {
  generateResearchRss,
  generateResearchSitemapEntries,
} from "@/lib/content/generated";
import {
  compileSafeMdx,
  evaluateSafeMdx,
  parseResearchSource,
} from "@/lib/content/mdx";
import {
  getPublicResearch,
  getPublicResearchBySlug,
  loadResearchCollection,
} from "@/lib/content/research";
import { primaryNavigation, secondaryNavigation } from "@/lib/navigation";

const fixtureSource = `---
title: Content-system technical fixture
slug: content-system-technical-fixture
summary: Non-public technical validation material.
research_type: technical-report
status: technical-validation
visibility: fixture
updated_at: 2026-07-25
authors:
  - aston-cyber
contributors:
  - aston-cyber
topics:
  - content-systems
tags:
  - technical-fixture
featured: false
citation:
  label: Content-system technical fixture
  publisher: Aston Cyber
---

# Technical validation

This fixture tests the content system.

<Callout title="Fixture">Not a publication.</Callout>
`;

const draftSource = fixtureSource
  .replaceAll("technical fixture", "draft sample")
  .replaceAll("technical-fixture", "draft-sample")
  .replace("status: technical-validation", "status: preliminary")
  .replace("visibility: fixture", "visibility: draft");

const publicSource = fixtureSource
  .replaceAll("technical fixture", "published sample")
  .replaceAll("technical-fixture", "published-sample")
  .replace("status: technical-validation", "status: published")
  .replace(
    "visibility: fixture",
    "visibility: public\npublished_at: 2026-07-24\ndisclosure_status: not-applicable",
  )
  .replace("publisher: Aston Cyber", "publisher: Aston Cyber\n  year: 2026");

let contentRoot: string;

async function writeRepository(
  sources: Readonly<Record<string, string>> = { "fixture.mdx": fixtureSource },
) {
  const researchRoot = path.join(contentRoot, "research");
  const referencesRoot = path.join(contentRoot, "references");
  await Promise.all([
    mkdir(researchRoot, { recursive: true }),
    mkdir(referencesRoot, { recursive: true }),
  ]);
  await Promise.all([
    writeFile(
      path.join(referencesRoot, "authors.yml"),
      "- id: aston-cyber\n  name: Aston Cyber\n",
    ),
    writeFile(
      path.join(referencesRoot, "topics.yml"),
      "- id: content-systems\n  label: Content systems\n",
    ),
    writeFile(
      path.join(referencesRoot, "tags.yml"),
      "- id: technical-fixture\n  label: Technical fixture\n- id: draft-sample\n  label: Draft sample\n- id: published-sample\n  label: Published sample\n",
    ),
    ...Object.entries(sources).map(([fileName, source]) =>
      writeFile(path.join(researchRoot, fileName), source),
    ),
  ]);
}

beforeEach(async () => {
  contentRoot = await mkdtemp(path.join(tmpdir(), "aston-content-"));
});

describe("research metadata and MDX safety", () => {
  it("accepts valid fixture metadata and safe MDX", async () => {
    expect(parseResearchSource(fixtureSource).metadata.visibility).toBe(
      "fixture",
    );
    await expect(compileSafeMdx(fixtureSource)).resolves.toBeDefined();
  });

  it("accepts an allowlisted static quoted string attribute", async () => {
    const source = fixtureSource.replace(
      /# Technical validation[\s\S]*$/u,
      '<Callout title="Static title">Content</Callout>',
    );
    await expect(compileSafeMdx(source)).resolves.toBeDefined();
  });

  it.each([
    ["expression-valued", "<Callout title={value}>Content</Callout>"],
    [
      "template-expression-valued",
      "<Callout title={`value`}>Content</Callout>",
    ],
    ["shorthand", "<Callout title>Content</Callout>"],
    ["spread", "<Callout {...props}>Content</Callout>"],
  ])("rejects an %s attribute", async (_name, body) => {
    const source = fixtureSource.replace(
      /# Technical validation[\s\S]*$/u,
      body,
    );
    await expect(compileSafeMdx(source)).rejects.toThrow(
      /not allowed|static quoted string/,
    );
  });

  it.each([
    ["raw HTML", "<div>Unsafe HTML</div>"],
    ["script elements", '<ScRiPt>alert("unsafe")</ScRiPt>'],
    ["unknown components", "<Unknown />"],
    ["imports", 'import Unsafe from "./unsafe.js"\n\n# Test'],
    ["exports", "export const unsafe = true\n\n# Test"],
    ["flow expressions", "{globalThis.process}"],
    ["text expressions", "Text {globalThis.process}"],
    ["unapproved attributes", '<Callout onClick="unsafe">Test</Callout>'],
  ])("rejects %s structurally", async (_name, body) => {
    const source = fixtureSource.replace(
      /# Technical validation[\s\S]*$/u,
      body,
    );
    await expect(compileSafeMdx(source)).rejects.toThrow(
      /not allowed|static quoted string/,
    );
  });

  it("rejects missing required metadata", () => {
    expect(() =>
      parseResearchSource(
        fixtureSource.replace(
          "summary: Non-public technical validation material.\n",
          "",
        ),
      ),
    ).toThrow();
  });

  it("rejects malformed dates", () => {
    expect(() =>
      parseResearchSource(publicSource.replace("2026-07-24", "July 24")),
    ).toThrow();
  });

  it("rejects invalid enum values", () => {
    expect(() =>
      parseResearchSource(
        fixtureSource.replace(
          "status: technical-validation",
          "status: unknown",
        ),
      ),
    ).toThrow();
  });

  it("rejects unknown metadata keys", () => {
    expect(() =>
      parseResearchSource(
        fixtureSource.replace(
          "featured: false",
          "featured: false\nscript: unsafe",
        ),
      ),
    ).toThrow();
  });
});

describe("the centralized research repository", () => {
  it("loads valid research and resolves every reference type", async () => {
    await writeRepository();
    const [item] = await loadResearchCollection({ contentRoot });
    expect(item).toBeDefined();
    if (!item) {
      throw new Error("Expected the fixture to load.");
    }

    expect(item.authors[0]?.name).toBe("Aston Cyber");
    expect(item.contributors[0]?.name).toBe("Aston Cyber");
    expect(item.topics[0]?.label).toBe("Content systems");
    expect(item.tags[0]?.label).toBe("Technical fixture");
  });

  it("rejects duplicate slugs with file-specific output", async () => {
    await writeRepository({
      "first.mdx": fixtureSource,
      "second.mdx": fixtureSource,
    });
    await expect(loadResearchCollection({ contentRoot })).rejects.toThrow(
      /second\.mdx: duplicate research slug/,
    );
  });

  it.each(["author", "contributor", "topic", "tag"] as const)(
    "rejects an unresolved %s reference",
    async (kind) => {
      const replacements = {
        author: [
          "  - aston-cyber\ncontributors:",
          "  - missing\ncontributors:",
        ],
        contributor: [
          "contributors:\n  - aston-cyber",
          "contributors:\n  - missing",
        ],
        topic: ["topics:\n  - content-systems", "topics:\n  - missing"],
        tag: ["tags:\n  - technical-fixture", "tags:\n  - missing"],
      } as const;
      const [from, to] = replacements[kind];
      await writeRepository({
        "unresolved.mdx": fixtureSource.replace(from, to),
      });

      await expect(loadResearchCollection({ contentRoot })).rejects.toThrow(
        new RegExp(`unresolved ${kind} reference "missing"`),
      );
    },
  );

  it("rejects invalid collection placement", async () => {
    await writeRepository();
    await mkdir(path.join(contentRoot, "research", "nested"));
    await expect(loadResearchCollection({ contentRoot })).rejects.toThrow(
      /research collection entries must be MDX files/,
    );
  });

  it("reports invalid metadata with the source file", async () => {
    await writeRepository({
      "invalid.mdx": fixtureSource.replace(
        "summary: Non-public technical validation material.\n",
        "",
      ),
    });
    await expect(loadResearchCollection({ contentRoot })).rejects.toThrow(
      /invalid\.mdx:/,
    );
  });

  it("validates publication and revision date ordering", async () => {
    await writeRepository({
      "invalid-date-order.mdx": publicSource.replace(
        "updated_at: 2026-07-25",
        "updated_at: 2026-07-23",
      ),
    });
    await expect(loadResearchCollection({ contentRoot })).rejects.toThrow(
      /updated_at must not precede published_at/,
    );
  });

  it("excludes drafts and fixtures from production-facing lookups", async () => {
    await writeRepository({
      "draft.mdx": draftSource,
      "fixture.mdx": fixtureSource,
      "public.mdx": publicSource,
    });

    const items = await getPublicResearch({ contentRoot });
    expect(items.map((item) => item.metadata.slug)).toEqual([
      "content-system-published-sample",
    ]);
    await expect(
      getPublicResearchBySlug("content-system-technical-fixture", {
        contentRoot,
      }),
    ).resolves.toBeUndefined();
    await expect(
      getPublicResearchBySlug("content-system-draft-sample", { contentRoot }),
    ).resolves.toBeUndefined();
  });

  it("includes published content alone in RSS and sitemap output", async () => {
    await writeRepository({
      "draft.mdx": draftSource,
      "fixture.mdx": fixtureSource,
      "public.mdx": publicSource,
    });
    const allItems = await loadResearchCollection({ contentRoot });
    const rss = generateResearchRss(allItems);
    const sitemap = generateResearchSitemapEntries(allItems);

    expect(rss).toContain("content-system-published-sample");
    expect(rss).not.toContain("content-system-draft-sample");
    expect(rss).not.toContain("content-system-technical-fixture");
    expect(sitemap).toHaveLength(1);
    expect(sitemap[0]?.url).toContain("content-system-published-sample");
  });

  it("keeps fixture identifiers out of centralized navigation", () => {
    const navigation = JSON.stringify([
      ...primaryNavigation,
      ...secondaryNavigation,
    ]);
    expect(navigation).not.toContain("content-system-technical-fixture");
    expect(navigation).not.toContain("fixture");
  });

  it("builds the complete non-public technical slice", async () => {
    await writeRepository();
    const [item] = await loadResearchCollection({ contentRoot });
    expect(item).toBeDefined();
    if (!item) {
      throw new Error("Expected the fixture to load.");
    }
    const { Content } = await evaluateSafeMdx(fixtureSource);
    const body = createElement(Content, { components: { Callout } });
    const card = renderToStaticMarkup(
      createElement(ResearchCard, {
        authors: item.authors.map((author) => author.name),
        dateLabel: "Validated",
        format: item.metadata.research_type,
        href: `/research/${item.metadata.slug}`,
        itemDate: item.metadata.updated_at ?? "Not published",
        status: item.metadata.status,
        summary: item.metadata.summary,
        title: item.metadata.title,
        topic: item.topics[0]?.label ?? "",
      }),
    );
    const detail = renderToStaticMarkup(
      createElement(ResearchDetail, { item }, body),
    );

    expect(card).toContain("Content-system technical fixture");
    expect(card).toContain("Validated");
    expect(detail).toContain("Technical validation");
    expect(detail).toContain("Citation");
    expect(detail).toContain("Not a publication");
  });
});
