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

**Original Phase 5 decision:** Research metadata used a required
`visibility: public | draft | fixture` field so a technical fixture could prove
the content pipeline before a public report existed.

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

**Phase 8 amendment:** Test fixtures are no longer production content and must
live outside all production content directories. Phase 8 implementation must
migrate the legacy research fixture to
`tests/fixtures/content/research/`, remove `fixture` from production visibility,
and ensure production loaders and generators cannot discover test fixture
paths. Production publication visibility is `public | draft`. Tests may supply
fixture paths explicitly to validation helpers, but production code must not
scan, import, copy, count, index, route, relate, or publish them.

**Date amended:** 2026-07-27

---

# Decision 16 — Phase 6 Static Institutional Publication

**Decision:** Phase 6 institutional pages remain fully static and use direct
approved email links for contact.

**Requirements:**
- No contact form, Server Action, API route, external form provider, mail
  service, or server-side inquiry infrastructure is approved.
- Any future public form requires a separate architecture and security review.
- The homepage omits Research, current-work, Project, Lab, and other publication
  sections until approved public content exists.
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

# Decision 17 — Phase 7 Static Research Publication

**Decision:** Publish the owner-approved Secure Transaction Authorization
Ledger case study through a fully static research experience.

**Requirements:**
- Public research routes are `/research`, `/research/[slug]`,
  `/research/topics`, and `/research/topics/[slug]`.
- Research topic pages and filtering use ordinary links and statically
  generated public content.
- Search remains deferred under Decision 14. Phase 7 adds no search input,
  index, runtime service, third-party service, or client-side search.
- The approved public report uses `visibility: public`,
  `status: published`, `research_type: case-study`, and
  `disclosure_status: not-applicable`.
- The canonical DOCX remains the original downloadable artifact; the MDX
  version is a faithful editorial transformation for the web.
- Related Research is omitted when no other eligible public report exists.
- Draft and fixture exclusion remains unchanged across routes, loaders, RSS,
  sitemap output, and topic pages.

**Consequences:**
- Phase 7 needs no runtime service, new client-side state, or search
  dependency.
- The research schema may expand only for manuscript fields required by the
  approved publication, including subtitle, affiliation, project, revision,
  keywords, and the downloadable artifact.
- A future discovery phase may enhance cross-collection navigation but must
  not duplicate ownership of research topic pages.
- DOCX ingestion automation, PDF generation, companion-article automation, and
  general editorial workflow infrastructure remain out of scope.

**Date adopted:** 2026-07-26

---

# Decision 18 — Phase 7.1 Responsive Composition and Public Navigation

**Decision:** Refine the existing institutional and research presentation with
reusable responsive composition patterns while narrowing current public
navigation to approved destinations.

**Requirements:**

- Center concise page introductions but retain left-aligned long-form prose,
  card content, and metadata.
- Use the existing institutional container, reading measures, spacing scale,
  and breakpoints for balanced two-/three-column and wide-feature patterns.
- Homepage and Mission focus content uses three equal columns at wide widths.
- Featured research uses a wide flagship panel.
- Current public primary navigation is Home, Research, Projects, Labs, and
  About. Mission remains a published secondary institutional route. Writing and
  Speaking are assigned to the future personal website at
  `matt.astoncyber.com`.
- Desktop, mobile, and footer navigation share the centralized publication
  state.
- Preserve static export, Server Components, mobile behavior, print behavior,
  and 200% zoom usability.
- Add no form, subscription capability, search, service, dependency, Client
  Component, or cliché cybersecurity iconography.

**Consequences:**

- This is a presentation refinement, not a new application phase or content
  architecture.
- Writing and Speaking are not future Aston Cyber routes or collections.
- Contact remains a link to the existing static Contact page.
- The homepage Mission group may use three project-native, decorative,
  `aria-hidden` line icons for the approved pillar concepts. This narrow
  approval does not permit cliché cybersecurity iconography or an icon
  dependency.
- The hero heading uses a wider responsive measure rather than an authored line
  break so it fits one line at common desktop widths.
- The About page relies on the global footer for Contact and omits a duplicate
  inline link.

**Date adopted:** 2026-07-26

---

# Decision 19 — Phase 8 Projects & Labs and Personal Publishing Boundary

**Decision:** Phase 8 is Projects & Labs. Aston Cyber publishes two distinct
repository-based MDX collections while personal Writing and Speaking move to
the future `matt.astoncyber.com` website.

**Requirements:**

- Projects publishes completed or substantially complete cybersecurity work
  produced by Aston Cyber or approved external contributors.
- Labs publishes open-source security tools, utilities, scripts,
  proof-of-concepts, experiments, detection content, and other creative
  security ventures.
- Projects and Labs may share safe loading, validation, taxonomy, contributor,
  relationship, card, and layout infrastructure but retain distinct schemas,
  status meaning, editorial presentation, and readiness language.
- Phase 8 uses static export, Server Components by default, repository MDX,
  build-time Zod validation, structural MDX safety, and public-only loaders.
- Phase 8 adds no CMS, runtime database, analytics, hosted content service, or
  unnecessary client JavaScript.
- Phase 9 remains Search & Discovery and covers Research, Projects, and Labs.
- `matt.astoncyber.com` is expected after Phase 9 and before Phase 10 for
  coordinated cross-domain SEO and launch work.
- Project status is `active`, `stable`, `completed`, or `archived`.
- Lab maturity is `experimental`, `prototype`, `beta`, `stable`, or `archived`.
- Publication visibility is separate from lifecycle status or maturity.
- Phase 8 ships factual empty states unless owner-approved public content is
  supplied; `featured` does not enable homepage sections.
- Test fixtures remain outside production content directories and are
  structurally undiscoverable by production code.
- The Research RSS feed remains unchanged; no Project or Lab feed is added.
- Repository URLs use HTTPS and exact normalized hosts `github.com` or
  `gitlab.com`.
- Direct resources use an approved document/data/image allowlist. Archives,
  executables, installers, binaries, libraries, scripts, and opaque bundles are
  prohibited as website downloads.
- License and technology values use controlled repository registries.
- Cross-collection relationships are explicit and directional; reciprocal
  relationships are not inferred.
- Future external-contributor approval evidence must be repository-controlled,
  build-time validated, minimal, and excluded from public output. No record or
  private registry is created before an actual owner-approved external
  submission defines the storage contract.

**Consequences:**

- Aston Cyber has no Writing or Speaking routes, collections, roadmap
  deliverables, or navigation items.
- Phase 8 owns `/projects`, `/projects/[slug]`, `/labs`, and `/labs/[slug]`.
- Phase 9 discovery must consume deterministic public APIs for Research,
  Projects, and Labs without duplicating collection parsing.
- Personal-site implementation is not Phase 8 or Phase 9 work.
- Approved image resources are PNG, JPEG, WebP, and GIF with exact
  extension/MIME agreement; SVG is rejected. External-contributor approval
  storage remains deferred until an actual approved submission exists.

**Date adopted:** 2026-07-27

---

# Decision 20 — Official Visual Identity and Homepage Hero

**Decision:** Adopt the owner-approved Aston Cyber master logo, icon, platform
icons, manifest, and homepage hero artwork without changing the static-first
application architecture.

**Requirements:**

- `public/brand/` contains the four source-of-truth master SVGs. Their path
  geometry, colors, and proportions remain unchanged.
- `public/icons/` contains browser and platform derivatives plus the static
  manifest. The Next.js App Router metadata API owns favicon, Apple Touch Icon,
  and manifest references.
- The approved digital brand values are charcoal `#2E2E2E`, blue `#4B9CD2`,
  and reversed foreground `#FFFFFF`.
- The shared dark header and footer replace the temporary textual identity with
  the reversed horizontal logo. Both logo instances link to `/` with the
  accessible name “Aston Cyber home.” The full mark fits the current mobile
  header, so no breakpoint-specific icon substitution is required.
- `public/images/home/aston-cyber-hero.jpg` is a decorative CSS background on
  the existing centered homepage hero. Responsive cover positioning and
  layered radial/linear darkening preserve legibility while top and bottom
  fades join the site background.
- The hero-to-Mission separator border is removed. Mission and all later
  homepage structure remain unchanged.
- No service worker, PWA runtime, social-card improvisation, dependency,
  Client Component, or duplicate hero image is introduced.

**Consequences:**

- The historical temporary-wordmark and no-approved-imagery deferrals are
  satisfied rather than silently discarded.
- The master artwork remains readable and stable; browser/platform derivatives
  remain distinct delivery assets.
- A dedicated official 1200×630 social image remains deferred to Phase 10.
- The approved ICO contains one 16×16 frame; the separate PNG assets supply
  explicit 16×16, 32×32, and 48×48 browser sizes. Any future pixel-tuned
  small-size redesign requires separate brand approval.

**Date adopted:** 2026-08-06

---

# Decision 21 — Launch Metadata, Indexing, and Website-Only Platform Identity

**Decision:** Complete repository-side production hardening for the canonical
`https://astoncyber.com` origin while preserving the static-export model and
presenting Aston Cyber as a website rather than an installable application.

**Requirements:**

- Every public page provides an apex canonical URL, title, description, Open
  Graph text metadata, and Twitter/X summary metadata through one typed helper.
- The root layout provides `metadataBase` plus truthful Organization and WebSite
  JSON-LD. Public research detail pages provide evidence-backed
  ResearchArticle JSON-LD.
- `robots.txt` permits crawling and references the apex sitemap. The temporary
  global `noindex, nofollow` directive is removed.
- `/.well-known/security.txt` uses the approved responsible-disclosure contact,
  canonical policy path, preferred language, and a reviewable expiry date.
- Web App Manifest association, standalone display behavior, maskable icons,
  and install-only icons are removed. Favicons and the Apple Touch Icon remain.
- Responsive hero derivatives reduce image transfer without modifying the
  approved source artwork.
- Azure configuration applies immutable caching only to content-hashed Next.js
  assets and adds HSTS without requesting preload. Existing CSP, permissions,
  referrer, cross-origin, and content-type policies remain.
- No social image is improvised. Open Graph and Twitter/X image fields remain
  absent until the owner supplies the separately approved 1200×630 asset.

**Consequences:**

- The static export is technically indexable, subject to deployment and Phase H
  owner launch approval.
- Canonical, crawler, structured-data, and security-file behavior is testable
  without runtime APIs or client-side JavaScript.
- No installability signal incorrectly implies a software product.
- Social previews use page title and description but remain image-incomplete
  until the approved asset is available.

**Date adopted:** 2026-08-07

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
- Content visibility: Explicit production `public` and `draft` states; only
  `public` content enters publication surfaces, and test fixtures live outside
  production content directories
- Phase 6 contact: Static direct email links only; no form or inquiry service
- Phase 7 research: Static public index, detail, and topic routes; no search
- Phase 7.1 navigation: Home, Research, Projects, Labs, and About; Mission is a
  published secondary route
- Phase 8: distinct Projects and Labs MDX collections
- Phase 9: Search & Discovery across Research, Projects, and Labs
- Personal Writing and Speaking: future `matt.astoncyber.com`, expected after
  Phase 9 and before Phase 10
- Repository: GitHub
- Database: None
- CMS: None
- Analytics: None by default

---

This document should evolve only through deliberate architectural review, not convenience.
