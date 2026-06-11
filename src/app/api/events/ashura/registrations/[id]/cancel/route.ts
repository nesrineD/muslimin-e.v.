import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { sendCancellationConfirmationEmail } from "@/lib/email/brevo";
import { isAshuraAdmin } from "@/lib/auth/roles";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAshuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;

  // Optional body: { anzahl: number } — how many to cancel.
  // Defaults to full cancellation if not provided.
  let anzahlToCancel: number | null = null;
  try {
    const body = await request.json();
    if (typeof body?.anzahl === "number" && body.anzahl > 0) {
      anzahlToCancel = body.anzahl;
    }
  } catch {
    // No body or non-JSON — treat as full cancellation
  }

  const supabase = getSupabaseServer();

  // Fetch registration data before cancelling so we can send the email
  const { data: registration, error: fetchError } = await supabase
    .from("event_registrations")
    .select("email, vorname, status, anzahl_teilnehmer")
    .eq("id", id)
    .single();

  if (fetchError || !registration) {
    return NextResponse.json(
      { error: "Anmeldung nicht gefunden." },
      { status: 404 },
    );
  }

  if (registration.status === "cancelled") {
    return NextResponse.json({ error: "Bereits storniert." }, { status: 409 });
  }

  const currentAnzahl: number = registration.anzahl_teilnehmer;
  const toCancel = anzahlToCancel ?? currentAnzahl;

  if (toCancel > currentAnzahl) {
    return NextResponse.json(
      { error: "Anzahl überschreitet die gebuchten Plätze." },
      { status: 400 },
    );
  }

  const newAnzahl = currentAnzahl - toCancel;
  const isFullCancel = newAnzahl === 0;

  const updatePayload = isFullCancel
    ? { status: "cancelled" as const }
    : { anzahl_teilnehmer: newAnzahl };

  const { error } = await supabase
    .from("event_registrations")
    .update(updatePayload)
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  // Send confirmation email (fire-and-forget)
  sendCancellationConfirmationEmail({
    to: registration.email,
    vorname: registration.vorname,
    action: isFullCancel ? "full" : "reduce",
    neue_anzahl: isFullCancel ? undefined : newAnzahl,
  }).catch((err) => console.error("Stornierungsmail fehlgeschlagen:", err));

  return NextResponse.json({
    success: true,
    isFullCancel,
    new_anzahl: newAnzahl,
  });
}
