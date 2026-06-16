import { BrevoClient } from "@getbrevo/brevo";
import type { GuestInput } from "@/types/aschura";

const EVENT_DATE = "15. Juni 2026";
const EVENT_LOCATION = "Berlin (genaue Adresse folgt)";
const SENDER_NAME = "Muslimin e.V.";
const SENDER_EMAIL = "aschura@muslimin-ev.de";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://muslimin-ev.de";
}

function createClient() {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error("[Brevo] BREVO_API_KEY is not set.");
    throw new Error("BREVO_API_KEY is not configured.");
  }
  return new BrevoClient({ apiKey });
}

function guestListHtml(guests: GuestInput[]): string {
  return guests
    .map((g) => `<li>${g.vorname} ${g.nachname}</li>`)
    .join("\n");
}

export async function sendConfirmationEmail(opts: {
  to: string;
  vorname: string;
  guests: GuestInput[];
  cancellationToken: string;
}): Promise<void> {
  const client = createClient();
  const manageLink = `${getBaseUrl()}/veranstaltungen/aschura/stornieren/confirm?token=${opts.cancellationToken}`;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: `Anmeldebestätigung – Aschura-Veranstaltung ${EVENT_DATE}`,
    htmlContent: `
      <p>As-salamu alaykum ${opts.vorname},</p>
      <p>wir freuen uns, deine Anmeldung für unsere <strong>Aschura-Frauenveranstaltung</strong> bestätigen zu dürfen.</p>
      <ul>
        <li><strong>Datum:</strong> ${EVENT_DATE}</li>
        <li><strong>Ort:</strong> ${EVENT_LOCATION}</li>
        <li><strong>Angemeldete Gäste (${opts.guests.length}):</strong></li>
      </ul>
      <ul>
        ${guestListHtml(opts.guests)}
      </ul>
      <p>Möchtest du deine Anmeldung verwalten oder stornieren? <a href="${manageLink}">Anmeldung verwalten</a></p>
      <p>Wir freuen uns auf euch!</p>
      <p>Mit freundlichen Grüßen,<br/>${SENDER_NAME}</p>
    `,
  });
}

export async function sendCancellationRequestEmail(opts: {
  to: string;
  vorname: string;
  token: string;
}): Promise<void> {
  const client = createClient();
  const cancelLink = `${getBaseUrl()}/veranstaltungen/aschura/stornieren/confirm?token=${opts.token}`;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: "Stornierungslink – Aschura-Veranstaltung",
    htmlContent: `
      <p>As-salamu alaykum ${opts.vorname},</p>
      <p>du hast einen Stornierungslink für deine Anmeldung zur Aschura-Frauenveranstaltung angefordert.</p>
      <p>Klicke auf den folgenden Link, um deine Anmeldung zu verwalten:</p>
      <p><a href="${cancelLink}">Anmeldung verwalten</a></p>
      <p>Dieser Link ist <strong>15 Tage</strong> gültig.</p>
      <p>Falls du keinen Stornierungslink angefordert hast, kannst du diese E-Mail ignorieren.</p>
      <p>Mit freundlichen Grüßen,<br/>${SENDER_NAME}</p>
    `,
  });
}

export async function sendKontaktEmail(opts: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): Promise<void> {
  const client = createClient();

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: "info@muslimin-ev.de", name: "Muslimin e.V." }],
    replyTo: { email: opts.email, name: opts.name },
    subject: `Kontaktformular: ${opts.subject}`,
    htmlContent: `
      <p><strong>Von:</strong> ${opts.name} &lt;${opts.email}&gt;</p>
      <p><strong>Betreff:</strong> ${opts.subject}</p>
      <hr/>
      <p>${opts.message.replace(/\n/g, "<br/>")}</p>
    `,
  });
}

export async function sendCancellationConfirmationEmail(opts: {
  to: string;
  cancelledGuests: GuestInput[];
  remainingGuests: GuestInput[];
}): Promise<void> {
  const client = createClient();
  const isFullCancel = opts.remainingGuests.length === 0;

  const cancelledSection = `
    <p><strong>Stornierte Personen (${opts.cancelledGuests.length}):</strong></p>
    <ul>${guestListHtml(opts.cancelledGuests)}</ul>
  `;

  const remainingSection = isFullCancel
    ? "<p>Deine gesamte Anmeldung wurde storniert.</p>"
    : `
    <p><strong>Verbleibende Personen (${opts.remainingGuests.length}):</strong></p>
    <ul>${guestListHtml(opts.remainingGuests)}</ul>
  `;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: "Stornierungsbestätigung – Aschura-Veranstaltung",
    htmlContent: `
      <p>As-salamu alaykum,</p>
      <p>deine Stornierungsanfrage wurde bearbeitet.</p>
      ${cancelledSection}
      ${remainingSection}
      <p>Solltest du Fragen haben, erreichst du uns unter <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>.</p>
      <p>Mit freundlichen Grüßen,<br/>${SENDER_NAME}</p>
    `,
  });
}
