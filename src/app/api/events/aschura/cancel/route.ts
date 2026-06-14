import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { cancelSchema } from "@/lib/validations/ashura";
import { sendCancellationConfirmationEmail } from "@/lib/email/brevo";

// GET /api/events/ashura/cancel?token=<uuid>
// Validates the token and returns the registration data for the confirmation UI.
export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Kein Token angegeben." },
      { status: 400 },
    );
  }

  const { data: registration, error } = await getSupabaseServer()
    .from("event_registrations")
    .select(
      "id, vorname, nachname, anzahl_teilnehmer, email, status, token_used, token_expires_at",
    )
    .eq("cancellation_token", token)
    .single();

  if (error || !registration) {
    return NextResponse.json(
      {
        error:
          "Dieser Link ist nicht mehr gültig. Bitte fordere einen neuen Stornierungslink an.",
      },
      { status: 410 },
    );
  }

  if (
    registration.token_used ||
    registration.status === "cancelled" ||
    new Date(registration.token_expires_at) < new Date()
  ) {
    return NextResponse.json(
      {
        error:
          "Dieser Link ist nicht mehr gültig. Bitte fordere einen neuen Stornierungslink an.",
      },
      { status: 410 },
    );
  }

  return NextResponse.json({
    id: registration.id,
    vorname: registration.vorname,
    nachname: registration.nachname,
    anzahl_teilnehmer: registration.anzahl_teilnehmer,
    email: registration.email,
  });
}

// POST /api/events/ashura/cancel
// Executes the cancellation (full or partial).
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const parsed = cancelSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Anfrage.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { token, action, neue_anzahl } = parsed.data;

  // Re-validate token before mutating
  const { data: registration } = await getSupabaseServer()
    .from("event_registrations")
    .select("id, vorname, email, status, token_used, token_expires_at")
    .eq("cancellation_token", token)
    .single();

  if (
    !registration ||
    registration.token_used ||
    registration.status === "cancelled" ||
    new Date(registration.token_expires_at) < new Date()
  ) {
    return NextResponse.json(
      {
        error:
          "Dieser Link ist nicht mehr gültig. Bitte fordere einen neuen Stornierungslink an.",
      },
      { status: 410 },
    );
  }

  if (action === "reduce") {
    if (!neue_anzahl || neue_anzahl < 1) {
      return NextResponse.json(
        { error: "Bitte gib eine gültige Anzahl an (mindestens 1)." },
        { status: 400 },
      );
    }

    // Token bleibt gültig — Nutzerin kann später nochmals stornieren oder weiter reduzieren
    await getSupabaseServer()
      .from("event_registrations")
      .update({ anzahl_teilnehmer: neue_anzahl })
      .eq("id", registration.id);
  } else {
    // Vollständige Stornierung — Token sperren
    await getSupabaseServer()
      .from("event_registrations")
      .update({ status: "cancelled", token_used: true })
      .eq("id", registration.id);
  }

  try {
    await sendCancellationConfirmationEmail({
      to: registration.email,
      vorname: registration.vorname,
      action,
      neue_anzahl,
    });
  } catch {
    console.error(
      "[Brevo] Stornierungsbestätigung konnte nicht gesendet werden.",
    );
  }

  return NextResponse.json({ success: true });
}
