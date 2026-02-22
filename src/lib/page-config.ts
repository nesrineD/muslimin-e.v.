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
