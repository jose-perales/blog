# Career Blog — Project Planning Prompt (Local-first)

You are an expert full-stack frontend engineer. Build a local-first “career blog” web app optimized for learning React, TypeScript, and testing. Use Next.js App Router with a Postgres database and MDX content in the repository. Implement only the UX described below—no extra pages/features.

## Goal

- A production-quality developer blog with MDX posts and impressive syntax highlighting.
- Dynamic features: authentication, comments, likes, view counts, newsletter signup.
- Strong quality bar: formatting, linting, unit tests, and end-to-end tests.

## Tech decisions (must use)

- Next.js (App Router) + React + TypeScript (strict).
- Tailwind CSS for styling.
- Postgres (Docker for local dev) + Prisma for schema/migrations.
- Auth via Auth.js / NextAuth with Credentials provider (email + password), Prisma adapter, and session-based auth.
- MDX in repo compiled with remark/rehype; frontmatter metadata.
- Syntax highlighting with Shiki using `rehype-pretty-code` (support fenced code blocks, titles, and line highlighting).
- Tooling: ESLint + Prettier; Vitest + React Testing Library; Playwright for e2e.

## Core UX (must implement)

### Pages

1. **Home**

- Shows list of latest posts (title, date, short description, tags).
- Basic navigation to About and Newsletter.

2. **Post page**

- Renders MDX content with syntax highlighting.
- Shows view count and like count.
- Like button (requires login).
- Comments section (requires login to post). Show existing comments sorted by newest.

3. **Auth**

- Sign up: email + password + display name.
- Sign in: email + password.
- Sign out.

4. **Newsletter**

- A simple newsletter signup form (email).
- On submit: store subscription in DB and show success state.

## Dynamic features (must implement)

- **View counts**:
  - Increment on post view (server-side endpoint).
  - Prevent obviously excessive increments from the same user/session (basic dedupe using cookie/session + short TTL is fine).
- **Likes**:
  - One like per authenticated user per post (toggle like/unlike).
  - Display like count.
- **Comments**:
  - Authenticated users can create comments on posts.
  - Store comment body + author + timestamps.
  - Basic validation and error handling; prevent empty comments.
- **Newsletter**:
  - Store subscriptions in DB with createdAt.
  - Validate email format and prevent duplicates.
  - Provider integration is optional; implement a clean “stub” where a future provider can be plugged in via env vars.

## Content system requirements

- Posts live in-repo under a content directory as MDX files.
- Frontmatter fields: `title`, `date`, `description`, `tags`, `slug`.
- Build a content loader that:
  - Lists posts for Home.
  - Loads a post by slug for Post page.
  - Generates metadata (title/description) for SEO.
- MDX rendering supports:
  - Headings, links, lists, blockquotes.
  - Code fences with language; Shiki highlighting; optional filename/title; line highlights.

## Data model (Prisma) — minimum tables

- **User**: id, email (unique), name, createdAt
- **Password**: userId (unique), passwordHash
- **Session / Account** tables as required by Auth.js adapter
- **Post**: id, slug (unique), title, createdAt/updatedAt (optional; slug must match MDX)
  - You may store only slug and derive most metadata from MDX, but counts/comments reference a stable Post id or slug.
- **PostView**: postId/slug + viewerKey + createdAt (for dedupe) OR a simpler aggregate counter table with dedupe mechanism
- **PostLike**: postId/slug + userId (unique together) + createdAt
- **Comment**: id, postId/slug, userId, body, createdAt
- **NewsletterSubscription**: id, email (unique), createdAt, status (optional)

## Project structure & scripts

- Provide a working local dev setup with:
  - `dev` starts Next.js and any required services.
  - `test` runs unit/component tests.
  - `test:e2e` runs Playwright.
  - `lint` and `format`.
- Use environment variables for DB + auth secrets.
- Include a simple Docker compose for Postgres local dev.

## Testing requirements

- Unit/component tests (Vitest/RTL):
  - Content loader logic (list posts, parse frontmatter).
  - At least one rendered component test (e.g., post list or comment form validation).
- E2E tests (Playwright):
  - Can sign up and sign in with credentials.
  - Can view a post and see code highlighting container rendered.
  - Logged-in user can like/unlike a post.
  - Logged-in user can add a comment and see it appear.
  - Newsletter signup stores email and shows success.
- Tests must run locally without external services.

## Non-goals (do NOT implement)

- No admin dashboard, no moderation UI, no search, no tag pages, no pagination unless required.
- No third-party comment system.
- No analytics provider integration.
- No deployment configuration yet.

## Milestones (implement in this order)

1. Scaffold app, Tailwind, lint/format, TypeScript strict, basic routes.
2. MDX content pipeline + Home + Post page rendering + Shiki highlighting.
3. Postgres + Prisma + migrations + basic DB connectivity.
4. Auth (sign up/sign in/sign out) with session handling.
5. Views/likes/comments endpoints + UI wiring.
6. Newsletter signup endpoint + UI.
7. Playwright e2e testing implementation; ensure all scripts pass.

## Acceptance criteria

- `npm run dev` works locally with Postgres.
- Home lists posts from MDX; Post page renders MDX with high-quality syntax highlighting.
- Auth works; likes and comments require login; view counts update.
- Newsletter signup persists and prevents duplicates.
- `npm run lint`, `npm run test`, and `npm run test:e2e` all pass locally.
