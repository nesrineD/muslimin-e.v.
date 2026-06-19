"use client";

import { useState } from "react";
import type { EventRegistration } from "@/types/aschura";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  registrations: EventRegistration[];
  onCancelled: (id: string) => void;
}

function MainGuest({ r }: { r: EventRegistration }) {
  const guests = r.guests ?? [];
  if (guests.length === 0) return <span className="text-charcoal-400">{r.email}</span>;
  const main = guests[0];
  return (
    <span className="flex items-center gap-2">
      <span>{main.nachname}, {main.vorname}</span>
      {guests.length > 1 && (
        <span className="inline-flex items-center rounded-full bg-sand-200 px-2 py-0.5 text-xs font-medium text-charcoal-600">
          +{guests.length - 1}
        </span>
      )}
    </span>
  );
}

export function RegistrationTable({ registrations, onCancelled }: Props) {
  const [search, setSearch] = useState("");
  const [cancelTarget, setCancelTarget] = useState<EventRegistration | null>(null);
  const [cancelling, setCancelling] = useState(false);

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
      onCancelled(cancelTarget.id);
    }
    setCancelTarget(null);
  }

  return (
    <>
      <Input
        placeholder="Nach Name oder E-Mail suchen…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm bg-white border-charcoal-200 focus:border-charcoal-500"
      />

      <div className="overflow-x-auto rounded-xl border border-charcoal-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-800 text-cream-50 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Gäste</th>
              <th className="px-4 py-3 text-left font-semibold">E-Mail</th>
              <th className="px-4 py-3 text-center font-semibold">Anz.</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200 bg-white">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-charcoal-400">
                  Keine Ergebnisse.
                </td>
              </tr>
            )}
            {filtered.map((r) => (
              <tr
                key={r.id}
                className={`transition-colors hover:bg-sand-50 ${
                  r.status === "cancelled" ? "opacity-40" : ""
                }`}
              >
                <td className="px-4 py-3 font-semibold text-charcoal-800">
                  <MainGuest r={r} />
                </td>
                <td className="px-4 py-3 text-charcoal-500 text-xs">{r.email}</td>
                <td className="px-4 py-3 text-center font-medium text-charcoal-700">
                  {r.anzahl_teilnehmer}
                </td>
                <td className="px-4 py-3 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      r.status === "active"
                        ? "bg-sage-100 text-sage-800"
                        : "bg-clay-100 text-clay-700"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      r.status === "active" ? "bg-sage-500" : "bg-clay-500"
                    }`} />
                    {r.status === "active" ? "Aktiv" : "Storniert"}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  {r.status === "active" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setCancelTarget(r)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 text-xs font-medium"
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
