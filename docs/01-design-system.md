# Aston Cyber
## Design System

> Security. Engineering. Research.

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

Foundation

Matte Black

Charcoal

White

One accent color: HEX Code: #4B9CD2; RGB Code: 75, 156, 210; CMYK Code: 60, 19, 1, 3

Editorial layout

Clean

Minimal ornamentation

---

# Typography

Typography is the primary visual language of Aston Cyber.

The site should earn attention through ideas, structure, and clarity rather than decoration. Typography should create the hierarchy, rhythm, and personality of the interface.

Codex should use the following font system consistently across the site.

## Font Families

### Display and Headings

**Font:** Sora  
**Fallback stack:**

```css
font-family: "Sora", "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

**Use for:**

- Hero statements
- Page titles
- Section headings
- Research titles
- Project titles
- Large numerical labels
- Major calls to action

**Character:**

- Modern
- Geometric
- Forward-looking
- Confident
- Clear at large sizes

Sora should carry the visual identity of Aston Cyber. It should not be used for long-form body copy.

---

### Body and Interface

**Font:** Inter  
**Fallback stack:**

```css
font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
```

**Use for:**

- Body copy
- Navigation
- Buttons
- Labels
- Captions
- Metadata
- Forms
- Article content
- Research summaries
- Footer content

**Character:**

- Neutral
- Highly legible
- Calm
- Efficient
- Suitable for long-form reading

Inter should disappear into the reading experience. It is the default font for all interface and editorial text unless another role is explicitly defined.

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
- Metadata where a technical tone is useful

**Character:**

- Precise
- Technical
- Highly legible
- Distinct from body text

JetBrains Mono should be used selectively. It should support technical meaning, not become a decorative substitute for body typography.

---

# Font Loading

Use variable font files where supported.

Recommended Google Fonts import:

```css
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Sora:wght@500;600;700&display=swap");
```

For production, prefer framework-native font optimization or self-hosted font files when practical.

For Next.js, use `next/font/google`:

```tsx
import { Inter, JetBrains_Mono, Sora } from "next/font/google";

export const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
```

---

# Typography Tokens

Codex should define typography through reusable design tokens rather than one-off values.

```css
:root {
  --font-display: "Sora", "Inter", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;

  --text-hero: clamp(3.25rem, 7vw, 5rem);
  --text-display: clamp(2.5rem, 5vw, 4rem);
  --text-h1: clamp(2.25rem, 4vw, 3rem);
  --text-h2: clamp(1.75rem, 3vw, 2.25rem);
  --text-h3: clamp(1.375rem, 2vw, 1.75rem);
  --text-h4: 1.25rem;
  --text-body-lg: 1.125rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-caption: 0.75rem;
  --text-code: 0.9375rem;

  --leading-hero: 0.98;
  --leading-heading: 1.1;
  --leading-body: 1.7;
  --leading-small: 1.5;

  --tracking-hero: -0.04em;
  --tracking-heading: -0.025em;
  --tracking-body: -0.01em;
  --tracking-label: 0.08em;
}
```

---

# Type Hierarchy

## Hero

**Font:** Sora  
**Weight:** 700  
**Size:** `clamp(3.25rem, 7vw, 5rem)`  
**Line height:** `0.98`  
**Letter spacing:** `-0.04em`  
**Maximum width:** `14ch`

Use for the primary homepage statement and rare high-impact page introductions.

Example:

> Advancing Cybersecurity Through Research

Hero copy should be concise. Avoid paragraphs in hero styling.

---

## Display Heading

**Font:** Sora  
**Weight:** 700  
**Size:** `clamp(2.5rem, 5vw, 4rem)`  
**Line height:** `1.02`  
**Letter spacing:** `-0.035em`  
**Maximum width:** `18ch`

Use for major campaign statements, mission excerpts, and feature introductions.

---

## H1

**Font:** Sora  
**Weight:** 700  
**Size:** `clamp(2.25rem, 4vw, 3rem)`  
**Line height:** `1.08`  
**Letter spacing:** `-0.03em`

Use once per page for the page title.

---

## H2

**Font:** Sora  
**Weight:** 600  
**Size:** `clamp(1.75rem, 3vw, 2.25rem)`  
**Line height:** `1.15`  
**Letter spacing:** `-0.025em`

Use for primary page sections.

---

## H3

**Font:** Sora  
**Weight:** 600  
**Size:** `clamp(1.375rem, 2vw, 1.75rem)`  
**Line height:** `1.2`  
**Letter spacing:** `-0.02em`

Use for research titles, project titles, article cards, and grouped subsections.

---

## H4

**Font:** Sora  
**Weight:** 600  
**Size:** `1.25rem`  
**Line height:** `1.3`  
**Letter spacing:** `-0.015em`

Use for small subsections and component-level titles.

---

## Lead Paragraph

**Font:** Inter  
**Weight:** 400  
**Size:** `1.25rem` on large screens, `1.125rem` on small screens  
**Line height:** `1.65`  
**Letter spacing:** `-0.015em`  
**Maximum width:** `62ch`

Use directly beneath page titles and major section headings.

---

## Body Large

**Font:** Inter  
**Weight:** 400  
**Size:** `1.125rem`  
**Line height:** `1.75`  
**Letter spacing:** `-0.01em`  
**Maximum width:** `68ch`

Use for mission statements, featured research descriptions, and important explanatory copy.

---

## Body

**Font:** Inter  
**Weight:** 400  
**Size:** `1rem`  
**Line height:** `1.7`  
**Letter spacing:** `-0.005em`  
**Maximum width:** `70ch`

Use for standard site copy, articles, project descriptions, and documentation.

---

## Navigation

**Font:** Inter  
**Weight:** 500  
**Size:** `0.875rem`  
**Line height:** `1.2`  
**Letter spacing:** `0.02em`

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

**Font:** Inter  
**Weight:** 500  
**Size:** `0.75rem` to `0.875rem`  
**Line height:** `1.5`  
**Letter spacing:** `0.01em`

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

**Font:** Inter  
**Weight:** 500  
**Size:** `0.9375rem`  
**Line height:** `1.2`  
**Letter spacing:** `-0.005em`

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
  hero: ["clamp(3.25rem, 7vw, 5rem)", {
    lineHeight: "0.98",
    letterSpacing: "-0.04em",
  }],
  display: ["clamp(2.5rem, 5vw, 4rem)", {
    lineHeight: "1.02",
    letterSpacing: "-0.035em",
  }],
  h1: ["clamp(2.25rem, 4vw, 3rem)", {
    lineHeight: "1.08",
    letterSpacing: "-0.03em",
  }],
  h2: ["clamp(1.75rem, 3vw, 2.25rem)", {
    lineHeight: "1.15",
    letterSpacing: "-0.025em",
  }],
  h3: ["clamp(1.375rem, 2vw, 1.75rem)", {
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
  }],
  bodyLg: ["1.125rem", {
    lineHeight: "1.75",
    letterSpacing: "-0.01em",
  }],
  body: ["1rem", {
    lineHeight: "1.7",
    letterSpacing: "-0.005em",
  }],
  small: ["0.875rem", {
    lineHeight: "1.5",
  }],
  caption: ["0.75rem", {
    lineHeight: "1.5",
  }],
  code: ["0.9375rem", {
    lineHeight: "1.65",
  }],
}
```

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
- Do not place long paragraphs in Sora.
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
6. Keep Sora for identity, Inter for reading, and JetBrains Mono for technical context.

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
