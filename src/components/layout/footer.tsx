import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { LEGAL_LINKS } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Über uns", href: "/uber-uns" },
  { label: "Veranstaltungen", href: "/veranstaltungen" },
  { label: "Projekte", href: "/projekte" },
  { label: "Mitglied werden", href: "/mitglied-werden" },
  { label: "Spenden", href: "/spenden" },
];

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
            </h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-sm text-sage-600 hover:text-sage-800 hover:translate-x-0.5 transition-all"
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
                href="mailto:info@muslimin-ev.de"
                className="flex items-center gap-2 text-sage-600 hover:text-sage-800 transition-colors"
              >
                <Mail className="h-4 w-4 text-sage-500 flex-shrink-0" />
                info@muslimin-ev.de
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
            <ul className="space-y-2.5 text-sm">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sage-600 hover:text-sage-800 transition-colors block">
                    {link.label}
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
              Gemeinnützig anerkannt • DSGVO-konform • Seit 2011
            </span>
          </span>
        </div>
      </div>
    </footer>
  );
}
