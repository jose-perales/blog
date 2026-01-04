# Copilot Instructions — Career Blog

## Non-negotiables

- Use Next.js App Router + React + TypeScript (`strict`).
- Use Tailwind CSS for styling.
- Follow the design system defined in `docs/design-system.md`.
- Implement **only** the UX described in `.github/prompts/PLANNING_PROMPT.md` (no extra pages/features).
- Keep changes minimal and consistent with existing code.

## Design system

- Reference `docs/design-system.md` for all visual decisions.
- Use the defined color palette (dark-first, near-black backgrounds).
- Follow the typography scale (1.25 ratio, 18px base).
- Respect spacing system (4px base unit).
- No decorative elements without function.
- Transitions: 150ms ease for state changes only.

## Milestone discipline

- Work milestone-by-milestone in the order defined in `.github/prompts/PLANNING_PROMPT.md`.
- Do not implement Milestone N+1 concerns early (even if convenient).

## Commands (expected)

- Prefer `npm`.
- Keep scripts working: `dev`, `lint`, `format`, `test`, `test:e2e` (some are added in later milestones).

## UI constraints

- No new pages beyond: Home, Post, Auth, Newsletter, About.
- No search, tag pages, pagination, admin, analytics integrations.

## Testing

- Enforce **Test Driven Development (TDD)**:
  - Prefer writing a failing test first, then implement, then refactor.
  - If TDD is genuinely not feasible for a change (e.g., framework limitation), briefly state why and add the smallest reasonable coverage.
- When you change code, run the narrowest relevant checks (lint/build/test) when feasible.
