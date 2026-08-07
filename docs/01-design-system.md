# Aston Cyber
## Design System

> Research. Engineering. Security.

---

# Design Philosophy

Aston Cyber is a modern cybersecurity research organization.

The visual system should communicate clarity, curiosity, engineering discipline, and intellectual honesty. The site should feel like a contemporary research institute shaped by computer science, publishing, and thoughtful design.

Cybersecurity is the thread that runs through the experience. Research, engineering, education, and design provide the structure around it.

The site should feel:

- Modern
- Progressive
- Intelligent
- Calm
- Editorial
- Technical
- Research-driven
- Purposeful

The site should not rely on:

- Hacker imagery
- Hooded figures
- Lock icons
- Shield icons
- Matrix effects
- Excessive neon
- Generic stock photography
- Fear-based visual language
- Decorative motion without purpose

---

# Visual Style

The initial release uses a dark theme only. Components MUST use semantic
tokens rather than theme-specific color names so a future light theme
can be added without component rewrites.

## Approved Dark Theme Tokens

| Semantic token | Value |
| --- | --- |
| Canvas | `#0B0F14` |
| Surface | `#121821` |
| Surface raised | `#18212C` |
| Border | `#2A3543` |
| Primary text | `#F3F6F9` |
| Secondary text | `#B7C0CB` |
| Muted text | `#8994A3` |
| Accent | `#4B9CD2` |
| Accent hover | `#67AFE0` |
| Accent muted | `#223E55` |
| Success | `#49B68A` |
| Warning | `#E2B85B` |
| Danger | `#E06C75` |

## Approved Future Light Theme Tokens

These values reserve a compatible future theme. A light theme and theme
control are not part of the initial release.

| Semantic token | Value |
| --- | --- |
| Canvas | `#F7F9FB` |
| Surface | `#FFFFFF` |
| Surface raised | `#EEF2F6` |
| Border | `#D5DCE5` |
| Primary text | `#111820` |
| Secondary text | `#45515F` |
| Muted text | `#667382` |
| Accent | `#276F9F` |
| Accent hover | `#1D5D87` |
| Accent muted | `#DCECF7` |

Status colors for a future light theme require design and contrast
review before that theme is implemented.

The semantic roles above are the approved color tokens for
implementation. Do not reference palette values directly in page or
component code.

Editorial layout

Clean

Minimal ornamentation

---

# Typography

Typography is the primary visual language of Aston Cyber.

The site should earn attention through ideas, structure, and clarity
rather than decoration. Aston Cyber is an editorial cybersecurity
research publication, not a software product. Typography should
communicate authority through proportion, hierarchy, readability, and
restraint rather than sheer size or weight.

Codex should use the following font system consistently across the site.

## Font Families

### Display and Headings

**Font:** Lora
**Fallback stack:**

```css
font-family: "Lora Variable", Georgia, "Times New Roman", serif;
```

**Use for:**

- Hero statements
- Page titles
- Section headings
- Research titles
- Project titles

**Character:**

- Editorial
- Authoritative
- Contemporary
- Measured
- Clear at publication scale

Lora should provide hierarchy without making pages feel promotional,
decorative, nostalgic, or academic for its own sake. Use restrained
semibold weights and publication-scale proportions. Do not use Lora for
ordinary reading text, interface controls, navigation, labels, metadata,
captions, buttons, or the temporary Brand wordmark.

---

### Body and Interface

**Font:** IBM Plex Sans
**Fallback stack:**

```css
font-family: "IBM Plex Sans Variable", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

**Use for:**

- Body copy
- Article content
- Research summaries
- Navigation
- Buttons
- Labels
- Captions
- Metadata
- Forms
- Footer content
- Text-only Brand wordmark

**Character:**

- Technical
- Highly legible
- Contemporary
- Calm
- Suitable for sustained reading

IBM Plex Sans is the default for editorial reading and interface text
unless another role is explicitly defined. Its metrics must be tuned for
comfortable paragraphs and compact, trustworthy interface labels rather
than inherited unchanged from another sans serif.

---

### Code and Technical Labels

**Font:** JetBrains Mono
**Fallback stack:**

```css
font-family: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
```

**Use for:**

- Code blocks
- Inline code
- Terminal output
- Configuration examples
- Technical annotations
- Diagram labels
- Research identifiers
- Hashes
- Commands
- Inline technical labels
- Metadata where a technical tone is useful

**Character:**

- Precise
- Technical
- Highly legible
- Distinct from body text

JetBrains Mono should be used selectively. It should support technical meaning, not become a decorative substitute for body typography.

---

# Font Loading

Use pinned, self-hosted Fontsource variable-font packages:

```tsx
import "@fontsource-variable/ibm-plex-sans";
import "@fontsource-variable/jetbrains-mono";
import "@fontsource-variable/lora";
```

Do not request fonts from Google Fonts or another runtime font service.
Font files must remain part of the static export and use
`font-display: swap`.

---

# Typography Tokens

Codex should define typography through reusable design tokens rather than one-off values.

```css
:root {
  --font-display: "Lora Variable", Georgia, "Times New Roman", serif;
  --font-body: "IBM Plex Sans Variable", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", "SFMono-Regular", Consolas, monospace;

  --text-hero: clamp(2.5rem, 4.5vw, 3.75rem);
  --text-display: clamp(2.25rem, 3.5vw, 3rem);
  --text-h1: clamp(2rem, 3vw, 2.5rem);
  --text-h2: clamp(1.5rem, 2vw, 1.875rem);
  --text-h3: clamp(1.3125rem, 1.8vw, 1.625rem);
  --text-h4: 1.1875rem;
  --text-lead: clamp(1.125rem, 1.5vw, 1.25rem);
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-caption: 0.8125rem;
  --text-code: 0.9375rem;

  --leading-hero: 1.06;
  --leading-display: 1.1;
  --leading-h1: 1.12;
  --leading-h2: 1.2;
  --leading-h3: 1.25;
  --leading-h4: 1.35;
  --leading-lead: 1.6;
  --leading-body-lg: 1.7;
  --leading-body: 1.65;
  --leading-small: 1.5;
  --leading-code: 1.65;

  --tracking-hero: -0.025em;
  --tracking-display: -0.02em;
  --tracking-h1: -0.018em;
  --tracking-h2: -0.012em;
  --tracking-h3: -0.008em;
  --tracking-h4: -0.005em;
  --tracking-lead: 0;
  --tracking-body-lg: 0;
  --tracking-body: 0;
  --tracking-label: 0.08em;
}
```

---

# Type Hierarchy

## Hero

**Font:** Lora
**Weight:** 550
**Size:** `clamp(2.5rem, 4.5vw, 3.75rem)`
**Line height:** `1.06`
**Letter spacing:** `-0.025em`
**Maximum width:** `15ch`

Use for rare primary publication statements. It must remain visibly
authoritative without resembling a product-marketing headline.

Example:

> Advancing Cybersecurity Through Research

Hero copy should be concise. Avoid paragraphs in hero styling.

---

## Display Heading

**Font:** Lora
**Weight:** 550
**Size:** `clamp(2.25rem, 3.5vw, 3rem)`
**Line height:** `1.1`
**Letter spacing:** `-0.02em`
**Maximum width:** `20ch`

Use for major editorial introductions and feature statements. The wider
measure and gentler leading suit Lora while the reduced scale avoids a
promotional composition.

---

## H1

**Font:** Lora
**Weight:** 550
**Size:** `clamp(2rem, 3vw, 2.5rem)`
**Line height:** `1.12`
**Letter spacing:** `-0.018em`

Use once per page for the page title.

---

## H2

**Font:** Lora
**Weight:** 600
**Size:** `clamp(1.5rem, 2vw, 1.875rem)`
**Line height:** `1.2`
**Letter spacing:** `-0.012em`

Use for primary page sections.

---

## H3

**Font:** Lora
**Weight:** 600
**Size:** `clamp(1.3125rem, 1.8vw, 1.625rem)`
**Line height:** `1.25`
**Letter spacing:** `-0.008em`

Use for research titles, project titles, article cards, and grouped subsections.

---

## H4

**Font:** Lora
**Weight:** 600
**Size:** `1.1875rem`
**Line height:** `1.35`
**Letter spacing:** `-0.005em`

Use for small subsections and component-level titles.

---

## Lead Paragraph

**Font:** IBM Plex Sans
**Weight:** 400
**Size:** `1.25rem` on large screens, `1.125rem` on small screens
**Line height:** `1.6`
**Letter spacing:** `0`
**Maximum width:** `62ch`

Use directly beneath page titles and major section headings.

---

## Body Large

**Font:** IBM Plex Sans
**Weight:** 400
**Size:** `1.125rem`
**Line height:** `1.7`
**Letter spacing:** `0`
**Maximum width:** `68ch`

Use for mission statements, featured research descriptions, and important explanatory copy.

---

## Body

**Font:** IBM Plex Sans
**Weight:** 400
**Size:** `1rem`
**Line height:** `1.65`
**Letter spacing:** `0`
**Maximum width:** `70ch`

Use for standard site copy, articles, project descriptions, and documentation.

---

## Navigation

**Font:** IBM Plex Sans
**Weight:** 500
**Size:** `0.875rem`
**Line height:** `1.2`
**Letter spacing:** `0.01em`

Navigation should be compact, restrained, and highly legible.

Do not use all caps for primary navigation.

---

## Eyebrow Label

**Font:** JetBrains Mono
**Weight:** 500
**Size:** `0.75rem`
**Line height:** `1.4`
**Letter spacing:** `0.08em`
**Text transform:** uppercase

Use for:

- Research categories
- Publication types
- Dates
- Section identifiers
- Technical labels
- Small institutional markers

Example:

```text
CURRENT RESEARCH
```

Use sparingly. Eyebrow labels should provide structure, not decoration.

---

## Caption and Metadata

**Font:** IBM Plex Sans
**Weight:** 500
**Size:** `0.8125rem` to `0.875rem`
**Line height:** `1.5`
**Letter spacing:** `0`

Use for dates, authorship, reading time, image captions, and supporting metadata.

---

## Code

**Font:** JetBrains Mono
**Weight:** 400
**Size:** `0.9375rem`
**Line height:** `1.65`
**Letter spacing:** `0`

Use for code blocks, command examples, and technical output.

Inline code may be slightly smaller than surrounding body text.

---

## Buttons and Text Links

**Font:** IBM Plex Sans
**Weight:** 500
**Size:** `0.9375rem`
**Line height:** `1.2`
**Letter spacing:** `0`

Button text should use sentence case.

Examples:

- Explore research
- Read the mission
- View all projects

Avoid vague labels such as:

- Learn more
- Click here
- Submit

---

# Typography Components

Codex should implement reusable typography components or utility classes for:

```text
Hero
Display
PageTitle
SectionTitle
CardTitle
Lead
BodyLarge
Body
Small
Caption
Eyebrow
Code
Navigation
ButtonLabel
```

Do not hard-code typography independently inside page components unless there is a clear design reason.

---

# Recommended Tailwind Mapping

```ts
fontFamily: {
  display: ["var(--font-display)"],
  sans: ["var(--font-body)"],
  mono: ["var(--font-mono)"],
},
fontSize: {
  hero: ["clamp(2.5rem, 4.5vw, 3.75rem)", {
    lineHeight: "1.06",
    letterSpacing: "-0.025em",
  }],
  display: ["clamp(2.25rem, 3.5vw, 3rem)", {
    lineHeight: "1.1",
    letterSpacing: "-0.02em",
  }],
  h1: ["clamp(2rem, 3vw, 2.5rem)", {
    lineHeight: "1.12",
    letterSpacing: "-0.018em",
  }],
  h2: ["clamp(1.5rem, 2vw, 1.875rem)", {
    lineHeight: "1.2",
    letterSpacing: "-0.012em",
  }],
  h3: ["clamp(1.3125rem, 1.8vw, 1.625rem)", {
    lineHeight: "1.25",
    letterSpacing: "-0.008em",
  }],
  bodyLg: ["1.125rem", {
    lineHeight: "1.7",
    letterSpacing: "0",
  }],
  body: ["1rem", {
    lineHeight: "1.65",
    letterSpacing: "0",
  }],
  small: ["0.875rem", {
    lineHeight: "1.5",
  }],
  caption: ["0.8125rem", {
    lineHeight: "1.5",
  }],
  code: ["0.9375rem", {
    lineHeight: "1.65",
  }],
}
```

---

# Phase 2 Foundation Tokens

The following scales complete the approved implementation foundation.
They are intentionally compact. New values require review and an update
to this document before use.

## Spacing

| Token | Value |
| --- | --- |
| `space-1` | `0.25rem` |
| `space-2` | `0.5rem` |
| `space-3` | `0.75rem` |
| `space-4` | `1rem` |
| `space-5` | `1.25rem` |
| `space-6` | `1.5rem` |
| `space-8` | `2rem` |
| `space-10` | `2.5rem` |
| `space-12` | `3rem` |
| `space-16` | `4rem` |
| `space-20` | `5rem` |
| `space-24` | `6rem` |
| `space-32` | `8rem` |

Use `space-16`, `space-20`, and `space-24` for responsive section
padding. Use the smaller values for component rhythm and layout gaps.

## Content Widths

| Token | Value | Purpose |
| --- | --- | --- |
| `width-reading` | `70ch` | Standard prose |
| `width-lead` | `62ch` | Lead paragraphs |
| `width-narrow` | `48rem` | Narrow layouts |
| `width-content` | `80rem` | Maximum site content |

Containers use responsive inline gutters of `space-6` on small screens
and `space-10` from the small breakpoint onward.

## Editorial Composition

The `width-content` container is the institutional canvas, not a signal that
all text should span its full width. Desktop and laptop pages should compose
that canvas with reusable patterns:

- Centered page introductions with a restrained lead measure
- Left-aligned editorial prose within `width-reading`
- Wide feature regions that can use the institutional container
- Balanced two-column and three-column regions
- Full-width feature cards within the constrained container
- Consistent section rhythm using the approved spacing scale

Centering applies to introductions, headings, concise supporting statements,
and action clusters where it improves page-level balance. Long-form prose,
card summaries, metadata, and explanatory copy remain left-aligned.

At wide breakpoints, content measures must not remain visually attached to one
side of an otherwise empty container. Use centered measures, balanced grids,
and intentional whitespace rather than page-specific offsets or arbitrary
widths. Source order must remain logical when columns stack. Layouts must
remain usable at 200% zoom.

The homepage hero, institutional page introductions, and research-index
introduction use the centered-introduction pattern. Homepage and Mission focus
content uses three equal columns at wide widths and a single logical stack at
smaller widths. Featured research uses a wide publication-panel treatment
rather than the standard multi-card archive width.

## Breakpoints

| Token | Value |
| --- | --- |
| `sm` | `40rem` |
| `md` | `48rem` |
| `lg` | `64rem` |
| `xl` | `80rem` |
| `2xl` | `96rem` |

Build mobile-first. Add layout columns only when content has enough
space; do not select breakpoints by device name.

## Radius and Borders

| Token | Value |
| --- | --- |
| `radius-sm` | `0.25rem` |
| `radius-md` | `0.5rem` |
| `radius-lg` | `0.75rem` |
| `radius-full` | `9999px` |
| `border-thin` | `1px` |
| `border-emphasis` | `2px` |

Use `radius-lg` for content surfaces, `radius-md` for controls, and
`radius-sm` for compact technical treatments. Full rounding is reserved
for circular indicators and pill shapes with a defined purpose.

## Elevation

| Token | Value |
| --- | --- |
| `shadow-sm` | `0 1px 2px rgb(0 0 0 / 0.24)` |
| `shadow-md` | `0 12px 32px rgb(0 0 0 / 0.20)` |

Elevation must reinforce the semantic surface hierarchy. Default
surfaces use the small shadow; raised surfaces may use the medium shadow.
Do not use shadows as decoration.

## Interaction and Motion

| Token | Value |
| --- | --- |
| `duration-fast` | `150ms` |
| `duration-standard` | `220ms` |
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` |
| `focus` | Semantic accent token |

Focus indicators use the emphasis border width, the semantic focus
color, and a `space-1` offset. Hover and focus treatments must not move
content. Reduced-motion preferences collapse nonessential animation and
smooth scrolling.

---

# Responsive Typography Rules

- Use fluid sizing with `clamp()` for hero and heading levels.
- Preserve the hierarchy on mobile rather than shrinking every element uniformly.
- Hero text should remain visually dominant on small screens.
- Keep body text at no less than `1rem`.
- Keep interactive text at no less than `0.875rem`.
- Avoid line lengths greater than `70ch`.
- Reduce heading width before reducing font size.
- Prevent widows in major headings where supported.
- Do not allow headings to overflow their containers.
- Use balanced text wrapping for hero and page headings where supported.

Recommended CSS:

```css
.hero,
.page-title,
.section-title {
  text-wrap: balance;
}

p,
li {
  text-wrap: pretty;
}
```

---

# Editorial Rules

- Use sentence case for headings and navigation.
- Reserve uppercase for small labels and technical identifiers.
- Do not use more than three font weights on a single page unless required.
- Avoid center-aligned body copy.
- Left-align research, article, and documentation content.
- Use bold text selectively.
- Do not use italics as a decorative treatment.
- Do not place long paragraphs in Lora.
- Do not use JetBrains Mono for entire sections of prose.
- Maintain strong contrast between headings, body copy, and metadata.
- Use whitespace to create hierarchy before adding borders or visual effects.

---

# Accessibility

- Body text must meet WCAG AA contrast requirements.
- Text should remain readable at 200% browser zoom.
- Do not convey meaning through font weight or color alone.
- Maintain a minimum body size of `16px`.
- Ensure links are distinguishable without relying only on color.
- Support user font scaling and browser defaults.
- Avoid ultra-light font weights.
- Use `font-display: swap`.

---

# Implementation Requirement

Codex should treat this typography system as authoritative.

When building new pages or components:

1. Select the nearest existing typography role.
2. Reuse the existing token or component.
3. Do not introduce a new font family.
4. Do not introduce arbitrary font sizes.
5. Do not change weights or spacing without updating this document.
6. Keep Lora for display and headings, IBM Plex Sans for reading and
   interface roles, and JetBrains Mono for technical context.

The intended result is a site that feels like a modern research institute rather than a conventional cybersecurity company.

---

# Motion

Motion should explain.

Never distract.

Examples:
- Smooth page transitions
- subtle hover effects
- diagrams that animate to teach
- research timelines
- architecture illustrations

Everything should have a purpose.

---

# Graphics

Replace stock imagery with:
- System diagrams
- architecture sketches
- research illustrations
- minimal geometric graphics
- code snippets where appropriate

Do not use shields, locks, hooded figures, matrix effects, neon spectacle, or
other generic cybersecurity iconography. If a layout benefits from a visual
marker, prefer a restrained abstract or technical line treatment implemented
without a new icon dependency. Decorative markers are optional and must never
carry essential meaning.

## Official brand assets

The approved master assets are:

- `public/brand/aston-cyber-logo.svg` for light surfaces;
- `public/brand/aston-cyber-logo-dark.svg` for dark surfaces;
- `public/brand/aston-cyber-icon.svg` for light surfaces; and
- `public/brand/aston-cyber-icon-dark.svg` for dark surfaces.

The master SVGs remain the source of truth. Generated browser and platform
icons belong in `public/icons/` and must not replace or modify the masters.
Approved brand values are charcoal `#2E2E2E`, blue `#4B9CD2`, and reversed
foreground `#FFFFFF`.

The dark shared header and footer use the reversed horizontal logo. The full
logo fits the current 320px header composition, so an icon-only mobile switch
is not required. The logo home links use the accessible name “Aston Cyber
home,” and the decorative image itself has an empty alternative.

The approved homepage hero source is
`public/images/home/aston-cyber-hero.jpg`. It is presented as one decorative
CSS background behind the existing centered hero content. Layered radial and
linear darkening preserves text contrast and fades the artwork into the site
background at both edges. No card, blur, filter, source edit, or duplicate HTML
image is used. The former hero-to-Mission border is removed so the bottom fade
provides the transition.

---

# Voice

Confident.

Thoughtful.

Evidence-driven.

No fear marketing.

Not buzzword centric.

No hype.

Every sentence should feel researched without feeling sterile.

---

# User Experience

The site should feel like:
- a research lab
- a publication
- a design studio
- an engineering notebook
all these combined into one experience.

---

# AI Implementation Rules

This document is the authoritative design specification for Aston Cyber.

Its primary audience is AI implementation agents (such as Codex), with human readers serving as reviewers.

## Requirements

1. This document MUST be treated as the source of truth for all visual and typographic implementation decisions.
2. If another project document conflicts with this specification, this specification takes precedence unless explicitly superseded.
3. Existing design tokens and typography roles MUST be reused before introducing new values.
4. Existing components MUST be reused before creating new component variants.
5. The implementation MUST prioritize consistency over novelty.
6. The implementation MUST NOT introduce new font families, arbitrary spacing values, or alternative color palettes without updating this specification.
7. When multiple valid implementations exist, choose the simplest solution that satisfies this specification.
8. Accessibility, readability, and maintainability MUST take precedence over visual effects.

---

# Specification Language

The following terminology is used throughout this document.

- MUST: Required.
- MUST NOT: Prohibited.
- SHOULD: Strong recommendation unless a documented reason exists.
- MAY: Optional where appropriate.

---

# Design Decision Framework

When implementing new pages or features, apply these principles in order:

1. Teach before you persuade.
2. Publish before you promote.
3. Show evidence before making claims.
4. Simplicity is a feature.
5. The interface should disappear behind the ideas.
6. Research is the product.
7. Design should create trust through clarity, not spectacle.

Any implementation that conflicts with these principles should be reconsidered before development continues.
