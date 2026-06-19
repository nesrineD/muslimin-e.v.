import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAschuraAdmin } from "@/lib/auth/roles";

export async function DELETE(
  _request: NextRequest,
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

  const supabase = getSupabaseServer();

  const { data: guest, error: fetchError } = await supabase
    .from("event_guests")
    .select("registration_id")
    .eq("id", guestId)
    .single();

  if (fetchError || !guest) {
    return NextResponse.json({ error: "Gast nicht gefunden." }, { status: 404 });
  }

  const { data: result, error: rpcError } = await supabase.rpc("cancel_guests", {
    p_registration_id: guest.registration_id,
    p_guest_ids: [guestId],
  });

  if (rpcError) {
    console.error("[cancel_guest] RPC error:", rpcError);
    return NextResponse.json({ error: "Stornierung fehlgeschlagen." }, { status: 500 });
  }

  const row = (result as Array<{ remaining_count: number; is_full_cancel: boolean }>)?.[0];
  return NextResponse.json({
    success: true,
    is_full_cancel: row?.is_full_cancel ?? false,
    remaining_count: row?.remaining_count ?? 0,
  });
}
