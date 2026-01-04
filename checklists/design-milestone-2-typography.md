# Design Milestone 2 Checklist — Typography & Layout

Use this checklist to implement Design Milestone 2 only.

## Scope

- Typography scale (1.25 ratio, 18px base)
- Line heights and letter spacing
- Content width constraints
- Vertical rhythm
- Prose/MDX styling updates

## Prerequisites

- [x] Design Milestone 1 complete and committed
- [x] Dark theme displaying correctly

---

## 0) Write failing tests (TDD)

### 0.1) Typography scale tests

- [x] Create or update `tests/unit/design/typography.test.ts`
- [x] Test that Tailwind config has correct font sizes
- [x] Test that line heights match spec

### 0.2) Layout constraint tests

- [x] Create `tests/ui/components/layout.test.tsx`
- [x] Test that main content area has max-width constraint
- [x] Test that content is centered

### 0.3) MDX prose tests

- [x] Update `tests/ui/pages/post-rendering.test.tsx` (if exists)
- [x] Test that prose container applies correct max-width
- [x] Test that headings use correct hierarchy classes

**Done when**: Tests exist and FAIL.

---

## 1) Add typography scale to Tailwind

- [x] Open `tailwind.config.ts`
- [x] Add fontSize scale under `theme.extend.fontSize`:

```typescript
fontSize: {
  xs: ['0.75rem', { lineHeight: '1rem' }],        // 12px
  sm: ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
  base: ['1.125rem', { lineHeight: '1.9125rem' }], // 18px, lh 1.7
  lg: ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
  xl: ['1.5rem', { lineHeight: '2rem' }],         // 24px
  '2xl': ['1.875rem', { lineHeight: '2.4375rem' }], // 30px, lh 1.3
  '3xl': ['2.25rem', { lineHeight: '2.925rem' }],   // 36px, lh 1.3
  '4xl': ['3rem', { lineHeight: '3.9rem' }],        // 48px, lh 1.3
}
```

- [x] Add letter spacing for headings:

```typescript
letterSpacing: {
  tighter: '-0.02em',
}
```

**Done when**: Typography tokens defined in config.

---

## 2) Add content width tokens

- [x] Add to `theme.extend.maxWidth`:

```typescript
maxWidth: {
  content: '42rem',   // 672px - prose
  wide: '56rem',      // 896px - code blocks, images
  page: '72rem',      // 1152px - max page width
}
```

**Done when**: Width constraints available as Tailwind classes.

---

## 3) Update base typography in globals.css

- [x] Update body font settings:

```css
body {
  margin: 0;
  background-color: var(--bg-primary);
  color: var(--fg-primary);
  font-family: theme("fontFamily.sans");
  font-size: theme("fontSize.base");
  line-height: 1.7;
}
```

- [x] Add base link styles:

```css
a {
  color: var(--accent-primary);
  text-decoration: none;
  transition: color 150ms ease;
}

a:hover {
  color: var(--accent-hover);
  text-decoration: underline;
}
```

**Done when**: Base typography feels right on plain pages.

---

## 4) Update MDX prose styles

- [x] Update `.mdx` class in globals.css:

```css
.mdx {
  @apply max-w-content mx-auto space-y-6;
}

.mdx h1 {
  @apply text-foreground text-4xl font-semibold tracking-tighter;
}

.mdx h2 {
  @apply text-foreground mt-12 mb-4 text-3xl font-semibold tracking-tighter;
}

.mdx h3 {
  @apply text-foreground mt-8 mb-3 text-2xl font-semibold tracking-tight;
}

.mdx h4 {
  @apply text-foreground mt-6 mb-2 text-xl font-semibold;
}

.mdx p {
  @apply text-foreground-secondary text-base leading-relaxed;
}

.mdx a {
  @apply text-accent hover:text-accent-hover underline underline-offset-4;
}

.mdx ul,
.mdx ol {
  @apply text-foreground-secondary space-y-2 pl-6;
}

.mdx ul {
  @apply list-disc;
}

.mdx ol {
  @apply list-decimal;
}

.mdx li {
  @apply pl-2;
}

.mdx blockquote {
  @apply border-accent-subtle text-foreground-secondary border-l-2 pl-6 italic;
}

.mdx strong {
  @apply text-foreground font-semibold;
}

.mdx code:not([data-language]) {
  @apply bg-code-bg text-code-fg rounded px-1.5 py-0.5 font-mono text-sm;
}
```

**Done when**: MDX content renders with correct typography.

---

## 5) Update page layouts

### 5.1) Root layout

- [x] Update `app/layout.tsx`:
  - Add container with max-width-page
  - Center content
  - Add horizontal padding for mobile

### 5.2) Home page

- [x] Update `app/page.tsx`:
  - Use max-w-content for main content
  - Apply vertical spacing (space-y-12 or similar)

### 5.3) Post page

- [x] Update `app/posts/[slug]/page.tsx`:
  - Ensure prose container uses max-w-content
  - Title uses text-4xl with tracking-tighter

### 5.4) About page

- [x] Update `app/about/page.tsx`:
  - Apply prose-like styling
  - Consistent with post page typography

**Done when**: All pages have consistent typography and width constraints.

---

## 6) Run tests (green phase)

- [x] `npm test` — all tests pass
- [x] `npm run lint` — no errors
- [x] `npm run build` — builds successfully
- [x] Visual inspection at multiple breakpoints

**Done when**: Tests pass and typography looks correct.

---

## 7) Refactor

- [x] Remove any duplicate or overridden styles
- [x] Ensure responsive breakpoints work
- [x] Check line lengths are 65-75 characters on desktop

**Done when**: Code is clean, readable, minimal.

---

## 7.5) Add design system ESLint rule (bonus)

Prevent raw Tailwind color classes that bypass the design system.

- [x] Create `eslint-rules/no-raw-tailwind-colors.js`
- [x] Configure in `eslint.config.mjs` as `design-system/no-raw-tailwind-colors`
- [x] Disallow all default Tailwind color scales (slate, gray, red, blue, etc.)
- [x] Allow only design system tokens (text-foreground, bg-background, etc.)
- [x] Fix any existing violations in components
- [x] Verify `npm run lint` passes

**Done when**: Lint catches any future raw color usage.

---

## 8) Commit checkpoint

- [x] `git add -A`
- [x] `git commit -m "design(m2): typography and layout constraints"`

**Done when**: Committed and ready for review.

---

## Verification Checklist

- [x] Body text is 18px base size
- [x] Headings follow 1.25 scale
- [x] Line height is 1.7 for body, 1.3 for headings
- [x] Content max-width is ~672px
- [x] Vertical rhythm feels consistent
- [x] MDX posts render beautifully
- [x] Mobile responsive (no horizontal scroll)
- [x] All components use design system color tokens
- [x] ESLint rule blocks raw Tailwind colors
- [x] All tests pass
