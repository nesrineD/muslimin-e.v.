import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CancellationRequestForm } from "@/components/aschura/CancellationRequestForm";

export default function StornierungPage() {
  return (
    <main className="min-h-screen bg-charcoal-900">
      <div className="container mx-auto px-4 py-16 max-w-lg">
        <div className="text-center mb-10">
          <h1 className="font-heading text-3xl font-bold text-cream-50 mb-3">
            Anmeldung stornieren
          </h1>
          <p className="text-charcoal-300 text-sm max-w-sm mx-auto">
            Gib deine E-Mail-Adresse ein, mit der du dich angemeldet hast. Wir
            senden dir einen Link zum Verwalten deiner Anmeldung.
          </p>
        </div>

        <Card className="bg-charcoal-800 border-charcoal-700 shadow-sm">
          <CardHeader>
            <CardTitle className="font-heading text-cream-50 text-base">
              Aschura-Frauenveranstaltung – 11. Juli 2026
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CancellationRequestForm />
          </CardContent>
        </Card>

        <p className="text-center text-sm text-charcoal-400 mt-6">
          <a
            href="/veranstaltungen/aschura"
            className="underline text-red-700 hover:text-red-600 transition-colors"
          >
            ← Zurück zur Veranstaltung
          </a>
        </p>
      </div>
    </main>
  );
}
