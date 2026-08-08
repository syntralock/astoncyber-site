# 23 – Strategic Remediation and Implementation Plan

## Status

Approved by the owner on 2026-08-07 as the canonical Aston Cyber remediation
and implementation roadmap. Approval of this document does not authorize
implementation. Each implementation phase still requires explicit owner
authorization before code, content, route, navigation, metadata,
infrastructure, DNS, or deployment changes begin.

This document consolidates the four approved Aston Cyber review reports:

1. positioning, trust, and buyer journey;
2. UX, visual design, accessibility, and usability;
3. engineering, architecture, performance, SEO, and production readiness; and
4. strategic synthesis and launch direction.

This document governs the transition from a research-focused website to a
founder-led cybersecurity engineering and research firm. Where it conflicts
with earlier future-phase sequencing, this document governs remediation work.
Earlier documents remain historical records unless separately updated. Phase 9
Search & Discovery remains paused until the content library or a measured
discovery need justifies it.

This is a planning document. It does not change application code, routes,
content, navigation, infrastructure, DNS, or deployment state.

## 1. Executive Summary

Aston Cyber will evolve into an independent, founder-led cybersecurity
engineering and research firm. The organization will initially serve registered
investment advisers, wealth-management firms, and selected financial-services
organizations that need carefully scoped help with identity, cloud, platform,
architecture, security automation, control evidence, and high-risk workflows.

Aston Cyber will not launch as a broad cybersecurity consultancy, MSSP, MDR
provider, vCISO practice, compliance auditor, penetration-testing firm, or
software vendor. Its differentiation will be direct founder accountability,
vendor-independent judgment, bounded engineering outcomes, explicit
limitations, and research that demonstrates method without becoming marketing
content.

The intended primary navigation is:

1. Home
2. Offerings
3. Research
4. About

Contact should remain a visible action and footer destination. Projects and
Labs remain repository capabilities but must not be primary navigation
destinations while empty. People must not remain a public empty destination.
Mission content should be consolidated into the homepage and About; Ethos
should remain a secondary statement of principles.

The current design system, static-export architecture, safe content pipeline,
strict TypeScript, and CI foundation should be retained. The transition does
not require a redesign, CMS, database, client portal, analytics platform,
service worker, or new application framework.

Public launch remains blocked by organizational, SEO, accessibility, and
production-hardening work. On 2026-08-07 the owner confirmed that apex TLS is
working, Azure Static Web Apps serves both approved hostnames, Cloudflare DNS
routes both hosts to Azure, and Cloudflare permanently redirects `www` to the
approved apex origin while preserving query strings. Sitemap and RSS generation
already use that apex origin. Pages intentionally continue to emit `noindex,
nofollow`; `robots.txt` and RFC 9116 `security.txt` remain later-phase work.
The repository now maps Azure missing-route responses to the exported Aston
Cyber 404 document, subject to verification after an authorized deployment.

## 2. Strategic Direction

### 2.1 What Aston Cyber should become

Aston Cyber should be known for turning ambiguous, consequential security
problems into:

- clear technical decisions;
- defensible security architecture;
- engineered controls;
- reliable automation and evidence;
- explicit ownership and operating considerations; and
- honest findings whose confidence does not exceed the evidence.

The recommended positioning statement is:

> Aston Cyber is an independent cybersecurity engineering and research firm.

The recommended supporting idea is:

> Aston Cyber helps regulated and consequential organizations make sound
> security decisions, strengthen critical identity and cloud systems, and
> design controls that can be understood, operated, and evidenced.

### 2.2 Approved organizational identity

The approved identity is **an independent, founder-led cybersecurity
engineering and research firm**.

The following formulations are not approved as the primary identity:

- research institution, because it no longer describes the complete operating
  model;
- consultancy, because it implies a broader advisory model and delivery scale;
- cybersecurity company or cybersecurity firm without qualification, because
  either is too generic;
- software company, because Aston Cyber has no commercial software product;
- MSSP, MDR provider, vCISO firm, assessment firm, or compliance firm.

### 2.3 Legal and operating status

Aston Cyber is not yet formally incorporated or organized as a separate legal
entity. Before accepting commercial engagements, the founder must complete
appropriate business formation, contracting, insurance, and operating
formalities.

The public site must not imply that a formed legal entity already exists. It
must not invent an entity name, jurisdiction, address, insurance status,
registration number, or other business detail.

### 2.4 Meaning of independence

At launch, independence must mean:

- no vendor funding;
- no vendor resale commissions or recommendation quotas;
- no implementation commissions;
- no paid referral compensation;
- no sponsored research at launch;
- no predetermined research conclusions;
- disclosed funding, sponsorship, and material conflicts;
- the ability to conclude that a product or project is unnecessary;
- clear separation between evidence, professional judgment, and assumptions;
- no publication of client experience without authorization;
- identification of client-sponsored or externally sponsored research if a
  later approved policy permits it; and
- editorial freedom to publish negative, limited, or inconclusive findings.

Independence does not mean isolation from commercial work. It means commercial
incentives do not control technical conclusions.

Aston Cyber is currently founder-funded. Future ordinary client revenue must
remain clearly distinguishable from research sponsorship or external funding.

## 3. Approved Target Audiences

### 3.1 Primary audience

Registered investment advisers, wealth-management firms, and adjacent
financial-advisory organizations are the primary launch audience.

This audience best matches the visible founder experience, the existing
transaction-authorization research, the Microsoft-centered engineering
capabilities, and the founder-led delivery model.

### 3.2 Secondary audience

The secondary audience is selected regional financial institutions, investment
firms, and other financial-services organizations with well-bounded identity,
cloud, data, authorization, automation, or security-architecture problems.

Regional banks should be approached selectively. Aston Cyber must not imply
readiness for institution-wide transformation, continuous operations, or large
multi-workstream delivery until references, insurance, contracting maturity,
delivery capacity, and vendor-risk materials support those expectations.

### 3.3 Referral-based audience

The organization may accept referral-based work from:

- nonprofit organizations;
- aerospace-adjacent organizations;
- CPA and tax firms; and
- other regulated or consequential organizations.

Such work must match a proven problem category. These sectors should not dilute
launch positioning.

### 3.4 Audiences not actively targeted at launch

- healthcare;
- legal firms;
- general SaaS and technology companies;
- large enterprises seeking global delivery;
- organizations seeking 24/7 security operations;
- organizations seeking broad offensive-security services;
- buyers seeking an outsourced CISO; and
- buyers seeking AI model evaluation or red-team services.

Financial services should receive the strongest launch emphasis, while the
broader formulation "regulated and consequential environments" preserves room
for credible adjacent work.

## 4. Engagement Model

### 4.1 Approved engagement types

1. **Focused assessment** — a bounded review of a specific architecture,
   platform, control area, or operational problem.
2. **Architecture and decision engagement** — a time-bounded engagement that
   resolves a consequential design or technology decision.
3. **Engineering project** — defined implementation or improvement work with a
   clear completion condition.
4. **Security automation engagement** — work that makes administration,
   validation, reporting, or evidence collection more reliable.
5. **Research and prototype engagement** — investigation or proof-of-concept
   work intended to produce learning, feasibility evidence, or decision
   support.
6. **Advisory workshop or decision memo** — bounded expert input tied to a
   specific decision rather than an open-ended vCISO relationship.

### 4.2 Founder-led delivery

The site and operating model must state that:

- Matt Aston leads or materially participates in every engagement;
- concurrent engagements are intentionally limited;
- an internal numerical limit applies to concurrent engagements, but no
  specific capacity number is published;
- preapproved specialist subcontractors may be used only when a clearly
  defined engagement requires expertise outside the founder's direct delivery
  scope;
- any subcontractor use requires appropriate confidentiality terms, security
  requirements, conflict-of-interest controls, intellectual-property terms,
  client disclosure, and continued founder accountability;
- the organization does not imply that it has employees, a standing
  subcontractor bench, or a larger hidden delivery team; and
- the organization does not accept work requiring 24/7 coverage, emergency
  incident response, guaranteed immediate replacement coverage, or continuous
  operational monitoring.

### 4.3 Out of scope at launch

- 24/7 monitoring, MSSP, MDR, or SOC services;
- managed IT;
- emergency incident response or digital forensics;
- guaranteed immediate replacement coverage;
- broad penetration testing or red teaming;
- compliance audits, certifications, or attestations;
- legal opinions;
- outsourced CISO responsibility;
- open-ended staff augmentation;
- large enterprise transformation programs;
- product resale or commission-driven selection;
- hosting client production systems;
- production financial transaction processing;
- guarantees of fraud prevention;
- AI model red teaming; and
- broad application-security programs.

## 5. Offerings Strategy

The Offerings page must be organized around client problems, engineering
outcomes, and engagement types. It must not become a generic cybersecurity
services catalogue.

### 5.1 Identity, Cloud, and Platform Security

**Client problem:** Incrementally developed identity, Microsoft cloud,
endpoint, collaboration, and data controls no longer operate as a coherent
security system.

**Engagement types:** Focused architecture review, identity or cloud control
assessment, defined engineering improvement project, or design validation.

**Expected outcomes:** Current-state findings, risk-ranked gaps, target
architecture, prioritized engineering work, selected control implementation or
validation, and explicit ownership considerations.

**Credibility basis:** Visible founder work across identity, privileged access,
Azure, Microsoft 365, endpoint security, data protection, email security, and
regulated financial services.

**Claims to avoid:** Comprehensive transformation, authority across every
vendor, enterprise-scale delivery, certification, or guaranteed prevention.

### 5.2 Security Architecture and Decision Support

**Client problem:** A consequential decision crosses identity, data,
infrastructure, operations, governance, and user experience without a clear
technical path.

**Engagement types:** Architecture sprint, design review, technology decision
assessment, trust-boundary analysis, or executive decision memo.

**Expected outcomes:** Defined problem, assumptions, options, tradeoffs, trust
boundaries, failure conditions, recommended direction, implementation
considerations, and unresolved risks.

**Credibility basis:** Visible systems-thinking, architecture, trust-boundary,
operational-ownership, and executive-communication experience.

**Claims to avoid:** Authority across every architecture domain or claims that
one review replaces implementation and operational validation.

### 5.3 Focused Security Assessments

**Client problem:** Leadership needs to know whether a specific control area is
operating as intended and what should be corrected first.

**Engagement types:** Identity-control assessment, cloud or platform review,
control-design review, high-risk workflow assessment, or focused governance
review.

**Expected outcomes:** Evidence-based findings, limitations, risk-ranked
recommendations, engineering priorities, decision-ready summary, and
traceability between evidence and conclusions.

**Credibility basis:** Founder experience and the existing evidence-led
research and engineering approach.

**Claims to avoid:** Penetration testing, regulatory audit, attestation,
comprehensive enterprise risk assessment, or legal sufficiency.

### 5.4 Security Automation and Control Evidence

**Client problem:** Important security work depends on inconsistent manual
processes, fragmented administration, or evidence that is difficult to
reproduce.

**Engagement types:** Workflow analysis, administrative automation, evidence
collection, control validation tooling, or reporting integration.

**Expected outcomes:** A repeatable workflow, documented inputs and
permissions, failure handling, maintainable artifacts, control evidence,
operational handoff, and limitations.

**Credibility basis:** Visible PowerShell, Python, API, Microsoft Graph,
administration, reporting, validation, and evidence-collection experience.

**Claims to avoid:** Security orchestration platform, managed automation,
autonomous response, or general software-product claims.

### 5.5 Secure Workflow Research and Prototyping

**Client problem:** A high-risk process or security idea needs structured
investigation before production investment.

**Engagement types:** Design-and-build prototype, feasibility study,
threat-informed workflow design, control-concept validation, or independent
technical research.

**Expected outcomes:** Research question, scope, prototype or design artifact,
assumptions, evaluation results, limitations, production-readiness
considerations, and a proceed-or-stop recommendation.

**Credibility basis:** The Secure Transaction Authorization Ledger demonstrates
research method, workflow design, explainable controls, prototyping, and
limitation-setting.

**Claims to avoid:** Proven production platform, demonstrated fraud reduction,
production engineering at scale, or general expertise in every financial
workflow.

### 5.6 AI security boundary

AI security is not a launch offering. AI-related governance or architecture may
be addressed only when it is a bounded part of another credible engagement.
Standalone AI assessment, model security, model evaluation, and AI red-team
claims remain deferred pending evidence.

## 6. Navigation and Site Architecture Strategy

### 6.1 Intended primary navigation

1. Home
2. Offerings
3. Research
4. About

Contact should be a visible header action and footer destination.

### 6.2 Page disposition

| Surface | Approved direction |
| --- | --- |
| Home | Retain and reposition around identity, audience, outcomes, evidence, and next steps |
| Offerings | Add as the primary buyer-facing page |
| Research | Retain as an independent publication and evidence surface |
| About | Retain; include founder leadership, organizational model, independence, concise mission, and funding context |
| Contact | Retain; elevate and qualify engagement inquiries |
| Mission | Consolidate essential material into Home and About; remove from prominent navigation |
| Ethos | Retain as a secondary principles page and reduce duplication elsewhere |
| Projects | Retain repository capability; hide from primary navigation and public discovery while empty |
| Labs | Retain repository capability; hide from primary navigation and public discovery while empty |
| People | Hide or remove while no approved profiles exist; present the founder on About |
| Responsible Disclosure | Retain in footer |
| Privacy | Retain in footer |
| Accessibility | Retain in footer |
| RSS | Retain as a secondary research utility |
| GitHub | Retain as a secondary technical trust link |
| Research topics | De-emphasize until publication volume makes taxonomy useful |

Route retirement, redirects, and sitemap changes require a separately reviewed
implementation phase. Approval of this plan does not itself change routes.

## 7. Buyer Journey

The intended journey is:

1. **Homepage:** Understand what Aston Cyber is, whom it serves, the problems
   it addresses, and why its approach is different.
2. **Offerings:** Determine whether a problem fits, how an engagement works,
   what the expected outcome is, and what remains out of scope.
3. **Research:** Inspect technical method, depth, limitations, and evidence.
4. **About:** Confirm founder accountability, relevant experience,
   independence, capacity, funding, and operating model.
5. **Contact:** Submit a limited initial inquiry without exposing sensitive
   information.
6. **Qualification:** Confirm organization, problem category, desired outcome,
   timing, decision authority, and delivery fit.
7. **Discovery and scope:** Define the problem and produce a bounded written
   engagement scope.

The homepage must not send both primary calls to philosophical pages. Research
must demonstrate method without becoming a sales funnel. Contact must qualify
rather than accept unspecified security requests.

## 8. Trust Model

Before asking a prospective client to begin an engagement conversation, Aston
Cyber should provide:

- named founder and direct accountability;
- relevant professional experience;
- a truthful statement that Aston Cyber is not yet a separately formed legal
  entity and that required formation, contracting, insurance, and operating
  formalities will precede commercial engagements;
- approved engagement boundaries;
- independence and conflicts policy;
- funding and sponsorship clarity;
- privacy and responsible-disclosure guidance;
- secure initial-contact guidance;
- valid TLS and one canonical host;
- professional error handling;
- appropriate security headers;
- at least one strong technical work sample;
- representative deliverable descriptions;
- explicit research limitations;
- honest organizational scale;
- collaborator and subcontractor policy; and
- vendor-risk materials proportionate to the clients pursued.

Stronger claims such as "expert," "proven," "leading," or financial-services
"specialist" require multiple completed engagements, repeatable methods,
sanitized outcomes, references or testimonials, durable engineering evidence,
multiple substantive publications, and evidence that recommendations remained
operational after delivery.

## 9. Research Strategy

Research must remain useful to non-clients and independent of sales outcomes.
It should demonstrate how Aston Cyber frames questions, evaluates evidence,
builds systems, communicates uncertainty, and records limitations.

Commercial work may identify recurring research questions, but:

- client information remains confidential;
- public use requires authorization and appropriate anonymization;
- no sponsored research is accepted at launch;
- negative and inconclusive findings remain publishable; and
- publications do not contain exaggerated commercial claims.

Any later reconsideration of sponsored research requires a separately approved
policy covering sponsorship, conflicts, editorial independence, publication
rights, disclosure, and legal review where appropriate.

The 12–24 month research direction should favor:

- flagship technical reports;
- shorter engineering notes;
- reusable control patterns;
- prototype reports with explicit maturity; and
- revisions, corrections, and follow-up evaluations.

Credible subject areas include identity reliability, privileged access,
Microsoft cloud security, data protection, authorization evidence, human
decision quality, secure workflows, security automation, control
explainability, and security decisions in regulated firms.

Research usability should eventually include executive summaries, stable web
editions, PDF publication formats, section navigation, citations, revision
history, disclosures, related work, and clear artifact maturity.

## 10. Progressive Web App Decision

Aston Cyber must not present itself as a Progressive Web App at launch.

The current implementation includes a Web App Manifest, installable icon
assets, and `display: standalone`, but it has no service worker, offline
capability, install prompt, or app-specific workflow. Installability provides
no material value to the intended buyer or research-reader journey and may
incorrectly imply a software product.

Production Hardening must remove installability signals while retaining normal
browser and platform identity assets such as favicons and the Apple Touch Icon.
No service worker removal is required because none exists.

PWA functionality is deferred until a future client portal, interactive
research tool, offline reference library, or other genuinely app-like product
creates a demonstrated need.

## 11. Work Ownership and Decision Boundaries

### 11.1 Owner decisions

The owner has approved:

- the organizational identity and supporting positioning;
- the primary, secondary, referral-based, and excluded audiences;
- the engagement types and exclusions;
- the founder-led capacity and subcontractor model;
- founder funding and the launch prohibition on sponsored research, vendor
  funding, vendor resale commissions, implementation commissions, and paid
  referral compensation;
- the Offerings categories, outcomes, and claim boundaries;
- the intended navigation and page-disposition direction;
- `https://astoncyber.com` as the canonical public origin;
- removal of PWA installability signals at launch;
- the phase order and exit-criteria model; and
- this document's authority over conflicting earlier future-phase sequencing.

Later phases still require owner decisions on exact route retirement and
redirect behavior, the qualified Contact process, the approved social-preview
asset, and final launch authorization. Each implementation phase requires
separate owner authorization.

### 11.2 Repository implementation

Repository work includes only owner-approved changes to:

- metadata and generated public outputs;
- route and navigation configuration;
- page composition and approved content;
- Offerings presentation;
- research usability;
- accessibility styles and semantics;
- responsive image delivery;
- custom error routing configuration;
- static security files;
- tests and validation;
- caching configuration committed with the site; and
- removal of installability signals.

### 11.3 Cloudflare configuration

Phase 0 Cloudflare work confirmed complete on 2026-08-07 includes:

- working apex TLS and origin behavior;
- DNS routing for apex and `www` to the Aston Cyber Azure Static Web App;
- a `301 Permanent Redirect` from `https://www.astoncyber.com/*` to
  `https://astoncyber.com/${1}`;
- preserved query strings;
- corrected redirect-loop behavior; and
- predictable loading at `https://astoncyber.com`.

Later Cloudflare work includes:

- cache behavior where Cloudflare owns it;
- HSTS policy coordination;
- preservation of required response headers; and
- production-hardening verification.

### 11.4 Azure Static Web Apps configuration

Phase 0 Azure work confirmed complete on 2026-08-07 includes valid custom-domain
service for `astoncyber.com` and `www.astoncyber.com`. Repository configuration
now rewrites Azure 404 responses to the statically exported `/404.html` document.
An authorized deployment and external response check remain necessary to prove
that Azure serves the Aston Cyber error experience with the intended 404 status
and global headers.

Later Azure work includes:

- applying intended security headers to success and error responses;
- cache-control behavior owned by Azure;
- static asset and trailing-slash behavior;
- preview-environment policy; and
- production deployment verification.

### 11.5 DNS

Phase 0 DNS work confirmed complete on 2026-08-07 includes:

- apex and `www` records routed through Cloudflare to Azure Static Web Apps;
- `https://astoncyber.com` validated as the canonical public origin; and
- `www` permanently redirected to the apex after apex TLS and production
  behavior were confirmed.

### 11.6 Future work

Future work includes search, PWA capabilities, client portals, analytics,
managed services, new sector positioning, public Projects and Labs, additional
People profiles, and new offerings that lack current evidence.

## 12. Launch Blockers

The following must be resolved before Aston Cyber is treated as publicly
launched:

### Organizational and buyer readiness

- Implement the approved engineering-and-research identity and resolve the
  current research-only positioning contradiction.
- Complete appropriate business formation, contracting, insurance, and
  operating formalities before accepting commercial engagements.
- Publish a credible Offerings surface.
- Present the approved audience, engagement scope, exclusions, founder-led
  capacity, subcontractor, independence, and funding decisions accurately.
- Qualify the Contact path.
- Remove empty Projects and Labs from primary navigation.
- Remove or hide the empty People surface.

### Infrastructure and production

- Apex TLS, canonical-host validation, and the permanent query-preserving
  `www` redirect were completed externally on 2026-08-07.
- Replace global `noindex, nofollow` for approved public pages.
- Publish and validate `robots.txt`.
- Sitemap and RSS generation already use the approved apex origin.
- Deploy and externally verify the repository custom-404 response override.
- Apply intended security headers to error responses.
- Publish RFC 9116 `/.well-known/security.txt`.

### Accessibility

- Correct insufficient active mobile-navigation contrast.

## 13. Launch-Critical Improvements

- Implement approved Home, Offerings, Research, About, and Contact roles.
- Consolidate overlapping Mission, About, and Ethos responsibilities.
- Clarify independence, conflicts, funding, and sponsorship.
- Add canonical metadata.
- Add approved Open Graph and Twitter/X metadata.
- Add appropriate Organization and publication structured data.
- Improve default inline-link identification.
- Improve long-document and Ethos navigation.
- Provide a professional publication format in addition to the original DOCX.
- Improve responsive hero-image delivery.
- Remove PWA installability signals.
- Validate keyboard, screen-reader, forced-color, zoom, and responsive behavior.
- Verify SEO, headers, redirects, sitemap, RSS, error behavior, and crawler
  directives against production.

## 14. Post-Launch Improvements

- Reduce repeated repository loading and MDX compilation.
- Improve caching for content-hashed assets.
- Establish JavaScript, CSS, image, and font performance budgets.
- Separate CSS ownership before additional content types expand the global
  stylesheet materially.
- Add broader browser-level accessibility regression coverage.
- Add deployment-contract and link-integrity checks.
- Reassess the shared client runtime cost.
- Refine Content Security Policy when compatible with the static Next.js
  architecture.
- Review Permissions Policy and HSTS maturity.
- Enrich RSS metadata.
- Publish anonymized engagement evidence after permission and sufficient
  delivery history exist.
- Build vendor-risk materials proportionate to actual demand.

## 15. Deferred Work

- public Projects navigation until substantive entries exist;
- public Labs navigation until substantive entries exist;
- People directory until multiple approved profiles exist;
- Phase 9 Search & Discovery until content volume justifies it;
- client portal;
- PWA, service worker, offline support, or install prompts;
- newsletter or subscription infrastructure;
- analytics and behavioral tracking;
- CMS or database;
- managed service, MDR, MSSP, or vCISO offerings;
- penetration-testing practice;
- AI-security practice or model red teaming;
- healthcare-, legal-, CPA-, or SaaS-specific campaigns without evidence;
- large-bank transformation positioning;
- productization of the transaction-authorization prototype;
- public pricing before engagement patterns are understood; and
- complex partner, referral, or service-tier programs.

## 16. Phased Implementation Roadmap

### Phase 0 – Public Surface Stabilization

**Status:** Repository work complete on 2026-08-07; external verification of
the custom 404 after an authorized deployment remains open.

**Objective:** Remove immediate public infrastructure failures while strategic
work is approved.

**Scope:**

- owner-confirmed DNS, apex and `www` origin-path, TLS, redirect, and Azure
  custom-domain state;
- validation that repository-generated sitemap and RSS output use the approved
  apex canonical origin;
- repository configuration for production custom-404 behavior; and
- security-header behavior on success and error responses.

**Dependencies:** The canonical-host decision and external DNS, Cloudflare,
TLS, redirect, and Azure custom-domain work are complete. An authorized
deployment is required before the repository custom-404 behavior and error-
response headers can be verified in production.

**Expected validation:** Repository validation, static-export inspection,
sitemap and RSS origin checks, crawler-directive regression checks, and—after
an authorized deployment—external HTTP status, custom-404, and response-header
inspection.

**Exit criteria:** Both public hosts behave predictably, the apex is canonical,
`www` redirects permanently with query strings preserved, no TLS error remains,
generated public URLs use the apex, temporary `noindex, nofollow` remains in
place, and unknown routes return the Aston Cyber error experience with intended
status and headers. Every criterion except the post-deployment custom-404 and
error-response verification is complete as of 2026-08-07.

### Phase A – Identity, Audience, and Governance Decisions

**Objective:** Record and validate the approved organizational model that all
subsequent work must express.

**Scope:**

- identity and positioning;
- audience priorities;
- engagement types and exclusions;
- founder-led delivery and capacity;
- independence and conflict policy;
- funding and sponsorship policy;
- collaborator policy;
- claim boundaries; and
- evidence requirements for stronger future claims.

**Dependencies:** Owner decisions are complete. Business formation,
contracting, insurance, and operating formalities remain mandatory before
commercial engagements are accepted. Legal review remains required where
appropriate for later operational policies.

**Expected validation:** Decision review against founder experience, current
research, intended client expectations, and operational capacity.

**Exit criteria:** The approved identity, audience hierarchy, engagement model,
scope boundary, founder-led capacity and subcontractor model, founder-funding
status, compensation prohibitions, sponsored-research prohibition,
independence policy, and claim standard are recorded without unsupported legal
or operating claims. Phase A is decision-complete as of 2026-08-07; any
repository or content implementation still requires separate authorization.

### Phase B – Information Architecture and Buyer Journey

**Status:** Implemented for review on 2026-08-07. Phase C and Phase D have not
begun.

**Objective:** Establish a coherent site structure around visitor decisions.

**Scope:**

- approve Home, Offerings, Research, About, and Contact responsibilities;
- approve primary and footer navigation direction;
- approve Mission and Ethos consolidation boundaries;
- approve Projects, Labs, People, and topic visibility;
- define route-retention and redirect requirements; and
- define the complete homepage-to-contact buyer journey.

**Dependencies:** Phase A decisions.

**Expected validation:** Navigation inventory, route map, buyer-journey review,
internal-link review, and preservation plan for existing public URLs.

**Exit criteria:** Every visible destination answers a distinct visitor
question, no primary destination is empty, and route disposition is approved.
The implementation establishes Home, Offerings, Research, and About as the
primary set; presents Contact as a distinct restrained action; retires the
empty Projects and Labs routes while preserving their content architecture;
redirects the former People surface to About; retains Mission and Ethos for
later approved consolidation; and de-emphasizes research topics without
deleting their architecture. Phase B is implementation-complete subject to the
validation record in `24-phase-b-information-architecture-buyer-journey.md`.

### Phase C – Offerings, Trust, and Contact

**Status:** Implemented for review on 2026-08-07. The repository implementation
is recorded in `25-phase-c-offerings-trust-contact.md`. Phase D has not begun.

**Objective:** Make a carefully scoped engagement understandable and credible.

**Scope:**

- implement the five approved offering categories;
- present client problems, engagement types, outcomes, credibility, and claim
  boundaries;
- present founder accountability and capacity;
- present founder funding, independence, compensation, sponsored-research, and
  subcontractor disclosures;
- state the current legal and operating status without implying that a formed
  entity, employees, standing subcontractor bench, insurance status,
  jurisdiction, address, or registration already exists;
- identify appropriate and inappropriate clients;
- define Contact qualification and sensitive-information guidance; and
- add proportionate trust information.

**Dependencies:** Phases A and B; owner-approved claims and operating details.

**Expected validation:** Claim-to-evidence review, buyer review, legal and
business review where required, accessibility review, and route/content tests.

**Exit criteria:** A qualified buyer can determine fit, an out-of-scope buyer
can self-select out, no claim exceeds evidence, and Contact establishes a safe
next step. The implementation publishes all five approved categories with
problem, engagement, outcome, credibility, and claim-boundary context; defines
the bounded engagement sequence and exclusions; records founder accountability,
capacity, collaborator, funding, independence, and research-integrity facts;
and limits initial Contact inquiries to non-sensitive qualification details.
Phase C is implementation-complete subject to the validation record in
`25-phase-c-offerings-trust-contact.md`.

### Phase D – Homepage and Institutional Repositioning

**Objective:** Make the new identity clear within the first ten seconds while
preserving the established visual system.

**Scope:**

- reposition the homepage around identity, audience, outcomes, evidence, and
  next steps;
- preserve the centered hero composition and visual restraint;
- align About with founder leadership and organizational facts;
- consolidate approved Mission material;
- retain Ethos as the detailed principles statement; and
- remove duplicated or contradictory institutional messages.

**Dependencies:** Phases A–C.

**Expected validation:** First-impression review, message-comprehension review,
desktop and mobile visual review, heading and link review, and content approval.

**Exit criteria:** A new visitor can state what Aston Cyber is, whom it serves,
what it can address, why it is credible, and where to go next.

### Phase E – Research and Publication Usability

**Objective:** Preserve research independence while improving executive and
technical use.

**Scope:**

- define commercial/research separation;
- add long-document orientation and linkable sections;
- improve executive entry points;
- add approved publication formats;
- define revisions and corrections;
- improve related-work paths;
- de-emphasize premature taxonomy; and
- preserve sponsorship, limitation, and artifact-maturity disclosures.

**Dependencies:** Phase A independence decisions and stable Phase B route map.

**Expected validation:** Executive-reader review, technical-reader review,
keyboard navigation, screen-reader heading review, print and download review,
and research-integrity approval.

**Exit criteria:** Reports are usable at multiple reading depths, remain
independent of sales, expose limitations, and provide stable publication
artifacts.

### Phase F – Accessibility, UX, and Performance Hardening

**Objective:** Resolve known user-facing defects without redesigning the site.

**Scope:**

- active-navigation contrast;
- inline-link affordance;
- heading hierarchy;
- focus and keyboard behavior;
- screen-reader and forced-color behavior;
- code-sample usability;
- target-size review;
- responsive hero-image delivery;
- responsive and zoom validation; and
- performance budgets.

**Dependencies:** Stable navigation and page composition from Phases B–E.

**Expected validation:** Automated accessibility checks, manual keyboard review,
screen-reader review, contrast calculations, forced-color review, 200% zoom,
320/375/768/1024/desktop layouts, asset measurements, and production-build
inspection.

**Exit criteria:** Known accessibility defects are resolved, no horizontal page
overflow exists, interaction remains usable without client JavaScript, and
approved performance budgets pass.

### Phase G – Production Hardening, SEO, and PWA Removal

**Objective:** Make the final site discoverable, secure, cacheable, and aligned
with its actual website role.

**Scope:**

- replace temporary crawler directives;
- publish `robots.txt`;
- align canonical metadata, sitemap, and RSS with the approved apex canonical
  host after its production behavior is validated;
- add social metadata and the approved social asset;
- add appropriate structured data;
- publish RFC 9116 `security.txt`;
- remove Web App Manifest association and other installability signals while
  retaining browser icons;
- confirm no service worker or install prompt exists;
- review CSP, HSTS, Permissions Policy, and caching;
- remove exported system artifacts; and
- add deployment-contract validation.

**Dependencies:** Stable route map, canonical host, approved social asset,
completed content and accessibility phases, and Cloudflare/Azure coordination.

**Expected validation:** Generated-HTML inspection, crawler-directive tests,
sitemap and RSS validation, canonical URL checks, social-preview tests,
structured-data validation, header checks, cache checks, manifest/installability
checks, `security.txt` validation, and production 404 verification.

**Exit criteria:** Approved pages are indexable, every canonical URL resolves,
sitemap and RSS contain only valid public URLs, social previews are approved,
security files and headers are present, no unintended installability remains,
and success and error responses satisfy production policy.

### Phase H – Launch Validation and Approval

**Objective:** Prove that the deployed production system matches the approved
identity, implementation, and infrastructure configuration.

**Scope:**

- complete repository validation;
- external route and redirect checks;
- TLS and DNS checks;
- metadata, sitemap, RSS, robots, and structured-data checks;
- custom 404 and security-header checks;
- browser-level accessibility checks;
- desktop and mobile review;
- performance and cache review;
- internal and external link checks;
- Contact journey review;
- claim and trust review; and
- owner launch decision.

**Dependencies:** Completion of Phases 0 and A–G.

**Expected validation:** `pnpm validate`, production static-export inspection,
production-network verification, browser testing, accessibility testing,
performance testing, security review, SEO review, and owner acceptance.

**Exit criteria:** No launch blocker remains, no unaccepted critical or high
finding remains, production matches approved configuration, and the owner
explicitly approves public launch.

### Phase I – Post-Launch Evidence and Growth

**Objective:** Expand authority only through demonstrated delivery and measured
need.

**Scope:**

- additional research;
- authorized anonymized engagement evidence;
- client references and trust materials;
- content-pipeline scalability;
- cache and client-runtime optimization;
- Projects and Labs maturity review;
- regional-bank readiness review;
- search need assessment;
- accessibility and performance regression coverage; and
- future offering or audience evidence review.

**Dependencies:** Completed engagements, additional publications, measured
visitor needs, and owner approval for each expansion.

**Expected validation:** Evidence review, content-volume assessment, client and
visitor feedback, operational-capacity review, and renewed architecture review
for any new runtime capability.

**Exit criteria:** Ongoing. New capabilities enter the roadmap only when
supported by evidence, demand, and delivery capacity.

## 17. Governing Rules

- Complete phases in sequence unless a phase explicitly permits parallel
  infrastructure work.
- Phase 0 may proceed while Phase A decisions are reviewed.
- Do not expose repositioned content before Phase A approval.
- Do not enable public indexing until the canonical host, final route map,
  metadata, sitemap, RSS, and production verification are complete.
- Do not add a new offering without evidence and an approved scope boundary.
- Do not place Projects, Labs, or People in navigation merely because their
  repository architecture exists.
- Do not implement Phase 9 Search & Discovery until its documented activation
  condition is met.
- Do not add PWA behavior, a service worker, install prompts, analytics, a CMS,
  a database, a client portal, or new runtime services without a separate
  architecture decision.
- Preserve the static-first, server-first, privacy-first, and accessibility-first
  engineering principles unless a reviewed requirement justifies change.
- Each phase requires its own approved implementation scope and validation
  report. Approval of this roadmap is not blanket authorization to implement
  every phase.

## 18. Plan Approval Checklist

The owner confirmed on 2026-08-07:

- [x] organizational identity;
- [x] audience hierarchy;
- [x] engagement model and exclusions;
- [x] Offerings categories and claim boundaries;
- [x] founder-led capacity and subcontractor model;
- [x] founder funding, compensation prohibitions, and no sponsored research at
  launch;
- [x] independence, conflict, funding, and sponsorship policy direction;
- [x] navigation and page-disposition direction;
- [x] `https://astoncyber.com` as the canonical host;
- [x] PWA removal at launch;
- [x] phase order and exit criteria; and
- [x] authority of this document over conflicting future-roadmap sequencing.

Approval records strategic and sequencing decisions only. It does not approve
code, content, infrastructure, DNS, deployment, or route changes without the
separate phase authorization required above.
