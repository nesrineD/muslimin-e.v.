import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { registrationSchema } from "@/lib/validations/aschura";
import { sendConfirmationEmail } from "@/lib/email/brevo";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";

const EVENT_ID = "ashura-2026";
const CAPACITY = parseInt(process.env.EVENT_ASCHURA_CAPACITY ?? "250", 10);

export async function POST(request: NextRequest) {
  // 3 registrations per IP per 10 minutes
  if (!checkRateLimit(`register:${getClientIp(request.headers)}`, 3, 10 * 60_000)) {
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

  const parsed = registrationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validierungsfehler.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { email, guests } = parsed.data;

  const { data, error } = await getSupabaseServer().rpc("register_for_event", {
    p_event_id: EVENT_ID,
    p_email: email,
    p_guests: guests,
    p_capacity: CAPACITY,
  });

  if (error) {
    console.error("[register] Supabase RPC error:", error);
    if (error.message.includes("CAPACITY_EXCEEDED")) {
      return NextResponse.json(
        { error: "Leider sind alle Plätze bereits vergeben." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  const registration = (data as Array<{ registration_id: string; cancellation_token: string }>)?.[0];
  if (!registration) {
    console.error("[register] RPC returned empty result for event:", EVENT_ID);
    return NextResponse.json({ error: "Registrierungsfehler." }, { status: 500 });
  }

  // L1: record GDPR consent timestamp for audit trail
  await getSupabaseServer()
    .from("event_registrations")
    .update({ datenschutz_accepted_at: new Date().toISOString() })
    .eq("id", registration.registration_id);

  try {
    await sendConfirmationEmail({
      to: email,
      vorname: guests[0].vorname,
      guests,
      cancellationToken: registration.cancellation_token,
    });
  } catch {
    console.error("[Brevo] Bestätigungs-E-Mail konnte nicht gesendet werden.");
  }

  return NextResponse.json(
    { success: true, id: registration.registration_id },
    { status: 201 },
  );
}
