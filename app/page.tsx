import { Container } from "@/components/layout/container";
import { ResearchArchive } from "@/components/content/research-archive";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { PillarIcon, type PillarIconName } from "@/components/ui/pillar-icon";
import { Text } from "@/components/ui/text";
import { getPublicResearch } from "@/lib/content/research";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Independent, founder-led cybersecurity engineering and research for consequential environments.",
  pathname: "/",
  title: "Aston Cyber",
});

const focusAreas = [
  {
    description:
      "Our primary focus is financial services, with selected work for other organizations where security decisions carry significant operational, financial, or regulatory consequences.",
    icon: "people",
    title: "Consequential environments",
  },
  {
    description:
      "Work is narrowed to a specific identity, cloud, platform, architecture, automation, control, or high-risk workflow outcome before an engagement begins.",
    icon: "search",
    title: "Bounded engineering",
  },
  {
    description:
      "Matt Aston materially participates in every engagement. Recommendations remain independent of vendor commissions, resale incentives, and paid referral arrangements.",
    icon: "prism",
    title: "Founder accountability",
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
            Independent. Founder-led. Evidence-driven.
          </Text>
          <Heading level={1} variant="hero">
            Cybersecurity engineering for consequential decisions
          </Heading>
          <Text className="text-foreground-secondary" variant="lead">
            Aston Cyber is an independent, founder-led cybersecurity engineering
            and research firm serving financial services and other organizations
            where security decisions carry consequential operational, financial,
            or regulatory risk.
          </Text>
          <div className="cluster page-introduction-actions">
            <Link href="/offerings" variant="standalone">
              Explore Offerings
            </Link>
            <Link href="/research" variant="standalone">
              Review Research
            </Link>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="principles-title">
        <Container className="stack-lg">
          <div className="section-heading-row">
            <Heading id="principles-title" level={2}>
              Focused work. Direct accountability.
            </Heading>
            <Link href="/about" variant="standalone">
              Learn About Aston Cyber
            </Link>
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
                Research as evidence
              </Heading>
              <Link href="/research" variant="standalone">
                Review Research
              </Link>
            </div>
            <ResearchArchive items={featured} variant="featured" />
          </Container>
        </Section>
      ) : null}

      <Section aria-labelledby="contact-title">
        <Container className="surface-raised contact-band">
          <Heading id="contact-title" level={2}>
            Start with a defined problem
          </Heading>
          <Link href="/contact" variant="standalone">
            Contact Aston Cyber
          </Link>
        </Container>
      </Section>
    </>
  );
}
