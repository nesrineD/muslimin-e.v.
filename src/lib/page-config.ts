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
  "bg-gradient-to-br from-cream-50 via-white to-sage-50/30 min-h-screen";

/** Consistent vertical rhythm across all public pages. */
export const SECTION_HERO_SPACING = "py-16 md:py-24";
export const SECTION_CONTENT_SPACING = "py-12 md:py-16";
export const SECTION_CTA_SPACING = "py-14 md:py-20";
