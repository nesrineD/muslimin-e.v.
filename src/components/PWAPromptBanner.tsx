"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download } from "lucide-react";
import Link from "next/link";

export function PWAPromptBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // PWA-Banner auf mobilen Geräten deaktiviert
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  const handleInstallClick = () => {
    localStorage.setItem("pwa-banner-clicked", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 250 }}
          className="fixed bottom-0 left-0 right-0 z-50"
        >
          {/* Sage accent line at top */}
          <div className="h-0.5 bg-gradient-to-r from-sage-400 via-sage-500 to-sage-400" />

          <div className="rounded-t-2xl bg-white/95 px-5 py-4 shadow-[0_-4px_24px_rgba(0,0,0,0.10)] backdrop-blur-md">
            <div className="flex items-center gap-4">
              {/* Icon */}
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-sage-50 border border-sage-100">
                <span className="text-xl leading-none">🕌</span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-charcoal-800">
                  Als App installieren
                </p>
                <p className="text-xs text-charcoal-500 leading-snug">
                  Schnellerer Zugriff & Offline-Nutzung
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <Link href="/pwa-guide" onClick={handleInstallClick}>
                  <button className="flex items-center gap-1.5 rounded-xl bg-sage-600 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-sage-700 active:bg-sage-800">
                    <Download className="h-3 w-3" />
                    Anleitung
                  </button>
                </Link>

                <button
                  onClick={handleDismiss}
                  aria-label="Schließen"
                  className="flex h-7 w-7 items-center justify-center rounded-lg text-charcoal-400 transition-colors hover:bg-sand-100 hover:text-charcoal-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
