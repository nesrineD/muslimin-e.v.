# Design Review Report

**Overall Score:** 5.5 / 10

The public‑facing pages demonstrate solid brand intent and mobile‑first thinking, but the authenticated section (helper dashboard, member appointments, availability calendar, map components) uses a completely different, off‑palette color system — creating a fractured two‑tier experience that breaks brand trust the moment a user logs in.

---

## 🔧 Critical Issues (must fix)

1. **Massive off‑palette emerald color system** in authenticated pages – 47 + instances across five files. ✅
   - Replace all `emerald-*` tokens with `sage-*` as there is no emerald palette in the design system.

   **Affected files & representative lines:**
   - `helper/availability/page.tsx` – 124, 294, 325, 354, 432, 459, 512, 583
   - `(member)/my-appointments/page.tsx` – 129, 192, 207, 324, 345, 409, 457
   - `helper/dashboard/page.tsx` – 656, 687, 744, 756, 795, 840, 963
   - `helper/register/page.tsx` – 146, 205, 232, 250, 283
   - `calendar/GridAvailabilityCalendar.tsx` – 123, 179, 295

   ```diff
   - "bg-emerald-500 text-white"
   + "bg-sage-500 text-white"
   ```

2. **Hardcoded hex values in map components** – bypasses the token system. ✅
   - `MemberCard.tsx`: lines 24, 73, 134
   - `MemberLocationMap.tsx`: line 335

   ```diff
   - <div className="w-10 h-10 bg-[#9c604d] text-white rounded-full ...">
   + <div className="w-10 h-10 bg-clay-500 text-white rounded-full ...">
   ```

3. **`gray-*` text tokens** throughout authenticated pages – violates charcoal‑only text rule. ✅
   - Examples: `dashboard/page.tsx`:226, `login/page.tsx`:267, `availability/page.tsx`:336 (and 30+ more)

   ```diff
   - className="font-semibold text-gray-900"
   + className="font-semibold text-charcoal-800"
   ```

4. **`--sage` CSS variable has wrong hue** in `globals.css` (line 9). ✅
   ```css
   /* Before: */ --sage: 142 8% 38%;
   /* After:  */ --sage: 162 8% 38%;  /* matches #5b6960 */
   ```

5. **`--background` set to pure white** in `globals.css` (line 53). ✅
   ```css
   /* Before: */ --background: 0 0% 100%;
   /* After:  */ --background: 40 33% 97%;  /* sand-50 */
   ```

6. **No `prefers-reduced-motion` support** – fails WCAG 2.1 AA SC 2.3.3. ✅
   Added at end of `globals.css`.

7. **FullCalendar overrides** use off‑palette hardcoded grays in `globals.css` (lines 174‑217). ✅
   Replaced `#e5e7eb`, `#9ca3af`, `#ecfdf5` etc. with corresponding CSS variables.

---

## ⚙️ Improvements (ranked by impact)

- 🚩 Footer background (`footer.tsx:15`) uses `bg-white`; should be `bg-charcoal` per palette. **Needs human review — footer restructuring affects layout across all pages.**
- `EventCard.tsx` badges (`lines 25‑27`) use `amber-*` and `blue-*`; swap to `warm-*` and `sage-*`. ✅
- 🚩 Contact form (`kontakt/page.tsx:78‑133`) lacks submit handler, validation, loading state, success/error feedback. **Needs human review — business logic change.**
- Social media hover backgrounds (`SocialMediaSection.tsx:103‑130`): change `hover:bg-pink-50` / `hover:bg-red-50` → `hover:bg-sand-100`. ✅
- 🚩 Cookie banner checkboxes (`cookie-banner.tsx:164`) use native `<input>`; replace with `<Checkbox>` component. **Needs human review — accessibility and consent logic.**
- `uber-uns` page has two consecutive `bg-sand-50` sections – they merge visually; adjust alternation.

### Quick Wins

- Change `bg-emerald-100 text-emerald-800` in `helper/register/success/page.tsx` to `bg-sage-100 text-sage-800` (2 lines). ✅
- In `MemberCard.tsx`, replace all 5 instances of `border-gray-200` / `text-gray-*` with `border-sand-200` / `text-charcoal-*`. ✅
- Social footer icon buttons (`SocialMediaSection.tsx:169`) use 32×32px; increase to 44×44px for touch targets. ✅
- Header mobile menu button (`header.tsx:338`) size is `sm` (36px); change to `md` (≥44px). ✅

---

## ✅ Brand Compliance Summary

- **Colors used correctly:** Partial – public pages compliant; authenticated pages failing.
- **Offending values:** `emerald-*` (47+ instances), `gray-*` text (30+ instances), `#9c604d` hardcoded, `amber-*`, `blue-*`, `pink-*`, `red-*`, `green-*`, FullCalendar hex grays.
- **Semantic tokens:** Public pages use them properly; authenticated pages bypass tokens frequently.

---

## ♿ Accessibility Summary

- **Contrast issues:**
  - `text-sage-600` on `bg-white` at `uber-uns/page.tsx:56` (~4.1:1; below AA 4.5:1).
  - `text-sage-600` on `bg-sand-50` (~3.8:1; fails for body text).
- **Focus state issues:**
  - `EventCard.tsx:148` expand button lacks `rounded-*` so the focus ring is sharp.
  - Cookie banner native checkboxes have no custom focus styling.
- **Touch targets:**
  - Social footer icons 32×32px (should be ≥44×44px). ✅
  - Header mobile menu button 36px (should be ≥44px). ✅
