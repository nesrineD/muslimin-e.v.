import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import {
  CONTACT_INFO,
  LEGAL_LINKS,
  NAV_LINKS,
  TRUST_TEXT,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-sage-200/80 bg-gradient-to-b from-white via-cream-50/50 to-sage-50/80" role="contentinfo">
      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={44}
                height={44}
                className="h-11 w-auto transition-all duration-300 group-hover:scale-105"
              />
              <span className="font-semibold text-base text-sage-800 group-hover:text-sage-700 transition-colors">
                Muslimin e.V.
              </span>
            </Link>
            <Link
              href="/uber-uns"
              className="text-sm text-sage-600/90 hover:text-sage-800 leading-relaxed transition-colors block max-w-xs"
            >
              Muslimischer Frauen- & Mädchenverein – Gemeinschaft, Bildung &
              Hilfe seit 2011
            </Link>

            <div className="pt-1">
              <SocialMediaSection variant="footer" />
            </div>
          </div>

          <nav aria-label="Footer Navigation">
            <h3 className="text-xs font-bold text-sage-800 uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-sage-600 rounded-full" />
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all group"
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
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors group"
              >
                <Mail className="h-4 w-4 text-sage-500 group-hover:text-sage-700 transition-colors flex-shrink-0" />
                <span className="group-hover:underline">
                  {CONTACT_INFO.email}
                </span>
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
            <ul className="space-y-2.5">
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
            </ul>
          </div>
        </div>

        <Separator className="my-6 bg-sage-200/60" />

        <div className="flex flex-col gap-2 text-xs text-sage-500/80 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Muslimin e.V. Alle Rechte vorbehalten.</span>
          <span className="flex items-center gap-2">
            <span className="hidden md:inline text-sage-400">•</span>
            <span className="flex items-center gap-1.5 font-medium text-sage-600">
              {TRUST_TEXT}
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
