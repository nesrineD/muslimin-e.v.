"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    icon: Instagram,
    url: "https://www.instagram.com/muslimin.de/",
    bgGradient: "from-pink-50 to-pink-100",
    hoverGradient: "hover:from-pink-100 hover:to-pink-200",
    iconColor: "text-pink-600",
    textColor: "text-pink-700",
    hoverTextColor: "group-hover:text-pink-800",
    borderColor: "border-pink-200",
    hoverBorderColor: "hover:border-pink-300",
  },
  {
    name: "TikTok",
    icon: null, // Custom TT icon
    url: "https://www.tiktok.com/@muslimin.ev",
    bgGradient: "from-gray-50 to-gray-100",
    hoverGradient: "hover:from-gray-100 hover:to-gray-200",
    iconColor: "bg-gray-800",
    textColor: "text-gray-700",
    hoverTextColor: "group-hover:text-gray-800",
    borderColor: "border-gray-200",
    hoverBorderColor: "hover:border-gray-300",
  },
  {
    name: "YouTube",
    icon: Youtube,
    url: "https://www.youtube.com/@muslimin-ev",
    bgGradient: "from-red-50 to-red-100",
    hoverGradient: "hover:from-red-100 hover:to-red-200",
    iconColor: "text-red-600",
    textColor: "text-red-700",
    hoverTextColor: "group-hover:text-red-800",
    borderColor: "border-red-200",
    hoverBorderColor: "hover:border-red-300",
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://whatsapp.com/channel/0029VaN2y5qIt5rsURhd1o2Y",
    bgGradient: "from-green-50 to-green-100",
    hoverGradient: "hover:from-green-100 hover:to-green-200",
    iconColor: "text-green-600",
    textColor: "text-green-700",
    hoverTextColor: "group-hover:text-green-800",
    borderColor: "border-green-200",
    hoverBorderColor: "hover:border-green-300",
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
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`${baseClasses} flex items-center justify-center w-9 h-9 rounded-lg bg-sage-100 text-sage-700 hover:bg-clay-100 hover:text-clay-600 shadow-sm`}
          aria-label={`Folge uns auf ${social.name}`}
          title={social.name}
        >
          {Icon ? (
            <Icon className="h-5 w-5" />
          ) : (
            <span className="text-[10px] font-bold text-white bg-gray-800 rounded px-1 py-0.5">
              TT
            </span>
          )}
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
