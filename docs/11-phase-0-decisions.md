# 11 – Phase 0 Decisions

## Status

Phase 0 Completion / Phase 1 Readiness.

Implementation has not officially begun. These decisions remove the known architectural blockers for Phase 1.

## Organizational Positioning

Aston Cyber is an independent cybersecurity research institution.

It is not a consultancy, managed security provider, SaaS company, or marketing website. The institution, its mission, and its research must remain the primary identity.

## Hosting and Deployment

- Hosting platform: Azure Static Web Apps
- Primary domain: `astoncyber.com`
- Deployment: GitHub Actions
- Architecture: static-first Next.js

The implementation must avoid assumptions that require server-side infrastructure. Any future server-side service requires an explicit architectural review and a new or amended architecture decision record.

## Contact and Responsible Disclosure

- General contact: `info@astoncyber.com`
- Responsible disclosure and security reports: `security@astoncyber.com`

The initial static site must expose these as direct email links in their
approved contexts. Phase 6 must not add a contact form, Server Action, API
route, external form provider, mail service, or other inquiry infrastructure.
A future public form requires separate security and architectural review.

The two addresses have separate purposes and must not be interchanged.

The responsible disclosure page must not invent legal safe-harbor language. Any safe-harbor language requires legal review before publication.

Before launch, publish an RFC 9116 file at
`/.well-known/security.txt`. Its future Contact field must be:

```text
Contact: mailto:security@astoncyber.com
```

This is a documentation requirement only; the file will be created and
reviewed during a future implementation phase.

## Theme Strategy

The initial release will use a dark theme only.

All visual implementation must use semantic design tokens so a future light theme can be introduced without rewriting components. The approved future light-theme values are documented in `01-design-system.md`, but a theme control is out of scope for the initial release.

## Logo Strategy

The final logo package is incomplete.

Until final assets are approved:

- Use a temporary text-only “Aston Cyber” wordmark.
- Do not invent a permanent logo, icon, shield, lock, or symbol.
- Isolate the wordmark behind a reusable project-native component.

Final SVG, monochrome, favicon, and brand-guide assets are pre-launch requirements.

## Navigation

The current public primary navigation contains exactly five items:

1. Home
2. Research
3. Projects
4. Labs
5. About

Home links to `/`. Mission remains a published secondary institutional page at
`/mission`, reachable through contextual links and direct URL, but is not part
of primary navigation.

Writing and Speaking are removed from the Aston Cyber roadmap and navigation.
They are assigned to the future personal website at `matt.astoncyber.com`. The
centralized navigation configuration must apply this decision consistently to
desktop, mobile, and footer navigation.

Ethos must be prominently linked from Mission and the footer, but it is not a primary navigation item.

## Institutional Phrase

The standard institutional phrase is:

> Research. Engineering. Security.

## Component Strategy

shadcn/ui is an optional source of accessible primitives only. It is not the site’s component architecture.

Layout, typography, navigation, and core site components must remain project-native. Any adopted primitive must be justified, customized to the Aston Cyber design system, and reviewed for accessibility, dependency cost, and client-side JavaScript impact.

## Content Strategy

- Use repository-based MDX for long-form content.
- Validate front matter with Zod.
- Disable raw HTML by default.
- Build one complete research-content vertical slice before expanding the component library.
- Phase 5 may prove that slice with a non-public technical research fixture
  using `visibility: fixture`.
- The fixture may exercise the research schema, safe MDX processing,
  references, citation metadata, shared index-card composition, shared detail
  rendering, and static build validation, but it is not a published research
  item and creates no public route or publication artifact.
- The fixture must contain no invented research findings, claims,
  affiliations, biographies, disclosures, or organizational history.
- Only `visibility: public` content may enter public navigation, production
  research indexes, RSS, sitemap output, or other publication surfaces.
  `visibility: draft` and `visibility: fixture` remain distinct and are both
  excluded.
- Phase 8 supersedes fixture placement, not the original Phase 5 publication
  safety intent: the legacy fixture must move to
  `tests/fixtures/content/research/`, and production visibility must become
  `public | draft`.
- Defer site search until content volume demonstrates a clear need.

Topic links, chronological archives, and simple URL-based filters may be implemented without introducing a search service.

## Phase 1 Security Baseline

Phase 1 includes:

- Content Security Policy planning
- Security header planning and baseline configuration
- Environment validation
- Secret scanning
- Dependency review
- Least-privilege GitHub Actions permissions
- Preview deployment protections
- Safe MDX rendering

Security remains continuous throughout later phases; moving the baseline into Phase 1 does not replace pre-launch validation.

## Remaining Owner Decisions

The following decisions do not block the start of Phase 1 but require an owner before their related milestone:

- Approve the final logo package and brand usage guide before launch.
- Decide whether a future light theme will be exposed to users; it is not part of the initial release.
- Reassess search only after the content library demonstrates a measurable discovery need.

## Remaining Pre-Launch Requirements

- Obtain legal review before publishing any responsible-disclosure safe-harbor language.
- Publish and review RFC 9116 `/.well-known/security.txt`.

## Phase 6 Institutional Publication

- The homepage uses only approved repository language and omits research,
  current-work and project sections until approved public content
  exists.
- The Phase 5 fixture must not appear.
- The People index and reusable profile architecture are Phase 6 work, but no
  person route is published without approved content.
- The About page omits unapproved leadership, contributor, affiliation,
  history, funding, and sponsorship content. Its only current funding
  disclosure is: “Aston Cyber does not currently publish a list of funders or
  sponsors.”
- Responsible disclosure is limited to the operational guidance approved in
  `06-website-specification.md`; no testing authorization, scope list,
  timeline, bounty, credit policy, coordinated-disclosure deadline,
  safe-harbor commitment, or waiver is implied.
- No photography, generated imagery, placeholder portraits, decorative hero
  imagery, or other unapproved imagery is part of Phase 6.

## Phase 7 Research Publication

- The Secure Transaction Authorization Ledger case study is the first
  owner-approved public research report.
- Its approved metadata, public visibility, `not-applicable` disclosure status,
  and canonical DOCX path are recorded in `06-website-specification.md`.
- Phase 7 owns the static research index, detail route, topic index, and topic
  detail routes.
- Topic filtering uses ordinary links and build-time public content only.
- Search remains deferred under Architecture Decision 14.
- Related Research is omitted while no other eligible public report exists.
- The Phase 5 fixture and all drafts remain excluded from publication surfaces.
- The canonical DOCX is distributed unchanged. The MDX version must preserve
  its claims, qualifications, references, limitations, attribution, and
  publication note.
- DOCX ingestion automation, PDF generation, companion-article automation, and
  broader editorial workflow systems are not Phase 7 work.

## Phase 7.1 Composition Refinement

- Center page introductions while retaining left-aligned readable prose.
- Use balanced desktop grids and wide feature regions rather than leaving
  narrow content attached to the left side of a wide institutional canvas.
- Homepage and Mission focus content use three equal columns at wide widths.
- Featured research uses a wide flagship treatment.
- The homepage contact callout links to `/contact`; it adds no form or email
  exposure.
- No newsletter, subscription destination, search, new service, or
  cybersecurity cliché iconography is approved.
- Mobile behavior and 200% zoom usability must be preserved.

## Phase 8 Projects & Labs

- Phase 8 is named Projects & Labs.
- Projects publishes completed or substantially complete cybersecurity work.
- Labs publishes tooling, utilities, scripts, proof-of-concepts, experiments,
  detection content, and other creative security ventures.
- The two collections may share infrastructure but remain editorially distinct.
- Phase 9 Search & Discovery covers Research, Projects, and Labs.
- Writing and Speaking belong to the future `matt.astoncyber.com` website,
  expected after Phase 9 and before Phase 10.
- Project status is `active`, `stable`, `completed`, or `archived`; Lab
  maturity is `experimental`, `prototype`, `beta`, `stable`, or `archived`.
- Publication visibility remains separate from status and maturity.
- Phase 8 uses factual empty states unless owner-approved content is supplied.
- Test fixtures remain outside production content directories.
- Research RSS remains unchanged; Projects and Labs add no feeds or homepage
  sections.
- Repository hosts, licenses, technologies, resources, relationships, and
  private external-contributor approval evidence follow the strict registries
  and validation rules in `20-phase-8-projects-labs-specification.md`.
