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
      <main className="min-h-screen flex items-center justify-center px-4">
        <p className="text-charcoal-600 text-center">
          Kein Stornierungslink angegeben.{" "}
          <a
            href="/veranstaltungen/aschura/stornieren"
            className="underline text-sage-700"
          >
            Neuen Link anfordern
          </a>
        </p>
      </main>
    );
  }

  const registration = await getRegistration(resolvedToken);

  if (!registration) {
    return (
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-3">
          <p className="text-charcoal-800 font-semibold">
            Dieser Link ist nicht mehr gültig.
          </p>
          <p className="text-charcoal-600 text-sm">
            Bitte fordere einen neuen Stornierungslink an.
          </p>
          <a
            href="/veranstaltungen/aschura/stornieren"
            className="inline-block underline text-sage-700 text-sm"
          >
            Neuen Link anfordern
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50/40 via-white to-white">
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-charcoal-800 mb-3">
            Anmeldung verwalten
          </h1>
          <p className="text-charcoal-600 text-sm">
            Hier kannst du deine Anmeldung für die Aschura-Frauenveranstaltung
            2026 stornieren oder die Anzahl der Teilnehmerinnen ändern.
          </p>
        </div>

        <Card className="border-sage-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-charcoal-800 text-base">
              Aschura-Frauenveranstaltung – 15. Juni 2026, Berlin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CancellationConfirmForm
              token={resolvedToken}
              registration={registration}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
