# Aston Cyber

The Aston Cyber website is a ground-up rebuild for an independent cybersecurity research institution focused on research, engineering, and education.

Aston Cyber is not a consultancy, managed security provider, SaaS company, or marketing website.

This repository is the single source of truth for the website.

## Project Documentation

All planning documents are located in the `/docs` directory.

Development must follow the guidance in:

- 00 – Brand Identity Brief
- 01 – Design System
- 02 – Navigation
- 03 – Organization
- 04 – Content Strategy
- 05 – The Aston Cyber Ethos
- 06 – Website Specification
- 07 – Website Project Plan
- 08 – Build Instructions
- 09 – Development Rules
- 10 – Architecture Decision Record
- 11 – Phase 0 Decisions
- 12–19 – Phase implementation records

## Current Status

**Current Phase:** Phase 7.1 Desktop Composition and Navigation Refinement

The approved Phase 0 decisions are recorded in `docs/11-phase-0-decisions.md`.
Phase 1 established the application, validation, content-safety, and CI
foundation. Phase 2 completed the visual token system. Phase 2.1 refines
that system for an editorial research publication. Phase 3 implements
the accessible shared application shell without beginning production
page implementation. Phase 4 provides only the reusable primitives
approved for the first research-content vertical slice. Phase 5 adds the
validated, repository-based research content engine, a non-public technical
fixture, and public-only RSS and sitemap generation. Phase 6 publishes the
approved institutional page set with direct email contact, a neutral People
empty state, and reusable person-profile architecture. Phase 7 publishes the
owner-approved Secure Transaction Authorization Ledger case study, its
original DOCX manuscript, a static research index, and taxonomy-derived topic
pages. Search, client-side filtering, public person profiles, and contact forms
remain deferred. Phase 7.1 refines the desktop composition of the homepage,
Mission page, and Research index; promotes the first report as flagship work;
and limits public primary navigation to Home, Research, Projects, Labs, and
About while preserving the successful mobile experience. Mission remains a
published secondary institutional page.

## Engineering Principles

- Security by default
- Accessibility by default
- Simplicity over complexity
- Server-first architecture
- Strict TypeScript
- Shared components and design tokens
- Small, reviewable changes
- No undocumented architectural decisions

## Repository Structure

```text
docs/      Project planning and specifications
assets/    Brand assets and media
app/       Website application and static generated-output routes
components/ Shared shell, institutional layout, UI, and content composition
content/   Repository MDX and validated reference registries
lib/       Typed content loading, validation, and generated-output APIs
public/     Static public assets
styles/     Global design-token styles
tests/      Automated foundation tests
scripts/    Build-time validation
```

## Local Development

Use Node.js 24 and pnpm 11.

```text
pnpm install --frozen-lockfile
pnpm dev
```

Run the complete local quality sequence with:

```text
pnpm validate
```

The production build is a static export in `out/`. Use `pnpm start` to
preview that export locally after `pnpm build`.

`pnpm validate:content` validates every research MDX file, resolves author,
contributor, topic, and tag references, compiles safe MDX, verifies referenced
download artifacts, and checks that non-public content cannot enter RSS or
sitemap output. Content uses the required `visibility` values `public`,
`draft`, or `fixture`; only owner-approved `public` items are returned by
production-facing loaders.

## Contribution Workflow

1. Review the documentation in `/docs`.
2. Implement one project phase at a time.
3. Keep commits focused and descriptive.
4. Ensure linting, type checking, testing, and security checks pass before merging.
5. Never commit secrets or sensitive information.

## License

Copyright © Aston Cyber. All rights reserved.
