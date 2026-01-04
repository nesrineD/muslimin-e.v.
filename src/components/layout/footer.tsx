import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import {
  NAV_LINKS,
  MEMBER_NAV_LINKS,
  LEGAL_LINKS,
  CONTACT_INFO,
  TRUST_TEXT,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer
      className="border-t bg-gradient-to-t from-sage-600 via-sage-500 to-sage-400 border-sage-700 text-sand-50"
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
              <Image
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                width={48}
                height={48}
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-sand-50">
                  Muslimin e.V.
                </span>
              </div>
            </Link>
            <p className="text-sm text-sand-100 leading-relaxed">
              {TRUST_TEXT.tagline}
              <br />
              <span className="text-sand-200 font-medium">
                {TRUST_TEXT.values}
              </span>
            </p>
            <div className="flex items-center space-x-2 text-xs text-sand-200">
              <div className="w-2 h-2 bg-sand-300 rounded-full"></div>
              <span>{TRUST_TEXT.gdprCompliant}</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-sand-50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-sand-200 rounded-full"></div>
              <span>Navigation</span>
            </h3>
            <nav className="flex flex-col space-y-3 text-sm" aria-label="Footer-Navigation">
              {NAV_LINKS.map((link) => (
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
            <h3 className="text-sm font-semibold text-sand-50 flex items-center space-x-2">
              <div className="w-1 h-4 bg-sand-200 rounded-full"></div>
              <span>Kontakt</span>
            </h3>
            <div className="space-y-4 text-sm">
              <div className="group">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-sage-700/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300"
                  aria-label={`E-Mail an ${CONTACT_INFO.email} senden`}
                >
                  <Mail className="h-4 w-4 text-sand-200 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-sand-100 group-hover:text-sand-50 transition-colors">
                      {CONTACT_INFO.email}
                    </span>
                    <span className="text-xs text-sand-300">E-Mail Support</span>
                  </div>
                </a>
              </div>
              <div className="group">
                <div className="flex items-start space-x-3 p-2 rounded-lg">
                  <MapPin className="h-4 w-4 text-sand-200 mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-sand-100">
                      {CONTACT_INFO.location}
                    </span>
                    <span className="text-xs text-sand-300">
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
              <h3 className="text-sm font-semibold text-sand-50 flex items-center space-x-2">
                <div className="w-1 h-4 bg-sand-200 rounded-full"></div>
                <span>Rechtliches</span>
              </h3>
              <nav className="flex flex-col space-y-2 text-sm" aria-label="Rechtliche Links">
                {LEGAL_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sand-100 hover:text-sand-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 rounded"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-sage-700" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-sand-200">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <p className="flex items-center space-x-2">
              <span>{TRUST_TEXT.copyright}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-xs">{TRUST_TEXT.rightsReserved}</span>
            </p>
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-1 h-1 bg-sand-300 rounded-full"></div>
              <span className="text-sand-300">{TRUST_TEXT.legalStatus}</span>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-sand-50 transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand-300 rounded"
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
