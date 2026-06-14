import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/aschura/RegistrationForm";
import type { CapacityInfo } from "@/types/aschura";

async function getCapacity(): Promise<CapacityInfo> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/events/aschura/capacity`, {
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
          src="/images/veranstaltungen/aschura.jpg"
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
          <p className="text-base text-charcoal-600 max-w-xl mx-auto leading-relaxed mb-4">
            As-Salamu Alaikum liebe Schwestern,
            <br />
            bald ist es wieder soweit: Wir erinnern uns, wir trauern, wir lassen
            die Lehren von Karbala in unseren Herzen lebendig werden.
          </p>
          <p className="text-base font-semibold text-charcoal-700 max-w-xl mx-auto">
            Gemeinsam trauern. Gemeinsam lernen. Gemeinsam wachsen.
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
                <strong>Datum:</strong> Samstag, 11. Juli 2025
              </span>
            </div>
            <div className="flex items-center gap-3 text-charcoal-700">
              <MapPin className="w-5 h-5 text-sage-600 flex-shrink-0" />
              <span>
                <strong>Ort:</strong>{" "}
                <a
                  href="https://maps.google.com/?q=Queen+Palace+Skalitzer+Straße+130,+10999+Berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-sage-600 transition-colors"
                >
                  Queen Palace, Skalitzer Straße 130, 10999 Berlin
                </a>
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Wichtige Hinweise */}
        <div className="mb-10 rounded-xl border border-sand-200 bg-cream-50 px-6 py-5 space-y-4">
          <h2 className="font-semibold text-charcoal-800 text-base">
            Wichtige Hinweise zur Teilnahme
          </h2>
          <ul className="space-y-3 text-sm text-charcoal-700 leading-relaxed">
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-sage-600">•</span>
              <span>
                Die Veranstaltung richtet sich ausschließlich an{" "}
                <strong>Schwestern und Mädchen ab 9 Jahren</strong>.
                Kinderbetreuung wird nicht angeboten – die Veranstaltung findet
                ohne Kinder statt.{" "}
                <span className="text-charcoal-500">
                  Ausnahme: Säuglinge bis 2 Jahre dürfen mitgebracht werden,
                  wenn sie durchgehend bei der Mutter bleiben.
                </span>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-sage-600">•</span>
              <span>
                Die <strong>Anmeldung ist verbindlich</strong>. Solltest du
                nicht teilnehmen können, bitten wir dich, dich über den
                Abmeldelink in deiner Bestätigungsnachricht abzumelden – so
                ermöglichen wir Schwestern auf der Warteliste die Teilnahme.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-sage-600">•</span>
              <span>
                Während der gesamten Veranstaltung sind{" "}
                <strong>Foto- und Videoaufnahmen untersagt</strong>. Wir bitten
                um Rücksicht und Einhaltung dieser Regel im Sinne aller
                Anwesenden.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-0.5 shrink-0 text-sage-600">•</span>
              <span className="text-charcoal-500">
                Mit dem Absenden des Formulars stimmst du der Verarbeitung
                deiner personenbezogenen Daten zum Zweck der
                Veranstaltungsorganisation zu.
              </span>
            </li>
          </ul>
        </div>

        {/* Registration form */}
        <Card className="border-sage-200 shadow-sm" id="anmeldung">
          <CardHeader>
            <CardTitle className="text-charcoal-800">
              Anmeldung zur Aschura-Frauenveranstaltung
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
            href="/veranstaltungen/aschura/stornieren"
            className="underline text-sage-700 hover:text-sage-800"
          >
            Anmeldung stornieren oder ändern
          </a>
        </p>
      </div>
    </main>
  );
}
