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
      className="relative overflow-hidden border-t border-sand-300/50 bg-gradient-to-b from-sand-300/80 via-sand-200/92 to-sage-100/72"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-cream-50/60 via-cream-50/25 to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto px-6 py-12 md:px-8 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 md:gap-12">
          {/* Brand + Social Column */}
          <div className="max-w-xs space-y-6 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-start gap-3 group">
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={52}
                height={52}
                className="mt-0.5 h-12 w-auto transition-all duration-300 group-hover:scale-105"
              />
              <div className="space-y-1 pt-0.5">
                <span className="block font-semibold text-lg text-charcoal-800 group-hover:text-sage-800 transition-colors">
                  Muslimin e.V.
                </span>
                <p className="text-sm leading-relaxed text-charcoal-600/90">
                  Gemeinschaft, Bildung und Unterstützung für Frauen in Berlin.
                </p>
              </div>
            </Link>
            <SocialMediaSection variant="footer" />
          </div>

          {/* Kontakt Column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-800">
              Kontakt
            </h3>
            <address className="not-italic space-y-2.5 text-sm text-charcoal-700/90">
              <p>Muslimin e.V.</p>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-sage-700/80" />
                Berlin
              </p>
            </address>
            <Link
              href="/kontakt"
              className="mt-4 inline-block text-sm text-sage-800 underline underline-offset-2 decoration-sage-300/70 transition-colors hover:text-charcoal-800"
            >
              Kontaktformular
            </Link>
          </div>

          {/* Verein Column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-800">
              Verein
            </h3>
            <ul className="space-y-2.5">
              {NAV_VEREIN.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-700/92 transition-colors hover:text-sage-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches Column */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-charcoal-800">
              Rechtliches
            </h3>
            <ul className="space-y-2.5">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-charcoal-700/92 transition-colors hover:text-sage-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-sand-300/70 pt-6">
          <span className="text-xs text-charcoal-600/85">
            © {new Date().getFullYear()} Muslimin e.V. Alle Rechte vorbehalten.
          </span>
        </div>
      </div>
    </footer>
  );
}
