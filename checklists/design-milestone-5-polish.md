# Design Milestone 5 Checklist — Polish & Accessibility

Use this checklist to implement Design Milestone 5 only.

## Scope

- Focus states (visible, not obtrusive)
- Hover transitions (150ms ease)
- Reduced motion support (`prefers-reduced-motion`)
- Light mode support (optional, if time permits)
- Final visual QA
- Accessibility audit

## Prerequisites

- [ ] Design Milestone 4 complete and committed
- [ ] All core styling in place

---

## 0) Write failing tests (TDD)

### 0.1) Accessibility tests

- [ ] Create `tests/ui/accessibility/focus-states.test.tsx`
- [ ] Test that interactive elements have visible focus
- [ ] Test that focus ring meets contrast requirements

### 0.2) Reduced motion tests

- [ ] Create `tests/ui/accessibility/reduced-motion.test.tsx`
- [ ] Test that `prefers-reduced-motion` disables transitions

### 0.3) E2E accessibility tests

- [ ] Update `tests/e2e/accessibility.spec.ts` (create if needed)
- [ ] Test keyboard navigation through main flows
- [ ] Test that all interactive elements are reachable

**Done when**: Tests exist and are ready to verify.

---

## 1) Audit and fix focus states

### 1.1) Global focus styles

- [ ] Add global focus styles to globals.css:

```css
/* Focus visible for keyboard users */
:focus-visible {
  outline: 2px solid var(--accent-primary);
  outline-offset: 2px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### 1.2) Component-specific focus

- [ ] Buttons: ring on focus-visible
- [ ] Links: underline + color change on focus
- [ ] Inputs: border change + ring on focus
- [ ] Cards (if interactive): subtle outline

**Done when**: All interactive elements have visible focus states.

---

## 2) Audit and standardize transitions

### 2.1) Global transition rules

- [ ] Add transition utilities to globals.css:

```css
/* Standard transition for interactive elements */
.transition-default {
  transition-property: color, background-color, border-color, opacity;
  transition-duration: 150ms;
  transition-timing-function: ease;
}
```

### 2.2) Verify all transitions

- [ ] Links: 150ms color transition
- [ ] Buttons: 150ms background transition
- [ ] Inputs: 150ms border transition
- [ ] Cards: 150ms background transition (if interactive)
- [ ] No bounce, wiggle, or pulse animations

**Done when**: Transitions are consistent and subtle.

---

## 3) Implement reduced motion support

- [ ] Add reduced motion media query to globals.css:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] Test with browser settings or OS settings

**Done when**: Animations/transitions disabled when preference set.

---

## 4) Light mode support (optional)

### If implementing:

- [ ] Add light mode CSS custom properties:

```css
@media (prefers-color-scheme: light) {
  :root {
    --bg-primary: #fafafa;
    --bg-elevated: #ffffff;
    --bg-subtle: #f5f5f5;
    --fg-primary: #171717;
    --fg-secondary: #525252;
    --fg-muted: #a3a3a3;
    --accent-primary: #404040;
    --accent-hover: #171717;
    --accent-subtle: #e5e5e5;
    --code-bg: #f5f5f5;
    --code-fg: #24292e;

    color-scheme: light;
  }
}
```

- [ ] Test all components in light mode
- [ ] Ensure syntax highlighting theme works in light mode

### If NOT implementing:

- [ ] Document decision to keep dark-only for now
- [ ] Ensure `color-scheme: dark` is set

**Done when**: Light mode works OR decision documented.

---

## 5) Accessibility audit

### 5.1) Color contrast

- [ ] Check body text contrast (should be > 4.5:1)
- [ ] Check heading contrast
- [ ] Check link contrast (normal and hover)
- [ ] Check muted text contrast (>= 3:1 for large text)
- [ ] Use Chrome DevTools or axe-core

### 5.2) Semantic HTML

- [ ] Verify proper heading hierarchy (h1 → h2 → h3)
- [ ] Verify landmarks: main, nav, header, footer
- [ ] Verify form labels are associated
- [ ] Verify buttons have accessible names
- [ ] Verify images have alt text

### 5.3) Keyboard navigation

- [ ] Tab through entire site
- [ ] Verify all interactive elements reachable
- [ ] Verify skip link (if implemented)
- [ ] Verify modal/dialog focus trapping (if any)
- [ ] Verify escape key closes any overlays

### 5.4) Screen reader testing

- [ ] Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] Verify page titles are descriptive
- [ ] Verify link text is meaningful
- [ ] Verify form errors are announced

**Done when**: No critical accessibility issues.

---

## 6) Final visual QA

### 6.1) Cross-browser testing

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari (if available)

### 6.2) Responsive testing

- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)
- [ ] No horizontal scroll at any breakpoint
- [ ] Touch targets >= 44px on mobile

### 6.3) Page-by-page review

- [ ] Home page
- [ ] Post page (multiple posts)
- [ ] About page
- [ ] Newsletter page
- [ ] Sign in page
- [ ] Sign up page
- [ ] 404 page (if exists)

### 6.4) Design system compliance

- [ ] Colors match hex values exactly
- [ ] Typography follows scale
- [ ] Spacing is consistent
- [ ] No decorative elements without function
- [ ] Overall feel: Quiet, Clear, Inevitable

**Done when**: Visual quality meets design system standards.

---

## 7) Run all tests

- [ ] `npm test` — unit/component tests pass
- [ ] `npm run lint` — no errors
- [ ] `npm run build` — builds successfully
- [ ] `npm run test:e2e` — E2E tests pass

**Done when**: All tests pass.

---

## 8) Documentation

- [ ] Update README if needed
- [ ] Document any design decisions/deviations
- [ ] Note any known issues or future improvements

**Done when**: Documentation is current.

---

## 9) Final commit

- [ ] `git add -A`
- [ ] `git commit -m "design(m5): polish, accessibility, and final QA"`
- [ ] Tag release if appropriate: `git tag design-v1.0`

**Done when**: Design system implementation complete!

---

## Verification Checklist

- [ ] All focus states visible and appropriate
- [ ] All transitions are 150ms ease
- [ ] `prefers-reduced-motion` respected
- [ ] Color contrast meets WCAG AA
- [ ] Semantic HTML in place
- [ ] Full keyboard navigation works
- [ ] No visual regressions
- [ ] All tests pass
- [ ] Design feels: Quiet, Clear, Inevitable
