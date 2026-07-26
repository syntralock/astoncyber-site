"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

type ErrorPageProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function ErrorPage({ reset }: ErrorPageProps) {
  return (
    <Container>
      <Section className="stack-lg" aria-labelledby="error-title">
        <p className="type-eyebrow text-foreground-muted">Application error</p>
        <h1 className="type-h1" id="error-title">
          Unable to display this page
        </h1>
        <p className="type-body text-foreground-secondary">
          Try the request again.
        </p>
        <div>
          <button className="button-primary" onClick={reset} type="button">
            Try again
          </button>
        </div>
      </Section>
    </Container>
  );
}
