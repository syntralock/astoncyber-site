# Scripts

Build-time validation scripts live here. They must not require production secrets or network access.

`validate-content.ts` loads the centralized research repository, validates all
metadata and references, evaluates the single non-public technical fixture, and
checks that draft and fixture identifiers cannot enter RSS or sitemap output.
