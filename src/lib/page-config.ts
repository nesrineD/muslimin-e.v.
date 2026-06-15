/**
 * Shared page-level configuration constants.
 * All public pages MUST import wrapper class from here (FR-001).
 * No page may define its own page-level gradient.
 */

/**
 * Shared background gradient applied to the root <div> of every public page.
 * Single source of truth — changing this value updates all 7 pages at once.
 */
export const PUBLIC_PAGE_WRAPPER_CLASS =
  "bg-gradient-to-br from-sand-50 via-cream-50 to-sage-100/45 min-h-screen";

/** Shared elevated surface for lower-page cards before the footer. */
export const FOOTER_BRIDGE_SURFACE_CLASS =
  "rounded-3xl-surface border border-sage-600/40 bg-gradient-to-br from-sage-700 to-sage-800 shadow-[0_22px_55px_-38px_rgba(50,46,42,0.28)] backdrop-blur-sm text-white";

/** Shared prominent closing surface for final CTA sections above the footer. */
export const CLOSING_SECTION_SURFACE_CLASS =
  "rounded-4xl-surface border border-sage-600/50 bg-gradient-to-br from-sage-700 via-sage-700 to-sage-800 shadow-[0_-8px_30px_-12px_rgba(91,105,96,0.3)] backdrop-blur-sm text-white";

/** Alternating section background for visual rhythm between sections. */
export const SECTION_ALTERNATE_SURFACE_CLASS =
  "bg-sand-100/50 border-y border-sand-200/40";

/** White surface for contrast in alternating rhythm. */
export const SECTION_WHITE_SURFACE_CLASS =
  "bg-white border-y border-sand-100/60";

/** Dark featured section for statistics and key highlights. */
export const SECTION_DARK_FEATURE_CLASS =
  "bg-gradient-to-br from-sage-800 via-sage-800 to-charcoal-800 text-white";

/** CTA button classes for dark surfaces. */
export const DARK_CTA_PRIMARY_BUTTON_CLASS =
  "bg-clay-500 hover:bg-clay-600 text-white";
export const DARK_CTA_SECONDARY_BUTTON_CLASS =
  "border-cream-200 text-cream-100 hover:bg-sage-600";

/** Consistent vertical rhythm across all public pages. */
export const SECTION_HERO_SPACING = "py-16 md:py-24";
export const SECTION_CONTENT_SPACING = "py-12 md:py-16";
export const SECTION_CTA_SPACING = "py-14 md:py-20";

/**
 * Scroll threshold (px) at which sticky CTAs and floating headers become visible.
 * Single source of truth — both Landing and Donation pages use this value.
 */
export const STICKY_SCROLL_THRESHOLD = 300;
