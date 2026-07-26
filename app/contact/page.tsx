import type { Metadata } from "next";

import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Aston Cyber for general inquiries or responsible disclosure.",
};

export default function ContactPage() {
  return (
    <InstitutionalPage
      eyebrow="Contact"
      introduction="Use the channel that matches the purpose of your message."
      title="Contact Aston Cyber"
    >
      <div className="institutional-grid">
        <section className="surface-base stack-md" aria-labelledby="general">
          <Heading id="general" level={2} variant="h3">
            General inquiries
          </Heading>
          <Text className="text-foreground-secondary">
            For general questions about Aston Cyber.
          </Text>
          <Link href="mailto:info@astoncyber.com" variant="standalone">
            info@astoncyber.com
          </Link>
        </section>
        <section className="surface-base stack-md" aria-labelledby="security">
          <Heading id="security" level={2} variant="h3">
            Security reports
          </Heading>
          <Text className="text-foreground-secondary">
            For responsible disclosure and security reports.
          </Text>
          <Link href="mailto:security@astoncyber.com" variant="standalone">
            security@astoncyber.com
          </Link>
        </section>
      </div>
      <Text className="text-foreground-secondary" variant="small">
        Review the{" "}
        <Link href="/disclosures">responsible disclosure guidance</Link> before
        submitting a security report.
      </Text>
    </InstitutionalPage>
  );
}
