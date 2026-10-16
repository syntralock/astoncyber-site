# Aston Cyber Website Build Instructions

## Purpose

This instruction sheet explains how to move from planning documents to a finished Aston Cyber website.

Follow the steps in order.

Do not begin a later section until the current section is complete and reviewed.

---

# Step 1: Create the Project Workspace

1. Create a new Git repository for the Aston Cyber website.
2. Clone it to your local development environment.
3. Create a `/docs` folder.
4. Add all approved Aston Cyber planning documents to `/docs`.
5. Commit the documentation before writing application code.

Recommended document order:

```text
docs/
  00-brand-identity-brief.md
  01-design-system.md
  02-navigation.md
  03-organization.md
  04-content-strategy.md
  05-cyber-ethos.md
  06-website-specification.md
  07-website-project-plan.md
  08-build-instructions.md
  09-development-rules.md
  10-architecture-decision-record.md
  11-phase-0-decisions.md
```

Checkpoint:

- All documents are present.
- File names are consistent.
- The repository has an initial documentation commit.

---

# Step 2: Record Open Decisions

Approved decisions are recorded in:

```text
docs/11-phase-0-decisions.md
```

The current baseline is:

- Azure Static Web Apps
- `astoncyber.com`
- pnpm
- Search deferred until content volume demonstrates a clear need
- No analytics by default
- General contact at `info@astoncyber.com`
- Responsible disclosure and security reports at `security@astoncyber.com`
- Direct email links for the initial release; no server-backed contact form
- Repository-based MDX with Zod-validated front matter
- Dark theme only, using semantic tokens compatible with a future light theme
- Temporary text-only wordmark until the final logo package is approved

Do not leave architecture decisions buried in chat transcripts.

Checkpoint:

- Every blocking decision has an owner.
- Unknown items are clearly labeled.
- Work can begin without guessing.

---

# Step 3: Initialize the Application

Create a Next.js application with:

- TypeScript
- App Router
- Strict type checking
- ESLint
- A consistent formatter
- A lockfile
- A supported Node.js version

Create the initial folders:

```text
app/
components/
content/
lib/
public/
styles/
tests/
scripts/
docs/
```

Add commands for:

```text
dev
build
start
lint
typecheck
test
format
```

Checkpoint:

- The application runs locally.
- The production build succeeds.
- Lint and type checking pass.

---

# Step 4: Configure Repository Quality Controls

Add continuous integration that runs:

1. Dependency installation
2. Formatting check
3. Lint
4. Type checking
5. Tests
6. Production build

Also add:

- Pull request template
- Issue template
- Dependency update automation
- Secret scanning
- Branch protection, if available
- Dependency review
- Least-privilege GitHub Actions permissions
- Preview deployment protections
- Environment validation
- Content Security Policy and security-header planning
- Safe MDX rendering with raw HTML disabled by default

Checkpoint:

- A test pull request triggers CI.
- A failing check blocks merge.
- The default branch remains deployable.

---

# Step 5: Implement Design Tokens

Before building pages, implement:

- Colors
- Typography
- Spacing
- Breakpoints
- Borders
- Radii
- Shadows
- Motion
- Reading widths
- Layout containers

Load:

- Lora
- IBM Plex Sans
- JetBrains Mono

Use the approved accent:

```text
#4B9CD2
```

Do not place arbitrary visual values directly in page components.

Checkpoint:

- A simple test page demonstrates all typography levels in the approved dark theme.
- Colors meet contrast requirements.
- Tokens work on mobile and desktop.
- Components consume semantic tokens and do not require rewrites for a future light theme.

---

# Step 6: Build the Site Shell

Build the shared structure:

1. Skip link
2. Site header
3. Desktop navigation
4. Mobile navigation
5. Main content container
6. Footer
7. Breadcrumbs
8. Not-found page
9. Error state
10. Default metadata

Test the shell before building full pages.

Checkpoint:

- Navigation works with keyboard only.
- Mobile navigation works without layout overflow.
- Header and footer appear consistently across routes.

---

# Step 7: Build Reusable Components

Create components in small groups and only when the first complete
research-content vertical slice requires them.

Start with primitives:

- Container
- Section
- Stack
- Grid
- Heading
- Text
- Link
- Button

Then build the minimum required content components:

- Tag
- Status badge
- Metadata row
- Research card
- Callout
- Code block
- Figure
- Table
- Citation

Add person cards, quotes, pagination, filters, search controls, and other
patterns only when a real content or page requirement demonstrates a
need. Layout, typography, navigation, and core site components must be
project-native. shadcn/ui may be evaluated only as an optional source of
accessible primitives.

Document the intended usage of every component.

Checkpoint:

- Components are reusable.
- Interactive components are keyboard accessible.
- Pages can be assembled without copy-pasting markup.

---

# Step 8: Build the Content System

Use repository-based MDX and define structured collections.

Begin with:

```text
content/
  research/
```

After the research vertical slice validates the model, expand to:

```text
content/
  projects/
  labs/
  people/
  pages/
```

Add schema validation for front matter.

Use Zod for front matter validation. Disable raw HTML by default and
restrict any custom MDX components to an approved allowlist.

Do not expand all collections speculatively. Create only the minimum content
needed for the Phase 5 research fixture until a public research item validates
the model or an owner explicitly approves broader collection work.

Before expanding the component library or all collections, build one
complete non-public technical research vertical slice from validated MDX
through shared index-card composition, shared detail rendering, citation
metadata, and production-build validation.

Use a required `visibility` field with exactly three states:

- `public` for owner-approved publication content
- `draft` for authoring work
- `fixture` for non-public technical validation

The technical fixture is not a published research item. It may exercise the
research schema, safe MDX processing, author, contributor, topic, and tag
references, citation metadata, shared index-card composition, shared detail
rendering, and the static build. It must contain no invented research findings,
claims, affiliations, biographies, disclosures, or organizational history.

Only `visibility: public` items may appear in production-facing loaders,
navigation, research indexes, RSS, sitemap output, or any other publication
surface. Drafts and fixtures must be excluded. The fixture must create no public
route or artifact. It does not replace owner approval of the first real
research publication and disclosure status, or the complete public research
experience planned for Phase 7.

The build must fail when required metadata is missing or invalid.

Checkpoint:

- Drafts and fixtures do not appear in production-facing loaders or generated
  public output.
- Authors and topics resolve correctly.
- The fixture renders through shared card and detail composition during
  validation without becoming a public route.
- Invalid content fails validation.
- RSS and sitemap generate deterministically from public content only; valid
  empty outputs are expected until a public item is approved.

---

# Step 9: Build Institutional Pages

Build these pages first:

1. Homepage
2. Mission
3. Ethos
4. About
5. People
6. Contact
7. Responsible Disclosure
8. Accessibility
9. Privacy

Use real content.

Do not use lorem ipsum.

The homepage must introduce Aston Cyber before introducing the founder.

Use only approved repository language. Until approved public Research,
Projects, Labs, or programs exist, omit those homepage sections entirely.
Do not render the Phase 5 technical fixture or create empty promotional
sections.

The People index may use a neutral editorial empty state. Implement reusable
person-profile architecture, but generate no public profile route until
approved person content exists. Do not invent identities, biographies,
affiliations, portraits, or profile data.

The About page must omit unapproved leadership, contributor, affiliation,
history, funding, and sponsorship material. It may include only the approved
neutral disclosure recorded in the website specification.

General-inquiry links must use `info@astoncyber.com`. Responsible
disclosure and security-reporting links must use
`security@astoncyber.com`; do not interchange the addresses.

Contact uses direct `mailto:` links only. Do not add a form, Server Action, API
route, external form provider, mail service, or other inquiry infrastructure.
Any future public form requires a separate architecture and security review.

Responsible disclosure is limited to the operational guidance approved in the
website specification. Do not invent testing scope, timelines, bounty or credit
terms, coordinated-disclosure deadlines, authorization, or safe-harbor terms.
`security.txt` remains deferred.

Do not add photography, stock or generated imagery, placeholder portraits,
decorative hero imagery, or other unapproved visual assets.

Checkpoint:

- Mission and Ethos are clear.
- No page resembles a consulting or SaaS website.
- All pages are usable on mobile.
- Accessibility tests pass.

---

# Step 10: Build the Research Experience

Build research in this order:

1. Research metadata schema
2. Research card
3. Research index
4. Featured research
5. Research detail template
6. Methodology
7. Findings
8. Limitations
9. Disclosure status
10. References
11. Citation information
12. Revision history
13. Downloads
14. Related research
15. Static topic filtering

Phase 7 research routes are:

```text
/research
/research/[slug]
/research/topics
/research/topics/[slug]
```

Generate every route at build time from approved public research and the
existing topic registry. Use ordinary links. Do not add a client-side filtering
application, runtime query service, search index, or browser search code.

Search is omitted from Phase 7 under Architecture Decision 14. Format, year,
and status remain visible metadata; dedicated filter routes are deferred until
a documented content-volume review justifies them.

Create the owner-approved Secure Transaction Authorization Ledger report from
its canonical DOCX manuscript. Preserve the original DOCX at its approved
public download path. Do not create additional placeholder reports.

Omit Related Research when no other eligible public report exists.

Checkpoint:

- A reader can identify what is known, inferred, and uncertain.
- Disclosure status is visible.
- References and citation details are complete.
- Research pages print cleanly.

## Step 10.1: Refine Institutional Desktop Composition

Before Phase 7 approval, refine the existing homepage, Mission page, Research
index, and shared navigation without expanding the product scope:

1. Use centered, restrained introductions within the institutional container.
2. Keep long-form and card body text left-aligned.
3. Use three equal wide-screen columns for homepage and Mission focus content.
4. Use a wide flagship panel for the featured public report.
5. Keep the homepage contact treatment as a concise link to `/contact`; do not
   add a form or expose additional addresses there.
6. Publish only Home, Research, Projects, Labs, and About in primary
   navigation. Retain `/mission` as a secondary published route. Writing and
   Speaking belong to the future personal website and must not be added as
   Aston Cyber destinations.
7. Use Mission as the homepage three-pillar group heading. Add only the three
   approved same-weight decorative line icons using project-native SVG; keep
   them `aria-hidden` and add no icon dependency.
8. Widen the homepage hero heading measure so it naturally fits one line at
   common 1280px–1600px desktop widths without an authored line break.
9. Remove the redundant inline Contact link from About while retaining Contact
   in the global footer.
10. Use existing spacing, width, typography, color, surface, and breakpoint
    tokens. Do not add cybersecurity cliché imagery.
11. Verify 375px, 768px, 1280px, 1440px, 1600px, and 200% zoom behavior.

Do not add search, runtime filtering, pagination, newsletter or subscription
functionality, a contact form, or a new runtime service.

---

# Step 11: Build Projects & Labs

Follow `20-phase-8-projects-labs-specification.md`.

1. Apply the approved image extension/MIME pairs from the Phase 8
   specification. Do not create external-contributor approval storage until an
   actual owner-approved external submission requires its separately approved
   evidence contract.
2. Define strict Project and Lab Zod schemas without collapsing their
   editorial differences.
   - Project status: `active`, `stable`, `completed`, `archived`
   - Lab maturity: `experimental`, `prototype`, `beta`, `stable`, `archived`
   - Visibility remains a separate publication field.
3. Extend centralized repository MDX loading and structural safety checks.
4. Add controlled technology and license registries.
5. Add exact normalized HTTPS repository-host validation for `github.com` and
   `gitlab.com`.
6. Add directly hosted resource validation for PDF, TXT, CSV, JSON, YAML, YML,
   XML, Markdown, and confirmed existing web-image formats. Reject ZIP files,
   executables, installers, compiled binaries, libraries, shell scripts,
   PowerShell scripts, batch/command files, and opaque binary bundles.
7. Add validated contributor, taxonomy, resource, and relationship handling.
   Relationships are explicit and directional; reject missing, duplicate,
   self, wrong-collection, fixture, and prohibited public-to-non-public
   references.
8. Keep external-contributor approval storage deferred until an actual
   owner-approved submission defines the minimal private repository-controlled
   contract. Do not create speculative records or private registries.
9. Store test fixtures outside production content directories. Migrate the
   legacy Phase 5 research fixture from `content/research/` to
   `tests/fixtures/content/research/`, remove `fixture` from production
   visibility, and ensure no production loader or generator imports or scans
   test fixture locations.
10. Add public-only Project and Lab collection and slug lookup APIs.
11. Build `/projects`, `/projects/[slug]`, `/labs`, and `/labs/[slug]` as static
    Server Components. Keep each `[slug]` route file inactive while its
    production collection is empty; activate it in the same reviewed change as
    the first approved public item, following the exact steps in the Phase 8
    specification. Never generate a placeholder, fixture, draft, or sentinel
    parameter.
12. Reuse shared cards and metadata primitives only where their semantics fit.
13. Ship factual accessible empty states unless owner-approved public content
    is supplied. Do not invent content.
14. Support `featured` in schemas without adding Project or Lab homepage
    sections.
15. Add public-only sitemap routes. Preserve the Research RSS feed unchanged
    and add no Project or Lab feed.
16. Remove stale Writing and Speaking configuration or examples from Aston
    Cyber application code and tests.
17. Add positive, negative, static-generation, relationship, visibility,
    fixture-isolation, and export-leakage tests.

Checkpoint:

- Projects represent completed or substantially complete work.
- Labs represent tooling, experiments, proof-of-concepts, detection content,
  and other creative security ventures.
- Lab maturity and preliminary status are explicit.
- Project and Lab pages show only approved contributor, repository, resource,
  and license data.
- Drafts and non-public content create no route or generated-output entry.
- Project status and Lab maturity do not control visibility.
- Proprietary and unlicensed content is never labeled open source.
- Source code and runnable releases link to approved repository hosts rather
  than direct downloads.
- Test fixtures cannot enter loaders, routes, metadata, counts, relationships,
  sitemap, RSS, or generated output.
- Writing and Speaking are not added; they belong to `matt.astoncyber.com`.

---

# Step 12: Add Search & Discovery

**Status:** Intentionally deferred until content volume warrants
implementation. This is not a launch blocker and Phase 10 proceeds without it.

Site search is deferred until content volume demonstrates a clear need.
Phase 7 already owns static research topic navigation. Reuse those pages and
implement chronological archives first. Revisit the steps below only after a
documented review approves search.

Phase 9 covers Research, Projects, and Labs.

Index:

- Titles
- Summaries
- Authors
- Contributors
- Topics
- Tags

Add:

- Search page
- Cross-collection topic discovery that links to, rather than duplicates,
  Phase 7 research topic pages
- Shareable filtered URLs
- Pagination
- No-results state

Do not add a complex hosted search service unless the content volume requires it.

Checkpoint:

- Search returns relevant results.
- Filters work on mobile.
- URLs preserve search and filter state.
- Search does not introduce unnecessary tracking.

---

# Step 12.1: Coordinate the Future Personal Website

Develop `matt.astoncyber.com` as a separate future home for personal Writing
and Speaking. Keep it architecturally separate from the Aston Cyber Projects
and Labs collections. Its implementation is not a prerequisite for Aston Cyber
Phase 10.

Do not implement the personal website as part of Phase 8 or Phase 9.

---

# Step 13: Add SEO and Sharing Metadata

For every page, add:

- Page title
- Meta description
- Canonical URL
- Open Graph metadata
- Social preview image
- Sitemap entry
- Robots directives

Add structured data where appropriate:

- Organization
- Person
- Article
- ScholarlyArticle
- TechArticle
- SoftwareSourceCode
- Event
- BreadcrumbList

Checkpoint:

- Metadata is unique.
- Social previews are correct.
- Structured data validates.
- Research pages include citation-friendly data.

---

# Step 14: Apply Security and Privacy Controls

Validate and harden the baseline established in Step 4:

- HTTPS
- Security headers
- Content Security Policy
- Input validation
- Spam protection
- Dependency scanning
- Secret scanning
- Error monitoring
- Uptime monitoring

Review every third-party script.

Do not add trackers by default.

Checkpoint:

- Security headers validate.
- Any separately approved forms protect user data.
- Disclosure contact works.
- RFC 9116 `/.well-known/security.txt` is published with `Contact: mailto:security@astoncyber.com`.
- Privacy documentation matches actual behavior.

---

# Step 15: Run Accessibility Review

Test:

1. Keyboard navigation
2. Focus order
3. Visible focus
4. Screen-reader landmarks
5. Heading hierarchy
6. Color contrast
7. Reduced motion
8. Form labels and errors
9. Mobile navigation
10. Tables
11. Images
12. Video captions or transcripts

Fix issues before launch.

Checkpoint:

- No critical WCAG 2.2 AA defects remain.
- Automated and manual checks are documented.
- Every page is usable without a mouse.

---

# Step 16: Run Performance Review

Review:

- JavaScript bundle size
- Font loading
- Image loading
- Layout stability
- Caching
- Static generation
- Third-party scripts
- Core Web Vitals
- Lighthouse results

Optimize before adding visual effects.

Checkpoint:

- Representative pages reach agreed performance targets.
- Core Web Vitals pass.
- Any exceptions are documented.

---

# Step 17: Conduct Final Content Review

Review every page for:

- Accuracy
- Tone
- Grammar
- Attribution
- Dates
- Links
- Citations
- Disclosure status
- Funding disclosures
- Placeholder content
- Consistency with the Ethos

Checkpoint:

- No placeholder content remains.
- All contributors are credited correctly.
- All claims are supported or clearly identified as opinion.
- All links work.

---

# Step 18: Prepare Production Deployment

Configure:

- Azure Static Web Apps production environment
- `astoncyber.com`
- DNS
- HTTPS
- Environment variables
- Redirects
- Monitoring
- Rollback procedure
- Build logs

Deployment uses GitHub Actions and a static-first Next.js architecture.
Do not assume server-side infrastructure without a future architectural
review.

Create a release checklist.

Checkpoint:

- Preview deployment is approved.
- Production configuration is documented.
- Rollback has been tested or clearly defined.

---

# Step 19: Launch

On launch day:

1. Deploy the approved build.
2. Verify the homepage.
3. Verify all top-level navigation.
4. Verify research pages.
5. Verify direct email contact methods and any separately approved forms.
6. Verify responsible disclosure information.
7. Verify sitemap and robots file.
8. Verify social previews.
9. Verify monitoring.
10. Create a release tag.
11. Record any issues in the project tracker.

Checkpoint:

- The public site is stable.
- Critical paths work.
- No high-severity issue remains open.

---

# Step 20: Stabilize and Maintain

During the first weeks after launch:

- Review errors
- Review performance
- Review accessibility feedback
- Confirm search engine indexing
- Fix launch defects
- Update documentation
- Establish publishing workflow
- Establish dependency update routine
- Establish backup routine
- Establish quarterly review process

Quarterly review should cover:

- Content freshness
- Broken links
- Accessibility
- Performance
- Security dependencies
- Privacy behavior
- Funding disclosures
- Responsible disclosure process
- Alignment with The Aston Cyber Ethos

---

# Working Method for Each Coding Section

For every section of work:

1. Create or select an issue.
2. Read the relevant specification sections.
3. Write the acceptance criteria.
4. Create a focused branch.
5. Implement only the approved scope.
6. Run tests locally.
7. Review mobile and desktop behavior.
8. Check accessibility.
9. Update documentation.
10. Open a pull request.
11. Review the pull request against acceptance criteria.
12. Merge only after all checks pass.

---

# Rule for Using Codex or Other Coding Assistants

Every coding request should include:

- The objective
- Relevant specification sections
- Files allowed to change
- Explicit out-of-scope items
- Acceptance criteria
- Required tests
- Documentation requirements

Example request:

```text
Implement the Aston Cyber site header and responsive navigation.

Use:
- docs/01-design-system.md
- docs/02-navigation.md
- docs/06-website-specification.md

Scope:
- Header
- Desktop navigation
- Mobile navigation
- Skip link
- Active route state

Do not:
- Build page content
- Add new colors
- Add animation beyond the approved motion rules
- Install a component library

Acceptance criteria:
- Keyboard accessible
- Works at all documented breakpoints
- Uses existing tokens
- Passes lint, typecheck, tests, and production build
- Includes accessibility notes in the pull request
```

---

# Final Launch Standard

The Aston Cyber website is ready when it is:

- Clear
- Credible
- Accessible
- Fast
- Secure
- Maintainable
- Editorially independent
- Consistent with The Aston Cyber Ethos

A smaller, complete, trustworthy site is better than a larger unfinished one.
# Current build note (2026-10-16)

Use Node.js 24 and pnpm 11. Package-manager policy now lives in
`pnpm-workspace.yaml`; the obsolete `.npmrc` is removed. Run
`pnpm install --frozen-lockfile` followed by `pnpm validate`. The canonical
routes and positioning are defined by Decision 23; conflicting phase-specific
instructions below are historical.
