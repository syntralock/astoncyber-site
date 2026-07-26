import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import ResearchDetailPage, {
  generateStaticParams as generateResearchParams,
} from "@/app/research/[slug]/page";
import ResearchPage from "@/app/research/page";
import ResearchTopicPage, {
  generateStaticParams as generateTopicParams,
} from "@/app/research/topics/[slug]/page";
import ResearchTopicsPage from "@/app/research/topics/page";
import {
  getPublicResearch,
  getPublicResearchBySlug,
  getPublicResearchByTopic,
  getPublicResearchTopics,
} from "@/lib/content/research";

const reportSlug = "secure-transaction-authorization-ledger";
const fixtureSlug = "content-system-technical-fixture";

describe("Phase 7 public research experience", () => {
  it("loads the approved report and resolves its references and artifact", async () => {
    const item = await getPublicResearchBySlug(reportSlug);

    expect(item?.metadata.status).toBe("published");
    expect(item?.metadata.visibility).toBe("public");
    expect(item?.metadata.revision).toBe("1.0");
    expect(item?.metadata.disclosure_status).toBe("not-applicable");
    expect(item?.authors).toEqual([
      {
        affiliation:
          "Master of Science in Computer Science, Cybersecurity, Troy University",
        id: "matthew-t-aston",
        name: "Matthew T. Aston",
      },
    ]);
    expect(item?.topics.map((topic) => topic.id)).toEqual([
      "transaction-authorization",
      "secure-software-design",
    ]);

    const artifact = item?.metadata.artifact;
    expect(artifact?.path).toBe(
      "/downloads/research/secure-transaction-authorization-ledger/Secure_Transaction_Authorization_Ledger_Case_Study.docx",
    );
    await expect(
      access(path.join(process.cwd(), "public", artifact?.path ?? "")),
    ).resolves.toBeUndefined();
  });

  it("generates only public research and topic parameters", async () => {
    const researchParams = await generateResearchParams();
    const topicParams = await generateTopicParams();

    expect(researchParams).toEqual([{ slug: reportSlug }]);
    expect(JSON.stringify(researchParams)).not.toContain(fixtureSlug);
    expect(topicParams).toEqual([
      { slug: "secure-software-design" },
      { slug: "transaction-authorization" },
    ]);
  });

  it("renders the research index without search or client-side filtering", async () => {
    const html = renderToStaticMarkup(await ResearchPage());

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Featured research");
    expect(html).toContain("Secure Transaction Authorization Ledger");
    expect(html).toContain('href="/research/topics"');
    expect(html).toContain("research-archive-featured");
    expect(html).not.toContain(fixtureSlug);
    expect(html).not.toMatch(/<input|<form|Search research/);
  });

  it("renders static topic indexes and URL-addressable topic results", async () => {
    const topics = await getPublicResearchTopics();
    const topic = await getPublicResearchByTopic("transaction-authorization");
    const indexHtml = renderToStaticMarkup(await ResearchTopicsPage());
    const detailHtml = renderToStaticMarkup(
      await ResearchTopicPage({
        params: Promise.resolve({ slug: "transaction-authorization" }),
      }),
    );

    expect(topics).toHaveLength(2);
    expect(topic?.items.map((item) => item.metadata.slug)).toEqual([
      reportSlug,
    ]);
    expect(indexHtml).toContain(
      'href="/research/topics/transaction-authorization"',
    );
    expect(detailHtml).toContain("Transaction authorization");
    expect(detailHtml).toContain("Secure Transaction Authorization Ledger");
    expect(detailHtml).not.toMatch(/<input|<form/);
  });

  it("renders the complete report, qualification, citation, and download", async () => {
    const html = renderToStaticMarkup(
      await ResearchDetailPage({
        params: Promise.resolve({ slug: reportSlug }),
      }),
    );

    expect(html.match(/<h1/g) ?? []).toHaveLength(1);
    expect(html).toContain("Publication note");
    expect(html).toContain(
      "It does not represent a production financial platform, legal opinion, or claim of fraud prevention effectiveness in a live institution.",
    );
    expect(html).toContain("Appendix B. Evaluation claims matrix");
    expect(html).toContain("The platform prevents wire fraud.");
    expect(html).toContain("not supported");
    expect(html).toContain("Download the original case study (DOCX)");
    expect(html).toContain("Citation");
    expect(html).not.toContain("Related research");
    expect(html).not.toContain(fixtureSlug);
  });

  it("keeps drafts and fixtures out of all public research loaders", async () => {
    const publicResearch = await getPublicResearch();

    expect(publicResearch.map((item) => item.metadata.slug)).toEqual([
      reportSlug,
    ]);
    await expect(getPublicResearchBySlug(fixtureSlug)).resolves.toBeUndefined();
  });

  it("adds no Phase 7.1 Client Component, form, or subscription surface", async () => {
    const pages = [
      renderToStaticMarkup(await ResearchPage()),
      renderToStaticMarkup(await ResearchTopicsPage()),
    ].join("");

    expect(pages).not.toMatch(/<form|<input|newsletter|subscribe|sign up/i);

    const refinedServerFiles = [
      "app/page.tsx",
      "app/mission/page.tsx",
      "app/research/page.tsx",
      "components/content/content-card.tsx",
      "components/content/research-archive.tsx",
      "components/content/research-card.tsx",
      "components/layout/institutional-page.tsx",
    ];
    const sources = await Promise.all(
      refinedServerFiles.map((file) =>
        readFile(path.join(process.cwd(), file), "utf8"),
      ),
    );
    expect(sources.join("\n")).not.toMatch(/^["']use client["']/mu);
  });
});
