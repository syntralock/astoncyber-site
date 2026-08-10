# Aston Cyber
# Phase D: Homepage Repositioning and Institutional Alignment

## Status

Implemented for review on 2026-08-07.

This record documents the repository implementation of Phase D from the
canonical remediation roadmap in
`23-strategic-remediation-implementation-plan.md`. It does not authorize Phase
E or later work.

## Homepage Responsibility

The homepage now answers what Aston Cyber is, whom it serves, the kinds of
problems it addresses, how its work is bounded, why research is relevant, who
is accountable, and where a visitor should go next.

The centered hero composition, approved background artwork, established
typography, spacing, and section patterns remain unchanged. The hero identifies
Aston Cyber as an independent, founder-led cybersecurity engineering and
research firm serving financial services and selected consequential
environments. Its direct paths now lead to Offerings and Research rather than
Mission and Ethos.

The existing three-part section now establishes audience, bounded engineering,
and founder accountability. The existing featured-publication section presents
research as evidence of method. About and Contact remain natural later steps in
the page without turning the homepage into a sales surface.

## Institutional Responsibilities

- **Home:** What Aston Cyber is, whom it serves, and where to go next.
- **About:** Who Aston Cyber is, its operating model, engagement philosophy,
  founder accountability, current operating status, and independence.
- **Mission:** Why Aston Cyber exists, expressed concisely through understanding
  consequential problems, engineering practical responses, and sharing useful
  knowledge.
- **Ethos:** The complete statement of how Aston Cyber operates.
- **Offerings:** How Aston Cyber may help across discovery, strategy,
  engineering, review, operationalization, improvement, and research.
- **Research:** Evidence of method, technical depth, and limitation-setting.
- **Contact:** A safe beginning to a qualified conversation.

The Founder section remains factual and unchanged in scope. Mission no longer
duplicates the complete principles list because Ethos owns that responsibility.
Ethos retains its philosophy; only independence language was aligned with the
approved commercial boundaries.

## Independence Presentation

At the owner's direction for Phase D, funding and sponsorship discussion was
removed from the public buyer journey. Earlier records remain historically
accurate and the underlying owner decisions remain governance facts.

Current public independence language states that Aston Cyber accepts no vendor
commissions, vendor resale incentives, or paid referral arrangements; separates
commercial work from public research; discloses relevant conflicts; protects
client information; and keeps conclusions proportional to evidence.

## Boundaries Preserved

- Primary and secondary navigation were not changed.
- No route was added, removed, or redirected.
- The homepage layout, visual system, typography, and hero treatment were not
  redesigned.
- Research and Contact content were not changed.
- No client-side JavaScript or dependency was added.
- The temporary noindex/nofollow posture remains unchanged.
- SEO, structured data, accessibility remediation, PWA removal, security-header
  work, and production hardening remain later phases.

## Validation

Validation completed on 2026-08-07:

- `pnpm validate` passed formatting, linting, TypeScript, all 203 tests,
  environment validation, content validation, production build, and static
  export.
- Generated Home, About, Mission, and Ethos pages were inspected from the
  static export.
- Those four pages were reviewed at 320, 375, 768, 1024, and 1440 CSS pixels.
  Each retained one `h1` and produced no horizontal overflow.
- The homepage exposed Offerings, Research, About, and Contact as clear next
  steps while the unchanged primary navigation remained Home, Offerings,
  Research, and About with Contact as a distinct action.
- The 320-pixel native mobile menu opened correctly, and keyboard focus on the
  primary Offerings action retained a visible two-pixel solid outline.
- Public-page inspection found no remaining funding or sponsorship discussion.
- The temporary noindex/nofollow posture remained in the generated output.
- `git diff --check` passed.

## Exit Assessment

Phase D is complete when a new visitor can identify Aston Cyber, its primary
audience, relevant problem categories, bounded founder-led model, research
evidence, and the appropriate next destination without encountering conflicting
institutional descriptions or funding discussion in the buyer journey.
