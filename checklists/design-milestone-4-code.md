# Design Milestone 4 Checklist — Code & Syntax Highlighting

Use this checklist to implement Design Milestone 4 only.

## Scope

- Update Shiki theme to match design palette
- Code block container styling
- Inline code styling
- Line numbers (optional)
- Code block titles/filenames

## Prerequisites

- [x] Design Milestone 3 complete and committed
- [x] Components styled correctly

---

## 0) Write failing tests (TDD)

### 0.1) Code block styling tests

- [x] Create or update `tests/ui/components/code-block.test.tsx`
- [x] Test that code blocks have correct background color
- [x] Test that code blocks have correct border-radius
- [x] Test that code figure element renders correctly

### 0.2) Inline code tests

- [x] Test inline code has correct styling
- [x] Test inline code is distinguishable from surrounding text

### 0.3) E2E code rendering test

- [x] Update `tests/e2e/post-rendering.spec.ts`
- [x] Verify code blocks render with syntax highlighting
- [x] Verify no visual regressions

**Done when**: Tests exist and FAIL (or are ready to verify).

---

## 1) Choose/configure Shiki theme

### Option A: Use existing dark theme

- [x] Review available Shiki themes: `github-dark`, `one-dark-pro`, `vitesse-dark`
- [x] Select theme that closest matches palette
- [x] Configure in MDX/rehype-pretty-code setup

### Option B: Create custom theme (advanced)

- [x] Create custom theme JSON matching design colors
- [x] Configure rehype-pretty-code to use custom theme

### Recommended: `github-dark-dimmed` or `vitesse-dark`

- [x] Update MDX configuration (likely in `next.config.ts` or content loader)

```typescript
// Example rehype-pretty-code options
{
  theme: 'github-dark-dimmed',
  // or for custom:
  // theme: JSON.parse(fs.readFileSync('./themes/custom-dark.json', 'utf-8'))
}
```

**Done when**: Syntax theme matches design palette tone.

---

## 2) Update code block container styles

- [x] Update code block styles in `globals.css`:

```css
/* Code blocks via rehype-pretty-code */
.mdx figure[data-rehype-pretty-code-figure] {
  @apply bg-code-bg my-8 overflow-hidden rounded-lg;
}

.mdx figure[data-rehype-pretty-code-figure] pre {
  @apply overflow-x-auto p-6 text-sm leading-relaxed;
  background-color: transparent !important;
}

.mdx figure[data-rehype-pretty-code-figure] code {
  @apply font-mono;
  font-size: 0.875rem;
  line-height: 1.7;
}

/* Code block title/filename */
.mdx figure[data-rehype-pretty-code-figure] figcaption {
  @apply border-accent-subtle bg-background-elevated text-foreground-muted border-b px-6 py-3 font-mono text-xs;
}

/* Line highlighting */
.mdx figure[data-rehype-pretty-code-figure] [data-highlighted-line] {
  @apply bg-background-subtle -mx-6 px-6;
}

/* Line numbers (if enabled) */
.mdx figure[data-rehype-pretty-code-figure] [data-line-numbers] {
  counter-reset: line;
}

.mdx figure[data-rehype-pretty-code-figure] [data-line-numbers] > [data-line]::before {
  counter-increment: line;
  content: counter(line);
  @apply text-foreground-muted mr-6 inline-block w-4 text-right;
}
```

**Done when**: Code blocks match design system aesthetics.

---

## 3) Update inline code styling

- [x] Ensure inline code styling in globals.css:

```css
.mdx code:not([data-language]) {
  @apply bg-code-bg text-code-fg rounded px-1.5 py-0.5 font-mono text-sm;
}

/* Outside of MDX context */
code:not([data-language]):not(.mdx code) {
  @apply bg-code-bg text-code-fg rounded px-1.5 py-0.5 font-mono text-sm;
}
```

**Done when**: Inline code is readable and consistent.

---

## 4) Test with sample content

- [x] Open a post with code blocks: `npm run dev`
- [x] Verify:
  - [x] Code background is darker than page (`#0d0d0d`)
  - [x] Syntax colors are muted and cohesive
  - [x] Line highlighting works
  - [x] Code titles/filenames display correctly
  - [x] Horizontal scroll on overflow (no wrapping)
  - [x] Line numbers (if enabled) are muted

**Done when**: Code blocks look intentional, not garish.

---

## 5) Handle edge cases

- [x] Very long lines: horizontal scroll works
- [x] Empty code blocks: no visual glitch
- [x] Inline code in headings: styled appropriately
- [x] Code in blockquotes: readable
- [x] Code in lists: indentation correct

**Done when**: Edge cases handled gracefully.

---

## 6) Run tests (green phase)

- [x] `npm test` — all tests pass
- [x] `npm run lint` — no errors
- [x] `npm run build` — builds successfully
- [x] `npm run test:e2e` — E2E tests pass

**Done when**: All tests pass.

---

## 7) Refactor

- [x] Consolidate code-related styles
- [x] Ensure theme is configured in one place
- [x] Remove any !important overrides if possible

**Done when**: Code styling is clean and maintainable.

---

## 8) Commit checkpoint

- [x] `git add -A`
- [x] `git commit -m "design(m4): code blocks and syntax highlighting"`

**Done when**: Committed and ready for review.

---

## Verification Checklist

- [x] Code block background is #0d0d0d
- [x] Syntax highlighting is muted, cohesive
- [x] Code font is monospace (JetBrains Mono or fallback)
- [x] Border-radius is 0.5rem (8px)
- [x] No decorative chrome (fake window buttons)
- [x] Line highlighting works
- [x] Code titles/filenames display
- [x] Inline code is styled
- [x] Horizontal scroll on long lines
- [x] All tests pass
