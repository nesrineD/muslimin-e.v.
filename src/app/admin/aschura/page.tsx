import { redirect } from "next/navigation";
import { RegistrationTable } from "@/components/aschura/admin/RegistrationTable";
import { GuestList } from "@/components/aschura/admin/GuestList";
import { flattenGuests } from "@/lib/utils/aschura";
import { isAschuraAdmin } from "@/lib/auth/roles";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { EventRegistration, CapacityInfo } from "@/types/aschura";

const EVENT_ID = "ashura-2026";
const CAPACITY = parseInt(process.env.EVENT_ASCHURA_CAPACITY ?? "250", 10);

async function getData() {
  if (!(await isAschuraAdmin())) redirect("/login");

  const supabase = getSupabaseServer();

  const [regResult, capResult, guestResult] = await Promise.all([
    supabase
      .from("event_registrations")
      .select(
        "id, event_id, email, anzahl_teilnehmer, status, checked_in, cancellation_token, token_expires_at, token_used, created_at, event_guests(id, vorname, nachname, checked_in)",
      )
      .eq("event_id", EVENT_ID)
      .order("created_at", { ascending: false }),
    supabase
      .from("event_registrations")
      .select("anzahl_teilnehmer")
      .eq("event_id", EVENT_ID)
      .eq("status", "active"),
    supabase
      .from("event_guests")
      .select(
        "id, vorname, nachname, checked_in, event_registrations!inner(email, event_id, status)",
      )
      .eq("event_registrations.event_id", EVENT_ID)
      .eq("event_registrations.status", "active")
      .order("vorname", { ascending: true }),
  ]);

  if (regResult.error || capResult.error) {
    throw new Error("Datenbankfehler beim Laden der Anmeldungen.");
  }

  const registered = (capResult.data ?? []).reduce(
    (sum, row) => sum + row.anzahl_teilnehmer,
    0,
  );

  const capacity: CapacityInfo = {
    total_capacity: CAPACITY,
    registered,
    available: Math.max(0, CAPACITY - registered),
    is_full: registered >= CAPACITY,
  };

  return {
    registrations: regResult.data as EventRegistration[],
    capacity,
    guestRows: guestResult.data ?? [],
  };
}

export default async function AschuraAdminPage() {
  const { registrations, capacity, guestRows } = await getData();
  const guests = flattenGuests(
    guestRows as Parameters<typeof flattenGuests>[0],
  );

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Header Band */}
      <div className="bg-charcoal-900 border-b border-charcoal-700">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-charcoal-400 mb-1">
            Admin · Muslimin e.V.
          </p>
          <h1 className="text-2xl font-bold text-cream-50">
            Aschura-Veranstaltung 2026
          </h1>
          <p className="text-charcoal-400 text-sm mt-1">
            Gästeliste und Check-in-Verwaltung
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-charcoal-200">
            <div className="w-1 h-5 rounded-full bg-charcoal-800" />
            <h2 className="text-base font-bold text-charcoal-800 uppercase tracking-wide">
              Anmeldungsübersicht
            </h2>
          </div>
          <RegistrationTable
            initialRegistrations={registrations}
            capacity={capacity}
          />
        </section>

        <section>
          <div className="flex items-center gap-3 mb-2 pb-3 border-b border-charcoal-200">
            <div className="w-1 h-5 rounded-full bg-sage-600" />
            <h2 className="text-base font-bold text-charcoal-800 uppercase tracking-wide">
              Gesamtgästeliste
            </h2>
          </div>
          <p className="text-charcoal-400 text-xs mb-5">
            Eine Zeile pro Gast · Check-in pro Person · sortiert nach Nachname A–Z
          </p>
          <GuestList initialGuests={guests} />
        </section>
      </div>
    </main>
  );
}
