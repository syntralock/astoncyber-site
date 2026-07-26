import type { Metadata } from "next";

import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy behavior of the Aston Cyber website.",
};

export default function PrivacyPage() {
  return (
    <InstitutionalPage
      eyebrow="Privacy"
      introduction="The initial Aston Cyber website is designed to minimize data collection."
      title="Privacy"
    >
      <section className="editorial-prose stack-md" aria-labelledby="website">
        <Heading id="website" level={2}>
          Website behavior
        </Heading>
        <Text>
          This site does not include analytics, advertising, behavioral
          tracking, or nonessential cookies. It does not include a contact form
          or collect inquiry data through the website.
        </Text>
      </section>
      <section className="editorial-prose stack-md" aria-labelledby="email">
        <Heading id="email" level={2}>
          Direct email
        </Heading>
        <Text>
          Contact links open your email application. Messages sent by email are
          handled outside this static website.
        </Text>
        <Text>
          For questions about this notice, use the{" "}
          <Link href="/contact">Contact page</Link>.
        </Text>
      </section>
    </InstitutionalPage>
  );
}
