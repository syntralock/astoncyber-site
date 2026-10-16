# Aston Cyber
# Navigation Specification

## Purpose

This document defines the canonical information architecture for Aston Cyber.

This specification is authoritative for navigation, routing, and page hierarchy.

---

# Primary Navigation

Home

Offerings

Research

About

---

# Navigation Requirements

- The primary navigation MUST remain minimal.
- Navigation labels MUST use sentence case.
- The public primary navigation MUST contain exactly the four items listed
  above: Home, Offerings, Research, and About.
- Contact MUST remain a distinct, restrained header action and a footer
  destination rather than a fifth primary-navigation item.
- Home links to `/` and replaces Mission in public primary and footer
  navigation.
- Mission remains a published secondary institutional page at `/mission` and
  MUST NOT appear in primary navigation.
- Writing and Speaking are not Aston Cyber website collections or roadmap
  destinations. They are assigned to the future personal website at
  `matt.astoncyber.com`.
- Desktop and mobile navigation MUST use the same centralized published-state
  configuration.
- Every page MUST support breadcrumb navigation where appropriate.
- The homepage is the public entry point for the organization.
- The Mission page provides a concise directional statement of why Aston Cyber
  exists and remains available through contextual links and its direct URL.
- The Ethos page MUST be prominently linked from Mission and the footer.
- Ethos MUST NOT appear in the primary navigation unless this specification is revised.
- Projects and Labs retain their repository and content architecture but MUST
  NOT expose public collection routes, navigation items, or sitemap entries
  while they contain no substantive public material.
- The empty People route is retired and permanently redirects to About. The
  reusable person-profile architecture remains available for later approved
  content.
- Research topic routes remain available through contextual research metadata,
  but the topic index and topic detail routes are de-emphasized and excluded
  from the sitemap while the public corpus remains small.

---

# Mission

Purpose:
Communicate why Aston Cyber exists.

Sections:

- Concise mission statement
- Understand consequential problems
- Engineer practical responses
- Share useful knowledge
- Contextual paths to About and Ethos

---

# Research

Purpose:
Present original research and investigations.

Content Types:

- White papers
- Research papers
- Experiments
- AI security
- Cloud security
- Identity
- Enterprise architecture

The Research index is the principal research discovery surface. Topic taxonomy
must not be presented as a prominent parallel entry point while the current
publication volume does not justify it.

---

# Offerings

Purpose:
Help a prospective client understand the kinds of problems Aston Cyber may
address, how work is scoped, and what an engagement should produce.

Phase C publishes the five approved offering categories, claim boundaries,
bounded engagement model, founder-accountability and independence disclosures,
and qualified Contact journey. The page is the principal buyer-facing surface
without becoming a generic services catalogue.

---

# Projects

Status:
Repository capability retained; public route inactive while empty.

Content Types:

- Open source
- Security tooling
- Proofs of concept
- Reference implementations
- Case studies

---

# Labs

Status:
Repository capability retained; public route inactive while empty.

Content Types:

- Prototypes
- Explorations
- Architecture ideas
- Public notebooks
- Experiments

---

# About

Purpose:
Explain who Aston Cyber is as an organization and establish direct founder
accountability.

Sections:

- Institutional identity
- Accountability and operating model
- Engagement philosophy
- Founder
- Independence

The former empty `/people` surface permanently redirects to `/about/`.

Contact routing:

- General inquiries: `info@astoncyber.com`
- Responsible disclosure and security reports: `security@astoncyber.com`

---

# Routing Rules

Current public route disposition:

- `/offerings` is active.
- `/projects` and `/labs` are inactive while their collections are empty.
- `/people` permanently redirects to `/about/` through static-host
  configuration.
- `/mission` remains active as a concise secondary institutional page.
- `/ethos` remains an active secondary principles page.
- Research topic routes remain active but de-emphasized and excluded from the
  sitemap.

Codex MUST preserve this navigation unless this specification is updated.
# Current navigation (2026-10-16)

Decision 23 supersedes the earlier navigation model below. Primary navigation
is **Home | Services | Our Approach | About**, with **Contact** as the primary
action. **Research** is secondary. `/mission`, `/ethos`, `/offerings`, and the
five former offering detail routes are retired and permanently redirected.
