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
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  showTitle = true,
  showHeader = true,
  showLabels = true,
  className = "",
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
          className={`${baseClasses} w-10 h-10 rounded-xl bg-white border border-sage-100 text-sage-600 hover:text-sage-800 hover:border-sage-300 shadow-sm hover:shadow-md`}
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
        className={`flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${social.bgGradient} ${social.hoverGradient} transition-all duration-300 group shadow-sm hover:shadow-md border ${social.borderColor} ${social.hoverBorderColor} w-full`}
        aria-label={`Folge uns auf ${social.name}`}
        title={social.name}
      >
        {Icon ? (
          <Icon
            className={`w-6 h-6 ${social.iconColor} mr-3 transition-transform group-hover:scale-110`}
          />
        ) : (
          <div
            className={`w-6 h-6 ${social.iconColor} rounded flex items-center justify-center mr-3 transition-transform group-hover:scale-110`}
          >
            <span className="text-white font-bold text-[10px]">TT</span>
          </div>
        )}
        {showLabels && (
          <span
            className={`font-semibold ${social.textColor} ${social.hoverTextColor}`}
          >
            {social.name}
          </span>
        )}
      </motion.a>
    );
  }

  if (variant === "footer") {
    return (
      <ul
<<<<<<< HEAD
        className={`flex flex-wrap items-center gap-2 ${className}`}
        aria-label={title}
=======
        className="flex flex-wrap items-center gap-2"
        aria-label="Folgen Sie uns auf Social Media Kanälen"
>>>>>>> a42d618 (fix: improve accessibility of footer social media links)
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
            <h3 className="text-lg font-bold text-sage-800">{title}</h3>
            {subtitle && <p className="text-sm text-sage-600">{subtitle}</p>}
          </div>
        )}
        <div className="flex justify-center gap-3 flex-wrap">
          {SOCIAL_MEDIA.map((social) => (
            <SocialButton key={social.name} social={social} variant="compact" />
          ))}
        </div>
      </div>
    );
  }

  // Default (card) variant
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`w-full ${className}`}
    >
      <Card className="border-sage-200 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-500 overflow-hidden">
        {showHeader && (
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-2xl md:text-3xl font-bold text-sage-800">
              {title}
            </CardTitle>
            {subtitle && (
              <CardDescription className="text-base text-sage-600 mt-2">
                {subtitle}
              </CardDescription>
            )}
          </CardHeader>
        )}
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SOCIAL_MEDIA.map((social) => (
              <SocialButton key={social.name} social={social} variant="card" />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
