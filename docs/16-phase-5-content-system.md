# 16 – Phase 5 Content System

## Status

Phase 5 content system implemented for review. Phase 6 has not begun.

## Implemented scope

Phase 5 establishes the research-first repository content engine approved in
the project plan:

- Repository-based MDX
- Strict Zod front matter and reference schemas
- Structural MDX safety enforcement with raw HTML, scripts, expressions,
  imports, exports, spread attributes, unknown components, and unknown
  component attributes rejected
- Centralized typed collection, public-list, and public-slug lookup APIs
- Author, contributor, topic, and tag reference registries
- Draft, fixture, and public visibility handling
- Publication and revision date validation
- Citation metadata
- One complete non-public technical fixture through schema validation,
  reference resolution, MDX evaluation, shared Research Card composition,
  shared detail rendering, citation output, and the static production build
- Deterministic public-only RSS and sitemap generation

No institutional page, public research index or detail route, secondary
collection, search feature, database, CMS, authentication system, analytics, or
third-party runtime script was added.

## Content directory

```text
content/
  references/
    authors.yml
    tags.yml
    topics.yml
  research/
    content-system-technical-fixture.mdx
```

The reference registries contain stable identifiers and display labels only.
The technical fixture contains neutral explanatory material about the
content-system test. It contains no research findings, claims, affiliations,
biographies, disclosures, or organizational history.

> Phase 8 amendment: this section records the Phase 5 implementation as it
> shipped. Before Phase 8 ships, the legacy fixture must move to
> `tests/fixtures/content/research/`; production visibility must become
> `public | draft`; and test fixture paths must be impossible for production
> loaders and generators to discover.

## Schema and reference model

Every research item requires:

- `title`, `slug`, and `summary`
- Approved `research_type` and research `status` enum values
- `visibility: public | draft | fixture`
- At least one author, topic, and tag identifier
- A contributor identifier list, which may be empty
- Explicit `featured` state
- Strict citation metadata

Unknown keys fail validation. Slugs and reference identifiers use lowercase
hyphenated syntax. Duplicate research slugs and duplicate registry identifiers
fail validation.

Author and contributor identifiers resolve through `authors.yml`. Topic and tag
identifiers resolve through their separate registries. Every unresolved
reference fails with the source file and missing identifier.

`visibility` is the publication boundary:

- `public` requires `status: published`, `published_at`, and
  `disclosure_status`; it is eligible for public loaders and generated output.
- `draft` remains ordinary authoring work and is excluded from every
  production-facing loader and generated output.
- `fixture` requires `status: technical-validation`, cannot define
  `published_at` or `disclosure_status`, cannot be featured, and is excluded
  from all public routes, navigation, indexes, RSS, sitemap output, and other
  publication surfaces.

The `fixture` production metadata state above is historical Phase 5 behavior
and is superseded by the Phase 8 amendment. Fixture inputs remain available to
tests only after migration outside `content/`.

When both dates exist, `updated_at` cannot precede `published_at`. ISO calendar
dates are required. Items are deterministically ordered by publication date
then slug.

## Typed API

`lib/content/research.ts` centralizes filesystem access and exposes:

- `loadResearchCollection()` for build validation and trusted internal tooling
- `getPublicResearch()` for deterministic production-facing collection access
- `getPublicResearchBySlug()` for public-only slug lookup
- `validateContentRepository()` for the build validation command

Future routes must consume these APIs rather than parse files or resolve
references independently. The all-content loader is not a publication API.

`lib/content/generated.ts` creates RSS XML and sitemap entries after applying
the public visibility boundary again. This defense-in-depth filter prevents an
internal caller from leaking draft or fixture items by passing the full
collection. The canonical production origin is `https://astoncyber.com`.

## Authoring workflow

1. Add or reuse stable identifiers in the reference registries.
2. Create an MDX file directly under `content/research/`.
3. Supply strict front matter and safe Markdown or allowlisted MDX.
4. Use `visibility: draft` during authoring.
5. Run `pnpm validate:content` or the complete `pnpm validate` sequence.
6. Obtain owner approval for the first real research publication and its
   disclosure status before changing it to `visibility: public`.

The technical fixture must remain non-public. It does not replace the first
owner-approved publication or the complete Phase 7 research experience.

## Valid front matter example

This public example demonstrates structure only; it is not present in the
repository content collection:

```yaml
---
title: Approved publication title
slug: approved-publication-title
summary: Owner-approved publication summary.
research_type: technical-report
status: published
visibility: public
published_at: 2026-07-25
updated_at: 2026-07-25
authors:
  - approved-author
contributors: []
topics:
  - approved-topic
tags:
  - approved-tag
featured: false
disclosure_status: not-applicable
citation:
  label: Approved citation label
  publisher: Aston Cyber
  year: 2026
---
```

The referenced identifiers must already exist in their registries.

## Invalid front matter example

```yaml
---
title: Invalid fixture
slug: Invalid Fixture
summary: Invalid fixture metadata.
research_type: unknown
status: completed
visibility: fixture
published_at: July 25
authors:
  - missing-author
contributors: []
topics:
  - missing-topic
tags:
  - missing-tag
featured: true
citation:
  label: Invalid fixture
  publisher: Unapproved publisher
---
```

This fails for an invalid slug, enum, date, fixture status, fixture publication
date, featured fixture, publisher, and unresolved references.

## Draft and generated-output behavior

The production-facing loader returns only `visibility: public` items. At Phase
5 completion the repository contained no approved public research, so:

- RSS is a valid feed with no item entries.
- Sitemap contains the existing root page and no research entries.
- No `/research` index or detail route is generated.
- The fixture title, slug, and body are absent from `out/`.

The Next.js metadata route and static RSS route are generated during the
existing static export. They use no runtime service or browser JavaScript.
Phase 7 subsequently added the first approved public report; its current
publication behavior is recorded in `docs/18-phase-7-research-experience.md`.

## Validation

Run:

```text
CI=true pnpm install --frozen-lockfile
pnpm validate
git diff --check
```

`pnpm validate` includes formatting, linting, strict TypeScript, all Vitest
tests, environment validation, content validation, and the production static
build.

Automated tests cover valid and invalid metadata, malformed dates, invalid enum
values, duplicate slugs, invalid collection placement, unresolved author,
contributor, topic, and tag references, date ordering, structural MDX bypass
attempts, public lookup exclusion, navigation exclusion, public-only RSS and
sitemap output, and shared card/detail rendering of the technical fixture.

## Dependencies

No dependency was added. Phase 5 uses the existing approved packages:

- `@mdx-js/mdx` for structural compilation and evaluation
- `yaml` for front matter and registry parsing
- `zod` for strict runtime validation and typed boundaries

The implementation therefore adds no transitive package cost, new license,
remote service, or runtime script.

## Security considerations

The MDX safety boundary is parser/compiler-based, not regex-based. A remark
plugin inspects the MDX abstract syntax tree. The front matter regular
expression only extracts the required YAML envelope and is not a security
control.

The explicit component allowlist currently permits only `Callout` and its
static `title` attribute. JavaScript expressions, event-handler expressions,
spread attributes, ESM, raw HTML, scripts, unknown elements, and unknown
attributes fail validation. Zod strict objects reject unsupported metadata.
All content and registry files are treated as untrusted build-time input.

The content system performs no network requests, receives no secrets, and
creates no client bundle or runtime content-fetching path.

## Accessibility implications

The fixture exercises the existing semantic Research Card and a shared detail
composition using article, header, heading, metadata definition-list, aside,
and footer elements. The Callout uses an `aside` with an optional real heading.
No new interaction or browser JavaScript was introduced. Public page-level
accessibility and research-template review were deferred to and completed in
Phase 7.

## Known limitations and deferred work

- The public research index and detail routes, complete research template,
  disclosure presentation, references, download, revision metadata, static
  topic views, and print treatment were deferred to and completed in Phase 7.
- Distinct Projects and Labs collections and interfaces (Phase 8), plus
  content-dependent People publication
- Public research topic pages and static topic filtering (Phase 7);
  cross-collection discovery, pagination, and any separately approved search
  experience remain Phase 9
- Complete SEO, social previews, structured data, and validation of RSS and
  sitemap in the broader metadata system (Phase 10)
- Institutional pages and production homepage content (Phase 6)

Decision 19 assigns personal Writing and Speaking to
`matt.astoncyber.com`; they are not future Aston Cyber collections.

Phase 8 reuses the Phase 5 architecture for strict Zod front matter,
file-specific validation errors, structural MDX safety, contributor/topic/tag
resolution, deterministic public loaders, draft exclusion, static generation,
and generated-output leakage checks. It must not reuse the production Research
fixture mechanism for Projects or Labs: Phase 8 test fixtures live outside all
production content directories and are inaccessible to production discovery.

Project status and Lab maturity are independent from publication visibility.
Phase 8 adds controlled technology and license registries, exact repository-host
validation, resource allowlists, explicit directional relationships, and
private contributor-approval evidence. The existing Research RSS feed remains
Research-only.
