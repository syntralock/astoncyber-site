# Aston Cyber Website Development Rules

## 1. Purpose

This document defines the engineering rules for building, reviewing, deploying, and maintaining the Aston Cyber website.

These rules apply from the first commit onward.

They are intended to ensure the website remains:

- Secure
- Accessible
- Maintainable
- Performant
- Consistent
- Reviewable
- Aligned with The Aston Cyber Ethos

Where convenience conflicts with security, accessibility, correctness, or maintainability, the stronger engineering standard takes precedence.

---

# 2. Core Engineering Principles

## 2.1 Secure by Default

Security is not a final launch task.

Security requirements must be considered during:

- Architecture
- Dependency selection
- Component design
- Form handling
- Content rendering
- Deployment
- Monitoring
- Maintenance

No feature is complete until its security impact has been considered.

## 2.2 Simplicity Over Complexity

Prefer the simplest architecture that satisfies the specification.

Do not introduce:

- A database
- A headless CMS
- Authentication
- User accounts
- Third-party scripts
- Client-side state libraries
- Large UI frameworks
- Hosted search services
- Analytics platforms

unless a documented requirement justifies them.

Every new dependency, service, and integration expands the attack surface.

## 2.3 Server First

Prefer:

- Server Components
- Static generation
- Build-time content processing
- Server-side validation
- Minimal browser JavaScript

Use Client Components only when browser interactivity is required.

A component must not be marked as a Client Component merely for convenience.

## 2.4 Evidence Before Assumption

Engineering decisions must be based on:

- The approved specifications
- Measured requirements
- Reproducible testing
- Documented constraints

Do not add functionality based on assumptions about future needs.

## 2.5 Static-First Hosting

Production is hosted on Azure Static Web Apps at `astoncyber.com` and
deployed through GitHub Actions.

Do not introduce an assumption that requires server-side infrastructure
without an explicit architectural review. Prefer static generation,
build-time processing, and platform-native static capabilities.

---

# 3. Repository Rules

## 3.1 Protected Default Branch

The default branch must remain deployable.

Recommended protections:

- Pull requests required
- CI checks required
- Direct pushes restricted
- Force pushes disabled
- Branch deletion restricted
- At least one review before merge

## 3.2 Small, Focused Changes

Each branch and pull request should address one defined objective.

Do not combine unrelated:

- Refactors
- Features
- Dependency upgrades
- Design changes
- Content changes
- Security changes

unless they are inseparable.

## 3.3 No Secrets in Git

Never commit:

- API keys
- Passwords
- Tokens
- Private keys
- Service credentials
- Production environment values
- Sensitive contact information

Use environment variables for secrets.

Provide only placeholders in:

```text
.env.example
```

The repository must include secret scanning.

If a secret is committed, assume it is compromised and rotate it immediately.

## 3.4 Signed and Traceable Work

Commits should be descriptive and traceable to a task or issue.

Recommended commit style:

```text
feat: add research index
fix: correct mobile navigation focus handling
docs: add disclosure process
security: tighten content security policy
```

Signed commits may be used where practical.

---

# 4. Dependency Rules

## 4.1 Minimize Dependencies

Before adding a package, confirm:

1. The requirement cannot be met reasonably with the platform or framework.
2. The package is actively maintained.
3. The package has a clear license.
4. The package does not introduce unnecessary transitive dependencies.
5. The package is compatible with the project architecture.
6. The security and maintenance cost is justified.

Every dependency must have a reason.

## 4.2 Pin and Lock Dependencies

The project must use:

- A committed lockfile
- Reproducible installs
- A supported runtime version
- Automated dependency review
- Automated vulnerability scanning

Do not use floating production dependency versions.

## 4.3 Dependency Updates

Dependency updates should be:

- Reviewed
- Tested
- Merged in small groups
- Checked for breaking changes
- Checked for security advisories

Do not merge automated updates solely because CI is green.

## 4.4 Remove Unused Packages

Unused packages must be removed promptly.

Dead dependencies create:

- Security risk
- Build complexity
- Maintenance overhead
- Larger deployment artifacts

---

# 5. TypeScript and Code Quality Rules

## 5.1 Strict TypeScript

Strict TypeScript must remain enabled.

Avoid:

- `any`
- Unsafe casts
- Ignored type errors
- Suppressed compiler errors
- Unvalidated external data

Use explicit types at system boundaries.

## 5.2 Validate Untrusted Data

Treat all external data as untrusted, including:

- Form submissions
- URL parameters
- Query strings
- Environment variables
- Markdown front matter
- Remote API responses
- Uploaded files
- Build-time content

Validate data before use.

Schema validation should be used for structured content and configuration.

## 5.3 No Silent Error Handling

Do not swallow errors.

Errors should be:

- Handled
- Logged appropriately
- Presented safely to users
- Excluded from leaking sensitive details

Do not expose:

- Stack traces
- Environment values
- Internal paths
- Service credentials
- Raw database or API errors

## 5.4 No Disabled Safety Checks

Do not permanently disable:

- Lint rules
- Type checks
- Security checks
- Accessibility checks
- Tests

Any temporary exception must include:

- A reason
- A linked issue
- A removal plan

---

# 6. Component and Design Rules

## 6.1 Reuse Before Creation

Before creating a component, check whether an existing component can be extended.

Do not create duplicate patterns for:

- Buttons
- Links
- Cards
- Tags
- Headings
- Metadata
- Navigation
- Forms
- Alerts
- Status indicators

## 6.2 No Hardcoded Design Values

Do not hardcode:

- Colors
- Font families
- Font sizes
- Spacing
- Breakpoints
- Border radii
- Shadows
- Motion timings

Use approved design tokens.

## 6.3 Accessibility Before Animation

Motion must never interfere with:

- Reading
- Navigation
- Focus
- Comprehension
- Reduced-motion preferences

Animation must be purposeful, restrained, and optional.

## 6.4 Semantic HTML First

Use native semantic elements before adding custom behavior.

Prefer:

- `button` for actions
- `a` for navigation
- `nav` for navigation regions
- `main` for primary content
- `article` for standalone content
- `section` with headings
- Proper table markup
- Native form controls

Do not recreate native controls with generic elements.

---

# 7. Content Security Rules

## 7.1 Safe MDX Rendering

Content rendering must not permit arbitrary script execution.

Requirements:

- Raw HTML MUST be disabled by default.
- Sanitize rendered HTML where raw HTML is permitted.
- Restrict custom MDX components to an approved allowlist.
- Do not allow content authors to inject scripts or event handlers.
- Validate front matter with Zod at build time.
- Fail the build on malformed required metadata.

## 7.2 External Links

External links must be reviewed.

When opening a new tab, use appropriate protections against opener access.

Do not automatically trust external URLs from content metadata.

## 7.3 Embeds

Third-party embeds are prohibited by default.

Any approved embed must be reviewed for:

- Privacy
- Tracking
- Script execution
- Content Security Policy impact
- Accessibility
- Performance
- Availability risk

Prefer links or locally hosted media over embedded third-party players.

---

# 8. Form Security Rules

## 8.0 Contact Routing

- General inquiries use `info@astoncyber.com`.
- Responsible disclosure and security reports use `security@astoncyber.com` exclusively.

Do not present the general-inquiries mailbox as a security-reporting
channel.

## 8.1 Minimize Forms

Use forms only when necessary.

Prefer a direct email link when it satisfies the requirement.

## 8.2 Server-Side Validation

All form input must be validated on the server.

Client-side validation improves usability but is not a security control.

Validate:

- Required fields
- Length
- Format
- Allowed values
- Character encoding
- Unexpected fields
- Submission size

## 8.3 Abuse Protection

Public forms must include proportionate protection against:

- Spam
- Automated abuse
- Flooding
- Oversized submissions
- Header injection
- Malicious payloads

Use privacy-respecting protections where practical.

## 8.4 Safe Responses

Form responses must not reveal whether:

- A specific internal account exists
- A mailbox is monitored in real time
- Internal routing rules succeeded
- A backend service failed in detail

Return generic, useful messages.

## 8.5 Data Retention

Collect the minimum amount of personal information required.

Document:

- What is collected
- Why it is collected
- Where it is sent
- How long it is retained
- Who can access it

Do not retain form data indefinitely by default.

---

# 9. Authentication and Authorization

Authentication is out of scope for the initial public website.

Do not add:

- User accounts
- Admin panels
- Contributor portals
- Protected dashboards
- Private content systems

without an approved architecture and threat model.

If authentication is introduced later:

- Use a proven identity provider.
- Do not build custom password storage.
- Enforce least privilege.
- Require secure session handling.
- Protect state-changing actions against request forgery.
- Log security-relevant events.
- Review account recovery carefully.

---

# 10. Browser Security Rules

## 10.1 Security Headers

Production must define and test appropriate security headers, including:

- Content Security Policy
- Strict Transport Security
- Referrer Policy
- Permissions Policy
- MIME type protections
- Frame protections through policy
- Cross-origin policies where appropriate

Headers must be tested in the deployed environment.

## 10.2 Content Security Policy

The Content Security Policy should begin restrictive.

Goals:

- No arbitrary inline scripts
- No unauthorized third-party scripts
- No unsafe dynamic code execution
- Explicit source allowlists
- Restricted framing
- Restricted object embedding
- Controlled form destinations
- Controlled base URLs

Do not weaken the policy merely to accommodate an avoidable library.

## 10.3 HTTPS Only

Production traffic must use HTTPS.

Requirements:

- Redirect HTTP to HTTPS
- Use secure cookies if cookies are introduced
- Avoid mixed content
- Verify certificate renewal
- Enable strict transport protections after validation

---

# 11. Privacy Rules

## 11.1 No Tracking by Default

Do not include analytics, advertising, fingerprinting, or behavioral tracking by default.

Any analytics proposal must document:

- Purpose
- Data collected
- Retention
- Legal and privacy implications
- Performance impact
- Alternatives considered

## 11.2 No Unnecessary Cookies

The initial website should operate without nonessential cookies where practical.

Do not introduce cookie banners to justify unnecessary tracking.

## 11.3 Data Minimization

Do not collect data merely because it may be useful later.

Collect only what is necessary for a defined function.

---

# 12. File and Asset Security

## 12.1 Trusted Assets

Only approved assets should enter the repository.

Review:

- File type
- Origin
- License
- Metadata
- Embedded scripts
- Unexpected content

## 12.2 SVG Files

SVG files must be reviewed before use.

Do not treat SVG files as harmless images.

Remove or reject:

- Scripts
- Event handlers
- External resource references
- Embedded active content
- Unnecessary metadata

## 12.3 Uploaded Files

User-uploaded files are out of scope for the initial release.

Do not add file upload functionality without:

- File type validation
- Size limits
- Malware handling strategy
- Isolated storage
- Randomized file names
- Access controls
- Content disposition controls
- Retention rules

## 12.4 Phase 8 Published Resources

Phase 8 Project and Lab resources are repository-controlled static files, not
user uploads.

Approved directly hosted document and data types are:

- PDF
- TXT
- CSV
- JSON
- YAML
- YML
- XML
- Markdown
- PNG (`.png`, `image/png`)
- JPEG (`.jpg` or `.jpeg`, `image/jpeg`)
- WebP (`.webp`, `image/webp`)
- GIF (`.gif`, `image/gif`)

SVG is not an approved Phase 8 directly hosted resource. Normalize extensions
before comparison, require exact MIME agreement, and reject case-variant
bypass attempts.

Do not directly host:

- ZIP archives
- Executables
- Installers
- Compiled binaries
- Libraries
- Shell scripts
- PowerShell scripts
- Batch or command files
- Package artifacts
- Disk images
- Container images
- Opaque binary bundles

Source code and runnable releases must use an approved HTTPS repository URL
whose exact normalized hostname is `github.com` or `gitlab.com`. Validation
must bind every directly hosted resource to an approved extension and MIME pair
and must reject mismatches.

---

# 13. Build and CI Security

## 13.0 Phase 1 Baseline

Phase 1 must establish:

- Content Security Policy planning
- Baseline security headers
- Build-time environment validation
- Secret scanning
- Dependency review
- Least-privilege GitHub Actions permissions
- Preview deployment protections
- Safe repository-based MDX rendering with raw HTML disabled by default

Later hardening phases validate and tighten this baseline; they do not
defer its introduction.

## 13.1 Required Checks

Every pull request must pass:

- Formatting
- Linting
- Type checking
- Tests
- Content schema validation
- Accessibility checks
- Dependency review
- Secret scanning
- Production build

## 13.2 Trusted CI Configuration

CI workflows must:

- Use least-privilege permissions
- Avoid exposing secrets to untrusted code
- Pin third-party actions to reviewed versions or commits
- Separate pull request checks from deployment credentials
- Avoid running untrusted contributions with production secrets

## 13.3 Build Output Review

Production builds must not contain:

- Source secrets
- Development-only data
- Private environment variables
- Internal debug pages
- Draft content
- Non-public technical fixture content or fixture routes
- Unapproved source maps
- Test fixtures exposed as public assets

---

# 14. Deployment Security

The approved deployment target is Azure Static Web Apps, using GitHub
Actions and separate preview and production environments. Deployment
design must preserve the static-first architecture.

## 14.1 Separate Environments

Use separate environments for:

- Local development
- Preview deployments
- Production

Production credentials must not be used locally unless strictly necessary.

## 14.2 Least Privilege

Deployment accounts and tokens must have only the permissions required.

Avoid broad organization-level tokens.

## 14.3 Preview Deployment Safety

Preview deployments must not:

- Index in search engines
- Expose production secrets
- Send real transactional messages unintentionally
- Use production write credentials
- Publish draft research as final

## 14.4 Rollback

Every production release must have a rollback path.

A failed deployment must be reversible without rebuilding the entire project.

---

# 15. Logging and Monitoring

## 15.1 Safe Logging

Do not log:

- Secrets
- Tokens
- Full form submissions
- Sensitive personal information
- Authorization headers
- Raw environment variables

Logs should contain only what is required to diagnose and operate the site.

## 15.2 Error Monitoring

Error monitoring must:

- Redact sensitive data
- Use restricted access
- Avoid collecting full user input by default
- Be reviewed for privacy impact

## 15.3 Uptime and Availability

Production should include basic uptime monitoring for:

- Homepage
- Research index
- Responsible disclosure page
- Contact path

---

# 16. Security Review Requirements

A security review is required before adding:

- A new public form
- Authentication
- File uploads
- A CMS
- A database
- Third-party JavaScript
- Analytics
- Search services
- Embedded media
- Webhooks
- Payment functionality
- User-generated content
- Administrative interfaces

The review should document:

- Assets being protected
- Trust boundaries
- Attack surface
- Abuse cases
- Data flows
- Failure modes
- Mitigations
- Residual risk

---

# 17. Research Publication Security

Research content may involve sensitive findings.

Before publication:

- Confirm disclosure coordination is complete.
- Confirm affected parties have been contacted when appropriate.
- Confirm embargo dates.
- Remove active secrets and credentials.
- Review proof-of-concept material for unnecessary harm.
- Verify that reproduction instructions are proportionate.
- Confirm legal and ethical review where needed.
- Document limitations and uncertainty.
- Record revisions.

Publication speed must not override responsible disclosure.

---

# 18. Code Review Rules

Reviewers must check:

- Specification compliance
- Security impact
- Accessibility
- Type safety
- Error handling
- Dependency changes
- Privacy impact
- Performance
- Test coverage
- Documentation

Security-sensitive code should receive focused review.

Examples:

- Forms
- Headers
- Content rendering
- Redirects
- External links
- Environment handling
- CI workflows
- Deployment configuration

---

# 19. Definition of Done

A feature is complete only when:

- It meets the written acceptance criteria.
- It uses shared components and design tokens.
- It is typed.
- Input is validated.
- Errors are handled safely.
- Accessibility has been tested.
- Security implications have been reviewed.
- Tests pass.
- Documentation is updated.
- No secrets or sensitive data are exposed.
- The production build succeeds.

---

# 20. Prohibited Practices

Do not:

- Commit secrets
- Disable security checks without documentation
- Use `any` to bypass type design
- Render unsanitized untrusted HTML
- Trust client-side validation
- Add dependencies without justification
- Add third-party scripts casually
- Log sensitive data
- Expose stack traces to users
- Build custom authentication casually
- Use production credentials in previews
- Merge failing CI
- Publish research before disclosure review
- Add tracking by default
- Hardcode design values
- Duplicate existing components
- Treat security as a pre-launch cleanup task

---

# 21. Security Baseline Checklist

Before the first public launch:

- [ ] Default branch protections are enabled
- [ ] Secret scanning is enabled
- [ ] Dependency scanning is enabled
- [ ] Lockfile is committed
- [ ] Strict TypeScript passes
- [ ] Content schemas validate
- [ ] Draft content is excluded
- [ ] Technical fixtures are excluded from public loaders, routes, navigation,
      RSS, sitemap output, and other publication surfaces
- [ ] Forms use server-side validation
- [ ] Security headers are configured
- [ ] Content Security Policy is tested
- [ ] HTTPS is enforced
- [ ] No unnecessary third-party scripts are present
- [ ] No unnecessary cookies are present
- [ ] Privacy notice matches actual behavior
- [ ] Responsible disclosure page is published
- [ ] RFC 9116 `/.well-known/security.txt` is published with `Contact: mailto:security@astoncyber.com`
- [ ] SVG assets have been reviewed
- [ ] CI permissions follow least privilege
- [ ] Preview deployments do not expose production secrets
- [ ] Error monitoring redacts sensitive data
- [ ] Uptime monitoring is active
- [ ] Rollback procedure is documented
- [ ] Accessibility checks pass
- [ ] Production build contains no secrets or draft content

---

# 22. Final Rule

Aston Cyber should not merely publish about security.

Its own website should demonstrate disciplined, proportionate, and transparent security engineering from the beginning.
