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
- [ ] Decide package manager: `npm` (recommended for this repo unless you choose otherwise)
- [ ] Ensure Node is available: `node -v` and `npm -v`

**Done when**: You can install deps without errors.

---

## 1) Create the Next.js app (App Router + TypeScript)
- [ ] Scaffold with App Router + TS (example):
  - `npm create next-app@latest .` (in an empty folder) or scaffold into a new folder and move files
  - Choose: **App Router: yes**, **TypeScript: yes**, **ESLint: yes**
- [ ] Confirm `app/` directory exists and the homepage renders

**Done when**: `npm run dev` starts and you can load `/`.

---

## 2) Enable Tailwind CSS
- [ ] Add Tailwind per Next.js + Tailwind docs (or select Tailwind during scaffold if prompted)
- [ ] Verify Tailwind is wired:
  - `tailwind.config.*` exists
  - `app/globals.css` includes Tailwind directives (`@tailwind base;`, etc.)
- [ ] Replace default landing content with a minimal layout using Tailwind utility classes

**Done when**: Changing a Tailwind class visibly changes UI.

---

## 3) TypeScript strict mode check
- [ ] Ensure `tsconfig.json` has `"strict": true`
- [ ] Keep the project compiling cleanly with `tsc` checks (Next uses TS during build)

**Done when**: `npm run build` succeeds with no TS errors.

---

## 4) Prettier formatting setup
- [ ] Install Prettier tooling:
  - `prettier`
  - `prettier-plugin-tailwindcss`
  - `eslint-config-prettier`
- [ ] Add config files:
  - [ ] `.prettierrc` (or `prettier.config.*`)
  - [ ] `.prettierignore`
- [ ] Ensure ESLint and Prettier don’t fight (extend `eslint-config-prettier`)
- [ ] Add scripts in `package.json`:
  - [ ] `format`: `prettier --write .`
  - [ ] `format:check`: `prettier --check .`

**Done when**: `npm run format` reformats files and `npm run format:check` passes.

---

## 5) ESLint setup
- [ ] Keep Next.js ESLint enabled
- [ ] Make sure lint runs from scripts:
  - [ ] `lint`: `next lint`

**Done when**: `npm run lint` passes on a clean checkout.

---

## 6) Basic routes (skeleton only)
Create page shells that match the future UX, but don’t implement data yet.

### Routes to add
- [ ] Home: `/` (list placeholder)
- [ ] About: `/about` (simple content)
- [ ] Newsletter: `/newsletter` (email input + submit button; no DB yet)
- [ ] Auth:
  - [ ] Sign in: `/auth/sign-in` (email + password; no real auth yet)
  - [ ] Sign up: `/auth/sign-up` (email + password + display name; no real auth yet)
- [ ] Post page route placeholder:
  - [ ] `/posts/[slug]` (render slug and placeholder for future MDX + counts)

### Shared layout
- [ ] Add a simple top nav in `app/layout.tsx` linking to:
  - Home
  - About
  - Newsletter
  - Sign in

**Done when**: You can navigate between routes without errors.

---

## 7) Minimal UI constraints
- [ ] Do not add extra pages/features (no search, tag pages, pagination, admin, etc.)
- [ ] Keep styling simple and consistent using Tailwind only

**Done when**: Pages exist and look coherent, but remain minimal.

---

## 8) Verification checklist (Milestone 1 exit criteria)
Run these locally:
- [ ] `npm run dev` (starts successfully)
- [ ] `npm run lint` (passes)
- [ ] `npm run format:check` (passes)
- [ ] `npm run build` (passes)

Manual checks:
- [ ] `/` renders
- [ ] `/about` renders
- [ ] `/newsletter` renders
- [ ] `/auth/sign-in` renders
- [ ] `/auth/sign-up` renders
- [ ] `/posts/test-slug` renders

---

## Notes for Milestone 2 handoff
- Keep route structure stable: `/posts/[slug]`, `/newsletter`, `/auth/*`
- Avoid implementing MDX now; leave placeholders where MDX content will render
- Keep components small and colocated; don’t over-architect
