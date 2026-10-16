# Phase 7.1 Desktop Composition and Navigation Refinement

## Status

Implemented for review on 2026-07-26. Phase 7 remains uncommitted.

## Objective

Phase 7.1 refines desktop and laptop composition without changing the Phase 7
content architecture, publication model, design system, or mobile information
architecture. It is a visual refinement of the existing institutional and
research experience, not a new product phase.

The refinement addresses layouts that previously left narrow content attached
to one side of a wide canvas, a two-over-one homepage focus grid, and a featured
publication that appeared as a narrow archive card rather than flagship
institutional work.

## Composition Principles

- Page introductions may center the eyebrow, heading, lead, and primary actions.
- Long-form prose, card summaries, metadata, and other reading content remain
  left-aligned.
- Reusable constrained containers control the overall canvas; readable measures
  continue to control prose.
- Wide feature regions may use the full institutional container.
- Balanced two- and three-column primitives use equal tracks and logical source
  order rather than page-specific offsets.
- Three-column regions stack as a single sequence below the desktop breakpoint;
  a two-over-one intermediate layout is not used.
- Existing typography, color, spacing, surface, border, radius, motion, and
  interaction tokens remain authoritative.
- Balanced heading wrapping and pretty prose wrapping reduce awkward line
  endings without centering body text.
- Layouts must remain usable at 200% zoom and must not produce horizontal
  scrolling.

No stock imagery, decorative hero imagery, cybersecurity cliché iconography,
lock or shield motifs, hacker imagery, matrix effects, neon effects, or
decorative animation were introduced.

## Implemented Scope

### Homepage

- Centers the desktop hero eyebrow, H1, lead, and actions within a restrained
  measure while retaining left alignment on the established mobile layout.
- Replaces the two-over-one focus-card arrangement with a governing Mission
  heading and three equal editorial columns: Our work, Vision, and Research,
  engineering, and education.
- Gives each pillar a centered, same-weight decorative line icon: a
  three-person figure, magnifying glass, and abstract geometric prism.
- Allows the hero H1 to fit naturally on one line at common desktop widths
  without a hard-coded line break while preserving responsive wrapping.
- Uses subtle separators and whitespace instead of three heavy card surfaces.
- Presents the first public report in a full-width featured publication panel.
- Replaces the detailed contact block with a concise Questions or inquiries?
  band linking to `/contact/`.

The homepage does not expose additional email addresses, add a contact form, or
offer unsupported newsletter or subscription functionality.

### Mission

- Centers the breadcrumb region within the page grid.
- Centers the desktop eyebrow, H1, and introductory statement.
- Presents Our work, Vision, and Research, engineering, and education as three
  equal desktop columns with left-aligned body text.
- Uses the wide institutional container for the approved organizational
  principles and conclusion.

The substantive approved mission meaning is unchanged.

### Research

- Centers the Research eyebrow, H1, lead, and topic-index link.
- Separates the introduction from the archive with a clearly aligned section
  heading.
- Presents the approved report as a wide featured publication panel while
  preserving its type, title, summary, status, topic, author, date, and link.
- Preserves static detail routes, topic routes, fixture exclusion, sitemap,
  RSS, download artifacts, and print behavior.

No search, runtime filters, pagination, subscription prompt, or invented
publication was added.

## Navigation

The public primary navigation is:

1. Home
2. Research
3. Projects
4. Labs
5. About

Home links to `/`. Mission remains published at `/mission` as a secondary
institutional page reached through contextual links and direct URL; it is not a
primary navigation destination.

Writing and Speaking are absent from desktop, mobile, and footer primary
navigation. Decision 19 subsequently assigns both to the future personal
website at `matt.astoncyber.com`. The centralized navigation configuration
remains the source for every public navigation surface.

Projects and Labs remain Aston Cyber collection destinations. No Writing or
Speaking collection route is part of the Aston Cyber roadmap.

## Architecture

- The shared `InstitutionalPage` accepts an optional content class so wide page
  compositions can reuse the established shell without duplicating it.
- The existing content and research cards accept a typed featured variant.
- The research archive accepts a typed featured presentation that preserves its
  semantic article structure and content loader.
- Reusable CSS layout classes provide centered introductions, wide features,
  balanced three-column regions, and concise horizontal section bands.
- All application pages remain Server Components. The existing mobile navigation
  is the only shell interaction involved; no new Client Component directive was
  introduced.
- No dependency or design token was added.
- The three approved decorative pillar icons are project-native inline SVGs,
  share one presentation contract, use the existing accent token, and are
  hidden from assistive technology.

## Accessibility

- Every reviewed page retains exactly one H1 and a logical heading hierarchy.
- Source order matches reading order when columns stack.
- Prose remains left-aligned and measure-constrained.
- Keyboard focus uses the established visible focus outline.
- The mobile menu retains its accessible name and the same five public links.
- Touch spacing, responsive stacking, and overflow protection are preserved.
- The 800-pixel effective CSS viewport used to approximate 200% zoom remains
  single-column without horizontal overflow.

## Validation

The Phase 7.1 review covers:

- frozen-lockfile dependency installation;
- formatting;
- ESLint;
- strict TypeScript;
- unit and integration tests;
- environment, content, and MDX validation;
- static-export production build;
- public, draft, and fixture visibility behavior;
- sitemap and RSS output;
- downloadable artifact export;
- print rules;
- unexpected Client Component directives;
- `git diff --check`;
- responsive inspection at 375 × 812, 768 × 1024, 1280 × 800,
  1440 × 900, and 1600 × 900.

## Dependencies

No dependencies were added or changed.

## Known Limitations and Deferred Work

- Mission is a secondary institutional page rather than a primary navigation
  destination.
- Writing and Speaking belong to the future `matt.astoncyber.com` website.
- Search, runtime filtering, pagination, subscriptions, newsletters, and contact
  forms remain deferred.
- The Contact page continues to use the approved static, direct-email
  architecture.
- Additional featured or related publications depend on separately approved
  public content.
- Phase 8 Projects & Labs and later discovery work were not started.
# Historical status

This visual-refinement record is preserved for traceability. Decision 23
supersedes its homepage positioning, mission-route, and navigation assumptions.
