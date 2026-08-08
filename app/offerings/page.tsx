import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Focused cybersecurity engineering, assessment, architecture, automation, and research engagements from Aston Cyber.",
  pathname: "/offerings",
  title: "Offerings",
});

const offerings = [
  {
    boundary:
      "This does not imply comprehensive transformation, authority across every vendor, certification, enterprise-scale delivery, or guaranteed prevention.",
    credibility:
      "Matt Aston has worked across identity, privileged access, Azure, Microsoft 365, endpoint security, data protection, email security, and governance in aerospace, nonprofit, and financial-services environments.",
    engagement:
      "A focused architecture review, identity or cloud control assessment, design validation, or defined engineering improvement project.",
    id: "identity-cloud-platform",
    outcome:
      "Current-state findings, risk-ranked gaps, a target architecture, prioritized engineering work, selected control implementation or validation, and explicit ownership considerations.",
    problem:
      "Identity, Microsoft cloud, endpoint, collaboration, and data controls have developed incrementally and no longer operate as a coherent security system.",
    title: "Identity, cloud, and platform security",
  },
  {
    boundary:
      "A focused review does not establish authority across every architecture domain or replace implementation and operational validation.",
    credibility:
      "Aston Cyber's published work and founder experience reflect systems thinking, trust-boundary analysis, operational ownership, and communication of technical decisions and limitations.",
    engagement:
      "An architecture sprint, design review, technology decision assessment, trust-boundary analysis, or executive decision memo.",
    id: "architecture-decision-support",
    outcome:
      "A defined problem, assumptions, options, tradeoffs, trust boundaries, failure conditions, a recommended direction, implementation considerations, and unresolved risks.",
    problem:
      "A consequential decision crosses identity, data, infrastructure, operations, governance, and user experience without a clear technical path.",
    title: "Security architecture and decision support",
  },
  {
    boundary:
      "These are not penetration tests, regulatory audits, attestations, comprehensive enterprise risk assessments, or opinions about legal sufficiency.",
    credibility:
      "The approach draws on the founder's practical security-engineering experience and Aston Cyber's evidence-led method for documenting findings, uncertainty, and limitations.",
    engagement:
      "An identity-control assessment, cloud or platform review, control-design review, high-risk workflow assessment, or focused governance review.",
    id: "focused-assessments",
    outcome:
      "Evidence-based findings, stated limitations, risk-ranked recommendations, engineering priorities, a decision-ready summary, and traceability between evidence and conclusions.",
    problem:
      "Leadership needs to understand whether a specific control area is operating as intended and what should be corrected first.",
    title: "Focused security assessments",
  },
  {
    boundary:
      "Aston Cyber does not offer a security-orchestration platform, managed automation, autonomous response, or a general software product.",
    credibility:
      "Matt Aston has used PowerShell, Python, APIs, Microsoft Graph, administrative platforms, reporting, and validation workflows to improve repeatability and control evidence.",
    engagement:
      "Workflow analysis, administrative automation, evidence collection, control-validation tooling, or reporting integration.",
    id: "automation-evidence",
    outcome:
      "A repeatable workflow, documented inputs and permissions, failure handling, maintainable artifacts, control evidence, operational handoff, and explicit limitations.",
    problem:
      "Important security work depends on inconsistent manual processes, fragmented administration, or evidence that is difficult to reproduce.",
    title: "Security automation and control evidence",
  },
  {
    boundary:
      "A prototype is not a proven production platform, evidence of fraud reduction, production engineering at scale, or evidence of expertise in every financial workflow.",
    credibility:
      "The Secure Transaction Authorization Ledger demonstrates Aston Cyber's current method for research framing, workflow design, explainable controls, prototyping, evaluation, and limitation-setting.",
    engagement:
      "A design-and-build prototype, feasibility study, threat-informed workflow design, control-concept validation, or bounded independent technical investigation.",
    id: "workflow-research-prototyping",
    outcome:
      "A research question, defined scope, prototype or design artifact, assumptions, evaluation results, limitations, production-readiness considerations, and a proceed-or-stop recommendation.",
    problem:
      "A consequential workflow or security idea needs structured investigation before an organization commits to production investment.",
    title: "Secure workflow research and prototyping",
  },
] as const;

const exclusions = [
  "MDR, MSSP, outsourced SOC, or continuous monitoring",
  "Managed IT or open-ended staff augmentation",
  "Emergency incident response or digital forensics",
  "Penetration testing or broad red-team programs",
  "vCISO retainers or outsourced CISO responsibility",
  "Compliance audits, certifications, attestations, or legal opinions",
  "Software resale, vendor commissions, or paid referral arrangements",
  "Hosting client production systems or processing financial transactions",
] as const;

const engagementSteps = [
  "An initial inquiry identifies the organization type, general problem category, desired outcome, and approximate timing without sharing sensitive information.",
  "Aston Cyber reviews whether the problem fits its competence, capacity, and engagement boundaries.",
  "A limited discovery conversation clarifies the decision, system context, evidence available, constraints, and responsible owners.",
  "If the work is a fit, the proposed scope defines the question, deliverables, responsibilities, assumptions, exclusions, and completion condition.",
  "Matt Aston leads or materially participates in the work and communicates findings, uncertainty, and scope changes directly.",
  "The engagement concludes with the agreed artifacts, limitations, decisions, and operational handoff rather than an implied ongoing service.",
] as const;

export default function OfferingsPage() {
  return (
    <InstitutionalPage
      contentClassName="institutional-page-content-wide"
      eyebrow="Offerings"
      introduction="Focused cybersecurity engineering and research engagements for consequential decisions, systems, controls, and workflows."
      title="Defined problems. Bounded work. Clear outcomes."
    >
      <section className="stack-lg" aria-labelledby="offerings-title">
        <div className="editorial-prose stack-md">
          <Heading id="offerings-title" level={2}>
            Areas of work
          </Heading>
          <Text>
            These categories describe the problems Aston Cyber can credibly
            consider today. Every engagement is narrowed to a specific question
            or engineering outcome before work begins.
          </Text>
        </div>

        <div className="stack-lg">
          {offerings.map((offering) => (
            <section
              className="surface-base stack-lg"
              aria-labelledby={`${offering.id}-title`}
              key={offering.id}
            >
              <Heading id={`${offering.id}-title`} level={3}>
                {offering.title}
              </Heading>
              <div className="layout-two">
                <div className="stack-md">
                  <div className="stack-sm">
                    <Heading level={4}>Client problem</Heading>
                    <Text>{offering.problem}</Text>
                  </div>
                  <div className="stack-sm">
                    <Heading level={4}>Typical engagement</Heading>
                    <Text>{offering.engagement}</Text>
                  </div>
                  <div className="stack-sm">
                    <Heading level={4}>Expected outcome</Heading>
                    <Text>{offering.outcome}</Text>
                  </div>
                </div>
                <div className="stack-md">
                  <div className="stack-sm">
                    <Heading level={4}>Credibility</Heading>
                    <Text>{offering.credibility}</Text>
                  </div>
                  <div className="stack-sm">
                    <Heading level={4}>Boundary</Heading>
                    <Text>{offering.boundary}</Text>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>

      <section
        className="section-space editorial-prose stack-md"
        aria-labelledby="engagement-model-title"
      >
        <Heading id="engagement-model-title" level={2}>
          How an engagement works
        </Heading>
        <ol className="editorial-list">
          {engagementSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>

      <section
        className="surface-base stack-md"
        aria-labelledby="accountability-title"
      >
        <Heading id="accountability-title" level={2}>
          Founder accountability
        </Heading>
        <Text>
          Aston Cyber is founder-led. Matt Aston materially participates in
          every engagement, and concurrent work is intentionally limited. Aston
          Cyber will decline work outside its competence or delivery model.
        </Text>
        <Text>
          A preapproved specialist collaborator may be used when a clearly
          defined scope requires expertise outside the founder&apos;s direct
          delivery area. Any such involvement is disclosed to the client, and
          Matt remains accountable for the engagement. Aston Cyber does not
          represent that it has employees, a standing subcontractor bench, or a
          larger hidden delivery team.
        </Text>
      </section>

      <section
        className="section-space layout-two"
        aria-label="Engagement boundaries and independence"
      >
        <div className="stack-md">
          <Heading level={2}>What Aston Cyber does not do</Heading>
          <Text>
            These boundaries help prospective clients determine fit before
            sharing information or beginning discovery.
          </Text>
          <ul className="editorial-list">
            {exclusions.map((exclusion) => (
              <li key={exclusion}>{exclusion}</li>
            ))}
          </ul>
        </div>
        <div className="stack-md">
          <Heading level={2}>Independence and research integrity</Heading>
          <Text>
            Aston Cyber accepts no vendor commissions, vendor resale incentives,
            or paid referral arrangements. Commercial incentives do not
            determine technical conclusions.
          </Text>
          <Text>
            Commercial work remains separate from public research. Conclusions
            are stated in proportion to the evidence, including when findings
            are limited, negative, or inconclusive. Client information is not
            used in public research without authorization and appropriate
            anonymization.
          </Text>
          <Text>
            Material conflicts relevant to proposed work are disclosed before a
            scope is accepted. Aston Cyber may conclude that a product, project,
            or additional work is unnecessary.
          </Text>
          <Link href="/research" variant="standalone">
            Review Aston Cyber research
          </Link>
        </div>
      </section>

      <section
        className="institutional-callout surface-raised stack-md"
        aria-labelledby="contact-title"
      >
        <Heading id="contact-title" level={2}>
          Is the problem a fit?
        </Heading>
        <Text>
          Begin with a limited, non-sensitive description of the organization,
          problem category, desired outcome, and timing.
        </Text>
        <Link href="/contact" variant="standalone">
          Contact Aston Cyber
        </Link>
      </section>
    </InstitutionalPage>
  );
}
