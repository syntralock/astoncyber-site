# Aston Cyber
# Phase C: Offerings, Trust, and Contact

## Status

Implemented for review on 2026-08-07.

The Offerings implementation described below is a historical record of Phase C.
It was later superseded by an owner-approved concise overview with five linked
detail routes. Current governing direction recognizes discovery and problem
framing as valuable work and does not categorically reject continued support or
recurring relationships. The Contact and trust work recorded here remains in
effect.

This record documents the repository implementation of Phase C from the
canonical remediation roadmap in
`23-strategic-remediation-implementation-plan.md`. It does not authorize Phase
D or later work.

## Scope Completed

The Offerings page now presents the five approved problem categories:

- Identity, cloud, and platform security
- Security architecture and decision support
- Focused security assessments
- Security automation and control evidence
- Secure workflow research and prototyping

Each category states the client problem, typical bounded engagement, expected
outcome, present credibility basis, and claims that the current evidence does
not support. The page also defines the engagement sequence, founder
participation, intentionally limited concurrent work, specialist-collaborator
conditions, explicit service exclusions, and the route to a qualified Contact
inquiry.

The About page received only the trust facts required by Phase C. It now states
the founder-led operating model, collaborator controls, present legal and
operating status, founder funding, prohibited compensation and sponsorship,
and separation of commercial work from public research. Existing founder,
Mission, and principles content remains in place for Phase D review.

The Contact page now asks for only organization type, general problem category,
desired outcome, approximate timing, and contact information. It warns visitors
not to send credentials, confidential information, regulated data, incident
evidence, or sensitive technical artifacts in the initial message. It explains
fit review, limited discovery, bounded written scope, and the separate
responsible-disclosure route without adding a form or client-side JavaScript.

## Approved Boundaries Preserved

- No homepage repositioning or hero change was made.
- Primary and secondary navigation were not changed.
- Mission, Ethos, and Research content were not changed.
- No managed, continuous, emergency-response, retainer, audit, attestation,
  product, or vendor-compensation capability is implied.
- No employees, standing subcontractor bench, formed legal entity, insurance
  status, jurisdiction, address, or registration is implied.
- The temporary noindex/nofollow posture and current PWA behavior are unchanged.
- No dependency or client-side JavaScript was added.

## Validation

Validation completed on 2026-08-07:

- `pnpm validate` passed formatting, linting, TypeScript, all 202 tests,
  environment validation, content validation, production build, and static
  export.
- Generated Offerings, About, and Contact pages were inspected from the static
  export.
- Offerings, About, and Contact were reviewed at 320, 375, 768, 1024, and 1440
  CSS pixels. Each retained one `h1` and produced no horizontal overflow.
- The 320-pixel native mobile menu opened correctly and exposed the unchanged
  Home, Offerings, Research, About, and Contact destinations.
- Keyboard focus on the Offerings-to-Contact link retained a visible two-pixel
  solid outline.
- Generated sitemap and navigation checks passed through the automated suite.
- `git diff --check` passed.

## Exit Assessment

Phase C is complete when validation confirms that a prospective client can
identify an appropriate problem, understand how a bounded engagement works,
self-select out of excluded work, evaluate the disclosed trust model, and begin
a non-sensitive inquiry without any claim exceeding the approved evidence.
# Historical status

Decision 23 supersedes the five-offering model documented here. Contact safety,
independence, disclosure, and engagement-boundary decisions remain applicable.
