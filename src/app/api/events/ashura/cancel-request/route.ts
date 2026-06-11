import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { cancelRequestSchema } from "@/lib/validations/ashura";
import { sendCancellationRequestEmail } from "@/lib/email/brevo";

const EVENT_ID = "ashura-2026";
// Neutral response — always returned regardless of whether email was found (DSGVO)
const NEUTRAL_RESPONSE = NextResponse.json({
  message:
    "Falls eine Anmeldung mit dieser E-Mail-Adresse vorliegt, erhalten Sie in Kürze eine E-Mail.",
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = cancelRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 },
    );
  }

  const { email } = parsed.data;

  // Look up active registration
  const { data: registration } = await getSupabaseServer()
    .from("event_registrations")
    .select("id, vorname, cancellation_token")
    .eq("event_id", EVENT_ID)
    .eq("email", email)
    .eq("status", "active")
    .single();

  if (!registration) {
    // Return neutral response — do not leak whether email exists
    return NEUTRAL_RESPONSE;
  }

  // Generate a fresh token valid for 14 days
  const tokenExpiresAt = new Date(
    Date.now() + 15 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data: updated } = await getSupabaseServer()
    .from("event_registrations")
    .update({
      token_used: false,
      token_expires_at: tokenExpiresAt,
      // cancellation_token is auto-generated UUID — reset by generating a new one here
      // Supabase doesn't have gen_random_uuid() client-side, so we use crypto
      cancellation_token: crypto.randomUUID(),
    })
    .eq("id", registration.id)
    .select("cancellation_token")
    .single();

  if (!updated) {
    return NEUTRAL_RESPONSE;
  }

  try {
    await sendCancellationRequestEmail({
      to: email,
      vorname: registration.vorname,
      token: updated.cancellation_token,
    });
  } catch {
    console.error(
      "[Brevo] Stornierungslink-E-Mail konnte nicht gesendet werden.",
    );
  }

  return NEUTRAL_RESPONSE;
}
