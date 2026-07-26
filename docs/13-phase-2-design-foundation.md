# 13 – Phase 2 Design Foundation

## Status

Phase 2 design foundation implemented for review. Phase 3 has not begun.

## Typography

Phase 2.1 permanently refines the approved typography direction to Lora
for display and headings, IBM Plex Sans for body and interface text, and
JetBrains Mono for technical material. All three variable fonts are
self-hosted through pinned Fontsource packages. This avoids runtime
requests to a font service and keeps static builds reproducible.

The revised hierarchy is deliberately smaller and lighter than the
initial Phase 2 system. Lora uses a restrained 550 variable weight for
hero, display, and H1 roles, semibold lower headings, optical tracking,
and more comfortable leading so authority comes from editorial
proportion rather than product-marketing scale. IBM Plex Sans provides
the reading, interface, label, metadata, caption, button, and text-only
Brand roles. JetBrains Mono remains limited to code, commands, hashes,
identifiers, and technical labels.

The implementation provides the complete documented type scale and
roles for hero, display, headings, lead text, large body text, body text,
small text, captions, technical labels, navigation, button labels, and
code. Reading measures, balanced headings, body wrapping, and vertical
rhythm are tokenized.

## Layout and surfaces

The Phase 2 CSS foundation includes:

- A compact spacing scale
- Mobile-first breakpoints
- Content, narrow, lead, and reading widths
- Responsive container, grid, cluster, and stack utilities
- Responsive section spacing
- Border widths and radius scale
- Default and raised surface treatments
- Small and medium elevation tokens
- Focus, hover, transition, and reduced-motion behavior

These are CSS utilities and tokens, not Phase 3 site-shell components or
Phase 4 content components.

## Theme and accessibility

The initial theme remains dark-only. Components and utilities consume
semantic roles rather than palette names, preserving the abstraction
needed for the approved future light palette without exposing or
implementing a theme switcher.

Automated tests verify required token presence and WCAG AA contrast for
primary text, secondary text, muted text, links, surface text, and
accent-button text. The design specimen uses semantic landmarks, a
single `h1`, visible focus treatment, minimum control height, readable
measures, and responsive grids.

## Demonstration page

The root page is a non-production design-system specimen. It demonstrates
the type hierarchy, spacing, surfaces, neutral cards, semantic states,
links, and button treatments using neutral placeholder labels only.
The replaceable text-only `Brand` component remains unchanged in
meaning; no logo, navigation, header, footer, site shell, imagery, or
production content is introduced.

## Dependencies

- `@fontsource-variable/lora`
- `@fontsource-variable/ibm-plex-sans`
- `@fontsource-variable/jetbrains-mono`

These packages contain the approved variable font files and CSS needed
to self-host them in the static export. No new runtime service,
client-side library, or third-party script is introduced.

## Deferred work

- Shared site shell, header, the then-approved seven-item navigation, mobile
  navigation, footer, skip link, and breadcrumbs (Phase 3); current public
  navigation was subsequently refined to five items in Phase 7.1
- Project-native component library required by the first research slice
  (Phase 4)
- Complete research-content vertical slice (Phase 5)
- Institutional and production pages (Phase 6 onward)
- Final logo and favicon package
- Any user-facing light theme or theme control
