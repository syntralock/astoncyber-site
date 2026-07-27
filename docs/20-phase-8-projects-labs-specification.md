# 20 – Phase 8 Projects & Labs Specification

## Status

Complete. Pass 1 implemented the content foundation. Pass 2 implemented static
collection and detail presentation, factual empty states, navigation cleanup,
and sitemap integration. Final verification passed the complete validation and
generated-output checks. No public Project or Lab content was created, so the
owner-approved empty-collection detail-route activation rule remains in force.

### Empty-collection detail-route activation

The owner-approved static-export rule is:

- `/projects` and `/labs` always exist.
- `/projects/[slug]` becomes an active exported route only when at least one
  approved public Project exists.
- `/labs/[slug]` becomes an active exported route only when at least one
  approved public Lab exists.
- Placeholder, fixture, draft, and sentinel slugs must never satisfy static
  export.
- Activating a detail route occurs in the same reviewed change as the first
  approved public entry in that collection.

The future URL contracts remain `/projects/[slug]` and `/labs/[slug]`. They are
deferred, not redesigned or abandoned.

To activate Project details:

1. Add and validate the first owner-approved public Project MDX.
2. Add `app/projects/[slug]/page.tsx`.
3. Export `dynamicParams = false`.
4. Export `generateStaticParams()` using `getPublicProjectStaticParams()`.
5. Implement metadata with `getPublicProjectBySlug()` and
   `metadataForPublicProject()`.
6. Resolve content with `getPublicProjectBySlug()` and
   `resolvePublicProjectRelationships()`, evaluate it with
   `evaluateProjectBody()`, and render the existing `ProjectDetail` component
   through the established safe MDX component map.
7. Use `notFound()` when the public item or relationships are unavailable.

To activate Lab details:

1. Add and validate the first owner-approved public Lab MDX.
2. Add `app/labs/[slug]/page.tsx`.
3. Export `dynamicParams = false`.
4. Export `generateStaticParams()` using `getPublicLabStaticParams()`.
5. Implement metadata with `getPublicLabBySlug()` and
   `metadataForPublicLab()`.
6. Resolve content with `getPublicLabBySlug()` and
   `resolvePublicLabRelationships()`, evaluate it with `evaluateLabBody()`,
   and render the existing `LabDetail` component through the established safe
   MDX component map.
7. Use `notFound()` when the public item or relationships are unavailable.

Until activation, the reusable detail components, loaders, metadata helpers,
relationship resolution, and test-only detail fixtures remain in place outside
the active App Router.

## Objective

Phase 8 is named **Projects & Labs**. It adds two distinct repository-based MDX
publishing collections that reuse the validated, static, server-first
publication architecture established for Research.

- **Projects** publishes completed or substantially complete cybersecurity work
  produced by Aston Cyber or approved external contributors.
- **Labs** publishes open-source security tools, utilities, scripts,
  proof-of-concepts, experiments, detection content, and other creative
  security ventures.

Projects and Labs share infrastructure where that improves consistency, but
they are not aliases. Each collection must retain a distinct editorial purpose,
status language, detail-page emphasis, and relationship model.

## Goals

- Provide typed, validated Project and Lab MDX collections.
- Publish static collection and detail routes for approved public content.
- Reuse Phase 5 content safety, visibility, reference resolution, and loader
  patterns without weakening them.
- Reuse Phase 4 cards and metadata primitives where their semantics fit.
- Attribute Aston Cyber and approved external contributors accurately.
- Validate repositories, downloads, licenses, and cross-collection references.
- Give later Phase 9 discovery one deterministic public API spanning Research,
  Projects, and Labs.
- Preserve zero unnecessary browser JavaScript.

## Non-goals

Phase 8 does not:

- implement Writing or Speaking on `astoncyber.com`;
- implement `matt.astoncyber.com`;
- implement search, cross-collection filters, pagination, or topic landing
  pages;
- add a CMS, runtime database, authentication, analytics, hosted content
  service, or third-party runtime script;
- add project management, issue tracking, release automation, package
  publishing, binary hosting, or software-update infrastructure;
- invent projects, labs, contributors, affiliations, licenses, repositories,
  demonstrations, claims, or usage guidance;
- redesign Research, the shared shell, or the design system;
- begin Phase 9, Phase 10, or launch work.

Writing and Speaking are assigned to the future personal website at
`matt.astoncyber.com`. That site is expected after Phase 9 and before Phase 10
so cross-domain SEO and launch work can be coordinated.

## Content Model

All Phase 8 long-form content uses repository-based MDX, Zod-validated front
matter, Git history, structural MDX safety checks, and build-time loading.
Raw HTML remains disabled by default. Imports, exports, scripts, JavaScript
expressions, spread attributes, unknown components, and non-static allowlisted
component attributes remain rejected.

Both collections use:

- a required canonical slug unique within its collection;
- explicit publication visibility independent from Project status or Lab
  maturity;
- validated contributor, topic, and tag references;
- deterministic publication sorting;
- file-specific validation errors;
- public-only loaders and route generation;
- no client-side content fetching.

### Project

A Project is completed or substantially complete cybersecurity work produced
by Aston Cyber or an approved external contributor.

A Project may include:

- title;
- slug;
- summary;
- description or MDX body content;
- publication or completion date;
- status;
- contributors;
- topics and tags;
- technologies;
- repository URL;
- project or demonstration URL;
- license;
- downloads or resources;
- related Research;
- related Projects;
- related Labs;
- featured state.

Project presentation emphasizes the completed work, its purpose, contributors,
status, implementation or outcome, repository and resource access, license,
limitations, and relevant research context. Project status must not imply
production readiness, maintenance, support, security review, or warranty unless
approved content says so explicitly.

Project `status` accepts exactly:

- `active`;
- `stable`;
- `completed`;
- `archived`.

Status describes the Project lifecycle. It does not authorize publication and
must not be used as a substitute for visibility.

### Lab

A Lab is an open-source security tool, utility, script, proof-of-concept,
experiment, detection-content package, or other creative security venture.

A Lab may include:

- title;
- slug;
- summary;
- description or MDX body content;
- publication date;
- maturity or status;
- contributors;
- topics and tags;
- technologies;
- repository URL;
- license;
- installation or usage guidance;
- downloads or resources;
- related Research;
- related Projects;
- related Labs;
- featured state.

Lab presentation emphasizes what the work is, its maturity, safe and authorized
use, installation or usage guidance when approved, repository and resource
access, license, limitations, and relationships to formal Research or completed
Projects. A Lab must clearly identify experimental, proof-of-concept, or
preliminary work and must not imply production readiness.

Lab `maturity` accepts exactly:

- `experimental`;
- `prototype`;
- `beta`;
- `stable`;
- `archived`.

Maturity describes technical readiness. It does not authorize publication and
must not be used as a substitute for visibility.

### Publication Visibility

Publication visibility is a separate field from Project status and Lab
maturity:

- `public` content may enter public loaders, routes, metadata, sitemap output,
  counts, relationships, and generated output;
- `draft` content must remain absent from all production-facing surfaces;
- test fixtures are not production content and do not use a content visibility
  state.

Phase 8 adds no production Project or Lab fixture state. Test fixtures live
outside production content directories and are inaccessible to production
loaders.

The fixture directory strategy is:

```text
tests/fixtures/content/research/
tests/fixtures/content/projects/
tests/fixtures/content/labs/
tests/fixtures/content/references/
```

Tests may pass those paths explicitly to validation helpers. Production code
must never import, scan, glob, copy, count, index, or otherwise reference
`tests/fixtures`. Production collection roots remain explicit rather than
workspace-wide globs.

### Intentional Differences

| Concern | Research | Project | Lab |
| --- | --- | --- | --- |
| Editorial purpose | Formal investigation or technical report | Completed or substantially complete cybersecurity work | Tooling, experiment, proof-of-concept, detection content, or creative security venture |
| Primary date | Publication and optional revision dates | Publication or completion date | Publication date |
| Lifecycle state | Publication and disclosure status | `active`, `stable`, `completed`, or `archived` | `experimental`, `prototype`, `beta`, `stable`, or `archived` |
| Publication visibility | Research visibility | Separate `public` or `draft` visibility | Separate `public` or `draft` visibility |
| Primary detail emphasis | Claims, methods, evidence, limitations, citations | Purpose, implementation or outcome, repository/resources, license, limitations | Maturity, safe usage, installation/operation, repository/resources, license, limitations |
| Citation requirement | Formal citation metadata | Optional unless the work requires a citable publication record | Optional unless the work requires a citable publication record |
| Disclosure model | Research disclosure status | No inherited disclosure field unless separately required | No inherited disclosure field unless separately required |
| Relationships | Related Research and later approved Project/Lab references | Related Research, Projects, and Labs | Related Research, Projects, and Labs |
| Readiness language | Publication status does not imply software readiness | Must not overstate completion, support, or production readiness | Experimental or preliminary state must be conspicuous |

Shared metadata or components must not erase these differences.

## Required Routes

Phase 8 owns the following stable URL contracts:

```text
/projects
/projects/[slug]
/labs
/labs/[slug]
```

Only approved public items generate detail routes or appear in navigation,
collection pages, homepage features, sitemap output, or any other publication
surface. A collection's `[slug]` route file is active only when that collection
contains at least one approved public item. Draft content generates no route.
Test fixtures are structurally outside production content discovery.

Phase 8 does not add Writing, Speaking, Search, or cross-collection topic
routes.

## Collection-page Behavior

Each collection page:

- has one H1 and a clear editorial introduction;
- explains the collection’s distinct purpose;
- lists public items deterministically, newest relevant date first unless an
  approved editorial order is explicitly recorded;
- may use the `featured` field for future collection-page presentation;
- exposes status or maturity, contributor attribution, topics/tags,
  technologies, and relevant license or repository metadata where available;
- uses semantic lists and articles;
- supports a factual accessible empty state when no public items exist;
- remains useful without client JavaScript;
- adds no Phase 9 search, filtering, or pagination.

Empty states must not imply that unpublished Projects, Labs, contributors, or
repositories exist.

The current repository contains no owner-approved public Project or Lab
content. Phase 8 therefore ships factual empty states unless the owner supplies
and approves content before implementation concludes. The `featured` field is
supported by schemas, but Phase 8 does not add Projects or Labs to the homepage.

## Detail-page Behavior

Every public detail page:

- has one H1, breadcrumbs, canonical collection context, and validated metadata;
- renders safe MDX through an explicit component allowlist;
- presents contributor attribution and relevant dates;
- makes status or maturity prominent and understandable without color alone;
- renders repositories, demonstrations, resources, and downloads only when
  validated and approved;
- presents license information without inventing legal interpretation;
- renders related content only when referenced public targets resolve;
- omits empty related-content sections rather than inventing placeholders;
- uses readable measures, responsive layouts, visible focus, and print-safe
  content where appropriate.

Project detail pages prioritize completed-work context and outcomes. Lab detail
pages prioritize maturity, limitations, authorized use, and installation or
usage guidance.

## Contributor Attribution

- Contributors use the established validated reference-registry pattern.
- Every referenced contributor must resolve to approved repository data.
- Names, affiliations, roles, biographies, and external links must not be
  inferred.
- External-contributor work must be explicitly approved for publication.
- Approval evidence is repository-controlled, minimal, validated at build time,
  and excluded from public loaders, MDX output, metadata, routes, feeds,
  sitemap output, counts, and generated files.
- Attribution must distinguish the work’s contributor record from Aston Cyber
  institutional authorship and must not imply employment, endorsement, or
  affiliation.
- A contributor reference may be shared by Research, Projects, and Labs when
  the approved identity is the same.

## Repository, Demonstration, and Download Handling

- Repository and demonstration URLs must be explicit validated HTTPS URLs.
- Repository URLs accept only exact normalized hostnames `github.com` and
  `gitlab.com`. Substring, suffix, credential, port, alternate-hostname, and
  non-HTTPS lookalikes must fail validation.
- External links use the project’s safe external-link defaults.
- Repository presence must not be treated as proof of maintenance, security,
  support, or license.
- A declared license must be explicit approved metadata from the Phase 8
  license registry; the website must not infer one from repository contents.
- Repository-local resources use validated public paths, approved extension and
  MIME pairs, and build-time existence checks.
- Approved directly hosted document/data types are PDF, TXT, CSV, JSON, YAML,
  YML, XML, and Markdown.
- Approved image extension and MIME pairs are `.png` → `image/png`, `.jpg` →
  `image/jpeg`, `.jpeg` → `image/jpeg`, `.webp` → `image/webp`, and `.gif` →
  `image/gif`. SVG and all other image formats are rejected. Extension matching
  is normalized before validation, and every declared MIME value must match
  the normalized extension.
- Direct website downloads must reject ZIP archives, executables, installers,
  compiled binaries, libraries, shell scripts, PowerShell scripts, batch or
  command files, and opaque binary bundles.
- Source code and runnable releases are distributed through approved repository
  hosts rather than direct website downloads.
- Remote resources remain ordinary validated external links and are not fetched
  or mirrored during the build.
- Download labels must identify file type or purpose where useful.
- Missing referenced files or malformed URLs fail validation with the source
  content file identified.
- A resource that does not match an explicitly approved extension and MIME pair
  is rejected even if its filename or declared media type appears benign.

### License Registry

Approved SPDX identifiers:

- `MIT`;
- `Apache-2.0`;
- `BSD-2-Clause`;
- `BSD-3-Clause`;
- `GPL-3.0-only`;
- `MPL-2.0`;
- `CC-BY-4.0`;
- `CC-BY-SA-4.0`;
- `CC0-1.0`.

Approved Aston Cyber values:

- `proprietary`;
- `unlicensed`.

Proprietary and unlicensed work must never be described or visually labeled as
open source.

### Technology Registry

Technologies use a centralized repository-controlled registry with canonical
identifiers and display names. Public MDX references identifiers only.
Arbitrary technology strings fail validation. Registry entries enter public
output only when referenced by approved public content.

## Relationships

Relationships are typed, explicit slug references:

- Project → Research, Project, and Lab
- Lab → Research, Project, and Lab
- Research → Project and Lab

Validation must reject missing targets, duplicate references, self-references,
incorrect collection references, fixture references, and prohibited
public-to-non-public references. Related sections render only eligible public
targets and must not leak drafts or test fixtures.

Reciprocal relationships are never inferred. Each direction must be declared
and validated independently in the source item that presents it.

Relationships do not merge the collections. Research remains evidence and
publication centered; Projects remain completed-work centered; Labs remain
tooling and experimentation centered.

Phase 9 Search & Discovery consumes the three public collections and their
shared taxonomy. It must reuse Phase 7 Research topic ownership and must not
silently redefine Phase 8 relationships.

## Validation Requirements

Build-integrated validation must cover:

- required fields and strict unknown-key rejection;
- malformed dates;
- invalid Project status or Lab maturity values;
- duplicate slugs within each collection;
- invalid collection placement;
- unresolved contributors, topics, tags, and cross-collection relationships;
- unsafe or unsupported front matter;
- invalid repository, demonstration, resource, or download URLs;
- missing repository-local downloads;
- invalid or missing approved license values when declared;
- arbitrary or unresolved technology values;
- missing, duplicate, self, wrong-collection, fixture, or prohibited
  public-to-non-public relationships;
- contributor references, while concrete external-contributor approval-record
  validation remains deferred until its owner-approved storage contract exists;
- structural MDX safety and the explicit component allowlist;
- public and draft visibility boundaries;
- structural exclusion of test fixtures from every production discovery path;
- deterministic public loaders;
- public-only route and sitemap generation;
- preservation of the Research-only RSS feed with no Project or Lab feed;
- clear file-specific failures.

Do not copy filesystem parsing or validation logic into routes. Centralized,
typed collection loaders and public lookup APIs must serve Phase 8 pages and
later Phase 9 discovery.

## Static-generation Requirements

- Collection pages are static.
- Public detail paths come from public-only loaders through
  `generateStaticParams`.
- Drafts, fixtures, or other non-public items create no route.
- Content validation runs before the production build.
- Every public route builds without runtime content access.
- The production export includes only approved repository-local downloads.
- Sitemap generation includes public collection and detail routes.
- The existing Research RSS feed is unchanged. Projects and Labs do not enter
  it and Phase 8 adds no Project or Lab feed.

## Accessibility Requirements

- One H1 per route and a logical heading hierarchy.
- Breadcrumbs identify collection and current item.
- Collection results use semantic lists and articles.
- Status or maturity is conveyed through text, not color alone.
- External-link and download purposes are understandable from accessible names
  and surrounding context.
- Code and long technical strings do not force page overflow.
- Tables and figures use existing accessible component contracts.
- Keyboard focus remains visible.
- Responsive layouts remain usable at 200% zoom and without horizontal scroll.
- Empty states are factual and understandable without visual styling.
- No interaction requires pointer input or client JavaScript.

## Testing Expectations

Tests must prove:

- valid Project and Lab content passes;
- invalid or unknown metadata fails;
- malformed dates and invalid enums fail;
- duplicate slugs and invalid placement fail;
- unresolved contributors, topics, tags, or relationships fail;
- invalid URLs, resources, licenses, and missing downloads fail;
- unapproved repository hosts and hostname-lookalike URLs fail;
- arbitrary technologies and invalid license values fail;
- prohibited direct-download formats fail;
- draft content is excluded from loaders, routes, metadata, sitemap, counts,
  relationships, and generated output;
- test fixtures are impossible for production loaders, routes, metadata,
  sitemap, feeds, relationships, counts, and generated output to discover;
- no speculative external-contributor approval record or private registry is
  created;
- public Project and Lab collection routes generate statically, and each
  detail route generates statically after its first approved public item
  activates the corresponding route template;
- related content resolves only across approved public targets;
- Research, Project, and Lab editorial states remain distinct;
- Project status and Lab maturity remain independent from visibility;
- the Research RSS output remains unchanged and contains no Project or Lab;
- empty states are accessible and factual;
- external links retain safe defaults;
- pages retain one H1, breadcrumbs, visible focus, responsive behavior, and no
  unnecessary Client Component;
- the production export contains no non-public content.

The complete repository validation suite and `git diff --check` remain required.

## Deliverables

- Typed Project and Lab schemas.
- Centralized validated collection and public lookup APIs.
- Repository-based Project and Lab MDX directories.
- Project and Lab collection routes.
- Deferred Project and Lab static detail-route templates, represented by
  tested detail components, public slug loaders, metadata helpers, relationship
  resolution, and static-parameter APIs until each collection receives its
  first approved public item.
- Shared components extended only where the two collections genuinely share a
  semantic pattern.
- Distinct Project and Lab card/detail composition.
- Contributor, taxonomy, technology, license, resource, and relationship
  validation required by approved content.
- Public-only sitemap integration.
- Factual Project and Lab empty states unless owner-approved public content is
  supplied before implementation completes.
- Focused positive, negative, visibility, static-generation, and leakage tests.
- Phase 8 implementation documentation after the code succeeds.

## Acceptance Criteria

Phase 8 is complete only when:

- Projects and Labs are visibly and semantically distinct;
- all approved metadata and references are validated at build time;
- invalid content fails with clear file-specific messages;
- draft and non-public content cannot enter routes or generated outputs;
- test fixtures remain structurally undiscoverable by production code;
- public collection routes export statically; detail routes export statically
  only after the corresponding collection has approved public content and its
  route template is activated in the same reviewed change;
- contributors, repositories, downloads, licenses, and relationships render
  only from approved validated data;
- future Phase 9 code can consume deterministic public Research, Project, and
  Lab APIs without duplicating parsing;
- accessibility and responsive requirements pass;
- the full repository validation suite passes;
- no Writing, Speaking, Search, personal-site implementation, Phase 10 work,
  CMS, database, analytics, or unnecessary browser JavaScript is introduced.
- no active Writing or Speaking route, navigation item, feed entry, sitemap
  entry, collection, launch-scope item, or stale future-publication
  configuration remains.

## External-contributor Approval Evidence

No external-contributor Project or Lab is currently approved. Phase 8 pass 1
therefore creates no approval record, private registry, or speculative
private-data storage. Existing contributor identifiers still resolve through
the controlled contributor registry.

Before any external-contributor Project or Lab can become public, a later
owner-approved change must define a minimal repository-controlled evidence
record and its private storage location. That record must identify the approved
content and contributor, record explicit owner authorization, validate at build
time, and remain excluded from every public loader and generated output. This
deferred contract does not block first-party collection infrastructure.
