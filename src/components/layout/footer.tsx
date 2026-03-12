// ============================================
// OPTIMIZED FOOTER — full-width 3-column layout
// ============================================

import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { LEGAL_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t border-sand-300/50 bg-gradient-to-b from-sand-300/80 via-sand-200/92 to-sage-100/72"
      role="contentinfo"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-cream-50/60 via-cream-50/25 to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-screen-xl px-8 py-8 md:px-16 md:py-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-[1.8fr_1fr_1fr] sm:gap-x-16 sm:gap-y-8">
          {/* Brand + Social Column */}
          <div className="space-y-3">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={40}
                height={40}
                className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-[13px] leading-relaxed text-charcoal-600/90">
              Im Glauben vereint. Füreinander da.
            </p>
            <SocialMediaSection variant="footer" />
          </div>

          {/* Kontakt Column */}
          <div className="sm:justify-self-center">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-800">
              Kontakt
            </h3>
            <address className="not-italic space-y-2 text-[13px] text-charcoal-700/90">
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-sage-700/80" />
                Berlin
              </p>
            </address>
            <Link
              href="/kontakt"
              className="mt-3 inline-block text-[13px] text-sage-800 transition-colors hover:text-charcoal-800"
            >
              Kontaktformular
            </Link>
          </div>

          {/* Rechtliches Column */}
          <div className="sm:justify-self-end">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-charcoal-800">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-charcoal-700/92 transition-colors hover:text-sage-800"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar — Copyright only */}
        <div className="mt-8 flex items-center justify-between border-t border-sand-300/70 pt-4">
          <span className="text-xs text-charcoal-500/80">
            © {new Date().getFullYear()} Muslimin e.V.
          </span>
          <span className="text-xs text-charcoal-500/60">
            Alle Rechte vorbehalten.
          </span>
        </div>
      </div>
    </footer>
  );
}
