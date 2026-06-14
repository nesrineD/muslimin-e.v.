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
      <div className="rounded-xl bg-cream-50 border border-sage-200 p-6 text-center space-y-2">
        <p className="font-semibold text-charcoal-800">Anmeldung storniert.</p>
        <p className="text-sm text-charcoal-600">
          Deine gesamte Anmeldung wurde erfolgreich storniert. Eine Bestätigung
          wurde an <strong>{registration.email}</strong> gesendet.
        </p>
      </div>
    );
  }

  if (result === "reduce") {
    return (
      <div className="rounded-xl bg-cream-50 border border-sage-200 p-6 text-center space-y-2">
        <p className="font-semibold text-charcoal-800">Änderung gespeichert.</p>
        <p className="text-sm text-charcoal-600">
          Die ausgewählten Personen wurden aus deiner Anmeldung entfernt. Eine
          Bestätigung wurde an <strong>{registration.email}</strong> gesendet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Guest list summary */}
      <div className="rounded-lg bg-cream-50 border border-sage-200 p-4 space-y-2 text-sm">
        <p className="text-charcoal-500 text-xs uppercase tracking-wide font-medium mb-2">
          Angemeldete Personen ({registration.guests.length})
        </p>
        {registration.guests.map((g) => (
          <p key={g.id} className="text-charcoal-800">
            {g.vorname} {g.nachname}
          </p>
        ))}
        <p className="text-charcoal-600 pt-1">
          <strong>E-Mail:</strong> {registration.email}
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Option A: Full cancellation */}
      <Button
        onClick={cancelFull}
        disabled={loading}
        variant="default"
        className="w-full min-h-[44px] bg-red-600 hover:bg-red-700 text-white"
      >
        {loading && !showReduce ? "Wird verarbeitet…" : "Gesamte Anmeldung stornieren"}
      </Button>

      {/* Option B: Remove specific guests */}
      {registration.guests.length > 1 && (
        <>
          {!showReduce ? (
            <Button
              onClick={() => setShowReduce(true)}
              variant="outline"
              className="w-full min-h-[44px] border-sage-300 text-sage-700 hover:bg-sage-50"
            >
              Einzelne Personen entfernen
            </Button>
          ) : (
            <div className="space-y-4">
              <p className="text-sm font-medium text-charcoal-700">
                Welche Personen sollen entfernt werden?
              </p>
              <div className="space-y-3 rounded-lg border border-sage-200 p-4">
                {registration.guests.map((g) => (
                  <div key={g.id} className="flex items-center gap-3">
                    <Checkbox
                      id={`guest-${g.id}`}
                      checked={selectedIds.has(g.id)}
                      onCheckedChange={() => toggleGuest(g.id)}
                    />
                    <Label
                      htmlFor={`guest-${g.id}`}
                      className="text-sm text-charcoal-800 cursor-pointer"
                    >
                      {g.vorname} {g.nachname}
                    </Label>
                  </div>
                ))}
              </div>
              <p className="text-xs text-charcoal-500">
                Mindestens 1 Person muss verbleiben.{" "}
                {selectedIds.size > 0 && (
                  <span className="text-charcoal-700 font-medium">
                    {selectedIds.size} ausgewählt,{" "}
                    {registration.guests.length - selectedIds.size} verbleibend.
                  </span>
                )}
              </p>
              <Button
                onClick={cancelSelected}
                disabled={loading || selectedIds.size === 0}
                className="w-full bg-sage-600 hover:bg-sage-700 text-white min-h-[44px]"
              >
                {loading ? "Wird gespeichert…" : `${selectedIds.size} Person(en) entfernen`}
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="w-full text-charcoal-500"
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
