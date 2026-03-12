/**
 * Icon size tier constants (FR-111)
 * Use these instead of ad-hoc h-X w-X classes for consistent icon sizing across all pages.
 *
 * Usage:
 *   import { ICON_LG } from '@/lib/icon-sizes'
 *   <Users className={ICON_LG} />
 */

/** 16px — inline icons, badges, small labels */
export const ICON_SM = "h-4 w-4";

/** 20px — button icons, nav items */
export const ICON_MD = "h-5 w-5";

/** 24px — standard content icons */
export const ICON_LG = "h-6 w-6";

/** 32px — feature/section icons, card headers */
export const ICON_XL = "h-8 w-8";
