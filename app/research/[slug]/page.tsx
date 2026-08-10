import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Callout } from "@/components/content/callout";
import { ResearchDetail } from "@/components/content/research-detail";
import {
  ResearchMdxHeading,
  ResearchMdxSubheading,
} from "@/components/content/research-outline";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import {
  evaluateResearchBody,
  getPublicResearch,
  getPublicResearchBySlug,
} from "@/lib/content/research";
import { researchHeadings } from "@/lib/content/headings";
import {
  absoluteSiteUrl,
  createPageMetadata,
  founderId,
  founderProfileUrl,
  siteOrigin,
} from "@/lib/site-metadata";

type ResearchPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const dynamicParams = false;

export async function generateStaticParams() {
  const research = await getPublicResearch();
  return research.map((item) => ({ slug: item.metadata.slug }));
}

export async function generateMetadata({
  params,
}: ResearchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getPublicResearchBySlug(slug);
  if (!item) {
    return {};
  }

  return createPageMetadata({
    description: item.metadata.summary,
    pathname: `/research/${item.metadata.slug}`,
    title: item.metadata.title,
    type: "article",
  });
}

export default async function ResearchDetailPage({
  params,
}: ResearchPageProps) {
  const { slug } = await params;
  const item = await getPublicResearchBySlug(slug);
  if (!item) {
    notFound();
  }

  const { Content } = await evaluateResearchBody(item);
  const headings = researchHeadings(item.body);
  const canonical = absoluteSiteUrl(`/research/${item.metadata.slug}`);

  return (
    <Container className="research-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "ResearchArticle",
          author: item.authors.map((author) => ({
            ...(author.id === "matthew-t-aston"
              ? { "@id": founderId, url: founderProfileUrl }
              : {}),
            "@type": "Person",
            affiliation: author.affiliation,
            name: author.name,
          })),
          dateModified: item.metadata.updated_at ?? item.metadata.published_at,
          datePublished: item.metadata.published_at,
          description: item.metadata.summary,
          headline: item.metadata.title,
          inLanguage: "en-US",
          isAccessibleForFree: true,
          keywords: item.metadata.keywords.join(", "),
          mainEntityOfPage: canonical,
          publisher: { "@id": `${siteOrigin}/#organization` },
          url: canonical,
          version: item.metadata.revision,
        }}
      />
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/research", label: "Research" },
          { label: item.metadata.title },
        ]}
      />
      <ResearchDetail headings={headings} item={item}>
        <Content
          components={{
            Callout,
            h2: ResearchMdxHeading,
            h3: ResearchMdxSubheading,
          }}
        />
      </ResearchDetail>
    </Container>
  );
}
