import { Brand } from "@/components/brand";

const typeSpecimens = [
  {
    className: "type-display",
    label: "Display",
    sample: "Design system specimen",
  },
  {
    className: "type-h1",
    label: "Heading one",
    sample: "Primary page heading",
  },
  {
    className: "type-h2",
    label: "Heading two",
    sample: "Primary section heading",
  },
  {
    className: "type-h3",
    label: "Heading three",
    sample: "Grouped subsection heading",
  },
  {
    className: "type-h4",
    label: "Heading four",
    sample: "Component-level heading",
  },
] as const;

const surfaceSpecimens = [
  {
    className: "surface-base",
    description: "Default grouped content",
    label: "Surface",
  },
  {
    className: "surface-raised",
    description: "Elevated supporting content",
    label: "Surface raised",
  },
] as const;

export default function Home() {
  return (
    <main className="layout-container section-space">
      <div className="specimen-brand">
        <Brand />
        <p className="type-caption text-foreground-muted">
          Non-production design-system placeholder
        </p>
      </div>

      <section className="stack-lg" aria-labelledby="specimen-title">
        <p className="type-eyebrow text-accent">Phase 2 specimen</p>
        <h1 id="specimen-title" className="type-hero">
          Visual foundation
        </h1>
        <p className="type-lead text-foreground-secondary">
          Neutral examples for validating type, spacing, surfaces, and
          responsive behavior.
        </p>
        <div className="cluster">
          <a className="button-primary" href="#typography">
            View typography
          </a>
          <a className="button-secondary" href="#surfaces">
            View surfaces
          </a>
        </div>
      </section>

      <section
        id="typography"
        className="specimen-section stack-xl"
        aria-labelledby="type-title"
      >
        <div className="stack-sm">
          <p className="type-eyebrow text-foreground-muted">Typography</p>
          <h2 id="type-title" className="type-h2">
            Type hierarchy
          </h2>
        </div>

        <div className="stack-xl">
          {typeSpecimens.map((specimen) => (
            <div className="specimen-row stack-sm" key={specimen.label}>
              <p className="type-caption text-foreground-muted">
                {specimen.label}
              </p>
              <p className={specimen.className}>{specimen.sample}</p>
            </div>
          ))}
        </div>

        <div className="layout-grid">
          <article className="surface-base stack-md">
            <h3 className="type-h4">Body typography</h3>
            <p className="type-body-lg">
              Large body text introduces important neutral information.
            </p>
            <p className="type-body">
              This neutral paragraph demonstrates the standard reading size,
              measure, and vertical rhythm without presenting production
              content.
            </p>
            <p className="type-small text-foreground-secondary">
              Supporting text uses the secondary foreground role.
            </p>
          </article>
          <article className="surface-base stack-md">
            <h3 className="type-h4">Technical typography</h3>
            <p className="type-body">
              Monospace treatment is reserved for code and technical labels.
            </p>
            <code className="type-code code-sample">token.surface.raised</code>
          </article>
        </div>
      </section>

      <section
        id="surfaces"
        className="specimen-section stack-xl"
        aria-labelledby="surface-title"
      >
        <div className="stack-sm">
          <p className="type-eyebrow text-foreground-muted">Surfaces</p>
          <h2 id="surface-title" className="type-h2">
            Surface hierarchy
          </h2>
        </div>

        <div className="layout-grid">
          {surfaceSpecimens.map((specimen) => (
            <article
              className={`${specimen.className} stack-md`}
              key={specimen.label}
            >
              <p className="type-caption text-foreground-muted">
                {specimen.label}
              </p>
              <h3 className="type-h4">Neutral card example</h3>
              <p className="type-body text-foreground-secondary">
                {specimen.description}
              </p>
              <a className="text-link" href="#specimen-title">
                Return to specimen start
              </a>
            </article>
          ))}
        </div>

        <div className="surface-base stack-md">
          <h3 className="type-h4">Semantic states</h3>
          <ul className="state-list" aria-label="Semantic color examples">
            <li>
              <span className="state-indicator bg-success" aria-hidden="true" />
              Success
            </li>
            <li>
              <span className="state-indicator bg-warning" aria-hidden="true" />
              Warning
            </li>
            <li>
              <span className="state-indicator bg-danger" aria-hidden="true" />
              Danger
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
