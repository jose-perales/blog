# Milestone 1 Checklist — Scaffold + Tailwind + Lint/Format + TS Strict + Basic Routes

Use this as a working checklist to implement Milestone 1 only.

## Scope (Milestone 1)

- Next.js App Router project scaffolded and runs locally
- Tailwind CSS working and used for basic layout
- TypeScript strict mode enabled
- ESLint + Prettier configured and runnable via scripts
- Basic routes exist (UI skeleton only; no MDX/DB/auth logic yet)

## Out of scope (don’t implement yet)

- MDX content pipeline, Shiki/rehype-pretty-code, post rendering
- Postgres/Prisma schema, migrations, Docker compose
- Auth.js / NextAuth, sign-up/sign-in logic, sessions
- Likes, comments, view counts, newsletter persistence
- Vitest/RTL and Playwright setup (Milestone 7)

---

## 0) Workspace conventions

- [x] Decide package manager: `npm` (recommended for this repo unless you choose otherwise)
- [x] Ensure Node is available: `node -v` and `npm -v`

**Done when**: You can install deps without errors.

---

## 1) Create the Next.js app (App Router + TypeScript)

- [x] Scaffold with App Router + TS (example):
  - `npm create next-app@latest .` (in an empty folder) or scaffold into a new folder and move files
  - Choose: **App Router: yes**, **TypeScript: yes**, **ESLint: yes**
- [x] Confirm `app/` directory exists and the homepage renders

**Done when**: `npm run dev` starts and you can load `/`.

---

## 2) Enable Tailwind CSS

- [x] Add Tailwind per Next.js + Tailwind docs (or select Tailwind during scaffold if prompted)
- [x] Verify Tailwind is wired:
  - `tailwind.config.*` exists
  - `app/globals.css` includes Tailwind styles (Tailwind v4 uses `@import "tailwindcss";`)
- [x] Replace default landing content with a minimal layout using Tailwind utility classes

**Done when**: Changing a Tailwind class visibly changes UI.

---

## 3) TypeScript strict mode check

- [x] Ensure `tsconfig.json` has `"strict": true`
- [x] Keep the project compiling cleanly with `tsc` checks (Next uses TS during build)

**Done when**: `npm run build` succeeds with no TS errors.

---

## 4) Prettier formatting setup

- [x] Install Prettier tooling:
  - `prettier`
  - `prettier-plugin-tailwindcss`
  - `eslint-config-prettier`
- [x] Add config files:
  - [x] `.prettierrc` (or `prettier.config.*`)
  - [x] `.prettierignore`
- [x] Ensure ESLint and Prettier don’t fight (extend `eslint-config-prettier`)
- [x] Add scripts in `package.json`:
  - [x] `format`: `prettier --write .`
  - [x] `format:check`: `prettier --check .`

**Done when**: `npm run format` reformats files and `npm run format:check` passes.

---

## 5) ESLint setup

- [x] Keep Next.js ESLint enabled
- [x] Make sure lint runs from scripts:
  - [x] `lint`: `eslint .` (Next 16 CLI no longer exposes `next lint`)

**Done when**: `npm run lint` passes on a clean checkout.

---

## 6) Basic routes (skeleton only)

Create page shells that match the future UX, but don’t implement data yet.

### Routes to add

- [x] Home: `/` (list placeholder)
- [x] About: `/about` (simple content)
- [x] Newsletter: `/newsletter` (email input + submit button; no DB yet)
- [x] Auth:
  - [x] Sign in: `/auth/sign-in` (email + password; no real auth yet)
  - [x] Sign up: `/auth/sign-up` (email + password + display name; no real auth yet)
- [x] Post page route placeholder:
  - [x] `/posts/[slug]` (render slug and placeholder for future MDX + counts)

### Shared layout

- [x] Add a simple top nav in `app/layout.tsx` linking to:
  - Home
  - About
  - Newsletter
  - Sign in

**Done when**: You can navigate between routes without errors.

---

## 7) Minimal UI constraints

- [x] Do not add extra pages/features (no search, tag pages, pagination, admin, etc.)
- [x] Keep styling simple and consistent using Tailwind only

**Done when**: Pages exist and look coherent, but remain minimal.

---

## 8) Verification checklist (Milestone 1 exit criteria)

Run these locally:

- [x] `npm run dev` (starts successfully)
- [x] `npm run lint` (passes)
- [x] `npm run format:check` (passes)
- [x] `npm run build` (passes)

Manual checks:

- [x] `/` renders
- [x] `/about` renders
- [x] `/newsletter` renders
- [x] `/auth/sign-in` renders
- [x] `/auth/sign-up` renders
- [x] `/posts/test-slug` renders

---

## Notes for Milestone 2 handoff

- Keep route structure stable: `/posts/[slug]`, `/newsletter`, `/auth/*`
- Avoid implementing MDX now; leave placeholders where MDX content will render
- Keep components small and colocated; don’t over-architect
