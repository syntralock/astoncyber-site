# 10 – Architecture Decision Record (ADR)

## Purpose

This document records the foundational architectural decisions for the Aston Cyber website. It explains not only *what* technologies were chosen, but *why* they were chosen, so future changes can be evaluated against the original design goals.

---

# Guiding Principles

Every architectural decision should support these priorities, in order:

1. Security
2. Simplicity
3. Accessibility
4. Performance
5. Maintainability
6. Long-term sustainability

---

# Decision 1 — Framework

**Decision:** Use Next.js (App Router).

**Why:**
- Mature React framework
- Excellent support for static generation and server rendering
- Strong TypeScript integration
- Modern routing model
- Broad ecosystem and long-term support

---

# Decision 2 — Language

**Decision:** TypeScript with `strict` mode enabled.

**Why:**
- Catch errors early
- Improve maintainability
- Better editor tooling
- Safer refactoring

---

# Decision 3 — Package Manager

**Decision:** pnpm.

**Why:**
- Fast installs
- Efficient disk usage
- Deterministic lockfile
- Well suited for long-lived projects

---

# Decision 4 — Styling

**Decision:** Tailwind CSS v4 with project-specific design tokens.

**Why:**
- Consistent design language
- Small production output
- No hardcoded visual values
- Easy reuse of components

---

# Decision 5 — Component Foundation

**Decision:** shadcn/ui is an optional source of accessible primitives only.

**Why:**
- Accessible primitives may reduce risk for genuinely complex controls
- Adopted primitives become part of the repository and remain fully customizable
- Layout, typography, navigation, and core site components remain project-native
- Each adopted primitive requires justification and review for accessibility, dependency cost, and client-side JavaScript

---

# Decision 6 — Content

**Decision:** Repository-based MDX for long-form content, with Zod-validated front matter and raw HTML disabled by default.

**Why:**
- Version controlled
- Human readable
- No database required
- Easy review through Git

---

# Decision 7 — Validation

**Decision:** Zod for schema validation.

**Why:**
- Runtime validation
- Strong TypeScript integration
- Reliable validation of front matter, configuration, and forms

---

# Decision 8 — Database

**Decision:** No database for the initial release.

**Why:**
- Not currently required
- Smaller attack surface
- Lower maintenance burden
- Simpler deployments

---

# Decision 9 — CMS

**Decision:** No headless CMS initially.

**Why:**
- Repository-based content is sufficient
- Eliminates unnecessary complexity
- Keeps content review in Git

---

# Decision 10 — Analytics

**Decision:** No analytics by default.

**Why:**
- Privacy-first philosophy
- Reduced third-party JavaScript
- Improved performance
- Avoid unnecessary tracking

---

# Decision 11 — Deployment

**Decision:** Deploy the static-first Next.js site to Azure Static Web Apps at `astoncyber.com` through GitHub Actions, with separate preview and production environments.

**Requirements:**
- Protected main branch
- Required status checks
- Repeatable builds
- Rollback capability
- Least-privilege GitHub Actions permissions
- Preview deployment protections
- No assumption of server-side infrastructure without a future architectural review

---

# Decision 12 — Security

Security requirements are defined in `09-development-rules.md` and apply to every implementation decision.

Key principles include:
- Least privilege
- Defense in depth
- Secure defaults
- Dependency minimization
- No committed secrets
- Content Security Policy
- HTTPS everywhere

The Phase 1 baseline includes Content Security Policy planning, security
headers, environment validation, secret scanning, dependency review,
least-privilege GitHub Actions permissions, preview deployment
protections, and safe MDX rendering.

Before launch, the static site must publish an RFC 9116 file at
`/.well-known/security.txt` with the field
`Contact: mailto:security@astoncyber.com`.

---

# Decision 13 — Theme

**Decision:** The initial release is dark-theme only.

**Requirements:**
- Use the semantic design tokens in `01-design-system.md`.
- Preserve a future light theme without component rewrites.
- Do not add a theme control in the initial release.

---

# Decision 14 — Search

**Decision:** Defer site search until content volume demonstrates a clear need.

**Why:**
- Avoid premature client-side or hosted search complexity
- Reduce privacy, security, and maintenance costs
- Validate discovery needs using real content first

---

# Decision 15 — Non-Public Content Fixtures

**Decision:** Content metadata uses a required
`visibility: public | draft | fixture` field.

**Why:**
- `public` is an explicit owner-approved publication boundary.
- `draft` retains its ordinary authoring meaning and remains absent from
  production-facing content.
- `fixture` is a separate technical state that can prove the complete Phase 5
  content pipeline without representing fabricated research as publication.

A fixture may exercise schemas, safe MDX compilation, references, citation
metadata, shared index-card composition, shared detail rendering, and static
build validation. It must contain no invented research findings, claims,
affiliations, biographies, disclosures, or organizational history.

Only public content may enter public loaders, navigation, research indexes,
RSS, sitemap output, or other publication surfaces. Drafts and fixtures must
both be excluded. A fixture creates no public route or publication artifact,
does not replace the first owner-approved research publication and disclosure
status, and does not replace the complete public research experience.

**Date adopted:** 2026-07-25

---

# Decision 16 — Phase 6 Static Institutional Publication

**Decision:** Phase 6 institutional pages remain fully static and use direct
approved email links for contact.

**Requirements:**
- No contact form, Server Action, API route, external form provider, mail
  service, or server-side inquiry infrastructure is approved.
- Any future public form requires a separate architecture and security review.
- The homepage omits research, current-work, project, and writing sections
  until approved public content exists.
- People architecture may be implemented without publishing a person route.
- Institutional pages use only approved repository language and limited
  operational disclosure guidance.
- No photography, generated imagery, placeholder portraits, or decorative hero
  imagery is required or approved.

**Consequences:**
- The static export requires no new runtime service, environment variable,
  secret, dependency, or browser JavaScript.
- Direct general-inquiry and responsible-disclosure email links may appear only
  in their approved contexts.
- Missing publication and profile content is intentionally omitted or
  represented by a neutral editorial empty state.

**Date adopted:** 2026-07-25

---

# Future Changes

Architectural changes should be documented by extending this ADR rather than silently replacing decisions.

Each new decision should include:

- Context
- Decision
- Alternatives considered
- Consequences
- Date adopted

---

# Current Baseline

- Framework: Next.js
- Language: TypeScript (strict)
- Routing: App Router
- Package Manager: pnpm
- Styling: Tailwind CSS v4
- Components: Project-native; shadcn/ui primitives optional by exception
- Validation: Zod
- Content: Repository-based MDX; raw HTML disabled by default
- Testing: Vitest + Playwright (planned)
- CI/CD: GitHub Actions
- Hosting: Azure Static Web Apps
- Primary domain: astoncyber.com
- Theme: Dark only initially; semantic tokens support a future light theme
- Search: Deferred pending demonstrated content need
- Content visibility: Explicit `public`, `draft`, and non-public `fixture`
  states; only `public` content enters publication surfaces
- Phase 6 contact: Static direct email links only; no form or inquiry service
- Repository: GitHub
- Database: None
- CMS: None
- Analytics: None by default

---

This document should evolve only through deliberate architectural review, not convenience.
