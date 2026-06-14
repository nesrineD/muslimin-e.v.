import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancellationRequestForm } from "@/components/ashura/CancellationRequestForm";

export default function StornierungPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-cream-50/40 via-white to-white">
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-charcoal-800 mb-3">
            Anmeldung stornieren
          </h1>
          <p className="text-charcoal-600 text-sm">
            Gib deine E-Mail-Adresse ein, mit der du dich angemeldet hast. Wir
            senden dir einen Link zum Verwalten deiner Anmeldung.
          </p>
        </div>

        <Card className="border-sage-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-charcoal-800 text-base">
              Aschura-Frauenveranstaltung 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CancellationRequestForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-charcoal-500 mt-6">
          <a
            href="/veranstaltungen/ashura"
            className="underline text-sage-700 hover:text-sage-800"
          >
            ← Zurück zur Veranstaltung
          </a>
        </p>
      </div>
    </main>
  );
}
