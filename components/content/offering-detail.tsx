import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { Offering } from "@/lib/offerings";

type OfferingDetailProps = Readonly<{ offering: Offering }>;

export function OfferingDetail({ offering }: OfferingDetailProps) {
  return (
    <Container className="offering-detail-page">
      <Breadcrumbs
        pathname={`/offerings/${offering.slug}`}
        items={[
          { href: "/", label: "Home" },
          { href: "/offerings", label: "Offerings" },
          { label: offering.title },
        ]}
      />

      <header className="offering-detail-header stack-md">
        <Text className="text-accent" variant="eyebrow">
          Offering
        </Text>
        <Heading level={1}>{offering.title}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          {offering.introduction}
        </Text>
      </header>

      <div className="offering-detail-content">
        <section
          className="offering-detail-section"
          aria-labelledby="what-title"
        >
          <Heading id="what-title" level={2}>
            What this is
          </Heading>
          <div className="stack-md">
            {offering.whatItIs.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>
        </section>

        <section
          className="offering-detail-section"
          aria-labelledby="useful-title"
        >
          <Heading id="useful-title" level={2}>
            When it may be useful
          </Heading>
          <ul className="editorial-list">
            {offering.usefulWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          className="offering-detail-section"
          aria-labelledby="working-title"
        >
          <Heading id="working-title" level={2}>
            What working together could look like
          </Heading>
          <div className="stack-md">
            {offering.workingTogether.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>
        </section>

        <section
          className="offering-detail-section"
          aria-labelledby="outcomes-title"
        >
          <Heading id="outcomes-title" level={2}>
            Possible outcomes
          </Heading>
          <ul className="editorial-list">
            {offering.outcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          className="offering-detail-section"
          aria-labelledby="boundaries-title"
        >
          <Heading id="boundaries-title" level={2}>
            Boundaries
          </Heading>
          <div className="stack-md">
            {offering.boundaries.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>
        </section>
      </div>

      <section
        className="offering-detail-contact stack-md"
        aria-labelledby="offering-contact-title"
      >
        <Heading id="offering-contact-title" level={2}>
          Start with the problem
        </Heading>
        <Text>
          You do not need a complete scope before getting in touch. Begin with
          what you are trying to understand, decide, build, or improve.
        </Text>
        <Link href="/contact" variant="standalone">
          Contact Aston Cyber
        </Link>
      </section>
    </Container>
  );
}
