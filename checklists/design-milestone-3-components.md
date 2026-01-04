# Design Milestone 3 Checklist — Components

Use this checklist to implement Design Milestone 3 only.

## Scope

- Navigation styling (header/nav)
- Button variants (ghost, solid)
- Form inputs (text, email, password)
- Cards/containers
- Post list items on home page

## Prerequisites

- [ ] Design Milestone 2 complete and committed
- [ ] Typography and layout working correctly

---

## 0) Write failing tests (TDD)

### 0.1) Button component tests

- [ ] Create `tests/ui/components/button.test.tsx`
- [ ] Test ghost variant renders correct classes
- [ ] Test solid variant renders correct classes
- [ ] Test hover states are defined

### 0.2) Form input tests

- [ ] Create `tests/ui/components/input.test.tsx`
- [ ] Test input renders with dark background
- [ ] Test focus state has visible ring
- [ ] Test error state displays correctly

### 0.3) Navigation tests

- [ ] Create `tests/ui/components/navigation.test.tsx`
- [ ] Test nav links render with correct styling
- [ ] Test active state is distinguishable

### 0.4) Card tests

- [ ] Create `tests/ui/components/card.test.tsx`
- [ ] Test card has elevated background
- [ ] Test card has correct border-radius

**Done when**: Tests exist and FAIL.

---

## 1) Create button styles

### Option A: Tailwind classes directly

- [ ] Define button base styles in globals.css or as component

```css
.btn {
  @apply focus:ring-accent-subtle focus:ring-offset-background inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors duration-150 focus:ring-2 focus:ring-offset-2 focus:outline-none;
}

.btn-ghost {
  @apply text-foreground hover:bg-background-subtle bg-transparent;
}

.btn-solid {
  @apply bg-foreground text-background hover:bg-foreground/90;
}

.btn-sm {
  @apply px-4 py-2 text-sm;
}
```

### Option B: React component (if warranted)

- [ ] Create `components/ui/button.tsx` if complexity requires it

**Done when**: Button variants work and match design.

---

## 2) Create form input styles

- [ ] Add input styles to globals.css:

```css
.input {
  @apply border-accent-subtle bg-background-elevated text-foreground placeholder:text-foreground-muted focus:border-accent focus:ring-accent w-full rounded-md border px-4 py-3 transition-colors duration-150 focus:ring-1 focus:outline-none;
}

.input-error {
  @apply border-error focus:border-error focus:ring-error;
}

.label {
  @apply text-foreground-secondary mb-2 block text-sm font-medium;
}

.error-message {
  @apply text-error mt-1 text-sm;
}
```

**Done when**: Inputs render with dark styling and visible focus.

---

## 3) Update navigation

- [ ] Update header/nav in `app/layout.tsx`:

```tsx
<nav className="border-accent-subtle bg-background border-b">
  <div className="max-w-page mx-auto px-6 py-4">
    <div className="flex items-center justify-between">
      {/* Logo/site name */}
      <Link href="/" className="text-foreground hover:text-accent-hover text-lg font-medium">
        Blog
      </Link>

      {/* Nav links */}
      <div className="flex items-center gap-6">
        <Link href="/about" className="text-foreground-secondary hover:text-foreground text-sm">
          About
        </Link>
        <Link
          href="/newsletter"
          className="text-foreground-secondary hover:text-foreground text-sm"
        >
          Newsletter
        </Link>
        {/* Auth links */}
      </div>
    </div>
  </div>
</nav>
```

**Done when**: Navigation is minimal, dark, and functional.

---

## 4) Create card/container styles

- [ ] Add card styles to globals.css:

```css
.card {
  @apply bg-background-elevated rounded-lg p-6;
}

.card-interactive {
  @apply card hover:bg-background-subtle transition-colors duration-150;
}
```

**Done when**: Cards have subtle elevation, no harsh borders.

---

## 5) Update post list on home page

- [ ] Update `app/page.tsx` post list items:

```tsx
<article className="group border-accent-subtle border-b py-6 last:border-0">
  <Link href={`/posts/${post.slug}`}>
    <h2 className="text-foreground group-hover:text-accent-hover text-xl font-semibold transition-colors">
      {post.title}
    </h2>
    <time className="text-foreground-muted text-sm">{post.date}</time>
    <p className="text-foreground-secondary mt-2">{post.description}</p>
  </Link>
</article>
```

**Done when**: Post list is clean, scannable, inviting.

---

## 6) Update auth forms

- [ ] Update `app/auth/sign-in/page.tsx`:
  - Apply `.input` class to form fields
  - Apply `.btn-solid` to submit button
  - Apply `.label` to labels

- [ ] Update `app/auth/sign-up/page.tsx`:
  - Same treatment as sign-in

**Done when**: Auth forms match design system.

---

## 7) Update newsletter form

- [ ] Update `app/newsletter/newsletter-form.tsx`:
  - Email input uses `.input` class
  - Submit button uses `.btn-solid` or `.btn-ghost`
  - Success/error states styled appropriately

**Done when**: Newsletter form is cohesive with design.

---

## 8) Update sign-out button

- [ ] Update `app/sign-out-button.tsx`:
  - Apply ghost button styling

**Done when**: Sign-out button is subtle but clear.

---

## 9) Run tests (green phase)

- [ ] `npm test` — all tests pass
- [ ] `npm run lint` — no errors
- [ ] `npm run build` — builds successfully
- [ ] Visual inspection of all components

**Done when**: Tests pass and components look correct.

---

## 10) Refactor

- [ ] Extract repeated patterns into shared classes
- [ ] Ensure consistent spacing across components
- [ ] Remove any unused styles

**Done when**: Code is DRY and maintainable.

---

## 11) Commit checkpoint

- [ ] `git add -A`
- [ ] `git commit -m "design(m3): component styling - buttons, inputs, nav, cards"`

**Done when**: Committed and ready for review.

---

## Verification Checklist

- [ ] Buttons have ghost and solid variants
- [ ] Inputs have dark background with visible focus
- [ ] Navigation is minimal and functional
- [ ] Cards use subtle elevation (no shadows)
- [ ] Post list items are clean and scannable
- [ ] Auth forms are styled consistently
- [ ] Newsletter form matches design
- [ ] All hover/focus states work
- [ ] All tests pass
