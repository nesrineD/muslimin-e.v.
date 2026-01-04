import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, MapPin } from "lucide-react";

import { SocialMediaSection } from "@/components/SocialMediaSection";
<<<<<<< HEAD
<<<<<<< HEAD
import { LEGAL_LINKS } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Über uns", href: "/uber-uns" },
  { label: "Veranstaltungen", href: "/veranstaltungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Mitglied werden", href: "/mitglied-werden" },
  { label: "Spenden", href: "/spenden" },
];
=======
=======
import { Separator } from "@/components/ui/separator";
>>>>>>> ae4cb06 (Implement Sage-dominant color palette and update navigation components)
import {
  CONTACT_INFO,
  LEGAL_LINKS,
  NAV_LINKS,
  TRUST_TEXT,
} from "@/lib/constants";
>>>>>>> a60a4b3 (feat: Webseite Umstrukturierung)

export function Footer() {
  return (
<<<<<<< HEAD
    <footer className="border-t border-sage-200/80 bg-gradient-to-b from-white via-cream-50/50 to-sage-50/80" role="contentinfo">
=======
<<<<<<< HEAD
    <footer className="border-t border-sage-200/80 bg-gradient-to-b from-white via-cream-50/50 to-sage-50/80">
>>>>>>> 9e88c6d (Improve contrast ratios for WCAG AA compliance)
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
=======
    <footer
      className="border-t bg-gradient-to-t from-sage-700 via-sage-600 to-sage-500 border-sage-800 text-white"
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center space-x-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sage-600 rounded-lg"
              aria-label="Zur Startseite"
            >
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={44}
                height={44}
                className="h-11 w-auto transition-all duration-300 group-hover:scale-105"
              />
<<<<<<< HEAD
              <span className="font-semibold text-base text-sage-800 group-hover:text-sage-700 transition-colors">
                Muslimin e.V.
              </span>
            </Link>
<<<<<<< HEAD
=======
            <Link
              href="/uber-uns"
              className="text-sm text-sage-600/90 hover:text-sage-800 leading-relaxed transition-colors block max-w-xs"
            >
              Muslimischer Frauen- & Mädchenverein – Gemeinschaft, Bildung &
              Hilfe seit 2011
            </Link>
>>>>>>> a60a4b3 (feat: Webseite Umstrukturierung)

            <p className="text-sm text-sage-600/90 max-w-xs">
              Muslimischer Frauen- & Mädchenverein – Gemeinschaft, Bildung & Hilfe seit 2011
            </p>

            <div className="pt-1">
              <SocialMediaSection variant="footer" showTitle={false} />
            </div>
          </div>

          <nav aria-label="Footer Navigation">
            <h3 className="text-xs font-bold text-sage-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-sage-600 rounded-full" />
              Navigation
=======
              <div className="flex flex-col">
                <span className="font-bold text-lg text-white drop-shadow-sm">
                  Muslimin e.V.
                </span>
              </div>
            </Link>
            <p className="text-sm text-sand-100 leading-relaxed drop-shadow-sm">
              {TRUST_TEXT.tagline}
              <br />
              <span className="text-white font-medium">
                {TRUST_TEXT.values}
              </span>
            </p>
            <div className="flex items-center space-x-2 text-xs text-sand-200 drop-shadow-sm">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <span>{TRUST_TEXT.gdprCompliant}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <div className="w-1 h-4 bg-white rounded-full"></div>
              <span>Navigation</span>
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
<<<<<<< HEAD
                <li key={link.href}>
=======
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sand-100 hover:text-sand-50 transition-colors flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 rounded"
                >
                  <span className="w-1 h-1 bg-sand-300 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>{link.label}</span>
                </Link>
              ))}
              {MEMBER_NAV_LINKS.slice(0, 2).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sand-100 hover:text-sand-50 transition-colors flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 rounded"
                >
                  <span className="w-1 h-1 bg-sand-300 rounded-full group-hover:scale-150 transition-transform"></span>
                  <span>{link.label}</span>
                </Link>
              ))}
              <Link
                href="/helper/register"
                className="text-clay-200 hover:text-clay-100 transition-colors flex items-center space-x-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-clay-300 rounded font-medium"
              >
                <span className="w-1 h-1 bg-clay-300 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Helferin werden</span>
              </Link>
            </nav>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
              <div className="w-1 h-4 bg-white rounded-full"></div>
              <span>Kontakt</span>
            </h3>
            <div className="space-y-4 text-sm">
              <div className="group">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sage-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300"
                  aria-label={`E-Mail an ${CONTACT_INFO.email} senden`}
                >
                  <Mail className="h-4 w-4 text-sand-100 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sand-100 group-hover:text-white transition-colors">
                      {CONTACT_INFO.email}
                    </span>
                    <span className="text-xs text-sand-200">E-Mail Support</span>
                  </div>
                </a>
              </div>
              <div className="group">
                <div className="flex items-start space-x-3 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-sand-100 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sand-100">
                      {CONTACT_INFO.location}
                    </span>
                    <span className="text-xs text-sand-200">
                      {CONTACT_INFO.locationDetail}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media & Legal */}
          <div className="space-y-6">
            <SocialMediaSection variant="footer" />
            
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-white flex items-center space-x-2">
                <div className="w-1 h-4 bg-white rounded-full"></div>
                <span>Rechtliches</span>
              </h3>
              <nav className="flex flex-col space-y-2 text-sm" aria-label="Rechtliche Links">
                {LEGAL_LINKS.map((link) => (
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
                  <Link
                    href={link.href}
<<<<<<< HEAD
                    className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all"
=======
<<<<<<< HEAD
                    className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all group"
=======
                    className="text-sand-100 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 rounded"
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
>>>>>>> 9e88c6d (Improve contrast ratios for WCAG AA compliance)
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-sage-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:font-medium transition-all">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="text-xs font-bold text-sage-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-sage-600 rounded-full" />
              Kontakt
            </h3>
            <address className="not-italic space-y-2.5 text-sm">
              <a
<<<<<<< HEAD
                href="mailto:info@muslimin-ev.de"
                className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
              >
                <Mail className="h-4 w-4 text-sage-500 flex-shrink-0" />
                info@muslimin-ev.de
=======
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors group"
              >
                <Mail className="h-4 w-4 text-sage-500 group-hover:text-sage-700 transition-colors flex-shrink-0" />
                <span className="group-hover:underline">
                  {CONTACT_INFO.email}
                </span>
>>>>>>> a60a4b3 (feat: Webseite Umstrukturierung)
              </a>
              <p className="flex items-start gap-2 text-sage-600">
                <MapPin className="h-4 w-4 text-sage-500 mt-0.5 flex-shrink-0" />
                Berlin, Deutschland
              </p>
            </address>
          </div>

          <div>
            <h3 className="text-xs font-bold text-sage-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-sage-600 rounded-full" />
              Rechtliches
            </h3>
<<<<<<< HEAD
            <ul className="space-y-2.5 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sage-600 hover:text-sage-800 transition-colors block">
                    {link.label}
                  </Link>
                </li>
              ))}
=======
            <ul className="space-y-2.5">
<<<<<<< HEAD
              <li>
                <Link
                  href="/impressum"
                  className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all group"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-sage-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:font-medium transition-all">
                    Impressum
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all group"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-sage-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:font-medium transition-all">
                    Datenschutz
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/agb"
                  className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all group"
                >
                  <ChevronRight className="h-3.5 w-3.5 text-sage-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="group-hover:font-medium transition-all">
                    AGB
                  </span>
                </Link>
              </li>
>>>>>>> aeacac5 (Update src/components/layout/footer.tsx)
=======
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all group"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-sage-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="group-hover:font-medium transition-all">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
>>>>>>> a60a4b3 (feat: Webseite Umstrukturierung)
            </ul>
          </div>
        </div>

<<<<<<< HEAD
        <Separator className="my-6 bg-sage-200/60" />

        <div className="flex flex-col gap-2 text-xs text-sage-500/80 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Muslimin e.V. Alle Rechte vorbehalten.</span>
          <span className="flex items-center gap-2">
            <span className="hidden md:inline text-sage-400">•</span>
            <span className="flex items-center gap-1.5 font-medium text-sage-600">
              {TRUST_TEXT}
            </span>
          </span>
=======
        <Separator className="my-8 bg-sage-800" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-sand-200">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <p className="flex items-center space-x-2 text-white">
              <span>{TRUST_TEXT.copyright}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-xs text-sand-100">{TRUST_TEXT.rightsReserved}</span>
            </p>
            <div className="flex items-center space-x-1 text-xs text-sand-100">
              <div className="w-1 h-1 bg-white rounded-full"></div>
              <span className="text-sand-300">{TRUST_TEXT.legalStatus}</span>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-white transition-colors text-xs font-medium text-sand-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
>>>>>>> 0132816 (Improve contrast ratios for WCAG AA compliance)
        </div>
      </div>
    </footer>
  );
}
