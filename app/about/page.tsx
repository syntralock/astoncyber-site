import type { Metadata } from "next";

import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Aston Cyber as an independent, founder-led cybersecurity engineering and research firm.",
};

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
          independent research. It is not a managed security provider, software
          vendor, outsourced security function, or broad generalist consultancy.
        </Text>
        <Text>
          Every publication, project, and engineering effort should strengthen
          the credibility of the organization.
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
        aria-labelledby="mission-title"
      >
        <Heading id="mission-title" level={2}>
          Mission
        </Heading>
        <Text>
          Aston Cyber exists to advance the practice of cybersecurity through
          research, engineering, and education.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="principles-title"
      >
        <Heading id="principles-title" level={2}>
          Operating principles
        </Heading>
        <Text>
          Our work is grounded in curiosity, evidence, thoughtful engineering,
          clarity, and long-term thinking. We publish to educate first and
          openly share knowledge whenever practical.
        </Text>
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
          Independence and funding
        </Heading>
        <Text>
          Aston Cyber is currently founder funded. At launch it accepts no
          vendor funding, vendor resale commissions, implementation commissions,
          paid referral compensation, or sponsored research.
        </Text>
        <Text>
          Commercial work remains separate from public research. Client
          information is not used in public research without authorization and
          appropriate anonymization, and conclusions remain proportional to the
          evidence.
        </Text>
      </section>
    </InstitutionalPage>
  );
}
