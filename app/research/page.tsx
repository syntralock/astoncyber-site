import { ResearchArchive } from "@/components/content/research-archive";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { getPublicResearch } from "@/lib/content/research";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Independent cybersecurity research and technical reports from Aston Cyber, grounded in evidence, reproducible methods, and explicit limitations.",
  pathname: "/research",
  title: "Cybersecurity Research",
});

export default async function ResearchPage() {
  const research = await getPublicResearch();
  const featured = research.filter((item) => item.metadata.featured);
  const archive = research.filter((item) => !item.metadata.featured);

  return (
    <Container className="research-page">
      <Breadcrumbs
        items={[{ href: "/", label: "Home" }, { label: "Research" }]}
      />
      <header className="page-introduction research-introduction stack-md">
        <Text className="text-accent" variant="eyebrow">
          Research
        </Text>
        <Heading level={1}>Research</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          Original investigations and technical reports grounded in evidence,
          reproducible methods, and explicit limitations.
        </Text>
      </header>

      {featured.length > 0 ? (
        <section
          className="wide-feature research-feature stack-lg"
          aria-labelledby="featured-title"
        >
          <Heading id="featured-title" level={2}>
            Featured research
          </Heading>
          <ResearchArchive items={featured} variant="featured" />
        </section>
      ) : null}

      {archive.length > 0 ? (
        <section
          className="section-space stack-lg"
          aria-labelledby="archive-title"
        >
          <Heading id="archive-title" level={2}>
            Research archive
          </Heading>
          <ResearchArchive items={archive} />
        </section>
      ) : null}
    </Container>
  );
}
