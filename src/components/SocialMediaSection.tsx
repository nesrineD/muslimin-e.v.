"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/button";

interface SocialMediaSectionProps {
  variant?: "default" | "compact" | "footer";
  className?: string;
}

const iconMap = {
  Instagram: Instagram,
  Facebook: Facebook,
  Linkedin: Linkedin,
};

export function SocialMediaSection({
  variant = "default",
  className = "",
}: SocialMediaSectionProps) {
  const isFooter = variant === "footer";
  const isCompact = variant === "compact";

  if (isCompact) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {SOCIAL_LINKS.map((social) => {
          const Icon = iconMap[social.icon as keyof typeof iconMap];
          return (
            <motion.a
              key={social.platform}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="text-sage-600 hover:text-clay-500 transition-colors"
            >
              <Icon className="h-5 w-5" />
            </motion.a>
          );
        })}
      </div>
    );
  }

  if (isFooter) {
    return (
      <div className={`space-y-3 ${className}`}>
        <h3 className="text-sm font-semibold text-charcoal-700 flex items-center space-x-2">
          <div className="w-1 h-4 bg-sage-600 rounded-full"></div>
          <span>Folgen Sie uns</span>
        </h3>
        <div className="flex gap-3">
          {SOCIAL_LINKS.map((social) => {
            const Icon = iconMap[social.icon as keyof typeof iconMap];
            return (
              <motion.a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-sage-100 text-sage-700 hover:bg-clay-100 hover:text-clay-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2"
              >
                <Icon className="h-5 w-5" />
              </motion.a>
            );
          })}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div className={`space-y-4 ${className}`}>
      <h3 className="text-lg font-semibold text-charcoal-800 flex items-center space-x-2">
        <div className="w-1.5 h-6 bg-sage-500 rounded-full"></div>
        <span>Folgen Sie uns auf Social Media</span>
      </h3>
      <div className="flex flex-wrap gap-3">
        {SOCIAL_LINKS.map((social) => {
          const Icon = iconMap[social.icon as keyof typeof iconMap];
          return (
            <motion.div
              key={social.platform}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                asChild
                variant="outline"
                className="hover:bg-sage-50 hover:border-sage-300 hover:text-sage-700 transition-colors focus-visible:ring-2 focus-visible:ring-sage-500"
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.ariaLabel}
                  className="flex items-center space-x-2"
                >
                  <Icon className="h-4 w-4" />
                  <span>{social.platform}</span>
                </a>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
