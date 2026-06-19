import Image from "next/image";
import Link from "next/link";
import { Calendar, ClipboardList, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RegistrationForm } from "@/components/aschura/RegistrationForm";
import { AschuraGallery } from "@/components/aschura/AschuraGallery";
import { Button } from "@/components/ui/button";
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
    <main className="min-h-screen bg-charcoal-900 text-cream-50">
      {/* Hero */}
      <section className="relative min-h-[520px] overflow-hidden md:min-h-[620px]">
        <Image
          src="/images/veranstaltungen/Aschura/IMG_6166%20%282025-07-12T10_22_20.193%29.JPG"
          alt="Aschura-Frauenveranstaltung – Blick in den Saal"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/45 via-charcoal-900/78 to-charcoal-900" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-charcoal-900 to-transparent" />

        <div className="container relative z-10 mx-auto flex min-h-[520px] max-w-5xl items-end px-4 py-12 md:min-h-[620px] md:py-16">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-red-300">
              Aschura 2026 · Frauenveranstaltung
            </p>
            <h1 className="font-heading text-4xl font-bold leading-tight text-cream-50 md:text-6xl">
              Gemeinsam erinnern. Gemeinsam wachsen.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-charcoal-100 md:text-lg">
              As-Salamu Alaikum liebe Schwestern, bald ist es wieder soweit:
              Wir erinnern uns, wir trauern, wir lassen die Lehren von Karbala
              in unseren Herzen lebendig werden.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                className="min-h-[46px] bg-[#631313] px-6 text-white hover:bg-[#7a1818]"
              >
                <Link href="#anmeldung">Jetzt anmelden</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="min-h-[46px] border-cream-100/40 bg-charcoal-900/55 px-6 text-cream-50 hover:bg-charcoal-800"
              >
                <Link href="#hinweise">Hinweise lesen</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto max-w-5xl px-4 py-14 md:py-20">
        {/* Veranstaltungsdetails */}
        <Card className="mb-10 border-charcoal-700 bg-charcoal-800 shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="font-heading text-lg font-semibold text-cream-50">
              Veranstaltungsdetails
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl bg-charcoal-700/70 p-4">
              <Calendar className="h-6 w-6 flex-shrink-0 text-red-400" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-charcoal-300">Datum</p>
                <p className="font-semibold text-cream-50">Samstag, 11. Juli 2026</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl bg-charcoal-700/70 p-4">
              <MapPin className="mt-0.5 h-6 w-6 flex-shrink-0 text-red-400" />
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-charcoal-300">Ort</p>
                <a
                  href="https://maps.google.com/?q=Queen+Palace+Skalitzer+Straße+130,+10999+Berlin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cream-50 underline underline-offset-2 transition-colors hover:text-red-300"
                >
                  Queen Palace, Skalitzer Straße 130, 10999 Berlin
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impressionen */}
        <AschuraGallery />

        {/* Wichtige Hinweise */}
        <section
          id="hinweise"
          className="mb-10 rounded-2xl border border-red-950/60 bg-gradient-to-br from-charcoal-800 to-charcoal-900 px-6 py-6 shadow-sm md:px-7"
        >
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-950/70 text-red-200 ring-1 ring-red-900/60">
              <ClipboardList className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-red-300">
                Bitte beachte
              </p>
              <h2 className="font-heading text-xl font-semibold text-cream-50">
                Hinweise zur Teilnahme
              </h2>
            </div>
          </div>
          <ul className="grid gap-3 text-sm leading-relaxed md:grid-cols-2">
            <li className="rounded-xl border border-charcoal-700 bg-charcoal-900/45 p-4">
              <strong className="block text-charcoal-100">
                Schwestern und Mädchen ab 9 Jahren
              </strong>
              <span className="mt-1 block text-charcoal-300">
                Es gibt keine Kinderbetreuung. Säuglinge bis 2 Jahre dürfen bei
                der Mutter bleiben.
              </span>
            </li>
            <li className="rounded-xl border border-charcoal-700 bg-charcoal-900/45 p-4">
              <strong className="block text-charcoal-100">
                Verbindliche Anmeldung
              </strong>
              <span className="mt-1 block text-charcoal-300">
                Bitte nutze bei Verhinderung den Abmeldelink, damit
                Wartelistenplätze frei werden.
              </span>
            </li>
            <li className="rounded-xl border border-charcoal-700 bg-charcoal-900/45 p-4">
              <strong className="block text-charcoal-100">
                Keine Foto- und Videoaufnahmen
              </strong>
              <span className="mt-1 block text-charcoal-300">
                Während der gesamten Veranstaltung bitten wir um Rücksicht und
                Einhaltung dieser Regel.
              </span>
            </li>
            <li className="rounded-xl border border-charcoal-700 bg-charcoal-900/45 p-4">
              <strong className="block text-charcoal-100">Datenschutz</strong>
              <span className="mt-1 block text-charcoal-300">
                Mit dem Absenden des Formulars stimmst du der Verarbeitung für
                die Veranstaltungsorganisation zu.
              </span>
            </li>
          </ul>
        </section>

        {/* Registration form */}
        <Card
          className="mb-10 border-charcoal-700 bg-charcoal-800 shadow-sm"
          id="anmeldung"
        >
          <CardHeader>
            <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div>
                <CardTitle className="font-heading text-cream-50">
                  Anmeldung zur Aschura-Frauenveranstaltung
                </CardTitle>
                <p className="mt-2 text-sm text-charcoal-300">
                  Alle mit * markierten Felder sind Pflichtfelder.
                </p>
              </div>
              {!capacity.is_full && (
                <span className="inline-flex w-fit rounded-full border border-red-900/60 bg-red-950/45 px-3 py-1 text-xs font-semibold text-red-200">
                  {capacity.available} Plätze verfügbar
                </span>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <RegistrationForm isFull={capacity.is_full} />
          </CardContent>
        </Card>

        {/* Cancellation link */}
        <p className="mt-6 text-center text-sm text-charcoal-300">
          Bereits angemeldet?{" "}
          <a
            href="/veranstaltungen/aschura/stornieren"
            className="text-red-400 underline underline-offset-2 transition-colors hover:text-red-300"
          >
            Anmeldung stornieren oder ändern
          </a>
        </p>

      </div>
    </main>
  );
}
