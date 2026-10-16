# Aston Cyber

This repository contains the source code, content, and infrastructure for Aston
Cyber, a founder-led Systems Modernization business. Aston Cyber helps
organizations improve operations through systems modernization, application
integration, automation, custom software, cybersecurity engineering, and
technology-risk work.

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
- 12–28 – Phase implementation records and later approved specifications

## Current Status

**Current phase:** Pass 2 systems-modernization repositioning implemented for
owner review.

The canonical business positioning is recorded in Decision 23 of
`docs/10-architecture-decision-record.md`. The repositioned implementation is
complete locally. Commit, push, merge, deployment, production verification, and
explicit owner approval remain release gates.

Home, Services, Our Approach, and About are the primary public destinations;
Contact is a distinct action. Research remains a secondary evidence surface.
Projects and Labs retain validated repository architecture but have no public
content or routes while empty. Search remains deferred until content volume
warrants implementation.

## Owner Review Gates

- Review the local diff before any commit, push, merge, or deployment.

Pass 3 updates Next.js and `eslint-config-next` to 16.3.8, pins remediated
transitive image and source-map packages, and publishes an approved-logo Systems
Modernization social card. The production dependency audit is clean at the Pass
3 review checkpoint.

The repository is intended to be public at
`https://github.com/syntralock/astoncyber-site`. The website footer uses that
same canonical repository URL.

## Technology Stack

- Next.js App Router with static export
- React and strict TypeScript
- Repository-based MDX with Zod validation
- Tailwind CSS and project-owned design tokens
- Vitest for automated tests
- pnpm 11 on Node.js 24

The application is server-first and static-first. It has no database, CMS,
analytics, authentication, service worker, Web App Manifest, or runtime API.

## Deployment Architecture

GitHub Actions validates and builds the static export, uploads the complete
`out/` directory as a short-lived artifact, and deploys that prebuilt artifact
to Azure Static Web Apps. Cloudflare provides DNS, TLS termination, and the
approved `www`-to-apex redirect. Deployment credentials remain GitHub Actions
secrets and are never available to repository build steps.

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
app/       Website application and static generated-output routes
components/ Shared shell, institutional layout, UI, and content composition
content/   Repository MDX and validated reference registries
lib/       Typed content loading, validation, and generated-output APIs
public/     Static public assets
styles/     Global design-token styles
tests/      Automated foundation tests
scripts/    Build-time validation
.github/    CI, security scanning, and Azure deployment workflows
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

Report suspected vulnerabilities privately according to [SECURITY.md](SECURITY.md),
not through a public issue.

## License

This repository is publicly viewable but is not open source. Copyright © Aston
Cyber. All rights reserved. See [LICENSE](LICENSE).
