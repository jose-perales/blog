# Design System — Career Blog

> Quiet. Clear. Inevitable.

---

## Design Philosophy

This blog exists as a space for thought—not performance. The design should feel like it emerged naturally, as if no other form was possible. Every element serves comprehension; nothing competes for attention.

### Guiding Words

| Tone            | Form         | Experience  |
| --------------- | ------------ | ----------- |
| Quiet           | Minimal      | Intuitive   |
| Soft            | Structural   | Exploratory |
| Unrushed        | Mathematical | Focused     |
| Nonperformative | Abstract     | Curious     |
| Anonymous       | Visual       | Grounded    |
| Deliberate      | Dark         | Timeless    |

---

## Core Principles

### 1. **Silence Over Noise**

- No decorative elements without function
- Generous whitespace (or darkspace) as a design element
- Let content breathe; margins matter more than embellishments
- No animations unless they communicate state change

### 2. **Clarity Over Cleverness**

- Typography is the primary design tool
- Hierarchy through size, weight, and spacing—not color
- One idea per visual unit
- If it needs explanation, redesign it

### 3. **Depth Over Breadth**

- Encourage slow reading, not skimming
- Reward curiosity with discoverable detail
- Progressively reveal complexity
- Quality of attention over quantity of clicks

### 4. **Structure Over Decoration**

- Grid-based layouts with mathematical proportions
- Alignment creates visual rhythm
- Repetition builds familiarity
- Constraints enable creativity

---

## Color System

### Philosophy

Dark as default. Not trendy dark mode—_inherently_ dark. Like a notebook opened at night, or a terminal waiting for input. Light elements emerge from darkness rather than sitting on brightness.

### Palette

```
Background (Primary)     #0a0a0a    near-black, not pure black
Background (Elevated)    #141414    subtle lift for cards/sections
Background (Subtle)      #1a1a1a    hover states, borders

Foreground (Primary)     #e5e5e5    main text, high contrast
Foreground (Secondary)   #a3a3a3    supporting text, metadata
Foreground (Muted)       #525252    placeholders, disabled

Accent (Primary)         #d4d4d4    links, interactive elements
Accent (Hover)           #fafafa    hover state for links
Accent (Subtle)          #404040    subtle highlights, borders

Code Background          #0d0d0d    slightly darker than page
Code Foreground          #c9d1d9    optimized for syntax highlighting

Success                  #4ade80    confirmations (muted green)
Error                    #f87171    errors (muted red)
```

### Usage Rules

- Never use pure black (`#000`) or pure white (`#fff`)
- Color should inform, not attract
- Accent colors are earned—use sparingly
- Syntax highlighting should feel integrated, not garish

---

## Typography

### Philosophy

Typography carries 90% of the design weight. Choose faces that disappear into reading—invisible until examined, then surprisingly beautiful.

### Type Scale

Based on a 1.25 ratio (major third), rooted at 18px for body text.

```
--text-xs:    0.75rem   (12px)   — fine print, metadata
--text-sm:    0.875rem  (14px)   — captions, secondary
--text-base:  1.125rem  (18px)   — body text
--text-lg:    1.25rem   (20px)   — lead paragraphs
--text-xl:    1.5rem    (24px)   — h4
--text-2xl:   1.875rem  (30px)   — h3
--text-3xl:   2.25rem   (36px)   — h2
--text-4xl:   3rem      (48px)   — h1, post titles
```

### Font Stack

**Body**: System serif or a quiet geometric sans

```css
font-family: "Inter", "SF Pro Text", system-ui, sans-serif;
```

**Code**: Monospace that feels native to the environment

```css
font-family: "JetBrains Mono", "Fira Code", "SF Mono", monospace;
```

**Display** (optional, for titles): Same as body, but with tracking adjustments

```css
letter-spacing: -0.02em; /* tighten at large sizes */
```

### Rhythm

- Line height: 1.7 for body, 1.3 for headings
- Paragraph spacing: 1.5em between paragraphs
- Maximum line length: 65-75 characters (optimize for reading)

---

## Spacing System

### Base Unit

`4px` — all spacing derives from multiples of 4.

```
--space-1:   0.25rem   (4px)
--space-2:   0.5rem    (8px)
--space-3:   0.75rem   (12px)
--space-4:   1rem      (16px)
--space-6:   1.5rem    (24px)
--space-8:   2rem      (32px)
--space-12:  3rem      (48px)
--space-16:  4rem      (64px)
--space-24:  6rem      (96px)
--space-32:  8rem      (128px)
```

### Application

- Component padding: `space-4` to `space-8`
- Section margins: `space-12` to `space-24`
- Page margins: `space-6` (mobile) to `space-16` (desktop)
- Generous vertical rhythm; tight horizontal containment

---

## Layout

### Content Width

```
--width-content:   42rem   (672px)   — prose, main reading
--width-wide:      56rem   (896px)   — code blocks, images
--width-full:      72rem   (1152px)  — maximum page width
```

### Grid Philosophy

- Single column for reading (distraction-free)
- Content centered with generous side margins
- Wide elements break the column subtly
- No sidebar, no multi-column layouts

### Vertical Rhythm

- Sections separated by `space-16` or more
- Related elements grouped with `space-4` to `space-8`
- Breathing room scales with viewport

---

## Components

### Cards / Containers

- No visible borders unless interactive
- Subtle background shift for elevation (`#141414`)
- Rounded corners: `0.5rem` (8px) — soft but not playful
- No shadows (shadows feel dated and decorative)

### Links

- Underline: subtle, `1px`, using `text-decoration`
- No underline by default; underline on hover
- Color change on hover: `#a3a3a3` → `#fafafa`
- Transition: `150ms ease` — quick, imperceptible

### Buttons

- Ghost style preferred (transparent background)
- Solid style reserved for primary actions only
- Padding: `space-3 space-6`
- Border-radius: `0.375rem` (6px)
- Hover: subtle background shift, not color change

### Code Blocks

- Full-width within content area
- Background: slightly darker than page
- Padding: `space-6`
- Border-radius: `0.5rem`
- Syntax highlighting: muted, cohesive palette
- Line numbers: optional, `text-muted`
- No decorative chrome (fake window buttons, etc.)

### Forms

- Input fields: minimal border, dark background
- Focus state: subtle ring, not glowing
- Labels above inputs, not inline
- Validation: inline, calm, helpful

---

## Motion

### Philosophy

Motion communicates, never decorates. If an animation could be removed without losing meaning, remove it.

### Allowed Motion

- State transitions (hover, focus, active): `150ms ease`
- Content reveal (page load): `200ms ease-out`, opacity only
- Feedback (success/error): subtle, functional

### Forbidden Motion

- Parallax scrolling
- Bouncing, wiggling, pulsing
- Entrance animations on scroll
- Loading spinners (use skeleton states if needed)
- Anything that says "look at me"

---

## Imagery

### Philosophy

Images are content, not decoration. If an image doesn't add understanding, omit it.

### Treatment

- No borders or shadows on images
- Subtle border-radius: `0.375rem`
- Captions in `text-sm`, `text-secondary`
- Alt text is mandatory—accessibility is design

### Diagrams

- Prefer vector (SVG) over raster
- Match the color palette
- Simple, abstract, mathematical
- Let whitespace participate

---

## Voice & Content

### Writing Style

- First person sparingly; ideas over author
- Clear, direct sentences
- Technical accuracy over accessibility theater
- Respect the reader's intelligence

### Content Hierarchy

1. **Title**: What this is about
2. **Date**: When it was written (ideas age)
3. **Body**: The actual content
4. **Metadata**: Tags, reading time (optional, quiet)

### What We Don't Do

- "Hey guys!" energy
- Exclamation points (almost never)
- Emoji in body text
- Self-promotion or calls to action
- Comments begging for engagement

---

## Accessibility

### Non-Negotiables

- Color contrast: WCAG AA minimum (4.5:1 for body text)
- Keyboard navigation: fully functional
- Screen reader: semantic HTML, ARIA where needed
- Reduced motion: respect `prefers-reduced-motion`
- Focus indicators: visible, not obtrusive

### Dark Mode

Dark is default, but provide light mode for:

- Users who prefer it (`prefers-color-scheme: light`)
- High ambient light conditions
- Print stylesheets

---

## Implementation Notes

### Tailwind Configuration

Extend the default theme to match this system:

- Custom color palette
- Extended spacing scale
- Typography plugin for prose styling
- Custom font families

### CSS Custom Properties

Use CSS variables for theming:

```css
:root {
  --bg-primary: #0a0a0a;
  --bg-elevated: #141414;
  --fg-primary: #e5e5e5;
  --fg-secondary: #a3a3a3;
  /* ... */
}
```

### Component Architecture

- Small, composable components
- Props over configuration
- Consistent naming conventions
- Document with Storybook (if complexity warrants)

---

## Summary

This design system serves one purpose: **to disappear**.

The reader should never notice the design—only the ideas. Every decision moves toward clarity, every element earns its place, and the whole feels inevitable.

Quiet. Clear. Inevitable.
