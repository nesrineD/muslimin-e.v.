"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { StatsBar } from "@/components/aschura/admin/StatsBar";
import type { Guest, CapacityInfo } from "@/types/aschura";

interface GuestRow extends Guest {
  registration_email: string;
}

interface Props {
  guests: GuestRow[];
  capacity: CapacityInfo;
  checkedIn: number;
  onGuestCancelled: (id: string) => void;
  onCheckinToggled: (id: string, checked_in: boolean) => void;
}

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function exportToPdf(guests: GuestRow[]) {
  const rows = guests
    .map(
      (g, i) => `
      <tr class="${i % 2 === 0 ? "even" : ""}">
        <td>${i + 1}</td>
        <td>${escHtml(g.nachname)}</td>
        <td>${escHtml(g.vorname)}</td>
        <td>${escHtml(g.registration_email)}</td>
        <td>${g.checked_in ? "✓" : ""}</td>
      </tr>`,
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <title>Gästeliste — Aschura 2026</title>
  <style>
    body { font-family: Arial, sans-serif; font-size: 11px; color: #1a1a1a; margin: 24px; }
    h1 { font-size: 16px; margin-bottom: 4px; }
    p.subtitle { color: #666; font-size: 10px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; }
    th { background: #f4f0ea; text-align: left; padding: 6px 8px; font-size: 9px; text-transform: uppercase; letter-spacing: .05em; border-bottom: 2px solid #ccc; }
    td { padding: 5px 8px; border-bottom: 1px solid #e8e8e8; vertical-align: middle; }
    tr.even td { background: #fafaf8; }
    td:first-child { color: #888; width: 32px; }
    td:last-child { text-align: center; color: #4a7c59; font-weight: bold; }
    @media print { body { margin: 12mm; } }
  </style>
  <script>window.onload = function() { window.print(); }</script>
</head>
<body>
  <h1>Gästeliste — Aschura-Veranstaltung 2026</h1>
  <p class="subtitle">Exportiert am ${new Date().toLocaleDateString("de-DE", { day: "2-digit", month: "long", year: "numeric" })} · ${guests.length} Gäste</p>
  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Nachname</th>
        <th>Vorname</th>
        <th>E-Mail Anmeldung</th>
        <th>Check-in</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank", "width=900,height=700");
  if (win) win.addEventListener("load", () => URL.revokeObjectURL(url));
}

export function GuestList({ guests, capacity, checkedIn, onGuestCancelled, onCheckinToggled }: Props) {
  const [search, setSearch] = useState("");
  const [toggling, setToggling] = useState<string | null>(null);
  const [confirmCancelId, setConfirmCancelId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const base = search.trim()
      ? guests.filter((g) => {
          const q = search.toLowerCase();
          return (
            g.vorname.toLowerCase().includes(q) ||
            g.nachname.toLowerCase().includes(q)
          );
        })
      : guests;
    return [...base].sort(
      (a, b) =>
        a.nachname.localeCompare(b.nachname, "de") ||
        a.vorname.localeCompare(b.vorname, "de"),
    );
  }, [guests, search]);

  async function cancelGuest(id: string) {
    setCancelling(id);
    const res = await fetch(`/api/events/aschura/guests/${id}/cancel`, {
      method: "DELETE",
    });
    setCancelling(null);
    setConfirmCancelId(null);
    if (!res.ok) return;
    onGuestCancelled(id);
  }

  async function toggleCheckin(guest: GuestRow) {
    setToggling(guest.id);
    const res = await fetch(`/api/events/aschura/guests/${guest.id}/checkin`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ checked_in: !guest.checked_in }),
    });
    setToggling(null);
    if (!res.ok) return;
    const { checked_in } = await res.json();
    onCheckinToggled(guest.id, checked_in);
  }

  return (
    <div className="space-y-6">
      <StatsBar capacity={capacity} checkedIn={checkedIn} />
      <div className="flex items-center justify-between gap-4">
        <Input
          placeholder="Nach Name suchen…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-3 shrink-0">
          <p className="text-sm text-charcoal-500">
            {filtered.length} von {guests.length} Gästen
          </p>
          <button
            onClick={() =>
              exportToPdf(
                [...guests].sort(
                  (a, b) =>
                    a.nachname.localeCompare(b.nachname, "de") ||
                    a.vorname.localeCompare(b.vorname, "de"),
                ),
              )
            }
            className="flex items-center gap-1.5 rounded-lg border border-sage-300 bg-white px-3 py-1.5 text-sm font-medium text-sage-700 shadow-sm transition-colors hover:bg-sage-50"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17a4 4 0 004 4h10a4 4 0 004-4V7a4 4 0 00-4-4H9L3 9v8z" />
            </svg>
            PDF exportieren
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-charcoal-200 shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-charcoal-800 text-cream-50 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Nachname</th>
              <th className="px-4 py-3 text-left font-semibold">Vorname</th>
              <th className="px-4 py-3 text-left font-semibold">E-Mail Anmeldung</th>
              <th className="px-4 py-3 text-center font-semibold">Check-in</th>
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
            {filtered.map((g) => (
              <tr
                key={g.id}
                className={`transition-colors ${
                  g.checked_in
                    ? "bg-sage-50 hover:bg-sage-100/60"
                    : "hover:bg-sand-50"
                }`}
              >
                <td className="px-4 py-3 font-semibold text-charcoal-800">{g.nachname}</td>
                <td className="px-4 py-3 text-charcoal-700">{g.vorname}</td>
                <td className="px-4 py-3 text-charcoal-400 text-xs">{g.registration_email}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => toggleCheckin(g)}
                    disabled={toggling === g.id}
                    className={`w-9 h-9 rounded-full border-2 transition-all ${
                      g.checked_in
                        ? "bg-sage-600 border-sage-600 shadow-sm"
                        : "border-charcoal-300 hover:border-sage-500 hover:bg-sage-50"
                    } disabled:opacity-40 disabled:cursor-not-allowed`}
                    title={g.checked_in ? "Eingecheckt — klicken zum Rückgängigmachen" : "Einchecken"}
                    aria-label={`Check-in für ${g.vorname} ${g.nachname}`}
                  >
                    {g.checked_in && (
                      <svg className="w-4 h-4 text-white mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  {confirmCancelId === g.id ? (
                    <span className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => cancelGuest(g.id)}
                        disabled={cancelling === g.id}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 disabled:opacity-40"
                      >
                        {cancelling === g.id ? "…" : "Ja"}
                      </button>
                      <span className="text-charcoal-300">|</span>
                      <button
                        onClick={() => setConfirmCancelId(null)}
                        className="text-xs text-charcoal-500 hover:text-charcoal-700"
                      >
                        Nein
                      </button>
                    </span>
                  ) : (
                    <button
                      onClick={() => setConfirmCancelId(g.id)}
                      disabled={cancelling === g.id}
                      className="text-xs font-medium text-red-600 hover:text-red-700 hover:underline disabled:opacity-40"
                      aria-label={`${g.nachname} ${g.vorname} stornieren`}
                    >
                      Stornieren
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
