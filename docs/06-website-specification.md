# Aston Cyber Website Specification

## 1. Purpose

This document defines the functional, structural, editorial, technical, accessibility, and implementation requirements for the Aston Cyber website.

It is the authoritative blueprint for planning and building the site.

Where ambiguity exists, implementation should favor:

1. Clarity
2. Reuse
3. Accessibility
4. Performance
5. Consistency with the Aston Cyber design system
6. Simplicity over novelty

---

## 2. Organizational Positioning

Aston Cyber is an independent, public-interest cybersecurity research organization.

It is not a consultancy, managed security provider, SaaS company, or
marketing website.

The website must present Aston Cyber as an institution first and its founder second.

The primary narrative order is:

1. Mission
2. Research
3. Engineering
4. Security
5. Projects and publications
6. People behind the work

The site must not resemble:

- A personal portfolio
- A consulting company
- A SaaS vendor
- A cybersecurity product landing page
- A fear-based news site
- A generic agency website

The website should communicate rigor, independence, trust, and technical depth.

---

## 3. Core Brand Principles

The website must reflect the following principles:

- Research comes before products.
- Evidence comes before opinion.
- Accuracy matters more than speed.
- Security creates freedom.
- Knowledge should be open whenever responsibly possible.
- Responsible disclosure is mandatory.
- Funding must not control editorial conclusions.
- Trust is earned through rigor and consistency.

Primary phrase:

> Research. Engineering. Security.

---

## 4. Primary Audiences

The website serves three overlapping audiences.

### 4.1 Practitioners

Examples:

- Security engineers
- Software engineers
- Cloud engineers
- Security architects
- Incident responders
- Detection engineers
- Infrastructure engineers

Primary needs:

- Practical findings
- Technical depth
- Reproducible methods
- Actionable conclusions
- Clear limitations

### 4.2 Academics and Researchers

Primary needs:

- Research methods
- Citations
- Datasets
- Reproducibility
- Responsible disclosure details
- Contributor attribution
- Research archives

### 4.3 Technical Leadership

Examples:

- CISOs
- Directors
- Engineering leaders
- Security leaders
- Technical program owners

Primary needs:

- Clear implications
- Trustworthy assessments
- Concise summaries
- Risk context
- Evidence without vendor spin

---

## 5. Primary Site Goals

The website must:

- Establish Aston Cyber as a credible research institution.
- Publish research, projects, and labs work.
- Make the organization's ethos visible and understandable.
- Help visitors discover work by topic, format, and date.
- Present contributors and leadership without making the site founder-centric.
- Support future growth into a multi-contributor organization.
- Be easy to maintain through structured content.
- Preserve editorial independence in both language and presentation.
- Perform well on modern desktop and mobile devices.
- Be accessible to WCAG 2.2 AA standards.

---

## 6. Information Architecture

The public primary navigation must contain exactly:

- Home
- Research
- Projects
- Labs
- About

Home links to `/` and replaces Mission in public primary and footer
navigation. Mission remains published at `/mission` as a secondary
institutional page available through contextual links and direct URL.

Writing and Speaking are removed from the Aston Cyber roadmap and navigation.
They are assigned to the future personal website at `matt.astoncyber.com`.
Desktop, mobile, and footer primary navigation must derive from the same
centralized published-state configuration.

The Ethos page must be prominently linked from Mission and the footer,
but it is not a primary navigation item.

A compact utility area may include:

- Search
- RSS
- GitHub
- Email or contact
- Theme control, if implemented

Navigation labels must remain plain and direct.

Avoid labels such as:

- Insights
- Solutions
- Capabilities
- Resources
- Innovation
- Thought leadership

---

## 7. Route Structure

Recommended routes:

```text
/
/mission
/research
/research/[slug]
/projects
/projects/[slug]
/labs
/labs/[slug]
/ethos
/about
/people
/people/[slug]
/research/topics
/research/topics/[slug]
/contact
/disclosures
/accessibility
/privacy
/rss.xml
```

Optional later routes:

```text
/search
/publications
/publications/[slug]
/datasets
/datasets/[slug]
/contributors
/archive
/annual-reports
```

---

## 8. Homepage Specification

The homepage must introduce Aston Cyber as an organization before introducing any individual.

### 8.1 Hero

Required elements:

- Aston Cyber name or approved brand mark
- Primary statement
- Supporting mission statement
- One primary call to action
- One secondary call to action

Recommended message hierarchy:

1. Research. Engineering. Security.
2. Independent cybersecurity research for the public interest.
3. Brief explanation of what Aston Cyber publishes and why.

Suggested calls to action:

- Explore Research
- Read the Ethos

The hero must not use:

- Stock cybersecurity imagery
- Hacker silhouettes
- Shield icons
- Padlocks
- Animated code rain
- Excessive motion
- Generic dashboard mockups

The desktop hero uses a centered composition for its eyebrow, primary heading,
supporting copy, and actions. At common desktop widths from approximately
1280px through 1600px, the primary heading should fit naturally on one line
without an authored line break. Its measure narrows responsively and retains
balanced natural wrapping at smaller widths. Supporting copy retains a readable
maximum measure and remains restrained. Body text elsewhere is not globally
centered.

### 8.2 Featured Research

Display one primary research item and up to three supporting items.

This section is conditional on approved public research. During Phase 6 it must
be omitted while the repository contains no public research; the non-public
technical fixture must never be used.

Each item should show:

- Title
- Short summary
- Publication date
- Topic
- Content type
- Reading time or report length
- Disclosure status when applicable

### 8.3 Institutional Focus

A three-part explanatory section should use the following equal concepts:

1. Our work
2. Vision
3. Research, engineering, and education

Use the governing group heading “Mission.” It must carry greater visual weight
than the three supporting headings. At wide widths, render three equal columns
rather than a two-over-one card arrangement. Each pillar uses one same-size,
same-stroke decorative accent line icon centered above its centered heading:
a three-person figure for Our work, a magnifying glass for Vision, and an
abstract prism, diamond, or geometric triangle for Research, engineering, and
education. Icons are `aria-hidden`, use the existing accent token, and require
no icon dependency. Explanatory prose remains left-aligned. Use spacing or
subtle dividers rather than three heavy boxes. The composition stacks in
logical source order at smaller widths.

The approved pillar icons do not relax the prohibition on shields, locks,
hacker imagery, ornamental cybersecurity clichés, or decorative animation.

### 8.4 Current Work

Show active projects, research programs, or lab initiatives.

This section is conditional on approved public project or program content.
During Phase 6 it must be omitted rather than represented by invented or empty
promotional material.

Each item should indicate:

- Status
- Scope
- Lead or contributors
- Last update
- Link to project details

### 8.5 Ethos Preview

Include a short excerpt from The Aston Cyber Ethos with a link to the full document.

### 8.6 Organization Introduction

A brief section may introduce the organization and founder near the bottom of the page.

The founder must not dominate the homepage.

### 8.7 Footer

Required footer content:

- Organization name
- Mission summary
- Navigation
- Contact
- GitHub or code repository
- RSS
- Accessibility
- Privacy
- Responsible disclosure information
- Copyright

---

## 9. Page Specifications

## 9.1 Mission Page

Purpose:

Explain why Aston Cyber exists.

Required content:

- Mission statement
- The problem Aston Cyber addresses
- Public-interest research position
- Research, Engineering, Security framework
- How security creates freedom
- Link to the Ethos

The Mission page uses a centered breadcrumb region and centered introduction,
followed by a wide three-column composition for Our work, Vision, and Research,
engineering, and education. Paragraph text remains left-aligned. Approved
organizational principles and the Ethos link remain part of the page and may
use a full-width concluding region.

## 9.2 Research Index

Required features:

- Featured research
- Chronological archive
- Static topic filtering through `/research/topics` and
  `/research/topics/[slug]`
- Ordinary links to statically generated views; no client-side filtering
- Format, year, and status remain visible as research metadata but do not
  require separate filter routes while only one public report exists
- Search is explicitly deferred and omitted from Phase 7 under Architecture
  Decision 14
- Clear distinction between completed, active, and archived work

Each card must show:

- Title
- Summary
- Date
- Authors
- Topic
- Format
- Status

The Research introduction is centered within a restrained measure. The
featured report uses a wide publication-panel treatment with left-aligned
content and the complete approved metadata. It must not be constrained to the
standard multi-card archive width. Search, subscription prompts, client-side
filters, and unsupported update-signup calls to action remain prohibited.

## 9.3 Research Detail Page

Required fields:

- Title
- Subtitle or abstract
- Authors and contributors
- Publication date
- Revision date
- Research status
- Responsible disclosure status
- Summary
- Key findings
- Methodology
- Evidence
- Limitations
- Recommendations
- References
- Citation format
- Downloadable artifacts
- Related work
- Change history

For the first public report, the research model must also preserve:

- Publication note
- Author affiliation
- Publication version
- Original downloadable DOCX artifact
- Keywords
- Evaluation claims matrix

Optional fields:

- CVE identifiers
- Vendor response
- Timeline
- Dataset
- Source code
- Reproduction instructions
- Peer review notes

Research pages must clearly distinguish:

- Verified findings
- Inferences
- Opinions
- Open questions

When no other eligible public research exists, omit Related Research entirely.
Do not render fixture content, placeholder cards, or invented publications.

## 9.3.1 Phase 7 Static Research Discovery

Phase 7 owns:

- `/research`
- `/research/[slug]`
- `/research/topics`
- `/research/topics/[slug]`

Topic pages are generated at build time from the existing validated topic
registry and approved public research only. Topic links are the Phase 7
research-filtering mechanism. They use ordinary links and require no browser
state, runtime query service, search index, or client-side filtering
application.

Search remains deferred. Phase 7 must not add full-text search, a search input,
a search index, client-side search, runtime search, or a third-party search
service. Broader cross-collection discovery remains a later-phase concern and
must consume, not duplicate, the Phase 7 research topic pages.

## 9.3.2 First Approved Public Report

The first public Phase 7 report is:

- Title: Secure Transaction Authorization Ledger
- Subtitle: A Design-and-Build Case Study in Transaction-Bound Approval,
  Explainable Risk Scoring, and Tamper-Evident Authorization Evidence
- Author: Matthew T. Aston
- Affiliation: Master of Science in Computer Science, Cybersecurity, Troy
  University
- Project: CS6625 Secure Transaction Authorization Ledger
- Publication and revision date: 2026-07-01
- Revision: 1.0
- Visibility: public
- Publication status: published
- Research type: case-study
- Disclosure status: not-applicable
- Featured: true
- Slug: `secure-transaction-authorization-ledger`

The owner approved this report for public release. Its `not-applicable`
disclosure status records that it documents a synthetic graduate
secure-systems prototype and does not disclose a vulnerability affecting an
external organization or product.

The canonical author manuscript and approved public download is:

```text
public/downloads/research/secure-transaction-authorization-ledger/Secure_Transaction_Authorization_Ledger_Case_Study.docx
```

The MDX representation is an editorial web transformation. It must preserve
the manuscript's meaning, technical claims, qualifications, references,
limitations, attribution, publication note, and evaluation claims. Phase 7
does not add DOCX ingestion automation, conversion services, an editorial
workflow system, Google Docs integration, PDF generation, or a general
academic publishing platform.

## 9.4 Projects Index

Projects is a publishing collection for completed or substantially complete
cybersecurity work produced by Aston Cyber or approved external contributors.

The index must:

- explain the completed-work editorial boundary;
- list approved public Projects deterministically;
- expose status, contributors, topics/tags, technologies, and relevant
  repository or license metadata;
- support a factual accessible empty state;
- remain static and useful without client JavaScript;
- defer cross-collection search, filters, and pagination to Phase 9.

Project status accepts only `active`, `stable`, `completed`, or `archived`.
Publication visibility is a separate field and must not be inferred from
status.

Phase 8 ships this index with a factual empty state unless owner-approved
public Project content is supplied. The schema may support `featured`, but
Phase 8 does not add Projects to the homepage.

## 9.5 Project Detail Page

A Project may include title, slug, summary, description or MDX body,
publication or completion date, status, contributors, topics/tags,
technologies, repository URL, project or demonstration URL, license,
downloads/resources, related Research, related Labs, and featured state.

The detail page emphasizes purpose, completed or substantially complete work,
implementation or outcome, status, contributors, repository/resources,
license, limitations, and related Research or Labs. It must not imply
production readiness, maintenance, support, security review, or warranty
without explicit approved content.

## 9.6 Labs Index

Labs is a publishing collection for open-source security tools, utilities,
scripts, proof-of-concepts, experiments, detection content, and other creative
security ventures.

The index must:

- explain the Labs editorial purpose;
- list approved public Labs deterministically;
- expose maturity/status, contributors, topics/tags, technologies, and relevant
  repository or license metadata;
- clearly distinguish experimental or preliminary work;
- support a factual accessible empty state;
- remain static and useful without client JavaScript;
- defer cross-collection search, filters, and pagination to Phase 9.

Lab maturity accepts only `experimental`, `prototype`, `beta`, `stable`, or
`archived`. Publication visibility is a separate field and must not be inferred
from maturity.

Phase 8 ships this index with a factual empty state unless owner-approved
public Lab content is supplied. The schema may support `featured`, but Phase 8
does not add Labs to the homepage.

## 9.7 Lab Detail Page

A Lab may include title, slug, summary, description or MDX body, publication
date, maturity/status, contributors, topics/tags, technologies, repository URL,
license, installation or usage guidance, downloads/resources, related
Research, related Projects, and featured state.

The detail page emphasizes maturity, limitations, authorized and safe use,
installation or usage guidance, repository/resources, license, and
relationships to formal Research or completed Projects. It must not imply
production readiness.

## 9.8 Ethos Page

This page should publish The Aston Cyber Ethos with minimal interruption.

Requirements:

- Strong typography
- Comfortable reading width
- No marketing banners
- No product calls to action
- Optional print view
- Optional downloadable Markdown or PDF
- Revision history

## 9.9 About Page

The About page should introduce Aston Cyber as an institution before introducing individuals.

Required order:

1. Organization overview
2. Mission
3. Operating principles
4. Leadership
5. Contributors
6. Contact
7. Funding or sponsorship disclosure

## 9.10 People Pages

Each profile may include:

- Name
- Role
- Short biography
- Areas of expertise
- Research
- Projects
- Professional links
- Disclosure of relevant affiliations

Phase 6 implements the People index and reusable person-profile architecture,
but no public profile route may be generated without approved person content.
The People index may use a neutral editorial empty state that does not imply
contributors, employees, advisors, or leadership profiles already exist. Do
not invent identities, biographies, affiliations, portraits, or profile data.

## 9.11 Contact Page

The initial static release uses direct email links only:

- General inquiries: `info@astoncyber.com`
- Responsible disclosure and security reports:
  `security@astoncyber.com`

Phase 6 must not add a form, Server Action, API route, external form provider,
mail service, or other server-side inquiry infrastructure. Any future public
form requires a separate architecture and security review.

## 9.12 Phase 6 Institutional Content Boundary

This subsection records the Phase 6 content boundary. For current remediation
work, the owner-approved identity, operating, funding, independence, and trust
decisions in `23-strategic-remediation-implementation-plan.md` supersede its
earlier restrictions. The approved Phase C implementation is recorded in
`25-phase-c-offerings-trust-contact.md`.

The Phase 6 homepage may use only approved repository language to introduce
Aston Cyber as an organization, explain its mission, ethos, and documented
areas of interest, and direct readers to institutional pages and contact
information. It must not introduce an individual or resemble a sales,
consultancy, SaaS, or conversion-focused page.

The About page must omit unapproved leadership, contributor listings,
affiliations, company history, funding claims, and sponsorship claims. The
owner-approved founder introduction added on 2026-08-06 may identify Matt Aston
and use only the approved biography supplied for that section. It may also
include this exact neutral disclosure:

> Aston Cyber does not currently publish a list of funders or sponsors.

The statement must not be expanded into claims about independence, funding
sources, ownership, or conflicts of interest.

No photography, stock imagery, generated imagery, placeholder portraits, hero
imagery, or decorative illustration is required or approved for Phase 6.

---

## 10. Content Model

All content should be structured and stored in a maintainable format.

Approved initial approach:

- Repository-based MDX for long-form content
- Front matter metadata
- Git-based version control
- Zod schema validation during build
- Raw HTML disabled by default

Recommended content collections:

```text
content/
  research/
  projects/
  labs/
  people/
  pages/
```

### 10.1 Common Metadata

```yaml
title:
slug:
summary:
status:
published_at:
updated_at:
authors:
contributors:
topics:
tags:
featured:
visibility:
seo_title:
seo_description:
```

`visibility` is required and accepts only:

- `public` — approved for public loaders, indexes, feeds, and sitemap output
- `draft` — authoring work that must be absent from production-facing loaders
  and generated output
- `fixture` — a non-public technical validation item that may exercise the
  research schema, safe MDX compilation, reference resolution, citation
  metadata, shared index-card composition, shared detail rendering, and the
  static production build

A fixture is not research publication content. It must contain no invented
research findings, claims, affiliations, biographies, disclosures, or
organizational history. Fixtures must be excluded from public navigation,
production research indexes, RSS, sitemap output, and every other publication
surface. Fixture validation does not replace approval of the first real
research publication or the complete public research experience.

### 10.2 Research Metadata

```yaml
research_type:
disclosure_status:
disclosure_date:
affected_entities:
cve_ids:
repository:
dataset:
report_file:
citation:
peer_review_status:
```

### 10.3 Project Metadata

```yaml
status:
completed_at:
repository:
project_url:
license:
contributors:
technologies:
resources:
related_research:
related_projects:
related_labs:
featured:
```

### 10.4 Lab Metadata

```yaml
maturity:
repository:
license:
contributors:
technologies:
usage:
resources:
related_research:
related_projects:
related_labs:
featured:
```

The exact Project status vocabulary, Lab maturity vocabulary, technology model,
license vocabulary, resource media rules, feed behavior, and cross-collection
relationship rules are defined in `20-phase-8-projects-labs-specification.md`.

Phase 8 publication visibility remains separate from Project status and Lab
maturity. Public and draft content use production content directories. Test
fixtures live outside production content directories and must be structurally
undiscoverable by production loaders and generated outputs.

This rule applies repository-wide. Phase 8 implementation must migrate the
legacy Phase 5 research fixture out of `content/research/` and into the
test-only fixture tree. Production content schemas then use only `public` and
`draft`; fixture behavior is exercised by explicit test inputs rather than a
production visibility value.

Project status values:

```text
active
stable
completed
archived
```

Lab maturity values:

```text
experimental
prototype
beta
stable
archived
```

Technology values are canonical identifiers from a centralized controlled
registry. Public MDX must not declare arbitrary technology strings.

Approved license values:

```text
MIT
Apache-2.0
BSD-2-Clause
BSD-3-Clause
GPL-3.0-only
MPL-2.0
CC-BY-4.0
CC-BY-SA-4.0
CC0-1.0
proprietary
unlicensed
```

Proprietary and unlicensed content must not be presented as open source.

Repository URLs must use HTTPS and the exact normalized hostname `github.com`
or `gitlab.com`.

Approved directly hosted resource types are PDF, TXT, CSV, JSON, YAML, YML,
XML, and Markdown. Approved images are `.png` with `image/png`, `.jpg` or
`.jpeg` with `image/jpeg`, `.webp` with `image/webp`, and `.gif` with
`image/gif`. SVG and every unlisted image format are rejected. ZIP archives,
executables, installers, compiled binaries, libraries, shell scripts,
PowerShell scripts, batch or command files, and opaque binary bundles are
prohibited as direct website downloads. Source code and runnable releases use
approved repository hosts.

Research, Projects, and Labs may declare typed cross-collection relationships.
Validation rejects missing targets, duplicates, self-references,
wrong-collection references, fixture references, and prohibited
public-to-non-public references. Reciprocal relationships are never inferred.

External-contributor approval evidence will be repository-controlled, minimal,
build-time validated, and absent from all public output. No external
contributor content is currently approved, so Phase 8 pass 1 creates no record
or private registry. Its exact storage contract requires owner approval with
the first real external submission.

---

## 11. Design Requirements

The website must follow the approved Aston Cyber design system.

### 11.1 Typography

- Display and headings: Lora
- Body and interface: IBM Plex Sans
- Technical: JetBrains Mono

The implementation must use defined typography tokens rather than arbitrary font sizes.
Heading authority must come from editorial proportion, hierarchy, and
readability rather than product-marketing scale or weight. Ordinary
reading text and interface controls must not use Lora.

### 11.2 Color

The initial release is dark-theme only and must use the semantic color
tokens defined in `01-design-system.md`. The implementation must preserve
the token abstraction required for a future light theme without
component rewrites.

The accent color must be used intentionally and sparingly.

The site must remain effective in monochrome.

### 11.3 Visual Style

The visual character should be:

- Editorial
- Institutional
- Precise
- Calm
- Modern
- Restrained

Avoid:

- Cybersecurity clichés
- Excessive gradients
- Glassmorphism
- Neon effects
- Decorative motion
- Generic stock imagery
- Overloaded card layouts
- Unnecessary borders
- Artificial visual complexity

### 11.4 Layout

Requirements:

- Strong whitespace
- Predictable spacing system
- Comfortable reading widths
- Clear hierarchy
- Responsive grid
- Minimal visual noise
- Reusable page templates

Desktop and laptop composition must distinguish between the institutional
canvas and the reading measure. Introductions may be centered; long-form prose
and card body text remain left-aligned. Reusable layout patterns should support
centered introductions, balanced two- and three-column regions, wide feature
sections, and full-width cards without arbitrary offsets.

---

## 12. Component Requirements

The initial component library should include:

- Site header
- Desktop navigation
- Mobile navigation
- Site footer
- Container
- Section
- Stack
- Grid
- Heading
- Text
- Link
- Button
- Tag
- Status badge
- Metadata row
- Content card
- Research card
- Project card
- Lab card
- Person card
- Quote
- Callout
- Code block
- Figure
- Table
- Footnote
- Citation
- Breadcrumbs
- Pagination
- Filter controls
- Search input, only after search is approved
- Empty state
- Error state
- Newsletter or update form, only if later approved

Components must be reused rather than recreated page by page.

---

## 13. Search & Discovery

Search is deferred until content volume demonstrates a clear discovery
need. Phase 9 covers Research, Projects, and Labs. If a future review approves
search, it should support:

- Titles
- Summaries
- Authors
- Contributors
- Topics
- Tags
- Full text where practical
- Collection type

Filters should use shareable URLs.

Example:

```text
/research?topic=cloud-security&year=2027
```

Topic navigation, archives, and any initial filtering must remain usable
without JavaScript when reasonably possible.

---

## 14. SEO and Metadata

Every public page must include:

- Unique page title
- Meta description
- Canonical URL
- Open Graph metadata
- Social preview image
- Structured data when appropriate
- Sitemap inclusion
- Robots directives

Recommended structured data:

- Organization
- Person
- Article
- ScholarlyArticle
- TechArticle
- SoftwareSourceCode
- Event
- BreadcrumbList

Research pages should expose citation-friendly metadata.

---

## 15. Accessibility

The site must target WCAG 2.2 AA.

Requirements include:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Skip links
- Proper heading order
- Sufficient contrast
- Reduced-motion support
- Accessible mobile navigation
- Form labels and errors
- Alt text for meaningful images
- Captions or transcripts for media
- Accessible tables
- No essential meaning conveyed by color alone

Accessibility must be tested during each implementation phase rather than deferred until launch.

---

## 16. Performance

Performance goals:

- Fast static delivery where possible
- Minimal client-side JavaScript
- Optimized fonts
- Optimized images
- Lazy loading for non-critical media
- Stable layout
- Responsive image sizing
- Efficient caching

Target Lighthouse scores for production pages:

- Performance: 90 or higher
- Accessibility: 95 or higher
- Best Practices: 95 or higher
- SEO: 95 or higher

Core Web Vitals should pass on representative mobile and desktop pages.

---

## 17. Security and Privacy

The site should minimize collected data.

Requirements:

- HTTPS only
- Secure headers
- Content Security Policy
- No unnecessary trackers
- No third-party scripts without review
- Dependency scanning
- Secret scanning
- Dependency lockfiles
- Automated update process
- Input validation for all forms
- Spam protection that respects privacy
- Minimal logging of personal data
- Published privacy notice
- Published responsible disclosure process

Analytics, if used, should be privacy-conscious and should not compromise site performance.

---

## 18. Responsible Disclosure Page

The site should include a dedicated disclosure page.

The responsible disclosure and security reporting address is
`security@astoncyber.com`. It must not be used as the general-inquiries
address.

Required content:

- Contact method: `security@astoncyber.com`
- Request for clear reproduction details
- Request to avoid accessing, modifying, retaining, or disclosing data beyond
  what is necessary to demonstrate an issue
- A statement that receipt will be acknowledged when operationally possible
- A statement that no response or remediation deadline is guaranteed
- A statement that the page grants no testing authorization
- A statement that no safe-harbor commitment is made
- A statement that legal rights are not waived
- Direction to obtain authorization before testing systems the researcher does
  not own

This page must be reviewed before launch.

Do not invent a guaranteed response or remediation timeline, eligible or
out-of-scope system lists, a bounty, a credit policy, coordinated-disclosure
deadlines, permission to test third-party systems, or safe-harbor terms.

Before public launch, publish an RFC 9116 `security.txt` file at:

```text
/.well-known/security.txt
```

Its Contact field must be:

```text
Contact: mailto:security@astoncyber.com
```

The file itself must be created and reviewed during a future
implementation phase; this specification does not supply its complete
contents.

## 18.1 General Contact

The approved general contact address is `info@astoncyber.com`.
The address is reserved for general inquiries and must not be presented
as the responsible-disclosure channel.
The initial release must use direct email links and no server-backed contact
form. Adding a public form requires separate security and architectural review.

---

## 19. Funding Transparency

The site should support transparent funding disclosures.

Recommended elements:

- Funding model statement
- Sponsor or grant acknowledgments
- Editorial independence statement
- Conflict-of-interest disclosures
- Research-specific funding disclosures

Sponsors must not receive editorial control.

Sponsored research, if ever accepted, must be labeled clearly.

Payment must never guarantee publication, favorable treatment, or altered conclusions.

---

## 20. Technical Architecture

Recommended baseline:

- Next.js with TypeScript
- App Router
- Static generation where practical
- Repository-based MDX content
- Zod schema validation
- Component-driven architecture
- Automated testing
- Git-based deployment
- Preview deployments
- CI quality checks

Hosting is Azure Static Web Apps at `astoncyber.com`, deployed through
GitHub Actions. The implementation is static-first and must avoid
assumptions that require server-side infrastructure unless a future
architectural review explicitly approves them.

The implementation should avoid premature platform complexity.

A database or headless CMS should not be introduced until content volume or contributor workflow clearly requires one.

---

## 21. Repository Structure

Recommended structure:

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

Documentation should include:

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

---

## 22. Testing Requirements

Required testing categories:

- Type checking
- Linting
- Unit tests
- Component tests
- Content schema validation
- Accessibility testing
- Link checking
- Responsive testing
- Performance testing
- Security header validation
- Production build verification

Critical user flows:

- Navigate the site
- Open and read a research page
- Filter research
- Search content, only after search is approved
- View project details
- Read the Ethos
- Access disclosure information
- Use the site by keyboard
- Use the site on mobile

---

## 23. Deployment Requirements

Deployment must include:

- Production environment
- Preview environments
- Custom domain
- HTTPS
- Redirect management
- Error monitoring
- Uptime monitoring
- Build logs
- Rollback capability
- Backups for non-code content, when applicable

No production deployment should bypass automated quality checks.

---

## 24. Launch Scope

The first public release should include:

- Homepage
- Mission
- Research index
- At least one research detail template
- Projects index
- Labs
- Ethos
- About
- Contact
- Responsible disclosure
- Accessibility statement
- Privacy statement
- RSS
- Sitemap
- Search only after content volume demonstrates a clear need

The first release does not require a large content library.

A small amount of excellent content is preferable to a large amount of placeholder content.

---

## 25. Deferred Features

Do not include in the first release unless specifically approved:

- User accounts
- Comments
- Discussion forums
- Paid memberships
- Complex dashboards
- E-commerce
- Custom CMS
- Contributor portals
- Personalized recommendations
- AI chat interfaces
- Knowledge graphs
- Heavy animation systems

---

## 26. Definition of Done

The website is ready for public launch when:

- Required pages are complete.
- Content has been reviewed.
- The Ethos is published.
- The design system is implemented consistently.
- Accessibility checks pass.
- Performance targets are met or exceptions are documented.
- Security headers are configured.
- Forms are tested.
- Metadata and social previews are verified.
- Broken links are resolved.
- Mobile and desktop layouts are approved.
- Responsible disclosure and privacy pages are published.
- Deployment and rollback procedures are documented.
- No placeholder content remains.
