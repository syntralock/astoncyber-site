import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "How Aston Cyber understands, evaluates, implements, and improves business systems through bounded engineering engagements.",
  pathname: "/approach",
  title: "Our Approach",
});

const stages = [
  [
    "Understand",
    "Learn how the organization operates, which systems and information the work depends on, who owns the process, and what is making the current situation difficult.",
  ],
  [
    "Evaluate",
    "Examine the relevant systems, workflows, dependencies, risks, and viable options. Define the problem clearly enough to recommend a practical direction.",
  ],
  [
    "Implement",
    "Design, build, configure, integrate, migrate, automate, secure, or improve the agreed system or workflow.",
  ],
  [
    "Improve",
    "Validate the result, address useful refinements, document ownership and decisions, and establish a foundation for continued improvement.",
  ],
] as const;

const models = [
  [
    "Assessment & Planning",
    "Evaluate the current state, define the problem, identify constraints and dependencies, and produce practical recommendations, architecture, or a roadmap.",
  ],
  [
    "Project Implementation",
    "Design and deliver a bounded system, integration, migration, automation, custom application, security capability, or improvement project.",
  ],
  [
    "Ongoing Advisory & Improvement",
    "Provide agreed continuing technical guidance, review, and incremental improvement around a defined environment or capability.",
  ],
] as const;

export default function ApproachPage() {
  return (
    <InstitutionalPage
      contentClassName="institutional-page-content-wide"
      eyebrow="Our Approach"
      introduction="Begin with how the business operates, define the problem clearly, and apply technology where it can produce a practical improvement."
      pathname="/approach"
      title="Understand first. Improve what matters."
    >
      <section className="stack-lg" aria-labelledby="method-title">
        <Heading id="method-title" level={2}>
          How we work
        </Heading>
        <ol className="method-grid">
          {stages.map(([title, description], index) => (
            <li className="method-step stack-sm" key={title}>
              <Text className="text-accent" variant="caption">
                {String(index + 1).padStart(2, "0")}
              </Text>
              <Heading level={3}>{title}</Heading>
              <Text className="text-foreground-secondary">{description}</Text>
            </li>
          ))}
        </ol>
        <Text className="section-closing text-foreground-secondary">
          A customer can engage Aston Cyber for a defined part of the work. An
          assessment may stand alone, and implementation can begin from an
          existing plan after suitable review.
        </Text>
        <Link
          href="/services/systems-modernization/assessment"
          variant="standalone"
        >
          Explore the Systems Modernization Assessment
        </Link>
      </section>

      <section className="stack-lg" aria-labelledby="models-title">
        <Heading id="models-title" level={2}>
          Engagement models
        </Heading>
        <div className="layout-three engagement-models">
          {models.map(([title, description]) => (
            <article className="surface-base stack-sm" key={title}>
              <Heading level={3}>{title}</Heading>
              <Text className="text-foreground-secondary">{description}</Text>
            </article>
          ))}
        </div>
        <Text className="section-closing text-foreground-secondary">
          Ongoing work does not imply 24/7 coverage, emergency response,
          comprehensive managed IT, dedicated staffing, or guaranteed immediate
          availability. Scope, cadence, access, responsibilities, milestones,
          and response expectations are agreed for each relationship.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="principles-title"
      >
        <Heading id="principles-title" level={2}>
          Working principles
        </Heading>
        <Heading level={3}>Business operations before technology</Heading>
        <Text>
          We ask what needs to work better before selecting a product, platform,
          automation, or custom solution.
        </Text>
        <Heading level={3}>Appropriate technology</Heading>
        <Text>
          Sometimes the best answer is improving a process or integrating tools
          already owned rather than purchasing or building something new.
        </Text>
        <Heading level={3}>Secure and maintainable by design</Heading>
        <Text>
          Security, ownership, supportability, and documentation are considered
          as part of the engineering work.
        </Text>
        <Heading level={3}>Evidence and honest limitations</Heading>
        <Text>
          Recommendations distinguish known facts from assumptions and explain
          meaningful risks, alternatives, dependencies, and tradeoffs.
        </Text>
        <Heading level={3}>Independent judgment</Heading>
        <Text>
          Aston Cyber accepts no vendor commissions, resale incentives, or paid
          referral arrangements. Commercial incentives do not determine
          technical conclusions.
        </Text>
      </section>

      <section
        className="surface-raised stack-md"
        aria-labelledby="approach-contact-title"
      >
        <Heading id="approach-contact-title" level={2}>
          Start with a conversation
        </Heading>
        <Text>
          We define scope, responsibilities, dependencies, and expected
          deliverables before implementation begins.
        </Text>
        <Link href="/contact" variant="standalone">
          Discuss Your Technology Needs
        </Link>
      </section>
    </InstitutionalPage>
  );
}
