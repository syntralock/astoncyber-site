# Aston Cyber
# Phase 10: SEO, Metadata, and Sharing

## Status

Implemented for review on 2026-09-03. Phase 9 Search & Discovery is
intentionally deferred until content volume warrants implementation; it is not
an incomplete phase or a prerequisite for this work.

## Scope completed

- Every public static route uses the shared typed metadata helper for a unique
  title, meaningful description, apex canonical URL, Open Graph metadata, and
  Twitter/X large-image summary metadata.
- Dynamic offering, research, and topic pages derive metadata from their
  validated source records.
- The canonical origin is defined once as `https://astoncyber.com` and reused by
  metadata, sitemap, RSS, robots, structured data, citation metadata, and
  download URLs.
- Public research pages expose citation title, author, publication date,
  revision date, publisher/institution, report type and revision, canonical
  public URL, and the existing downloadable artifact URL.
- Research pages publish evidence-backed `TechArticle` JSON-LD. The root layout
  publishes the approved Organization and WebSite graph.
- The visible breadcrumb model also emits `BreadcrumbList` JSON-LD, preventing
  the UI and structured data from drifting.
- `robots.txt` permits public crawling, identifies the canonical host, and
  references the canonical sitemap. Public pages have no global `noindex` or
  `nofollow`; generated error documents retain framework safety behavior.
- The deterministic sitemap contains active institutional pages, offering
  details, and published research only. Drafts, fixtures, empty Projects and
  Labs collections, and de-emphasized research topic routes remain excluded.
- The Research-only RSS feed uses canonical item URLs, a canonical self link,
  correct channel description and language, and continues to exclude drafts,
  Projects, and Labs.
- The approved static 1200×630 Aston Cyber image remains the robust default for
  every public social card. Content-specific images are intentionally deferred
  until an individual publication has approved artwork; no runtime generation
  system or external service was added.
- Existing RFC 9116 `security.txt` remains in place as previously approved and
  documented. Phase 10 did not invent contact information or broaden the
  security architecture.

## Phase 9 deferment

The current volume of Research, Projects, Labs, and other published material
does not justify dedicated search. The complete Phase 9 design remains in
`22-phase-9-search-discovery-specification.md` for future use. Centralized
public-only loaders preserve a clean future integration boundary, but this
phase adds no search index, route, UI, provider, filtering substitute, or
search-result pagination.

## Production and external boundaries

Repository output can establish canonical URLs and crawler directives, but it
cannot prove or repair DNS, Cloudflare, Azure custom-domain certificates,
platform routing, or production cache behavior. The previously recorded
production state says apex TLS and the query-preserving `www` redirect were
verified. The remaining external action is to deploy the corrected artifact
workflow and confirm that
`https://astoncyber.com/.well-known/security.txt` returns the checked-in file
with HTTP 200. Any later apex certificate failure must be corrected in the
Cloudflare/Azure custom-domain configuration and verified with direct HTTPS
requests to both apex and `www`; it must not be represented as a repository
fix.

## Architectural result

The site remains a deterministic Next.js static export using Server Components,
repository-managed content, strict TypeScript, and no database, CMS,
authentication, analytics, tracking, hosted search, or metadata service.
# Historical status

This SEO implementation record predates Decision 23. Canonical and crawler
controls remain applicable. Pass 3 replaces the previous cybersecurity social
card with the approved-logo 1200×630 Systems Modernization card at
`/images/social/aston-cyber-systems-modernization.png`.
