import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "Contact Aston Cyber about a focused engagement or responsible disclosure.",
  pathname: "/contact",
  title: "Contact",
});

export default function ContactPage() {
  return (
    <InstitutionalPage
      eyebrow="Contact"
      introduction="Begin with a limited description of the problem and the outcome your organization needs."
      pathname="/contact"
      title="Contact Aston Cyber"
    >
      <section
        className="surface-base stack-lg"
        aria-labelledby="engagement-inquiry"
      >
        <div className="stack-md">
          <Heading id="engagement-inquiry" level={2}>
            Engagement inquiries
          </Heading>
          <Text>
            In the initial message, include only the information needed to
            understand whether the problem may fit:
          </Text>
          <ul className="editorial-list">
            <li>Organization type</li>
            <li>General problem category</li>
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
            Send an engagement inquiry
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
          Aston Cyber reviews the problem category, desired outcome, timing,
          competence required, and current capacity. If the inquiry appears
          aligned, the next step is a limited discovery conversation. Work
          begins only after the problem, deliverables, responsibilities,
          exclusions, and completion condition are documented in a bounded
          scope.
        </Text>
        <Text>
          Aston Cyber may decline work that requires continuous coverage,
          emergency response, broad operational ownership, or expertise outside
          its current delivery model.
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
