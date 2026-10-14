import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "How to report a suspected security vulnerability affecting Aston Cyber systems.",
  pathname: "/disclosures",
  title: "Responsible Disclosure",
});

export default function DisclosuresPage() {
  return (
    <InstitutionalPage
      eyebrow="Security"
      introduction="Use this guidance when reporting a potential security issue to Aston Cyber."
      pathname="/disclosures"
      title="Responsible disclosure"
    >
      <section className="editorial-prose stack-md" aria-labelledby="reporting">
        <Heading id="reporting" level={2}>
          Reporting
        </Heading>
        <Text>
          Send responsible disclosure and security reports to{" "}
          <Link href="mailto:security@astoncyber.com">
            security@astoncyber.com
          </Link>
          . Include clear reproduction details where practical.
        </Text>
        <Text>
          Avoid accessing, modifying, retaining, or disclosing data beyond what
          is necessary to demonstrate an issue.
        </Text>
      </section>

      <section className="editorial-prose stack-md" aria-labelledby="response">
        <Heading id="response" level={2}>
          Response and authorization
        </Heading>
        <Text>
          Receipt will be acknowledged when operationally possible. No response
          or remediation deadline is guaranteed.
        </Text>
        <Text>
          This page does not grant authorization to test any system. Obtain
          authorization before testing systems you do not own, including
          third-party systems.
        </Text>
        <Text>
          No safe-harbor commitment is made, and no legal rights are waived.
        </Text>
      </section>
    </InstitutionalPage>
  );
}
