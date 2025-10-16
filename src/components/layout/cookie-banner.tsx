"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { X, Cookie, Settings } from "lucide-react";
import Link from "next/link";

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        functional: true,
        analytics: true,
        marketing: false, // Keine Marketing-Cookies im MVP
        timestamp: new Date().toISOString(),
      })
    );
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        necessary: true,
        functional: false,
        analytics: false,
        marketing: false,
        timestamp: new Date().toISOString(),
      })
    );
    setShowBanner(false);
  };

  const saveSettings = (settings: any) => {
    localStorage.setItem(
      "cookie-consent",
      JSON.stringify({
        ...settings,
        necessary: true, // Immer erforderlich
        timestamp: new Date().toISOString(),
      })
    );
    setShowBanner(false);
    setShowSettings(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Cookie className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h3 className="font-semibold mb-2">Cookie-Einstellungen</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Wir verwenden Cookies, um Ihnen die bestmögliche Nutzererfahrung
                zu bieten. Notwendige Cookies sind für den Betrieb der Plattform
                erforderlich.
              </p>

              {!showSettings ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={acceptAll} className="flex-1">
                    Alle akzeptieren
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowSettings(true)}
                    className="flex-1"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Einstellungen
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={acceptNecessary}
                    className="flex-1"
                  >
                    Nur notwendige
                  </Button>
                </div>
              ) : (
                <CookieSettings
                  onSave={saveSettings}
                  onCancel={() => setShowSettings(false)}
                />
              )}

              <p className="text-xs text-muted-foreground mt-3">
                Weitere Informationen finden Sie in unserer{" "}
                <Link
                  href="/datenschutz"
                  className="underline hover:text-primary"
                >
                  Datenschutzerklärung
                </Link>
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowBanner(false)}
              className="flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CookieSettings({
  onSave,
  onCancel,
}: {
  onSave: (settings: any) => void;
  onCancel: () => void;
}) {
  const [settings, setSettings] = useState({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium text-sm">Notwendige Cookies</label>
            <p className="text-xs text-muted-foreground">
              Erforderlich für Login und Grundfunktionen
            </p>
          </div>
          <input type="checkbox" checked={true} disabled className="rounded" />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium text-sm">Funktionale Cookies</label>
            <p className="text-xs text-muted-foreground">
              Für erweiterte Funktionen und Benutzereinstellungen
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.functional}
            onChange={(e) =>
              setSettings({ ...settings, functional: e.target.checked })
            }
            className="rounded"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="font-medium text-sm">Analyse-Cookies</label>
            <p className="text-xs text-muted-foreground">
              Helfen uns, die Nutzung zu verstehen und zu verbessern
            </p>
          </div>
          <input
            type="checkbox"
            checked={settings.analytics}
            onChange={(e) =>
              setSettings({ ...settings, analytics: e.target.checked })
            }
            className="rounded"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button onClick={() => onSave(settings)} className="flex-1">
          Einstellungen speichern
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Abbrechen
        </Button>
      </div>
    </div>
  );
}
