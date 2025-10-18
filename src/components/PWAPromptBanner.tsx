"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function PWAPromptBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Check if user is on mobile and hasn't dismissed the banner
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    const isDismissedStored =
      localStorage.getItem("pwa-banner-dismissed") === "true";

    if (isMobile && !isDismissedStored) {
      // Show banner after 3 seconds
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem("pwa-banner-dismissed", "true");
  };

  const handleInstallClick = () => {
    // Track click and then navigate
    localStorage.setItem("pwa-banner-clicked", "true");
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-sage-600 to-warm-600 text-white shadow-lg"
        >
          <div className="container mx-auto px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <Smartphone className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">📱 Als App installieren</p>
                  <p className="text-xs text-white/90">
                    Schnellerer Zugriff & Offline-Funktionen
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Link href="/pwa-guide" onClick={handleInstallClick}>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30 text-white border-white/30 text-xs px-3"
                  >
                    <Download className="w-3 h-3 mr-1" />
                    Anleitung
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDismiss}
                  className="text-white/80 hover:text-white hover:bg-white/10 p-1"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
