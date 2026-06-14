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
