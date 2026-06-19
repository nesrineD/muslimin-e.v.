import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/aschura/admin/AdminDashboard";
import { flattenGuests } from "@/lib/utils/aschura";
import { isAschuraAdmin } from "@/lib/auth/roles";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { EventRegistration } from "@/types/aschura";

const EVENT_ID = "ashura-2026";
const CAPACITY = parseInt(process.env.EVENT_ASCHURA_CAPACITY ?? "250", 10);

async function getData() {
  if (!(await isAschuraAdmin())) redirect("/login");

  const supabase = getSupabaseServer();

  const [regResult, guestResult] = await Promise.all([
    supabase
      .from("event_registrations")
      .select(
        "id, event_id, email, anzahl_teilnehmer, status, checked_in, cancellation_token, token_expires_at, token_used, created_at, event_guests(id, vorname, nachname, checked_in)",
      )
      .eq("event_id", EVENT_ID)
      .order("created_at", { ascending: false }),
    supabase
      .from("event_guests")
      .select(
        "id, registration_id, vorname, nachname, checked_in, event_registrations!inner(email, event_id, status)",
      )
      .eq("event_registrations.event_id", EVENT_ID)
      .eq("event_registrations.status", "active")
      .order("vorname", { ascending: true }),
  ]);

  if (regResult.error || guestResult.error) {
    throw new Error("Datenbankfehler beim Laden der Anmeldungen.");
  }

  const registrations = (regResult.data ?? []).map((r) => {
    const { event_guests, ...rest } = r as typeof r & { event_guests: unknown };
    return { ...rest, guests: event_guests } as EventRegistration;
  });

  return {
    registrations,
    guestRows: guestResult.data ?? [],
  };
}

export default async function AschuraAdminPage() {
  const { registrations, guestRows } = await getData();
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
        <AdminDashboard
          initialRegistrations={registrations}
          initialGuests={guests}
          totalCapacity={CAPACITY}
        />
      </div>
    </main>
  );
}
