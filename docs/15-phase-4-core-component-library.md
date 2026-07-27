# 15 – Phase 4 Core Component Library

## Status

Phase 4 core component library implemented for review. Phase 5 has not
begun.

## Authoritative scope

`docs/07-website-project-plan.md` limits Phase 4 to the components
required before the first research-content vertical slice:

- Heading
- Text
- Link
- Button
- Tag
- Status Badge
- Metadata Row
- Content Card
- Research Card
- Empty State
- Error State

The implementation follows this narrower authoritative scope. Project,
Writing, and Person Cards; Callout; Quote; Code Block; Figure; Table;
Citation; Footnotes; Pagination; Filter Controls; and Search Input were
requested but are not Phase 4 tasks in the project plan. The plan
requires an identified vertical-slice consumer before further content
components are added, and search remains explicitly deferred. Those
components were not introduced.

## Architecture

The library is project-native and dependency-free. Components are
grouped by role:

```text
components/
  ui/        Typography and interface primitives
  content/   Generic content, research, and state patterns
  examples/  Static non-production component specimens
```

All components are strictly typed and are Server Components by default.
They consume the established semantic colors, typography roles, spacing,
border, radius, shadow, and interaction tokens. No token, font, theme,
shell boundary, route, or content collection changed.

`ContentCard` provides the shared article structure. `ResearchCard`
composes it with the status, topic, author, format, and publication-date
fields identified for the first research slice. The generic card keeps
the title link separate from optional supporting content so future
consumers do not create nested interactive controls.

## Responsive behavior

Cards use a single-column mobile layout and the documented medium
breakpoint for two-column specimens. Metadata and interface clusters
wrap naturally. Long metadata values and headings may wrap without
causing horizontal overflow.

## Interactive-component accessibility

### Link

- Uses native anchors and Next.js links for navigation.
- External new-tab links apply `noopener noreferrer`.
- Link styling retains underlines or explicit standalone-link treatment,
  so meaning does not depend on color alone.
- Existing global focus-visible styling remains active.

### Button

- Uses the native `button` element.
- Defaults to `type="button"` to avoid accidental form submission.
- Preserves the documented 48px control height and visible focus state.
- Disabled behavior remains native when the `disabled` prop is used.

### Linked Tag

- Uses a native link when `href` is supplied and a non-interactive
  `span` otherwise.
- Retains visible focus and a minimum 32px compact-control height.

### Content and Research Cards

- Use semantic `article` elements.
- Only explicit title and action labels are linked; the full card is not
  converted into a custom click target.
- Link labels describe the destination rather than relying on position.

### Error State

- Uses `role="alert"` for an error that should be announced.
- Displays a textual title and description, so the danger border is not
  the sole error indicator.
- Any recovery action is supplied explicitly by the consumer.

## Examples and tests

The existing non-production specimen page demonstrates every approved
Phase 4 component with neutral static data. It remains a specimen rather
than a production page.

Automated tests cover semantic elements, typography roles, external-link
safety, button defaults, linked and static tags, visible status text,
metadata definition lists, card composition, publication dates, empty
states, and announced error states.

## Deferred work

- The complete validated research-content vertical slice (Phase 5)
- Additional components only after a real vertical-slice or page
  consumer demonstrates the need
- All production routes and institutional content (Phase 6 onward)
- Research-page variants and filters (Phase 7)
- Project and Lab publishing patterns (Phase 8), plus content-dependent People
  publication
- Pagination and search controls after discovery requirements are
  demonstrated and search is separately approved (Phase 9)

The Phase 4 Writing Card remains a tested historical generic component, but
Decision 19 removes Writing and Speaking routes and collections from the Aston
Cyber roadmap. Personal Writing and Speaking belong to
`matt.astoncyber.com`.
