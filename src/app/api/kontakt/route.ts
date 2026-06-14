import { NextResponse } from "next/server";
import { sendKontaktEmail } from "@/lib/email/brevo";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  const { name, email, subject, message } = body as Record<string, string>;

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json(
      { error: "Alle Felder sind erforderlich." },
      { status: 400 },
    );
  }

  try {
    await sendKontaktEmail({ name, email, subject, message });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kontakt] E-Mail konnte nicht gesendet werden:", err);
    return NextResponse.json(
      { error: "E-Mail konnte nicht gesendet werden. Bitte versuche es später erneut." },
      { status: 500 },
    );
  }
}
