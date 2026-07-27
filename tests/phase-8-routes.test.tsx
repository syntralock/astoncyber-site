import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import LabsPage, { metadata as labsMetadata } from "@/app/labs/page";
import ProjectsPage, {
  metadata as projectsMetadata,
} from "@/app/projects/page";
import sitemap from "@/app/sitemap";
import { LabDetail } from "@/components/content/lab-detail";
import { LabCollection } from "@/components/content/lab-collection";
import { ProjectDetail } from "@/components/content/project-detail";
import { ProjectCollection } from "@/components/content/project-collection";
import { generateSiteSitemap } from "@/lib/content/generated";
import {
  evaluateLabBody,
  getPublicLabBySlug,
  getPublicLabs,
  getPublicLabStaticParams,
  metadataForPublicLab,
} from "@/lib/content/labs";
import {
  evaluateProjectBody,
  getPublicProjectBySlug,
  getPublicProjects,
  getPublicProjectStaticParams,
  metadataForPublicProject,
} from "@/lib/content/projects";
import {
  getPublicResearch,
  getPublicResearchTopics,
} from "@/lib/content/research";

const fixtureRoot = path.join(process.cwd(), "tests/fixtures/content");
const fixtureOptions = { contentRoot: fixtureRoot };

describe("Phase 8 collection routes", () => {
  it("renders factual empty Project and Lab states from production loaders", async () => {
    const projectsHtml = renderToStaticMarkup(await ProjectsPage());
    const labsHtml = renderToStaticMarkup(await LabsPage());

    expect(projectsHtml.match(/<h1/g) ?? []).toHaveLength(1);
    expect(labsHtml.match(/<h1/g) ?? []).toHaveLength(1);
    expect(projectsHtml).toContain(
      "No public Projects are currently available.",
    );
    expect(labsHtml).toContain("No public Labs are currently available.");
    expect(projectsHtml).toContain("durable bodies");
    expect(`${projectsHtml}${labsHtml}`).not.toMatch(
      /coming soon|<article|placeholder|[0-9]+ projects|[0-9]+ labs/i,
    );
    expect(`${projectsHtml}${labsHtml}`).not.toMatch(/<form|<input|<button/);
  });

  it("renders deterministic public fixture cards and excludes drafts", async () => {
    const projects = await getPublicProjects(fixtureOptions);
    const labs = await getPublicLabs(fixtureOptions);
    const projectsHtml = renderToStaticMarkup(
      <ProjectCollection items={projects} />,
    );
    const labsHtml = renderToStaticMarkup(<LabCollection items={labs} />);

    expect(projects.map((item) => item.metadata.slug)).toEqual([
      "public-project",
    ]);
    expect(labs.map((item) => item.metadata.slug)).toEqual(["public-lab"]);
    expect(projectsHtml).toContain('href="/projects/public-project"');
    expect(projectsHtml).toContain("Completed");
    expect(projectsHtml).not.toContain("draft-project");
    expect(labsHtml).toContain('href="/labs/public-lab"');
    expect(labsHtml).toContain("Experimental");
    expect(labsHtml).not.toContain("draft-lab");
  });

  it("publishes accurate collection metadata", () => {
    expect(projectsMetadata).toEqual({
      description:
        "Completed and substantially complete cybersecurity work published by Aston Cyber.",
      title: "Projects",
    });
    expect(labsMetadata).toEqual({
      description:
        "Security tools, prototypes, experiments, and creative technical work published by Aston Cyber.",
      title: "Labs",
    });
  });
});

describe("Phase 8 static detail presentation", () => {
  it("generates only public fixture parameters while production has none", async () => {
    expect(await getPublicProjectStaticParams()).toEqual([]);
    expect(await getPublicLabStaticParams()).toEqual([]);
    expect(await getPublicProjectStaticParams(fixtureOptions)).toEqual([
      { slug: "public-project" },
    ]);
    expect(await getPublicLabStaticParams(fixtureOptions)).toEqual([
      { slug: "public-lab" },
    ]);
  });

  it("renders validated Project metadata, MDX, links, and relationships", async () => {
    const [project] = await getPublicProjects(fixtureOptions);
    const [lab] = await getPublicLabs(fixtureOptions);
    if (!project || !lab) {
      throw new Error("Expected public Project and Lab test fixtures.");
    }
    const { Content } = await evaluateProjectBody(project);
    const html = renderToStaticMarkup(
      <ProjectDetail
        item={{
          ...project,
          metadata: {
            ...project.metadata,
            resources: [
              {
                label: "Project notes (PDF)",
                media_type: "application/pdf",
                path: "/downloads/projects/public-project/notes.pdf",
              },
            ],
          },
        }}
        relationships={{ labs: [lab], projects: [], research: [] }}
      >
        {createElement(Content)}
      </ProjectDetail>,
    );

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Public Project test fixture");
    expect(html).toContain("Completed");
    expect(html).toContain("2026-07-01");
    expect(html).toContain("2026-07-02");
    expect(html).toContain("Aston Cyber");
    expect(html).toContain("TypeScript");
    expect(html).toContain("View source repository");
    expect(html).toContain("Visit Project website");
    expect(html).toContain("MIT");
    expect(html).toContain("Project notes (PDF)");
    expect(html).toContain("Public Lab test fixture");
    expect(html).toContain("Project fixture body");
  });

  it("renders Lab maturity, readiness, MDX, links, and relationships", async () => {
    const [project] = await getPublicProjects(fixtureOptions);
    const [lab] = await getPublicLabs(fixtureOptions);
    if (!project || !lab) {
      throw new Error("Expected public Project and Lab test fixtures.");
    }
    const { Content } = await evaluateLabBody(lab);
    const html = renderToStaticMarkup(
      <LabDetail
        item={{
          ...lab,
          metadata: {
            ...lab.metadata,
            resources: [
              {
                label: "Lab diagram",
                media_type: "image/png",
                path: "/downloads/labs/public-lab/diagram.png",
              },
            ],
          },
        }}
        relationships={{ labs: [], projects: [project], research: [] }}
      >
        {createElement(Content)}
      </LabDetail>,
    );

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Experimental");
    expect(html).toContain("not presented as production-ready");
    expect(html).toContain("2026-07-03");
    expect(html).toContain("Aston Cyber");
    expect(html).toContain("TypeScript");
    expect(html).toContain("View source repository");
    expect(html).toContain("Apache License 2.0");
    expect(html).toContain("Lab diagram");
    expect(html).toContain("Public Project test fixture");
    expect(html).toContain("Lab fixture body");
  });

  it("omits absent optional detail sections", async () => {
    const [project] = await getPublicProjects(fixtureOptions);
    const [lab] = await getPublicLabs(fixtureOptions);
    if (!project || !lab) {
      throw new Error("Expected public Project and Lab test fixtures.");
    }
    const projectHtml = renderToStaticMarkup(
      <ProjectDetail
        item={{
          ...project,
          metadata: {
            ...project.metadata,
            license: undefined,
            project_url: undefined,
            repository_url: undefined,
          },
        }}
        relationships={{ labs: [], projects: [], research: [] }}
      />,
    );
    const labHtml = renderToStaticMarkup(
      <LabDetail
        item={{
          ...lab,
          metadata: {
            ...lab.metadata,
            license: undefined,
            repository_url: undefined,
          },
        }}
        relationships={{ labs: [], projects: [], research: [] }}
      />,
    );

    expect(projectHtml).not.toMatch(/Project links|Resources|Related work/);
    expect(labHtml).not.toMatch(/Lab links|Resources|Related work/);
  });

  it("derives detail metadata only from validated public items", async () => {
    const [project] = await getPublicProjects(fixtureOptions);
    const [lab] = await getPublicLabs(fixtureOptions);
    if (!project || !lab) {
      throw new Error("Expected public Project and Lab test fixtures.");
    }
    expect(metadataForPublicProject(project)).toEqual({
      description: project.metadata.summary,
      title: project.metadata.title,
    });
    expect(metadataForPublicLab(lab)).toEqual({
      description: lab.metadata.summary,
      title: lab.metadata.title,
    });
    expect(JSON.stringify(metadataForPublicProject(project))).not.toMatch(
      /filePath|tests\/fixtures|draft/,
    );
    expect(
      await getPublicProjectBySlug("draft-project", fixtureOptions),
    ).toBeUndefined();
    expect(
      await getPublicLabBySlug("draft-lab", fixtureOptions),
    ).toBeUndefined();
  });

  it("keeps empty-collection dynamic route files inactive", async () => {
    await expect(
      access(path.join(process.cwd(), "app/projects/[slug]/page.tsx")),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      access(path.join(process.cwd(), "app/labs/[slug]/page.tsx")),
    ).rejects.toMatchObject({ code: "ENOENT" });
  });
});

describe("Phase 8 sitemap and regression boundary", () => {
  it("adds collection routes and preserves existing public routes", async () => {
    const entries = await sitemap();
    const urls = entries.map((entry) => entry.url);

    expect(urls).toContain("https://astoncyber.com/projects/");
    expect(urls).toContain("https://astoncyber.com/labs/");
    expect(urls).toContain("https://astoncyber.com/research/");
    expect(urls).toContain(
      "https://astoncyber.com/research/secure-transaction-authorization-ledger/",
    );
    expect(urls).toContain("https://astoncyber.com/about/");
    expect(urls.join("\n")).not.toMatch(
      /writing|speaking|draft-|fixture|placeholder|sentinel|tests\/fixtures/,
    );
  });

  it("generates public Project and Lab detail sitemap entries from test-only inputs", async () => {
    const [labs, projects, research, topics] = await Promise.all([
      getPublicLabs(fixtureOptions),
      getPublicProjects(fixtureOptions),
      getPublicResearch(),
      getPublicResearchTopics(),
    ]);
    const urls = generateSiteSitemap({ labs, projects, research, topics }).map(
      (entry) => entry.url,
    );

    expect(urls).toContain("https://astoncyber.com/projects/public-project/");
    expect(urls).toContain("https://astoncyber.com/labs/public-lab/");
    expect(urls.join("\n")).not.toMatch(
      /draft-project|draft-lab|fixture|placeholder|sentinel/,
    );
  });

  it("introduces no Project/Lab Client Component or content-root bypass", async () => {
    const files = [
      "app/projects/page.tsx",
      "app/labs/page.tsx",
      "components/content/project-detail.tsx",
      "components/content/lab-detail.tsx",
    ];
    const sources = await Promise.all(
      files.map((file) => readFile(path.join(process.cwd(), file), "utf8")),
    );
    const source = sources.join("\n");

    expect(source).not.toMatch(/^["']use client["']/mu);
    expect(source).not.toMatch(/readFile|readdir|contentRoot|tests\/fixtures/);
  });
});
