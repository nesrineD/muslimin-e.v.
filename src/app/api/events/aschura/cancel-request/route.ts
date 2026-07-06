import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { cancelRequestSchema } from "@/lib/validations/aschura";
import { sendCancellationRequestEmail } from "@/lib/email/brevo";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";

const EVENT_ID = "ashura-2026";
const NEUTRAL_MESSAGE =
  "Falls eine Anmeldung mit dieser E-Mail-Adresse vorliegt, erhalten Sie in Kürze eine E-Mail.";
const neutralResponse = () => NextResponse.json({ message: NEUTRAL_MESSAGE });

export async function POST(request: NextRequest) {
  // 5 cancel-link requests per IP per hour
  if (!checkRateLimit(`cancel-request:${getClientIp(request.headers)}`, 5, 60 * 60_000)) {
    return NextResponse.json({ message: NEUTRAL_MESSAGE }, { status: 429 });
  }

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

  const email = parsed.data.email.trim().toLowerCase();

  const { data: registration, error: lookupError } = await getSupabaseServer()
    .from("event_registrations")
    .select("id, cancellation_token, token_used, token_expires_at, event_guests(vorname)")
    .eq("event_id", EVENT_ID)
    .ilike("email", email)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (lookupError) {
    console.error("[cancel-request] Registration lookup failed:", lookupError.message);
    return neutralResponse();
  }

  if (!registration) return neutralResponse();

  const vorname =
    (registration.event_guests as Array<{ vorname: string }>)?.[0]?.vorname ??
    "liebe Besucherin";

  // L3: reuse the existing token if it is still valid and unused
  const tokenStillValid =
    !registration.token_used &&
    new Date(registration.token_expires_at) > new Date();

  let activeToken: string;

  if (tokenStillValid) {
    activeToken = registration.cancellation_token;
  } else {
    // L2: re-issued tokens expire after 72 hours (not 15 days)
    const tokenExpiresAt = new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000,
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

    if (!updated) return neutralResponse();
    activeToken = updated.cancellation_token;
  }

  try {
    await sendCancellationRequestEmail({
      to: email,
      vorname,
      token: activeToken,
    });
  } catch (error) {
    console.error(
      "[Brevo] Stornierungslink-E-Mail konnte nicht gesendet werden:",
      error instanceof Error ? error.message : "Unbekannter Fehler",
    );
  }

  return neutralResponse();
}
