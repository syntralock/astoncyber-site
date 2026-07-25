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
- Publish research, technical writing, projects, and presentations.
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

The primary navigation must contain exactly:

- Mission
- Research
- Projects
- Writing
- Labs
- Speaking
- About

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
/writing
/writing/[slug]
/labs
/labs/[slug]
/speaking
/speaking/[slug]
/ethos
/about
/people
/people/[slug]
/topics
/topics/[slug]
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

### 8.2 Featured Research

Display one primary research item and up to three supporting items.

Each item should show:

- Title
- Short summary
- Publication date
- Topic
- Content type
- Reading time or report length
- Disclosure status when applicable

### 8.3 Research, Engineering, Security

A three-part explanatory section should describe the relationship between the three pillars.

- Research creates understanding.
- Engineering applies understanding.
- Security creates freedom.

### 8.4 Current Work

Show active projects, research programs, or lab initiatives.

Each item should indicate:

- Status
- Scope
- Lead or contributors
- Last update
- Link to project details

### 8.5 Selected Writing

Display recent technical essays, explainers, or commentary.

Writing must remain visually secondary to original research.

### 8.6 Ethos Preview

Include a short excerpt from The Aston Cyber Ethos with a link to the full document.

### 8.7 Organization Introduction

A brief section may introduce the organization and founder near the bottom of the page.

The founder must not dominate the homepage.

### 8.8 Footer

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

## 9.2 Research Index

Required features:

- Featured research
- Chronological archive
- Filters by topic
- Filters by format
- Filters by year
- Search
- Clear distinction between completed, active, and archived work

Each card must show:

- Title
- Summary
- Date
- Authors
- Topic
- Format
- Status

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

## 9.4 Projects Index

Projects may include:

- Open-source tools
- Prototypes
- Reference architectures
- Datasets
- Educational resources
- Experiments

Each project card should show:

- Name
- Purpose
- Status
- Repository
- License
- Last update
- Maintainers

## 9.5 Project Detail Page

Required fields:

- Project overview
- Problem statement
- Current status
- Architecture or approach
- Repository link
- Documentation
- License
- Contributors
- Roadmap
- Known limitations
- Related research

## 9.6 Writing Index

Writing includes:

- Technical essays
- Explanations
- Commentary
- Field notes
- Reviews of methods or ideas
- Educational material

Writing must not be used as disguised product marketing.

Required filters:

- Topic
- Type
- Year
- Author

## 9.7 Writing Detail Page

Required fields:

- Title
- Summary
- Author
- Publication date
- Revision date
- Reading time
- Topic tags
- Main content
- Sources and references
- Related research
- Correction history, when applicable

## 9.8 Labs Page

Aston Cyber Labs represents active experimentation and emerging work.

The page should contain:

- Purpose of Labs
- Active programs
- Experiments
- Prototypes
- Calls for collaboration
- Status labels
- Links to related research and projects

Labs content must clearly indicate when findings are preliminary.

## 9.9 Speaking Page

Required content:

- Upcoming appearances
- Past talks
- Presentation titles
- Event names
- Dates
- Speakers
- Slides or recordings when available
- Contact process for invitations

## 9.10 Ethos Page

This page should publish The Aston Cyber Ethos with minimal interruption.

Requirements:

- Strong typography
- Comfortable reading width
- No marketing banners
- No product calls to action
- Optional print view
- Optional downloadable Markdown or PDF
- Revision history

## 9.11 About Page

The About page should introduce Aston Cyber as an institution before introducing individuals.

Required order:

1. Organization overview
2. Mission
3. Operating principles
4. Leadership
5. Contributors
6. Contact
7. Funding or sponsorship disclosure

## 9.12 People Pages

Each profile may include:

- Name
- Role
- Short biography
- Areas of expertise
- Research
- Projects
- Writing
- Speaking
- Professional links
- Disclosure of relevant affiliations

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
  writing/
  labs/
  speaking/
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
draft:
seo_title:
seo_description:
```

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
project_status:
repository:
documentation:
license:
maintainers:
related_research:
```

### 10.4 Speaking Metadata

```yaml
event:
location:
event_date:
speaker:
slides:
recording:
```

---

## 11. Design Requirements

The website must follow the approved Aston Cyber design system.

### 11.1 Typography

- Display: Sora
- Body: Inter
- Technical: JetBrains Mono

The implementation must use defined typography tokens rather than arbitrary font sizes.

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
- Writing card
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

## 13. Search and Discovery

Search is deferred until content volume demonstrates a clear discovery
need. If a future review approves search, it should support:

- Titles
- Summaries
- Authors
- Contributors
- Topics
- Tags
- Full text where practical

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

- Scope
- Contact method: `security@astoncyber.com`
- Expected response timeline
- Safe-harbor language only after legal review
- Encryption key, if used
- Rules for testing
- Disclosure coordination process
- Credit policy
- Out-of-scope systems

This page must be reviewed before launch.

Do not invent legal safe-harbor language.

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
The initial release should use a direct email link rather than a
server-backed contact form. Adding a public form requires security and
architectural review.

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
- Writing index
- Labs
- Speaking
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
