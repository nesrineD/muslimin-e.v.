import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

const EVENT_ID = "ashura-2026";
const CAPACITY = parseInt(process.env.EVENT_ASCHURA_CAPACITY ?? "250", 10);

export async function GET() {
  try {
    const { data, error } = await getSupabaseServer()
      .from("event_registrations")
      .select("anzahl_teilnehmer")
      .eq("event_id", EVENT_ID)
      .eq("status", "active");

    if (error) {
      return NextResponse.json({ error: "Datenbankfehler" }, { status: 500 });
    }

    const registered = (data ?? []).reduce(
      (sum, row) => sum + row.anzahl_teilnehmer,
      0,
    );

    return NextResponse.json({
      total_capacity: CAPACITY,
      registered,
      available: Math.max(0, CAPACITY - registered),
      is_full: registered >= CAPACITY,
    });
  } catch (err) {
    console.error("Capacity route error:", err);
    return NextResponse.json(
      { error: "Serverkonfigurationsfehler. Bitte Umgebungsvariablen prüfen." },
      { status: 500 },
    );
  }
}
