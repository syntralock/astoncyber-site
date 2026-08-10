# Aston Cyber

The Aston Cyber website is the public surface for an independent, founder-led
cybersecurity engineering and research firm.

Aston Cyber is not a managed security provider, software vendor, outsourced
security function, or broad generalist consultancy.

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
- 12–22 – Phase implementation records and Phase 8–9 specifications

## Current Status

**Current Phase:** Strategic remediation; Phase G production hardening

The approved Phase 0 decisions are recorded in `docs/11-phase-0-decisions.md`.
The canonical remediation roadmap is recorded in
`docs/23-strategic-remediation-implementation-plan.md`. Phase 0 repository work
stabilized the public surface. Phase B establishes Home, Offerings, Research,
and About as primary navigation, keeps Contact as a distinct action, removes
empty Projects, Labs, and People surfaces from public discovery, and
de-emphasizes the early research taxonomy. The current Offerings experience
presents five concise, linked areas of work with dedicated detail routes and
recognizes discovery, implementation, operationalization, and continued
improvement as legitimate parts of a client relationship. Phase C established
founder-accountability and independence disclosures and safe Contact
qualification. Phase D repositions
the homepage around identity, audience, bounded engineering, research evidence,
founder accountability, and buyer-oriented next steps; aligns About; makes
Mission concise and directional; and preserves Ethos as the complete principles
statement. Phase G adds canonical and complete social metadata, crawler files,
structured data, RFC 9116 security guidance, accessibility polish, responsive
hero delivery, hashed-asset caching, and removal of PWA installability. The
static export is indexable, but public launch still requires Phase H production
verification and explicit owner approval. The approved social-preview asset is
published from `public/images/social/`. Phase 9 Search & Discovery remains
paused.
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
published secondary institutional page. Phase 8 is defined as Projects & Labs;
Writing and Speaking have moved to the future personal website at
`matt.astoncyber.com`. Phase 8 status, maturity, visibility, fixture, feed,
repository, license, technology, relationship, contributor-approval, resource,
empty-state, and homepage boundaries are documented. Pass 1 implemented the
validated content foundation and migrated the legacy Research fixture outside
the production content tree. Pass 2 implemented the Project and Lab collection
routes, reusable detail presentation, factual production empty states,
navigation cleanup, and sitemap integration. Because both production
collections are empty, their dynamic route files remain inactive under the
owner-approved activation rule. Final verification passed the complete quality
suite and generated-output inspection. Phase 8 is complete with no public
Project or Lab content. The Phase 9 Search & Discovery plan is approved in
`docs/22-phase-9-search-discovery-specification.md`; no search implementation
exists, and Phase 9.1 remains paused until additional public content or a clear
cross-collection discovery need exists.

The approved Aston Cyber visual identity is now implemented. Master logo and
icon SVGs live in `public/brand/`; browser and platform derivatives live in
`public/icons/`; and the approved homepage artwork remains at
`public/images/home/aston-cyber-hero.jpg`. The shared dark header and footer use
the reversed horizontal logo, while the homepage retains its centered hero
composition over the artwork with restrained contrast and edge-fade layers.
The site intentionally has no Web App Manifest, install-only icons, service
worker, offline behavior, or install prompt.

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

`pnpm validate:content` currently validates every Research MDX file, resolves
author, contributor, topic, and tag references, compiles safe MDX, verifies
referenced download artifacts, and checks that non-public content cannot enter
RSS or sitemap output. Production content uses `public` or `draft`; only
owner-approved `public` items are returned by production-facing loaders. Test
fixtures are explicit test inputs outside `content/`. Phase 8 pass 1 extends
the centralized build-time validation architecture to the distinct Projects
and Labs collections. Pass 2 consumes those APIs from static collection and
detail routes without adding public Project or Lab content.

## Contribution Workflow

1. Review the documentation in `/docs`.
2. Implement one project phase at a time.
3. Keep commits focused and descriptive.
4. Ensure linting, type checking, testing, and security checks pass before merging.
5. Never commit secrets or sensitive information.

## License

Copyright © Aston Cyber. All rights reserved.
