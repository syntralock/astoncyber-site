import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { services } from "@/lib/services";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Explore Aston Cyber services for systems modernization, automation and applied AI, cybersecurity engineering, and technology risk.",
  pathname: "/services",
  title: "Systems Modernization Services",
});

export default function ServicesPage() {
  return (
    <Container className="services-page">
      <Breadcrumbs
        pathname="/services"
        items={[{ href: "/", label: "Home" }, { label: "Services" }]}
      />

      <header className="services-introduction stack-lg">
        <Text className="text-accent" variant="eyebrow">
          Services
        </Text>
        <Heading level={1} variant="display">
          Practical engineering for better operations
        </Heading>
        <div className="stack-md services-introduction-copy">
          <Text variant="lead">
            Aston Cyber helps organizations assess, design, build, integrate,
            migrate, automate, secure, validate, and improve the systems behind
            their operations.
          </Text>
          <Text className="text-foreground-secondary">
            These services are common starting points, not rigid silos. The
            agreed problem and scope determine which capabilities are useful.
          </Text>
        </div>
      </header>

      <div className="services-list">
        {services.map((service, index) => (
          <section
            className="service-overview"
            aria-labelledby={`${service.slug}-title`}
            key={service.slug}
          >
            <Text
              aria-hidden="true"
              className="service-number text-foreground-muted"
              variant="caption"
            >
              {String(index + 1).padStart(2, "0")}
            </Text>
            <Heading
              className="service-title"
              id={`${service.slug}-title`}
              level={2}
            >
              <Link href={`/services/${service.slug}`}>{service.title}</Link>
            </Heading>
            <Text className="service-description text-foreground-secondary">
              {service.description}
            </Text>
          </section>
        ))}
      </div>

      <section
        className="services-contact stack-md"
        aria-labelledby="services-contact-title"
      >
        <Heading id="services-contact-title" level={2}>
          Start with a defined challenge
        </Heading>
        <Text>
          Work may begin with assessment and planning or continue through
          implementation, validation, documentation, and handoff.
        </Text>
        <Link href="/contact" variant="standalone">
          Discuss Your Technology Needs
        </Link>
      </section>
    </Container>
  );
}
