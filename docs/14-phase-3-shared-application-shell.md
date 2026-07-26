# 14 – Phase 3 Shared Application Shell

## Status

Phase 3 shared application shell implemented for review. Phase 4 has not
begun.

## Architecture

The root App Router layout now provides the shared page structure:

- A keyboard-accessible skip link targeting the single shared `main`
- A shared header with the replaceable text-only Brand component
- The approved seven-item primary navigation
- A responsive mobile navigation implemented with native
  `details`/`summary` disclosure semantics
- A compact shared footer with approved navigation, institutional
  destinations, a Contact route, repository link, and RSS destination
- Default application metadata, pre-launch indexing policy, not-found
  handling, route-level error recovery, and a root-level error fallback

The shell and layout primitives are Server Components. The navigation
link list is the only shell Client Component because it reads the
current pathname to expose `aria-current="page"` for exact and nested
routes. The framework-required error boundary is also a Client
Component so its recovery action can call `reset`.

## Shared primitives

Project-native `Container`, `Section`, and `Breadcrumbs` components
provide only the structure required by the shared shell and documented
future routes. They consume the approved Phase 2 tokens and utilities.
No general-purpose component library or new dependency was introduced.

## Responsive and accessible behavior

Desktop navigation is available from the documented medium breakpoint.
Smaller viewports receive a native disclosure control with the same
canonical destinations. Navigation controls preserve the documented
minimum target size, visible focus treatment, semantic labels, and
active state.

Breadcrumbs use an ordered list within a labelled navigation landmark
and identify the current item. External repository links retain safe
`noopener noreferrer` defaults.

The footer uses two centered semantic navigation lists: primary and
secondary. Both wrap naturally with flex layout instead of fixed rows or
columns. Decorative separators are generated only through CSS at wider
breakpoints and are absent from the HTML and accessibility tree. On
smaller screens the separators are removed to preserve readable touch
spacing. Primary and secondary destinations are sourced from the
central navigation configuration, where an item can be withheld with
`published: false` without restructuring the footer.

## Documentation boundary

The footer links to approved future institutional destinations because
the shared footer specification requires them. Their route content
remains deferred; Phase 3 does not create placeholder institutional
pages. The concise footer phrase is taken from the approved
documentation rather than newly authored production copy. Direct email
addresses are not rendered by the shell; Contact points to `/contact`.

The `/contact` page remains deferred to the institutional-pages phase.
For the initial static release, the page uses direct approved email links only.
The earlier proposal for a server-routed inquiry form is superseded. Phase 6
must not add a form, delivery mechanism, API, Server Action, external provider,
mail service, or inquiry environment configuration. Any future public form
requires a separate architecture and security review.

## Deferred work

- Project-native components required by the first research slice
  (Phase 4)
- Research-content vertical slice (Phase 5)
- Institutional and production route content (Phase 6 onward)
- The static `/contact` page with approved direct email links (Phase 6
  institutional pages)
- RSS generation and destination implementation
- Final logo and favicon package
- Search, user-facing light theme controls, and production integrations
