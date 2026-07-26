import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { ResearchArchive } from "@/components/content/research-archive";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { PillarIcon, type PillarIconName } from "@/components/ui/pillar-icon";
import { Text } from "@/components/ui/text";
import { getPublicResearch } from "@/lib/content/research";

export const metadata: Metadata = {
  title: "Aston Cyber",
  description:
    "Aston Cyber advances cybersecurity through research, engineering, and education.",
};

const focusAreas = [
  {
    description:
      "We investigate emerging challenges, develop practical approaches, and publish knowledge that elevates our field.",
    icon: "people",
    title: "Our work",
  },
  {
    description:
      "Advance cybersecurity through thoughtful research that improves the security of modern computing.",
    icon: "search",
    title: "Vision",
  },
  {
    description:
      "Meaningful progress comes from asking better questions, building better systems, and openly sharing what we learn.",
    icon: "prism",
    title: "Research, engineering, and education",
  },
] as const satisfies readonly {
  description: string;
  icon: PillarIconName;
  title: string;
}[];

export default async function Home() {
  const research = await getPublicResearch();
  const featured = research.filter((item) => item.metadata.featured);

  return (
    <>
      <Section className="homepage-introduction">
        <Container className="page-introduction homepage-hero stack-lg">
          <Text className="text-accent" variant="eyebrow">
            Research. Engineering. Security.
          </Text>
          <Heading level={1} variant="hero">
            Advancing the practice of cybersecurity
          </Heading>
          <Text className="text-foreground-secondary" variant="lead">
            Aston Cyber is an independent cybersecurity research institution. We
            investigate emerging challenges, develop practical approaches, and
            publish knowledge that elevates our field.
          </Text>
          <div className="cluster page-introduction-actions">
            <Link href="/mission" variant="standalone">
              Read our mission
            </Link>
            <Link href="/ethos" variant="standalone">
              Explore our ethos
            </Link>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="principles-title">
        <Container className="stack-lg">
          <div className="section-introduction stack-md">
            <Heading id="principles-title" level={2}>
              Mission
            </Heading>
          </div>
          <div className="layout-three focus-grid">
            {focusAreas.map((area) => (
              <article className="focus-item stack-md" key={area.title}>
                <PillarIcon name={area.icon} />
                <Heading className="focus-item-heading" level={3}>
                  {area.title}
                </Heading>
                <Text className="text-foreground-secondary">
                  {area.description}
                </Text>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      {featured.length > 0 ? (
        <Section aria-labelledby="featured-research-title">
          <Container className="wide-feature stack-lg">
            <div className="section-heading-row">
              <Heading id="featured-research-title" level={2}>
                Featured research
              </Heading>
              <Link href="/research" variant="standalone">
                View all research
              </Link>
            </div>
            <ResearchArchive items={featured} variant="featured" />
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="contact-title">
        <Container className="surface-raised contact-band">
          <Heading id="contact-title" level={2}>
            Questions or inquiries?
          </Heading>
          <Link href="/contact" variant="standalone">
            Visit the Contact page
          </Link>
        </Container>
      </Section>
    </>
  );
}
