import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResearchArchive } from "@/components/content/research-archive";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import {
  getPublicResearchByTopic,
  getPublicResearchTopics,
} from "@/lib/content/research";
import { createPageMetadata } from "@/lib/site-metadata";

type TopicPageProps = Readonly<{
  params: Promise<{ slug: string }>;
}>;

export const dynamicParams = false;

export async function generateStaticParams() {
  const topics = await getPublicResearchTopics();
  return topics.map(({ topic }) => ({ slug: topic.id }));
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = await getPublicResearchByTopic(slug);
  if (!result) {
    return {};
  }

  return createPageMetadata({
    description: `Published Aston Cyber research about ${result.topic.label}.`,
    pathname: `/research/topics/${result.topic.id}`,
    title: `${result.topic.label} research`,
  });
}

export default async function ResearchTopicPage({ params }: TopicPageProps) {
  const { slug } = await params;
  const result = await getPublicResearchByTopic(slug);
  if (!result) {
    notFound();
  }

  return (
    <Container className="research-page">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/research", label: "Research" },
          { href: "/research/topics", label: "Topics" },
          { label: result.topic.label },
        ]}
      />
      <header className="institutional-page-header stack-md">
        <Text className="text-accent" variant="eyebrow">
          Research topic
        </Text>
        <Heading level={1}>{result.topic.label}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          Approved public research associated with this topic.
        </Text>
      </header>
      <ResearchArchive headingLevel={2} items={result.items} />
    </Container>
  );
}
