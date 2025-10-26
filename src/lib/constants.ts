/**
 * Application-wide constants
 * Centralized location for repeated values across the app
 */

// Beratungskategorien / Counseling Categories
export const CATEGORIES = {
  PSYCHOLOGICAL: "Psychologische Beratung",
  SOCIAL: "Sozialberatung",
  PREGNANCY: "Schwangerschaftsbegleitung",
  OTHER: "Andere Anliegen",
} as const;

export const CATEGORY_LIST = [
  CATEGORIES.PSYCHOLOGICAL,
  CATEGORIES.SOCIAL,
  CATEGORIES.PREGNANCY,
  CATEGORIES.OTHER,
];

// Category metadata with icons and descriptions
export const CATEGORY_DETAILS = [
  {
    id: "psychological",
    name: CATEGORIES.PSYCHOLOGICAL,
    description:
      "Unterstützung bei Stress, Angst, Depression oder anderen psychischen Belastungen",
    icon: "🧠",
  },
  {
    id: "social",
    name: CATEGORIES.SOCIAL,
    description:
      "Hilfe bei Behördengängen, Anträgen, Kindergeld und sozialen Angelegenheiten",
    icon: "🤝",
  },
  {
    id: "pregnancy",
    name: CATEGORIES.PREGNANCY,
    description: "Beratung während der Schwangerschaft und nach der Geburt",
    icon: "🤱",
  },
  {
    id: "other",
    name: CATEGORIES.OTHER,
    description: "Weitere Themen in denen Sie helfen möchten",
    icon: "💬",
  },
];

// Type exports
export type CategoryKey = keyof typeof CATEGORIES;
export type CategoryValue = (typeof CATEGORIES)[CategoryKey];
export type CategoryDetail = (typeof CATEGORY_DETAILS)[number];
