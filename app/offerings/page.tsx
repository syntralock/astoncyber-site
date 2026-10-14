import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { offerings } from "@/lib/offerings";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Explore how Aston Cyber helps organizations understand, design, build, review, and improve practical security capabilities.",
  pathname: "/offerings",
  title: "Offerings",
});

export default function OfferingsPage() {
  return (
    <Container className="offerings-page">
      <Breadcrumbs
        pathname="/offerings"
        items={[{ href: "/", label: "Home" }, { label: "Offerings" }]}
      />

      <header className="offerings-introduction stack-lg">
        <Text className="text-accent" variant="eyebrow">
          Offerings
        </Text>
        <Heading level={1} variant="display">
          How We Help
        </Heading>
        <div className="stack-md offerings-introduction-copy">
          <Text variant="lead">
            Not every cybersecurity problem starts with a clear answer.
          </Text>
          <Text className="text-foreground-secondary" variant="lead">
            Aston Cyber helps organizations understand where they are, decide
            where they need to go, and build practical security capabilities
            that support the business over time.
          </Text>
        </div>
      </header>

      <div className="offerings-list">
        {offerings.map((offering, index) => (
          <section
            className="offering-overview"
            aria-labelledby={`${offering.slug}-title`}
            key={offering.slug}
          >
            <Text
              aria-hidden="true"
              className="offering-number text-foreground-muted"
              variant="caption"
            >
              {String(index + 1).padStart(2, "0")}
            </Text>
            <Heading
              className="offering-title"
              id={`${offering.slug}-title`}
              level={2}
            >
              <Link href={`/offerings/${offering.slug}`}>{offering.title}</Link>
            </Heading>
            <Text className="offering-description text-foreground-secondary">
              {offering.description}
            </Text>
          </section>
        ))}
      </div>

      <section
        className="offerings-contact stack-md"
        aria-labelledby="offerings-contact-title"
      >
        <Heading id="offerings-contact-title" level={2}>
          Every engagement starts with a conversation.
        </Heading>
        <Link href="/contact" variant="standalone">
          Contact Aston Cyber
        </Link>
      </section>
    </Container>
  );
}
