# Copilot Instructions — Career Blog

## Non-negotiables

- Use Next.js App Router + React + TypeScript (`strict`).
- Use Tailwind CSS for styling.
- Implement **only** the UX described in `.github/prompts/PLANNING_PROMPT.md` (no extra pages/features).
- Keep changes minimal and consistent with existing code.

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

- Add tests only when the plan/milestone calls for them.
- When you change code, run the narrowest relevant checks (lint/build/test) when feasible.
