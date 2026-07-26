import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Callout } from "@/components/content/callout";
import { ResearchDetail } from "@/components/content/research-detail";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import {
  evaluateResearchBody,
  getPublicResearch,
  getPublicResearchBySlug,
} from "@/lib/content/research";

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

  return {
    title: item.metadata.title,
    description: item.metadata.summary,
  };
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

  return (
    <Container className="research-page">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/research", label: "Research" },
          { label: item.metadata.title },
        ]}
      />
      <ResearchDetail item={item}>
        <Content components={{ Callout }} />
      </ResearchDetail>
    </Container>
  );
}
