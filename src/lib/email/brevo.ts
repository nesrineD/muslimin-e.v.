import { BrevoClient } from "@getbrevo/brevo";

const EVENT_DATE = "15. Juni 2026";
const EVENT_LOCATION = "Berlin (genaue Adresse folgt)";
const SENDER_NAME = "Muslimin e.V.";
const SENDER_EMAIL = "info@muslimin-ev.de";

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? "https://muslimin-ev.de";
}

function createClient() {
  return new BrevoClient({ apiKey: process.env.BREVO_API_KEY! });
}

export async function sendConfirmationEmail(opts: {
  to: string;
  vorname: string;
  anzahl: number;
  cancellationToken: string;
}): Promise<void> {
  const client = createClient();
  const manageLink = `${getBaseUrl()}/veranstaltungen/ashura/stornieren/confirm?token=${opts.cancellationToken}`;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: `Anmeldebestätigung – Ashura-Veranstaltung ${EVENT_DATE}`,
    htmlContent: `
      <p>As-salamu alaykum ${opts.vorname},</p>
      <p>wir freuen uns, deine Anmeldung für unsere <strong>Ashura-Frauenveranstaltung</strong> bestätigen zu dürfen.</p>
      <ul>
        <li><strong>Datum:</strong> ${EVENT_DATE}</li>
        <li><strong>Ort:</strong> ${EVENT_LOCATION}</li>
        <li><strong>Anzahl der Teilnehmerinnen:</strong> ${opts.anzahl}</li>
      </ul>
      <p>Möchtest du deine Anmeldung verwalten oder stornieren? <a href="${manageLink}">Anmeldung verwalten</a></p>
      <p>Wir freuen uns auf dich!</p>
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
  const cancelLink = `${getBaseUrl()}/veranstaltungen/ashura/stornieren/confirm?token=${opts.token}`;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: "Stornierungslink – Ashura-Veranstaltung",
    htmlContent: `
      <p>As-salamu alaykum ${opts.vorname},</p>
      <p>du hast einen Stornierungslink für deine Anmeldung zur Ashura-Frauenveranstaltung angefordert.</p>
      <p>Klicke auf den folgenden Link, um deine Anmeldung zu stornieren oder die Teilnehmeranzahl zu ändern:</p>
      <p><a href="${cancelLink}">Anmeldung verwalten</a></p>
      <p>Dieser Link ist <strong>15 Tage</strong> gültig. Danach musst du einen neuen Link anfordern.</p>
      <p>Falls du keinen Stornierungslink angefordert hast, kannst du diese E-Mail ignorieren.</p>
      <p>Mit freundlichen Grüßen,<br/>${SENDER_NAME}</p>
    `,
  });
}

export async function sendCancellationConfirmationEmail(opts: {
  to: string;
  vorname: string;
  action: "full" | "reduce";
  neue_anzahl?: number;
}): Promise<void> {
  const client = createClient();

  const actionText =
    opts.action === "full"
      ? "Deine gesamte Anmeldung wurde erfolgreich storniert."
      : `Die Anzahl deiner Teilnehmerinnen wurde auf <strong>${opts.neue_anzahl}</strong> reduziert.`;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: "Stornierungsbestätigung – Ashura-Veranstaltung",
    htmlContent: `
      <p>As-salamu alaykum ${opts.vorname},</p>
      <p>${actionText}</p>
      <p>Solltest du Fragen haben, erreichst du uns unter <a href="mailto:${SENDER_EMAIL}">${SENDER_EMAIL}</a>.</p>
      <p>Mit freundlichen Grüßen,<br/>${SENDER_NAME}</p>
    `,
  });
}
