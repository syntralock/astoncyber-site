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
  05-aston-cyber-ethos.md
  06-website-specification.md
  07-project-plan.md
  08-build-instructions.md
```

Checkpoint:

- All documents are present.
- File names are consistent.
- The repository has an initial documentation commit.

---

# Step 2: Record Open Decisions

Create:

```text
docs/decisions.md
```

Record decisions for:

- Hosting platform
- Primary domain
- Package manager
- Search at launch or after launch
- Analytics or no analytics
- Contact form or email link
- Responsible disclosure contact method
- Markdown or MDX
- Light-only or light-and-dark interface
- Final logo delivery status

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

- Sora
- Inter
- JetBrains Mono

Use the approved accent:

```text
#4B9CD2
```

Do not place arbitrary visual values directly in page components.

Checkpoint:

- A simple test page demonstrates all typography levels.
- Colors meet contrast requirements.
- Tokens work on mobile and desktop.

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

Create components in small groups.

Start with primitives:

- Container
- Section
- Stack
- Grid
- Heading
- Text
- Link
- Button

Then build content components:

- Tag
- Status badge
- Metadata row
- Research card
- Project card
- Writing card
- Person card
- Callout
- Quote
- Code block
- Figure
- Table
- Citation
- Pagination
- Filters
- Search input

Document the intended usage of every component.

Checkpoint:

- Components are reusable.
- Interactive components are keyboard accessible.
- Pages can be assembled without copy-pasting markup.

---

# Step 8: Build the Content System

Choose Markdown or MDX and define structured collections.

Create:

```text
content/
  research/
  projects/
  writing/
  labs/
  speaking/
  people/
  pages/
```

Add schema validation for front matter.

Create at least one realistic sample file for each collection.

The build must fail when required metadata is missing or invalid.

Checkpoint:

- Drafts do not appear in production.
- Authors and topics resolve correctly.
- Content renders through shared templates.
- Invalid content fails validation.

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
15. Filters

Create one complete research example before creating multiple placeholder reports.

Checkpoint:

- A reader can identify what is known, inferred, and uncertain.
- Disclosure status is visible.
- References and citation details are complete.
- Research pages print cleanly.

---

# Step 11: Build Projects, Writing, Labs, and Speaking

Build each collection using the shared content system.

For every collection:

1. Create the metadata schema.
2. Create the index page.
3. Create the detail template.
4. Create card components.
5. Add filters only when useful.
6. Add a clear empty state.
7. Add at least one realistic example.

Checkpoint:

- Preliminary Labs work is labeled.
- Writing includes sources where relevant.
- Project pages show status and licensing.
- Speaking pages show recordings or slides when available.

---

# Step 12: Add Search and Topic Discovery

Index:

- Titles
- Summaries
- Authors
- Contributors
- Topics
- Tags

Add:

- Search page
- Topic pages
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

Configure:

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
- Forms protect user data.
- Disclosure contact works.
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

- Production environment
- Domain
- DNS
- HTTPS
- Environment variables
- Redirects
- Monitoring
- Rollback procedure
- Build logs

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
5. Verify forms and contact methods.
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
