# Contributing to Aston Cyber

Thank you for contributing to the Aston Cyber website.

This repository is built with a security-first, documentation-driven workflow. Every change should improve the project without compromising maintainability, accessibility, or security.

---

# Before You Start

Read these documents before making code changes:

- README.md
- docs/06-website-specification.md
- docs/07-website-project-plan.md
- docs/09-development-rules.md
- docs/10-architecture-decision-record.md

If documentation and implementation disagree, update the documentation through review rather than making undocumented architectural changes.

---

# Development Workflow

1. Work on one phase at a time.
2. Keep changes focused.
3. Explain architectural decisions in pull requests.
4. Test before committing.
5. Keep `main` deployable.

---

# Branching

Use descriptive branch names such as:

- feature/navigation
- feature/research-library
- fix/mobile-menu
- docs/project-plan
- security/csp

Do not work directly on `main` unless explicitly approved.

---

# Commit Messages

Use Conventional Commits where practical.

Examples:

- feat: add research card component
- fix: improve keyboard navigation
- docs: update architecture decision record
- refactor: simplify navigation layout
- security: tighten content security policy
- chore: update dependencies

---

# Coding Standards

- TypeScript strict mode
- Reusable components
- Semantic HTML
- Accessibility first
- Server Components by default
- Client Components only when required
- No hardcoded design values
- No unnecessary dependencies

---

# Security Expectations

Never:

- Commit secrets
- Disable security checks without review
- Trust client-side validation
- Render untrusted HTML
- Add third-party scripts casually

Review security implications before introducing:

- Forms
- Authentication
- External APIs
- Analytics
- Embeds
- File uploads

---

# Testing

Before submitting changes, ensure:

- Linting passes
- Type checking passes
- Tests pass
- Production build succeeds
- Accessibility issues are addressed

---

# Documentation

Documentation is part of the product.

Whenever architecture, workflow, or behavior changes:

- Update the relevant document.
- Keep examples current.
- Record significant architectural decisions in the ADR.

---

# AI Contributor Guidance

If you are an AI coding assistant:

1. Read the repository documentation before generating code.
2. Do not invent architecture.
3. Do not skip project phases.
4. Prefer modifying existing components over creating duplicates.
5. Explain significant implementation decisions.
6. Stop after completing the requested phase and wait for review.

---

# Definition of Done

A task is complete only when:

- Requirements are met.
- Code is reviewed.
- Tests pass.
- Documentation is updated.
- Security implications are addressed.
- The repository builds successfully.

---

Build deliberately. Review carefully. Prefer clarity over cleverness.
