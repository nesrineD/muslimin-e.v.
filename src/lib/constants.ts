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

// Navigation Links
export interface NavLink {
  label: string;
  href: string;
  description?: string;
  icon?: string;
  requiresAuth?: boolean;
}

export const NAV_LINKS: NavLink[] = [
  {
    label: "Über uns",
    href: "/about",
    description: "Mission und Werte kennenlernen",
    icon: "HeartHandshake",
  },
  {
    label: "Unsere Veranstaltungen",
    href: "/veranstaltungen",
    description: "Kommende Events und Aktivitäten",
    icon: "Bell",
  },
  {
    label: "Mitglied werden",
    href: "/mitglied-werden",
    description: "Werden Sie Teil unserer Gemeinschaft",
    icon: "Sparkles",
  },
];

export const MEMBER_NAV_LINKS: NavLink[] = [
  {
    label: "Termin buchen",
    href: "/book",
    description: "Vereinbaren Sie einen Beratungstermin",
    icon: "BookOpen",
    requiresAuth: true,
  },
  {
    label: "Beratungsstellen",
    href: "/beratungsstellen",
    description: "Externe Beratungsstellen finden",
    icon: "MapPin",
    requiresAuth: true,
  },
  {
    label: "Mitgliederkarte",
    href: "/member-map",
    description: "Mitglieder und Helferinnen in Ihrer Nähe finden",
    icon: "Map",
    requiresAuth: true,
  },
];

// Legal & Footer Links
export const LEGAL_LINKS = [
  {
    label: "Impressum",
    href: "/impressum",
  },
  {
    label: "Datenschutz",
    href: "/datenschutz",
  },
  {
    label: "AGB",
    href: "/agb",
  },
] as const;

// Contact Information
export const CONTACT_INFO = {
  email: "info@muslimin-ev.de",
  location: "Berlin",
  locationDetail: "Geschäftsstelle",
} as const;

// Social Media Links
export const SOCIAL_LINKS = [
  {
    platform: "Instagram",
    href: "https://instagram.com/muslimin.ev",
    ariaLabel: "Folgen Sie uns auf Instagram",
    icon: "Instagram",
  },
  {
    platform: "Facebook",
    href: "https://facebook.com/muslimin.ev",
    ariaLabel: "Besuchen Sie unsere Facebook-Seite",
    icon: "Facebook",
  },
  {
    platform: "LinkedIn",
    href: "https://linkedin.com/company/muslimin-ev",
    ariaLabel: "Verbinden Sie sich mit uns auf LinkedIn",
    icon: "Linkedin",
  },
] as const;

// Trust & Branding Text
export const TRUST_TEXT = {
  tagline: "Professionelle Beratung und Unterstützung für Vereinsmitglieder.",
  values: "Vertraulich • Kostenfrei • Kompetent",
  gdprCompliant: "DSGVO-konform seit 2024",
  legalStatus: "Gemeinnützig anerkannt",
  copyright: "© 2025 Muslimin e.V.",
  rightsReserved: "Alle Rechte vorbehalten",
} as const;

// Helper Functions
export const getNavLinkByHref = (href: string): NavLink | undefined => {
  return [...NAV_LINKS, ...MEMBER_NAV_LINKS].find((link) => link.href === href);
};

export const getLegalLinkByHref = (
  href: string
): (typeof LEGAL_LINKS)[number] | undefined => {
  return LEGAL_LINKS.find((link) => link.href === href);
};
