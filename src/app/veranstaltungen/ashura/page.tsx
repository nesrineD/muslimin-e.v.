import Image from "next/image";
import { MapPin, Calendar, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/ashura/RegistrationForm";
import type { CapacityInfo } from "@/types/ashura";

async function getCapacity(): Promise<CapacityInfo> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events/ashura/capacity`, {
      next: { revalidate: 30 },
    });
    if (!res.ok) throw new Error();
    return res.json();
  } catch {
    // Fallback — show form as open if capacity check fails
    return {
      total_capacity: 250,
      registered: 0,
      available: 250,
      is_full: false,
    };
  }
}

export default async function AschuraPage() {
  const capacity = await getCapacity();

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50/40 via-white to-white">
      {/* Hero Image */}
      <div className="relative w-full h-64 md:h-80 overflow-hidden">
        <Image
          src="/images/veranstaltungen/ashura.jpg"
          alt="Aschura-Frauenveranstaltung"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-charcoal-900/30" />
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-charcoal-800 mb-4">
            Aschura-Frauenveranstaltung
          </h1>
          <p className="text-lg text-charcoal-600 max-w-xl mx-auto leading-relaxed">
            Die jährliche Gedenkveranstaltung zu Ehren von Imam Husain (F.) –
            mit Vorträgen, Trauergesängen und spirituellem Programm für Frauen
            und Mädchen.
          </p>
        </div>

        {/* Event Details */}
        <Card className="mb-10 border-sage-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-charcoal-800 text-lg">
              Veranstaltungsdetails
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3 text-charcoal-700">
              <Calendar className="w-5 h-5 text-sage-600 flex-shrink-0" />
              <span>
                <strong>Datum:</strong> Sonntag, 15. Juni 2026
              </span>
            </div>
            <div className="flex items-center gap-3 text-charcoal-700">
              <MapPin className="w-5 h-5 text-sage-600 flex-shrink-0" />
              <span>
                <strong>Ort:</strong> Berlin{" "}
                <span className="text-charcoal-400 text-sm">
                  (genaue Adresse folgt)
                </span>
              </span>
            </div>
            <div className="flex items-center gap-3 text-charcoal-700">
              <Users className="w-5 h-5 text-sage-600 flex-shrink-0" />
              <span>
                <strong>Zielgruppe:</strong> Frauen und Mädchen
              </span>
            </div>
            <div className="mt-2 pt-2 border-t border-sage-100">
              <p className="text-sm text-charcoal-500">
                Die Veranstaltung ist offen für alle Frauen und Mädchen, die
                gemeinsam innehalten und gedenken möchten. Der Eintritt ist
                kostenlos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Capacity indicator */}
        {!capacity.is_full && (
          <p className="text-center text-sm text-charcoal-500 mb-6">
            Noch{" "}
            <span className="font-semibold text-sage-700">
              {capacity.available}
            </span>{" "}
            von {capacity.total_capacity} Plätzen verfügbar.
          </p>
        )}

        {/* Registration form */}
        <Card className="border-sage-200 shadow-sm" id="anmeldung">
          <CardHeader>
            <CardTitle className="text-charcoal-800">
              Kostenlos anmelden
            </CardTitle>
            <p className="text-sm text-charcoal-500">
              Alle mit * markierten Felder sind Pflichtfelder.
            </p>
          </CardHeader>
          <CardContent>
            <RegistrationForm isFull={capacity.is_full} />
          </CardContent>
        </Card>

        {/* Cancellation link */}
        <p className="text-center text-sm text-charcoal-500 mt-6">
          Bereits angemeldet?{" "}
          <a
            href="/veranstaltungen/ashura/stornieren"
            className="underline text-sage-700 hover:text-sage-800"
          >
            Anmeldung stornieren oder ändern
          </a>
        </p>
      </div>
    </main>
  );
}
