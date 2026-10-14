import { InstitutionalPage } from "@/components/layout/institutional-page";
import { Heading } from "@/components/ui/heading";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { createPageMetadata } from "@/lib/site-metadata";

export const metadata = createPageMetadata({
  description:
    "How the Aston Cyber website approaches accessibility through semantic structure, keyboard access, readable contrast, and responsive content.",
  pathname: "/accessibility",
  title: "Accessibility",
});

export default function AccessibilityPage() {
  return (
    <InstitutionalPage
      eyebrow="Accessibility"
      introduction="Aston Cyber aims to make this website usable by as many people as practical."
      pathname="/accessibility"
      title="Accessibility"
    >
      <section className="editorial-prose stack-md" aria-labelledby="approach">
        <Heading id="approach" level={2}>
          Our approach
        </Heading>
        <Text>
          The website is designed toward WCAG 2.2 AA, with semantic HTML,
          keyboard access, visible focus, readable contrast, responsive text,
          and reduced-motion support.
        </Text>
        <Text>
          Accessibility is reviewed throughout implementation rather than
          treated as a final launch task.
        </Text>
      </section>
      <section className="editorial-prose stack-md" aria-labelledby="feedback">
        <Heading id="feedback" level={2}>
          Accessibility feedback
        </Heading>
        <Text>
          If you encounter an accessibility barrier, contact{" "}
          <Link href="mailto:info@astoncyber.com">info@astoncyber.com</Link>.
        </Text>
      </section>
    </InstitutionalPage>
  );
}
