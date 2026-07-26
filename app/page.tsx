import type { Metadata } from "next";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Aston Cyber",
  description:
    "Aston Cyber advances cybersecurity through research, engineering, and education.",
};

const areas = [
  {
    description:
      "Research creates understanding through careful questions, evidence, and honest conclusions.",
    title: "Research",
  },
  {
    description:
      "Engineering applies understanding through practical approaches and better systems.",
    title: "Engineering",
  },
  {
    description:
      "Secure systems give people the confidence to innovate, collaborate, and solve meaningful problems.",
    title: "Security",
  },
] as const;

export default function Home() {
  return (
    <>
      <Section className="homepage-introduction">
        <Container className="stack-lg">
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
          <div className="cluster">
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
        <Container className="layout-grid">
          <div className="stack-md">
            <Heading id="principles-title" level={2}>
              Research, engineering, security
            </Heading>
            <Text className="text-foreground-secondary" variant="bodyLarge">
              Each depends upon the one before it. Security creates freedom.
            </Text>
          </div>
          <div className="institutional-grid">
            {areas.map((area) => (
              <article className="surface-base stack-sm" key={area.title}>
                <Heading level={3}>{area.title}</Heading>
                <Text className="text-foreground-secondary">
                  {area.description}
                </Text>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="contact-title">
        <Container className="surface-raised institutional-callout stack-md">
          <Heading id="contact-title" level={2}>
            Contact Aston Cyber
          </Heading>
          <Text className="text-foreground-secondary">
            General inquiries and responsible disclosure use separate contact
            channels.
          </Text>
          <Link href="/contact" variant="standalone">
            View contact information
          </Link>
        </Container>
      </Section>
    </>
  );
}
