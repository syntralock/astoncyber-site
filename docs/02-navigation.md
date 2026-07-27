# Aston Cyber
# Navigation Specification

## Purpose

This document defines the canonical information architecture for Aston Cyber.

This specification is authoritative for navigation, routing, and page hierarchy.

---

# Primary Navigation

Home

Research

Projects

Labs

About

---

# Navigation Requirements

- The primary navigation MUST remain minimal.
- Navigation labels MUST use sentence case.
- The public primary navigation MUST contain exactly the five items listed
  above: Home, Research, Projects, Labs, and About.
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
- The Mission page provides the deeper institutional statement and remains
  available through contextual links and its direct URL.
- The Ethos page MUST be prominently linked from Mission and the footer.
- Ethos MUST NOT appear in the primary navigation unless this specification is revised.

---

# Mission

Purpose:
Communicate why Aston Cyber exists.

Sections:

- Hero
- Mission Statement
- Vision
- Principles
- Research Philosophy
- Current Focus Areas
- Call to Explore Research

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

---

# Projects

Purpose:
Show engineering work.

Content Types:

- Open source
- Security tooling
- Proofs of concept
- Reference implementations
- Case studies

---

# Labs

Purpose:
Show experimental work before it becomes formal research.

Content Types:

- Prototypes
- Explorations
- Architecture ideas
- Public notebooks
- Experiments

---

# About

Purpose:
Introduce the founder after visitors understand the organization.

Sections:

- Aston Cyber story
- Founder
- Biography
- Resume
- Media kit
- Contact

Contact routing:

- General inquiries: `info@astoncyber.com`
- Responsible disclosure and security reports: `security@astoncyber.com`

---

# Routing Rules

Codex MUST preserve this navigation unless this specification is updated.
