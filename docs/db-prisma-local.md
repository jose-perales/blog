# Milestone 3 — Local Postgres + Prisma (Runbook)

This document explains how to run the Milestone 3 database stack locally, apply Prisma migrations, and verify DB connectivity.

## Prereqs

- Node + npm installed
- Docker installed and running (Docker Desktop or Docker Engine)

If Docker is not available, you can still run `npm run build`, but you will not be able to run migrations or verify DB connectivity against Postgres.

## 1) Create a local env file

Copy the example env file and adjust values as needed:

```bash
cp .env.example .env
```

Make sure `.env` contains a valid `DATABASE_URL`, for example:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/blog?schema=public"
```

## 2) Start Postgres via Docker Compose

From the repo root:

```bash
docker compose up -d
```

Optional: confirm Postgres is up:

```bash
docker compose ps
```

## 3) Apply the first migration

Run Prisma migrations (this will create a new migration locally if needed and apply it):

```bash
npm run db:migrate
```

Notes:

- Prisma Client is generated automatically on install via `postinstall` (`prisma generate`).
- This repo pins Prisma to v6 because Prisma v7+ changes the classic `schema.prisma` datasource `url = env("DATABASE_URL")` workflow.

## 4) Run the app

```bash
npm run dev
```

## 5) Verify DB connectivity

Two quick ways:

- API health route:
  - Open `http://localhost:3000/api/health/db`
  - Expect JSON like `{ "ok": true }`

- Prisma Studio:

```bash
npm run db:studio
```

Studio should open and show the schema/tables after migrations.

## 6) Stopping Postgres

```bash
docker compose down
```

If you also want to delete all local DB data:

```bash
docker compose down -v
```
