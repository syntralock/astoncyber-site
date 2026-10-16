import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import type { Service } from "@/lib/services";

type ServiceDetailProps = Readonly<{ service: Service }>;

export function ServiceDetail({ service }: ServiceDetailProps) {
  return (
    <Container className="service-detail-page">
      <Breadcrumbs
        pathname={`/services/${service.slug}`}
        items={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          { label: service.title },
        ]}
      />

      <header className="service-detail-header stack-md">
        <Text className="text-accent" variant="eyebrow">
          Service
        </Text>
        <Heading level={1}>{service.title}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          {service.introduction}
        </Text>
      </header>

      <div className="service-detail-content">
        <section
          className="service-detail-section"
          aria-labelledby="covers-title"
        >
          <Heading id="covers-title" level={2}>
            What it covers
          </Heading>
          <div className="stack-md">
            {service.whatItCovers.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="useful-title"
        >
          <Heading id="useful-title" level={2}>
            When it may help
          </Heading>
          <ul className="editorial-list">
            {service.usefulWhen.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="activities-title"
        >
          <Heading id="activities-title" level={2}>
            Illustrative activities
          </Heading>
          <ul className="editorial-list">
            {service.activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="outcomes-title"
        >
          <Heading id="outcomes-title" level={2}>
            Possible deliverables and outcomes
          </Heading>
          <div className="stack-md">
            <Text>
              Deliverables depend on the agreed problem, evidence, access, and
              scope. Illustrative possibilities include:
            </Text>
            <ul className="editorial-list">
              {service.outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="boundaries-title"
        >
          <Heading id="boundaries-title" level={2}>
            Important boundaries
          </Heading>
          <div className="stack-md">
            {service.boundaries.map((paragraph) => (
              <Text key={paragraph}>{paragraph}</Text>
            ))}
          </div>
        </section>
      </div>

      <section
        className="service-detail-contact stack-md"
        aria-labelledby="service-contact-title"
      >
        <Heading id="service-contact-title" level={2}>
          Start with the challenge
        </Heading>
        <Text>
          You do not need a complete scope before getting in touch. Begin with
          what is not working, what needs to change, or what decision you are
          trying to make.
        </Text>
        <Link href="/contact" variant="standalone">
          Discuss Your Technology Needs
        </Link>
      </section>
    </Container>
  );
}
