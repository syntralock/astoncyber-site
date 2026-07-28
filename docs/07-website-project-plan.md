# Aston Cyber Website Project Plan

## 1. Purpose

This project plan divides the Aston Cyber website into manageable phases, workstreams, and implementation packages.

Each phase should end with a reviewable, working result.

The project should not move to the next major phase until the current phase meets its acceptance criteria.

---

## 2. Project Principles

- Build the foundation before polishing pages.
- Reuse components.
- Use real content early.
- Test accessibility continuously.
- Keep client-side JavaScript minimal.
- Favor static generation.
- Do not introduce complexity without a clear need.
- Do not build deferred features during the initial release.
- Treat the Aston Cyber design system and website specification as authoritative.
- Commit work in small, reviewable sections.

---

## 3. Major Deliverables

The project will produce:

1. Repository and development environment
2. Design tokens and typography
3. Shared layout and navigation
4. Reusable component library
5. Structured content system
6. Core website pages
7. Research and publication templates
8. Topic discovery features; search only after a demonstrated need
9. Accessibility and performance validation
10. Security and privacy controls
11. Production deployment
12. Launch documentation

---

# Phase 0: Documentation and Decisions

**Status:** Completion / Phase 1 Readiness

## Objectives

Confirm that the project has sufficient written direction before coding begins.

## Tasks

- [x] Add all approved planning documents to `/docs`
- [x] Confirm page names and route structure
- [x] Confirm primary domain: `astoncyber.com`
- [x] Confirm hosting platform: Azure Static Web Apps
- [x] Confirm repository location: `https://github.com/syntralock/astoncyber-site`
- [x] Confirm initial content storage format: repository-based MDX
- [x] Defer search until content volume demonstrates a clear need
- [x] Confirm no analytics by default
- [x] Confirm general contact: `info@astoncyber.com`
- [x] Confirm responsible disclosure and security reporting contact: `security@astoncyber.com`
- [ ] Collect final logo assets when available

## Deliverables

- Approved documentation set
- Decision log
- Initial content inventory
- Known open questions

## Acceptance Criteria

- No blocking architecture question remains unresolved.
- All required documents are version controlled.
- Launch scope is explicitly agreed upon.

---

# Phase 1: Repository and Engineering Foundation

## Objectives

Create a clean, repeatable development environment.

## Tasks

- [ ] Create repository
- [ ] Initialize Next.js with TypeScript
- [ ] Configure App Router
- [ ] Configure package manager and lockfile
- [ ] Configure linting
- [ ] Configure formatting
- [ ] Configure strict TypeScript
- [ ] Add environment variable example file
- [ ] Create base folder structure
- [ ] Add CI workflow
- [ ] Add production build check
- [ ] Add contribution instructions
- [ ] Add issue and pull request templates
- [ ] Add dependency update automation
- [ ] Add secret scanning
- [ ] Add baseline test framework
- [ ] Plan Content Security Policy
- [ ] Add baseline security headers compatible with static hosting
- [ ] Validate environment variables at build time
- [ ] Add dependency review
- [ ] Configure least-privilege GitHub Actions permissions
- [ ] Protect preview deployments from indexing, production secrets, and unintended external effects
- [ ] Establish safe MDX rendering with raw HTML disabled by default
- [ ] Document Azure Static Web Apps deployment constraints without creating deployment configuration prematurely

## Deliverables

- Runnable local application
- CI pipeline
- Repository standards
- Initial README

## Acceptance Criteria

- A new contributor can clone and run the project.
- Lint, typecheck, test, and build commands pass.
- CI runs on every pull request.
- Phase 1 security baseline checks pass or have documented, reviewable plans where deployed-environment validation is required.

---

# Phase 2: Design Foundation

## Objectives

Implement the visual system before building full pages.

## Tasks

- [ ] Load Lora
- [ ] Load IBM Plex Sans
- [ ] Load JetBrains Mono
- [ ] Implement color tokens
- [ ] Implement spacing tokens
- [ ] Implement typography tokens
- [ ] Implement radius, border, and shadow tokens
- [ ] Implement responsive breakpoints
- [ ] Implement the approved dark theme with semantic tokens
- [ ] Verify tokens can support the approved future light palette without component rewrites
- [ ] Add reduced-motion defaults
- [ ] Create component documentation or examples

## Deliverables

- Global styles
- Token system
- Typography examples
- Layout examples

## Acceptance Criteria

- No arbitrary typography values are needed for basic pages.
- Tokens work across mobile and desktop.
- Contrast meets accessibility requirements.
- The site remains coherent without a logo.

---

# Phase 3: Shared Layout and Navigation

## Objectives

Create the site shell used by every page.

## Tasks

- [ ] Build site header
- [ ] Build desktop navigation
- [ ] Build accessible mobile navigation
- [ ] Build main content container
- [ ] Build section primitives
- [ ] Build footer
- [ ] Add skip link
- [ ] Add breadcrumbs
- [ ] Add active navigation states
- [ ] Add default metadata
- [ ] Add global error page
- [ ] Add not-found page

## Deliverables

- Complete site shell
- Responsive navigation
- Footer
- Error states

## Acceptance Criteria

- Navigation works by keyboard.
- Mobile navigation is accessible.
- Every route can use the same layout.
- Header and footer work at all approved breakpoints.

---

# Phase 4: Core Component Library

## Objectives

Build only the reusable primitives required for the first complete
research-content vertical slice. Expand the library when real page and
content requirements demonstrate a need.

## Tasks

- [ ] Heading
- [ ] Text
- [ ] Link
- [ ] Button
- [ ] Tag
- [ ] Status badge
- [ ] Metadata row
- [ ] Content card
- [ ] Research card
- [ ] Add further content components only when required by the vertical slice
- [ ] Empty state
- [ ] Error state

## Deliverables

- Shared component library
- Component examples
- Accessibility notes for interactive components

## Acceptance Criteria

- Components are typed.
- Components support required responsive states.
- Interactive components are keyboard accessible.
- The first research vertical slice can be assembled without one-off visual patterns.
- No speculative component is introduced without an identified consumer.

---

# Phase 5: Content System

## Objectives

Create the structured, validated research content foundation and prove it with
a non-public technical fixture.

## Tasks

- [ ] Configure repository-based MDX
- [ ] Disable raw HTML by default
- [ ] Define front matter schemas
- [ ] Validate front matter with Zod
- [ ] Create research collection
- [ ] Build one complete non-public technical research vertical slice from
      validated MDX through shared index-card composition, shared detail
      rendering, citation metadata, and production-build validation
- [ ] Review the content model and component requirements
- [ ] Expand the component library only after reviewing the vertical slice
- [ ] Defer Projects, Labs, and People collection expansion until a public
      research item validates the model or an owner explicitly approves broader
      collection work. Writing and Speaking belong to the future personal
      website.
- [ ] Add draft handling
- [ ] Add publication and revision dates
- [ ] Add author and contributor references
- [ ] Add topic and tag indexes
- [ ] Add content validation
- [ ] Add RSS generation
- [ ] Add sitemap generation

The Phase 5 vertical slice may use a research item with
`visibility: fixture`. A fixture is a technical validation input, not a
published research item. It may exercise the research schema, safe MDX
processing, author, contributor, topic, and tag references, citation metadata,
shared index-card composition, shared detail rendering, and the static build.
It must not contain invented research findings, claims, affiliations,
biographies, disclosures, or organizational history.

Only `visibility: public` content may enter production-facing loaders,
navigation, research indexes, RSS, sitemap output, or any other publication
surface. `visibility: draft` and `visibility: fixture` are distinct non-public
states and must both be excluded. The fixture does not weaken the owner-approval
requirement for the first real research publication and disclosure status, and
it does not replace the complete public research experience in Phase 7.

Because no real publication is approved yet, Phase 5 must not speculatively
expand into the remaining collections. Their schema and sample-content work
follows a validated public research item or a later explicit owner decision.

## Deliverables

- Content directory structure
- Validated schemas
- Sample content
- Build-time content validation

## Acceptance Criteria

- Invalid metadata fails the build.
- Draft and fixture content are excluded from production-facing loaders and
  generated public output.
- Authors and topics resolve correctly.
- RSS and sitemap generate successfully from public content only, including
  valid empty outputs when no public content is approved.
- The complete non-public technical research vertical slice validates the
  content model without publishing the fixture or expanding other collections.

---

# Phase 6: Institutional Pages

## Objectives

Build the pages that explain the organization.

## Tasks

- [ ] Homepage
- [ ] Mission page
- [ ] Ethos page
- [ ] About page
- [ ] People index
- [ ] Person profile template
- [ ] Contact page
- [ ] Accessibility page
- [ ] Privacy page
- [ ] Responsible disclosure page

## Deliverables

- Complete institutional page set
- Approved homepage narrative
- Published Ethos
- People index and reusable person-profile architecture without publishing a
  profile until approved person content exists
- Accessible editorial empty states where approved content is intentionally
  unavailable

## Acceptance Criteria

- The organization is introduced before the founder.
- No page resembles a sales landing page.
- All content is real or clearly approved draft content.
- No research fixture, invented person data, unpublished collection content, or
  unapproved institutional claim is exposed.
- Contact uses approved direct email links without a form or server-side
  inquiry infrastructure.
- Pages pass accessibility checks.

Phase 6 may omit homepage research, current-work, and project sections
until approved public content exists. Their absence is intentional and is not
an error state. Actual person publication is content-dependent and is not
required for Phase 6 completion.

---

# Phase 7: Research Experience

## Objectives

Make research the strongest content experience on the site.

## Tasks

- [ ] Research index
- [ ] Featured research layout
- [ ] Research card variants
- [ ] Research detail template
- [ ] Abstract and key findings
- [ ] Methodology section
- [ ] Limitations section
- [ ] Responsible disclosure status
- [ ] References and citation support
- [ ] Downloadable artifacts
- [ ] Related research
- [ ] Revision history
- [ ] Static topic filtering through ordinary links
- [ ] Static `/research/topics` and `/research/topics/[slug]` pages
- [ ] Research status labels
- [ ] Publish the owner-approved Secure Transaction Authorization Ledger case
      study and its original DOCX artifact
- [ ] Preserve public, draft, and fixture visibility boundaries

## Deliverables

- Research archive
- Research detail template
- At least one complete example report
- Original downloadable artifact for the approved report

## Acceptance Criteria

- Research claims, limitations, and status are clearly separated.
- Citation information is present.
- Disclosure status is visible.
- Topic filters use statically generated, shareable URLs.
- Search is absent.
- The approved report and DOCX artifact are public; drafts and fixtures remain
  excluded.
- Research pages are readable in print.

Phase 7 search is explicitly out of scope. Static research discovery is
limited to the approved research index and topic routes. Format, year, and
status remain visible metadata and may gain dedicated static views only after a
documented content-volume review.

When the approved report has no other eligible public related research, omit
the Related Research section. Do not publish placeholders or fixtures.

## Phase 7.1: Desktop Composition and Navigation Refinement

**Scope:** A focused refinement within Phase 7, not a new product capability.

### Tasks

- [ ] Center homepage, Mission, and Research page introductions while keeping
      prose left-aligned
- [ ] Add reusable wide-feature and balanced two-/three-column composition
      patterns using existing tokens
- [ ] Replace the homepage two-over-one focus cards with three equal columns
- [ ] Compose Mission content across three balanced desktop columns
- [ ] Give featured research a wide flagship publication treatment
- [ ] Integrate a concise homepage contact band linked to `/contact`
- [ ] Publish Home, Research, Projects, Labs, and About as the exact current
      primary navigation
- [ ] Remove Mission from primary navigation while retaining `/mission` as a
      secondary published institutional page
- [ ] Remove Writing and Speaking from public navigation and assign them to the
      future personal website
- [ ] Rename the homepage focus group to Mission and add three approved
      decorative line icons without a dependency
- [ ] Allow the homepage hero heading to fit naturally on one line at common
      desktop widths without a hard-coded break
- [ ] Remove the redundant inline Contact link from About
- [ ] Preserve mobile behavior, static generation, print behavior, and the
      Phase 7 publication boundary

### Acceptance Criteria

- Introductions are balanced on laptop and desktop canvases without globally
  centering prose.
- Featured research uses the available institutional width and retains all
  approved metadata.
- Homepage and Mission focus regions use three equal columns at wide widths and
  logical single-column source order on small screens.
- Public primary navigation contains Home, Research, Projects, Labs, and
  About on desktop, mobile, and footer surfaces.
- Mission remains published and directly accessible but is absent from primary
  navigation.
- The homepage Mission heading governs three icon-supported pillars, retains one
  H1, and uses no icon library.
- No search, contact form, newsletter, subscription capability, service,
  dependency, or new Client Component is introduced.
- Layout remains usable at 200% zoom and has no horizontal overflow at the
  documented review widths.

---

# Phase 8: Projects & Labs

**Status:** Complete. Phase 9 is the next website phase.

## Objectives

Publish two distinct, validated static collections: completed or substantially
complete cybersecurity Projects, and Labs tooling or experimental creative
security ventures.

## Tasks

### Projects

- [x] Define and validate the Project MDX schema
- [x] Projects index
- [x] Project detail presentation and deferred route-activation template
- [x] Public-only typed loaders and static parameters
- [x] Repository links
- [x] Project or demonstration links
- [x] Download and resource validation
- [x] License display
- [x] Project status
- [x] Contributor attribution
- [x] Topic, tag, and technology metadata
- [x] Related research, projects, and labs
- [x] Featured state

Project status is limited to `active`, `stable`, `completed`, and `archived`.
It remains independent from publication visibility.

### Labs

- [x] Define and validate the Lab MDX schema
- [x] Labs index
- [x] Lab detail presentation and deferred route-activation template
- [x] Public-only typed loaders and static parameters
- [x] Maturity/status treatment
- [x] Repository links
- [x] Installation or usage guidance through safe MDX
- [x] Download and resource validation
- [x] License display
- [x] Contributor attribution
- [x] Topic, tag, and technology metadata
- [x] Related research, projects, and labs
- [x] Featured state

Lab maturity is limited to `experimental`, `prototype`, `beta`, `stable`, and
`archived`. It remains independent from publication visibility.

### Shared publication work

- [x] Reuse the structural MDX safety boundary
- [x] Preserve public and draft visibility boundaries
- [x] Validate cross-collection references
- [x] Add the controlled technology and license registries
- [x] Enforce exact HTTPS repository hosts `github.com` and `gitlab.com`
- [x] Enforce the direct-resource allowlist and prohibited-download rules
- [x] Defer external-contributor approval storage until an actual approved
      submission defines its private repository-controlled contract
- [x] Keep test fixtures outside production content directories and prove that
      production discovery cannot observe them
- [x] Migrate the legacy Phase 5 research fixture from `content/research/` to
      `tests/fixtures/content/research/`, remove `fixture` from production
      visibility, and keep fixture paths unreachable by production code
- [x] Add public Project and Lab sitemap routes
- [x] Preserve the Research-only RSS feed and add no Project or Lab feed
- [x] Add accessible factual empty states
- [x] Add positive, negative, static-generation, and leakage tests
- [x] Record the approved image extension/MIME pairs and defer concrete
      external-contributor approval storage until an owner-approved submission
      exists

## Deliverables

- Complete Project and Lab collection and detail architecture
- Factual empty states unless owner-approved public content is supplied
- Centralized APIs that Phase 9 can consume without duplicate parsing

## Acceptance Criteria

- Projects and Labs remain distinct editorial concepts.
- Invalid metadata and references fail with clear file-specific errors.
- Preliminary and experimental Labs work is clearly labeled.
- Public routes and sitemap output include only approved public content.
- Drafts, fixtures, and other non-public content do not leak.
- Test fixtures are structurally outside production content discovery.
- The legacy research fixture has been moved out of the production content
  tree, and production visibility no longer uses `fixture`.
- Repository hosts, licenses, technologies, and resources are validated at
  build time. External-contributor approval storage remains deferred until an
  actual approved submission defines its contract.
- The Research RSS feed remains unchanged and contains no Project or Lab.
- Featured Project and Lab metadata does not create homepage sections.
- Routes are statically generated and need no runtime content access.
- Empty collections publish their index routes without active `[slug]` route
  files; each detail route activates with the first approved public item and
  never through a placeholder, fixture, draft, or sentinel slug.
- Empty states work for collections with no approved public content.
- Accessibility, responsive behavior, and the full validation suite pass.
- No Writing, Speaking, Search, personal-site implementation, CMS, database,
  analytics, or unnecessary Client Component is introduced.

---

# Phase 9: Search & Discovery

**Status:** Architecture and implementation passes approved in
`22-phase-9-search-discovery-specification.md`. No search feature or Phase 9.1
implementation exists. Phase 9.1 remains paused until additional public
content or a clear cross-collection discovery need exists.

## Objectives

Reassess whether visitors need site search using evidence from the real
Research, Projects, and Labs content library. Do not implement search solely
because it appeared in the original plan.

## Tasks

- [ ] Measure and document the discovery need
- [ ] Obtain architectural approval before implementing search
- [ ] Implement site search only if approved
- [ ] Index titles
- [ ] Index summaries
- [ ] Index authors and contributors
- [ ] Index topics and tags
- [ ] Reuse Phase 7 research topic pages rather than duplicating them
- [ ] Cover Research, Projects, and Labs
- [ ] Add collection-aware Project and Lab filters when justified
- [ ] Add pagination
- [ ] Add no-results state
- [ ] Add query parameters to URLs
- [ ] Test keyboard usability

## Deliverables

- Search page, only if approved
- Filtered archives
- Shareable result URLs

## Acceptance Criteria

- If search is approved, results are relevant.
- Filters remain usable on mobile.
- Search does not require unnecessary tracking.
- No-results guidance is helpful.

After Phase 9 and before Phase 10, develop the future personal website at
`matt.astoncyber.com` so cross-domain SEO and launch work can be coordinated.
Writing and Speaking belong to that personal site and are not Aston Cyber
Phase 8 deliverables.

---

# Phase 10: SEO, Metadata, and Sharing

## Objectives

Ensure content is discoverable and shareable.

## Tasks

- [ ] Add unique metadata to every page
- [ ] Add canonical URLs
- [ ] Add Open Graph metadata
- [ ] Create default social image
- [ ] Create content-specific social images
- [ ] Add structured data
- [ ] Validate sitemap
- [ ] Validate robots directives
- [ ] Validate RSS
- [ ] Add citation metadata to research
- [ ] Add breadcrumb structured data

## Deliverables

- Search engine metadata
- Social preview system
- Structured data

## Acceptance Criteria

- No duplicate page titles.
- Social previews render correctly.
- Structured data validates.
- Research pages expose useful citation metadata.

---

# Phase 11: Security, Privacy, and Operational Validation

## Objectives

Validate and harden the Phase 1 security baseline for public operation.

## Tasks

- [ ] Validate deployed security headers
- [ ] Validate and tighten Content Security Policy
- [ ] Review third-party scripts
- [ ] Validate forms and add privacy-respecting spam protection only if a future review approves a public form
- [ ] Confirm privacy notice
- [ ] Confirm responsible disclosure policy
- [ ] Publish and validate RFC 9116 `/.well-known/security.txt` with `Contact: mailto:security@astoncyber.com`
- [ ] Verify dependency review and scanning
- [ ] Verify secret scanning
- [ ] Revalidate least-privilege GitHub Actions permissions
- [ ] Revalidate preview deployment protections
- [ ] Revalidate safe MDX rendering
- [ ] Review logging
- [ ] Configure error monitoring
- [ ] Configure uptime monitoring
- [ ] Document incident response contacts

## Deliverables

- Security configuration
- Privacy review
- Operational monitoring

## Acceptance Criteria

- Security headers pass validation.
- No unnecessary trackers are present.
- Forms do not expose sensitive data.
- Disclosure contact process works.
- RFC 9116 `security.txt` is published at the required well-known path and references `security@astoncyber.com`.

---

# Phase 12: Accessibility, Performance, and Quality Assurance

## Objectives

Validate the complete experience before launch.

## Tasks

- [ ] Keyboard test every page
- [ ] Screen-reader spot checks
- [ ] Automated accessibility tests
- [ ] Contrast review
- [ ] Reduced-motion review
- [ ] Mobile layout testing
- [ ] Tablet layout testing
- [ ] Desktop layout testing
- [ ] Cross-browser testing
- [ ] Broken-link scan
- [ ] Image optimization review
- [ ] Font-loading review
- [ ] Core Web Vitals review
- [ ] Lighthouse review
- [ ] Production build test
- [ ] Content proofreading
- [ ] Metadata review

## Deliverables

- QA report
- Accessibility issue log
- Performance report
- Final content review

## Acceptance Criteria

- No critical accessibility defects remain.
- No broken links remain.
- Production pages meet agreed performance targets.
- No placeholder content remains.
- Known exceptions are documented.

---

# Phase 13: Deployment and Launch

## Objectives

Release the website safely.

## Tasks

- [ ] Configure production project
- [ ] Connect domain
- [ ] Configure DNS
- [ ] Verify HTTPS
- [ ] Configure redirects
- [ ] Configure environment variables
- [ ] Verify sitemap
- [ ] Verify robots file
- [ ] Verify social previews
- [ ] Verify monitoring
- [ ] Verify rollback process
- [ ] Create launch tag or release
- [ ] Publish launch checklist
- [ ] Conduct post-launch smoke test

## Deliverables

- Public production website
- Release notes
- Rollback procedure
- Launch checklist

## Acceptance Criteria

- Domain resolves correctly.
- HTTPS is valid.
- Monitoring is active.
- Core pages load successfully.
- Direct email links and any separately approved forms work.
- Rollback can be performed.

---

# Phase 14: Post-Launch Stabilization

## Objectives

Resolve launch issues and establish ongoing operations.

## Tasks

- [ ] Review errors
- [ ] Review analytics, if enabled
- [ ] Review search indexing
- [ ] Fix high-priority issues
- [ ] Collect accessibility feedback
- [ ] Review performance from real traffic
- [ ] Update documentation
- [ ] Create content publishing workflow
- [ ] Create maintenance schedule
- [ ] Create quarterly review checklist

## Deliverables

- Stabilization report
- Maintenance plan
- Publishing workflow
- Prioritized backlog

## Acceptance Criteria

- Critical launch defects are resolved.
- Maintenance ownership is clear.
- Publishing can occur without code changes where practical.
- Deferred features are documented separately.

---

## 4. Recommended Coding Packages

To keep work reviewable, divide implementation into focused coding packages.

### Package A: Repository Setup

Includes Phase 1, including its security baseline.

### Package B: Tokens and Global Styles

Includes typography, color, spacing, and global CSS.

### Package C: Site Shell

Includes header, navigation, footer, containers, and route layout.

### Package D: Core Components

Includes only the project-native primitives required by the first
research vertical slice. shadcn/ui may supply an accessible primitive by
exception, not the site architecture.

### Package E: Content Engine

Includes repository-based MDX, Zod schemas, safe content loading with
raw HTML disabled, public-only RSS and sitemap generation, and one complete
non-public technical research vertical slice before broader component or
collection expansion. The fixture exercises shared card and detail composition
during validation but creates no public route or publication artifact.

### Package F: Institutional Pages

Includes homepage, Mission, Ethos, About, People index and person-profile
architecture, Contact, and policy pages. Actual person publication remains
conditional on approved content.

### Package G: Research

Includes research index, templates, filters, citations, and disclosure data.

### Package H: Projects & Labs

Includes the distinct Projects and Labs publishing collections. People
publication remains content-dependent institutional work; Writing and Speaking
belong to `matt.astoncyber.com`.

### Package I: Search and Metadata

Includes Research–Projects–Labs cross-collection discovery. Phase 7 owns the
research topic pages. Search is added only after content volume demonstrates a
clear need and a separate review approves it. The personal website is expected
after this package and before Phase 10 SEO and launch coordination.

### Package J: Hardening and Launch

Includes accessibility, performance, security, deployment, and launch review.

Each package should be a separate branch or pull request when practical.

---

## 5. Issue Template

Each coding issue should contain:

```markdown
## Objective

What must be accomplished?

## Context

Which specification sections apply?

## Scope

What is included?

## Out of Scope

What must not be added?

## Files or Components

Which areas are expected to change?

## Acceptance Criteria

- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Testing

How will the work be validated?

## Documentation

What documentation must be updated?
```

---

## 6. Pull Request Requirements

Every pull request should include:

- A concise summary
- Linked issue
- Screenshots for visual changes
- Mobile and desktop verification
- Accessibility notes
- Testing performed
- Known limitations
- Documentation updates
- No unrelated changes

---

## 7. Change Control

Changes to the following require explicit review:

- Mission language
- The Aston Cyber Ethos
- Top-level navigation
- Brand colors
- Typography
- Research disclosure fields
- Funding disclosures
- Privacy behavior
- Analytics
- Third-party scripts
- Security controls
- Launch scope

---

## 8. Milestone Summary

### Milestone 1: Foundation Complete

Phases 0 through 3

### Milestone 2: Design and Content System Complete

Phases 4 and 5

### Milestone 3: Core Site Complete

Phases 6 through 8

### Milestone 4: Discovery and Metadata Complete

Phases 9 and 10

### Milestone 5: Launch Ready

Phases 11 and 12

### Milestone 6: Public Launch

Phase 13

### Milestone 7: Stable Operations

Phase 14
