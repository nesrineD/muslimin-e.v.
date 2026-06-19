import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { cancelSchema } from "@/lib/validations/aschura";
import { sendCancellationConfirmationEmail } from "@/lib/email/brevo";
import { checkRateLimit, getClientIp } from "@/lib/utils/rate-limit";
import type { Guest } from "@/types/aschura";

const INVALID_TOKEN_RESPONSE = NextResponse.json(
  {
    error:
      "Dieser Link ist nicht mehr gültig. Bitte fordere einen neuen Stornierungslink an.",
  },
  { status: 410 },
);

// GET /api/events/aschura/cancel?token=<uuid>
export async function GET(request: NextRequest) {
  // 20 token lookups per IP per 5 minutes
  if (!checkRateLimit(`cancel-get:${getClientIp(request.headers)}`, 20, 5 * 60_000)) {
    return NextResponse.json(
      { error: "Zu viele Anfragen. Bitte versuche es später erneut." },
      { status: 429 },
    );
  }

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
      "id, email, anzahl_teilnehmer, status, token_used, token_expires_at, event_guests(id, vorname, nachname, checked_in)",
    )
    .eq("cancellation_token", token)
    .single();

  if (error || !registration) return INVALID_TOKEN_RESPONSE;

  if (
    registration.token_used ||
    registration.status === "cancelled" ||
    new Date(registration.token_expires_at) < new Date()
  ) {
    return INVALID_TOKEN_RESPONSE;
  }

  return NextResponse.json({
    id: registration.id,
    email: registration.email,
    anzahl_teilnehmer: registration.anzahl_teilnehmer,
    guests: registration.event_guests as Guest[],
  });
}

// POST /api/events/aschura/cancel
export async function POST(request: NextRequest) {
  // 10 cancellation attempts per IP per 5 minutes
  if (!checkRateLimit(`cancel-post:${getClientIp(request.headers)}`, 10, 5 * 60_000)) {
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

  const parsed = cancelSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Ungültige Anfrage.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const { token, action, guest_ids_to_remove } = parsed.data;

  const supabase = getSupabaseServer();

  // Fetch registration and guest list for input validation before claiming the token.
  const { data: registration } = await supabase
    .from("event_registrations")
    .select(
      "id, email, status, token_used, token_expires_at, event_guests(id, vorname, nachname)",
    )
    .eq("cancellation_token", token)
    .single();

  if (
    !registration ||
    registration.token_used ||
    registration.status === "cancelled" ||
    new Date(registration.token_expires_at) < new Date()
  ) {
    return INVALID_TOKEN_RESPONSE;
  }

  const allGuests = registration.event_guests as Array<{ id: string; vorname: string; nachname: string }>;

  if (action === "reduce") {
    if (!guest_ids_to_remove || guest_ids_to_remove.length === 0) {
      return NextResponse.json(
        { error: "Bitte wähle mindestens eine Person zum Entfernen aus." },
        { status: 400 },
      );
    }
    if (guest_ids_to_remove.length >= allGuests.length) {
      return NextResponse.json(
        {
          error:
            "Mindestens eine Person muss verbleiben. Nutze 'Gesamte Anmeldung stornieren' um alle zu entfernen.",
        },
        { status: 400 },
      );
    }

    // M4: ensure every supplied ID actually belongs to this registration
    const ownedIds = new Set(allGuests.map((g) => g.id));
    if (!guest_ids_to_remove.every((id) => ownedIds.has(id))) {
      return NextResponse.json({ error: "Ungültige Gast-IDs." }, { status: 400 });
    }
  }

  // Atomically claim the token: only the first concurrent request succeeds.
  // The WHERE token_used = false condition means a second simultaneous POST
  // with the same token finds no matching row and gets INVALID_TOKEN_RESPONSE.
  const { data: claimed } = await supabase
    .from("event_registrations")
    .update({ token_used: true })
    .eq("id", registration.id)
    .eq("token_used", false)
    .select("id")
    .single();

  if (!claimed) return INVALID_TOKEN_RESPONSE;

  if (action === "reduce") {
    const { data: result, error: rpcError } = await supabase.rpc("cancel_guests", {
      p_registration_id: registration.id,
      p_guest_ids: guest_ids_to_remove!,
    });

    if (rpcError) {
      console.error("[cancel_guests] RPC error:", rpcError);
      return NextResponse.json({ error: "Stornierung fehlgeschlagen." }, { status: 500 });
    }

    const row = (result as Array<{ remaining_count: number; is_full_cancel: boolean }>)?.[0];
    const cancelledGuests = allGuests.filter((g) => guest_ids_to_remove!.includes(g.id));
    const remainingGuests = allGuests.filter((g) => !guest_ids_to_remove!.includes(g.id));

    try {
      await sendCancellationConfirmationEmail({
        to: registration.email,
        cancelledGuests,
        remainingGuests: row?.is_full_cancel ? [] : remainingGuests,
      });
    } catch {
      console.error("[Brevo] Stornierungsbestätigung konnte nicht gesendet werden.");
    }
  } else {
    // Full cancel: use cancel_guests RPC so event_guests rows are deleted atomically
    // alongside the registration status update (direct UPDATE leaves guests orphaned).
    const { error: rpcError } = await supabase.rpc("cancel_guests", {
      p_registration_id: registration.id,
      p_guest_ids: allGuests.map((g) => g.id),
    });

    if (rpcError) {
      console.error("[cancel_guests] Full cancel RPC error:", rpcError);
      return NextResponse.json({ error: "Stornierung fehlgeschlagen." }, { status: 500 });
    }

    try {
      await sendCancellationConfirmationEmail({
        to: registration.email,
        cancelledGuests: allGuests,
        remainingGuests: [],
      });
    } catch {
      console.error("[Brevo] Stornierungsbestätigung konnte nicht gesendet werden.");
    }
  }

  return NextResponse.json({ success: true });
}
