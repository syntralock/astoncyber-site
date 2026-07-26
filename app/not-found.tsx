import Link from "next/link";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

export default function NotFound() {
  return (
    <Container>
      <Section className="stack-lg" aria-labelledby="not-found-title">
        <p className="type-eyebrow text-foreground-muted">Not found</p>
        <h1 className="type-h1" id="not-found-title">
          Page not found
        </h1>
        <p className="type-body text-foreground-secondary">
          The requested page is unavailable.
        </p>
        <Link className="text-link" href="/">
          Return to Aston Cyber
        </Link>
      </Section>
    </Container>
  );
}
