// ============================================
// OPTIMIZED FOOTER — e-impuls.de inspired layout
// ============================================

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { LEGAL_LINKS } from "@/lib/constants";

const NAV_VEREIN = [
  { href: "/uber-uns", label: "Über uns" },
  { href: "/veranstaltungen", label: "Veranstaltungen" },
  { href: "/mitglied-werden", label: "Mitglied werden" },
  { href: "/spenden", label: "Spenden" },
];

export function Footer() {
  return (
    <footer
      className="border-t border-sand-200 bg-charcoal-800"
      role="contentinfo"
    >
      <div className="container mx-auto px-6 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-12">
          {/* Brand + Social Column */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={44}
                height={44}
                className="h-11 w-auto transition-all duration-300 group-hover:scale-105 brightness-0 invert"
              />
              <span className="font-semibold text-base text-cream-50 group-hover:text-sand-200 transition-colors">
                Muslimin e.V.
              </span>
            </Link>
            <SocialMediaSection variant="footer" />
          </div>

          {/* Kontakt Column */}
          <div>
            <h3 className="text-xs font-semibold text-sand-200 uppercase tracking-widest mb-4">
              Kontakt
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-sand-300">
              <p>Muslimin e.V.</p>
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-sand-400 mt-0.5 flex-shrink-0" />
                Berlin
              </p>
            </address>
            <Link
              href="/kontakt"
              className="inline-block mt-4 text-sm text-cream-50 hover:text-sand-200 underline underline-offset-2 transition-colors"
            >
              Kontaktformular
            </Link>
          </div>

          {/* Verein Column */}
          <div>
            <h3 className="text-xs font-semibold text-sand-200 uppercase tracking-widest mb-4">
              Verein
            </h3>
            <ul className="space-y-2.5">
              {NAV_VEREIN.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-300 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches Column */}
          <div>
            <h3 className="text-xs font-semibold text-sand-200 uppercase tracking-widest mb-4">
              Rechtliches
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-sand-300 hover:text-cream-50 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-sand-200/15 pt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <span className="text-xs text-sand-400">
            © {new Date().getFullYear()} Muslimin e.V. Alle Rechte vorbehalten.
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-sand-400">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-cream-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
