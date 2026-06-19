import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { sendCancellationConfirmationEmail } from "@/lib/email/brevo";
import { isAschuraAdmin } from "@/lib/auth/roles";

const EVENT_ID = "ashura-2026";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAschuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(id)) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  const supabase = getSupabaseServer();

  const { data: registration, error: fetchError } = await supabase
    .from("event_registrations")
    .select("email, status, event_guests(id, vorname, nachname)")
    .eq("id", id)
    .eq("event_id", EVENT_ID)
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

  const guests = registration.event_guests as Array<{ id: string; vorname: string; nachname: string }>;

  // Use cancel_guests RPC so event_guests rows are deleted alongside the
  // registration status update — a direct UPDATE leaves guests orphaned.
  const { error: rpcError } = await supabase.rpc("cancel_guests", {
    p_registration_id: id,
    p_guest_ids: guests.map((g) => g.id),
  });

  if (rpcError) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  try {
    await sendCancellationConfirmationEmail({
      to: registration.email,
      cancelledGuests: guests,
      remainingGuests: [],
    });
  } catch (err) {
    console.error("Stornierungsmail fehlgeschlagen:", err);
  }

  return NextResponse.json({ success: true, isFullCancel: true });
}
