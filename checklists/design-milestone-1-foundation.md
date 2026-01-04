# Design Milestone 1 Checklist — Foundation (Tokens + Dark Base)

Use this checklist to implement Design Milestone 1 only.

## Scope

- Tailwind configuration extended with design tokens
- CSS custom properties defined
- Dark theme as default in root layout
- Base styles updated in globals.css

## Out of scope (later milestones)

- Typography scale implementation (Design Milestone 2)
- Component styling (Design Milestone 3)
- Code block theme updates (Design Milestone 4)
- Accessibility polish (Design Milestone 5)

---

## 0) Prerequisites

- [ ] Read `docs/design-system.md` thoroughly
- [ ] Existing app runs: `npm run dev`
- [ ] All tests pass: `npm test`

**Done when**: You understand the design system and have a working baseline.

---

## 1) Write failing tests (TDD)

### 1.1) Unit test for Tailwind config

- [ ] Create `tests/unit/design/tailwind-config.test.ts`
- [ ] Test that config exports expected color tokens
- [ ] Test that config exports expected spacing scale
- [ ] Test that config exports expected font families

```typescript
// Example structure
describe("Tailwind Config", () => {
  it("defines dark color palette", () => {
    // Import config and verify colors exist
  });

  it("defines spacing scale based on 4px unit", () => {
    // Verify spacing tokens
  });
});
```

### 1.2) Component test for dark theme

- [ ] Create `tests/ui/components/theme.test.tsx`
- [ ] Test that root layout applies dark background class
- [ ] Test that body has correct color scheme

**Done when**: Tests exist and FAIL (red phase).

---

## 2) Update Tailwind configuration

- [ ] Open `tailwind.config.ts`
- [ ] Add color palette under `theme.extend.colors`:

```typescript
colors: {
  background: {
    DEFAULT: '#0a0a0a',
    elevated: '#141414',
    subtle: '#1a1a1a',
  },
  foreground: {
    DEFAULT: '#e5e5e5',
    secondary: '#a3a3a3',
    muted: '#525252',
  },
  accent: {
    DEFAULT: '#d4d4d4',
    hover: '#fafafa',
    subtle: '#404040',
  },
  code: {
    bg: '#0d0d0d',
    fg: '#c9d1d9',
  },
  success: '#4ade80',
  error: '#f87171',
}
```

- [ ] Add spacing scale under `theme.extend.spacing`:

```typescript
spacing: {
  '18': '4.5rem',   // 72px
  '22': '5.5rem',   // 88px
  '30': '7.5rem',   // 120px
}
```

- [ ] Add font families under `theme.extend.fontFamily`:

```typescript
fontFamily: {
  sans: ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Fira Code', 'SF Mono', 'monospace'],
}
```

**Done when**: `tailwind.config.ts` contains all design tokens.

---

## 3) Define CSS custom properties

- [ ] Open `app/globals.css`
- [ ] Update `:root` block with CSS custom properties:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-elevated: #141414;
  --bg-subtle: #1a1a1a;
  --fg-primary: #e5e5e5;
  --fg-secondary: #a3a3a3;
  --fg-muted: #525252;
  --accent-primary: #d4d4d4;
  --accent-hover: #fafafa;
  --accent-subtle: #404040;
  --code-bg: #0d0d0d;
  --code-fg: #c9d1d9;
  --success: #4ade80;
  --error: #f87171;

  color-scheme: dark;
}
```

- [ ] Update `body` styles:

```css
body {
  margin: 0;
  background-color: var(--bg-primary);
  color: var(--fg-primary);
}
```

**Done when**: CSS variables are defined and body uses dark background.

---

## 4) Update root layout

- [ ] Open `app/layout.tsx`
- [ ] Add `className` to `<html>` tag for dark background
- [ ] Ensure no conflicting light-mode classes
- [ ] Update metadata if needed (theme-color meta tag)

```tsx
<html lang="en" className="bg-background text-foreground">
```

**Done when**: Root layout renders with dark theme.

---

## 5) Run tests (green phase)

- [ ] Run `npm test` — unit tests should pass
- [ ] Run `npm run lint` — no lint errors
- [ ] Run `npm run dev` — visual inspection shows dark background

**Done when**: All tests pass, app displays dark theme.

---

## 6) Refactor (if needed)

- [ ] Remove any redundant CSS
- [ ] Ensure no duplicate color definitions
- [ ] Verify Tailwind purges unused styles correctly

**Done when**: Code is clean and minimal.

---

## 7) Commit checkpoint

- [ ] Stage changes: `git add -A`
- [ ] Commit: `git commit -m "design(m1): foundation - tokens and dark base"`
- [ ] Verify commit is clean: `git status`

**Done when**: Changes are committed and ready for review.

---

## Verification Checklist

Before marking complete:

- [ ] `npm run dev` shows dark background on all pages
- [ ] `npm test` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] Colors match design system hex values exactly
- [ ] CSS custom properties are accessible in DevTools
