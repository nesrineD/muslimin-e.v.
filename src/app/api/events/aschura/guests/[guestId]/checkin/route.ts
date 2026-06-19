import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAschuraAdmin } from "@/lib/auth/roles";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ guestId: string }> },
) {
  if (!(await isAschuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { guestId } = await params;

  const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!UUID_RE.test(guestId)) {
    return NextResponse.json({ error: "Ungültige ID." }, { status: 400 });
  }

  let checked_in: boolean;
  try {
    const body = await request.json();
    if (typeof body?.checked_in !== "boolean") throw new Error();
    checked_in = body.checked_in;
  } catch {
    return NextResponse.json(
      { error: "Ungültige Anfrage. Erwartet: { checked_in: boolean }" },
      { status: 400 },
    );
  }

  const { error } = await getSupabaseServer().rpc("checkin_guest", {
    p_guest_id: guestId,
    p_checked_in: checked_in,
  });

  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  return NextResponse.json({ checked_in });
}
