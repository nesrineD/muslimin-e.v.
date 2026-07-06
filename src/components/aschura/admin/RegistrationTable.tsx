"use client";

import { useState } from "react";
import type { EventRegistration } from "@/types/aschura";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  onReminded: (registrationIds: string[], sentAt: string) => void;
}

type RemindResult =
  | { sent: number; failed: number; failedEmails: string[] }
  | { error: string };

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

export function RegistrationTable({ registrations, onCancelled, onReminded }: Props) {
  const [search, setSearch] = useState("");
  const [cancelTarget, setCancelTarget] = useState<EventRegistration | null>(null);
  const [cancelling, setCancelling] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [remindOpen, setRemindOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [remindResult, setRemindResult] = useState<RemindResult | null>(null);

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

  const filteredActive = filtered.filter((r) => r.status === "active");
  const allSelected =
    filteredActive.length > 0 &&
    filteredActive.every((r) => selected.has(r.id));

  // Selection is validated against live data — cancelled rows never count
  const selectedRegistrations = registrations.filter(
    (r) => r.status === "active" && selected.has(r.id),
  );
  const alreadyReminded = selectedRegistrations.filter(
    (r) => r.reminder_sent_at,
  ).length;

  function toggleAll() {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) {
        filteredActive.forEach((r) => next.delete(r.id));
      } else {
        filteredActive.forEach((r) => next.add(r.id));
      }
      return next;
    });
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function sendReminders() {
    const ids = selectedRegistrations.map((r) => r.id);
    if (ids.length === 0) return;
    setSending(true);
    try {
      const res = await fetch("/api/events/aschura/registrations/remind", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationIds: ids }),
      });
      const data: any = await res.json().catch(() => ({}));
      if (!res.ok) {
        setRemindResult({ error: data.error ?? "Fehler beim Senden." });
      } else {
        setRemindResult({
          sent: data.sent,
          failed: data.failed,
          failedEmails: data.failedEmails ?? [],
        });
        if (
          Array.isArray(data.sentIds) &&
          data.sentIds.length > 0 &&
          typeof data.reminderSentAt === "string"
        ) {
          onReminded(data.sentIds, data.reminderSentAt);
        }
        setSelected(new Set());
      }
    } catch {
      setRemindResult({ error: "Netzwerkfehler beim Senden." });
    }
    setSending(false);
    setRemindOpen(false);
  }

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
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Input
          type="search"
          enterKeyHint="search"
          autoComplete="off"
          placeholder="Nach Name oder E-Mail suchen…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:max-w-sm bg-white border-charcoal-200 focus:border-charcoal-500"
        />
        <Button
          onClick={() => setRemindOpen(true)}
          disabled={selectedRegistrations.length === 0}
          className="min-h-[44px] shrink-0 bg-sage-600 text-white hover:bg-sage-700 disabled:bg-charcoal-200 disabled:text-charcoal-400"
        >
          <svg className="mr-1.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Erinnerung senden ({selectedRegistrations.length})
        </Button>
      </div>

      {remindResult && (
        <div
          role="status"
          className={`mb-4 flex items-start justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${
            "error" in remindResult || remindResult.failed > 0
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-sage-200 bg-sage-50 text-sage-800"
          }`}
        >
          <div>
            {"error" in remindResult ? (
              remindResult.error
            ) : (
              <>
                {remindResult.sent} Erinnerung
                {remindResult.sent === 1 ? "" : "en"} gesendet.
                {remindResult.failed > 0 && (
                  <>
                    {" "}
                    {remindResult.failed} fehlgeschlagen:{" "}
                    {remindResult.failedEmails.join(", ")}
                  </>
                )}
              </>
            )}
          </div>
          <button
            onClick={() => setRemindResult(null)}
            className="shrink-0 font-bold opacity-60 hover:opacity-100"
            aria-label="Meldung schließen"
          >
            ✕
          </button>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-charcoal-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-800 text-cream-50 text-xs uppercase tracking-wide">
            <tr>
              <th className="w-10 px-3 py-3 text-center">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Alle angezeigten Anmeldungen auswählen"
                  className="border-cream-50/60 data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600"
                />
              </th>
              <th className="px-4 py-3 text-left font-semibold">Gäste</th>
              <th className="hidden px-4 py-3 text-left font-semibold sm:table-cell">E-Mail</th>
              <th className="px-4 py-3 text-center font-semibold">Anz.</th>
              <th className="px-4 py-3 text-center font-semibold">Status</th>
              <th className="px-4 py-3 text-center font-semibold">Aktion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sand-200 bg-white">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-charcoal-400">
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
                <td className="px-3 py-3 text-center">
                  {r.status === "active" && (
                    <Checkbox
                      checked={selected.has(r.id)}
                      onCheckedChange={() => toggleOne(r.id)}
                      aria-label={`Anmeldung von ${r.email} auswählen`}
                      className="data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600"
                    />
                  )}
                </td>
                <td className="px-4 py-3 font-semibold text-charcoal-800">
                  <MainGuest r={r} />
                </td>
                <td className="hidden px-4 py-3 text-charcoal-500 text-xs sm:table-cell">{r.email}</td>
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
                  {r.reminder_sent_at && (
                    <span className="mt-1 block text-[11px] text-charcoal-400">
                      Erinnert am{" "}
                      {new Date(r.reminder_sent_at).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  )}
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

      <Dialog open={remindOpen} onOpenChange={(open) => !sending && setRemindOpen(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Erinnerungs-E-Mails senden</DialogTitle>
            <DialogDescription>
              Erinnerung an{" "}
              <strong>
                {selectedRegistrations.length} Anmeldung
                {selectedRegistrations.length === 1 ? "" : "en"}
              </strong>{" "}
              senden?
              {alreadyReminded > 0 && (
                <>
                  {" "}
                  <span className="text-clay-700">
                    {alreadyReminded} davon
                    {alreadyReminded === 1 ? " wurde" : " wurden"} bereits
                    erinnert.
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setRemindOpen(false)}
              disabled={sending}
            >
              Abbrechen
            </Button>
            <Button
              onClick={sendReminders}
              disabled={sending}
              className="bg-sage-600 hover:bg-sage-700 text-white"
            >
              {sending ? "Wird gesendet…" : "Jetzt senden"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
