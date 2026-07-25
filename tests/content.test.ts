import { describe, expect, it } from "vitest";

import { compileSafeMdx, parseResearchSource } from "@/lib/content/mdx";

const frontMatter = `---
title: Test placeholder
slug: test-placeholder
summary: Non-production test fixture.
status: placeholder
published_at: 2026-07-25
authors:
  - Aston Cyber
topics:
  - testing
draft: true
---
`;

describe("the MDX safety boundary", () => {
  it("accepts valid placeholder metadata", () => {
    expect(parseResearchSource(`${frontMatter}\n# Test`).metadata.draft).toBe(
      true,
    );
  });

  it("rejects raw HTML", async () => {
    await expect(
      compileSafeMdx(`${frontMatter}\n<div>Unsafe HTML</div>`),
    ).rejects.toThrow(/not allowed/);
  });

  it("rejects script elements regardless of capitalization", async () => {
    await expect(
      compileSafeMdx(`${frontMatter}\n<ScRiPt>alert("unsafe")</ScRiPt>`),
    ).rejects.toThrow(/not allowed/);
  });

  it("rejects components outside the allowlist", async () => {
    await expect(compileSafeMdx(`${frontMatter}\n<Unknown />`)).rejects.toThrow(
      /not allowed/,
    );
  });

  it("rejects nested components outside the allowlist", async () => {
    await expect(
      compileSafeMdx(
        `${frontMatter}\n<Callout><Unknown>Unsafe</Unknown></Callout>`,
      ),
    ).rejects.toThrow(/not allowed/);
  });

  it.each([
    ["imports", 'import Unsafe from "./unsafe.js"\n\n# Test'],
    ["exports", "export const unsafe = true\n\n# Test"],
    ["flow expressions", "{globalThis.process}"],
    ["text expressions", "Text {globalThis.process}"],
    [
      "attribute expressions",
      "<Callout value={globalThis.process}>Test</Callout>",
    ],
    ["spread attributes", "<Callout {...globalThis.process}>Test</Callout>"],
  ])("rejects MDX %s", async (_name, body) => {
    await expect(compileSafeMdx(`${frontMatter}\n${body}`)).rejects.toThrow(
      /not allowed/,
    );
  });

  it("accepts an explicitly allowed component", async () => {
    await expect(
      compileSafeMdx(`${frontMatter}\n<Callout>Placeholder</Callout>`),
    ).resolves.toBeDefined();
  });

  it("rejects unknown metadata keys", () => {
    expect(() =>
      parseResearchSource(
        `${frontMatter.replace("draft: true", "draft: true\\nscript: unsafe")}\n# Test`,
      ),
    ).toThrow();
  });
});
