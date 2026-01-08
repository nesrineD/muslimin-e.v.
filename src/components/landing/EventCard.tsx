"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { BadgeVariant, EventBadge } from "@/types/events";
import { Card, CardContent } from "@/components/ui/card";

interface EventCardProps {
  name: string;
  description: string;
  teaser: string;
  regularity: string;
  targetAudience: string;
  icon: LucideIcon;
  badges: EventBadge[];
  accessNote: string;
  secondaryCtaLabel?: string;
}

const badgeStyles: Record<BadgeVariant, string> = {
  open: "bg-sage-100 text-sage-800 border-sage-300",
  register: "bg-amber-100 text-amber-800 border-amber-300",
  members: "bg-clay-100 text-clay-800 border-clay-300",
  online: "bg-blue-100 text-blue-800 border-blue-300",
  presence: "bg-sand-100 text-charcoal-800 border-sand-300",
  limited: "bg-coral-100 text-coral-800 border-coral-300",
};

export function EventCard({
  name,
  description,
  teaser,
  regularity,
  targetAudience,
  icon: IconComponent,
  badges,
  accessNote,
  secondaryCtaLabel,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `event-${name.replace(/\s+/g, "-").toLowerCase()}-content`;

  return (
    <motion.div layout>
      <Card variant="white" className="h-full">
        <article className="relative">
          {/* Top accent bar */}
          <span
            className="absolute inset-x-4 top-4 h-1 rounded-full bg-gradient-to-r from-clay-500/80 via-amber-400/60 to-clay-500/80"
            aria-hidden="true"
          />

          <CardContent className="space-y-4 relative pt-8">
            {/* Icon & Badges Row */}
            <div className="flex items-start justify-between gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sage-100 to-sage-200 flex items-center justify-center">
                  <IconComponent
                    className="w-8 h-8 text-sage-700"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 justify-end">
                {badges.map((badge, index) => (
                  <span
                    key={index}
                    className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                      badgeStyles[badge.variant]
                    }`}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl font-semibold text-charcoal-900">{name}</h3>

            {/* Teaser / Description */}
            <motion.p
              className="text-sm text-charcoal-600 leading-relaxed"
              layout
            >
              {isExpanded ? description : teaser}
            </motion.p>

            {/* Expanded Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id={contentId}
                  role="region"
                  aria-label={`Weitere Informationen zu ${name}`}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-4"
                >
                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-4 p-4 bg-sand-50 rounded-lg border border-sand-200">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-charcoal-500 mb-1">
                        Regelmäßigkeit
                      </p>
                      <p className="text-sm font-semibold text-charcoal-900">
                        {regularity}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-charcoal-500 mb-1">
                        Zielgruppe
                      </p>
                      <p className="text-sm font-semibold text-charcoal-900">
                        {targetAudience}
                      </p>
                    </div>
                  </div>

                  {/* Access Note */}
                  <div className="p-4 bg-sage-50 rounded-lg border border-sage-200">
                    <p className="text-xs uppercase tracking-[0.2em] text-sage-700 font-semibold mb-2">
                      ℹ️ Zugang
                    </p>
                    <p className="text-sm text-charcoal-700 leading-relaxed">
                      {accessNote}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Expand/Collapse Button */}
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                aria-controls={contentId}
                className="flex items-center justify-center gap-2 text-sm font-semibold text-clay-600 hover:text-clay-700 transition-colors group flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{isExpanded ? "Weniger anzeigen" : "Mehr erfahren"}</span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  aria-hidden="true"
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* Secondary CTA (optional) */}
              {secondaryCtaLabel && (
                <motion.button
                  className="px-6 py-2 border-2 border-clay-500 text-clay-600 hover:bg-clay-50 rounded-lg font-semibold text-sm transition-colors focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:outline-none"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`${secondaryCtaLabel} - ${name}`}
                >
                  {secondaryCtaLabel}
                </motion.button>
              )}
            </div>
          </CardContent>
        </article>
      </Card>
    </motion.div>
  );
}
