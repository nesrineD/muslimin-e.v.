/**
 * Framer Motion Animation Variants
 * Reusable animation configurations for consistent motion design
 */

import { Variants } from "framer-motion";

/**
 * Standard container animation with stagger effect
 * Use for parent elements containing multiple animated children
 *
 * Timing rationale:
 * - staggerChildren: 0.1s (100ms) - Creates a smooth sequential appearance without feeling rushed.
 *   This delay is short enough to maintain momentum while long enough to be visually distinct.
 * - delayChildren: 0.1s (100ms) - Initial delay before first child animation starts, allowing
 *   the container fade-in to establish context before content appears.
 */
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      /** 100ms delay between each child animation for smooth sequential appearance */
      staggerChildren: 0.1,
      /** 100ms initial delay before children start animating, establishing container context first */
      delayChildren: 0.1,
    },
  },
};

/**
 * Standard item animation from bottom
 * Use for individual items in animated lists
 *
 * Timing rationale:
 * - duration: 0.5s (500ms) - Balanced animation speed that feels responsive without being jarring.
 *   This duration is long enough to be smooth and natural, but short enough to not delay content visibility.
 */
export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    /** 500ms duration provides smooth, responsive animation without delaying content visibility */
    transition: { duration: 0.5 },
  },
};

/**
 * Fade in animation
 * Simple opacity transition
 *
 * Timing rationale:
 * - duration: 0.6s (600ms) - Slightly slower than standard animations to create a gentle, polished fade.
 *   The longer duration emphasizes the fade effect and provides a calmer, more refined user experience.
 */
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    /** 600ms duration creates a gentle, polished fade that feels refined and intentional */
    transition: { duration: 0.6 },
  },
};

/**
 * Slide in from left
 *
 * Timing rationale:
 * - duration: 0.5s (500ms) - Standard duration that balances smoothness with responsiveness.
 *   Creates a natural sliding motion that doesn't feel slow or rushed.
 */
export const slideInLeftVariants: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    /** 500ms provides smooth sliding motion without feeling sluggish */
    transition: { duration: 0.5 },
  },
};

/**
 * Slide in from right
 *
 * Timing rationale:
 * - duration: 0.5s (500ms) - Standard duration matching slideInLeft for consistent directional animations.
 *   Maintains a uniform feel across all sliding transitions in the application.
 */
export const slideInRightVariants: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    /** 500ms matches slideInLeft for consistent directional animation timing */
    transition: { duration: 0.5 },
  },
};

/**
 * Scale up animation
 * Good for cards and CTAs
 *
 * Timing rationale:
 * - duration: 0.5s (500ms) - Standard duration that makes the scale transformation feel natural.
 *   Provides enough time for the scale effect to be noticeable while maintaining snappiness.
 */
export const scaleUpVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    /** 500ms allows the scale transformation to be noticeable yet snappy */
    transition: { duration: 0.5 },
  },
};

/**
 * Stagger container with longer delay
 * Use for hero sections
 *
 * Timing rationale:
 * - staggerChildren: 0.2s (200ms) - Longer stagger for hero sections creates a more dramatic,
 *   attention-grabbing entrance. The slower pace emphasizes importance and allows each element
 *   to be noticed individually.
 * - delayChildren: 0.3s (300ms) - Longer initial delay gives users time to register the page
 *   before content begins appearing, creating a more controlled, intentional reveal.
 */
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      /** 200ms stagger creates dramatic, attention-grabbing sequential entrance for hero content */
      staggerChildren: 0.2,
      /** 300ms initial delay allows users to register the page before content reveals */
      delayChildren: 0.3,
    },
  },
};

/**
 * Item with larger movement
 * Use with heroContainerVariants
 *
 * Timing rationale:
 * - duration: 0.6s (600ms) - Longer duration matches the more dramatic nature of hero sections.
 *   The slower pace complements the longer stagger delay, creating a polished, premium feel.
 */
export const heroItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    /** 600ms duration complements hero section's dramatic pacing for a premium feel */
    transition: { duration: 0.6 },
  },
};
