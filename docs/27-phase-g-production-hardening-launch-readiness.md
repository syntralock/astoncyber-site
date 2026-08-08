# Aston Cyber
# Phase G: Production Hardening and Launch Readiness

## Status

Repository implementation completed for review on 2026-08-07. Production-
network verification remains open.

This record documents the owner-authorized Phase G implementation from
`23-strategic-remediation-implementation-plan.md`. It does not authorize a
commit, deployment, indexing announcement, or public launch. Phase H still
requires external production verification and explicit owner approval.

## SEO and Metadata

The canonical origin is `https://astoncyber.com`. A typed metadata helper now
provides every public page with a title, description, apex canonical URL, Open
Graph website or article metadata, and Twitter/X summary metadata. The root
layout defines `metadataBase`. Generated sitemap and RSS URLs remain aligned
with the apex origin.

The approved 1731×909 PNG social-preview image is stored at
`public/images/social/aston-cyber-social-card.png`. Shared metadata supplies its
absolute apex URL, actual dimensions, MIME type, and descriptive text to Open
Graph and supplies the corresponding image metadata to Twitter/X. Every public
page, including research pages, inherits it without duplicated page-level
configuration. Twitter/X uses the large-image summary card.

## Structured Data

The root layout publishes an Organization and WebSite graph containing only
approved facts: organization name, canonical URL, approved logo, named founder,
founder profile URL, language, description, and publisher relationship. It does
not invent a legal name, address, employees, size, awards, registration, or
other unsupported attributes.

Each public research detail page publishes ResearchArticle JSON-LD derived from
validated repository metadata, including headline, summary, authors,
publication and modification dates, keywords, version, language, canonical
page, and Aston Cyber publisher reference.

## Crawling and Security Files

The global `noindex, nofollow` metadata was removed. The static `robots.txt`
route permits crawling, identifies the canonical host, and references the apex
sitemap.

`public/.well-known/security.txt` implements the relevant RFC 9116 fields:

- `Contact: mailto:security@astoncyber.com`
- expiry on 2027-08-07;
- preferred language `en`;
- canonical well-known URL; and
- the published responsible-disclosure policy URL.

No encryption key, telephone number, alternate reporting service, or unsupported
communication method is claimed.

## PWA Removal

The Web App Manifest reference and file, standalone display declaration,
192px/512px application icons, and 192px/512px maskable icons were removed.
The repository contains no service worker, offline behavior, or install prompt.

The approved SVG and ICO favicons, explicit 16px/32px/48px PNG favicons, and
Apple Touch Icon remain as standard browser and platform identity assets.

## Accessibility and Long-Document Usability

- Active mobile navigation now uses approved blue with dark foreground and
  added weight, providing a non-color cue and AA contrast.
- Inline links in editorial and research content explicitly retain underlines.
- Forced-color mode preserves link identification and active-navigation state.
- The remaining Callout heading level was corrected from level four to level
  three.
- Research reports now receive stable generated heading anchors and a static,
  keyboard-accessible top-level contents navigation without client JavaScript.

## Performance and Hosting Configuration

The approved 2840×1890 hero source remains unchanged. Visually equivalent 960px
and 1600px derivatives are selected at responsive breakpoints, reducing the
decorative background transfer for smaller displays without changing crop,
color, overlays, or layout.

Azure Static Web Apps configuration now assigns one-year immutable caching only
to content-hashed `/_next/static/*` assets. Existing CSP, cross-origin,
permissions, referrer, and content-type policies remain. HSTS is added for one
year with subdomains and without preload; deployed behavior must be verified in
Phase H alongside Cloudflare.

All identified `.DS_Store` artifacts were removed from repository-adjacent
source and export paths, preventing them from being copied into later exports.

## Validation Results

The complete `pnpm validate` suite passed: formatting, ESLint, TypeScript, 221
Vitest tests, environment validation, content validation, the production build,
and the 19-route static export. Generated-output inspection confirmed:

- every public page has a title, description, apex canonical URL, Open Graph
  metadata, and Twitter/X large-image summary metadata;
- every public page references the approved social image through its absolute
  apex URL and declares its actual 1731×909 dimensions;
- JSON-LD parses as valid JSON and contains the Organization, WebSite, and
  ResearchArticle types on their intended pages;
- `robots.txt`, the sitemap, and RSS use `https://astoncyber.com` consistently;
- exported public content pages contain no `noindex`, `nofollow`, or Web App
  Manifest link; Next.js correctly retains `noindex` on generated 404 documents;
- `/.well-known/security.txt` is present in the export;
- removed PWA icons and the Web App Manifest are absent while standard browser
  and Apple icons remain;
- the home, Offerings, Ethos, and research-detail pages have one level-one
  heading, no heading-level skips, and no horizontal overflow at 320px, 375px,
  768px, 1024px, and 1440px;
- responsive hero delivery selects the 960px, 1600px, and full-resolution
  assets at the intended breakpoints;
- the mobile navigation preserves its current-page semantics, and research
  contents navigation exposes keyboard-accessible anchor links; and
- `git diff --check` passes.

## Remaining Work

Before public launch:

1. Deploy through the authorized workflow and complete Phase H external checks
   for canonical routes, crawler files, `security.txt`, TLS, redirects, custom
   404 behavior, security headers, HSTS, caching, and social previews.
2. Complete the outstanding organizational formalities required before
   accepting commercial engagements.
3. Obtain explicit owner launch approval.
