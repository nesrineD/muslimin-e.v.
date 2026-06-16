"use client";

import { useState, useMemo } from "react";
import type { EventRegistration, CapacityInfo } from "@/types/aschura";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StatsBar } from "@/components/aschura/admin/StatsBar";
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

function registrationLabel(r: EventRegistration): string {
  const guests = r.guests ?? [];
  if (guests.length === 0) return r.email;
  if (guests.length === 1) return `${guests[0].vorname} ${guests[0].nachname}`;
  return `${guests[0].vorname} ${guests[0].nachname} (+${guests.length - 1} weitere)`;
}

export function RegistrationTable({ initialRegistrations, capacity }: Props) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [search, setSearch] = useState("");
  const [cancelTarget, setCancelTarget] = useState<EventRegistration | null>(null);
  const [cancelling, setCancelling] = useState(false);

  const checkedIn = useMemo(
    () =>
      registrations
        .filter((r) => r.status === "active")
        .flatMap((r) => r.guests ?? [])
        .filter((g) => g.checked_in).length,
    [registrations],
  );

  const filtered = registrations.filter((r) => {
    const q = search.toLowerCase();
    const guestNames = (r.guests ?? [])
      .map((g) => `${g.vorname} ${g.nachname}`)
      .join(" ");
    return (
      guestNames.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q)
    );
  });

  async function confirmCancel() {
    if (!cancelTarget) return;
    setCancelling(true);
    const res = await fetch(
      `/api/events/aschura/registrations/${cancelTarget.id}/cancel`,
      { method: "PATCH" },
    );
    setCancelling(false);
    if (res.ok) {
      setRegistrations((prev) =>
        prev.map((r) =>
          r.id === cancelTarget.id ? { ...r, status: "cancelled" as const } : r,
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
              <th className="px-4 py-3 text-left">Gäste</th>
              <th className="px-4 py-3 text-left">E-Mail</th>
              <th className="px-4 py-3 text-center">Anz.</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sage-100">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-charcoal-400">
                  Keine Ergebnisse.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr key={r.id} className={r.status === "cancelled" ? "opacity-50" : ""}>
                <td className="px-4 py-3 font-medium text-charcoal-800">
                  {registrationLabel(r)}
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
                  {r.status === "active" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCancelTarget(r)}
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

      <Dialog open={!!cancelTarget} onOpenChange={() => setCancelTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Anmeldung stornieren</DialogTitle>
            <DialogDescription>
              Anmeldung von <strong>{cancelTarget?.email}</strong> mit{" "}
              <strong>{cancelTarget?.anzahl_teilnehmer} Gast/Gäste</strong>{" "}
              vollständig stornieren?
            </DialogDescription>
          </DialogHeader>
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
              {cancelling ? "Wird storniert…" : "Stornieren"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
