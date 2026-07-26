"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

type GlobalErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function GlobalError({ reset }: GlobalErrorProps) {
  return (
    <html lang="en">
      <body>
        <main id="main-content">
          <Container>
            <Section className="stack-lg" aria-labelledby="global-error-title">
              <p className="type-eyebrow text-foreground-muted">
                Application error
              </p>
              <h1 className="type-h1" id="global-error-title">
                Unable to display Aston Cyber
              </h1>
              <p className="type-body text-foreground-secondary">
                Try the request again.
              </p>
              <div>
                <button
                  className="button-primary"
                  onClick={reset}
                  type="button"
                >
                  Try again
                </button>
              </div>
            </Section>
          </Container>
        </main>
      </body>
    </html>
  );
}
