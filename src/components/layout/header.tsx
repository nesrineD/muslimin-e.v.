"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Menu,
  HeartHandshake,
  BookOpen,
  Sparkles,
  Bell,
  MapPin,
  ChevronDown,
  User2,
  Calendar,
  Settings,
  LogOut,
  BarChart3,
  Clock,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Reset signing out state when user changes
  useEffect(() => {
    if (user) {
      console.log("User logged in, resetting isSigningOut state");
      setIsSigningOut(false);
    } else {
      console.log("User logged out, ensuring isSigningOut is false");
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
      console.log("Sign out already in progress, ignoring...");
      return; // Prevent multiple clicks
    }

    try {
      console.log(
        "Starting sign out process for user:",
        user?.email,
        "is_helper:",
        user?.is_helper
      );
      setIsSigningOut(true);

      // Complete the signOut first - this will clear the user state
      await signOut();
      console.log("Sign out successful, redirecting to home...");

      // Small delay to ensure all state updates are processed
      setTimeout(() => {
        window.location.href = "/";
      }, 50);
    } catch (error) {
      console.error("Error signing out:", error);
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
          ? "bg-gradient-to-b from-sage-50 to-sage-100/50 backdrop-blur-md border-b border-sage-200 shadow-lg"
          : "bg-gradient-to-b from-sage-50/80 to-sage-100/30 backdrop-blur-sm border-b border-sage-200/70"
      }`}
    >
      <div className="container mx-auto px-4 flex h-20 items-center">
        {/* Enhanced Logo */}
        <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center space-x-3 mr-8 group">
            <motion.div
              whileHover={{ rotate: 2, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="relative flex items-center justify-center"
            >
              <img
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                className="h-16 w-auto transition-all duration-300 group-hover:drop-shadow-xl"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1, opacity: 0.6 }}
                className="absolute inset-0 bg-sage-500/10 rounded-lg blur-sm"
              />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-sage-700 group-hover:text-warm-600 transition-all duration-300">
                Muslimin e.V.
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Direct Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1">
          {/* Public Navigation - Only visible when NOT logged in */}
          {!user && (
            <>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="hover:bg-warm-50 hover:text-warm-700 transition-colors duration-200 px-4 py-2 font-medium"
                >
                  <Link
                    href="/veranstaltungen"
                    className="flex items-center space-x-2"
                  >
                    <Bell className="h-4 w-4" />
                    <span>Unsere Veranstaltungen</span>
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="hover:bg-sage-50 hover:text-sage-700 transition-colors duration-200 px-4 py-2 font-medium"
                >
                  <Link
                    href="/mitglied-werden"
                    className="flex items-center space-x-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    <span>Mitglied Werden</span>
                  </Link>
                </Button>
              </motion.div>
            </>
          )}

          {/* Member-only Navigation - Only visible when logged in */}
          {user && (
            <>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
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

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="hover:bg-warm-50 hover:text-warm-700 transition-colors duration-200 px-4 py-2 font-medium"
                >
                  <Link
                    href="/member-map"
                    className="flex items-center space-x-2"
                  >
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

              {/* Show "Helferin werden" only for members who are NOT yet helpers */}
              {!user.is_helper && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    asChild
                    className="hover:bg-coral-50 hover:text-coral-700 transition-colors duration-200 px-4 py-2 font-medium"
                  >
                    <Link
                      href="/helper/register"
                      className="flex items-center space-x-2"
                    >
                      <HeartHandshake className="h-5 w-5" />
                      <span>Helferin werden</span>
                    </Link>
                  </Button>
                </motion.div>
              )}
            </>
          )}
        </nav>

        <div className="flex-1" />

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          {loading && !user && !isSigningOut ? (
            <div className="text-sm text-muted-foreground">Lade...</div>
          ) : user ? (
            // Angemeldeter Benutzer - Profile Dropdown
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 hover:bg-warm-50 hover:text-warm-700 px-3 py-2"
                  >
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                        <User2 className="h-4 w-4 text-sage-600" />
                      </div>
                      <span className="text-sm font-medium">
                        {user.user_metadata?.vorname || "Mitglied"}
                      </span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" side="bottom">
                <div className="px-2 py-1.5 text-sm font-medium text-muted-foreground">
                  {user.email}
                  {user.is_helper && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      Helferin
                    </Badge>
                  )}
                </div>
                <DropdownMenuSeparator />

                {/* Member Dashboard */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <BarChart3 className="h-4 w-4" />
                    <span>Mein Dashboard</span>
                  </Link>
                </DropdownMenuItem>

                {/* My Appointments */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/my-appointments"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Meine Termine</span>
                  </Link>
                </DropdownMenuItem>

                {/* Helper Availability - Only for registered helpers */}
                {user.is_helper && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link
                        href="/helper/availability"
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <Clock className="h-4 w-4" />
                        <span>Verfügbarkeiten</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator />

                {/* Profile */}
                <DropdownMenuItem asChild>
                  <Link
                    href="/profile"
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <User className="h-4 w-4" />
                    <span>Mein Profil</span>
                  </Link>
                </DropdownMenuItem>

                {/* Sign Out */}
                <DropdownMenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isSigningOut) {
                      handleSignOut();
                    }
                  }}
                  disabled={isSigningOut}
                  className="flex items-center space-x-2 cursor-pointer text-coral-600 focus:text-coral-700 hover:text-coral-700 hover:bg-coral-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isSigningOut ? "Abmelden..." : "Abmelden"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
                  className="h-14 w-auto"
                />
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-sage-700">
                    Muslimin e.V.
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
              {/* Public Navigation - Only visible when NOT logged in */}
              {!user && (
                <>
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

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/veranstaltungen"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-warm-50 focus:bg-warm-50 group"
                    >
                      <div className="text-sm font-medium leading-none group-hover:text-warm-700 flex items-center space-x-2">
                        <Bell className="h-4 w-4" />
                        <span>Unsere Veranstaltungen</span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-warm-600/80">
                        Kommende Events und Aktivitäten
                      </p>
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Link
                      href="/mitglied-werden"
                      className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sage-50 focus:bg-sage-50 group"
                    >
                      <div className="text-sm font-medium leading-none group-hover:text-sage-700 flex items-center space-x-2">
                        <Sparkles className="h-4 w-4" />
                        <span>Mitglied Werden</span>
                      </div>
                      <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-sage-600/80">
                        Werden Sie Teil unserer Gemeinschaft
                      </p>
                    </Link>
                  </motion.div>
                </>
              )}

              {/* Member-only Navigation - Only visible when logged in */}
              {user && (
                <>
                  <div className="border-t pt-4">
                    <p className="text-xs font-medium text-muted-foreground mb-3">
                      Mitglieder-Bereich
                    </p>
                  </div>

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

                  {/* Show "Helferin werden" only for members who are NOT yet helpers */}
                  {!user.is_helper && (
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href="/helper/register"
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-coral-50 focus:bg-coral-50 group"
                      >
                        <div className="text-sm font-medium leading-none group-hover:text-coral-700 flex items-center space-x-2">
                          <HeartHandshake className="h-5 w-5 text-coral-500" />
                          <span>Helferin werden</span>
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground group-hover:text-coral-600/80">
                          Als Helferin registrieren und Beratung anbieten
                        </p>
                      </Link>
                    </motion.div>
                  )}
                </>
              )}

              <div className="border-t pt-4 space-y-2">
                {loading && !user && !isSigningOut ? (
                  <div className="text-sm text-muted-foreground text-center">
                    Lade...
                  </div>
                ) : user ? (
                  // Angemeldeter Benutzer - Mobile
                  <>
                    <div className="text-sm text-muted-foreground text-center mb-4">
                      Willkommen, {user.user_metadata?.vorname || "Mitglied"}
                    </div>

                    {/* Member Dashboard */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-warm-50 hover:border-warm-200"
                        asChild
                      >
                        <Link href="/dashboard">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Mein Dashboard
                        </Link>
                      </Button>
                    </motion.div>

                    {/* My Appointments */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-warm-50 hover:border-warm-200"
                        asChild
                      >
                        <Link href="/my-appointments">
                          <Calendar className="h-4 w-4 mr-2" />
                          Meine Termine
                        </Link>
                      </Button>
                    </motion.div>

                    {/* Helper Dashboard - Only for registered helpers */}
                    {user.is_helper && (
                      <>
                        <div className="border-t pt-2 mt-2">
                          <div className="text-xs text-muted-foreground text-center mb-2">
                            Helferin-Bereich
                          </div>
                          <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant="outline"
                              className="w-full justify-start hover:bg-sage-50 hover:border-sage-200"
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

                    {/* Profile */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start hover:bg-warm-50 hover:border-warm-200"
                        asChild
                      >
                        <Link href="/profile">
                          <User className="h-4 w-4 mr-2" />
                          Mein Profil
                        </Link>
                      </Button>
                    </motion.div>

                    {/* Sign Out */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        variant="outline"
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="w-full justify-start hover:bg-coral-50 hover:border-coral-200 hover:text-coral-600"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        {isSigningOut ? "Abmelden..." : "Abmelden"}
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
