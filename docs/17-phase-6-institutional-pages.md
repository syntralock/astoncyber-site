# 17 – Phase 6 Institutional Pages

## Status

Phase 6 institutional pages implemented for review. Phase 7 has not begun.

## Implemented scope

Phase 6 publishes the approved static institutional page set:

- Homepage
- Mission
- Ethos
- About
- People
- Contact
- Accessibility
- Privacy
- Responsible disclosure

The homepage introduces Aston Cyber as an organization, explains the
documented research, engineering, and security relationship, and links to the
institutional pages and contact information. It intentionally omits featured
research, current work, projects, and selected writing because no public
content is approved.

The People index uses a neutral editorial empty state. A typed, reusable
`PersonProfile` component establishes the future profile template, but Phase 6
creates no dynamic person route and publishes no identity, biography,
affiliation, role, or portrait.

## Architecture

All Phase 6 routes are App Router Server Components and statically export to
`out/`. `InstitutionalPage` composes the existing Container, Breadcrumbs,
Heading, and Text primitives into the shared interior-page structure.
Individual routes provide only their approved content and semantic sections.

The implementation reuses the Phase 3 shell, Phase 4 component library, and
Phase 5 public-content boundary. It adds no dependency, Client Component,
runtime data request, environment variable, service, or third-party script.

Institutional routes are included in the deterministic sitemap. Research
entries continue to come only from the Phase 5 public loader. The non-public
fixture remains absent from the sitemap and static export.

## Contact and privacy behavior

The initial static release uses direct links:

- General inquiries: `info@astoncyber.com`
- Responsible disclosure and security reports: `security@astoncyber.com`

The addresses are presented only in approved institutional contexts and are
not added to the shared shell. No form, Server Action, API route, external form
provider, mail service, submission validation, spam control, or inquiry
environment configuration exists.

The Privacy page describes the implemented behavior: no analytics,
advertising, behavioral tracking, nonessential cookies, or website inquiry
collection. A future public form requires a separate architecture, privacy,
and security review.

## Responsible disclosure

The disclosure page contains only the approved operational guidance:

- The approved reporting address
- A request for clear reproduction details
- A request to minimize data access, modification, retention, and disclosure
- Acknowledgement when operationally possible
- No guaranteed response or remediation deadline
- No testing authorization
- No safe-harbor commitment
- No waiver of legal rights
- Direction to obtain authorization before testing systems not owned by the
  researcher

It defines no system scope, bounty, credit policy, coordinated-disclosure
deadline, third-party testing permission, or safe-harbor terms.
`/.well-known/security.txt` remains deferred.

## Accessibility

- Every route has one page-level heading and a current-page breadcrumb.
- Page content uses semantic headings, sections, articles, lists, links, and
  the established readable line lengths.
- The People empty state contains explicit text and does not rely on visual
  styling for meaning.
- Direct contact methods use native links.
- Existing keyboard focus, contrast, reduced-motion, responsive type, and
  minimum target behavior remain unchanged.
- Institutional grids collapse to one column on small screens and use only the
  documented responsive breakpoint and design tokens.
- No image requires alternative text, and no new browser interaction was
  introduced.

## Content boundary

All institutional copy comes from the approved organization, content strategy,
Ethos, website specification, and owner decisions recorded in the repository.
The About page omits named leadership, contributors, affiliations, company
history, and unapproved funding or sponsorship claims. Its funding statement is
limited to:

> Aston Cyber does not currently publish a list of funders or sponsors.

No research finding, profile, affiliation, customer, project, talk,
certification, statistic, timeline, testimonial, disclosure claim, or
organization history was invented. No photography, generated imagery,
placeholder portrait, or decorative hero image was added.

## Testing and validation

Focused tests cover:

- One `h1` and breadcrumbs on every institutional route
- Organization-first homepage content
- Omission of unpublished homepage collection sections
- Absence of the Phase 5 fixture
- Direct general and security email routing without form controls
- The exact approved funding disclosure
- The neutral People empty state and absence of a person route
- Typed person-profile template composition
- Required responsible-disclosure limitations
- Sitemap inclusion for Phase 6 routes and exclusion for non-public or deferred
  surfaces

Run:

```text
CI=true pnpm install --frozen-lockfile
pnpm validate
git diff --check
```

The production export must also be checked for the research fixture and draft
content before approval.

## Dependencies

No dependency was added. Existing Next.js, React, project-native components,
design tokens, and Vitest coverage satisfy the approved requirements without
additional runtime or transitive cost.

## Known limitations and deferred work

- First owner-approved research publication and the complete public research
  experience (Phase 7)
- Featured research, current work, projects, and selected writing on the
  homepage until their public content is approved
- Actual person content and public profile routes until owner-approved source
  material is supplied
- Projects, Writing, Labs, and Speaking experiences (Phase 8)
- Topic discovery and any separately approved search experience (Phase 9)
- Complete SEO, social previews, structured data, and metadata validation
  (Phase 10)
- Deployed security and privacy hardening, operational monitoring, and
  `security.txt` (Phase 11)
- Any future public contact form, which requires separate architecture,
  privacy, and security review
- Final logo, favicon, and approved imagery
