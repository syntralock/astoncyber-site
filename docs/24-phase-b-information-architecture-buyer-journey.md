# 24 – Phase B Information Architecture and Buyer Journey

## Status

Implemented for review on 2026-08-07. Phase C Offerings, Trust, and Contact and
Phase D Homepage and Institutional Repositioning have not begun.

## Objective

Phase B aligns the public route and navigation surface with the approved buyer
journey without prematurely implementing offering claims, trust content, or
homepage repositioning.

## Public architecture

Primary navigation is:

1. Home
2. Offerings
3. Research
4. About

Contact is a distinct restrained header action and remains the first secondary
footer destination. Desktop and mobile primary links continue to use the same
central navigation configuration. The mobile implementation retains the native
`details` and `summary` disclosure pattern.

## Route disposition

- `/offerings` is a static Server Component route with one H1, a concise
  structural explanation, and a Contact link. It does not implement the five
  Phase C offering categories or new claims.
- `/projects` and `/labs` no longer export public collection pages while their
  collections are empty. Their schemas, loaders, policies, fixtures, cards,
  detail components, and future activation architecture remain intact.
- `/people` no longer exports an empty page. Azure Static Web Apps configuration
  permanently redirects its folder route to `/about/` with status 301.
- `/mission` remains published and unchanged pending Phase D consolidation.
- `/ethos` remains published as a secondary principles page and is reachable
  through Mission and the footer.
- Research topic index and detail routes remain intact. The prominent Research
  index link is removed, and topic routes are excluded from the sitemap until
  the publication corpus makes taxonomy more useful.

## Sitemap and canonical origin

The sitemap contains the approved institutional routes, `/offerings/`, the
Research index, and approved public Research details. It excludes People,
Projects, Labs, and research topic routes. The canonical generation origin
remains `https://astoncyber.com`.

## Accessibility and architecture

- Primary navigation retains semantic desktop and mobile landmarks.
- Active primary links and the Contact action retain `aria-current` behavior.
- Existing focus, keyboard, target-size, and responsive rules remain in use.
- The Offerings route has one H1 and uses established institutional components.
- No new dependency, runtime service, or additional Client Component boundary
  was introduced.
- Global `noindex, nofollow` remains unchanged.

## Deferred work

- Complete offering categories, outcomes, credibility, exclusions, trust
  disclosures, and Contact qualification remain Phase C.
- Homepage repositioning, About alignment, Mission consolidation, and related
  institutional copy remain Phase D.
- Research long-document usability remains Phase E.
- Known contrast and broader accessibility remediation remain Phase F.
- Indexing, crawler files, canonical metadata, social metadata, structured data,
  and PWA-signal removal remain Phase G.
# Historical status

Decision 23 supersedes the Offerings, Mission, Ethos, and primary-navigation
architecture documented in this completed phase record.
