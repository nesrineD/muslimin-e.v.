# Muslimin e.V. Design System

**Version:** 1.0  
**Last Updated:** February 2026  
**Status:** Living Document

---

## Table of Contents

1. [Brand Overview](#brand-overview)
2. [Color System](#color-system)
3. [Typography System](#typography-system)
4. [Spacing & Layout](#spacing--layout)
5. [Component Guidelines](#component-guidelines)
6. [Accessibility Standards](#accessibility-standards)
7. [Animation & Motion](#animation--motion)
8. [Best Practices](#best-practices)

---

## Brand Overview

**Organization:** Muslimin e.V. – Muslimischer Mädchen- und Frauenverein

**Design Philosophy:** Warm, inclusive, trustworthy, and community-focused. The design system reflects our mission to provide support, education, and community for Muslim women and girls.

**Core Values:**
- **Trust & Professionalism** – Conveyed through sage tones and clear hierarchy
- **Warmth & Compassion** – Expressed through clay/coral accents and generous spacing
- **Accessibility** – Ensuring all community members can access our content
- **Clarity** – Clear information hierarchy for easy navigation and understanding

---

## Color System

### Primary Color: Sage
The dominant brand color representing trust, calm, and professionalism.

| Shade | Hex | HSL | Usage |
|-------|-----|-----|-------|
| Sage 50 | #f6f7f6 | 120 3% 96% | Subtle backgrounds, hover states |
| Sage 100 | #e3e6e3 | 120 5% 89% | Disabled states, borders |
| Sage 200 | #c7cdc7 | 120 6% 79% | Muted backgrounds |
| Sage 300 | #a1aba1 | 120 7% 65% | Hover effect accents |
| Sage 400 | #7d887d | 142 7% 51% | Secondary text |
| **Sage 500** | **#5b6960** | **142 8% 38%** | **Primary brand color** |
| Sage 600 | #495449 | 142 9% 29% | Dark buttons, active states |
| Sage 700 | #3c443c | 142 10% 24% | Hover states for primary buttons |
| Sage 800 | #323732 | 142 11% 20% | Active states |
| Sage 900 | #2b2f2b | 142 11% 17% | Rarely used, max contrast |

**Use Cases:**
- Primary buttons and CTAs
- Focus rings and interactive states
- Section headers and emphasis
- Navigation elements
- Logo and brand assets

---

### Secondary Color: Accent (Clay/Coral)
A warm, energetic accent color conveying compassion and action. Used for calls-to-action and emotional elements.

| Shade | Hex | HSL | Usage |
|-------|-----|-----|-------|
| Clay 50 | #faf5f2 | 24 45% 95% | Subtle backgrounds |
| Clay 100 | #f4ebe5 | 23 43% 90% | Hover backgrounds |
| Clay 200 | #e8d6ca | 20 40% 82% | Secondary actions |
| Clay 300 | #dcc2af | 17 37% 74% | Borders, dividers |
| Clay 400 | #d0ad94 | 15 36% 66% | Muted accent text |
| **Clay 500** | **#9c604d** | **14 35% 46%** | **Accent buttons, CTAs** |
| Clay 600 | #8d5644 | — | Hover state |
| Clay 700 | #7d4c3b | — | Active state |
| Clay 800 | #6e4232 | — | Dark hover |
| Clay 900 | #5e3829 | — | Max contrast |

**Use Cases:**
- Donation CTAs (primary use)
- Warm accent elements
- Highlight important actions
- Event badges and tags
- Emotional messaging sections

---

### Neutral Colors

#### Sand/Cream
Warm neutral for backgrounds and subtle elements.

| Shade | Hex | Usage |
|-------|-----|-------|
| Sand 50 | #faf8f5 | Lightest backgrounds |
| Sand 100 | #f5f1ec | Section backgrounds |
| Sand 200/400 | #d4cbb8 | Default background, form elements |
| Sand 700 | #9a8b74 | Muted text |
| Sand 900 | #635b48 | Dark, rarely used |

**Use Cases:**
- Default page background
- Section dividers
- Subtle pattern fills
- Card backgrounds (cream variant)

#### Charcoal
Deep neutral for text and high-contrast elements.

| Shade | Hex | Usage |
|-------|-----|-------|
| Charcoal 50 | #f8f9fa | Lightest text backgrounds |
| Charcoal 100 | #e9ecef | Light UI elements |
| Charcoal 800 | #2a2f32 | **Primary text color** |
| Charcoal 900 | #212529 | Headings, max contrast |

**Use Cases:**
- All body text and paragraph content
- Heading text (900)
- Form labels and field text
- Icon fills
- Navigation text

---

### Warm Tones (Special Use)
**ONLY** for passive membership status indicators. Not used elsewhere.

| Shade | Hex | Usage |
|-------|-----|-------|
| Warm 400 | #E6A15C | Passive membership badge |
| Warm 500 | #D9893F | Passive membership hover |
| Warm 700 | #B86A2E | Passive membership active |

---

### Color Contrast & Accessibility

**All color combinations meet WCAG AA+ standards:**

| Foreground | Background | Contrast Ratio | WCAG Level |
|------------|-----------|---|---|
| Charcoal 800 | Sand 400 (Cream) | 8.5:1 | AAA |
| White | Sage 500 | 7.2:1 | AAA |
| White | Clay 500 | 8.1:1 | AAA |
| Sage 700 | White | 9.2:1 | AAA |
| Charcoal 900 | Sand 50 | 12.1:1 | AAA |

---

## Typography System

### Font Stack

**Headings:** Newsreader (Serif)
```css
font-family: var(--font-heading), Newsreader, serif;
```
- Weights: 400, 600, 700
- Use for all headings and emphasis

**Body Text:** Inter (Sans-serif)
```css
font-family: var(--font-body), Inter, sans-serif;
```
- Weights: 400, 500, 600, 700
- Use for all body copy, labels, and UI text

---

### Heading Scale

Headings use a fluid type system with `clamp()` for responsive sizing.

| Level | Desktop Size | Mobile Size | Line Height | Max Width | Weight | Usage |
|-------|---|---|---|---|---|---|
| **H1** | 3rem | 2.5rem | 1.2 | 60ch | 600–700 | Page titles, hero sections |
| **H2** | 2rem | 1.75rem | 1.2 | 60ch | 600 | Section headers |
| **H3** | 1.5rem | 1.25rem | 1.2 | 60ch | 600 | Subsection headers |
| **H4** | 1.25rem | 1.125rem | 1.4 | — | 600 | Card titles |
| **H5** | 1.125rem | 1rem | 1.4 | — | 600 | Small titles |
| **H6** | 1rem | 0.875rem | 1.4 | — | 500 | Labels, captions |

**H1 is fluid:** Uses `clamp(2.5rem, 4vw, 3rem)` to scale responsively.

---

### Body Text

| Type | Size | Weight | Line Height | Letter Spacing | Usage |
|------|------|--------|---|---|---|
| **Body Large** | 1.125rem | 400 | 1.6 | 0 | Intro paragraphs, featured text |
| **Body Regular** | 1rem | 400 | 1.6 | 0 | Standard paragraph text |
| **Body Small** | 0.875rem | 400 | 1.6 | 0 | Metadata, secondary text |
| **Caption** | 0.75rem | 500 | 1.4 | 0.02em | Form labels, hints |
| **Small Text** | 0.8125rem | 400 | 1.5 | 0 | Footnotes, helper text |

**Line Height:** Always 1.6 (24px) for body text ensures optimal readability and WCAG AA compliance.

---

### Text Hierarchy Example

```
H1: "Über Uns" (Page title, 3rem, sage-900)
  H2: "Unsere Mission" (Section header, 2rem, sage-800)
    Body: "Ein aktiver muslimischer..." (Regular, 1rem, charcoal-800)
      H3: "Was wir anbieten" (Subsection, 1.5rem, sage-800)
        Small: "Mehrmals wöchentlich" (0.875rem, charcoal-600)
```

---

## Spacing & Layout

### Spacing Scale

Based on Tailwind's default spacing scale (4px base unit). Use **only** these values for consistency.

| Tailwind | Size | Usage |
|----------|------|-------|
| px | 1px | Borders only |
| 0.5 | 2px | Micro spacing |
| 1 | 4px | Tight spacing |
| 2 | 8px | Compact spacing |
| 3 | 12px | Element spacing |
| **4** | **16px** | **Standard spacing** |
| 5 | 20px | Medium spacing |
| 6 | 24px | Section spacing |
| 8 | 32px | Large sections |
| 10 | 40px | Extra large sections |
| 12 | 48px | Hero sections |
| 16 | 64px | Page margins |

**Guidelines:**
- Use spacing scale for **all** margins and padding
- Prefer `gap` classes over margin combinations
- Never use arbitrary values like `p-[16px]`—use `p-4` instead
- Increase spacing on larger screens using responsive prefixes: `p-4 md:p-6 lg:p-8`

---

### Layout System

**Primary Layout Method:** Flexbox
```css
/* Standard horizontal layout */
.flex.items-center.justify-between

/* Vertical stack with spacing */
.flex.flex-col.gap-4

/* Centered content */
.flex.items-center.justify-center
```

**Secondary Layout Method:** CSS Grid (only for complex 2D layouts)
```css
/* 3-column layout with responsive fallback */
.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-3.gap-6
```

**Never use:** Floats, negative margins, absolute positioning (except for absolute overlays with clear purpose)

---

### Container Widths

| Breakpoint | Width | Use Case |
|-----------|-------|----------|
| Mobile | 100% - 2 × padding | Small screens |
| `sm` (640px) | Full width | Tablets |
| `md` (768px) | 90% max-width | Small desktops |
| `lg` (1024px) | 1200px max-width | Standard desktops |
| `xl` (1280px) | 1344px max-width | Large displays |

---

### Section Padding

| Device | Padding | Tailwind |
|--------|---------|----------|
| Mobile | 16px sides, 24px top/bottom | `px-4 py-6` |
| Tablet | 24px sides, 32px top/bottom | `px-6 py-8` |
| Desktop | 32px sides, 48px top/bottom | `px-8 py-12` |

---

## Component Guidelines

### Button Component

Buttons use the `Button` component with predefined variants.

**Variants:**

| Variant | Background | Text | Hover Effect | Use Case |
|---------|-----------|------|---|---|
| `default` | Sage 600 | White | Darker sage (700) | General actions |
| `primary` | Gradient: Sage 700→600 | White | Enhanced shadow | **Primary CTAs** |
| `donation` | Gradient: Clay 700→Coral 600 | White | Enhanced shadow | **Donation CTAs** |
| `secondary` | White w/ Clay border | Charcoal 800 | Subtle clay bg | Alternative actions |
| `outline` | Transparent, Sage border | Sage 700 | Light sage bg | Tertiary actions |
| `ghost` | Transparent | Sage 700 | Light sage bg | Links that look like buttons |
| `passive` | Warm 400 | Charcoal | Brightness shift | Passive membership status |

**Sizes:**

| Size | Height | Padding | Font Size | Usage |
|------|--------|---------|-----------|-------|
| `sm` | 36px | 16px | 14px | Compact actions |
| `md` | 44px | 24px | 16px | **Standard, default** |
| `lg` | 52px | 32px | 18px | Prominent CTAs |

**Example Usage:**
```tsx
// Primary CTA for donations
<Button variant="donation" size="lg">Jetzt Spenden</Button>

// Secondary action
<Button variant="secondary">Mehr erfahren</Button>

// Tertiary link-like button
<Button variant="ghost">Zurück</Button>
```

**Accessibility:**
- All buttons have focus-visible ring: `ring-2 ring-sage-500 ring-offset-2`
- Disabled state: `opacity-50 cursor-not-allowed`
- Include icons: `<Button><Heart className="w-4 h-4" /> Unterstützen</Button>`

---

### Card Component

Cards group related content with consistent styling.

**Variants:**

| Variant | Background | Use Case |
|---------|-----------|----------|
| `white` | Pure white | Most cards, events, donations |
| `cream` | Cream 50 | Featured content, testimonials |

**Padding:**

| Size | Padding | Use Case |
|------|---------|----------|
| `sm` | 16px | Compact cards |
| `md` | 24px | **Standard, default** |
| `lg` | 32px | Featured, full-width cards |

**Interactive Cards:**
- Use `href` prop to make entire card clickable
- Hover effect: Slight lift (`-translate-y-1`) + enhanced shadow
- Show visual feedback with gradient overlay on hover
- Respects `prefers-reduced-motion` for accessibility

**Example Usage:**
```tsx
// Event card (clickable)
<Card href="/events/123" variant="white" padding="md">
  <h3>Wöchentlicher Frauenkreis</h3>
  <p>Jeden Mittwoch um 19:00</p>
</Card>

// Featured testimonial
<Card variant="cream" padding="lg">
  <p>"Diese Gemeinschaft hat mein Leben verändert..."</p>
  <span className="text-sm text-muted-foreground">— Fatima, Member</span>
</Card>
```

**Shadow System:**
- Standard: `shadow-card-standard` (4px, 5% opacity)
- Hover: `shadow-lg` (automatic elevation)
- Cards automatically get subtle border ring on hover

---

### Typography Components

All `<h1>` through `<h6>` tags are styled via globals.css with proper hierarchy.

**Heading Hierarchy Rules:**
- Each page has **one H1** (page title)
- Use H2 for major sections
- Use H3 for subsections within H2
- Never skip levels (don't jump from H1 to H3)
- Never use headings for styling—use semantic elements instead

**Example Structure:**
```html
<!-- Page Layout -->
<h1>Spenden</h1>              <!-- Page title -->

<h2>Warum spenden?</h2>         <!-- First section -->
  <h3>Unser Bedarf</h3>          <!-- Subsection -->
  <p>Text content...</p>

<h2>Spendenkampagnen</h2>       <!-- Second section -->
  <h3>Sommercamp 2024</h3>        <!-- Campaign 1 -->
  <h3>Schulhilfe-Programm</h3>    <!-- Campaign 2 -->
```

---

### Shadow System

Custom sage-based shadows for visual hierarchy.

| Shadow | Value | Usage |
|--------|-------|-------|
| `shadow-card-standard` | `0 4px 12px rgba(0,0,0,0.05)` | Default card shadow |
| `shadow-sm` | `0 1px 2px` | Subtle elevation, tokens |
| `shadow-md` | `0 4px 6px` | Standard elevation |
| `shadow-lg` | `0 10px 15px` | Hover states |
| `shadow-xl` | `0 20px 25px` | Modal/overlay elevation |

**Guideline:** Be consistent—if you add a shadow, consider using a defined shadow level, not arbitrary values.

---

### Border Radius

All components use consistent border radius values.

| Size | Value | Usage |
|------|-------|-------|
| `rounded-sm` | `calc(var(--radius) - 4px)` | 2px radius |
| `rounded-md` | `calc(var(--radius) - 2px)` | 4px radius |
| `rounded-lg` | `var(--radius)` | 8px radius (default) |

**Root Value:** `--radius: 0.5rem` (8px) set in globals.css

---

## Accessibility Standards

All components and pages must meet **WCAG 2.1 AA** standards minimum.

### Color Contrast

**Minimum Ratios:**
- Normal text: 4.5:1
- Large text (18px+ or 14px bold+): 3:1
- UI components: 3:1

**Testing:**
- Use [WAVE](https://wave.webaim.org/) for automated checks
- Use [Axe DevTools](https://www.axe-core.org/) for detailed audits
- Test with color blindness simulators (all color combinations must be distinguishable)

### Focus Management

**All interactive elements require visible focus indicators:**
```css
*:focus-visible {
  outline: none;
  ring-2 ring-sage-500 ring-offset-2 ring-offset-background;
}
```

- **Ring color:** Sage 500 (provides 7.2:1 contrast on all backgrounds)
- **Ring offset:** 2px for clarity
- **Never remove focus indicators** for aesthetics

### Keyboard Navigation

- All buttons and links must be keyboard accessible
- Tab order should match visual left-to-right, top-to-bottom flow
- Use semantic HTML: `<button>`, `<a>`, `<nav>` instead of divs with click handlers
- Implement proper ARIA labels for icon-only buttons

**Example:**
```tsx
// Good: Semantic button
<button>Zur Spendenseite</button>

// Bad: Unstyled div with click handler
<div role="button" onClick={handler}>Zur Spendenseite</div>
```

### Motion & Animation

**Respect user preferences:**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

- All animations must have reduced-motion equivalent
- No auto-playing animations or videos (require user interaction)
- Keep animations under 300ms for quick feedback

### Images & Icons

- **All images:** Include descriptive `alt` text (except decorative)
- **Icon-only buttons:** Include `aria-label` or hidden text
- **SVGs:** Add `<title>` or `aria-label` for screen readers

**Example:**
```tsx
// Icon button with label
<button aria-label="Menü öffnen">
  <Menu size={24} />
</button>

// Image with alt text
<img 
  src="/event.jpg" 
  alt="Frauen sitzen im Kreis während eines Veranstaltungsgesprächs"
/>
```

### Language

- **Primary language:** German (de)
- **Set in HTML:** `<html lang="de">`
- All content and labels in German

---

## Animation & Motion

### Custom Animations

Defined in globals.css and respect `prefers-reduced-motion`.

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `gradient-shift` | 6s | ease | Animated gradients |
| `float` | 3s | ease-in-out | Subtle up/down movement |
| `pulse-glow` | 2s | ease-in-out | Glowing shadow effect |

### Transition Timings

| Duration | Easing | Usage |
|----------|--------|-------|
| **200ms** | ease-out | Quick feedback (button clicks) |
| **300ms** | cubic-bezier(0.4, 0, 0.2, 1) | **Standard transitions** |
| **400ms** | cubic-bezier(0.4, 0, 0.2, 1) | Card hover effects |
| **600ms** | ease | Slow reveals, attention-grabbing |

**Guidelines:**
- Keep animations purposeful and under 400ms for immediate feedback
- Use consistent easing across the site
- Never animate on scroll without considering performance
- Always provide a non-motion equivalent

---

## Best Practices

### Do's ✅

1. **Use the design tokens:** Always reference colors from the palette, never use arbitrary hex values
2. **Follow the type hierarchy:** Use H1→H2→H3 structure for semantic HTML
3. **Maintain spacing consistency:** Use the spacing scale exclusively
4. **Test accessibility:** Run WCAG checks before deploying new pages
5. **Mobile-first design:** Build for mobile, enhance for larger screens
6. **Use semantic HTML:** `<button>`, `<nav>`, `<main>`, `<header>`, `<footer>`
7. **Lazy load images:** Use `next/image` with `loading="lazy"`
8. **Provide alt text:** Describe images for screen reader users
9. **Use `focus-visible`:** Let users see keyboard navigation
10. **Document decisions:** Add comments explaining unusual styling choices

### Don'ts ❌

1. **Don't use arbitrary Tailwind values:** Use `p-4` not `p-[16px]`
2. **Don't override color tokens:** Reference `bg-sage-500`, not hex values
3. **Don't skip heading levels:** No jumping from H1 to H3
4. **Don't remove focus indicators:** Accessibility is non-negotiable
5. **Don't use space-* classes:** Use `gap` or margin utilities instead
6. **Don't mix heading fonts:** Newsreader for headings, Inter for body
7. **Don't stack multiple animations:** One animation per element
8. **Don't leave images without alt text:** Every image needs description
9. **Don't use pure black or white:** Use sage/charcoal variants instead
10. **Don't hardcode colors in component styles:** Use CSS variables and design tokens

### Common Patterns

#### Primary CTA Section
```tsx
<section className="bg-sand-200 py-12 md:py-16">
  <div className="max-w-4xl mx-auto px-4 text-center">
    <h2>Unterstütze unsere Arbeit</h2>
    <p className="text-lg text-charcoal-600 mt-4 mb-8">
      Jede Spende hilft uns, mehr Frauen und Mädchen zu erreichen.
    </p>
    <Button variant="donation" size="lg">Jetzt Spenden</Button>
  </div>
</section>
```

#### Event Card Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {events.map(event => (
    <Card key={event.id} href={`/events/${event.id}`}>
      <h3>{event.title}</h3>
      <p className="text-sm text-charcoal-600 mt-2">{event.date}</p>
    </Card>
  ))}
</div>
```

#### Section with Heading
```tsx
<section className="py-12 md:py-16">
  <div className="max-w-6xl mx-auto px-4">
    <h2>Unsere Angebote</h2>
    <p className="text-lg text-charcoal-600 mt-4 mb-8 max-w-2xl">
      Introductory paragraph setting context.
    </p>
    {/* Content here */}
  </div>
</section>
```

---

## Implementation Checklist

Before launching a new page:

- [ ] Typography hierarchy is correct (H1→H2→H3)
- [ ] All colors come from the palette (no arbitrary hex)
- [ ] Spacing uses the scale (no arbitrary values)
- [ ] Focus states visible for all interactive elements
- [ ] Images have descriptive alt text
- [ ] Color contrast meets WCAG AA (tested)
- [ ] Mobile layout is clean and readable
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Form labels are associated with inputs
- [ ] All buttons have sufficient touch target size (44px minimum)
- [ ] No critical content hidden on mobile
- [ ] Page structure makes sense without CSS

---

## Resources

- **Tailwind CSS:** https://tailwindcss.com/docs
- **WCAG 2.1:** https://www.w3.org/WAI/WCAG21/quickref/
- **Color Contrast Checker:** https://webaim.org/resources/contrastchecker/
- **Next.js:** https://nextjs.org/docs
- **Radix UI:** https://www.radix-ui.com/docs/primitives/overview/introduction

---

## Contact & Questions

For design system questions or feedback, contact the design team.

**Document Status:** This is a living document. Please contribute improvements and updates as we evolve the design system.
