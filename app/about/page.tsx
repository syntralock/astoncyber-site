import type { Metadata } from "next";

import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "About",
  description: "About Aston Cyber as an independent research institution.",
};

export default function AboutPage() {
  return (
    <InstitutionalPage
      eyebrow="About"
      introduction="Aston Cyber is an independent cybersecurity research institution."
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
          Aston Cyber is not a consultancy, managed security provider, SaaS
          company, or marketing website. It is a mission-driven cybersecurity
          research organization.
        </Text>
        <Text>
          Every publication, project, and engineering effort should strengthen
          the credibility of the organization.
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
        aria-labelledby="disclosure-title"
      >
        <Heading id="disclosure-title" level={2}>
          Funding disclosure
        </Heading>
        <Text>
          Aston Cyber does not currently publish a list of funders or sponsors.
        </Text>
      </section>

      <Link href="/contact" variant="standalone">
        Contact Aston Cyber
      </Link>
    </InstitutionalPage>
  );
}
