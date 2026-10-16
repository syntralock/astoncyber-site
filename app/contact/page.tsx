import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Contact Aston Cyber about systems modernization, integration, migration, automation, software, cybersecurity, or technology risk.",
  pathname: "/contact",
  title: "Contact",
});

export default function ContactPage() {
  return (
    <InstitutionalPage
      eyebrow="Contact"
      introduction="Tell us about the system, workflow, migration, automation, or technology decision you are working through."
      pathname="/contact"
      title="Discuss Your Technology Needs"
    >
      <section
        className="surface-base stack-lg"
        aria-labelledby="engagement-inquiry"
      >
        <div className="stack-md">
          <Heading id="engagement-inquiry" level={2}>
            Start with the challenge
          </Heading>
          <Text>
            In the initial message, include only the information needed to
            understand the situation and whether Aston Cyber may be able to
            help:
          </Text>
          <ul className="editorial-list">
            <li>Organization and general operating context</li>
            <li>System or workflow involved</li>
            <li>What is not working or needs to change</li>
            <li>Desired outcome</li>
            <li>Approximate timing</li>
            <li>Your contact information</li>
          </ul>
        </div>

        <div className="stack-md">
          <Heading level={3}>Keep the first message non-sensitive</Heading>
          <Text>
            Do not include credentials, confidential information, regulated
            data, incident evidence, or sensitive technical artifacts. A secure
            exchange method can be agreed later if the inquiry advances.
          </Text>
          <Link href="mailto:info@astoncyber.com" variant="standalone">
            Email Aston Cyber
          </Link>
        </div>
      </section>

      <section
        className="section-space editorial-prose stack-md"
        aria-labelledby="next-step"
      >
        <Heading id="next-step" level={2}>
          What happens next
        </Heading>
        <Text>
          Aston Cyber reviews the problem, desired outcome, timing, required
          expertise, dependencies, and current availability. If the inquiry
          appears aligned, the next step is an introductory conversation.
        </Text>
        <Text>
          Before work begins, the scope identifies responsibilities,
          assumptions, expected deliverables, and meaningful limits. An
          engagement may cover assessment and planning, project implementation,
          or appropriately scoped ongoing advisory and improvement.
        </Text>
      </section>

      <section className="surface-base stack-md" aria-labelledby="security">
        <Heading id="security" level={2}>
          Responsible disclosure
        </Heading>
        <Text className="text-foreground-secondary">
          Security reports about Aston Cyber systems use a separate channel and
          are not engagement inquiries.
        </Text>
        <Text>
          Review the{" "}
          <Link href="/disclosures">responsible disclosure guidance</Link>{" "}
          before submitting a security report.
        </Text>
        <Link href="mailto:security@astoncyber.com" variant="standalone">
          security@astoncyber.com
        </Link>
      </section>
    </InstitutionalPage>
  );
}
