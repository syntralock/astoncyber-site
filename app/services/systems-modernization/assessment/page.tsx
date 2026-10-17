import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/site/breadcrumbs";
import { StructuredData } from "@/components/structured-data";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import {
  absoluteSiteUrl,
  createPageMetadata,
  siteOrigin,
} from "@/lib/site-metadata";

const pathname = "/services/systems-modernization/assessment";
const title = "Systems Modernization Assessment";
const description =
  "Evaluate business systems, dependencies, workflows, and technology risks to develop prioritized recommendations and a practical modernization roadmap.";

export const metadata = createPageMetadata({ description, pathname, title });

const usefulWhen = [
  "Applications do not share information reliably, leaving people to move or reconcile data by hand.",
  "Reporting depends on spreadsheets, inboxes, or repeated manual preparation.",
  "An aging or poorly understood system is becoming difficult to maintain or change.",
  "A migration, integration, or replacement is being considered without a clear view of dependencies.",
  "Operational work depends on undocumented handoffs, fragile workarounds, or unclear ownership.",
  "Leadership needs to understand technology and cybersecurity risks before choosing a direction.",
] as const;

const evaluationAreas = [
  [
    "Business operations",
    "The in-scope operation, the people responsible for it, the desired improvement, and the constraints that shape a practical decision.",
  ],
  [
    "Systems and information",
    "The applications, infrastructure, data stores, services, and material information flows that support the operation.",
  ],
  [
    "Dependencies and workflows",
    "Important integrations, manual handoffs, systems of record, approval points, reporting steps, and operational bottlenecks.",
  ],
  [
    "Technology risk",
    "Relevant ownership, access, data-protection, maintainability, resilience, configuration, vendor, and lifecycle concerns visible within the agreed scope.",
  ],
] as const;

const deliverables = [
  "An executive decision brief",
  "An in-scope systems inventory",
  "Dependency and information-flow findings",
  "Workflow and operational observations",
  "Relevant technology and cybersecurity risk observations",
  "Prioritized modernization recommendations",
  "A practical modernization roadmap",
] as const;

const priorities = [
  [
    "Business importance",
    "How directly the issue affects the operation or decision being assessed.",
  ],
  [
    "Risk and dependency",
    "What must be stabilized, clarified, or completed before other work can proceed responsibly.",
  ],
  [
    "Feasibility",
    "Whether people, access, data, platforms, vendors, and ownership make the improvement practical.",
  ],
  [
    "Maintainability",
    "Whether the organization can understand, support, and improve the resulting environment over time.",
  ],
] as const;

export default function SystemsModernizationAssessmentPage() {
  return (
    <Container className="service-detail-page">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          description,
          name: title,
          provider: { "@id": `${siteOrigin}/#organization` },
          serviceType: title,
          url: absoluteSiteUrl(pathname),
        }}
      />
      <Breadcrumbs
        pathname={pathname}
        items={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Services" },
          {
            href: "/services/systems-modernization",
            label: "Systems Modernization",
          },
          { label: title },
        ]}
      />

      <header className="service-detail-header stack-md">
        <Text className="text-accent" variant="eyebrow">
          Assessment &amp; Planning
        </Text>
        <Heading level={1}>{title}</Heading>
        <Text className="text-foreground-secondary" variant="lead">
          Understand how an important business operation depends on its current
          systems, identify what is getting in the way, and develop a practical
          roadmap for improvement.
        </Text>
      </header>

      <div className="service-detail-content">
        <section
          className="service-detail-section"
          aria-labelledby="assessment-useful-title"
        >
          <Heading id="assessment-useful-title" level={2}>
            When an assessment may help
          </Heading>
          <div className="stack-md">
            <Text>
              A modernization decision becomes difficult when the current
              environment is fragmented, poorly documented, or understood only
              by the people who work around it every day. An assessment may be
              useful when:
            </Text>
            <ul className="editorial-list">
              {usefulWhen.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <Text>
              The assessment is bounded around an agreed business system,
              workflow, or decision. It is not an attempt to catalog every
              technology or process in the organization.
            </Text>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="assessment-evaluates-title"
        >
          <Heading id="assessment-evaluates-title" level={2}>
            What Aston Cyber evaluates
          </Heading>
          <div className="stack-lg">
            <Text>
              The agreed scope determines the depth of each area. The core
              assessment considers the parts of the environment needed to make
              the modernization decision responsibly.
            </Text>
            <div className="layout-three">
              {evaluationAreas.map(([area, detail]) => (
                <article className="surface-base stack-sm" key={area}>
                  <Heading level={3}>{area}</Heading>
                  <Text className="text-foreground-secondary">{detail}</Text>
                </article>
              ))}
            </div>
            <Text>
              Migration readiness, workflow automation, applied AI readiness,
              vendor evaluation, integration feasibility, or deeper
              cybersecurity analysis can be discussed as separately scoped
              extensions when relevant.
            </Text>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="assessment-process-title"
        >
          <Heading id="assessment-process-title" level={2}>
            How the assessment proceeds
          </Heading>
          <div className="stack-md">
            <Heading level={3}>Understand the operation</Heading>
            <Text>
              Define the business objective, assessment boundary, accountable
              stakeholders, available evidence, known constraints, and the
              decision the organization needs to make.
            </Text>
            <Heading level={3}>Evaluate the current state</Heading>
            <Text>
              Review the relevant systems, workflows, dependencies, information
              movement, risks, and improvement options. Facts, stakeholder
              statements, assumptions, and unknowns remain distinguishable.
            </Text>
            <Heading level={3}>Recommend a practical direction</Heading>
            <Text>
              Compare reasonable options, explain meaningful tradeoffs, and
              sequence recommendations around business importance, risk,
              dependencies, feasibility, and maintainability.
            </Text>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="assessment-deliverables-title"
        >
          <Heading id="assessment-deliverables-title" level={2}>
            What the organization can expect to receive
          </Heading>
          <div className="stack-md">
            <Text>
              Deliverable depth depends on the agreed scope, access, and
              evidence. A representative assessment may include:
            </Text>
            <ul className="editorial-list">
              {deliverables.map((deliverable) => (
                <li key={deliverable}>{deliverable}</li>
              ))}
            </ul>
            <Text>
              Findings identify the evidence examined and meaningful
              limitations. Recommendations are intended to remain useful even if
              the organization selects another qualified implementer.
            </Text>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="assessment-priorities-title"
        >
          <Heading id="assessment-priorities-title" level={2}>
            How recommendations are prioritized
          </Heading>
          <div className="stack-lg">
            <Text>
              Modernization does not automatically mean replacing the current
              environment. A recommendation may retain, improve, integrate,
              simplify, or replace a system based on the problem and evidence.
            </Text>
            <div className="layout-three">
              {priorities.map(([priority, detail]) => (
                <article className="surface-base stack-sm" key={priority}>
                  <Heading level={3}>{priority}</Heading>
                  <Text className="text-foreground-secondary">{detail}</Text>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="assessment-next-title"
        >
          <Heading id="assessment-next-title" level={2}>
            What happens after the assessment
          </Heading>
          <div className="stack-md">
            <Text>
              The assessment is independently useful. The organization may carry
              out the recommendations with its internal team, an existing
              provider, another qualified specialist, or Aston Cyber through a
              separately scoped engagement.
            </Text>
            <Text>
              Possible follow-on work may include detailed architecture,
              integration, migration, workflow automation, focused software,
              cybersecurity improvement, validation, documentation, or advisory
              work. No follow-on engagement is required.
            </Text>
          </div>
        </section>

        <section
          className="service-detail-section"
          aria-labelledby="assessment-boundaries-title"
        >
          <Heading id="assessment-boundaries-title" level={2}>
            Important scope boundaries
          </Heading>
          <div className="stack-md">
            <Text>
              The Systems Modernization Assessment is not software
              implementation, managed IT, incident response, penetration
              testing, a comprehensive cybersecurity audit, a regulatory
              compliance attestation, or an unlimited enterprise transformation
              program.
            </Text>
            <Text>
              It does not guarantee cost reduction, risk elimination, security,
              compliance, or a particular business result. Findings are limited
              to the agreed scope, evidence available, and conditions examined.
            </Text>
          </div>
        </section>
      </div>

      <section
        className="service-detail-contact stack-md"
        aria-labelledby="assessment-contact-title"
      >
        <Heading id="assessment-contact-title" level={2}>
          Start with the business problem
        </Heading>
        <Text>
          Describe the operation, system, workflow, or modernization decision
          that needs greater clarity. The first conversation can determine
          whether a bounded assessment is an appropriate next step.
        </Text>
        <Link href="/contact" variant="standalone">
          Discuss Your Modernization Needs
        </Link>
      </section>
    </Container>
  );
}
