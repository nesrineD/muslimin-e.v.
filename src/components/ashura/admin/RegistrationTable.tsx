"use client";

import { useState, useMemo } from "react";
import type { EventRegistration, CapacityInfo } from "@/types/ashura";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsBar } from "@/components/ashura/admin/StatsBar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  initialRegistrations: EventRegistration[];
  capacity: CapacityInfo;
}

export function RegistrationTable({ initialRegistrations, capacity }: Props) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [search, setSearch] = useState("");

  const checkedIn = useMemo(
    () => registrations.filter((r) => r.checked_in && r.status === "active").length,
    [registrations],
  );
  const [cancelTarget, setCancelTarget] = useState<EventRegistration | null>(null);
  const [cancelAnzahl, setCancelAnzahl] = useState(1);
  const [cancelling, setCancelling] = useState(false);

  function openCancelDialog(r: EventRegistration) {
    setCancelTarget(r);
    setCancelAnzahl(r.anzahl_teilnehmer); // default: cancel all
  }

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    return (
      r.vorname.toLowerCase().includes(q) ||
      r.nachname.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  });

  async function toggleCheckin(id: string) {
    const res = await fetch(`/api/events/ashura/registrations/${id}/checkin`, {
      method: "PATCH",
    });
    if (!res.ok) return;
    const { checked_in } = await res.json();
    setRegistrations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, checked_in } : r)),
    );
  }

  async function confirmCancel() {
    if (!cancelTarget) return;
    setCancelling(true);
    const res = await fetch(
      `/api/events/ashura/registrations/${cancelTarget.id}/cancel`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ anzahl: cancelAnzahl }),
      },
    );
    setCancelling(false);
    if (res.ok) {
      const { isFullCancel, new_anzahl } = await res.json();
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === cancelTarget.id
            ? isFullCancel
              ? { ...r, status: "cancelled" }
              : { ...r, anzahl_teilnehmer: new_anzahl }
            : r,
        ),
      );
    }
    setCancelTarget(null);
  }

  return (
    <>
      <StatsBar capacity={capacity} checkedIn={checkedIn} />

      <Input
        placeholder="Nach Name oder E-Mail suchen…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />

      <div className="overflow-x-auto rounded-xl border border-sage-200">
        <table className="w-full text-sm">
          <thead className="bg-cream-50 text-charcoal-600 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">E-Mail</th>
              <th className="px-4 py-3 text-center">Anz.</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Check-in</th>
              <th className="px-4 py-3 text-center">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100">
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-8 text-center text-charcoal-400"
                >
                  Keine Ergebnisse.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr
                key={r.id}
                className={r.status === "cancelled" ? "opacity-50" : ""}
              >
                <td className="px-4 py-3 font-medium text-charcoal-800">
                  {r.vorname} {r.nachname}
                </td>
                <td className="px-4 py-3 text-charcoal-600">{r.email}</td>
                <td className="px-4 py-3 text-center">{r.anzahl_teilnehmer}</td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                      r.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {r.status === "active" ? "Aktiv" : "Storniert"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleCheckin(r.id)}
                    disabled={r.status === "cancelled"}
                    className={`w-8 h-8 rounded-full border-2 transition-colors ${
                      r.checked_in
                        ? "bg-sage-600 border-sage-600"
                        : "border-sage-300 hover:border-sage-500"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                    title={
                      r.checked_in
                        ? "Eingecheckt — klicken zum Rückgängigmachen"
                        : "Einchecken"
                    }
                    aria-label={`Check-in für ${r.vorname} ${r.nachname}`}
                  >
                    {r.checked_in && (
                      <svg
                        className="w-4 h-4 text-white mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  {r.status === "active" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => openCancelDialog(r)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs"
                    >
                      Stornieren
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cancellation dialog */}
      <Dialog open={!!cancelTarget} onOpenChange={() => setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Teilnehmerinnen stornieren</DialogTitle>
            <DialogDescription>
              Anmeldung von{" "}
              <strong>
                {cancelTarget?.vorname} {cancelTarget?.nachname}
              </strong>{" "}
              — insgesamt{" "}
              <strong>{cancelTarget?.anzahl_teilnehmer} Platz/Plätze</strong>{" "}
              gebucht.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2 space-y-3">
            <label className="block text-sm font-medium text-charcoal-700">
              Wie viele Plätze stornieren?
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setCancelAnzahl((n) => Math.max(1, n - 1))}
                disabled={cancelAnzahl <= 1}
                className="w-8 h-8 rounded-full border border-sage-300 text-charcoal-700 hover:bg-sage-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
              >
                −
              </button>
              <span className="w-8 text-center text-lg font-semibold text-charcoal-800">
                {cancelAnzahl}
              </span>
              <button
                type="button"
                onClick={() =>
                  setCancelAnzahl((n) =>
                    Math.min(cancelTarget?.anzahl_teilnehmer ?? 1, n + 1),
                  )
                }
                disabled={cancelAnzahl >= (cancelTarget?.anzahl_teilnehmer ?? 1)}
                className="w-8 h-8 rounded-full border border-sage-300 text-charcoal-700 hover:bg-sage-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold"
              >
                +
              </button>
              <span className="text-xs text-charcoal-500">
                von {cancelTarget?.anzahl_teilnehmer} Plätzen
              </span>
            </div>
            {cancelAnzahl === cancelTarget?.anzahl_teilnehmer ? (
              <p className="text-xs text-red-600">
                Gesamte Anmeldung wird storniert.
              </p>
            ) : (
              <p className="text-xs text-charcoal-500">
                Verbleibend nach Stornierung:{" "}
                <strong>
                  {(cancelTarget?.anzahl_teilnehmer ?? 0) - cancelAnzahl} Platz/Plätze
                </strong>
              </p>
            )}
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setCancelTarget(null)}>
              Abbrechen
            </Button>
            <Button
              variant="default"
              onClick={confirmCancel}
              disabled={cancelling}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {cancelling
                ? "Wird storniert…"
                : cancelAnzahl === cancelTarget?.anzahl_teilnehmer
                  ? "Alle stornieren"
                  : `${cancelAnzahl} stornieren`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
