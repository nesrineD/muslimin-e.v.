"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Check, Calendar, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function HelperRegistrationSuccess() {
  const router = useRouter();

  useEffect(() => {
    // Auto-redirect after 10 seconds
    const timer = setTimeout(() => {
      router.push("/helper/dashboard");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  const handleGoToDashboard = () => {
    router.push("/helper/dashboard");
  };

  return (
    <div className="min-h-screen bg-warm-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
            <Check className="h-8 w-8 text-emerald-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-emerald-800">
            Registrierung erfolgreich!
          </CardTitle>
          <CardDescription className="text-gray-600">
            Vielen Dank für Ihre Anmeldung als Helferin
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <Alert>
            <UserCheck className="h-4 w-4" />
            <AlertTitle>Nächste Schritte</AlertTitle>
            <AlertDescription>
              Ihre Registrierung wurde erfolgreich übermittelt. Ein
              Administrator wird Ihr Profil in Kürze überprüfen und
              freischalten.
            </AlertDescription>
          </Alert>

          <Alert>
            <Calendar className="h-4 w-4" />
            <AlertTitle>Verfügbarkeiten festlegen</AlertTitle>
            <AlertDescription>
              Nach der Freischaltung können Sie in Ihrem Dashboard Ihre
              Verfügbarkeiten verwalten und Termine einsehen.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button onClick={handleGoToDashboard} className="w-full" size="lg">
              Zum Helferinnen-Dashboard
            </Button>

            <p className="text-sm text-gray-500 text-center">
              Sie werden automatisch in 10 Sekunden weitergeleitet
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
