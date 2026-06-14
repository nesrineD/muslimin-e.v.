import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAschuraAdmin } from "@/lib/auth/roles";

const EVENT_ID = "ashura-2026";

export async function GET(request: NextRequest) {
  if (!(await isAschuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const view = request.nextUrl.searchParams.get("view");

  if (view === "guests") {
    // Flat guest list: one row per guest, sorted by vorname A–Z
    const { data, error } = await getSupabaseServer()
      .from("event_guests")
      .select(
        "id, vorname, nachname, checked_in, event_registrations!inner(id, email, status, event_id)",
      )
      .eq("event_registrations.event_id", EVENT_ID)
      .eq("event_registrations.status", "active")
      .order("vorname", { ascending: true });

    if (error) {
      return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
    }

    return NextResponse.json({ guests: data });
  }

  // Default: registrations with their guests
  const { data, error } = await getSupabaseServer()
    .from("event_registrations")
    .select(
      "id, email, anzahl_teilnehmer, status, checked_in, created_at, event_guests(id, vorname, nachname, checked_in)",
    )
    .eq("event_id", EVENT_ID)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  return NextResponse.json({ registrations: data });
}
