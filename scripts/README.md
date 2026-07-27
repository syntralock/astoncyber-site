# Scripts

Build-time validation scripts live here. They must not require production secrets or network access.

`validate-content.ts` loads the centralized Research, Project, and Lab
repository, validates production metadata and references, and checks that
non-public Research identifiers cannot enter RSS or sitemap output. Technical
fixtures live under `tests/fixtures/content/` and are loaded only by explicit
test utilities.
