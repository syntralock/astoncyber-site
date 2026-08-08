import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { getPublicResearchTopics } from "@/lib/content/research";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description: "Browse published Aston Cyber research by topic.",
  pathname: "/research/topics",
  title: "Research topics",
});

export default async function ResearchTopicsPage() {
  const topics = await getPublicResearchTopics();

  return (
    <Container className="research-page">
      <Breadcrumbs
        items={[
          { href: "/", label: "Home" },
          { href: "/research", label: "Research" },
          { label: "Topics" },
        ]}
      />
      <header className="institutional-page-header stack-md">
        <Text className="text-accent" variant="eyebrow">
          Research
        </Text>
        <Heading level={1}>Research topics</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          Statically generated topic views for approved public research.
        </Text>
      </header>
      <ul className="research-topic-list">
        {topics.map(({ items, topic }) => (
          <li className="surface-base stack-sm" key={topic.id}>
            <Heading level={2} variant="h3">
              <Link href={`/research/topics/${topic.id}`}>{topic.label}</Link>
            </Heading>
            <Text className="text-foreground-secondary">
              {items.length} {items.length === 1 ? "report" : "reports"}
            </Text>
          </li>
        ))}
      </ul>
    </Container>
  );
}
