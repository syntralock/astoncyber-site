import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { beforeEach, describe, expect, it } from "vitest";

import { generateResearchRss } from "@/lib/content/generated";
import {
  getPublicLabBySlug,
  getPublicLabs,
  getPublicLabStaticParams,
  loadLabCollection,
} from "@/lib/content/labs";
import {
  isOpenSourceLicense,
  resourceMediaTypes,
  validateRepositoryUrl,
} from "@/lib/content/policies";
import {
  getPublicProjectBySlug,
  getPublicProjects,
  getPublicProjectStaticParams,
  loadProjectCollection,
  resolvePublicProjectRelationships,
} from "@/lib/content/projects";
import {
  getPublicResearch,
  getPublicResearchBySlug,
  loadResearchCollection,
} from "@/lib/content/research";
import { loadContentRepository } from "@/lib/content/repository";
import {
  labMetadataSchema,
  licenseIdentifierSchema,
  projectMetadataSchema,
  resourceSchema,
} from "@/lib/content/schema";

const publicResearch = `---
title: Public research fixture
slug: public-research
summary: Test-only public research.
research_type: technical-report
status: published
visibility: public
published_at: 2026-07-01
authors:
  - aston-cyber
contributors: []
topics:
  - secure-systems
tags:
  - validation
featured: false
disclosure_status: not-applicable
citation:
  label: Public research fixture
  publisher: Aston Cyber
related_projects:
  - public-project
related_labs:
  - public-lab
---

# Public research fixture
`;

const validProject = `---
title: Public Project fixture
slug: public-project
summary: Test-only Project metadata.
visibility: public
status: completed
published_at: 2026-07-02
completed_at: 2026-07-01
contributors:
  - aston-cyber
topics:
  - secure-systems
tags:
  - validation
technologies:
  - typescript
repository_url: https://github.com/aston-cyber/example
project_url: https://example.com/project
license: MIT
resources:
  - label: Project notes
    path: /downloads/projects/public-project/notes.pdf
    media_type: application/pdf
related_research:
  - public-research
related_projects: []
related_labs:
  - public-lab
featured: false
---

# Public Project fixture
`;

const validLab = `---
title: Public Lab fixture
slug: public-lab
summary: Test-only Lab metadata.
visibility: public
maturity: experimental
published_at: 2026-07-03
contributors:
  - aston-cyber
topics:
  - secure-systems
tags:
  - validation
technologies:
  - typescript
repository_url: https://gitlab.com/aston-cyber/example
license: Apache-2.0
resources:
  - label: Lab image
    path: /downloads/labs/public-lab/diagram.png
    media_type: image/png
related_research:
  - public-research
related_projects:
  - public-project
related_labs: []
featured: false
---

# Public Lab fixture
`;

let contentRoot: string;
let publicRoot: string;

async function writeTestRepository(
  overrides: {
    labs?: Readonly<Record<string, string>>;
    projects?: Readonly<Record<string, string>>;
    research?: Readonly<Record<string, string>>;
    technologies?: string;
  } = {},
) {
  const collections = {
    labs: overrides.labs ?? { "public-lab.mdx": validLab },
    projects: overrides.projects ?? { "public-project.mdx": validProject },
    research: overrides.research ?? { "public-research.mdx": publicResearch },
  };
  const referencesRoot = path.join(contentRoot, "references");
  await Promise.all([
    mkdir(referencesRoot, { recursive: true }),
    mkdir(path.join(publicRoot, "downloads/projects/public-project"), {
      recursive: true,
    }),
    mkdir(path.join(publicRoot, "downloads/labs/public-lab"), {
      recursive: true,
    }),
    ...Object.keys(collections).map((collection) =>
      mkdir(path.join(contentRoot, collection), { recursive: true }),
    ),
  ]);
  await Promise.all([
    writeFile(
      path.join(referencesRoot, "authors.yml"),
      "- id: aston-cyber\n  name: Aston Cyber\n",
    ),
    writeFile(
      path.join(referencesRoot, "topics.yml"),
      "- id: secure-systems\n  label: Secure systems\n",
    ),
    writeFile(
      path.join(referencesRoot, "tags.yml"),
      "- id: validation\n  label: Validation\n",
    ),
    writeFile(
      path.join(referencesRoot, "technologies.yml"),
      overrides.technologies ?? "- id: typescript\n  name: TypeScript\n",
    ),
    writeFile(
      path.join(publicRoot, "downloads/projects/public-project/notes.pdf"),
      "test",
    ),
    writeFile(
      path.join(publicRoot, "downloads/labs/public-lab/diagram.png"),
      "test",
    ),
    ...Object.entries(collections).flatMap(([collection, sources]) =>
      Object.entries(sources).map(([fileName, source]) =>
        writeFile(path.join(contentRoot, collection, fileName), source),
      ),
    ),
  ]);
}

beforeEach(async () => {
  contentRoot = await mkdtemp(path.join(tmpdir(), "aston-phase8-content-"));
  publicRoot = await mkdtemp(path.join(tmpdir(), "aston-phase8-public-"));
});

describe("Phase 8 schemas and controlled registries", () => {
  it("accepts the separate valid Project and Lab models", () => {
    const project = projectMetadataSchema.parse({
      completed_at: "2026-07-01",
      contributors: ["aston-cyber"],
      featured: false,
      license: "MIT",
      published_at: "2026-07-02",
      related_labs: [],
      related_projects: [],
      related_research: [],
      resources: [],
      slug: "valid-project",
      status: "completed",
      summary: "Valid Project.",
      tags: ["validation"],
      technologies: ["typescript"],
      title: "Valid Project",
      topics: ["secure-systems"],
      visibility: "public",
    });
    const lab = labMetadataSchema.parse({
      contributors: ["aston-cyber"],
      featured: false,
      license: "MIT",
      maturity: "prototype",
      published_at: "2026-07-02",
      related_labs: [],
      related_projects: [],
      related_research: [],
      resources: [],
      slug: "valid-lab",
      summary: "Valid Lab.",
      tags: ["validation"],
      technologies: ["typescript"],
      title: "Valid Lab",
      topics: ["secure-systems"],
      visibility: "public",
    });

    expect(project.status).toBe("completed");
    expect(lab.maturity).toBe("prototype");
  });

  it.each([
    ["fixture visibility", { visibility: "fixture" }],
    ["invalid status", { status: "prototype" }],
    ["invalid slug", { slug: "Invalid Project" }],
    ["invalid date", { published_at: "July 2" }],
    ["unknown field", { unknown: true }],
  ])("rejects Project %s", (_name, change) => {
    const metadata = {
      completed_at: "2026-07-01",
      contributors: ["aston-cyber"],
      slug: "valid-project",
      status: "completed",
      summary: "Valid Project.",
      tags: ["validation"],
      title: "Valid Project",
      topics: ["secure-systems"],
      visibility: "public",
      ...change,
    };
    expect(() => projectMetadataSchema.parse(metadata)).toThrow();
  });

  it.each([
    ["fixture visibility", { visibility: "fixture" }],
    ["invalid maturity", { maturity: "completed" }],
    ["invalid slug", { slug: "Invalid Lab" }],
    ["invalid date", { published_at: "July 2" }],
    ["unknown field", { unknown: true }],
  ])("rejects Lab %s", (_name, change) => {
    const metadata = {
      contributors: ["aston-cyber"],
      maturity: "experimental",
      published_at: "2026-07-02",
      slug: "valid-lab",
      summary: "Valid Lab.",
      tags: ["validation"],
      title: "Valid Lab",
      topics: ["secure-systems"],
      visibility: "public",
      ...change,
    };
    expect(() => labMetadataSchema.parse(metadata)).toThrow();
  });

  it("rejects missing fields and duplicate controlled lists", () => {
    expect(() =>
      projectMetadataSchema.parse({
        contributors: ["aston-cyber", "aston-cyber"],
        slug: "invalid-project",
        status: "active",
        summary: "Missing title.",
        tags: ["validation"],
        topics: ["secure-systems"],
        visibility: "draft",
      }),
    ).toThrow();
  });

  it("derives open-source classification from the license registry", () => {
    expect(isOpenSourceLicense("MIT")).toBe(true);
    expect(isOpenSourceLicense("proprietary")).toBe(false);
    expect(isOpenSourceLicense("unlicensed")).toBe(false);
    expect(() => licenseIdentifierSchema.parse("unknown")).toThrow();
  });
});

describe("repository and resource validation", () => {
  it.each([
    "https://github.com/aston-cyber/project",
    "https://gitlab.com/aston-cyber/project",
  ])("accepts approved repository URL %s", (url) => {
    expect(validateRepositoryUrl(url)).toBe(true);
  });

  it.each([
    "http://github.com/aston-cyber/project",
    "https://user:secret@github.com/aston-cyber/project",
    "https://github.com:8443/aston-cyber/project",
    "/aston-cyber/project",
    "//github.com/aston-cyber/project",
    "https://github.com.example.com/project",
    "https://notgithub.com/project",
    "not a url",
  ])("rejects repository URL %s", (url) => {
    expect(validateRepositoryUrl(url)).toBe(false);
  });

  it("keeps the directly hosted resource allowlist exact", () => {
    expect(resourceMediaTypes).toEqual({
      ".csv": "text/csv",
      ".gif": "image/gif",
      ".jpeg": "image/jpeg",
      ".jpg": "image/jpeg",
      ".json": "application/json",
      ".md": "text/markdown",
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".txt": "text/plain",
      ".webp": "image/webp",
      ".xml": "application/xml",
      ".yaml": "application/yaml",
      ".yml": "application/yaml",
    });
  });

  it.each([
    ["/downloads/projects/test/file.pdf", "application/pdf"],
    ["/downloads/labs/test/image.png", "image/png"],
    ["/downloads/labs/test/image.jpeg", "image/jpeg"],
  ])("accepts approved resource %s", (resourcePath, mediaType) => {
    expect(() =>
      resourceSchema.parse({
        label: "Approved resource",
        media_type: mediaType,
        path: resourcePath,
      }),
    ).not.toThrow();
  });

  it.each([
    ["/downloads/labs/test/image.svg", "image/svg+xml"],
    ["/downloads/projects/test/archive.zip", "application/zip"],
    [
      "/downloads/projects/test/tool.exe",
      "application/vnd.microsoft.portable-executable",
    ],
    ["/downloads/projects/test/run.sh", "text/x-shellscript"],
    ["/downloads/projects/test/installer.msi", "application/octet-stream"],
    ["/downloads/projects/test/library.dll", "application/octet-stream"],
    ["/downloads/projects/test/package.deb", "application/octet-stream"],
    ["/downloads/projects/test/disk.dmg", "application/octet-stream"],
    ["/downloads/projects/test/container.oci", "application/octet-stream"],
    ["/downloads/labs/test/image.png", "image/jpeg"],
    ["/downloads/labs/test/image.PNG", "image/png"],
    ["/downloads/labs/test//image.png", "image/png"],
    ["/downloads/projects/../private/file.pdf", "application/pdf"],
    ["/private/file.pdf", "application/pdf"],
  ])("rejects resource %s", (resourcePath, mediaType) => {
    expect(() =>
      resourceSchema.parse({
        label: "Rejected resource",
        media_type: mediaType,
        path: resourcePath,
      }),
    ).toThrow();
  });

  it("rejects empty resource labels and duplicate declarations", () => {
    expect(() =>
      resourceSchema.parse({
        label: " ",
        media_type: "application/pdf",
        path: "/downloads/projects/test/file.pdf",
      }),
    ).toThrow();

    expect(() =>
      projectMetadataSchema.parse({
        completed_at: "2026-07-01",
        contributors: ["aston-cyber"],
        resources: [
          {
            label: "One",
            media_type: "application/pdf",
            path: "/downloads/projects/test/file.pdf",
          },
          {
            label: "Two",
            media_type: "application/pdf",
            path: "/downloads/projects/test/file.pdf",
          },
        ],
        slug: "duplicate-resources",
        status: "completed",
        summary: "Invalid.",
        tags: ["validation"],
        title: "Duplicate resources",
        topics: ["secure-systems"],
        visibility: "draft",
      }),
    ).toThrow();
  });

  it("keeps Project and Lab resources in their matching public locations", () => {
    const common = {
      contributors: ["aston-cyber"],
      featured: false,
      published_at: "2026-07-02",
      related_labs: [],
      related_projects: [],
      related_research: [],
      slug: "wrong-resource-location",
      summary: "Invalid resource location.",
      tags: ["validation"],
      technologies: [],
      title: "Wrong resource location",
      topics: ["secure-systems"],
      visibility: "public" as const,
    };

    expect(() =>
      projectMetadataSchema.parse({
        ...common,
        resources: [
          {
            label: "Wrong collection",
            media_type: "application/pdf",
            path: "/downloads/labs/test/file.pdf",
          },
        ],
        status: "completed",
      }),
    ).toThrow(/Project download location/);

    expect(() =>
      labMetadataSchema.parse({
        ...common,
        maturity: "prototype",
        resources: [
          {
            label: "Wrong collection",
            media_type: "application/pdf",
            path: "/downloads/projects/test/file.pdf",
          },
        ],
      }),
    ).toThrow(/Lab download location/);
  });
});

describe("typed loaders, fixture isolation, and relationships", () => {
  it("loads and resolves valid Project, Lab, and Research content", async () => {
    await writeTestRepository();
    const options = { contentRoot, publicRoot };
    const [project] = await loadProjectCollection(options);
    const [lab] = await loadLabCollection(options);
    const publicProjects = await getPublicProjects(options);
    const publicLabs = await getPublicLabs(options);

    expect(project?.technologies[0]?.name).toBe("TypeScript");
    expect(lab?.contributors[0]?.name).toBe("Aston Cyber");
    expect(publicProjects[0]).not.toHaveProperty("filePath");
    expect(publicLabs[0]).not.toHaveProperty("filePath");
    expect(await getPublicLabBySlug("public-lab", options)).toBeDefined();
    expect(await getPublicProjectStaticParams(options)).toEqual([
      { slug: "public-project" },
    ]);
    expect(await getPublicLabStaticParams(options)).toEqual([
      { slug: "public-lab" },
    ]);
    expect(
      await resolvePublicProjectRelationships("public-project", options),
    ).toMatchObject({
      labs: [{ metadata: { slug: "public-lab" } }],
      research: [{ metadata: { slug: "public-research" } }],
    });
  });

  it("keeps drafts out of public lists, lookups, static data, and relationships", async () => {
    await writeTestRepository({
      projects: {
        "draft-project.mdx": validProject
          .replaceAll("public-project", "draft-project")
          .replace(
            "/downloads/projects/draft-project/notes.pdf",
            "/downloads/projects/public-project/notes.pdf",
          )
          .replace("visibility: public", "visibility: draft")
          .replace("related_labs:\n  - public-lab", "related_labs: []"),
      },
      research: {
        "public-research.mdx": publicResearch.replace(
          "related_projects:\n  - public-project",
          "related_projects: []",
        ),
      },
      labs: {
        "public-lab.mdx": validLab.replace(
          "related_projects:\n  - public-project",
          "related_projects: []",
        ),
      },
    });
    const options = { contentRoot, publicRoot };
    expect(await getPublicProjects(options)).toEqual([]);
    expect(
      await getPublicProjectBySlug("draft-project", options),
    ).toBeUndefined();
    expect(await getPublicProjectStaticParams(options)).toEqual([]);
  });

  it("loads the migrated fixture only through an explicit test root", async () => {
    const fixtureRoot = path.join(process.cwd(), "tests/fixtures/content");
    const fixture = await loadResearchCollection({ contentRoot: fixtureRoot });
    const production = await loadResearchCollection();

    expect(fixture.map((item) => item.metadata.slug)).toEqual([
      "phase-5-content-system-technical-fixture",
    ]);
    expect(production.map((item) => item.metadata.slug)).not.toContain(
      "phase-5-content-system-technical-fixture",
    );
    expect(await loadProjectCollection()).toEqual([]);
    expect(await loadLabCollection()).toEqual([]);
    await expect(
      getPublicResearchBySlug("phase-5-content-system-technical-fixture"),
    ).resolves.toBeUndefined();
    expect(await getPublicResearch()).toHaveLength(1);
  });

  it("preserves the Research-only RSS output", async () => {
    const rss = generateResearchRss(await getPublicResearch());
    expect(rss).toContain("Secure Transaction Authorization Ledger");
    expect(rss).not.toContain("<project>");
    expect(rss).not.toContain("<lab>");
  });

  it("rejects duplicate Project slugs and invalid collection placement", async () => {
    await writeTestRepository({
      projects: {
        "first.mdx": validProject,
        "second.mdx": validProject,
      },
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(/duplicate projects slug/);

    contentRoot = await mkdtemp(
      path.join(tmpdir(), "aston-invalid-placement-"),
    );
    await writeTestRepository();
    await mkdir(path.join(contentRoot, "labs", "nested"));
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(/labs collection entries must be MDX files/);
  });

  it.each([
    ["unknown contributor", "aston-cyber", "missing-contributor"],
    ["unknown topic", "secure-systems", "missing-topic"],
    ["unknown tag", "validation", "missing-tag"],
    ["unknown technology", "typescript", "missing-technology"],
    ["case-variant technology", "typescript", "TypeScript"],
    ["display-name technology", "typescript", "TypeScript Language"],
  ])("rejects %s", async (_name, from, to) => {
    await writeTestRepository({
      projects: {
        "invalid.mdx": validProject.replace(`  - ${from}`, `  - ${to}`),
      },
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(/unresolved|lowercase slug/);
  });

  it("rejects duplicate and empty technology registry identifiers", async () => {
    await writeTestRepository({
      technologies:
        "- id: typescript\n  name: TypeScript\n- id: typescript\n  name: Duplicate\n",
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(/duplicate reference id/);

    const emptyRoot = await mkdtemp(path.join(tmpdir(), "aston-empty-tech-"));
    contentRoot = emptyRoot;
    await writeTestRepository({
      technologies: '- id: " "\n  name: Invalid\n',
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow();
  });

  it.each([
    [
      "missing target",
      "related_labs:\n  - public-lab",
      "related_labs:\n  - missing-lab",
      /does not exist/,
    ],
    [
      "wrong collection",
      "related_labs:\n  - public-lab",
      "related_labs:\n  - public-research",
      /belongs to research, not labs/,
    ],
    [
      "duplicate target",
      "related_labs:\n  - public-lab",
      "related_labs:\n  - public-lab\n  - public-lab",
      /duplicate reference/,
    ],
    [
      "self reference",
      "related_projects: []",
      "related_projects:\n  - public-project",
      /must not reference itself/,
    ],
  ])("rejects relationship with %s", async (_name, from, to, message) => {
    await writeTestRepository({
      projects: { "invalid.mdx": validProject.replace(from, to) },
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(message);
  });

  it("rejects a public relationship to a draft target", async () => {
    await writeTestRepository({
      labs: {
        "draft-lab.mdx": validLab.replace(
          "visibility: public",
          "visibility: draft",
        ),
      },
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(/public content cannot reference non-public labs/);
  });

  it("rejects missing resource files", async () => {
    await writeTestRepository({
      projects: {
        "missing-resource.mdx": validProject.replace(
          "/downloads/projects/public-project/notes.pdf",
          "/downloads/projects/public-project/missing.pdf",
        ),
      },
    });
    await expect(
      loadContentRepository({ contentRoot, publicRoot }),
    ).rejects.toThrow(/resource does not exist/);
  });

  it("resolves relationships in declared deterministic order", async () => {
    const secondLab = validLab
      .replaceAll("public-lab", "second-lab")
      .replace("published_at: 2026-07-03", "published_at: 2026-07-04")
      .replace("related_projects:\n  - public-project", "related_projects: []")
      .replace(
        "/downloads/labs/second-lab/diagram.png",
        "/downloads/labs/public-lab/diagram.png",
      );
    await writeTestRepository({
      labs: {
        "public-lab.mdx": validLab,
        "second-lab.mdx": secondLab,
      },
      projects: {
        "public-project.mdx": validProject.replace(
          "related_labs:\n  - public-lab",
          "related_labs:\n  - second-lab\n  - public-lab",
        ),
      },
    });
    const relationships = await resolvePublicProjectRelationships(
      "public-project",
      { contentRoot, publicRoot },
    );
    expect(relationships?.labs.map((item) => item.metadata.slug)).toEqual([
      "second-lab",
      "public-lab",
    ]);
  });

  it("does not reference test fixture roots from production loader source", async () => {
    const source = await readFile(
      path.join(process.cwd(), "lib/content/repository.ts"),
      "utf8",
    );
    expect(source).not.toContain("tests/fixtures");
  });
});
