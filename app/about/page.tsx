import Image from "next/image";

import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "About Aston Cyber, a founder-led Systems Modernization business based in Northwest Alabama and serving organizations regionally and remotely.",
  pathname: "/about",
  title: "About",
});

export default function AboutPage() {
  return (
    <InstitutionalPage
      eyebrow="About"
      introduction="Aston Cyber is a founder-led, engineering-led Systems Modernization business based in Northwest Alabama."
      pathname="/about"
      title="About Aston Cyber"
    >
      <section
        className="editorial-prose stack-md"
        aria-labelledby="work-title"
      >
        <Heading id="work-title" level={2}>
          Better systems around real business needs
        </Heading>
        <Text>
          Aston Cyber helps organizations assess, design, build, integrate,
          migrate, automate, secure, validate, document, and improve the systems
          behind their operations.
        </Text>
        <Text>
          Modernization may involve aging technology, but it can also mean
          connecting current applications, improving a workflow, correcting a
          fragile configuration, or building a focused capability that existing
          tools do not provide.
        </Text>
        <Text>
          Work is available for appropriate regional and remote engagements
          across industries and organization sizes.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="accountability-title"
      >
        <Heading id="accountability-title" level={2}>
          Founder-led accountability
        </Heading>
        <Text>
          Matt Aston leads or materially participates in each engagement and
          remains accountable for the technical work. Aston Cyber does not
          present itself as a large staffed delivery organization.
        </Text>
        <Text>
          Scope, responsibilities, dependencies, assumptions, milestones where
          useful, deliverables, and completion conditions are defined before
          implementation begins.
        </Text>
      </section>

      <section className="about-founder" aria-labelledby="founder-title">
        <figure className="founder-portrait-frame">
          <Image
            alt="Matt Aston, founder of Aston Cyber"
            className="founder-portrait"
            height="1402"
            src="/images/founder/matt-aston-portrait.jpg"
            unoptimized
            width="1122"
          />
        </figure>
        <div className="editorial-prose stack-md">
          <Heading id="founder-title" level={2}>
            Meet Matt Aston
          </Heading>
          <Text>
            Matt Aston is a technology and cybersecurity engineer whose
            experience includes enterprise technology operations, cloud
            infrastructure, identity and access management, automation, software
            development, security engineering, and technology risk.
          </Text>
          <Text>
            Before entering technology, Matt served as an Infantry Sergeant in
            the U.S. Army. The discipline, accountability, and measured
            decision-making developed through that service continue to shape how
            Aston Cyber approaches engineering work.
          </Text>
          <Link
            external
            href="https://matt.astoncyber.com"
            variant="standalone"
          >
            Learn more about Matt Aston →
          </Link>
        </div>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="independence-title"
      >
        <Heading id="independence-title" level={2}>
          Independent judgment
        </Heading>
        <Text>
          Aston Cyber accepts no vendor commissions, vendor resale incentives,
          or paid referral arrangements. Relevant conflicts are disclosed, and
          commercial incentives do not determine technical conclusions.
        </Text>
        <Text>
          Recommendations remain proportional to the available evidence and
          include meaningful assumptions, limitations, alternatives, and
          tradeoffs.
        </Text>
      </section>

      <section
        className="editorial-prose stack-md"
        aria-labelledby="research-title"
      >
        <Heading id="research-title" level={2}>
          Research as supporting evidence
        </Heading>
        <Text>
          Published research and technical case studies demonstrate aspects of
          Aston Cyber&apos;s engineering approach. Research prototypes retain
          their original context and limitations and are not presented as
          customer engagements or production outcomes.
        </Text>
        <Link href="/research" variant="standalone">
          Review Technical Research
        </Link>
      </section>
    </InstitutionalPage>
  );
}
