import { redirect } from "next/navigation";
import { RegistrationTable } from "@/components/ashura/admin/RegistrationTable";
import { isAshuraAdmin } from "@/lib/auth/roles";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { EventRegistration, CapacityInfo } from "@/types/ashura";

const EVENT_ID = "ashura-2026";
const CAPACITY = parseInt(process.env.EVENT_ASHURA_CAPACITY ?? "250", 10);

async function getData(): Promise<{
  registrations: EventRegistration[];
  capacity: CapacityInfo;
}> {
  if (!(await isAshuraAdmin())) redirect("/login");

  const supabase = getSupabaseServer();

  const [regResult, capResult] = await Promise.all([
    supabase
      .from("event_registrations")
      .select(
        "id, vorname, nachname, email, anzahl_teilnehmer, status, checked_in, created_at",
      )
      .eq("event_id", EVENT_ID)
      .order("created_at", { ascending: false }),
    supabase
      .from("event_registrations")
      .select("anzahl_teilnehmer")
      .eq("event_id", EVENT_ID)
      .eq("status", "active"),
  ]);

  if (regResult.error || capResult.error) {
    console.error("Admin page DB error:", {
      regErr: regResult.error,
      capErr: capResult.error,
    });
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

  return { registrations: regResult.data as EventRegistration[], capacity };
}

export default async function AshuraAdminPage() {
  const { registrations, capacity } = await getData();

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-charcoal-800">
            Admin — Aschura-Veranstaltung 2026
          </h1>
          <p className="text-charcoal-500 text-sm mt-1">
            Gästeliste und Check-in-Verwaltung
          </p>
        </div>

        <RegistrationTable
          initialRegistrations={registrations}
          capacity={capacity}
        />
      </div>
    </main>
  );
}
