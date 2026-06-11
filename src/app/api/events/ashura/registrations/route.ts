import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAshuraAdmin } from "@/lib/auth/roles";

const EVENT_ID = "ashura-2026";

export async function GET(request: NextRequest) {
  if (!(await isAshuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { data, error } = await getSupabaseServer()
    .from("event_registrations")
    .select(
      "id, vorname, nachname, email, anzahl_teilnehmer, status, checked_in, created_at",
    )
    .eq("event_id", EVENT_ID)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  return NextResponse.json({ registrations: data });
}
