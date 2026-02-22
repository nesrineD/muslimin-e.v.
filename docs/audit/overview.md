# Design Audit Overview

This document summarizes findings across six dimensions by reviewing all **public pages** of the platform.

---

## 🎨 Colors

- Palette is applied consistently on public pages: **sage** for structure, **charcoal** for text, **coral/clay** as warm accents, **sand/cream** for breathing room.
- Foreground note: On every page the background gradient `from-sage-50 via-cream-50 to-warm-50` appears. It unifies the site but makes pages hard to distinguish at a glance.
- Coral/clay usage is heavy—icon backgrounds, sticky bars, step circles, hover borders, CTA cards—occupying roughly 10‑15 % of visual weight, pushing the limit of an “accent” color.
- **Third‑party exception**: `spenden` page embeds PayPal SVG (#003087, #009cde) which is not in palette but allowed as a logo.
- **Best page**: `uber‑uns` is the most restrained (sage only) and feels most elegant.

---

## 🔍 Contrast

| Pair                                   | Ratio    | Notes                     |
| -------------------------------------- | -------- | ------------------------- |
| text-charcoal-800 on white/sand-50     | ~12:1    | ✅ strong                 |
| text-charcoal-700 on white             | ~10:1    | ✅ strong                 |
| text-sage-700 on white (uber‑uns body) | ~5.2:1   | ✅ AA                     |
| text-sage-600 on sage-50/cream-50      | ~3.8:1   | ❌ fails AA for body text |
| text-white on sticky bar (clay-700/95) | ~5.2:1   | ✅ pass                   |
| gradient text-clip h1s                 | ~5:1 avg | ✅ large text ok          |

**Weak point:** `text-sage-600` on light backgrounds used in body copy (uber‑uns lines 56, 72, 83, 136 and landing page) – passes for headings but not for paragraphs.

---

## 🔘 Buttons

Four variants in circulation: **primary**, **secondary**, **donation**, **outline**.

**Working well:**

- Primary anchors main CTA on each page (“Mitglied werden”, “Termin buchen”).
- Secondary used correctly for softer alternatives.
- Footer uses outline appropriately.

**Issues:**

1. `page.tsx` (member home) line 211: “Jetzt Termin buchen” uses `variant="donation"` – wrong semantic variant.
2. `spenden/page.tsx` line 585: final CTA uses `variant="secondary"` which is weaker than the hero’s `donation` and dilutes urgency.

---

## 🧱 Layout

- **Grid system** solid: `gap-8 md:grid-cols-2 lg:grid-cols-3`, consistent max-width containers. ✅
- **8px spacing** respected (p-8, gap-8, py-16/20/24). ✅
- `spenden` rhythm alternates transparent/white/transparent smoothly. ✅
- `uber‑uns` rhythm breaks: “Kernziele” and “Statistiken” both `bg-sand-50` → merge visually.
- **Member home** (`page.tsx`) runs one continuous gradient with no section breaks; sections float without boundaries, making page feel long and undifferentiated.
- Sticky bars trigger correctly (>800px public‑landing, >500px spenden) but lack dismiss action; on mobile they consume ~20 % of viewport.

---

## ✍️ Typography

| Role     | Class                            | Consistency                  |
| -------- | -------------------------------- | ---------------------------- |
| H1       | `text-4xl md:text-6xl font-bold` | ✅                           |
| H2       | `text-3xl md:text-4xl font-bold` | ✅                           |
| H3       | `text-xl/2xl font-bold/semibold` | ✅                           |
| Body     | `text-lg text-charcoal-700/800`  | ✅ readable                  |
| Sub-copy | `text-sage-600`                  | ⚠️ contrast risk on light bg |

**Structural issue:** gradient‑clip H1 (`bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700`) appears on every page—it has lost impact. Pages with distinct tone (e.g. spenden’s urgency) would benefit from alternate typographic treatments.

---

## 📈 Engagement

**Strengths:**

- `whileInView` animations create lively scroll reveals. ✅
- Hover micro‑interactions (y:-4, scale:1.05) are subtle and consistent. ✅
- Clipboard copy on bank/PayPal info with confirmation – excellent UX. ✅
- Expand/collapse on campaign text prevents overload. ✅
- Sticky CTAs re‑engage scrolled users. ✅
- Step connector line in booking flow is a nice storytelling touch.

**Weaknesses:**

- `SocialMediaSection` block is identical on three pages (public‑landing, member home, mitglied‑werden) and feels like filler.
- Member home community card (line 232) is warm but passive; no internal CTA.

---

## 🎼 Harmony

Public pages largely feel from the same design hand—a strength. Main harmony issue is **gradient overuse**:

- Every hero has the same sage gradient text.
- Section backgrounds blend into a warm cream/sage fog.
- Coral/clay appears so often (icons, hovers, steps, sticky bar, badges) that its accent status fades.

`spenden` and `public-landing` are the most energetic; `uber‑uns` the calmest. `mitglied‑werden` sits between, with clean layout and a single primary CTA.

Worst harmony offender: **member home page** mixes action cards, steps, emotional copy, social media with insufficient visual differentiation.

---

_End of overview._
