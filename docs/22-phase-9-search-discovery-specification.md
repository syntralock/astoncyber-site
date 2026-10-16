# 22 – Phase 9 Search & Discovery Specification

## Status

Planning approved on 2026-07-27. Phase 9 and Phase 9.1 are not implemented and
are intentionally deferred until content volume warrants implementation.

This is an approved scope decision, not an incomplete or failed phase. Phase 10
proceeds without Phase 9. This specification preserves the future design so
that implementation can begin if additional public content creates a clear
cross-collection discovery need. The specification resolves the
technical design so that a later implementation can proceed in narrow,
reviewable passes; planning approval does not authorize implementation.

## Context

Phase 9 covers public Research, Projects, and Labs. The current production
corpus contains one public Research report and no public Projects or Labs.
Research has an active detail route. Project and Lab detail routes activate
only in the same reviewed change as the first approved public entry in the
corresponding collection.

The site is a Next.js App Router static export. Content is repository-managed
MDX with strict Zod validation, structural MDX safety, public-only loaders,
draft exclusion, and test fixtures outside production content roots. Search
must preserve those boundaries and must not change the Research RSS feed.

## 1. Goals

Phase 9 must:

- help readers find public Research, Projects, and Labs;
- operate entirely from deterministic static-export artifacts;
- reuse centralized public content APIs instead of parsing collections again;
- preserve Research, Project, and Lab terminology and metadata semantics;
- exclude drafts, test fixtures, private metadata, and unavailable routes;
- provide transparent, deterministic, testable relevance ranking;
- support shareable query URLs;
- remain keyboard and screen-reader accessible;
- add browser JavaScript only for search interaction;
- avoid external search platforms, runtime services, and tracking.

Discovery should complement, not replace, Phase 7 Research topic pages and the
chronological collection pages.

## 2. Non-goals

Phase 9 does not add:

- runtime database search or a runtime content database;
- a server-side search endpoint;
- Algolia, Elasticsearch, OpenSearch, Typesense, Meilisearch, or hosted SaaS
  search;
- semantic or vector search, embeddings, or AI-generated summaries;
- analytics, query telemetry, personalization, or tracked recommendations;
- a CMS, authentication, user accounts, or saved searches;
- Project, Lab, or combined feeds;
- any change to Research RSS;
- content ingestion or an editorial workflow;
- Project or Lab route fallbacks, placeholder routes, or sentinel content;
- pagination unless later measured corpus size requires it;
- broad SEO, structured-data, or social-preview work owned by Phase 10;
- implementation of `matt.astoncyber.com`.

## 3. Phase Decomposition

### Phase 9.1 – Search Foundation

- Add the normalized search document and build-candidate types.
- Extract searchable text structurally from safe MDX.
- Transform eligible public Research, Projects, and Labs into search documents.
- Add deterministic index validation and serialization.
- Export the static browser index as `/search-index.json`.
- Integrate index validation with content validation and the production build.
- Add unit, fixture-isolation, route-eligibility, stability, and leakage tests.
- Record actual artifact size and update the ADR only after implementation is
  authorized.

Phase 9.1 adds no `/search` page or search interaction.

### Phase 9.2 – Search Experience

- Add the static `/search` route.
- Add a small Client Component for URL query state, lazy index loading,
  deterministic scoring, and result rendering.
- Launch with a content-type filter only.
- Add truthful query, short-query, no-result, and index-failure states.
- Add static metadata, robots behavior, navigation access, accessibility tests,
  and static-export verification.

### Phase 9.3 – Discovery Refinement and Acceptance

- Review ranking against an owner-approved relevance corpus.
- Add safe title and summary highlighting.
- Add deterministic body excerpts if testing shows they improve discovery.
- Add topic, tag, technology, or collection-specific facets only when content
  volume makes them useful.
- Refine keyboard behavior without introducing an unnecessary combobox.
- Review performance, artifact size, URL synchronization, accessibility,
  regressions, and generated-output leakage.
- Complete Phase 9 documentation and final acceptance verification.

Each pass must be independently reviewable. Phase 9.3 must not become an
unbounded discovery platform.

## 4. Search Document Model

### Public browser document

The generated JSON contains only this normalized shape:

```ts
type SearchContentType = "research" | "project" | "lab";

type SearchTerm = Readonly<{
  id: string;
  label: string;
}>;

type SearchDocument = Readonly<{
  id: `${SearchContentType}:${string}`;
  type: SearchContentType;
  slug: string;
  href: string;
  eyebrow: "Research" | "Project" | "Lab";
  title: string;
  summary: string;
  bodyText: string;
  date: string;
  topics: readonly SearchTerm[];
  tags: readonly SearchTerm[];
  technologies: readonly SearchTerm[];
  people: readonly string[];
  classification: Readonly<{
    id: string;
    label: string;
  }>;
}>;
```

`date` is:

- Research: `updated_at`, otherwise `published_at`;
- Project: `published_at`, otherwise `completed_at`;
- Lab: `published_at`.

`people` contains approved public display names only:

- Research: authors followed by contributors, deduplicated in declared order;
- Projects and Labs: contributors in declared order.

`classification` preserves collection semantics:

- Research: `research_type` and the canonical labels `Case study`,
  `Experiment`, `Research paper`, `Technical report`, or `White paper`;
- Project: `status` and the centralized Project status label;
- Lab: `maturity` and the centralized Lab maturity label.

The browser document intentionally omits `visibility`. Eligibility is enforced
before serialization, and emitting a redundant visibility field would expand
the public attack surface without helping the UI.

### Build-only candidate

The build transformation may hold:

```ts
type SearchBuildCandidate = Readonly<{
  type: SearchContentType;
  sourceSlug: string;
  sourceVisibility: "public" | "draft";
  sourceBody: string;
  detailRouteActive: boolean;
  document: SearchDocument;
}>;
```

This type never enters serialized output. It exists only to validate
visibility, route availability, and source transformation.

### Prohibited public fields

The index must never include:

- source or fixture paths;
- `filePath`, `contentRoot`, or public-root implementation details;
- compiled MDX or raw front matter;
- draft metadata or test fixture metadata;
- internal validation errors, flags, or approval records;
- unpublished relationships;
- private contributor data;
- repository credentials, raw repository URLs, download paths, or artifact
  paths;
- body markup, raw HTML, or executable expressions.

## 5. Searchable Content Policy

The indexed fields are:

| Source | Indexed text |
| --- | --- |
| Title | Full title and normalized title tokens |
| Summary | Approved summary text |
| MDX body | Headings and readable prose |
| Topics and tags | Approved labels and canonical identifiers |
| Technologies | Approved display names and canonical identifiers |
| People | Approved author and contributor display names |
| Classification | Research type, Project status, or Lab maturity label |

Resource labels, repository metadata, raw URLs, download paths, license
identifiers, generated navigation, image alternative text, and layout
boilerplate are excluded initially. Resource labels can be reconsidered only
if real content demonstrates a discovery need.

### Safe MDX-to-text extraction

Phase 9.1 must extend the existing structural MDX processing boundary rather
than scan MDX with regular expressions or render HTML and strip tags.

The existing `@mdx-js/mdx` parser/compiler traversal will collect:

- Markdown headings, paragraphs, list items, blockquotes, and table cell text;
- inline code, because technical identifiers are useful search terms;
- readable text children and static titles from allowlisted components.

It will exclude:

- fenced code blocks;
- image nodes and alternative text;
- link destinations while retaining visible link text;
- definitions, generated footnote labels, ESM, expressions, raw HTML, and
  rejected MDX constructs;
- front matter and repeated navigation or page-shell text.

Adjacent whitespace is collapsed to one ASCII space, leading and trailing
space is removed, and source order is preserved. Extraction must run during
the same safe compile/validation process so invalid MDX cannot produce a
search document.

## 6. Public-content Eligibility

Research is eligible only when:

- the production public Research loader returns it;
- visibility is public and Research publication validation succeeds;
- `/research/[slug]` is active; and
- its exact detail href is statically generated.

Projects and Labs are eligible only when:

- their production public loader returns the item;
- the corresponding detail route template is active;
- the slug appears in the corresponding public static-parameter API; and
- the exact detail href will exist in the static export.

No collection-page fallback is allowed. A search result must identify one
work and link to its real detail page; linking several results to `/projects`
or `/labs` would be ambiguous and untruthful.

If a public Project or Lab exists while its detail route is inactive, search
index validation fails instead of silently indexing it or substituting a
fallback. This reinforces the Phase 8 requirement that first publication and
detail-route activation occur in the same reviewed change.

The build-only eligibility module checks the exact active App Router templates:
`app/research/[slug]/page.tsx`, `app/projects/[slug]/page.tsx`, and
`app/labs/[slug]/page.tsx`. It then intersects each active collection with its
genuine production static-parameter slugs. These source checks never enter the
browser document. After export, validation confirms every serialized href has
a matching `out/<collection>/<slug>/index.html`.

Draft and fixture inputs are never eligible. Test fixtures may exercise the
transformer only through explicit test options and can never enter the
production route or artifact.

## 7. Index-generation Architecture

### Canonical design

Use a statically exported App Router route handler:

```text
app/search-index.json/route.ts
```

The route exports `dynamic = "force-static"` and returns the deterministic JSON
created by a server-only search-index module. Next.js emits:

```text
out/search-index.json
```

This is a build-time artifact, not a runtime endpoint. It performs no request-
time filesystem access after deployment.

### Proposed modules

```text
lib/search/model.ts       public and build-only types plus validation
lib/search/extract.ts     structural safe-MDX plain-text extraction
lib/search/generate.ts    public-loader transformation and eligibility
lib/search/serialize.ts   canonical ordering and JSON serialization
lib/search/match.ts       browser-safe normalization, tokenization, scoring
app/search-index.json/route.ts
```

The modules may be consolidated if the implementation remains clearer with
fewer files.

### Generation and invocation

- `pnpm validate:content` calls the generator and validates the in-memory
  corpus.
- `pnpm build` invokes the route handler as part of static export.
- No separate prebuild source-writing step is required.
- No generated index file is committed.
- The final build verifies `out/search-index.json` exists and matches the
  generator's canonical bytes.

### Determinism

- Documents sort by `id` ascending before serialization.
- Nested topic, tag, and technology arrays retain registry/declaration order
  after duplicate rejection.
- Object property order follows `SearchDocument`.
- Serialization uses `JSON.stringify(documents)` plus one trailing LF.
- UTF-8 is required; no pretty-print whitespace is emitted.
- Dates remain validated ISO dates.
- No build time, generated time, random identifier, filesystem path, absolute
  origin, or environment-dependent value is serialized.
- Two generations from the same repository state must be byte-identical.

Validation fails for duplicate IDs, duplicate hrefs, invalid types, ineligible
items, unstable ordering, malformed dates, forbidden fields, or serialization
differences. Because the artifact is generated during the build from current
public loaders and is not committed, a stale committed index cannot exist.

## 8. Search Implementation Strategy

Use project-native matching code. No existing direct dependency provides an
approved search API, and adding a library is not justified for the current
small corpus or transparent ranking requirements.

### Normalization and tokenization

For both documents and queries:

1. Apply Unicode NFKD normalization.
2. Remove combining marks.
3. Lowercase without locale-specific behavior.
4. Convert punctuation, underscores, slashes, and hyphens to spaces.
5. Retain Unicode letters and numbers.
6. Collapse whitespace and trim.
7. Split on spaces.
8. Remove duplicate query tokens while preserving first occurrence.

Hyphenated terms therefore match their component words consistently.
No stop-word list is used initially: removing words can make short technical
queries surprising, and the corpus is too small to justify language-specific
rules.

### Query behavior

- Empty or whitespace-only queries do not load the index.
- A normalized query shorter than two characters shows the short-query state.
- Every distinct query token must match at least one indexed field (AND
  semantics).
- Exact phrases and prefixes receive bonuses, while token matches provide the
  base score.
- Duplicate query terms do not increase score.
- Results are limited to 50; pagination is deferred.

The matching and scoring functions are pure, deterministic, and independently
testable.

## 9. Initial Ranking Policy

The initial integer score is additive:

| Match | Score |
| --- | ---: |
| Entire normalized title equals query | 120 |
| Normalized title starts with full query | 80 |
| Each exact title token | 30 |
| Each title-token prefix | 20 |
| Exact topic label or identifier | 24 |
| Exact tag label or identifier | 18 |
| Exact technology label or identifier | 16 |
| Entire person name equals query | 16 |
| Each person token | 12 |
| Summary contains full query | 20 |
| Each summary token | 8 |
| Exact classification label or identifier | 8 |
| Each body token | 2, capped at 20 body points |

A document is excluded unless every distinct query token matches somewhere.
Repeated occurrences within one field do not repeatedly inflate the score,
except body-token coverage up to the stated cap.

Tie-breakers are:

1. score descending;
2. date descending;
3. title ascending using code-point order;
4. href ascending using code-point order.

Phase 9.3 may adjust documented weights using a checked-in relevance test
matrix. It must not introduce opaque or nondeterministic ranking.

## 10. Search Route and URL Contract

The future route is:

```text
/search/
/search/?q=ledger
```

The canonical query parameter is `q`. It is decoded with `URLSearchParams`,
trimmed for presentation, and normalized only for matching. Unknown parameters
are ignored by search logic but remain harmless URL data.

- Empty or whitespace-only `q` shows the no-query state.
- A normalized query below two characters shows the short-query state.
- Excess input is capped at 200 Unicode code points and validation presents a
  concise error rather than searching.
- Browser form submission uses standard URL encoding.
- Query changes update history with `pushState`; typing alone does not create a
  history entry.
- Back, forward, refresh, and shared URLs restore the query and filter state.
- Reset removes `q` and filters and returns focus to the search input.

The static route metadata is canonical to `https://astoncyber.com/search/`.
Every query state uses that same canonical URL and `noindex, follow`. Query
states never enter the sitemap.

## 11. Search UI Architecture

### Server Component page

`app/search/page.tsx` remains a Server Component and owns:

- shared shell and breadcrumbs;
- one H1, introduction, and progressive-enhancement explanation;
- static metadata and robots directives;
- a Suspense fallback around the client interaction.

### Client Component island

A narrowly scoped `SearchExperience` Client Component owns:

- reading and writing `q` and the content-type filter;
- search form interaction;
- lazy fetch and one-session caching of `/search-index.json`;
- pure matching, scoring, filtering, and result limiting;
- result-count and error announcements;
- reset and browser history behavior.

The content loaders, filesystem, MDX parser, index generation, and eligibility
logic remain server/build-only and must not enter the browser bundle.

The interaction is a conventional search form and result list, not a combobox.
Arrow-key result navigation is therefore not required in Phase 9.2; normal Tab
navigation is more predictable. Phase 9.3 may add shortcuts only after an
accessibility review.

## 12. Result Presentation

Results use a semantic ordered or unordered list. Each item contains:

- collection eyebrow: Research, Project, or Lab;
- linked title;
- approved summary;
- relevant date with a semantic `<time>`;
- classification label;
- up to two useful topic labels;
- technology labels for Projects and Labs when present.

Tags and people remain searchable but need not all render in the compact
result. Empty metadata groups are omitted.

Truthful states:

- **No query:** “Enter a search term to find published Research, Projects, and
  Labs.”
- **Too short:** “Enter at least two characters.”
- **No results:** “No published content matches this search.” Offer links to
  Research, Projects, and Labs without implying hidden content.
- **Index failure:** “Search is temporarily unavailable. Browse Research,
  Projects, or Labs instead.” Preserve the user's query and provide a retry
  control.

No state invents counts, content, publication timing, or subscription options.

## 13. Filters and Discovery

Phase 9.2 launches with one filter:

```text
type=all | research | project | lab
```

The default is `all`. The filter uses a labeled native control or fieldset of
native controls and remains encoded in the URL. A type with zero results may
remain available because it accurately communicates the three searchable
collections; it must not imply unpublished items exist.

Phase 9.3 may add topic, tag, and technology facets after measuring the real
corpus. Project status, Lab maturity, and Research publication type remain
searchable classification fields but do not become first-release filters.
Pagination is deferred until the 50-result cap or artifact-size review shows a
real need.

Research topic discovery continues linking to the existing static Phase 7 topic
pages. Phase 9 must not duplicate their route ownership.

## 14. Highlighting Policy

Highlighting is deferred to Phase 9.3. Phase 9.2 renders approved title and
summary strings as ordinary React text, avoiding unsafe HTML and complex
normalization-to-source offsets.

If Phase 9.3 enables highlighting:

- only title and summary are highlighted initially;
- the implementation splits original strings into React text and `<mark>`
  nodes;
- `dangerouslySetInnerHTML` is prohibited;
- query text is never interpreted as HTML or a regular expression without
  escaping;
- highlighting does not change accessible names or duplicate spoken text;
- body excerpts use deterministic word boundaries and ellipses and are added
  only if relevance testing justifies them.

## 15. Accessibility

The search experience must:

- use a visible `<label>` and `type="search"` input;
- provide a clear text search/submit affordance;
- support Enter submission, Tab navigation, and native form behavior;
- preserve visible focus and skip-link compatibility;
- move focus to the results heading after an explicit submitted search only
  when testing confirms it is not disruptive;
- announce result counts and no-result/error state changes through one polite
  live region;
- set `aria-busy` while the one-time index request is pending and announce
  “Loading search index” once, without announcing each keystroke;
- use a semantic result list with meaningful linked titles;
- keep filters in a labeled fieldset or native labeled control;
- provide an accessible reset control and allow Escape to clear only when the
  search input has focus;
- avoid motion, or honor `prefers-reduced-motion` if motion is later added;
- preserve WCAG-oriented contrast, 200% zoom, touch targets, and mobile
  reflow;
- keep highlighting screen-reader safe if introduced.

No complex autocomplete, listbox, or combobox semantics are required.

## 16. Performance Budget

The current corpus is very small, but Phase 9 must allow measured growth.

- `/search/` must not include the index in initial HTML.
- The index loads only for a valid query and is fetched once per page session
  through a shared promise.
- The Phase 9 search interaction should add no more than 20 KiB gzip of
  project-owned JavaScript, excluding existing shared Next.js/React chunks.
- The initial index hard ceiling is 500 KiB uncompressed and 150 KiB gzip.
  Phase 9.1 records actual values; exceeding either fails validation until the
  architecture is reviewed.
- A deterministic benchmark of 1,000 representative documents should complete
  a query within 100 ms on the repository's documented test environment. This
  is a regression threshold, not a universal device guarantee.
- At most 50 results render per query.
- The browser retains one parsed index and no duplicate normalized corpus.
- Static hosting may compress JSON in transit. Correctness must not depend on
  compression or cache availability.
- `/search-index.json` uses normal static revalidation rather than an immutable
  cache policy because the filename is stable across releases.

Any future need to exceed these thresholds triggers an architecture review
before adding a library, worker, segmented index, or pagination.

## 17. Security and Privacy

- Only production public loaders may create production candidates.
- Route eligibility is revalidated before serialization.
- Drafts and fixtures fail corpus validation if encountered.
- Source paths, private approval metadata, raw front matter, and unpublished
  relationships are prohibited from the public schema.
- Safe MDX structural parsing precedes text extraction; raw HTML, expressions,
  scripts, imports, exports, and unknown components remain rejected.
- Search results render React text and validated internal hrefs. No raw HTML or
  `dangerouslySetInnerHTML` is used.
- Queries are treated as local text, never executed, evaluated, logged, sent to
  a server, or interpolated into HTML.
- No query telemetry, analytics event, third-party request, external search
  script, or personalization identifier is permitted.
- Repository and resource URLs do not enter the index.
- Content Security Policy and static hosting architecture remain unchanged
  unless a separate reviewed requirement emerges.

## 18. Corpus Validation Rules

Phase 9.1 validation must prove:

- every document matches the exact public search schema;
- IDs and hrefs are globally unique;
- IDs equal `${type}:${slug}`;
- types are exactly `research`, `project`, or `lab`;
- title, summary, body text, href, slug, date, and classification are valid;
- hrefs are normalized internal detail paths with trailing slashes;
- every href is eligible for the static export;
- dates are valid ISO calendar dates;
- topics, tags, technologies, and people are normalized, resolved, and free of
  duplicates;
- document and nested-array ordering is stable;
- drafts and fixtures are absent;
- Project and Lab documents are absent while their detail route is inactive;
- fixture paths, source paths, raw front matter, compiled code, validation
  metadata, private contributor data, repository URLs, and resource paths are
  absent;
- repeated generation is byte-identical;
- the exported artifact matches the validated canonical serialization.

An empty index is valid. Validation failures identify the collection and slug
without publishing a local source path in browser output.

## 19. Testing Strategy

### Unit tests

- MDX plain-text extraction and exclusion rules;
- Unicode normalization, punctuation and hyphen handling;
- token deduplication and short-query behavior;
- exact, prefix, multi-token, and no-match scoring;
- concrete weights, body cap, and deterministic tie-breakers;
- safe highlighting segmentation when Phase 9.3 adds it;
- duplicate ID/href and prohibited-field rejection;
- byte-identical serialization.

### Content and integration tests

- the approved public Research report enters the production index;
- production drafts and test fixtures never enter;
- fixture roots work only when passed explicitly to tests;
- Project/Lab test documents enter only when test route eligibility is
  explicitly enabled;
- production Projects/Labs remain absent while detail routes are inactive;
- unresolved taxonomy or contributor data still fails upstream validation;
- generated hrefs match public static parameters;
- no source path, private field, repository URL, or resource path leaks.

### Route and interaction tests

- `/search-index.json` exports valid deterministic JSON;
- `/search` has one H1 and correct static metadata;
- empty, whitespace, short, valid, excessive, and encoded queries behave as
  documented;
- content-type filtering and URL synchronization work;
- refresh and back/forward restore state;
- no-results and failure states are factual and accessible;
- result links, counts, live announcements, focus, reset, and keyboard
  operation are accessible;
- no unapproved Client Component is introduced.

### Regression and output tests

- Research routes, topics, sitemap entries, and RSS bytes remain unchanged;
- Project/Lab conditional route behavior remains unchanged;
- sitemap includes `/search/` only according to Section 20 and never includes
  query states or the JSON artifact;
- primary navigation and homepage remain unchanged unless the separately
  approved Phase 9.2 navigation change is made;
- the production export contains the page and index but no draft, fixture,
  source-path, private-field, or inactive-detail href leakage;
- package and lockfile remain unchanged unless a separately justified
  dependency decision is approved.

## 20. Sitemap and Metadata

- `/search/` is intentionally excluded from the sitemap. It is a utility, not
  an editorial landing page, and query results are not canonical content.
- `/search-index.json` and all `?q=` or filter states are excluded.
- The canonical URL is `https://astoncyber.com/search/`.
- Static metadata uses title `Search` and a factual description of searching
  published Research, Projects, and Labs.
- The route uses `robots: { index: false, follow: true }` for every state.
- Query-specific titles, Open Graph cards, structured data, and social previews
  are not generated. Existing shared static metadata may apply without
  beginning Phase 10.

## 21. Navigation Decision

Search does not become a sixth primary navigation item. The five-item primary
navigation remains Home, Research, Projects, Labs, and About.

After Phase 9.2 exists, Search should be a labeled utility action in the shared
header and mobile navigation utility area. This follows the existing navigation
specification, which reserves a compact utility area for Search, RSS, GitHub,
and contact functions. It must have the same destination and accessible name
on desktop and mobile.

Search is not added to the footer initially. Collection pages may link to
Search contextually only if later usability testing demonstrates a need.
No navigation change occurs during this planning pass.

## 22. Documentation Updates During Implementation

Phase 9 implementation is expected to update:

- `README.md` — implemented pass and final status;
- `docs/02-navigation.md` — utility Search access after `/search` exists;
- `docs/04-content-strategy.md` — searchable-text and discovery boundaries;
- `docs/06-website-specification.md` — final route, metadata, filters, and
  interaction;
- `docs/07-website-project-plan.md` — pass completion and acceptance status;
- `docs/08-build-instructions.md` — generation and validation commands;
- `docs/09-development-rules.md` — static-index safety and privacy rules;
- `docs/10-architecture-decision-record.md` — owner approval and the decision
  superseding Decision 14 before Phase 9.1 begins;
- `scripts/README.md` — index generation/validation behavior;
- a final numbered Phase 9 implementation record.

`docs/03-organization.md` requires no change unless organizational collection
ownership changes, which Phase 9 does not propose.

## 23. Acceptance Criteria

### Phase 9 overall

Phase 9 is complete only when:

- the implementation approval gate is recorded in the ADR;
- every public, route-eligible Research, Project, and Lab is searchable;
- no draft, fixture, private field, source path, or inactive route enters the
  public artifact;
- deterministic ranking and shareable URLs work as specified;
- accessibility, performance, security, static export, and output inspection
  pass;
- Research RSS and existing publication behavior remain unchanged;
- no external service, analytics, database, CMS, or Phase 10 work is added;
- all three passes and the complete repository validation suite pass.

### Phase 9.1

- Search types, extraction, transformation, validation, and serialization are
  implemented and documented.
- `/search-index.json` exports deterministically from public loaders.
- Research is included; inactive Project/Lab details, drafts, and fixtures are
  excluded.
- Duplicate, prohibited-field, route, date, reference, stability, size, and
  leakage tests pass.
- The artifact is not committed and no dependency is added without separate
  approval.
- No search UI or `/search` page exists.

### Phase 9.2

- Static `/search` exists with correct metadata and robots behavior.
- Valid `q` URLs are shareable and restore across refresh/history navigation.
- No-query, short-query, no-results, loading, and failure states are truthful.
- Deterministic search and the content-type filter work without a runtime
  service.
- The index loads lazily once, result count is limited, and budgets pass.
- Keyboard, screen-reader, focus, reflow, and contrast requirements pass.
- The utility navigation action is documented and consistent across desktop
  and mobile.

### Phase 9.3

- A checked-in relevance matrix verifies ranking against approved cases.
- Safe title/summary highlighting passes security and accessibility tests.
- Body excerpts and advanced facets are added only if documented evidence
  justifies them; otherwise they are explicitly deferred.
- URL behavior, performance, accessibility, regressions, RSS, sitemap, and
  generated-output leakage pass final review.
- Final documentation is current and Phase 10 has not begun.

## 24. Implementation Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Index growth | Size budgets, result cap, measured review before segmentation or a dependency |
| Stale artifact | Generate during the same static build; compare exported bytes with canonical serialization |
| Broken detail links | Require active detail templates and genuine static parameters; fail validation |
| Fixture or draft leakage | Consume public loaders, retain build-candidate visibility checks, scan exported JSON |
| Duplicated content | Global ID/href uniqueness and single centralized generator |
| Weak ranking | Transparent integer weights and an owner-approved relevance matrix |
| Oversized client bundle | Project-native pure matcher, lazy JSON fetch, 20 KiB gzip budget |
| Inaccessible interaction | Native form controls, semantic list, live-region discipline, keyboard tests |
| Hydration mismatch | Server renders stable shell/fallback; client reads URL after hydration within Suspense |
| Unstable output | Canonical order, fixed property order, no timestamps, repeated byte comparison |
| Stale documentation | Documentation-first pass gates and a final implementation record |
| Accidental RSS change | Byte-level Research RSS regression test and no feed-module integration |
| Query injection | Treat queries as text, render React nodes, prohibit raw HTML |
| Browser memory growth | One parsed index, no duplicated normalized corpus, explicit artifact ceiling |

## 25. Open Decision

### Implementation activation

- **Decision required:** Has additional public content or a clear
  cross-collection discovery need emerged to activate Phase 9.1?
- **Options:** authorize Phase 9.1 now; wait for the first public Project or Lab;
  or wait for a larger cross-collection corpus.
- **Approved current position:** keep implementation paused while the production corpus is
  one Research item and no Project or Lab items. Approve Phase 9.1 when the
  owner wants the foundation ready ahead of the next public collection item,
  or when at least one additional route-eligible publication makes
  cross-collection discovery real.
- **Consequence of delay:** readers continue using the Research index, Research
  topic pages, and empty Project/Lab collections. No content becomes
  undiscoverable under the current corpus.

All other implementation architecture decisions are resolved by this
specification. Any departure requires documentation and owner review before
code changes.
