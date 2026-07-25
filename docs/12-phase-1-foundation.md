# 12 – Phase 1 Foundation

## Status

Phase 1 engineering foundation implemented for review. Phase 2 has not begun.

## Runtime and application

- Node.js 24 LTS, pinned through `.node-version` and `package.json`
- pnpm 11 with a generated lockfile prepared for the Phase 1 commit and
  frozen CI installs
- Next.js App Router with strict TypeScript
- Static HTML export to `out/` for Azure Static Web Apps
- Tailwind CSS v4 with the approved dark semantic color roles
- Project-native, replaceable text-only `Brand` component

The approved documents require a supported Node.js version but do not
name a major release. Node.js 24 was selected because it is the active
LTS line at implementation time. This choice should be reviewed during
routine dependency maintenance.

## Content foundation

The initial content boundary uses repository-based MDX. YAML metadata is
validated with Zod at build time. MDX JSX elements are rejected unless
their component name appears in the explicit allowlist. Lowercase raw
HTML elements are not in that allowlist and therefore fail validation.
The enforcement is structural and compiler-based: a remark plugin
examines the MDX abstract syntax tree produced by `@mdx-js/mdx`.

The plugin rejects raw HTML/JSX elements outside the component allowlist,
including nested and mixed-case elements. It also rejects `mdxjsEsm`,
flow and text expressions, JSX expression attributes, and spread
attributes. Content therefore cannot import or export modules, evaluate
JavaScript expressions, add event-handler expressions, or introduce
script elements. Static string attributes on allowlisted components are
permitted. The regular expression in `parseResearchSource` only extracts
the required front-matter envelope; it is not the content security
boundary. Parsed YAML is passed through a strict Zod object schema, so
missing, malformed, or unknown metadata fails the build.

The single research file is draft, explicitly labeled non-production
placeholder material, and exists only to prove the pipeline. No public
research route or publication vertical slice is included.

## Security baseline

`public/staticwebapp.config.json` provides static-host-compatible
headers. The baseline CSP defaults all sources to the same origin,
disables objects and framing, restricts forms and base URLs, and permits
no third-party origins.

Next.js currently emits inline bootstrap scripts for static exports, so
the Phase 1 policy includes `'unsafe-inline'` in `script-src`. Tailwind
and framework output also require inline styles, so `style-src` includes
the same compatibility allowance. Phase 11 must test the deployed
headers and evaluate generated script hashes or nonces before removing
these allowances. The policy must not be weakened to add avoidable
third-party code.

Preview and placeholder builds include `noindex, nofollow` metadata.
The deployment workflow does not make production application secrets
available to the build. Pull-request previews run only for branches in
this repository, not forks, and use only the Azure deployment token.

Safe external-link attributes are centralized in `lib/external-link.ts`.
There are no analytics, trackers, embeds, remote runtime assets, forms,
cookies, database connections, CMS integrations, or third-party scripts.

## Quality and repository controls

The `pnpm validate` sequence runs formatting, ESLint, strict type
checking, Vitest tests, environment validation, content validation, and
the production static build. GitHub Actions mirrors that sequence using
frozen installs and least-privilege permissions.

Additional repository controls include dependency review, Gitleaks
secret scanning, CodeQL analysis, Dependabot for npm and GitHub Actions,
and issue and pull-request templates. Branch protection, GitHub-native
secret scanning, and preview environment policy still require
repository-settings verification by an owner.

The dependency tree overrides vulnerable Next.js transitive versions of
`sharp` and `postcss` with patched releases.

### Accepted development-tool advisory

- Advisory: `GHSA-mh99-v99m-4gvg` / `CVE-2026-14257`
- Severity: High (`CVSS 7.5`)
- Affected package in this lockfile: `brace-expansion@1.1.16`
- Primary paths:
  - `astoncyber-site` → `eslint@9.39.5` → `minimatch@3.1.5` →
    `brace-expansion@1.1.16`
  - `astoncyber-site` → `eslint@9.39.5` →
    `@eslint/config-array@0.21.2` → `minimatch@3.1.5` →
    `brace-expansion@1.1.16`
  - `astoncyber-site` → `eslint@9.39.5` →
    `@eslint/eslintrc@3.3.6` → `minimatch@3.1.5` →
    `brace-expansion@1.1.16`
  - `astoncyber-site` → `serve@14.2.6` → `serve-handler@6.1.7` →
    `minimatch@3.1.5` → `brace-expansion@1.1.16`
- Scope: Development tooling only. Neither `brace-expansion`,
  `minimatch`, ESLint, nor `serve` is copied into the static `out/`
  deployment.
- Exploitability here: Remote production exploitation is not applicable
  because the deployed site is static. ESLint receives only
  repository-controlled glob patterns. The local static preview is
  explicitly bound to `127.0.0.1` and must not be exposed to an
  untrusted network. The residual risk is a local denial of service if a
  developer deliberately supplies a malicious brace pattern to affected
  tooling.
- Exception: Only `GHSA-mh99-v99m-4gvg` is acknowledged in pnpm audit
  and dependency review. No advisory family, severity class, or package
  is broadly suppressed.
- Mitigation: Force-upgrading `brace-expansion` to 5.0.8 was tested and
  rejected because it breaks the CommonJS function API required by
  `minimatch@3`. ESLint 10 was also tested and is not yet compatible with
  the React lint plugin used by `eslint-config-next`. Inputs remain
  trusted and the affected tools remain development-only.
- Removal condition: Remove the exception immediately when the Next.js
  ESLint stack and `serve-handler` resolve to a compatible patched
  `brace-expansion`, or replace either affected tool sooner if a
  compatible maintained alternative removes the path.
- Review policy: Review the exception whenever Dependabot proposes a
  compatible dependency path and during scheduled dependency
  maintenance. Remove it immediately once the upstream dependency chain
  supports a compatible patched version. If it has not already been
  removed, re-evaluate it within one year of its initial acceptance.

## Azure Static Web Apps

The existing Azure workflow was retained and updated rather than
recreated. It now installs with pnpm, runs the complete validation
sequence, uploads the prebuilt `out/` directory as a short-lived
artifact, and deploys that exact artifact from a separate job. Pull
request code never runs in the job that receives the Azure deployment
token. Fork pull requests may validate and create an Actions artifact,
but they cannot deploy. Only same-repository pull requests receive Azure
preview deployments, and closed same-repository pull requests close
their preview environment. The deployment token remains an input from
the existing GitHub Secret; it is not available to build steps.

`staticwebapp.config.json` is stored in `public/`, copied to the root of
`out/` by Next.js, and deployed with that artifact. Its `globalHeaders`
shape and header strings follow Azure Static Web Apps configuration.
The workflow does not create or rename an Azure Static Web App, create
resources, change DNS, or assume an API or server runtime.

## Deferred work

- Final font loading and the complete design-token system (Phase 2)
- Shared site shell, seven-item navigation, mobile navigation, footer,
  and skip link (Phase 3)
- Minimum component library required by the research slice (Phase 4)
- Complete research-content vertical slice (Phase 5)
- Institutional pages and production content (Phase 6 onward)
- Final logo and favicon package
- Deployed CSP/header validation and hardening
- Public responsible-disclosure page and reviewed RFC 9116 file
- Repository setting verification for branch protection, secret
  scanning, required checks, and environment protections
