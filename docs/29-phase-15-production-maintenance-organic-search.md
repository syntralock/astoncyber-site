# Aston Cyber
# Phase 15: Production Maintenance, Organic Search, and Commercial Readiness

## Status

Governing implementation plan approved by the owner on 2026-10-16. The Phase 15
identifier and four-workstream architecture are approved. Implementation unit
B1, the Systems Modernization Assessment content brief, is accepted. B2, the
customer-facing Assessment page, is completed and accepted following successful
final verification. No production publication has occurred. Subsequent
implementation units require separate authorization.

Current authorization permits the controlled local B1/B2 commit. It does not
authorize a dependency change, external configuration, push, pull request,
deployment, or production publication.

## 1. Executive Summary

Aston Cyber has a mature static website foundation. The next post-launch
initiative should make that foundation operationally supportable, discoverable
for relevant business problems, and commercially understandable without
changing the approved architecture or inventing evidence.

The initiative has three outcomes:

1. **Operational reliability:** measurable availability, transport security,
   performance, maintainability, and clear operational ownership.
2. **Organic discoverability:** verified crawler access, search-property
   ownership, technically sound search signals, and useful content aligned with
   real customer questions.
3. **Commercial credibility:** clear engagement descriptions, representative
   deliverables, evidence boundaries, and accurate explanations of the problems
   Aston Cyber can address.

Commercial clarity precedes broad content expansion. Technical SEO supports
useful content; it does not replace it. Regional discovery begins with one
substantive North Alabama page and does not geographically limit remote work.

## 2. Current Verified Repository State

### 2.1 Facts confirmed by direct inspection

- The application uses the Next.js App Router, strict TypeScript, React, and
  `output: "export"` with trailing-slash URLs.
- Content is repository-managed and validated. Research, Projects, and Labs
  have separate typed publication models; only approved public content enters
  publication surfaces.
- The public service architecture contains exactly three services: Systems
  Modernization, Automation & Applied AI, and Cybersecurity & Technology Risk.
- Shared metadata creates titles, descriptions, apex canonical URLs, Open Graph
  data, Twitter/X data, and research citation metadata.
- The root layout emits Organization and WebSite structured data. Research
  details emit TechArticle structured data, and visible breadcrumbs emit
  BreadcrumbList data.
- `robots.txt` permits crawling and references the canonical sitemap.
- The sitemap includes institutional pages, the three service pages, and public
  research. Research entries use meaningful publication or update dates.
  Institutional and service entries currently have no `lastModified` value.
- Azure Static Web Apps configuration contains approved legacy redirects,
  security headers, and immutable caching for hashed Next.js assets. Automated
  tests reject normalized duplicate routes and verify required redirects.
- CI performs frozen-lockfile installation and the repository validation suite.
  Separate jobs perform dependency review and secret scanning. CodeQL and the
  Azure static-export workflow are also present.
- GitHub Actions are immutably pinned by commit SHA with readable version
  comments.
- Dependabot is configured weekly for npm and GitHub Actions updates.
- Node.js 24 and pnpm 11 are the repository requirements.
- The repository intentionally has no CMS, production database, analytics,
  tracking scripts, runtime API, authentication, or internal site search.

### 2.2 Approved architectural authority

Architecture Decisions 21 through 24 are the current authority for metadata,
indexing readiness, search deferment, Systems Modernization positioning,
services, routes, security remediation, and image delivery. They supersede only
the conflicting portions of earlier institutional positioning and route plans.
Historical documents remain evidence of the decisions in force when written.

The following constraints remain authoritative unless separately changed:

- static Next.js export;
- Azure Static Web Apps deployment with existing Cloudflare principles;
- repository-managed, typed content;
- apex canonical URLs and trailing-slash conventions;
- the current service and navigation architecture;
- WCAG 2.2 AA intent and project design tokens;
- existing security headers and validation controls;
- strict TypeScript, frozen lockfiles, and repository quality gates; and
- no analytics, CMS, database, hosted search, or unnecessary client runtime.

### 2.3 Reported findings not independently verified in this planning task

The October 16 assessment and owner instructions report the following. They
must be verified from authoritative external systems during an authorized
implementation unit:

- the Systems Modernization release is deployed to production;
- GitHub issue #17 tracks a third-party GitHub Actions Node.js runtime warning;
- a Dependabot `next` lockfile refresh failed with `unknown_error`;
- prior production checks passed for public HTTPS, canonical-host routing,
  primary routes, redirects, security headers, robots, sitemap, metadata,
  approved imagery, mobile navigation, and console errors; and
- the prior production dependency audit and required CI checks passed.

Repository inspection cannot establish current GitHub issue state, workflow
logs, Cloudflare or Azure configuration, origin certificate health, search
property ownership, search-engine index decisions, uptime, or real-user
performance.

## 3. Assessment Corrections and Limitations

1. The earlier proposed Phase 11 designation conflicts with the approved
   roadmap. It is not used as the current identifier.
2. A static export and automated SEO tests establish technical readiness, not
   Google or Bing indexing, ranking, selected canonicals, or search demand.
3. No Lighthouse or Core Web Vitals result is treated as established. A prior
   PageSpeed Insights API attempt reportedly encountered external quota limits.
4. Search-result observations support qualitative competitive hypotheses only.
   They do not establish keyword volume, rank, traffic, conversion, or market
   size.
5. Public Cloudflare TLS validation does not establish Cloudflare-to-Azure
   origin TLS health when proxying is enabled.
6. Search Console impressions and clicks are visibility measures, not leads or
   conversions.
7. Service structured data may improve machine understanding but is neither a
   guaranteed ranking improvement nor a promised rich-result feature.
8. Earlier launch records contain point-in-time statuses. They remain
   historical and must not be silently rewritten as current external facts.

## 4. Strategic Objectives

### 4.1 Operational reliability

Maintain a secure, available, measurable, and supportable production site with
independent monitoring, repeatable performance baselines, dependency hygiene,
and explicit operational ownership.

### 4.2 Organic discoverability

Make canonical public pages discoverable for searches about modernization,
integration, automation, applied AI, legacy systems, cloud modernization, and
cybersecurity risk. Use accurate technical signals and substantive content,
without doorway pages or unsupported search claims.

### 4.3 Commercial credibility

Explain the problems Aston Cyber addresses, how work is evaluated and delivered,
the inputs and boundaries of an engagement, the artifacts a customer may
receive, the evidence supporting capabilities, and the prerequisites or limits
that affect suitability.

## 5. Phase Identifier Resolution

### Conflict

The historical roadmap reserves:

- Phase 11 for Security, Privacy, and Operational Validation;
- Phase 12 for Accessibility, Performance, and Quality Assurance;
- Phase 13 for Deployment and Launch; and
- Phase 14 for Post-Launch Stabilization.

Reusing Phase 11 would obscure historical traceability and make existing
references ambiguous.

### Approved resolution

Use **Phase 15: Production Maintenance, Organic Search, and Commercial
Readiness** as the next distinct post-launch phase. The owner approved this
designation on 2026-10-16.

### Historical completion status

- Phase 11 controls are partially evidenced by repository implementation and
  historical production reports, but uptime/error monitoring and current
  external verification remain incomplete or unverified.
- Phase 12 has extensive automated and historical manual validation evidence,
  but no retained current Lighthouse/Core Web Vitals baseline was found.
- Phase 13 deployment is owner-reported complete; current production state was
  not independently verified during this documentation task.
- Phase 14 stabilization activities remain partially complete: maintenance,
  monitoring, search indexing review, and real-user performance measurement are
  continuing needs.

Affected references are this document, the proposed roadmap entry in
`07-website-project-plan.md`, and the current-planning summary in `README.md`.
Historical phase documents require no renumbering.

The identifier conflict is resolved. Historical phases retain their original
numbers and meanings.

## 6. Scope and Exclusions

### In scope for future implementation

- production monitoring and assurance;
- external search-property readiness and verification;
- repeatable performance measurement;
- GitHub Actions and Dependabot diagnosis;
- a Systems Modernization Assessment offering;
- evidence and example-deliverable strategy;
- service-page clarity and contextual internal linking;
- structured data and meaningful sitemap freshness;
- practical educational content;
- one evidence-based North Alabama service-area page; and
- manual, privacy-conscious search and commercial reporting.

### Explicitly excluded

- a CMS, production database, CRM integration, or internal search engine;
- analytics or tracking scripts;
- automated location-page generation;
- IndexNow during this phase;
- bulk directory submission, purchased reviews, manufactured backlinks, or
  artificial authority signals;
- invented prices, durations, guarantees, outcomes, addresses, offices,
  service areas, certifications, credentials, reviews, or ratings;
- unsupported government-contracting claims, including SDVOSB status, contract
  awards, vehicles, clearances, or government delivery experience; and
- changes to approved application architecture, navigation, security controls,
  deployment architecture, or design system without a separately approved ADR.

## 7. Technical Requirements

### 7.1 TLS and certificate assurance

Monitoring must distinguish two trust paths when Cloudflare proxying is active:

1. **Visitor to Cloudflare edge:** public certificate expiry, chain,
   hostname, HTTPS enforcement, HTTP redirects, apex/`www` behavior, DNS, and
   canonical-host consistency.
2. **Cloudflare to Azure origin:** Azure custom-domain/origin certificate
   expiry, chain, hostname, expected origin reachability, and configured
   encryption mode. Origin health must be verified through an authorized method
   that does not bypass security policy or expose credentials.

Public edge success must never be reported as proof of origin-certificate
health. Certificate alerts should begin at owner-approved thresholds; the
recommended default is 30, 14, and 7 days before expiry.

### 7.2 Independent availability monitoring

Required checks:

- homepage;
- Services landing page;
- all three service pages;
- Contact;
- `robots.txt`;
- `sitemap.xml`;
- `/.well-known/security.txt`; and
- at least one no-slash and trailing-slash representative from each legacy
  redirect destination family.

Recommended default acceptance criteria, pending owner approval:

- canonical HTML and text resources return HTTP 200;
- redirects return the configured permanent status and exact canonical
  destination without loops;
- responses contain a stable expected marker appropriate to the resource;
- TLS chain and hostname validation succeed;
- required security headers match repository policy on applicable responses;
- measured response time remains below 3 seconds at the monitoring location for
  95 percent of checks over a rolling 24-hour window; and
- alert only after three consecutive failures from one location, or two
  corroborating locations, with a recovery notification after two successes.

The provider, check interval, locations, response-time target, escalation path,
maintenance windows, and recipients require owner approval.

### 7.3 Lighthouse and Core Web Vitals

The website specification retains Lighthouse targets of 90 Performance and 95
for Accessibility, Best Practices, and SEO. Treat these as release objectives,
not guarantees from a single run.

Baseline procedure:

1. Use a pinned Lighthouse/Lighthouse CI version and recorded environment.
2. Test the homepage, Services, each service page, Approach, About, Contact,
   Research index, and one representative research detail.
3. Run mobile and desktop profiles at least three times per page.
4. Store the median result and relevant diagnostics as the baseline artifact.
5. Compare future changes under equivalent conditions.
6. Report lab data separately from Search Console or CrUX field data.

Recommended regression criteria, pending baseline collection and owner
approval:

- no category falls below an established repository target;
- no median category score regresses by more than five points from its accepted
  baseline without documented review;
- no new critical accessibility, SEO, or best-practice audit appears; and
- performance diagnostics receive review when LCP, blocking time, or CLS
  materially worsens even if the aggregate score remains above threshold.

At implementation time, verify Google's then-current field thresholds. The
current planning reference is good 75th-percentile LCP at or below 2.5 seconds,
INP at or below 200 milliseconds, and CLS at or below 0.1. Insufficient field
data must be reported as insufficient, not as a pass or failure.

### 7.4 GitHub Actions and Dependabot

- Preserve immutable SHA pinning and least-privilege permissions.
- Confirm the reported issue #17 and identify each action's actual JavaScript
  runtime from its authoritative release metadata before recommending an
  upgrade.
- Prefer an upstream supported release. Do not fork, replace, or weaken a
  security control merely to suppress a warning.
- Retrieve the exact Dependabot job log and reproduce the requested update with
  the repository's Node 24, pnpm 11, package-manager declaration, and lockfile.
- Determine whether the failure is dependency resolution, lockfile consistency,
  package-manager support, registry access, or a GitHub updater limitation.
- Retain frozen-lockfile validation and the production dependency audit.
- If an external updater limitation is confirmed, document a time-bounded
  manual refresh procedure rather than loosening the lockfile policy.

### 7.5 Technical SEO

- Verify a Google Search Console Domain property, preferably through DNS under
  explicit owner administration.
- Verify Bing Webmaster Tools, either independently or through an approved
  Search Console import.
- Submit and validate the canonical sitemap in both services.
- Use external URL inspection to compare declared and search-selected
  canonicals and to diagnose indexing exclusions.
- Continue local tests for canonical URLs, robots directives, sitemap content,
  metadata, JSON-LD parsing, redirect uniqueness, and internal links.
- Do not describe local test success as proof of indexing or ranking.
- Add meaningful `lastModified` values only when backed by content-specific
  change data. A deployment timestamp is not a content modification date.
- Add accurate Service structured data only to published service pages, using
  the Organization as provider where appropriate.
- Validate structured data syntactically and against published claims. Do not
  promise a ranking or rich-result effect.
- Add contextual links among services, the Assessment offering, relevant
  research, educational content, evidence, and the regional page.
- Add production SEO smoke tests for response status, canonical, indexability,
  metadata, structured data, sitemap, and robots behavior.
- Defer IndexNow until publishing frequency creates a demonstrated operational
  need and its key management receives separate approval.

## 8. Commercial Content Requirements

### 8.1 First deliverable: Systems Modernization Assessment

The first commercial content implementation unit should define a bounded
assessment offering before broader SEO content work.

Required content:

- intended customer profile and disqualifying conditions;
- operational problems the assessment is designed to address;
- customer inputs and access prerequisites;
- scope, boundaries, assumptions, and exclusions;
- Understand and Evaluate methodology aligned with the approved approach;
- systems, applications, dependencies, data flows, and ownership inventory;
- operational, integration, maintainability, and cybersecurity risks;
- prioritized recommendations and decision rationale;
- a sequenced modernization roadmap;
- representative deliverables, such as a current-state map, risk register,
  dependency inventory, decision brief, and roadmap;
- duration only if the owner can support a truthful range; and
- optional implementation or advisory paths without implying managed services.

Owner confirmation is required for scope, packaging, pricing approach, duration,
delivery capacity, prerequisites, and publishable sample artifacts. The page
must not invent any of these.

### 8.2 Supporting educational content

Prioritize these problem-oriented pieces:

1. IT modernization versus managed IT versus digital transformation.
2. Modernizing legacy systems without wholesale replacement.
3. When business-process automation is appropriate—and when it is not.
4. Applied AI readiness for security-conscious organizations.
5. Connecting disconnected applications and reporting workflows.
6. Security and operational risk during systems modernization.

Each piece must define the business problem, relevant technical conditions,
decision tradeoffs, risks, practical outcomes, and next decision. Avoid generic
thought leadership, keyword repetition, unsupported urgency, and duplicated
service-page copy.

### 8.3 Evidence model

Every evidence item must be labeled as one of:

- a verified Aston Cyber client engagement with publication authorization;
- an independently developed Aston Cyber engineering project;
- an illustrative sample assessment or architecture deliverable; or
- substantiated professional experience acquired outside Aston Cyber.

Previous-employer work must not be represented as an Aston Cyber engagement.
Confidential customer or employer information must not be disclosed. If a
verified commercial case study is unavailable, publish an accurately labeled
technical demonstration or example deliverable instead of a fabricated success
story.

### 8.4 Federal and prime-contractor readiness

Treat government contracting as a separate business-development opportunity.
The content architecture may later support a factual capabilities surface, but
publication requires verified organizational data and owner approval. Do not
claim an SDVOSB certification, award, contract vehicle, clearance, government
delivery history, or prime relationship until independently supportable.

## 9. Regional Strategy

North Alabama is the proposed primary regional focus, not a limit on delivery.
Aston Cyber may describe remote availability outside the region only to the
extent supported by actual capacity.

The first regional deliverable is one substantive North Alabama service-area
page. It should explain:

- customer problems relevant to the region;
- the three published services and the Assessment entry point;
- actual remote and, if approved, on-site delivery capabilities;
- relevant industries using careful, non-client-specific language;
- evidence or examples that are truthful and appropriately labeled; and
- the geographic relationship between North Alabama, Huntsville and Madison,
  and The Shoals without implying offices or clients.

Possible later pages are Huntsville and Madison, The Shoals, Birmingham and
Hoover, and Tuscaloosa and West Alabama. Each requires distinct customer needs,
delivery relevance, local context, and evidence. Near-duplicate doorway pages,
automated page generation, invented offices, invented relationships, and
unsupported on-site claims are prohibited.

## 10. Measurement Requirements

### 10.1 Search visibility

Report monthly, subject to available data:

- indexed canonical pages and coverage changes;
- declared versus search-selected canonical issues;
- non-branded impressions and clicks;
- branded versus non-branded discovery;
- query themes by service;
- regional query themes;
- landing-page impressions, clicks, click-through rate, and average position;
- crawl and indexing errors; and
- material visibility gains or losses with annotations for content and release
  changes.

### 10.2 Commercial performance

Begin with a privacy-conscious manual register containing only necessary
business information:

- inquiries;
- self-reported referral source;
- qualified conversations;
- proposals; and
- signed engagements.

Search impressions and clicks are not conversions. Do not infer complete lead
attribution. Analytics scripts, a customer database, and CRM integration remain
outside this phase and require separate privacy, security, and architecture
approval.

### 10.3 External credibility

Evaluate a limited set of independently supportable credibility signals:

- legitimate business profiles for which Aston Cyber is eligible;
- consistent public name, domain, description, and contact identity;
- relevant professional publications;
- accurately described industry relationships;
- independently verifiable engineering work; and
- authoritative references to Aston Cyber.

Exclude bulk directory submissions, purchased or solicited false reviews,
manufactured backlinks, reciprocal link schemes, and unsupported credentials.

## 11. Workstream Implementation Plan

Each unit below should be implemented and reviewed independently. Workstreams
may overlap only where their dependencies and authorization permit.

### Workstream A: Production assurance

**Objective:** Establish reliable external evidence for availability, transport
security, search ownership, performance, and maintenance health.

**Scope:** TLS paths, critical-route monitoring, search-property verification,
Lighthouse/field performance, Dependabot diagnosis, and action-runtime review.

**Dependencies:** owner access to DNS, Cloudflare, Azure, GitHub security logs,
Search Console, Bing, and the selected monitoring service.

**Implementation units:**

1. A1 — External ownership and access inventory.
2. A2 — Edge and origin TLS verification specification and baseline.
3. A3 — Critical-route monitor configuration and alert runbook.
4. A4 — Repeatable Lighthouse baseline and retained report artifact.
5. A5 — Search Console and Bing verification plus sitemap submission.
6. A6 — Dependabot failure reproduction and root-cause record.
7. A7 — GitHub Actions runtime inventory and issue #17 recommendation.

**Deliverables:** ownership matrix, TLS report, monitor matrix and runbook,
Lighthouse baseline, search-property verification record, Dependabot diagnosis,
and action-runtime compatibility report.

**Validation:** independent probes, certificate and hostname checks, controlled
alert tests, repeatable Lighthouse runs, search-platform confirmation, local
frozen-lockfile reproduction, and authoritative action-release review.

**Acceptance criteria:**

- edge and origin TLS are separately evidenced;
- every required route has an approved check and expected result;
- transient-failure suppression and recovery behavior are tested;
- Lighthouse results are reproducible and field data is separately labeled;
- both search properties and sitemap-processing states are recorded, or an
  explicit access blocker is documented;
- Dependabot has an evidence-backed root cause or bounded escalation path; and
- no security control is weakened to resolve a warning.

**Owner decisions:** administrative owners, monitoring provider and recipients,
check locations/intervals, TLS and latency thresholds, and accepted Lighthouse
regression thresholds.

**Risks and mitigations:** split administrative access may block verification;
use an ownership matrix and least privilege. Synthetic noise may create alert
fatigue; use corroboration and recovery thresholds. Field data may be absent;
report it as insufficient.

**Completion:** all deliverables reviewed, credentials remain outside the
repository, and unresolved external limitations have named owners.

### Workstream B: Commercial clarity

**Objective:** Make Aston Cyber's entry engagement, delivery approach,
deliverables, evidence, and limitations understandable to a qualified buyer.

**Scope:** Assessment offering, service-page refinements, engagement
explanations, evidence taxonomy, samples, and publication sequence.

**Dependencies:** owner decisions on offering scope, capacity, pricing approach,
duration, evidence permissions, and any sample artifacts.

**Implementation units:**

1. B1 — Develop and approve the Systems Modernization Assessment content brief.
2. B2 — Publish the Assessment page and contextual service links.
3. B3 — Create one accurately labeled example deliverable.
4. B4 — Inventory and classify available evidence.
5. B5 — Refine service pages only where the Assessment reveals a clarity gap.
6. B6 — Draft a factual future government/prime readiness brief; do not publish
   unsupported qualifications.

**Deliverables:** approved offering brief, published page, sample artifact,
evidence register, targeted service refinements, and an unpublished/factual
government-readiness requirements list.

**Validation:** claim-by-claim factual review, boundary review, accessibility,
content validation, link validation, metadata review, and owner publication
approval.

**Acceptance criteria:**

- the offering states audience, problems, inputs, method, boundaries,
  deliverables, and next options;
- no unsupported price, duration, guarantee, outcome, client, employer, or
  government claim appears;
- every evidence item has a source and publication status; and
- the page provides a clear next action without implying managed services.

**Owner decisions:** offering scope and packaging, pricing approach, duration,
delivery capacity, sample deliverables, case-study permissions, and commercial
publication order.

**Risks and mitigations:** vague scope can generate poor-fit inquiries; state
inputs and exclusions. Limited case studies can weaken proof; use labeled
examples or demonstrations rather than invented outcomes.

**Completion:** the Assessment offering and initial evidence artifact are
approved, published, linked, and validated.

### Workstream C: Technical SEO and educational content

**Objective:** Strengthen machine-readable signals and publish useful material
for real modernization decisions.

**Scope:** Service data, sitemap freshness, SEO smoke tests, internal links,
six educational topics, and monthly search reporting.

**Dependencies:** Workstream B terminology and Assessment URL; external search
access from A5; owner-approved authorship and publication schedule.

**Implementation units:**

1. C1 — Define content-specific modification-date ownership and schema.
2. C2 — Add meaningful sitemap dates with regression tests.
3. C3 — Add factual Service structured data and validation tests.
4. C4 — Add production SEO smoke-test specification and implementation.
5. C5 — Add Assessment/service/research contextual-link improvements.
6. C6–C11 — Draft, review, and publish each educational article separately.
7. C12 — Establish the monthly search-visibility report template.

**Deliverables:** date policy, sitemap enhancement, Service JSON-LD, automated
smoke tests, link map, six reviewed articles, and reporting template.

**Validation:** schema parsing and claim comparison, generated sitemap review,
canonical/indexability tests, internal-link scan, content review, accessibility,
production smoke test, and external URL inspection after publication.

**Acceptance criteria:**

- timestamps change only for meaningful page-content changes;
- structured data exactly matches visible services;
- automated tests distinguish repository output from external index state;
- every article addresses a distinct problem and links to the most relevant
  service or Assessment page; and
- reporting separates visibility, field performance, and commercial outcomes.

**Owner decisions:** content authorship, review owner, publishing cadence, and
whether each draft is sufficiently substantiated to publish.

**Risks and mitigations:** content may become generic or duplicative; require a
distinct decision question and outline before drafting. Schema may overstate
claims; derive it from approved visible content.

**Completion:** each independently approved unit passes repository and
production validation; no batch publication is required.

### Workstream D: Regional discovery

**Objective:** Establish accurate North Alabama relevance without limiting
remote work or creating doorway pages.

**Scope:** one North Alabama page, regional evidence requirements, and a later
go/no-go evaluation for additional regions.

**Dependencies:** verified service coverage, remote/on-site policy, Assessment
offering, and substantiated regional context or evidence.

**Implementation units:**

1. D1 — Approve geographic coverage and delivery-mode statements.
2. D2 — Create the North Alabama page brief and evidence checklist.
3. D3 — Publish and link one North Alabama page.
4. D4 — Review search and inquiry evidence after an owner-approved observation
   period.
5. D5 — Decide separately whether any additional regional page is justified.

**Deliverables:** coverage statement, content brief, page, internal links,
regional reporting view, and expansion decision memo.

**Validation:** factual local-context review, duplication review, visible and
structured claim consistency, sitemap/link validation, and external indexing
inspection after publication.

**Acceptance criteria:**

- the page contains distinct useful content and a clear Assessment path;
- it does not imply an office, client, onsite capability, or result that is not
  verified;
- remote availability is accurately framed;
- no additional location page is generated automatically; and
- expansion decisions use distinct value and evidence, not keyword variation.

**Owner decisions:** service coverage, onsite availability, publishable local
evidence, observation period, and any later regional expansion.

**Risks and mitigations:** thin regional copy may be unhelpful or resemble a
doorway page; require unique needs, delivery relevance, and evidence. Overly
regional positioning may narrow the market; retain accurate remote language.

**Completion:** the single North Alabama page is validated and measured before
any separate regional-page authorization.

## 12. Dependencies and Sequencing

Recommended sequence:

1. Approve the phase identifier and only the owner decisions blocking A1 and
   B1.
2. Run A1, A2, and A6 as separate evidence-gathering units.
3. Approve the B1 brief, then separately authorize and publish B2 before broad
   educational or regional expansion.
4. Run A3–A5 and A7 independently as access permits.
5. Implement B3–B5 in small content units.
6. Implement C1–C5 as separate technical changes.
7. Publish C6–C11 one article at a time.
8. Execute D1–D3 only after coverage claims and the Assessment offering are
   approved.
9. Begin monthly visibility and manual commercial reporting.
10. Evaluate D4–D5 after sufficient evidence exists; do not set an arbitrary
    traffic or time threshold in advance.

Operational evidence and the Assessment brief can proceed in parallel.
Infrastructure, commercial content, SEO mechanics, and regional pages should
not be combined into one implementation pull request.

## 13. Risks and Mitigations

| Risk | Mitigation |
| --- | --- |
| Historical phase ambiguity | Use approved Phase 15 and preserve Phases 11–14. |
| External state mistaken for repository fact | Record source, date, owner, and verification method. |
| Technical SEO displaces useful content | Publish the Assessment offering before broad SEO expansion. |
| Thin or repetitive regional pages | Start with one substantive page and require distinct evidence. |
| Unsupported commercial proof | Use the evidence taxonomy and explicit publication authorization. |
| Previous-employer work is misattributed | Label professional experience separately and remove confidential detail. |
| Edge TLS masks origin failure | Monitor Cloudflare edge and Azure origin trust paths separately. |
| Synthetic monitoring creates noise | Use consecutive-failure or multi-location confirmation. |
| Lighthouse variability drives false regressions | Pin tooling, repeat runs, use medians, and compare with the accepted baseline. |
| Missing CrUX data is interpreted as success | Report insufficient data explicitly. |
| Dependency warning prompts weaker controls | Preserve lockfile, audit, SHA pinning, and least privilege while diagnosing. |
| Search metrics are called conversions | Maintain separate visibility and manual commercial reports. |
| Government opportunity becomes an unsupported claim | Require independent verification and owner approval before publication. |

## 14. Initiative Acceptance Criteria

The proposed phase is complete only when:

- operational ownership and critical-route monitoring are active and tested;
- Cloudflare edge and Azure origin TLS health are separately verified;
- repeatable Lighthouse baselines and any available field data are recorded;
- the Dependabot failure and action-runtime warnings have evidence-backed
  dispositions without weakened controls;
- Google Search Console and Bing ownership and sitemap state are verified, or a
  named external blocker is accepted by the owner;
- the Systems Modernization Assessment offering is accurate, bounded,
  published, and linked;
- at least one substantiated evidence artifact is published or an owner-approved
  evidence limitation is documented;
- technical SEO enhancements reflect visible content and pass local and
  production validation;
- educational content is useful, distinct, reviewed, and free of unsupported
  claims;
- one substantive North Alabama page is published only after coverage approval;
- monthly search visibility and manual commercial reporting have owners;
- all applicable repository quality gates pass for each implementation unit;
  and
- every remaining limitation is documented without being represented as
  completed work.

## 15. Owner Decision Register

Only decisions marked **Blocking next unit** prevent the recommended first
implementation work.

| Decision | State | Recommended default | Blocking next unit |
| --- | --- | --- | --- |
| Strategic outcomes: reliability, discovery, credibility | Approved 2026-10-16 | Preserve all three with commercial clarity ahead of broad SEO content | No |
| Final phase identifier | Approved 2026-10-16 | Phase 15 | No |
| Four-workstream architecture | Approved 2026-10-16 | Workstreams A–D govern implementation | No |
| B1 content brief | Accepted 2026-10-16 | Document 30 governs offering scope | No |
| B2 customer-facing page | Completed and accepted 2026-10-16 following final verification | Controlled local commit authorized; production publication remains separate | No |
| Geographic service coverage | Awaiting owner approval | North Alabama primary; appropriate remote work not geographically limited | No—blocks D1 |
| On-site versus remote delivery | Awaiting owner approval | Publish only confirmed remote capability until onsite scope is approved | No—blocks D1 |
| Case-study publication | Awaiting owner approval per item | Require substantiation and written publication authorization | No—blocks individual evidence items |
| Public identity/address information | Awaiting owner approval | Publish no new address, office, phone, certification, or profile claim | No |
| External-service administration | Awaiting owner approval | Name least-privilege owner and backup for each service | Yes—blocks A1 completion |
| Monitoring provider and recipients | Awaiting owner approval | Evaluate providers against required checks and privacy; do not configure yet | No—blocks A3 |
| Performance thresholds | Awaiting owner approval after baseline | Retain repository scores; use median and baseline-relative five-point review threshold | No—blocks A4 acceptance |
| Availability thresholds | Awaiting owner approval | 95% under 3 seconds per rolling day; corroborated failure alerting | No—blocks A3 acceptance |
| Future analytics | Deferred and excluded | Continue Search Console/Bing plus manual commercial reporting | No |
| IndexNow | Deferred and excluded | Reconsider only with higher publication frequency | No |
| Additional regional pages | Deferred | Decide individually after North Alabama evidence | No |
| Commercial publication sequence | Assessment-first direction approved through B2; later sequence remains separately controlled | Assessment, evidence/sample, service refinements, educational articles, regional page | No |
| Assessment scope and deliverables | Approved for B1/B2 on 2026-10-16 | Document 30 and the recorded B2 publication decisions govern | No |
| Assessment pricing approach | Awaiting owner approval | Publish no price until supported | No—unless owner requires price on B2 |
| Assessment duration | Awaiting owner approval | Publish no duration until delivery capacity supports a truthful range | No |
| Federal/prime-facing claims | Deferred pending verified qualifications | Maintain unpublished requirements inventory only | No |

## 16. Deferred Opportunities

- privacy-reviewed analytics or conversion tracking;
- CRM or automated lead attribution;
- IndexNow;
- additional regional landing pages;
- public government capabilities content;
- richer client case studies;
- an internal site-search experience under Decision 22;
- a CMS or database; and
- any runtime personalization or marketing automation.

Each remains separately reviewable and is not implied by approval of this plan.

## 17. Implementation Authorization Boundary

The owner approved this roadmap and sequencing model on 2026-10-16. B1 is
accepted, and B2 is completed and accepted following successful final
verification. No production publication has occurred. Each later implementation
unit still requires separate authorization, factual inputs, owner decisions,
validation, and review.

The current authorization permits only the controlled local B1/B2 commit. It
does not permit dependency installation or updates, workflow changes, external
configuration, monitoring setup, search-property changes, production
publication, issue changes, pushes, pull requests, releases, or deployment.
