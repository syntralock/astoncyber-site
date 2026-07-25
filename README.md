# Aston Cyber

The Aston Cyber website is a ground-up rebuild for an independent cybersecurity research institution focused on research, engineering, and education.

Aston Cyber is not a consultancy, managed security provider, SaaS company, or marketing website.

This repository is the single source of truth for the website.

## Project Documentation

All planning documents are located in the `/docs` directory.

Development must follow the guidance in:

- 00 – Brand Identity Brief
- 01 – Design System
- 02 – Navigation
- 03 – Organization
- 04 – Content Strategy
- 05 – The Aston Cyber Ethos
- 06 – Website Specification
- 07 – Website Project Plan
- 08 – Build Instructions
- 09 – Development Rules
- 10 – Architecture Decision Record
- 11 – Phase 0 Decisions

## Current Status

**Current Phase:** Phase 0 Completion / Phase 1 Readiness

Implementation has not officially begun. The approved Phase 0 decisions are recorded in `docs/11-phase-0-decisions.md`; the engineering foundation will be completed before any page or feature implementation begins.

## Engineering Principles

- Security by default
- Accessibility by default
- Simplicity over complexity
- Server-first architecture
- Strict TypeScript
- Shared components and design tokens
- Small, reviewable changes
- No undocumented architectural decisions

## Repository Structure

```text
docs/      Project planning and specifications
assets/    Brand assets and media
app/        Website application (created during implementation)
public/     Static public assets
```

## Contribution Workflow

1. Review the documentation in `/docs`.
2. Implement one project phase at a time.
3. Keep commits focused and descriptive.
4. Ensure linting, type checking, testing, and security checks pass before merging.
5. Never commit secrets or sensitive information.

## License

Copyright © Aston Cyber. All rights reserved.
