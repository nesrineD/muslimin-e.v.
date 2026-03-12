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
  "rounded-3xl-surface border border-sand-300/55 bg-gradient-to-br from-sand-100/92 via-cream-100/88 to-sage-100/74 shadow-[0_22px_55px_-38px_rgba(50,46,42,0.28)] backdrop-blur-sm";

/** Shared prominent closing surface for final CTA sections above the footer. */
export const CLOSING_SECTION_SURFACE_CLASS =
  "rounded-4xl-surface border border-sand-300/65 bg-gradient-to-br from-sand-100/95 via-cream-100/92 to-sage-100/80 shadow-[0_26px_70px_-36px_rgba(50,46,42,0.32)] backdrop-blur-sm";

/** Consistent vertical rhythm across all public pages. */
export const SECTION_HERO_SPACING = "py-16 md:py-24";
export const SECTION_CONTENT_SPACING = "py-12 md:py-16";
export const SECTION_CTA_SPACING = "py-14 md:py-20";

/**
 * Scroll threshold (px) at which sticky CTAs and floating headers become visible.
 * Single source of truth — both Landing and Donation pages use this value.
 */
export const STICKY_SCROLL_THRESHOLD = 300;
