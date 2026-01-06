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
// ============================================================================
// NAVIGATION & WEBSITE CONFIGURATION
// ============================================================================

/**
 * Social Media URLs (optional - bei leerem String wird Link im Footer nicht gerendert)
 */
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "",
  facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "",
  twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER || "",
  linkedin: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "",
} as const;

/**
 * Spenden & Zahlungen
 */
export const DONATION_CONFIG = {
  // Externe Spendenplattform (falls vorhanden)
  externalUrl: process.env.NEXT_PUBLIC_DONATION_URL || "",

  // Interne Route für Spenden-Seite
  internalRoute: "/spenden",

  // PayPal Donation Link (optional)
  paypalUrl: process.env.NEXT_PUBLIC_PAYPAL_DONATION_URL || "",
} as const;

/**
 * Kontaktinformationen
 */
export const CONTACT_INFO = {
  email: "info@muslimin-ev.de",
  phone: "", // Optional - bei Bedarf ergänzen

  // Kontaktformular oder externe Links
  formUrl: "/kontakt",

  // WhatsApp Business (optional)
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL || "",
} as const;

/**
 * Primary Navigation (5 items)
 */
export const NAV_LINKS = [
  {
    href: "/uber-uns",
    label: "Über uns",
    description: "Mission und Werte kennenlernen",
    icon: "HeartHandshake",
  },
  {
    href: "/veranstaltungen",
    label: "Veranstaltungen",
    description: "Unsere aktuellen Veranstaltungen & Highlights",
    icon: "Calendar",
  },
  {
    href: "/mitglied-werden",
    label: "Mitglied werden",
    primary: true,
    description: "Werden Sie Teil unserer Gemeinschaft",
    icon: "Sparkles",
  },
  {
    href: "/spenden",
    label: "Spenden",
    description: "Unterstützen Sie unsere Arbeit",
    icon: "Heart",
    primary: true,
  },
  {
    href: "/kontakt",
    label: "Kontakt",
    description: "Schreiben Sie uns eine Nachricht",
    icon: "Mail",
  },
] as const;

// Member Navigation (authenticated)
export const MEMBER_NAV_LINKS = [
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
] as const;

/**
 * Footer Legal Links
 */
export const LEGAL_LINKS = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
  { href: "/agb", label: "AGB" },
] as const;

/**
 * Trust Line (Footer) - DSGVO compliant, no false claims
 */
export const TRUST_TEXT = "Gemeinnützig anerkannt • Seit 2011" as const;

/**
 * Helpers für Social Links
 */
export const hasAnySocialLink = () =>
  Object.values(SOCIAL_LINKS).some((url) => url.length > 0);

export const getActiveSocialLinks = () =>
  Object.entries(SOCIAL_LINKS)
    .filter(([, url]) => url.length > 0)
    .map(([platform, url]) => ({ platform, url }));

/**
 * Build social url with simple UTM params for tracking per source
 * Example usage: getSocialUrl(SOCIAL_LINKS.instagram, 'public-landing')
 */
export const getSocialUrl = (url: string, source = "site") => {
  if (!url) return url;
  try {
    const u = new URL(url);
    // append utm_source only if not present
    if (!u.searchParams.has("utm_source")) {
      u.searchParams.set("utm_source", source);
      u.searchParams.set("utm_medium", "social");
      u.searchParams.set("utm_campaign", "social_follow");
    }
    return u.toString();
  } catch {
    return url;
  }
};
