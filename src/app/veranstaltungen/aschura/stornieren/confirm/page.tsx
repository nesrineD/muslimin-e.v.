import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancellationConfirmForm } from "@/components/aschura/CancellationConfirmForm";

interface Props {
  searchParams: Promise<{ token?: string }>;
}

async function getRegistration(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const res = await fetch(
    `${baseUrl}/api/events/aschura/cancel?token=${encodeURIComponent(token)}`,
    { cache: "no-store" },
  );
  if (!res.ok) return null;
  return res.json();
}

export default async function StornierungConfirmPage({ searchParams }: Props) {
  const { token } = await searchParams;
  const resolvedToken = token ?? "";

  if (!resolvedToken) {
    return (
      <main className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-3">
          <p className="text-cream-50 font-semibold">Kein Stornierungslink angegeben.</p>
          <p className="text-charcoal-300 text-sm">
            Bitte fordere einen neuen Link an.
          </p>
          <a
            href="/veranstaltungen/aschura/stornieren"
            className="inline-block underline text-red-700 hover:text-red-600 text-sm transition-colors"
          >
            Neuen Link anfordern
          </a>
        </div>
      </main>
    );
  }

  const registration = await getRegistration(resolvedToken);

  if (!registration) {
    return (
      <main className="min-h-screen bg-charcoal-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-3">
          <p className="text-cream-50 font-semibold">
            Dieser Link ist nicht mehr gültig.
          </p>
          <p className="text-charcoal-300 text-sm">
            Bitte fordere einen neuen Stornierungslink an.
          </p>
          <a
            href="/veranstaltungen/aschura/stornieren"
            className="inline-block underline text-red-700 hover:text-red-600 text-sm transition-colors"
          >
            Neuen Link anfordern
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-charcoal-900">
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-cream-50 mb-3">
            Anmeldung verwalten
          </h1>
          <p className="text-charcoal-300 text-sm max-w-sm mx-auto">
            Hier kannst du deine Anmeldung für die Aschura-Frauenveranstaltung
            2026 stornieren oder die Anzahl der Teilnehmerinnen ändern.
          </p>
        </div>

        <Card className="bg-charcoal-800 border-charcoal-700 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-cream-50 text-base">
              Aschura-Frauenveranstaltung – 11. Juli 2026, Berlin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CancellationConfirmForm
              token={resolvedToken}
              registration={registration}
            />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-charcoal-400 mt-6">
          <a
            href="/veranstaltungen/aschura/stornieren"
            className="underline text-red-700 hover:text-red-600 transition-colors"
          >
            ← Neuen Stornierungslink anfordern
          </a>
        </p>
      </div>
    </main>
  );
}
