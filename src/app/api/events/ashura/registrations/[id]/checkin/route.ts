import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import { isAshuraAdmin } from "@/lib/auth/roles";

export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAshuraAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;

  // Toggle checked_in status
  const { data: current } = await getSupabaseServer()
    .from("event_registrations")
    .select("checked_in")
    .eq("id", id)
    .single();

  if (!current) {
    return NextResponse.json(
      { error: "Anmeldung nicht gefunden." },
      { status: 404 },
    );
  }

  const { error } = await getSupabaseServer()
    .from("event_registrations")
    .update({ checked_in: !current.checked_in })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Datenbankfehler." }, { status: 500 });
  }

  return NextResponse.json({ checked_in: !current.checked_in });
}
