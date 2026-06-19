"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { Guest } from "@/types/aschura";

interface RegistrationData {
  id: string;
  email: string;
  anzahl_teilnehmer: number;
  guests: Guest[];
}

interface Props {
  token: string;
  registration: RegistrationData;
}

export function CancellationConfirmForm({ token, registration }: Props) {
  const [result, setResult] = useState<"full" | "reduce" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReduce, setShowReduce] = useState(false);
  const [showConfirmFull, setShowConfirmFull] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  function toggleGuest(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function cancelFull() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/events/aschura/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action: "full" }),
    });
    setLoading(false);
    if (res.ok) {
      setResult("full");
    } else {
      const data = await res.json();
      setError(data.error ?? "Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
      setShowConfirmFull(false);
    }
  }

  async function cancelSelected() {
    if (selectedIds.size === 0) {
      setError("Bitte wähle mindestens eine Person aus.");
      return;
    }
    if (selectedIds.size >= registration.guests.length) {
      setError(
        "Wenn alle Personen entfernt werden, nutze bitte 'Gesamte Anmeldung stornieren'.",
      );
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/events/aschura/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        action: "reduce",
        guest_ids_to_remove: Array.from(selectedIds),
      }),
    });
    setLoading(false);
    if (res.ok) {
      setResult("reduce");
    } else {
      const data = await res.json();
      setError(data.error ?? "Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    }
  }

  if (result === "full") {
    return (
      <div className="rounded-xl bg-charcoal-700 border border-charcoal-600 p-6 text-center space-y-2">
        <p className="font-semibold text-cream-50">Anmeldung storniert.</p>
        <p className="text-sm text-charcoal-300">
          Deine gesamte Anmeldung wurde erfolgreich storniert. Eine Bestätigung
          wurde an <strong className="text-charcoal-100">{registration.email}</strong> gesendet.
        </p>
      </div>
    );
  }

  if (result === "reduce") {
    return (
      <div className="rounded-xl bg-charcoal-700 border border-charcoal-600 p-6 text-center space-y-2">
        <p className="font-semibold text-cream-50">Änderung gespeichert.</p>
        <p className="text-sm text-charcoal-300">
          Die ausgewählten Personen wurden aus deiner Anmeldung entfernt. Eine
          Bestätigung wurde an <strong className="text-charcoal-100">{registration.email}</strong> gesendet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Guest list summary */}
      <div className="rounded-lg bg-charcoal-700 border border-charcoal-600 p-4 space-y-2 text-sm">
        <p className="text-charcoal-400 text-xs uppercase tracking-wide font-medium mb-2">
          Angemeldete Personen ({registration.guests.length})
        </p>
        {registration.guests.map((g) => (
          <p key={g.id} className="text-charcoal-100">
            {g.vorname} {g.nachname}
          </p>
        ))}
        <p className="text-charcoal-300 pt-1">
          <strong className="text-charcoal-200">E-Mail:</strong> {registration.email}
        </p>
      </div>

      {error && <p role="alert" className="text-red-500 text-sm">{error}</p>}

      {/* Option A: Full cancellation */}
      {!showConfirmFull ? (
        <Button
          onClick={() => setShowConfirmFull(true)}
          disabled={loading}
          variant="default"
          className="w-full min-h-[44px] bg-red-900 hover:bg-red-800 text-white"
        >
          Gesamte Anmeldung stornieren
        </Button>
      ) : (
        <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-4 space-y-3">
          <p className="text-charcoal-100 text-sm font-medium">
            Bist du sicher?
          </p>
          <p className="text-charcoal-300 text-sm">
            Die gesamte Anmeldung für{" "}
            <strong className="text-charcoal-100">{registration.guests.length} Person(en)</strong>{" "}
            wird storniert. Diese Aktion kann nicht rückgängig gemacht werden.
          </p>
          <div className="flex gap-3">
            <Button
              onClick={cancelFull}
              disabled={loading}
              className="flex-1 bg-red-900 hover:bg-red-800 text-white min-h-[44px]"
            >
              {loading ? "Wird storniert…" : "Ja, stornieren"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => { setShowConfirmFull(false); setError(null); }}
              disabled={loading}
              className="flex-1 text-charcoal-300 hover:text-cream-50 hover:bg-charcoal-700 min-h-[44px]"
            >
              Abbrechen
            </Button>
          </div>
        </div>
      )}

      {/* Option B: Remove specific guests */}
      {registration.guests.length > 1 && !showConfirmFull && (
        <>
          {!showReduce ? (
            <Button
              onClick={() => setShowReduce(true)}
              variant="outline"
              className="w-full min-h-[44px] border-charcoal-600 text-charcoal-200 hover:bg-charcoal-700 hover:text-cream-50"
            >
              Einzelne Personen entfernen
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-medium text-charcoal-200">
                Welche Personen sollen entfernt werden?
              </p>
              <div className="space-y-3 rounded-lg border border-charcoal-600 bg-charcoal-700 p-4">
                {registration.guests.map((g) => (
                  <div key={g.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`guest-${g.id}`}
                      checked={selectedIds.has(g.id)}
                      onCheckedChange={() => toggleGuest(g.id)}
                    />
                    <Label
                      htmlFor={`guest-${g.id}`}
                      className="text-sm text-charcoal-100 cursor-pointer"
                    >
                      {g.vorname} {g.nachname}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-charcoal-400">
                Mindestens 1 Person muss verbleiben.{" "}
                {selectedIds.size > 0 && (
                  <span className="text-charcoal-200 font-medium">
                    {selectedIds.size} ausgewählt,{" "}
                    {registration.guests.length - selectedIds.size} verbleibend.
                  </span>
                )}
              </p>
              <Button
                onClick={cancelSelected}
                disabled={loading || selectedIds.size === 0}
                className="w-full bg-red-900 hover:bg-red-800 text-white min-h-[44px]"
              >
                {loading ? "Wird gespeichert…" : `${selectedIds.size} Person(en) entfernen`}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-charcoal-400 hover:text-charcoal-200 hover:bg-charcoal-700"
                onClick={() => {
                  setShowReduce(false);
                  setSelectedIds(new Set());
                  setError(null);
                }}
              >
                Abbrechen
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
