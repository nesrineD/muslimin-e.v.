"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Official Brand SVG Icons
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient
        id="instagramGradient"
        x1="0%"
        y1="0%"
        x2="100%"
        y2="100%"
      >
        <stop offset="0%" stopColor="#833ab4" />
        <stop offset="25%" stopColor="#fd1d1d" />
        <stop offset="50%" stopColor="#fcb045" />
        <stop offset="75%" stopColor="#ffdc80" />
        <stop offset="100%" stopColor="#833ab4" />
      </linearGradient>
    </defs>
    <path
      fill="url(#instagramGradient)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
  </svg>
);

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
    />
  </svg>
);

const YouTubeIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#FF0000"
      d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
    />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#25D366"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"
    />
  </svg>
);

interface SocialMediaSectionProps {
  variant?: "card" | "compact" | "minimal" | "footer";
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  showHeader?: boolean;
  showLabels?: boolean;
  className?: string;
  context?: "public" | "about" | "events" | "member" | string;
  theme?: "light" | "dark";
}

const DEFAULT_TITLE = "Folge uns auf Social Media";
const DEFAULT_SUBTITLE = "Aktuelle Termine, Hinweise und Live-Updates.";

const SOCIAL_MEDIA = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/muslimin.de/",
    color: "text-pink-600",
    hoverColor: "hover:text-pink-700",
    bgHover: "hover:bg-sand-100",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@muslimin.ev",
    color: "text-gray-900",
    hoverColor: "hover:text-black",
    bgHover: "hover:bg-sand-100",
  },
  {
    name: "YouTube",
    icon: YouTubeIcon,
    url: "https://www.youtube.com/@muslimin-ev",
    color: "text-red-600",
    hoverColor: "hover:text-red-700",
    bgHover: "hover:bg-sand-100",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    url: "https://whatsapp.com/channel/0029VaN2y5qIt5rsURhd1o2Y",
    color: "text-green-600",
    hoverColor: "hover:text-green-700",
    bgHover: "hover:bg-sand-100",
  },
];

export function SocialMediaSection({
  variant = "card",
  title,
  subtitle,
  showTitle = true,
  showHeader = true,
  showLabels = true,
  className = "",
  context = "site",
  theme = "light",
}: SocialMediaSectionProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  type Social = (typeof SOCIAL_MEDIA)[number];

  function SocialButton({
    social,
    variant = "default",
  }: {
    social: Social;
    variant?: "default" | "compact" | "minimal" | "footer" | "card";
  }) {
    const Icon = social.icon;

    const baseClasses =
      "inline-flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2";

    // FOOTER VARIANT — monochrome, elegant, unified tone
    if (variant === "footer") {
      return (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} group rounded-md p-2 text-sand-100/85 transition-all duration-200 hover:-translate-y-0.5 hover:bg-sand-100/10 hover:text-white focus-visible:ring-offset-charcoal-800`}
          aria-label={`Folge uns auf ${social.name}`}
          title={social.name}
        >
          <Icon className="h-5 w-5 text-current transition-colors" />
        </a>
      );
    }

    // MINIMAL VARIANT (NEW - for Veranstaltungen)
    if (variant === "minimal") {
      return (
        <motion.a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className={`${baseClasses} flex flex-col items-center gap-2 p-4 rounded-xl bg-white border-2 border-sand-200 ${social.bgHover} hover:border-sage-300 transition-all duration-200 group`}
          aria-label={`Folge uns auf ${social.name}`}
          title={social.name}
        >
          <motion.div whileHover={{ rotate: 5 }} transition={{ duration: 0.3 }}>
            <Icon className={`h-8 w-8 ${social.color} transition-colors`} />
          </motion.div>
          <span
            className={`text-sm font-semibold text-charcoal-700 ${social.hoverColor} transition-colors`}
          >
            {social.name}
          </span>
        </motion.a>
      );
    }

    // COMPACT VARIANT
    if (variant === "compact") {
      const isDark = theme === "dark";
      return (
        <motion.a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05, y: -3 }}
          whileTap={{ scale: 0.97 }}
          className={`${baseClasses} flex items-center gap-3 px-6 py-4 rounded-xl ${
            isDark
              ? "bg-white/10 border-2 border-cream-200/30 hover:bg-white/20 hover:border-cream-200/50"
              : "bg-white/90 backdrop-blur-sm border-2 border-sage-200 hover:border-sage-300"
          } shadow-md hover:shadow-lg transition-all duration-300 group`}
          aria-label={`Folge uns auf ${social.name}`}
          title={social.name}
        >
          <motion.div whileHover={{ rotate: 8 }} transition={{ duration: 0.3 }}>
            <Icon className={`h-7 w-7 ${social.color}`} />
          </motion.div>
          <span
            className={`font-bold ${isDark ? "text-white" : "text-charcoal-800"} ${social.hoverColor} transition-colors`}
          >
            {social.name}
          </span>
        </motion.a>
      );
    }

    // CARD VARIANT (Default)
    return (
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center p-6 rounded-2xl bg-white border-2 border-sand-200 hover:border-sage-300 transition-all duration-300 group shadow-sm hover:shadow-md`}
        aria-label={`Folge uns auf ${social.name}`}
        title={social.name}
      >
        <motion.div
          whileHover={{ rotate: 8 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className={`w-8 h-8 ${social.color} mr-3`} />
        </motion.div>
        {showLabels && (
          <span
            className={`text-lg font-semibold text-charcoal-700 ${social.hoverColor}`}
          >
            {social.name}
          </span>
        )}
      </motion.a>
    );
  }

  const computedTitle =
    title ??
    (context === "events"
      ? "Eindrücke von unseren Veranstaltungen"
      : context === "about"
        ? DEFAULT_TITLE
        : DEFAULT_TITLE);

  const computedSubtitle =
    subtitle ??
    (context === "events"
      ? "Fotos, Videos und aktuelle Termine findest du auf unseren Social-Media-Kanälen"
      : context === "about"
        ? "Folge unseren Projekten und Berichten"
        : DEFAULT_SUBTITLE);

  // FOOTER VARIANT
  if (variant === "footer") {
    return (
      <ul
        className={`flex flex-wrap items-center gap-3 ${className}`}
        aria-label={computedTitle}
      >
        {SOCIAL_MEDIA.map((social) => (
          <li key={social.name}>
            <SocialButton social={social} variant="footer" />
          </li>
        ))}
      </ul>
    );
  }

  // MINIMAL VARIANT (for Veranstaltungen)
  if (variant === "minimal") {
    return (
      <div className={`space-y-6 ${className}`}>
        {showTitle && (
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-charcoal-800 mb-2">
              {computedTitle} 📸
            </h3>
            <p className="text-base text-charcoal-600 max-w-2xl mx-auto">
              {computedSubtitle}
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {SOCIAL_MEDIA.map((social) => (
            <SocialButton key={social.name} social={social} variant="minimal" />
          ))}
        </div>
      </div>
    );
  }

  // COMPACT VARIANT
  if (variant === "compact") {
    const isDark = theme === "dark";
    return (
      <div className={`space-y-6 ${className}`}>
        {showTitle && (
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              {isDark ? (
                <span className="text-white">{computedTitle}</span>
              ) : (
                <span className="bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
                  {computedTitle}
                </span>
              )}
            </h3>
            <p
              className={`text-base md:text-lg text-center max-w-2xl mx-auto ${isDark ? "text-cream-200" : "text-charcoal-700"}`}
            >
              {computedSubtitle}
            </p>
          </div>
        )}
        <div className="flex justify-center gap-4 flex-wrap max-w-3xl mx-auto">
          {SOCIAL_MEDIA.map((social) => (
            <SocialButton key={social.name} social={social} variant="compact" />
          ))}
        </div>
      </div>
    );
  }

  // CARD VARIANT (Default)
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`w-full ${className}`}
    >
      <Card className="border-2 border-sage-200 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        {showHeader && (
          <CardHeader className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
                <span className="bg-gradient-to-r from-sage-600 via-sage-500 to-sage-600 bg-clip-text text-transparent">
                  {computedTitle}
                </span>
              </CardTitle>
              <CardDescription className="text-lg text-charcoal-600">
                {computedSubtitle}
              </CardDescription>
            </motion.div>
          </CardHeader>
        )}
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOCIAL_MEDIA.map((social) => (
              <SocialButton key={social.name} social={social} variant="card" />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
