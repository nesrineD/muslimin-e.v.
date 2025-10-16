"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  User,
  Menu,
  HeartHandshake,
  BookOpen,
  Sparkles,
  Bell,
  MapPin,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b shadow-lg"
          : "bg-white/80 backdrop-blur-sm border-b border-gray-200/50"
      }`}
    >
      <div className="container mx-auto px-4 flex h-16 items-center">
        {/* Enhanced Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center space-x-3 mr-6 group">
            <motion.div
              whileHover={{ rotate: 2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative"
            >
              <img
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                className="h-12 w-auto transition-all duration-300 group-hover:drop-shadow-lg"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.6 }}
                className="absolute inset-0 bg-sage-500/5 rounded-lg blur-sm"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-lg text-sage-700 group-hover:text-warm-600 transition-all duration-300">
                Muslimin-Beratung
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Direct Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-warm-50 hover:text-warm-700 transition-colors duration-200 px-4 py-2 font-medium"
            >
              <Link href="/book" className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4" />
                <span>Termin buchen</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-warm-50 hover:text-warm-700 transition-colors duration-200 px-4 py-2 font-medium"
            >
              <Link
                href="/beratungsstellen"
                className="flex items-center space-x-2"
              >
                <MapPin className="h-4 w-4" />
                <span>Beratungsstellen</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-warm-50 hover:text-warm-700 transition-colors duration-200 px-4 py-2 font-medium"
            >
              <Link href="/member-map" className="flex items-center space-x-2">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Mitgliederkarte</span>
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="ghost"
              asChild
              className="hover:bg-coral-50 hover:text-coral-500 transition-colors duration-200 px-4 py-2 font-medium"
            >
              <Link href="/about" className="flex items-center space-x-2">
                <HeartHandshake className="h-4 w-4" />
                <span>Über uns</span>
              </Link>
            </Button>
          </motion.div>
        </nav>

        <div className="flex-1" />

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {loading ? (
            <div className="text-sm text-muted-foreground">Lade...</div>
          ) : user ? (
            // Angemeldeter Benutzer
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">
                Willkommen, {user.user_metadata?.vorname || "Mitglied"}
              </span>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                  className="hover:bg-coral-50 hover:text-coral-600 transition-colors duration-200"
                >
                  Abmelden
                </Button>
              </motion.div>
            </div>
          ) : (
            // Nicht angemeldeter Benutzer
            <>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="hover:bg-warm-50 hover:text-warm-700 transition-colors duration-200"
                >
                  <Link href="/login">
                    <User className="h-4 w-4 mr-2" />
                    Anmelden
                  </Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="ghost" size="icon" className="hover:bg-warm-50">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu öffnen</span>
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle className="text-left flex items-center space-x-3">
                <img
                  src="/images/muslimin-logo.svg"
                  alt="Muslimin e.V. Logo"
                  className="h-12 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">
                    Muslimin-Beratung
                  </span>
                  <span className="text-xs text-gray-500">
                    Vertrauliche Unterstützung
                  </span>
                </div>
              </SheetTitle>
              <SheetDescription className="text-left text-gray-600">
                Navigation & Services
              </SheetDescription>
            </SheetHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid gap-4 py-4"
            >
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/book"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-warm-50 focus:bg-warm-50 group"
                >
                  <div className="text-sm font-medium leading-none group-hover:text-warm-700 flex items-center space-x-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Termin buchen</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-warm-600/80">
                    Vereinbaren Sie einen Beratungstermin
                  </p>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/beratungsstellen"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-warm-50 focus:bg-warm-50 group"
                >
                  <div className="text-sm font-medium leading-none group-hover:text-warm-700 flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span>Beratungsstellen</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-warm-600/80">
                    Externe Beratungsstellen finden
                  </p>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/member-map"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-warm-50 focus:bg-warm-50 group"
                >
                  <div className="text-sm font-medium leading-none group-hover:text-warm-700 flex items-center space-x-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>Mitgliederkarte</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-warm-600/80">
                    Mitglieder und Helferinnen in Ihrer Nähe finden
                  </p>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/about"
                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-coral-50 focus:bg-coral-50 group"
                >
                  <div className="text-sm font-medium leading-none group-hover:text-coral-500 flex items-center space-x-2">
                    <HeartHandshake className="h-4 w-4" />
                    <span>Über uns</span>
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-coral-600/80">
                    Mission und Werte kennenlernen
                  </p>
                </Link>
              </motion.div>

              <div className="border-t pt-4 space-y-2">
                {loading ? (
                  <div className="text-sm text-muted-foreground text-center">
                    Lade...
                  </div>
                ) : user ? (
                  // Angemeldeter Benutzer - Mobile
                  <>
                    <div className="text-sm text-muted-foreground text-center mb-2">
                      Willkommen, {user.user_metadata?.vorname || "Mitglied"}
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => signOut()}
                        className="w-full justify-start hover:bg-coral-50 hover:border-coral-200 hover:text-coral-600"
                      >
                        Abmelden
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  // Nicht angemeldeter Benutzer - Mobile
                  <>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-warm-50 hover:border-warm-200"
                        asChild
                      >
                        <Link href="/login">
                          <User className="h-4 w-4 mr-2" />
                          Anmelden
                        </Link>
                      </Button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
