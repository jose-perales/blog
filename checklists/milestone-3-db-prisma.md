# Milestone 3 Checklist — Postgres + Prisma + Migrations + DB Connectivity

Use this checklist to implement Milestone 3 only.

## Scope (Milestone 3)

- Local Postgres via Docker Compose
- Environment variables for DB connection
- Prisma setup:
  - `schema.prisma`
  - migrations
  - Prisma Client generation
- A minimal DB connectivity proof in the app (no auth/features yet)

## Out of scope (don’t implement yet)

- Auth.js / NextAuth (Milestone 4)
- Views/likes/comments endpoints and UI wiring (Milestone 5)
- Newsletter persistence endpoint and UI wiring (Milestone 6)
- Tests (Milestone 7)

---

## 0) Prereqs

- [x] Milestone 2 merged and `npm run build` passes
- [x] Docker is available locally

**Done when**: You can run the app and Docker before adding DB.

---

## 1) Add Docker Compose for Postgres (local dev)

- [x] Add `docker-compose.yml` at repo root with:
  - `postgres` image
  - mapped port (usually `5432:5432`)
  - persisted volume
  - `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`
- [x] Add a `.env.example` documenting required env vars
- [x] Add `.env` to `.gitignore` (should already be ignored)

**Done when**: `docker compose up -d` starts Postgres and it stays healthy.

---

## 2) Define environment variables

- [x] Add `DATABASE_URL` (Prisma format), for example:
  - `postgresql://USER:PASSWORD@localhost:5432/DB?schema=public`
- [x] Ensure the app does not crash at runtime if `DATABASE_URL` is missing (fail fast with a clear message is OK)

**Done when**: `DATABASE_URL` is documented and works locally.

---

## 3) Initialize Prisma

- [x] Install Prisma deps:
  - `prisma` (dev)
  - `@prisma/client`
- [x] Create `prisma/schema.prisma`
  - datasource: `postgresql`
  - generator: `prisma-client-js`
- [x] Add scripts to `package.json` (minimal set):
  - `db:studio` → `prisma studio`
  - `db:migrate` → `prisma migrate dev`
  - (optional) `db:push` → `prisma db push` (avoid using as primary workflow)

**Done when**: `npx prisma validate` succeeds.

---

## 4) Create the minimum schema (Milestone 3)

Only do the minimum necessary tables for “connectivity” now. Recommended:

- [x] `Post` table (at least):
  - `id` (cuid/uuid)
  - `slug` (unique)
  - `createdAt`
  - (optional) `updatedAt`

Note: Full schema for likes/comments/auth is later. Don’t implement User/Session/etc yet unless you want to pre-stage the full model in Milestone 3 (generally avoid). If you do pre-stage, don’t build any UI or routes that depend on it.

**Done when**: You can run `prisma migrate dev` and it creates tables.

---

## 5) DB client helper (server-only)

- [x] Add a Prisma Client singleton helper (example: `lib/db.ts`)
  - Avoid multiple clients in dev with hot reload
  - Mark as server-only

**Done when**: Importing the DB client from a server module is stable.

---

## 6) Minimal DB connectivity proof

Pick one tiny proof (no new pages beyond the allowed list):

Option A (recommended): Post page server-side read

- [x] On `/posts/[slug]`, attempt a DB read of `Post` by `slug`
- [x] If not present, do nothing (don’t auto-create yet)
- [x] Keep UI unchanged except maybe a small “DB connected” debug line (optional and removable)

Option B: API health endpoint (only if needed)

- [x] Add `app/api/health/db/route.ts` that runs a trivial query and returns `{ ok: true }`

**Done when**: You can prove the app can connect to Postgres via Prisma.

---

## 7) Verification checklist (Milestone 3 exit criteria)

Commands:

- [x] `docker compose up -d`
- [x] `npm run lint`
- [x] `npm run format:check`
- [x] `npm run build`
- [x] `npm run dev`
- [x] `npx prisma migrate dev` (creates migration + applies)
- [x] `npx prisma studio` opens and shows tables

Manual checks:

- [x] App routes still load
- [x] Connectivity proof works (Post read or health endpoint)

---

## Notes for Milestone 4 handoff

- Keep DB access in server-only modules
- Don’t build auth tables/routes until Milestone 4
- Prefer migrations (`migrate dev`) over `db push` for schema evolution
