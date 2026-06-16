import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { sendCancellationConfirmationEmail } from "@/lib/email/brevo";
import { isAschuraAdmin } from "@/lib/auth/roles";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAschuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;
  const supabase = getSupabaseServer();

  const { data: registration, error: fetchError } = await supabase
    .from("event_registrations")
    .select("email, status, event_guests(id, vorname, nachname)")
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

  const { error } = await supabase
    .from("event_registrations")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  const guests = registration.event_guests as Array<{ vorname: string; nachname: string }>;

  sendCancellationConfirmationEmail({
    to: registration.email,
    cancelledGuests: guests,
    remainingGuests: [],
  }).catch((err) => console.error("Stornierungsmail fehlgeschlagen:", err));

  return NextResponse.json({ success: true, isFullCancel: true });
}
