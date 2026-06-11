import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { registrationSchema } from "@/lib/validations/ashura";
import { sendConfirmationEmail } from "@/lib/email/brevo";

const EVENT_ID = "ashura-2026";
const CAPACITY = parseInt(process.env.EVENT_ASHURA_CAPACITY ?? "250", 10);

export async function POST(request: NextRequest) {
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

  const { vorname, nachname, email, anzahl_teilnehmer } = parsed.data;

  // Atomic capacity check + insert via RPC
  const { data, error } = await getSupabaseServer().rpc("register_for_event", {
    p_event_id: EVENT_ID,
    p_vorname: vorname,
    p_nachname: nachname,
    p_email: email,
    p_anzahl_teilnehmer: anzahl_teilnehmer,
    p_capacity: CAPACITY,
  });

  if (error) {
    if (error.message.includes("CAPACITY_EXCEEDED")) {
      return NextResponse.json(
        { error: "Leider sind alle Plätze bereits vergeben." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  const registration = data as { id: string; cancellation_token: string };

  // Send confirmation email (non-blocking — registration is already saved)
  try {
    await sendConfirmationEmail({
      to: email,
      vorname,
      anzahl: anzahl_teilnehmer,
      cancellationToken: registration.cancellation_token,
    });
  } catch {
    // E-mail failure does not roll back registration
    console.error("[Brevo] Bestätigungs-E-Mail konnte nicht gesendet werden.");
  }

  return NextResponse.json(
    { success: true, id: registration.id },
    { status: 201 },
  );
}
