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

**Decision:** Use shadcn/ui as a starting point only.

**Why:**
- Accessible component primitives
- Components become part of the repository
- Full control over customization
- No dependency on a hosted UI library

---

# Decision 6 — Content

**Decision:** Markdown and MDX stored in the repository.

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

**Decision:** Use automated CI/CD with separate preview and production environments.

**Requirements:**
- Protected main branch
- Required status checks
- Repeatable builds
- Rollback capability

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
- Components: shadcn/ui (customized)
- Validation: Zod
- Content: Markdown / MDX
- Testing: Vitest + Playwright (planned)
- CI/CD: GitHub Actions
- Repository: GitHub
- Database: None
- CMS: None
- Analytics: None by default

---

This document should evolve only through deliberate architectural review, not convenience.
