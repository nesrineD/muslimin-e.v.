"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface EventCardProps {
  name: string;
  description: string;
  teaser: string;
  regularity: string;
  targetAudience: string;
  format: "Online" | "Präsenz";
  icon: string;
}

export function EventCard({
  name,
  description,
  teaser,
  regularity,
  targetAudience,
  format,
  icon,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentId = `event-${name.replace(/\s+/g, "-").toLowerCase()}-content`;

  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-3xl border border-sage-200/80 bg-white/90 shadow-[0_15px_60px_-30px_rgba(45,49,54,0.8)] transition-all duration-300 hover:shadow-[0_20px_80px_-40px_rgba(45,49,54,0.9)]"
    >
      <span
        className="absolute inset-x-4 top-4 h-1 rounded-full bg-gradient-to-r from-clay-500/80 via-amber-400/60 to-clay-500/80"
        aria-hidden
      />

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-4xl leading-none">{icon}</p>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${
              format === "Online"
                ? "bg-sage-50 text-sage-800 border border-sage-200"
                : "bg-sand-50 text-charcoal-800 border border-sand-200"
            }`}
          >
            {format === "Online" ? "💻 Online" : "📍 Präsenz"}
          </span>
        </div>

        <h3 className="text-2xl font-semibold text-charcoal-900 mb-3">
          {name}
        </h3>

        <motion.p
          className="text-sm text-charcoal-600 mb-4 leading-relaxed"
          layout
        >
          {isExpanded ? description : teaser}
        </motion.p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              id={contentId}
              role="region"
              aria-label={`Weitere Informationen zu ${name}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 text-sm text-charcoal-700 mb-4"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          aria-controls={contentId}
          className="flex items-center gap-2 text-sm font-semibold text-clay-600 hover:text-clay-700 transition-colors group"
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
      </div>
    </motion.div>
  );
}
