import Image from "next/image";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { PillarIcon, type PillarIconName } from "@/components/ui/pillar-icon";
import { Text } from "@/components/ui/text";
import { services } from "@/lib/services";
import { createPageMetadata, siteDescription } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  absoluteTitle: true,
  description: siteDescription,
  pathname: "/",
  title: "Aston Cyber | Systems Modernization & Business Automation",
});

const challenges = [
  "Information is entered into more than one system.",
  "Applications do not exchange the information people need.",
  "Important workflows depend on manual reminders or spreadsheets.",
  "Integrations are fragile or understood by only one person.",
  "A migration is needed, but dependencies and ownership are unclear.",
  "Existing tools are not configured around the current process.",
] as const;

const serviceIcons = [
  "prism",
  "search",
  "people",
] as const satisfies readonly PillarIconName[];

const method = [
  {
    description:
      "Learn how the organization operates, which systems the work depends on, and what is making the current situation difficult.",
    title: "Understand",
  },
  {
    description:
      "Examine systems, workflows, dependencies, risks, and viable options before recommending a direction.",
    title: "Evaluate",
  },
  {
    description:
      "Design, build, configure, integrate, migrate, automate, secure, or improve the agreed system or workflow.",
    title: "Implement",
  },
  {
    description:
      "Validate the result, document ownership and decisions, and establish a practical foundation for continued improvement.",
    title: "Improve",
  },
] as const;

const differentiators = [
  {
    description:
      "Technology is selected only after the operational need, constraints, and desired outcome are understood.",
    title: "The problem comes first",
  },
  {
    description:
      "Recommendations account for the systems, people, ownership, and maintenance required to make an improvement work.",
    title: "Practical engineering",
  },
  {
    description:
      "Security and technology risk are considered throughout the work rather than added only at the end.",
    title: "Security by design",
  },
  {
    description:
      "Important assumptions, limitations, alternatives, and ownership decisions are made clear and documented.",
    title: "Honest tradeoffs",
  },
] as const;

export default function Home() {
  return (
    <>
      <Section className="homepage-introduction">
        <Container className="homepage-hero">
          <div className="homepage-hero-copy stack-lg">
            <Text className="text-accent" variant="eyebrow">
              Systems Modernization
            </Text>
            <Heading level={1} variant="hero">
              Better Systems. Better Business.
            </Heading>
            <Text className="homepage-slogan" variant="bodyLarge">
              Modern Technology. Intelligent Operations. Secure by Design.
            </Text>
            <Text className="text-foreground-secondary" variant="lead">
              Aston Cyber helps organizations improve how they operate through
              systems modernization, application integration, automation, custom
              software, and cybersecurity engineering.
            </Text>
            <div className="cluster page-introduction-actions">
              <Link className="button-primary" href="/contact">
                Discuss Your Technology Needs
              </Link>
              <Link className="button-secondary" href="/services">
                Explore Our Services
              </Link>
            </div>
          </div>
          <figure className="homepage-hero-visual">
            <picture>
              <source
                media="(max-width: 47.99rem)"
                srcSet="/images/home/systems-modernization-hero-960.webp"
                type="image/webp"
              />
              <source
                srcSet="/images/home/systems-modernization-hero-1600.webp"
                type="image/webp"
              />
              <Image
                alt="Systems modernization connects people, applications, infrastructure, data, and processes to improve efficiency, visibility, security, and reliability"
                className="homepage-hero-image"
                height="887"
                loading="eager"
                src="/images/home/systems-modernization-hero.jpg"
                unoptimized
                width="1774"
              />
            </picture>
          </figure>
        </Container>
      </Section>

      <Section aria-labelledby="challenges-title">
        <Container className="stack-lg">
          <div className="section-introduction stack-md">
            <Text className="text-accent" variant="eyebrow">
              Common challenges
            </Text>
            <Heading id="challenges-title" level={2}>
              When systems make the work harder
            </Heading>
            <Text className="text-foreground-secondary" variant="lead">
              Technology does not have to be old to create problems. Current
              applications can still be disconnected, difficult to manage, or
              mismatched with the way the business operates.
            </Text>
          </div>
          <ul className="challenge-grid">
            {challenges.map((challenge) => (
              <li className="surface-base" key={challenge}>
                {challenge}
              </li>
            ))}
          </ul>
          <Text className="section-closing text-foreground-secondary">
            Sometimes the right answer is a new system. Often it is improving a
            process, connecting tools already owned, or correcting the way an
            existing environment is designed.
          </Text>
        </Container>
      </Section>

      <Section aria-labelledby="services-title">
        <Container className="stack-lg">
          <div className="section-heading-row">
            <div className="stack-sm">
              <Text className="text-accent" variant="eyebrow">
                How we help
              </Text>
              <Heading id="services-title" level={2}>
                Practical engineering for better operations
              </Heading>
            </div>
            <Link href="/services" variant="standalone">
              View All Services
            </Link>
          </div>
          <div className="layout-three focus-grid">
            {services.map((service, index) => (
              <article className="focus-item stack-md" key={service.slug}>
                <PillarIcon name={serviceIcons[index]!} />
                <Heading className="focus-item-heading" level={3}>
                  <Link href={`/services/${service.slug}`}>
                    {service.title}
                  </Link>
                </Heading>
                <Text className="text-foreground-secondary">
                  {service.description}
                </Text>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="method-title">
        <Container className="stack-lg">
          <div className="section-heading-row">
            <div className="stack-sm">
              <Text className="text-accent" variant="eyebrow">
                Our approach
              </Text>
              <Heading id="method-title" level={2}>
                Understand first. Improve what matters.
              </Heading>
            </div>
            <Link href="/approach" variant="standalone">
              See Our Approach
            </Link>
          </div>
          <ol className="method-grid">
            {method.map((stage, index) => (
              <li className="method-step stack-sm" key={stage.title}>
                <Text className="text-accent" variant="caption">
                  {String(index + 1).padStart(2, "0")}
                </Text>
                <Heading level={3}>{stage.title}</Heading>
                <Text className="text-foreground-secondary">
                  {stage.description}
                </Text>
              </li>
            ))}
          </ol>
          <Text className="section-closing text-foreground-secondary">
            An engagement may end with an assessment or roadmap, or continue
            through implementation, validation, documentation, and handoff. Not
            every engagement includes every stage.
          </Text>
        </Container>
      </Section>

      <Section aria-labelledby="why-title">
        <Container className="stack-lg">
          <div className="section-introduction stack-md">
            <Text className="text-accent" variant="eyebrow">
              Why Aston Cyber
            </Text>
            <Heading id="why-title" level={2}>
              Engineering decisions grounded in the business
            </Heading>
          </div>
          <div className="differentiator-grid">
            {differentiators.map((item) => (
              <article className="stack-sm" key={item.title}>
                <Heading level={3}>{item.title}</Heading>
                <Text className="text-foreground-secondary">
                  {item.description}
                </Text>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="founder-title">
        <Container className="surface-raised founder-band">
          <div className="founder-band-copy stack-md">
            <Text className="text-accent" variant="eyebrow">
              Founder-led
            </Text>
            <Heading id="founder-title" level={2}>
              Direct technical accountability
            </Heading>
            <Text>
              Aston Cyber is led by Matt Aston, a technology and cybersecurity
              engineer with experience spanning enterprise technology
              operations, cloud infrastructure, identity and access management,
              automation, software development, and technology risk.
            </Text>
            <Link href="/about" variant="standalone">
              About Aston Cyber
            </Link>
          </div>
          <figure className="founder-portrait-frame founder-portrait-frame-compact">
            <Image
              alt="Matt Aston, founder of Aston Cyber"
              className="founder-portrait"
              height="1402"
              src="/images/founder/matt-aston-portrait.jpg"
              unoptimized
              width="1122"
            />
          </figure>
        </Container>
      </Section>

      <Section aria-labelledby="contact-title">
        <Container className="surface-raised contact-band">
          <div className="stack-sm">
            <Heading id="contact-title" level={2}>
              Start with the challenge you are facing
            </Heading>
            <Text className="text-foreground-secondary">
              Tell us what is not working, what needs to change, or what
              decision you are trying to make.
            </Text>
          </div>
          <Link href="/contact" variant="standalone">
            Discuss Your Technology Needs
          </Link>
        </Container>
      </Section>
    </>
  );
}
