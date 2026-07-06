import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/validations/aschura";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";

const EVENT_ID = "ashura-2026";

export async function POST(request: NextRequest) {
  if (!checkRateLimit(`waitlist:${getClientIp(request.headers)}`, 3, 10 * 60_000)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validierungsfehler." }, { status: 400 });
  }

  const { email, guests } = parsed.data;

  const { data: existing } = await getSupabaseServer()
    .from("event_waitlist")
    .select("id")
    .eq("event_id", EVENT_ID)
    .eq("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "Diese E-Mail-Adresse ist bereits auf der Warteliste." },
      { status: 409 },
    );
  }

  const { error } = await getSupabaseServer()
    .from("event_waitlist")
    .insert({
      event_id: EVENT_ID,
      email,
      anzahl_teilnehmer: guests.length,
      guests,
      datenschutz_accepted_at: new Date().toISOString(),
    });

  if (error) {
    console.error("[waitlist] Supabase insert error:", error);
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
