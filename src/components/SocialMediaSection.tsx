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
}

const DEFAULT_TITLE = "Folgen Sie uns auf Social Media";
const DEFAULT_SUBTITLE = "Aktuelle Flyer, genaue Termine und Live-Updates!";

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
}: SocialMediaSectionProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  if (variant === "footer") {
    return (
      <ul
        className="flex flex-wrap items-center gap-2"
        aria-label="Folgen Sie uns auf Social Media Kanälen"
      >
        {SOCIAL_MEDIA.map((social) => {
          const Icon = social.icon;
          return (
            <li key={social.name}>
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/60 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-400 transition-colors shadow-sm hover:shadow-md ring-1 ring-sage-200/70"
                aria-label={`Auf ${social.name} folgen`}
              >
                {Icon ? (
                  <Icon className="h-4 w-4 text-sage-600" />
                ) : (
                  <span className="text-[9px] font-semibold text-white bg-gray-800 rounded-sm px-1 py-0.5 leading-none">
                    TT
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  if (variant === "compact") {
    return (
      <div className="space-y-4">
        {showTitle && (
          <div className="text-center">
            <h3 className="text-lg font-bold mb-2">
              <span className="bg-gradient-to-r from-sage-600 via-sage-500 to-sage-600 bg-clip-text text-transparent">
                {title}
              </span>
            </h3>
            <p className="text-sm text-charcoal-600">{subtitle}</p>
          </div>
        )}
        <div className="flex justify-center gap-4 flex-wrap">
          {SOCIAL_MEDIA.map((social) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center justify-center p-4 rounded-xl bg-gradient-to-br ${social.bgGradient} ${social.hoverGradient} transition-all duration-300 group shadow-md hover:shadow-lg border-2 ${social.borderColor} ${social.hoverBorderColor}`}
                title={social.name}
                aria-label={`Folgen Sie uns auf ${social.name}`}
              >
                {Icon ? (
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon className={`w-6 h-6 ${social.iconColor}`} />
                  </motion.div>
                ) : (
                  <motion.div
                    className={`w-6 h-6 ${social.iconColor} rounded-lg flex items-center justify-center`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span className="text-white font-bold text-xs">TT</span>
                  </motion.div>
                )}
              </motion.a>
            );
          })}
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
      className="mb-16"
    >
      <Card className="border-2 border-sage-200 shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500">
        <CardHeader className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <CardTitle className="text-3xl font-bold text-sage-800 mb-4">
              <span className="bg-gradient-to-r from-sage-600 via-sage-500 to-sage-600 bg-clip-text text-transparent">
                {title}
              </span>
            </CardTitle>
            <CardDescription className="text-lg text-charcoal-600">
              {subtitle}
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOCIAL_MEDIA.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={itemVariants}
                  whileHover={{ scale: 1.08, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center justify-center p-6 rounded-2xl bg-gradient-to-br ${social.bgGradient} ${social.hoverGradient} transition-all duration-300 group shadow-md hover:shadow-xl border-2 ${social.borderColor} ${social.hoverBorderColor}`}
                >
                  {Icon ? (
                    <motion.div
                      whileHover={{
                        rotate:
                          social.name === "Instagram"
                            ? 15
                            : social.name === "WhatsApp"
                              ? -15
                              : 0,
                        scale: social.name === "YouTube" ? 1.2 : 1,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: social.name === "YouTube" ? 400 : 300,
                      }}
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
                  <span
                    className={`text-lg font-semibold ${social.textColor} ${social.hoverTextColor}`}
                  >
                    {social.name}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
