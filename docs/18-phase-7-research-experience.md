# 18 – Phase 7 Research Experience

## Status

Phase 7 research experience implemented for review. Phase 8 has not begun.

## Implemented scope

Phase 7 publishes the first owner-approved Aston Cyber research report:

- **Title:** Secure Transaction Authorization Ledger
- **Author:** Matthew T. Aston
- **Publication date:** July 1, 2026
- **Revision:** 1.0
- **Research type:** Case study
- **Disclosure status:** Not applicable

The publication documents a synthetic graduate secure-systems prototype. The
prominent publication note preserves the approved qualification that it is not
a production financial platform, legal opinion, or claim of fraud-prevention
effectiveness in a live institution.

The public experience includes:

- A featured-research section on the institutional homepage
- `/research`
- `/research/[slug]`
- `/research/topics`
- `/research/topics/[slug]`
- Public-only RSS and sitemap entries
- The original downloadable DOCX manuscript

No Related Research section renders because no other eligible public report
exists. The section is omitted rather than populated with fixtures or
placeholder cards.

## Publication and content architecture

The canonical author manuscript is:

```text
public/downloads/research/secure-transaction-authorization-ledger/
  Secure_Transaction_Authorization_Ledger_Case_Study.docx
```

The DOCX remains the original downloadable artifact. The corresponding
repository MDX file is an editorial web representation that preserves the
manuscript's meaning, technical claims, qualifications, attribution,
limitations, references, appendices, and evaluation claims matrix. Phase 7
adds no DOCX ingestion, automated conversion, editorial workflow, PDF
generation, or general publishing platform.

Front matter now supports the approved `case-study` research type and
`published` status, together with optional subtitle, project, revision,
publication note, keywords, and a strictly validated DOCX artifact reference.
Public research must use `status: published`. Artifact media type and
repository-relative download path are allowlisted, and content validation
fails when a referenced artifact is absent.

The author registry stores the approved public author name and affiliation.
The topic and tag registries contain only conservative identifiers derived
from the manuscript's subject matter and keywords.

## Static routes and discovery boundary

All research routes are Server Components and are statically exported.
`generateStaticParams` derives detail and topic routes only from
`getPublicResearch()`. The centralized content API additionally provides:

- `getPublicResearchTopics()`
- `getPublicResearchByTopic()`
- `evaluateResearchBody()`

Topic views use ordinary links and statically generated results. They introduce
no client-side filtering state, runtime query service, or search index. Format,
year, and status remain visible metadata; dedicated filter routes are omitted
until multiple public reports make those views useful.

Search is explicitly excluded from Phase 7. Cross-collection discovery,
pagination, and any later approved search experience remain Phase 9 work.
Phase 9 must reuse rather than duplicate the Phase 7 research topic routes.

## Visibility and generated outputs

The Phase 5 visibility boundary remains unchanged:

- `public` research may enter routes, indexes, RSS, and sitemap output.
- `draft` research enters none of those publication surfaces.
- `fixture` research enters none of those publication surfaces.

The existing content-system fixture remains in the repository solely for
technical validation. It is absent from homepage content, research routes,
topic indexes, static parameters, RSS, sitemap output, and the production
export.

RSS is generated from the public report only. The sitemap includes the
research index, topic index, two derived topic routes, and the report detail
route. The original DOCX is copied by the static export and remains available
at its validated public URL.

## Accessibility and print

- Every research route has one page-level heading and a current-page
  breadcrumb.
- Archive and topic views use semantic headings, lists, articles, links,
  metadata, and existing keyboard-visible focus treatment.
- Topic filtering remains fully operable without JavaScript.
- The publication note is a prominent semantic aside.
- The report preserves readable line length and hierarchical Lora headings,
  IBM Plex Sans body text, and JetBrains Mono code treatment.
- Code blocks scroll horizontally when required rather than forcing page
  overflow.
- Print styles remove the shared navigation shell, use black text on a white
  background, remove surface shadows, and allow the report to use the
  printable width.
- No image, interactive widget, or new Client Component was introduced.

## Testing and validation

Focused tests cover:

- Approved metadata, author affiliation, references, dates, revision,
  disclosure state, and artifact path
- Public research and topic static parameters
- Research index, detail, topic index, and topic-detail rendering
- Search and client-side filter absence
- Complete publication-note, claims-matrix, citation, and download rendering
- Related Research omission when no eligible report exists
- Draft and fixture exclusion from public loaders and publication surfaces
- Homepage featured-research composition
- Sitemap inclusion for public research and topic routes

Run:

```text
CI=true pnpm install --frozen-lockfile
pnpm validate
git diff --check
```

The exported routes, RSS, sitemap, fixture leakage, artifact copy, print
presentation, responsive overflow, focus visibility, and absence of new
research-page client JavaScript must also be reviewed before approval.

## Dependencies

No dependency was added. The implementation uses the existing Next.js static
export, React Server Components, `@mdx-js/mdx`, Zod, YAML, shared component
library, and content validation architecture.

## Security considerations

The Phase 5 structural MDX safety boundary remains unchanged: raw HTML,
scripts, imports, exports, JavaScript expressions, spread attributes, unknown
components, and non-static allowlisted component attributes fail compilation.
Zod continues to reject unknown front-matter keys and invalid publication
states. All route generation uses the public-only loader.

The artifact schema accepts only repository-local download paths and the
approved DOCX media type. No remote asset request, runtime content fetch,
third-party script, secret, form, CMS, authentication system, or database was
added.

## Known limitations and deferred work

- Related Research remains omitted until another eligible public report exists.
- Dedicated static format, year, or status filter views remain deferred until
  the public collection can produce useful results.
- Search, cross-collection discovery, and pagination remain Phase 9.
- Projects, Writing, Labs, Speaking, People publication, and companion-article
  experiences remain outside Phase 7.
- DOCX ingestion, conversion automation, PDF generation, and broader editorial
  workflow remain future decisions.
- Complete SEO, social previews, structured data, and metadata validation
  remain Phase 10.
- The Phase 5 fixture remains a non-public validation artifact.

## Phase 7.1 approved refinement

Before Phase 7 approval, the institutional and research compositions receive a
focused responsive refinement:

- Homepage, Mission, and Research introductions are centered within restrained
  measures while prose remains left-aligned.
- Homepage and Mission focus content uses three equal columns at wide widths.
- Featured research uses a wide flagship publication panel.
- The homepage contact callout remains a static link to `/contact`; no form,
  subscription, or newsletter capability is introduced.
- Current primary navigation is Home, Research, Projects, Labs, and About.
  Mission remains a published secondary institutional page; Writing is removed
  and Speaking remains withheld until approved content exists.
- The homepage three-pillar group is governed by the Mission heading and may
  use only the approved decorative, `aria-hidden`, project-native line icons.
- The homepage hero heading uses a wider responsive measure so it fits naturally
  on one line at common desktop widths without a hard-coded break.
- The About page omits its duplicate inline Contact link because Contact remains
  available in the global footer.
- Existing typography, semantic colors, tokens, static routes, content
  visibility, print behavior, and successful mobile presentation remain
  authoritative.
- Cybersecurity cliché imagery and a new icon dependency are prohibited.
