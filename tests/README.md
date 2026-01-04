# Tests

This repo uses **Vitest** for unit/integration/UI tests.

## Running

- Run all tests: `npm run test`
- Watch mode: `npm run test:watch`

> Some integration tests require Postgres to be running and `DATABASE_URL` to be set.

## Directory layout

### `tests/unit/`

Fast, deterministic tests that don’t need external services.

Use for:

- Pure functions (parsers, helpers)
- Config callbacks (e.g. NextAuth callback logic)
- Anything that can run without Postgres and without HTTP

Examples in this repo:

- `tests/unit/content-loader.test.ts`
- `tests/unit/auth/session-callback.test.ts`

### `tests/integration/`

Tests that cross a boundary (DB, route handler, auth authorize) but still run inside Vitest.

Use for:

- Prisma/Postgres connectivity
- Next.js route handlers invoked directly (e.g. `GET()`/`POST()` exported functions)
- Auth Credential `authorize()` logic that queries the DB

Conventions:

- Prefer Node environment for integration tests: add `// @vitest-environment node` at the top.
- Clean up any DB rows you create (use `try/finally` or `afterEach`).
- If the test needs `DATABASE_URL`, fail fast with a clear message.

Examples in this repo:

- `tests/integration/db/connectivity.test.ts`
- `tests/integration/auth/sign-up-route.test.ts`
- `tests/integration/auth/credentials-authorize.test.ts`

### `tests/ui/`

Render-level tests using React Testing Library + `jsdom`.

Use for:

- Verifying page/component output
- Checking form fields, labels, basic UI state
- Avoiding full browser automation (use Playwright for true e2e later)

Conventions:

- Mock Next-specific modules when needed (`next/link`, `next/navigation`, `next-auth/react`).
- Prefer stable selectors via accessible roles/labels.

Examples in this repo:

- `tests/ui/pages/home.test.tsx`
- `tests/ui/pages/auth-sign-in.test.tsx`

## Environment / stubs

- Test setup file: `tests/setup.ts` (loads `dotenv/config` and common mocks)
- Next.js marker module stub:
  - `tests/stubs/server-only.ts` is aliased in `vitest.config.ts` so Vite can import files that use `import "server-only";`.

## Where should a new test go?

- If it can run without Postgres: put it in `tests/unit/`.
- If it touches Prisma/Postgres or a route handler: put it in `tests/integration/`.
- If it renders React components/pages: put it in `tests/ui/`.
