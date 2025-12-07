"use client";

import { motion } from "framer-motion";

interface EventCardProps {
  id: string;
  name: string;
  description: string;
  regularity: string;
  targetAudience: string;
  format: "Online" | "Präsenz";
  icon: string;
}

export function EventCard({
  id,
  name,
  description,
  regularity,
  targetAudience,
  format,
  icon,
}: EventCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="p-6 bg-white rounded-lg border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-lg transition-all"
    >
      <p className="text-4xl mb-4">{icon}</p>
      <h3 className="text-xl font-bold text-emerald-900 mb-2">{name}</h3>
      <p className="text-sage-700 text-sm mb-4">{description}</p>

      <div className="space-y-2 text-sm">
        <div>
          <span className="font-semibold text-emerald-900">📅 Regelmäßigkeit:</span>
          <p className="text-sage-700">{regularity}</p>
        </div>
        <div>
          <span className="font-semibold text-emerald-900">👥 Zielgruppe:</span>
          <p className="text-sage-700">{targetAudience}</p>
        </div>
        <div className="flex items-center gap-2 pt-2">
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full text-xs font-semibold">
            {format === "Online" ? "💻 Online" : "📍 Präsenz"}
          </span>
        </div>
      </div>
    </motion.div>
  );
}