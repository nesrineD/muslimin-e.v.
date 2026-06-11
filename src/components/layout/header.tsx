"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { hoverButton } from "@/lib/animations";
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
  Map,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
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
import { NAV_LINKS, MEMBER_NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const pathname = usePathname();
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const isEventAdmin = user?.role === "event_admin";

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
      return;
    }

    try {
      setIsSigningOut(true);
      await signOut();
      setTimeout(() => {
        window.location.href = "/login";
      }, 50);
    } catch (error) {
      console.error("Error signing out:", error);
      setIsSigningOut(false);
      toast({
        title: "Abmelden fehlgeschlagen",
        description: "Bitte versuche es erneut.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-sand-300/75 bg-cream-50/92 shadow-[0_12px_30px_-22px_rgba(50,46,42,0.38)] backdrop-blur-md"
          : "border-b border-sand-200/70 bg-gradient-to-r from-sand-50/94 via-cream-50/92 to-sage-100/45 backdrop-blur-sm"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4 flex items-center h-20">
        {/* Logo with Shrinking Effect */}
        <Link
          href="/"
          className="flex items-center gap-3 mr-10 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 focus-visible:ring-offset-2 rounded-lg"
          aria-label="Zur Startseite"
        >
          <Image
            src="/images/muslimin-logo.svg"
            alt="Muslimin e.V. Logo"
            width={48}
            height={48}
            className="w-auto h-8 md:h-11"
          />
          <div className="hidden sm:flex flex-col">
            <span className="font-bold text-xl text-sage-700 group-hover:text-coral-600 transition-colors duration-300">
              Muslimin e.V.
            </span>
            <span className="text-xs text-charcoal-700/90">
              Frauen- & Mädchenverein Berlin
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden md:flex"
          role="navigation"
          aria-label="Hauptnavigation"
        >
          {/* Public Navigation - Only visible when NOT logged in */}
          {!user && (
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative text-base font-semibold transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 rounded-sm px-1 ${
                      pathname === link.href
                        ? "text-sage-700 after:w-full after:bg-sage-500"
                        : "text-charcoal-700 hover:text-coral-700 after:w-0 after:bg-coral-400 hover:after:w-full"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Member-only Navigation - Only visible when logged in (not event_admin) */}
          {user && !isEventAdmin && (
            <ul className="flex items-center gap-6">
              {MEMBER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`relative flex items-center gap-2 text-base font-semibold transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-500 rounded-sm px-1 ${
                      pathname === link.href
                        ? "text-clay-700 after:w-full after:bg-clay-500"
                        : "text-charcoal-700 hover:text-clay-700 after:w-0 after:bg-clay-400 hover:after:w-full"
                    }`}
                  >
                    {link.icon === "BookOpen" && (
                      <BookOpen className="h-4 w-4" />
                    )}
                    {link.icon === "MapPin" && <MapPin className="h-4 w-4" />}
                    {link.icon === "Map" && <Map className="h-4 w-4" />}
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {/* Event Admin Navigation */}
          {isEventAdmin && (
            <ul className="flex items-center gap-6">
              <li>
                <Link
                  href="/admin/ashura"
                  className={`relative flex items-center gap-2 text-base font-semibold transition-colors duration-200 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500 rounded-sm px-1 ${
                    pathname.startsWith("/admin/ashura")
                      ? "text-sage-700 after:w-full after:bg-sage-500"
                      : "text-charcoal-700 hover:text-sage-700 after:w-0 after:bg-sage-400 hover:after:w-full"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>Ashura Admin</span>
                </Link>
              </li>
            </ul>
          )}

          {/* Helper CTA for members who are NOT yet helpers */}
          {user && !isEventAdmin && !user.is_helper && (
            <motion.div {...hoverButton} className="ml-6">
              <Button
                asChild
                className="bg-clay-500 hover:bg-clay-600 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 focus-visible:ring-2 focus-visible:ring-clay-500 focus-visible:ring-offset-2"
              >
                <Link
                  href="/helper/register"
                  className="flex items-center gap-2"
                >
                  <HeartHandshake className="h-4 w-4" />
                  <span>Helferin werden</span>
                </Link>
              </Button>
            </motion.div>
          )}
        </nav>

        <div className="flex-1" />

        {/* Desktop CTA Buttons */}
        <div className="hidden md:flex items-center gap-3 mr-3">
          <motion.div {...hoverButton}>
            <Button
              asChild
              size="sm"
              className="border-2 border-clay-300 bg-clay-50/60 text-clay-700 font-semibold shadow-sm hover:bg-clay-100/80 hover:border-clay-400 hover:text-clay-800 hover:-translate-y-0.5 active:translate-y-0 focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2"
            >
              <Link href="/spenden" className="flex items-center gap-2">
                <HeartHandshake className="h-4 w-4" />
                <span>Spenden</span>
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center">
          {loading && !user && !isSigningOut ? (
            <div className="text-sm text-sage-600">Lade...</div>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="secondary"
                    className="flex items-center gap-2 text-sage-700 hover:bg-sage-50 hover:text-sage-800 px-3 py-2 focus-visible:ring-2 focus-visible:ring-sage-500"
                    aria-label="Benutzerprofil-Menü öffnen"
                  >
                    <div className="w-8 h-8 bg-sand-200 rounded-full flex items-center justify-center">
                      <User2 className="h-4 w-4 text-sage-700" />
                    </div>
                    <span className="text-sm font-medium">
                      {user.user_metadata?.vorname || "Mitglied"}
                    </span>
                    <ChevronDown className="h-4 w-4 text-sage-400" />
                  </Button>
                </motion.div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-sand-50 border-sage-200"
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

                {isEventAdmin ? (
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin/ashura"
                      className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Ashura Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                      >
                        <BarChart3 className="h-4 w-4" />
                        <span>Mein Dashboard</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/my-appointments"
                        className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
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
                            className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
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
                        className="flex items-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-sage-500"
                      >
                        <User className="h-4 w-4" />
                        <span>Mein Profil</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuItem
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    if (!isSigningOut) {
                      handleSignOut();
                    }
                  }}
                  disabled={isSigningOut}
                  className="flex items-center gap-2 cursor-pointer text-clay-600 focus:text-clay-700 hover:text-clay-700 hover:bg-clay-50 focus-visible:ring-2 focus-visible:ring-clay-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{isSigningOut ? "Abmelden..." : "Abmelden"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 text-sm font-medium text-charcoal-600 hover:text-sage-700 transition-colors px-3 py-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage-500"
            >
              <User className="h-4 w-4" />
              <span>Mitgliederbereich</span>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <motion.div {...hoverButton}>
              <Button
                variant="ghost"
                size="md"
                className="text-sage-700 hover:bg-sage-50 focus-visible:ring-2 focus-visible:ring-sage-500"
                aria-label="Mobilmenü öffnen"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </motion.div>
          </SheetTrigger>
          <SheetContent className="bg-sand-50 border-l-sage-300 overflow-y-auto">
            <SheetHeader className="pb-4 border-b border-sand-200">
              <SheetTitle className="flex items-center">
                <Image
                  src="/images/muslimin-logo.svg"
                  alt="Muslimin e.V. Logo"
                  width={48}
                  height={48}
                  className="h-12 w-auto"
                />
              </SheetTitle>
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
                  {NAV_LINKS.map((link) => (
                    <motion.div
                      key={link.href}
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Link
                        href={link.href}
                        className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-sage-50 focus:bg-sage-50 group"
                      >
                        <div className="text-sm font-medium leading-none flex items-center text-charcoal-800 group-hover:text-sage-700">
                          <span>{link.label}</span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </>
              )}

              {/* Member-only Navigation - Only visible when logged in (not event_admin) */}
              {user && !isEventAdmin && (
                <>
                  <div className="border-t border-sage-200 pt-4">
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
                        <div className="text-sm font-medium leading-none text-charcoal-800 group-hover:text-sage-700 flex items-center gap-2">
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
                        <div className="text-sm font-medium leading-none text-clay-700 group-hover:text-clay-800 flex items-center gap-2">
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

              <div className="border-t border-sage-200 pt-4 space-y-2">
                {loading && !user && !isSigningOut ? (
                  <div className="text-sm text-charcoal-600 text-center">
                    Lade...
                  </div>
                ) : user ? (
                  <>
                    <div className="text-sm text-charcoal-700 text-center mb-4 font-medium">
                      Willkommen,{" "}
                      {user.user_metadata?.vorname ||
                        (isEventAdmin ? "Admin" : "Mitglied")}
                    </div>

                    {isEventAdmin ? (
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start hover:bg-sage-100 hover:border-sage-300 min-h-[44px] focus-visible:ring-2 focus-visible:ring-sage-500"
                          asChild
                        >
                          <Link href="/admin/ashura">
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Ashura Admin Dashboard
                          </Link>
                        </Button>
                      </motion.div>
                    ) : (
                      <>
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
                            <div className="border-t border-sage-200 pt-2 mt-2">
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
                      </>
                    )}

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
                  <>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        className="w-full justify-center min-h-[44px] border-2 border-clay-300 bg-clay-50/60 text-clay-700 font-semibold shadow-sm hover:bg-clay-100/80 hover:border-clay-400 hover:text-clay-800 focus-visible:ring-2 focus-visible:ring-clay-400 focus-visible:ring-offset-2"
                        asChild
                      >
                        <Link href="/spenden">Spenden</Link>
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
                        <Link href="/login">
                          <User className="h-4 w-4 mr-2" />
                          Mitgliederbereich
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
