import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { cancelRequestSchema } from "@/lib/validations/aschura";
import { sendCancellationRequestEmail } from "@/lib/email/brevo";

const EVENT_ID = "ashura-2026";
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

  const { data: registration } = await getSupabaseServer()
    .from("event_registrations")
    .select("id, cancellation_token, event_guests(vorname)")
    .eq("event_id", EVENT_ID)
    .eq("email", email)
    .eq("status", "active")
    .single();

  if (!registration) return NEUTRAL_RESPONSE;

  const vorname =
    (registration.event_guests as Array<{ vorname: string }>)?.[0]?.vorname ??
    "liebe Besucherin";

  const tokenExpiresAt = new Date(
    Date.now() + 15 * 24 * 60 * 60 * 1000,
  ).toISOString();

  const { data: updated } = await getSupabaseServer()
    .from("event_registrations")
    .update({
      token_used: false,
      token_expires_at: tokenExpiresAt,
      cancellation_token: crypto.randomUUID(),
    })
    .eq("id", registration.id)
    .select("cancellation_token")
    .single();

  if (!updated) return NEUTRAL_RESPONSE;

  try {
    await sendCancellationRequestEmail({
      to: email,
      vorname,
      token: updated.cancellation_token,
    });
  } catch {
    console.error("[Brevo] Stornierungslink-E-Mail konnte nicht gesendet werden.");
  }

  return NEUTRAL_RESPONSE;
}
