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
      className="relative overflow-hidden border-t border-sage-700/30 bg-charcoal-900"
      role="contentinfo"
    >
      {/* Warm clay tint to soften the dark tone */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-clay-900/20 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sage-500/50 to-transparent"
        aria-hidden="true"
      />
      <div className="container mx-auto max-w-screen-xl px-8 py-10 md:px-16 md:py-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-[1.8fr_1fr_1fr] sm:gap-x-16 sm:gap-y-8">
          {/* Brand + Social Column */}
          <div className="col-span-2 space-y-4 sm:col-span-1">
            <Link href="/" className="inline-block group">
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={59}
                height={40}
                className="h-10 w-auto brightness-0 invert opacity-90 transition-all duration-300 group-hover:scale-105 group-hover:opacity-100"
                unoptimized
              />
            </Link>
            <p className="max-w-xs text-[13px] leading-relaxed text-sand-100">
              Im Glauben vereint. Füreinander da.
            </p>
            <div>
              <SocialMediaSection variant="footer" />
            </div>
          </div>

          {/* Kontakt Column */}
          <div className="sm:justify-self-center">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-sand-50">
              Kontakt
            </h3>
            <address className="not-italic space-y-2">
              <p className="inline-flex items-center gap-2 text-sm font-semibold leading-none text-white">
                <MapPin className="h-4 w-4 flex-shrink-0 text-sand-100" />
                <span className="text-white">Berlin</span>
              </p>
            </address>
            <Link
              href="/kontakt"
              className="mt-3 inline-block text-[13px] font-medium text-sand-100 transition-colors hover:text-white hover:underline hover:underline-offset-4"
            >
              Kontaktformular
            </Link>
          </div>

          {/* Rechtliches Column */}
          <div className="sm:justify-self-end">
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-sand-50">
              Rechtliches
            </h3>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] font-medium text-sand-100 transition-colors hover:text-white hover:underline hover:underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar — Copyright only */}
        <div className="mt-10 flex min-h-10 flex-col gap-2 border-t border-sage-500/60 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <span className="block text-sm font-semibold leading-relaxed text-white">
            © {new Date().getFullYear()} Muslimin e.V.
          </span>
          <span className="block text-sm font-semibold leading-relaxed text-white">
            Alle Rechte vorbehalten.
          </span>
        </div>
      </div>
    </footer>
  );
}
