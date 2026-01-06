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
  variant?: "card" | "compact" | "footer";
  title?: string;
  subtitle?: string;
  showTitle?: boolean;
  showHeader?: boolean;
  showLabels?: boolean;
  className?: string;
  context?: "public" | "about" | "events" | "member" | string;
}

const DEFAULT_TITLE = "Folge uns auf Social Media";
const DEFAULT_SUBTITLE = "Aktuelle Termine, Hinweise und Live-Updates.";

const SOCIAL_MEDIA = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/muslimin.de/",
    bgGradient: "from-rose-50 via-pink-50 to-rose-100",
    hoverGradient: "hover:from-rose-100 hover:via-pink-100 hover:to-rose-200",
    iconColor: "text-pink-600",
    textColor: "text-pink-700",
    hoverTextColor: "group-hover:text-pink-800",
    borderColor: "border-rose-200",
    hoverBorderColor: "hover:border-rose-300",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@muslimin.ev",
    bgGradient: "from-purple-50 via-violet-50 to-purple-100",
    hoverGradient:
      "hover:from-purple-100 hover:via-violet-100 hover:to-purple-200",
    iconColor: "text-gray-900",
    textColor: "text-purple-700",
    hoverTextColor: "group-hover:text-purple-800",
    borderColor: "border-purple-200",
    hoverBorderColor: "hover:border-purple-300",
  },
  {
    name: "YouTube",
    icon: YouTubeIcon,
    url: "https://www.youtube.com/@muslimin-ev",
    bgGradient: "from-orange-50 via-red-50 to-orange-100",
    hoverGradient:
      "hover:from-orange-100 hover:via-red-100 hover:to-orange-200",
    iconColor: "text-red-600",
    textColor: "text-orange-700",
    hoverTextColor: "group-hover:text-orange-800",
    borderColor: "border-orange-200",
    hoverBorderColor: "hover:border-orange-300",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    url: "https://whatsapp.com/channel/0029VaN2y5qIt5rsURhd1o2Y",
    bgGradient: "from-emerald-50 via-green-50 to-emerald-100",
    hoverGradient:
      "hover:from-emerald-100 hover:via-green-100 hover:to-emerald-200",
    iconColor: "text-green-600",
    textColor: "text-emerald-700",
    hoverTextColor: "group-hover:text-emerald-800",
    borderColor: "border-emerald-200",
    hoverBorderColor: "hover:border-emerald-300",
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

  const getIconRotation = (name: string): number => {
    const rotations: Record<string, number> = {
      Instagram: 360,
      TikTok: -360,
      WhatsApp: 180,
      YouTube: 180,
    };
    return rotations[name] || 0;
  };

  function SocialButton({
    social,
    variant = "default",
  }: {
    social: Social;
    variant?: "default" | "compact" | "footer" | "card";
  }) {
    const Icon = social.icon;

    const baseClasses =
      "inline-flex items-center justify-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2";

    if (variant === "footer") {
      return (
        <a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseClasses} h-8 w-8 rounded-full bg-white/60 hover:bg-white shadow-sm hover:shadow-md ring-1 ring-sage-200/70 flex items-center justify-center group`}
          aria-label={`Folge uns auf ${social.name}`}
          title={social.name}
        >
          {Icon ? (
            <Icon className="h-4 w-4 text-sage-600 group-hover:text-sage-800 transition-colors" />
          ) : (
            <span className="text-[9px] font-semibold text-white bg-gray-800 rounded-sm px-1 py-0.5 leading-none group-hover:bg-black transition-colors">
              TT
            </span>
          )}
        </a>
      );
    }

    if (variant === "compact") {
      return (
        <motion.a
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{
            scale: 1.05,
            y: -3,
          }}
          whileTap={{ scale: 0.95 }}
          className={`${baseClasses} flex items-center justify-center px-6 py-3 rounded-2xl bg-gradient-to-br ${social.bgGradient} ${social.hoverGradient} shadow-sm hover:shadow-md transition-all duration-300 border ${social.borderColor} ${social.hoverBorderColor}`}
          aria-label={`Folge uns auf ${social.name}`}
          title={social.name}
        >
          {Icon ? (
            <motion.div
              whileHover={{
                rotate: getIconRotation(social.name),
                scale: 1.2,
                y: -2,
              }}
              transition={{
                rotate: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 0.3, type: "spring", stiffness: 300 },
                y: { duration: 0.3 },
              }}
              className="mr-3"
            >
              <Icon className={`h-8 w-8 ${social.iconColor}`} />
            </motion.div>
          ) : (
            <motion.span
              className="text-[12px] font-bold text-white bg-gradient-to-br from-gray-800 to-black rounded-lg px-2 py-1 shadow-sm mr-3"
              whileHover={{
                rotate: -360,
                scale: 1.2,
                y: -2,
              }}
              transition={{
                rotate: { duration: 0.8, ease: "easeInOut" },
                scale: { duration: 0.3, type: "spring", stiffness: 300 },
                y: { duration: 0.3 },
              }}
            >
              TT
            </motion.span>
          )}
          <span
            className={`font-bold ${social.textColor} ${social.hoverTextColor}`}
          >
            {social.name}
          </span>
        </motion.a>
      );
    }

    // card / default
    return (
      <motion.a
        href={social.url}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${social.bgGradient} ${social.hoverGradient} transition-all duration-300 group shadow-sm hover:shadow-md border ${social.borderColor} ${social.hoverBorderColor}`}
        aria-label={`Folge uns auf ${social.name}`}
        title={social.name}
      >
        {Icon ? (
          <motion.div
            whileHover={{ rotate: social.name === "Instagram" ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Icon className={`w-8 h-8 ${social.iconColor} mr-3`} />
          </motion.div>
        ) : (
          <motion.div
            className={`w-8 h-8 ${social.iconColor} rounded-lg flex items-center justify-center mr-3`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white font-bold text-sm">TT</span>
          </motion.div>
        )}
        {showLabels ? (
          <span
            className={`text-lg font-semibold ${social.textColor} ${social.hoverTextColor}`}
          >
            {social.name}
          </span>
        ) : (
          <span className="sr-only">{social.name}</span>
        )}
      </motion.a>
    );
  }

  const computedTitle =
    title ??
    (context === "public"
      ? DEFAULT_TITLE
      : context === "events"
        ? "Event-Updates & Live-Ankündigungen"
        : context === "about"
          ? DEFAULT_TITLE
          : context === "member"
            ? "Mitglieder-Kanäle & Newsletter"
            : DEFAULT_TITLE);

  const computedSubtitle =
    subtitle ??
    (context === "public"
      ? DEFAULT_SUBTITLE
      : context === "events"
        ? "Live-Updates zu unseren Veranstaltungen"
        : context === "about"
          ? "Folge unseren Projekten und Berichten"
          : context === "member"
            ? "Exklusive Informationen für Mitglieder"
            : DEFAULT_SUBTITLE);

  if (variant === "footer") {
    return (
      <ul
        className={`flex flex-wrap items-center gap-2 ${className}`}
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

  if (variant === "compact") {
    return (
      <div className={`space-y-4 ${className}`}>
        {showTitle && (
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">
              <span className="bg-gradient-to-r from-sage-600 via-sage-500 to-sage-600 bg-clip-text text-transparent">
                {computedTitle}
              </span>
            </h3>
            <p className="text-sm text-charcoal-600">{computedSubtitle}</p>
          </div>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          {SOCIAL_MEDIA.map((social) => (
            <SocialButton key={social.name} social={social} variant="compact" />
          ))}
        </div>
      </div>
    );
  }

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
