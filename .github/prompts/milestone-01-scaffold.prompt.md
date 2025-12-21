# Milestone 01 — Scaffold (Prompt File)

## Objective

Implement Milestone 1 from `.github/prompts/PLANNING_PROMPT.md`: scaffold the app with Tailwind, lint/format, TypeScript strict, and basic route shells.

## Inputs

- Source of truth: `.github/prompts/PLANNING_PROMPT.md` (Milestones section)
- Execution checklist: `checklists/milestone-1-scaffold.md`

## Scope (do this)

- Create/verify Next.js App Router + TypeScript project scaffold.
- Configure Tailwind CSS.
- Configure ESLint + Prettier and add scripts (`lint`, `format`, `format:check`).
- Ensure TypeScript strict is enabled.
- Add basic route shells only:
  - `/`, `/about`, `/newsletter`, `/auth/sign-in`, `/auth/sign-up`, `/posts/[slug]`
- Add a minimal shared navigation in `app/layout.tsx`.

## Out of scope (do NOT do this)

- No MDX pipeline or post rendering.
- No Postgres/Prisma/Docker.
- No Auth.js / NextAuth implementation.
- No likes/comments/views/newsletter DB persistence.
- No tests setup yet.

## Acceptance criteria (must pass)

- `npm run dev` starts.
- `npm run lint` passes.
- `npm run format:check` passes.
- `npm run build` passes.
- Manual navigation works for all routes listed in Scope.

## Output

Make the required code/config changes and report:

- Files changed
- Commands run and their outcome
- Any follow-ups needed before starting Milestone 2
