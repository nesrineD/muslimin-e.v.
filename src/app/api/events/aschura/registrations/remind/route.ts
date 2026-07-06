import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { sendReminderEmail } from "@/lib/email/brevo";
import { isAschuraAdmin } from "@/lib/auth/roles";

const EVENT_ID = "ashura-2026";
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface RegistrationRow {
  id: string;
  email: string;
  cancellation_token: string;
  event_guests: Array<{ vorname: string; nachname: string }>;
}

export async function POST(request: NextRequest) {
  if (!(await isAschuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  let body: { registrationIds?: unknown; all?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const all = body.all === true;
  const ids = Array.isArray(body.registrationIds) ? body.registrationIds : [];
  if (!all && (ids.length === 0 || !ids.every((id) => typeof id === "string" && UUID_RE.test(id)))) {
    return NextResponse.json(
      { error: "Keine gültigen Anmeldungen ausgewählt." },
      { status: 400 },
    );
  }

  const supabase = getSupabaseServer();

  let query = supabase
    .from("event_registrations")
    .select("id, email, cancellation_token, event_guests(vorname, nachname)")
    .eq("event_id", EVENT_ID)
    .eq("status", "active");
  if (!all) {
    query = query.in("id", ids as string[]);
  }

  const { data, error } = await query;
  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  const registrations = (data ?? []) as RegistrationRow[];
  if (registrations.length === 0) {
    return NextResponse.json(
      { error: "Keine aktiven Anmeldungen gefunden." },
      { status: 404 },
    );
  }

  // Send in small batches — one email per registration (each has its own guest
  // list and cancellation link). Failures are collected, not fatal.
  const sentIds: string[] = [];
  const failedEmails: string[] = [];
  const BATCH_SIZE = 10;

  for (let i = 0; i < registrations.length; i += BATCH_SIZE) {
    const batch = registrations.slice(i, i + BATCH_SIZE);
    const results = await Promise.allSettled(
      batch.map(async (r) => {
        await sendReminderEmail({
          to: r.email,
          vorname: r.event_guests[0]?.vorname ?? "Schwester",
          guests: r.event_guests,
          cancellationToken: r.cancellation_token,
        });
        return r;
      }),
    );

    results.forEach((result, idx) => {
      const r = batch[idx];
      if (result.status === "fulfilled") {
        sentIds.push(r.id);
      } else {
        console.error(
          `[remind] Erinnerung an ${r.email} fehlgeschlagen:`,
          result.reason,
        );
        failedEmails.push(r.email);
      }
    });
  }

  const reminderSentAt = new Date().toISOString();
  if (sentIds.length > 0) {
    const { error: updateError } = await supabase
      .from("event_registrations")
      .update({ reminder_sent_at: reminderSentAt })
      .in("id", sentIds);
    if (updateError) {
      console.error("[remind] reminder_sent_at nicht gespeichert:", updateError);
    }
  }

  return NextResponse.json({
    sent: sentIds.length,
    sentIds,
    reminderSentAt,
    failed: failedEmails.length,
    failedEmails,
  });
}
