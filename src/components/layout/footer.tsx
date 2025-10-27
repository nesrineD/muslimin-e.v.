import Link from "next/link";
import { HeartHandshake, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t bg-gradient-to-t from-sage-100/30 to-sage-50/50 border-sage-200">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid gap-8 lg:grid-cols-4 md:grid-cols-2">
          {/* Enhanced Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <img
                src="/images/muslimin-logo.svg"
                alt="Muslimin e.V. Logo"
                className="h-12 w-auto transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-md"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-sage-700">
                  Muslimin e.V.
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professionelle Beratung und Unterstützung für Vereinsmitglieder.
              <br />
              <span className="text-stone-600 font-medium">
                Vertraulich • Kostenfrei • Kompetent
              </span>
            </p>
            <div className="flex items-center space-x-2 text-xs text-stone-600">
              <div className="w-2 h-2 bg-stone-500 rounded-full"></div>
              <span>DSGVO-konform seit 2024</span>
            </div>
          </div>

          {/* Enhanced Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
              <div className="w-1 h-4 bg-stone-600 rounded-full"></div>
              <span>Unsere Services</span>
            </h3>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link
                href="/book"
                className="text-muted-foreground hover:text-stone-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-stone-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Termin buchen</span>
              </Link>
              <Link
                href="/beratungsstellen"
                className="text-muted-foreground hover:text-slate-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-slate-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Beratungsstellen finden</span>
              </Link>
              <Link
                href="/helper/register"
                className="text-muted-foreground hover:text-gray-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Helferin werden</span>
              </Link>
            </nav>
          </div>

          {/* Enhanced Support */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
              <div className="w-1 h-4 bg-slate-600 rounded-full"></div>
              <span>Information & Gemeinschaft</span>
            </h3>
            <nav className="flex flex-col space-y-3 text-sm">
              <Link
                href="/about"
                className="text-muted-foreground hover:text-stone-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-stone-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Über uns</span>
              </Link>
              <Link
                href="/veranstaltungen"
                className="text-muted-foreground hover:text-slate-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-slate-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Unsere Veranstaltungen</span>
              </Link>
              <Link
                href="/mitglied-werden"
                className="text-muted-foreground hover:text-gray-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-gray-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Mitglied werden</span>
              </Link>
              <Link
                href="/helper/register"
                className="text-muted-foreground hover:text-neutral-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-neutral-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>Helferin werden</span>
              </Link>
              <Link
                href="/pwa-guide"
                className="text-muted-foreground hover:text-blue-700 transition-colors flex items-center space-x-2 group"
              >
                <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:scale-150 transition-transform"></span>
                <span>📱 Als App installieren</span>
              </Link>
            </nav>
          </div>

          {/* Enhanced Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
              <div className="w-1 h-4 bg-stone-600 rounded-full"></div>
              <span>Kontakt & Erreichen</span>
            </h3>
            <div className="space-y-4 text-sm">
              <div className="group">
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-stone-100/50 transition-colors cursor-pointer">
                  <Mail className="h-4 w-4 text-stone-600 group-hover:scale-110 transition-transform" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground group-hover:text-stone-700 transition-colors">
                      info@muslimin-ev.de
                    </span>
                    <span className="text-xs text-gray-400">
                      E-Mail Support
                    </span>
                  </div>
                </div>
              </div>
              <div className="group">
                <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100/50 transition-colors cursor-pointer">
                  <MapPin className="h-4 w-4 text-gray-600 group-hover:scale-110 transition-transform mt-0.5" />
                  <div className="flex flex-col">
                    <span className="text-muted-foreground group-hover:text-gray-700 transition-colors">
                      Berlin
                    </span>
                    <span className="text-xs text-gray-400">
                      Geschäftsstelle
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4">
            <p className="flex items-center space-x-2">
              <span>© 2025 Muslimin e.V.</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-xs">Alle Rechte vorbehalten</span>
            </p>
            <div className="flex items-center space-x-1 text-xs">
              <div className="w-1 h-1 bg-stone-500 rounded-full"></div>
              <span className="text-stone-600">Gemeinnützig anerkannt</span>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link
              href="/impressum"
              className="hover:text-stone-600 transition-colors text-xs font-medium"
            >
              Impressum
            </Link>
            <Link
              href="/datenschutz"
              className="hover:text-slate-600 transition-colors text-xs font-medium"
            >
              Datenschutz
            </Link>
            <Link
              href="/agb"
              className="hover:text-gray-600 transition-colors text-xs font-medium"
            >
              AGB
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
