"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  User,
  Menu,
  HeartHandshake,
  BookOpen,
  MapPin,
  User2,
  Calendar,
  LogOut,
  BarChart3,
  Clock,
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  Map,
=======
  Heart,
>>>>>>> 526ae3b (Use Heart icon for Spenden menu item instead of HeartHandshake)
=======
  ChevronDown,
>>>>>>> a60a4b3 (feat: Webseite Umstrukturierung)
=======
  Map,
>>>>>>> ae4cb06 (Implement Sage-dominant color palette and update navigation components)
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NAV_LINKS, MEMBER_NAV_LINKS } from "@/lib/constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, MEMBER_NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { user, loading, signOut } = useAuth();

  // Reset signing out state when user changes
  useEffect(() => {
    if (user) {
      setIsSigningOut(false);
    } else {
      setIsSigningOut(false);
    }
  }, [user]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    if (isSigningOut) {
<<<<<<< HEAD
      console.log("Sign out already in progress, ignoring...");
      return;
=======
      return; // Prevent multiple clicks
>>>>>>> 04ebdb4 (feat: weitere Design Anpassungen)
    }

    try {
      setIsSigningOut(true);

      await signOut();

      setTimeout(() => {
        window.location.href = "/login";
      }, 50);
    } catch {
      setIsSigningOut(false);
      alert("Fehler beim Abmelden. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
<<<<<<< HEAD
          ? "bg-gradient-to-b from-cream-50 to-sage-50/80 backdrop-blur-md border-b border-sage-200 shadow-lg"
          : "bg-gradient-to-b from-cream-50/80 to-sage-50/50 backdrop-blur-sm border-b border-sage-200/70"
=======
          ? "bg-gradient-to-b from-sage-600 via-sage-700 to-sage-800 backdrop-blur-md border-b border-sage-500 shadow-sage-lg"
          : "bg-gradient-to-b from-sage-600/95 via-sage-700/90 to-sage-800/85 backdrop-blur-sm border-b border-sage-500/70"
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 flex h-20 items-center">
        {/* Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/"
            className="flex items-center space-x-3 mr-8 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600 rounded-lg"
            aria-label="Zur Startseite"
          >
            <motion.div
              whileHover={{ rotate: 2, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex items-center justify-center"
            >
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={64}
                height={64}
                className="h-16 w-auto transition-all duration-300 group-hover:drop-shadow-xl"
              />
            </motion.div>
            <div className="flex flex-col">
<<<<<<< HEAD
              <span className="font-bold text-xl text-sage-700 group-hover:text-coral-600 transition-all duration-300">
=======
              <span className="font-bold text-xl text-white drop-shadow-sm">
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
                Muslimin e.V.
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1"
          role="navigation"
          aria-label="Hauptnavigation"
        >
          {/* Public Navigation - Only visible when NOT logged in */}
          {!user && (
            <>
              {NAV_LINKS.map((link) => (
                <motion.div
                  key={link.href}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={
                      "primary" in link && link.primary
                        ? link.href === "/mitglied-werden"
                          ? "default"
                          : "outline"
                        : "ghost"
                    }
                    asChild
                    className={`transition-colors duration-200 px-3 py-2 font-medium text-sm ${
                      "primary" in link && link.primary
                        ? link.href === "/mitglied-werden"
                          ? "bg-gradient-to-r from-sage-600 to-coral-600 text-white hover:from-sage-700 hover:to-coral-700 shadow-sm"
                          : "border-coral-300 text-coral-700 hover:bg-coral-50 hover:text-coral-800"
                        : "hover:bg-sage-50 hover:text-sage-700"
                    }`}
                  >
                    <Link href={link.href}>
                      <span>{link.label}</span>
                    </Link>
                  </Button>
                </motion.div>
              ))}
            </>
          )}

          {/* Member-only Navigation - Only visible when logged in */}
          {user &&
            MEMBER_NAV_LINKS.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="text-sand-50 hover:bg-sage-700/50 hover:text-sand-100 transition-colors duration-200 px-4 py-2 font-medium focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600"
                >
                  <Link
                    href={link.href}
                    className="flex items-center space-x-2"
                  >
                    {link.icon === "BookOpen" && (
                      <BookOpen className="h-4 w-4" />
                    )}
                    {link.icon === "MapPin" && <MapPin className="h-4 w-4" />}
                    {link.icon === "Map" && <Map className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </Link>
                </Button>
              </motion.div>
            ))}

          {/* Helper CTA for members who are NOT yet helpers */}
          {user && !user.is_helper && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                className="bg-clay-500 hover:bg-clay-600 text-sand-50 font-medium shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600"
              >
                <Link
                  href="/helper/register"
                  className="flex items-center space-x-2"
                >
                  <HeartHandshake className="h-4 w-4" />
                  <span>Helferin werden</span>
                </Link>
              </Button>
            </motion.div>
          )}
        </nav>

        <div className="flex-1" />

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-2">
          {loading && !user && !isSigningOut ? (
            <div className="text-sm text-sand-200">Lade...</div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-sand-50 hover:bg-sage-700/50 hover:text-sand-100 px-3 py-2 focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600"
                    aria-label="Benutzerprofil-Menü öffnen"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-sand-200 rounded-full flex items-center justify-center">
                        <User2 className="h-4 w-4 text-sage-700" />
                      </div>
                      <span className="text-sm font-medium">
                        {user.user_metadata?.vorname || "Mitglied"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-sand-300" />
                    </div>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
<<<<<<< HEAD
                className="w-56 bg-sand-50 border-sage-500"
=======
                className="w-56 bg-sand-50 border-sage-200"
>>>>>>> ae4cb06 (Implement Sage-dominant color palette and update navigation components)
                align="end"
                side="bottom"
              >
                <div className="px-2 py-1.5 text-sm font-medium text-charcoal-700">
                  {user.email}
                  {user.is_helper && (
                    <Badge
                      variant="secondary"
                      className="ml-2 text-xs bg-sage-100 text-sage-700"
                    >
                      Helferin
                    </Badge>
                  )}
                </div>
                <DropdownMenuSeparator className="bg-sage-200" />

                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Mein Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link
                    href="/my-appointments"
                    className="flex items-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Meine Termine</span>
                  </Link>
                </DropdownMenuItem>

                {user.is_helper && (
                  <>
                    <DropdownMenuSeparator className="bg-sage-200" />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/helper/availability"
                        className="flex items-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Verfügbarkeiten</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator className="bg-sage-200" />

                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                  >
                    <User className="h-4 w-4" />
                    <span>Mein Profil</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isSigningOut) {
                      handleSignOut();
                    }
                  }}
                  disabled={isSigningOut}
                  className="flex items-center space-x-2 cursor-pointer text-clay-600 focus:text-clay-700 hover:text-clay-700 hover:bg-clay-50 focus-visible:ring-2 focus-visible:ring-clay-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isSigningOut ? "Abmelden..." : "Abmelden"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="ghost"
                asChild
                className="text-sand-50 hover:bg-sage-700/50 hover:text-sand-100 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600"
              >
                <Link href="/login" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Anmelden</span>
                </Link>
              </Button>
            </motion.div>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                className="text-sand-50 hover:bg-sage-700/50 focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600"
                aria-label="Mobilmenü öffnen"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent className="bg-sand-50 border-l-sage-300 overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left flex items-center space-x-3">
                <Image
                  src="/images/muslimin-logo.svg"
                  alt="Muslimin e.V. Logo"
                  width={56}
                  height={56}
                  className="h-14 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-sage-700">
                    Muslimin e.V.
                  </span>
                  <span className="text-xs text-charcoal-600">
                    Vertrauliche Unterstützung
                  </span>
                </div>
              </SheetTitle>
              <SheetDescription className="text-left text-charcoal-600">
                Navigation & Services
              </SheetDescription>
            </SheetHeader>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="grid gap-4 py-4"
            >
<<<<<<< HEAD
              {/* Public Navigation */}
              {!user &&
                NAV_LINKS.map((link) => (
                  <motion.div
                    key={link.href}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href={link.href}
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sage-100 focus:bg-sage-100 focus-visible:ring-2 focus-visible:ring-sage-500 group min-h-[44px]"
                    >
                      <div className="text-sm font-medium leading-none text-charcoal-800 group-hover:text-sage-700 flex items-center space-x-2">
                        {link.icon === "HeartHandshake" && (
                          <HeartHandshake className="h-4 w-4" />
                        )}
                        {link.icon === "Bell" && <Bell className="h-4 w-4" />}
                        {link.icon === "Sparkles" && (
                          <Sparkles className="h-4 w-4" />
                        )}
                        <span>{link.label}</span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-charcoal-600 group-hover:text-sage-600">
                        {link.description}
                      </p>
                    </Link>
                  </motion.div>
                ))}

              {/* Member-only Navigation */}
=======
              {/* Public Navigation - Only visible when NOT logged in */}
              {!user && (
                <>
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.href}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className={`block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors group ${
                          "primary" in link && link.primary
                            ? "hover:bg-coral-50 focus:bg-coral-50"
                            : "hover:bg-sage-50 focus:bg-sage-50"
                        }`}
                      >
                        <div
                          className={`text-sm font-medium leading-none flex items-center space-x-2 ${
                            "primary" in link && link.primary
                              ? "group-hover:text-coral-700 text-coral-600 font-semibold"
                              : "group-hover:text-sage-700"
                          }`}
                        >
                          <span>{link.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </>
              )}
              {/* Member-only Navigation - Only visible when logged in */}
>>>>>>> a60a4b3 (feat: Webseite Umstrukturierung)
              {user && (
                <>
<<<<<<< HEAD
                  <div className="border-t border-sage-500 pt-4">
=======
                  <div className="border-t border-sage-200 pt-4">
>>>>>>> ae4cb06 (Implement Sage-dominant color palette and update navigation components)
                    <p className="text-xs font-medium text-charcoal-600 mb-3">
                      Mitglieder-Bereich
                    </p>
                  </div>

                  {MEMBER_NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.href}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sage-100 focus:bg-sage-100 focus-visible:ring-2 focus-visible:ring-sage-500 group min-h-[44px]"
                      >
                        <div className="text-sm font-medium leading-none text-charcoal-800 group-hover:text-sage-700 flex items-center space-x-2">
                          {link.icon === "BookOpen" && (
                            <BookOpen className="h-4 w-4" />
                          )}
                          {link.icon === "MapPin" && (
                            <MapPin className="h-4 w-4" />
                          )}
                          {link.icon === "Map" && <Map className="h-4 w-4" />}
                          <span>{link.label}</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-charcoal-600 group-hover:text-sage-600">
                          {link.description}
                        </p>
                      </Link>
                    </motion.div>
                  ))}

                  {!user.is_helper && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href="/helper/register"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-clay-50 focus:bg-clay-50 focus-visible:ring-2 focus-visible:ring-clay-500 group min-h-[44px]"
                      >
                        <div className="text-sm font-medium leading-none text-clay-700 group-hover:text-clay-800 flex items-center space-x-2">
                          <HeartHandshake className="h-5 w-5 text-clay-500" />
                          <span>Helferin werden</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-charcoal-600 group-hover:text-clay-600">
                          Als Helferin registrieren und Beratung anbieten
                        </p>
                      </Link>
                    </motion.div>
                  )}
                </>
              )}

<<<<<<< HEAD
              <div className="border-t border-sage-500 pt-4 space-y-2">
=======
              <div className="border-t border-sage-200 pt-4 space-y-2">
>>>>>>> ae4cb06 (Implement Sage-dominant color palette and update navigation components)
                {loading && !user && !isSigningOut ? (
                  <div className="text-sm text-charcoal-600 text-center">
                    Lade...
                  </div>
                ) : user ? (
                  <>
                    <div className="text-sm text-charcoal-700 text-center mb-4 font-medium">
                      Willkommen, {user.user_metadata?.vorname || "Mitglied"}
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-sage-100 hover:border-sage-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-sage-500"
                        asChild
                      >
                        <Link href="/dashboard">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Mein Dashboard
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-sage-100 hover:border-sage-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-sage-500"
                        asChild
                      >
                        <Link href="/my-appointments">
                          <Calendar className="h-4 w-4 mr-2" />
                          Meine Termine
                        </Link>
                      </Button>
                    </motion.div>

                    {user.is_helper && (
                      <>
<<<<<<< HEAD
                        <div className="border-t border-sage-500 pt-2 mt-2">
=======
                        <div className="border-t border-sage-200 pt-2 mt-2">
>>>>>>> ae4cb06 (Implement Sage-dominant color palette and update navigation components)
                          <div className="text-xs text-charcoal-600 text-center mb-2 font-medium">
                            Helferin-Bereich
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-start hover:bg-sage-100 hover:border-sage-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-sage-500"
                              asChild
                            >
                              <Link href="/helper/availability">
                                <Clock className="h-4 w-4 mr-2" />
                                Verfügbarkeiten
                              </Link>
                            </Button>
                          </motion.div>
                        </div>
                      </>
                    )}

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-sage-100 hover:border-sage-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-sage-500"
                        asChild
                      >
                        <Link href="/profile">
                          <User className="h-4 w-4 mr-2" />
                          Mein Profil
                        </Link>
                      </Button>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full justify-start hover:bg-clay-50 hover:border-clay-200 hover:text-clay-700 min-h-[44px] focus-visible:ring-2 focus-visible:ring-clay-500"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {isSigningOut ? "Abmelden..." : "Abmelden"}
                      </Button>
                    </motion.div>
                  </>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-start hover:bg-sage-100 hover:border-sage-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-sage-500"
                      asChild
                    >
                      <Link href="/login">
                        <User className="h-4 w-4 mr-2" />
                        Anmelden
                      </Link>
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}
