# 21 – Phase 8 Projects & Labs Implementation

## Status

Phase 8 completed and verified on 2026-07-27. Phase 9 has not begun.

## Objective

Phase 8 establishes distinct, validated, repository-based Project and Lab
publishing collections while preserving static export, Server Components,
structural MDX safety, the existing Research experience, and minimal browser
JavaScript.

No public Project or Lab content shipped. The public collection pages therefore
use factual empty states.

## Final Architecture

- `lib/content/repository.ts` centrally loads Research, Project, and Lab MDX,
  resolves reference registries, validates resources and relationships, and
  separates trusted internal items from public APIs.
- `lib/content/schema.ts` defines strict, separate Project and Lab Zod schemas.
- `lib/content/policies.ts` owns lifecycle, maturity, license, repository, and
  resource policies.
- `lib/content/projects.ts` and `lib/content/labs.ts` expose deterministic
  collection, public lookup, static-parameter, metadata, MDX evaluation, and
  relationship APIs.
- `app/projects/page.tsx` and `app/labs/page.tsx` are static Server Component
  collection routes.
- Project and Lab cards, collections, details, and related-publication
  presentation reuse established UI primitives without collapsing the two
  editorial concepts.
- `app/sitemap.ts` consumes centralized public APIs. Research RSS remains
  Research-only.

No CMS, database, authentication, analytics, runtime content fetching,
repository API request, third-party runtime script, or new Client Component was
added.

## Files and Modules Added

- Project and Lab collection routes under `app/projects/` and `app/labs/`
- Project, Lab, and related-publication components under `components/content/`
- `lib/content/projects.ts`, `lib/content/labs.ts`,
  `lib/content/repository.ts`, and `lib/content/policies.ts`
- `content/references/technologies.yml`
- isolated fixtures under `tests/fixtures/content/`
- focused Phase 8 content-foundation and route tests

Existing Research, schema, MDX, generated-output, sitemap, navigation, status,
validation, test, documentation, and shared-style modules were changed only as
required for Phase 8.

## Project Schema

Project front matter is strict and contains:

- required `title`, `slug`, `summary`, `visibility`, `status`,
  `contributors`, `topics`, and `tags`;
- optional `published_at`, `completed_at`, `repository_url`, `project_url`, and
  `license`;
- defaulted `technologies`, `resources`, `related_research`,
  `related_projects`, `related_labs`, and `featured`.

The MDX body is not a front matter field. Public Projects require
`published_at` or `completed_at`. When both exist, publication cannot precede
completion.

Project status accepts exactly `active`, `stable`, `completed`, and `archived`.

## Lab Schema

Lab front matter is strict and contains:

- required `title`, `slug`, `summary`, `visibility`, `maturity`,
  `contributors`, `topics`, and `tags`;
- optional `published_at`, `repository_url`, and `license`;
- defaulted `technologies`, `resources`, `related_research`,
  `related_projects`, `related_labs`, and `featured`.

The MDX body is not a front matter field. Public Labs require `published_at`.
Installation and usage guidance remains safe MDX rather than speculative
structured metadata.

Lab maturity accepts exactly `experimental`, `prototype`, `beta`, `stable`,
and `archived`. Presentation includes a visible textual maturity label and
readiness description.

## Visibility and Fixture Isolation

Production visibility accepts exactly `public` and `draft`; it remains
independent from Project status and Lab maturity.

The legacy Research fixture moved from `content/research/` to
`tests/fixtures/content/research/`. All Research, Project, Lab, and reference
fixtures live under `tests/fixtures/content/` and are available only when tests
pass that root explicitly. Production roots are explicit and never scan or
import the fixture tree.

Public loaders omit source file paths and exclude drafts. Fixtures cannot enter
production loaders, lookups, static parameters, routes, metadata, relationships,
sitemap, RSS, counts, client bundles, or exported output.

## Controlled Registries and Policies

The technology registry contains only:

- `mdx` → MDX
- `nextjs` → Next.js
- `typescript` → TypeScript

Canonical identifiers are required; unknown, duplicate, empty, display-name,
and case-variant substitutes fail.

The license registry contains the approved SPDX values `MIT`, `Apache-2.0`,
`BSD-2-Clause`, `BSD-3-Clause`, `GPL-3.0-only`, `MPL-2.0`, `CC-BY-4.0`,
`CC-BY-SA-4.0`, and `CC0-1.0`, plus Aston Cyber values `proprietary` and
`unlicensed`. Open-source classification is derived from this registry.
`proprietary` and `unlicensed` are not SPDX values and are never classified as
open source. No separate front matter boolean exists.

Repository URLs require HTTPS, no credentials or port, and an exact normalized
hostname of `github.com` or `gitlab.com`. Relative, protocol-relative,
malformed, deceptive-suffix, substring, and lookalike values fail. The build
performs no repository network request.

Directly hosted resources allow only PDF, TXT, CSV, JSON, YAML, YML, XML,
Markdown, PNG, JPEG, WebP, and GIF with exact lowercase extension/MIME pairs.
Paths must be normalized, remain in the matching
`/downloads/projects/` or `/downloads/labs/` location, exist at build time, and
have a non-empty label. SVG, ZIP, executable, installer, compiled or dynamic
library, script, package, disk-image, container-image, uppercase-bypass,
MIME-mismatch, traversal, duplicate, and unsupported declarations fail.

## Relationship Model

Research, Projects, and Labs use explicit directional slug references.
Validation rejects malformed or duplicate references, missing or
wrong-collection targets, self-references, test-fixture targets, and public
references to drafts. Reciprocal links are never inferred.

Public relationship resolution preserves declared order and returns only
public targets without source paths or non-public metadata.

## Collection and Detail Behavior

`/projects` and `/labs` always export. With no approved public entries, each
page explains its collection and states factually that no public entries are
currently available. No card, count, date, contributor, hidden-work claim, or
“coming soon” promise is invented.

The approved future detail URLs remain `/projects/[slug]` and `/labs/[slug]`.
Because both production collections are empty, neither dynamic route file is
active. No placeholder, fixture, draft, or sentinel slug is generated.

The first approved public item in a collection must activate its dynamic route
template in the same reviewed change. The exact activation steps are recorded
in `docs/20-phase-8-projects-labs-specification.md`. The reusable detail
components, public lookups, static-parameter APIs, metadata helpers, safe MDX
evaluation, relationship resolution, and unknown-slug boundary are preserved
and tested until activation.

## Sitemap and RSS

The sitemap includes `/projects` and `/labs`. It derives future detail entries
only from approved public loaders, so the empty production collections produce
no detail URLs.

The existing Research routes and topic routes remain present. Research RSS is
unchanged, contains only the approved Research report, and has no Project or
Lab feed counterpart.

## Accessibility Verification

- Each collection and tested detail presentation contains one H1.
- Collection results use semantic lists and cards; empty states are factual.
- Links are keyboard operable and retain the established visible focus style.
- Status and maturity use explicit text, not color alone.
- Experimental Lab presentation states that it is not production-ready.
- Optional sections are omitted without empty headings or containers.
- Existing responsive grid and reading-width primitives avoid content loss.
- No Phase 8 Client Component or pointer-only interaction was introduced.

## Regression and Cleanup

Research collection, detail, topic, metadata, sitemap, RSS, artifact, and
static-generation behavior passed. Institutional routes and the homepage
remain unchanged.

Writing and Speaking have no active Aston Cyber route, navigation entry,
collection, feed, sitemap entry, source configuration, or generated output.
Historical documentation remains historical.

## External-contributor Approval Deferral

No external-contributor Project or Lab is approved. Phase 8 created no approval
record, private registry, submission workflow, moderation workflow,
authentication, or contributor account.

The first approved external submission requires a separately reviewed,
minimal, private, repository-controlled approval-evidence contract with
build-time validation and complete exclusion from public output.

## Tests and Validation

Final clean-state verification ran:

```text
pnpm format:check
pnpm lint
pnpm typecheck
pnpm exec vitest run tests/phase-8-content-foundation.test.ts tests/phase-8-routes.test.tsx
pnpm test
pnpm validate:env
pnpm validate:content
pnpm build
git diff --check
```

Results:

- formatting, ESLint, and strict TypeScript passed;
- 75 focused Phase 8 tests passed;
- 200 total tests across 11 files passed;
- environment and content validation passed;
- validation found 1 public Research item, 0 Projects, and 0 Labs;
- the production build exported 20 static pages successfully;
- generated-output, route-manifest, sitemap, RSS, fixture, draft, placeholder,
  sentinel, source-path, private-field, Writing, and Speaking inspections
  passed;
- package, lockfile, homepage, Azure configuration, deployment workflow, and
  hosting architecture remained unchanged;
- `git diff --check` passed.

An ignored local `.DS_Store` was discovered in `public/` during the first
generated-output inspection. It was moved out of the repository, the generated
state was rebuilt cleanly, and the final export contains no temporary metadata
file.

## Dependencies and Deviations

No dependency or lockfile changed. No implementation deviation remains.

The only deliberate deferrals are:

- public Project and Lab content;
- activation of each detail route with its first approved public item;
- concrete external-contributor approval storage until a real approved
  submission defines the contract;
- Phase 9 Search & Discovery.

Phase 9 was not started.
