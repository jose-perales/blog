# Milestone 2 Checklist — MDX Pipeline + Home/Post Rendering + Shiki Highlighting

Use this checklist to implement Milestone 2 only.

## Scope (Milestone 2)

- In-repo MDX content system (files + frontmatter)
- Content loader:
  - List posts for Home
  - Load a post by `slug` for Post page
  - Generate SEO metadata (title/description)
- MDX rendering in Post page using remark/rehype
- Syntax highlighting using Shiki via `rehype-pretty-code`

## Out of scope (don’t implement yet)

- Postgres/Prisma/Docker (Milestone 3)
- Auth (Milestone 4)
- Views/likes/comments/newsletter persistence (Milestones 5–6)
- Tests (Milestone 7)
- Extra pages/features (search, tag pages, pagination, admin)

---

## 0) Prereqs

- [ ] Milestone 1 is merged and `npm run dev`, known routes work

**Done when**: The app boots cleanly before you start Milestone 2.

---

## 1) Add content directory + sample MDX posts

- [ ] Create `content/posts/` directory
- [ ] Add 2–3 sample posts as `*.mdx`
- [ ] Each post includes required frontmatter:
  - `title`
  - `date` (ISO string recommended: `YYYY-MM-DD`)
  - `description`
  - `tags` (array)
  - `slug`
- [ ] At least one post includes:
  - headings, links, lists, blockquote
  - fenced code blocks with language
  - a code block title/filename (supported by `rehype-pretty-code`)
  - line highlighting (e.g. `{1,3-5}` style depending on config)

**Done when**: You have realistic MDX fixtures to render.

---

## 2) Install MDX + frontmatter + highlighting dependencies

Pick a simple, well-supported stack. Recommended:

- Frontmatter parsing: `gray-matter`
- MDX compilation: `next-mdx-remote` (RSC flavor) OR `@mdx-js/mdx`
- remark/rehype:
  - `remark-gfm` (optional but useful)
  - `rehype-pretty-code`
  - `shiki`

- [ ] Install packages with `npm`
- [ ] Add any minimal config needed to run in Next App Router (no new pages)

**Done when**: Dependencies install cleanly and TypeScript types resolve.

---

## 3) Build a typed content loader (server-only)

Create a small module (example location: `lib/content/`) that:

- [ ] Lists posts for Home:
  - reads `content/posts/*.mdx`
  - parses frontmatter into a typed object
  - sorts by date descending
  - returns: `title`, `date`, `description`, `tags`, `slug`
- [ ] Loads a single post by `slug`:
  - returns frontmatter + raw MDX content (or compiled result)
- [ ] Validates required frontmatter keys (basic runtime validation; keep it minimal)
- [ ] Handles “post not found” cleanly

**Done when**: You can import the loader from pages and get deterministic results.

---

## 4) Wire Home page to list posts from MDX

Update the Home route to use the loader:

- [ ] Replace placeholder list with real posts
- [ ] Render: title, date, description, tags
- [ ] Each item links to `/posts/[slug]`

**Done when**: `/` shows posts driven by `content/posts`.

---

## 5) Render MDX on Post page with Shiki highlighting

Update `/posts/[slug]`:

- [ ] Load post by slug (server-side)
- [ ] Render MDX content
- [ ] Configure `rehype-pretty-code` + Shiki:
  - code fences highlighted by language
  - support optional title/filename
  - support line highlighting
- [ ] Keep counts/likes/comments as placeholders only (no DB)

**Done when**: `/posts/<slug>` renders rich MDX including highlighted code blocks.

---

## 6) Metadata generation (SEO)

- [ ] Implement `generateMetadata` for the Post route using frontmatter
- [ ] Set page title and description from MDX metadata

**Done when**: Post pages have correct metadata derived from frontmatter.

---

## 7) Styling constraints

- [ ] Use existing Tailwind approach only (no new theme system)
- [ ] Keep styles minimal: readable typography and code blocks
- [ ] No new pages beyond those already allowed

**Done when**: Post content is readable and code blocks look polished.

---

## 8) Verification checklist (Milestone 2 exit criteria)

Commands:

- [ ] `npm run format:check`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run dev`

Manual checks:

- [ ] Home lists MDX posts with title/date/description/tags
- [ ] Clicking a post opens `/posts/[slug]`
- [ ] Post renders headings/links/lists/blockquote
- [ ] Post renders at least one syntax highlighted code block
- [ ] Code block title/filename displays (if configured)
- [ ] Line highlights display (if configured)

---

## Notes for Milestone 3 handoff

- Keep content loader API stable; DB will later use the MDX slug as a stable identifier
- Keep MDX rendering server-side (App Router friendly)
- Avoid introducing DB/env dependencies yet
