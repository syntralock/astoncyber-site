import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "About Aston Cyber as an independent, founder-led cybersecurity engineering and research firm.",
  pathname: "/about",
  title: "About",
});

export default function AboutPage() {
  return (
    <InstitutionalPage
      eyebrow="About"
      introduction="Aston Cyber is an independent, founder-led cybersecurity engineering and research firm."
      title="About Aston Cyber"
    >
      <section
        className="editorial-prose stack-md"
        aria-labelledby="identity-title"
      >
        <Heading id="identity-title" level={2}>
          Institutional identity
        </Heading>
        <Text>
          Aston Cyber combines carefully scoped cybersecurity engineering with
          independent research for financial services and other organizations
          where security decisions carry consequential operational, financial,
          or regulatory risk.
        </Text>
        <Text>
          It is not a managed security provider, software vendor, outsourced
          security function, or broad generalist consultancy.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="accountability-title"
      >
        <Heading id="accountability-title" level={2}>
          Accountability and operating model
        </Heading>
        <Text>
          Matt Aston leads or materially participates in every engagement.
          Concurrent work is intentionally limited, and Aston Cyber declines
          work outside its competence, capacity, or delivery boundaries.
        </Text>
        <Text>
          When a defined scope requires specialist expertise outside the
          founder&apos;s direct delivery area, Aston Cyber may use a preapproved
          collaborator under appropriate confidentiality, security,
          conflict-of-interest, intellectual-property, and client-disclosure
          terms. Matt remains accountable for the engagement. Aston Cyber does
          not currently represent that it has employees or a standing
          subcontractor bench.
        </Text>
        <Text>
          Aston Cyber is not yet formally incorporated or organized as a
          separate legal entity. Appropriate business formation, contracting,
          insurance, and operating formalities will be completed before
          commercial engagements are accepted.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="engagement-title"
      >
        <Heading id="engagement-title" level={2}>
          Engagement philosophy
        </Heading>
        <Text>
          Work begins with a specific question or engineering outcome. Scope,
          deliverables, responsibilities, assumptions, exclusions, and the
          completion condition are defined before an engagement begins.
        </Text>
        <Text>
          The objective is a clear decision, design, implementation, assessment,
          automation, or research artifact—not open-ended operational ownership.
        </Text>
        <Link href="/offerings" variant="standalone">
          Explore Aston Cyber Offerings
        </Link>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="founder-title"
      >
        <Heading id="founder-title" level={2}>
          Meet the Founder
        </Heading>
        <Text>
          Aston Cyber was founded by <strong>Matt Aston</strong>, a
          cybersecurity engineer who has helped organizations strengthen
          identity, cloud, endpoint, and governance security across the
          aerospace, nonprofit, and financial services sectors.
        </Text>
        <Text>
          Before entering tech, Matt served as an Infantry Sergeant in the U.S.
          Army. The discipline, accountability, and measured decision-making
          developed during his military service continue to shape Aston
          Cyber&apos;s engineering philosophy.
        </Text>
        <Text>
          He holds a bachelor&apos;s degree and is completing a master&apos;s
          degree in Computer Science. That commitment to continuous learning is
          reflected in Aston Cyber&apos;s approach: combining practical
          engineering experience with independent research to help organizations
          make sound, well-informed security decisions.
        </Text>
        <Link external href="https://matt.astoncyber.com" variant="standalone">
          Learn more about Matt Aston →
        </Link>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="disclosure-title"
      >
        <Heading id="disclosure-title" level={2}>
          Independence
        </Heading>
        <Text>
          Aston Cyber accepts no vendor commissions, vendor resale incentives,
          or paid referral arrangements. Relevant conflicts are disclosed, and
          commercial incentives do not determine technical conclusions.
        </Text>
        <Text>
          Commercial work remains separate from public research. Client
          information is not used in public research without authorization and
          appropriate anonymization. Conclusions remain proportional to the
          evidence, including when findings are limited, negative, or
          inconclusive.
        </Text>
      </section>
    </InstitutionalPage>
  );
}
