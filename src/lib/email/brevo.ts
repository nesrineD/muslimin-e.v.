import { BrevoClient } from "@getbrevo/brevo";
import type { GuestInput } from "@/types/aschura";

const EVENT_DATE = "Samstag, 11. Juli 2026";
const EVENT_EINLASS = "17:15 Uhr";
const EVENT_BEGINN = "18:00 Uhr";
const EVENT_LOCATION = "Queen Palace, Skalitzer Str. 130, 10999 Berlin";
const EVENT_LOCATION_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Queen+Palace+Skalitzer+Str.+130+10999+Berlin";
const EVENT_LOCATION_HTML = `<a href="${EVENT_LOCATION_MAPS_URL}" style="color:#fca5a5;text-decoration:none;">${EVENT_LOCATION}</a>`;
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

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------------------
// Template helpers
// ---------------------------------------------------------------------------

function baseTemplate(content: string): string {
  return `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background-color:#1c1917;font-family:Arial,Helvetica,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#1c1917;">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#292524;border-radius:16px 16px 0 0;border-top:3px solid #7f1d1d;padding:36px 44px 28px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:10px;font-weight:700;letter-spacing:0.22em;text-transform:uppercase;color:#fca5a5;">
                Muslimin e.V. &nbsp;·&nbsp; Aschura 2026
              </p>
              <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;font-weight:700;color:#fdf8f0;line-height:1.35;">
                Aschura-Frauenveranstaltung
              </h1>
              <p style="margin:10px 0 0 0;font-size:13px;color:#a8a29e;letter-spacing:0.04em;">
                ${EVENT_DATE}
              </p>
            </td>
          </tr>

          <!-- Divider line -->
          <tr>
            <td style="background-color:#292524;padding:0 44px;">
              <div style="height:1px;background-color:#3d3835;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#292524;border-radius:0 0 16px 16px;padding:32px 44px 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:28px 44px 0;text-align:center;">
              <p style="margin:0 0 4px 0;font-size:12px;color:#78716c;">
                Muslimin e.V. &nbsp;·&nbsp; Berlin
              </p>
              <p style="margin:0;font-size:12px;color:#78716c;">
                <a href="mailto:${SENDER_EMAIL}" style="color:#fca5a5;text-decoration:none;">${SENDER_EMAIL}</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:28px 0 0 0;">
    <tr>
      <td style="border-radius:10px;background-color:#7f1d1d;">
        <a href="${href}"
           style="display:inline-block;padding:14px 32px;font-size:14px;font-weight:700;color:#fdf8f0;text-decoration:none;letter-spacing:0.04em;border-radius:10px;">
          ${label}
        </a>
      </td>
    </tr>
  </table>`;
}

function infoBox(rows: { label: string; value: string }[]): string {
  const items = rows
    .map(
      (r) => `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid #3d3835;">
          <span style="display:block;font-size:10px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#a8a29e;margin-bottom:3px;">${r.label}</span>
          <span style="font-size:14px;font-weight:600;color:#fdf8f0;">${r.value}</span>
        </td>
      </tr>`,
    )
    .join("");

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="margin:24px 0;border:1px solid #3d3835;border-radius:10px;overflow:hidden;background-color:#1c1917;">
    ${items}
  </table>`;
}

function guestListHtml(guests: GuestInput[]): string {
  const items = guests
    .map(
      (g, i) => `
      <tr>
        <td style="padding:10px 16px;border-bottom:1px solid #3d3835;">
          <span style="font-size:11px;color:#a8a29e;margin-right:10px;">${String(i + 1).padStart(2, "0")}</span>
          <span style="font-size:14px;color:#e7e5e4;">${esc(g.vorname)} ${esc(g.nachname)}</span>
        </td>
      </tr>`,
    )
    .join("");

  return `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
    style="border:1px solid #3d3835;border-radius:10px;overflow:hidden;background-color:#1c1917;">
    ${items}
  </table>`;
}

function bodyText(text: string): string {
  return `<p style="margin:0 0 16px 0;font-size:15px;line-height:1.7;color:#d6d3d1;">${text}</p>`;
}

function sectionLabel(text: string): string {
  return `<p style="margin:28px 0 10px 0;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#fca5a5;">${text}</p>`;
}

// ---------------------------------------------------------------------------
// Email senders
// ---------------------------------------------------------------------------

export async function sendConfirmationEmail(opts: {
  to: string;
  vorname: string;
  guests: GuestInput[];
  cancellationToken: string;
}): Promise<void> {
  const client = createClient();
  const manageLink = `${getBaseUrl()}/veranstaltungen/aschura/stornieren/confirm?token=${opts.cancellationToken}`;

  const content = `
    ${bodyText(`As-salamu alaykum Liebe ${esc(opts.vorname)},`)}
    ${bodyText('vielen Dank für deine Anmeldung zur <strong style="color:#fdf8f0;">Aschura-Frauenveranstaltung – ein Abend der Andacht</strong>. Wir freuen uns sehr, dass du an dieser besonderen Veranstaltung teilnehmen wirst.')}

    ${infoBox([
      { label: "Datum", value: EVENT_DATE },
      { label: "Einlass", value: EVENT_EINLASS },
      { label: "Beginn", value: EVENT_BEGINN },
      { label: "Ort", value: EVENT_LOCATION_HTML },
    ])}

    ${sectionLabel(`Angemeldete Personen (${opts.guests.length})`)}
    ${guestListHtml(opts.guests)}

    <div style="height:16px;line-height:16px;">&nbsp;</div>
    ${bodyText("Falls du Fragen hast oder weitere Informationen benötigst, zögere bitte nicht, uns zu kontaktieren – wir sind gerne für dich da.")}
    ${bodyText("Wir freuen uns auf dein Kommen und wünschen dir eine segensreiche Zeit.")}

    <p style="margin:24px 0 8px 0;font-size:13px;color:#a8a29e;line-height:1.7;">
      <strong style="color:#d6d3d1;">Hinweis:</strong> Falls du verhindert bist, bitten wir dich, dich rechtzeitig abzumelden, um anderen Schwestern die Gelegenheit zu geben, an der Veranstaltung teilzunehmen.
    </p>

    ${ctaButton(manageLink, "Anmeldung verwalten oder stornieren")}

    <p style="margin:32px 0 0 0;font-size:14px;color:#d6d3d1;line-height:1.7;">
      Gesegnete Grüße<br/>
      <strong style="color:#fdf8f0;">Euer Muslimin e.V.-Team</strong>
    </p>
  `;
  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: `Anmeldebestätigung – Aschura-Frauenveranstaltung ${EVENT_DATE}`,
    htmlContent: baseTemplate(content),
  });
}

export async function sendCancellationRequestEmail(opts: {
  to: string;
  vorname: string;
  token: string;
}): Promise<void> {
  const client = createClient();
  const cancelLink = `${getBaseUrl()}/veranstaltungen/aschura/stornieren/confirm?token=${opts.token}`;

  const content = `
    ${bodyText(`As-salamu alaykum ${esc(opts.vorname)},`)}
    ${bodyText("du hast einen Stornierungslink für deine Anmeldung zur Aschura-Frauenveranstaltung angefordert. Über den folgenden Link kannst du deine Anmeldung verwalten oder stornieren.")}

    ${ctaButton(cancelLink, "Anmeldung verwalten")}

    <p style="margin:12px 0 0 0;font-size:12px;color:#78716c;line-height:1.6;">
      Falls du keinen Stornierungslink angefordert hast, kannst du diese E-Mail ignorieren. Deine Anmeldung bleibt unverändert.
    </p>
  `;
  const textContent = [
    `As-salamu alaykum ${opts.vorname},`,
    "Du hast einen Stornierungslink für deine Anmeldung zur Aschura-Frauenveranstaltung angefordert.",
    `Anmeldung verwalten: ${cancelLink}`,
    "Falls du keinen Stornierungslink angefordert hast, kannst du diese E-Mail ignorieren. Deine Anmeldung bleibt unverändert.",
  ].join("\n\n");

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: "Stornierungslink – Aschura-Frauenveranstaltung",
    htmlContent: baseTemplate(content),
    textContent,
  });
}

export async function sendCancellationConfirmationEmail(opts: {
  to: string;
  vorname: string;
  cancelledGuests: GuestInput[];
  remainingGuests: GuestInput[];
}): Promise<void> {
  const client = createClient();
  const isFullCancel = opts.remainingGuests.length === 0;
  const cancellationMessage = isFullCancel
    ? "Deine Stornierungsanfrage wurde bearbeitet und deine gesamte Anmeldung wurde entfernt."
    : "Deine Stornierungsanfrage wurde bearbeitet. Die folgenden Personen wurden aus deiner Anmeldung entfernt.";

  const remainingSection = isFullCancel
    ? bodyText(
        "Deine gesamte Anmeldung wurde erfolgreich storniert. Wir hoffen, dich bei einem zukünftigen Anlass begrüßen zu dürfen.",
      )
    : `
      ${sectionLabel(`Verbleibende Personen (${opts.remainingGuests.length})`)}
      ${guestListHtml(opts.remainingGuests)}
    `;

  const content = `
    ${bodyText(`As-salamu alaykum Liebe ${esc(opts.vorname)},`)}
    ${bodyText(cancellationMessage)}

    ${sectionLabel(`Stornierte Personen (${opts.cancelledGuests.length})`)}
    ${guestListHtml(opts.cancelledGuests)}

    ${remainingSection}

    <p style="margin:28px 0 0 0;font-size:13px;color:#a8a29e;line-height:1.7;">
      Bei Fragen erreichst du uns unter
      <a href="mailto:${SENDER_EMAIL}" style="color:#fca5a5;text-decoration:none;">${SENDER_EMAIL}</a>.
    </p>
  `;

  const cancelledGuestsText = opts.cancelledGuests
    .map((guest) => `- ${guest.vorname} ${guest.nachname}`)
    .join("\n");
  const remainingGuestsText = opts.remainingGuests
    .map((guest) => `- ${guest.vorname} ${guest.nachname}`)
    .join("\n");
  const textContent = [
    `As-salamu alaykum Liebe ${opts.vorname},`,
    cancellationMessage,
    `Stornierte Personen (${opts.cancelledGuests.length}):\n${cancelledGuestsText}`,
    isFullCancel
      ? "Deine gesamte Anmeldung wurde erfolgreich storniert. Wir hoffen, dich bei einem zukünftigen Anlass begrüßen zu dürfen."
      : `Verbleibende Personen (${opts.remainingGuests.length}):\n${remainingGuestsText}`,
    `Bei Fragen erreichst du uns unter ${SENDER_EMAIL}.`,
  ].join("\n\n");

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: "Stornierungsbestätigung – Aschura-Frauenveranstaltung",
    htmlContent: baseTemplate(content),
    textContent,
  });
}

export async function sendWaitlistPromotionEmail(opts: {
  to: string;
  vorname: string;
  guests: GuestInput[];
  cancellationToken: string;
}): Promise<void> {
  const client = createClient();
  const manageLink = `${getBaseUrl()}/veranstaltungen/aschura/stornieren/confirm?token=${opts.cancellationToken}`;

  const content = `
    ${bodyText(`As-salamu alaykum Liebe ${esc(opts.vorname)},`)}
    ${bodyText('wir haben gute Neuigkeiten für dich: Ein Platz ist freigeworden und du bist jetzt <strong style="color:#fdf8f0;">offiziell zur Aschura-Frauenveranstaltung angemeldet!</strong>')}

    ${infoBox([
      { label: "Datum", value: EVENT_DATE },
      { label: "Einlass", value: EVENT_EINLASS },
      { label: "Beginn", value: EVENT_BEGINN },
      { label: "Ort", value: EVENT_LOCATION_HTML },
    ])}

    ${sectionLabel(`Angemeldete Personen (${opts.guests.length})`)}
    ${guestListHtml(opts.guests)}

    <div style="height:16px;line-height:16px;">&nbsp;</div>
    ${bodyText("Falls du nun doch verhindert bist, bitten wir dich herzlich, dich rechtzeitig abzumelden, damit die nächste Person auf der Warteliste nachrücken kann.")}

    ${ctaButton(manageLink, "Anmeldung verwalten oder stornieren")}

    <p style="margin:32px 0 0 0;font-size:14px;color:#d6d3d1;line-height:1.7;">
      Gesegnete Grüße<br/>
      <strong style="color:#fdf8f0;">Euer Muslimin e.V.-Team</strong>
    </p>
  `;

  await client.transactionalEmails.sendTransacEmail({
    sender: { name: SENDER_NAME, email: SENDER_EMAIL },
    to: [{ email: opts.to }],
    subject: `Du bist dabei! Platz freigeworden – Aschura-Frauenveranstaltung ${EVENT_DATE}`,
    htmlContent: baseTemplate(content),
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
      <p><strong>Von:</strong> ${esc(opts.name)} &lt;${esc(opts.email)}&gt;</p>
      <p><strong>Betreff:</strong> ${esc(opts.subject)}</p>
      <hr/>
      <p>${esc(opts.message).replace(/\n/g, "<br/>")}</p>
    `,
  });
}
