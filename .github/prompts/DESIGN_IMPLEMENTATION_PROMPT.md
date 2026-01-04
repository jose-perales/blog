# Design System Implementation — Planning Prompt

You are implementing a design system for a career blog. The system is defined in `docs/design-system.md`. This document provides the implementation plan.

## Goal

Transform the existing blog from default/light styling to the **Quiet, Clear, Inevitable** design system. The blog should feel like a dark notebook—content emerges from darkness, typography carries the design, and nothing competes for attention.

## Design Principles (Summary)

1. **Silence Over Noise** — No decoration without function
2. **Clarity Over Cleverness** — Typography is the primary design tool
3. **Depth Over Breadth** — Encourage slow reading
4. **Structure Over Decoration** — Grid-based, mathematical proportions

## Technical Implementation

### Tailwind Configuration

Extend `tailwind.config.ts` with:

- Custom color palette (dark-first)
- Extended spacing scale (4px base)
- Typography scale (1.25 ratio, 18px base)
- Custom font families

### CSS Custom Properties

Define in `globals.css`:

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
}
```

### Component Updates Required

1. **Layout** — Dark background, centered content, generous margins
2. **Typography** — New scale, line heights, max-width for prose
3. **Navigation** — Minimal, ghost-style links
4. **Cards** — No borders, subtle elevation, soft radius
5. **Buttons** — Ghost style default, solid for primary actions
6. **Forms** — Dark inputs, subtle focus states
7. **Code blocks** — Darker background, cohesive syntax theme
8. **Links** — Underline on hover, subtle color transitions

## Testing Strategy (TDD)

### Visual Regression (Optional)

- Consider Playwright visual snapshots for key pages

### Unit/Component Tests

- Test component variants render correct classes
- Test dark/light mode toggle (if implemented)
- Test accessibility: focus states, contrast ratios

### E2E Tests

- Verify pages render without console errors
- Verify color scheme meta tag
- Verify reduced-motion is respected

## File Changes Required

### Configuration

- `tailwind.config.ts` — Extended theme
- `app/globals.css` — CSS custom properties, base styles

### Components (new or updated)

- `app/layout.tsx` — Root layout with dark theme
- `app/page.tsx` — Home page styling
- `app/about/page.tsx` — About page styling
- `app/newsletter/page.tsx` — Newsletter form styling
- `app/newsletter/newsletter-form.tsx` — Form component
- `app/posts/[slug]/page.tsx` — Post page styling
- `app/posts/[slug]/post-engagement.tsx` — Engagement UI
- `app/auth/sign-in/page.tsx` — Auth form styling
- `app/auth/sign-up/page.tsx` — Auth form styling
- `app/sign-out-button.tsx` — Button styling

### MDX Styling

- Update `.mdx` class styles in `globals.css`
- Update `rehype-pretty-code` theme configuration

## Milestones

### Design Milestone 1: Foundation

- Tailwind config with design tokens
- CSS custom properties
- Dark base styles in globals.css
- Root layout updated

### Design Milestone 2: Typography & Layout

- Type scale implementation
- Content width constraints
- Vertical rhythm
- Prose styling for MDX

### Design Milestone 3: Components

- Navigation styling
- Button variants
- Form inputs
- Cards/containers

### Design Milestone 4: Code & Syntax

- Update Shiki theme to match palette
- Code block styling
- Inline code styling

### Design Milestone 5: Polish & Accessibility

- Focus states
- Hover transitions
- Reduced motion support
- Light mode support (optional)
- Final visual QA

## Acceptance Criteria

- [ ] All pages use dark theme by default
- [ ] Typography follows the defined scale
- [ ] Color palette matches design system exactly
- [ ] No decorative elements without function
- [ ] WCAG AA contrast ratios met
- [ ] Keyboard navigation fully functional
- [ ] `prefers-reduced-motion` respected
- [ ] All existing tests still pass
- [ ] No visual regressions on key flows
