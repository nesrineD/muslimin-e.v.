import { z } from "zod";

export const registrationSchema = z.object({
  vorname: z.string().min(2, "Vorname muss mindestens 2 Zeichen lang sein."),
  nachname: z.string().min(2, "Nachname muss mindestens 2 Zeichen lang sein."),
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
  anzahl_teilnehmer: z
    .number()
    .int("Bitte gib eine ganze Zahl ein.")
    .min(1, "Mindestens 1 Teilnehmer erforderlich.")
    .max(20, "Maximal 20 Teilnehmer pro Anmeldung."),
  datenschutz: z.literal(true, "Bitte bestätige die Datenschutzhinweise."),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const cancelRequestSchema = z.object({
  email: z.string().email("Bitte gib eine gültige E-Mail-Adresse ein."),
});

export type CancelRequestInput = z.infer<typeof cancelRequestSchema>;

export const cancelSchema = z.object({
  token: z.string().uuid("Ungültiger Stornierungslink."),
  action: z.enum(["full", "reduce"]),
  neue_anzahl: z.number().int().min(1).optional(),
});

export type CancelInput = z.infer<typeof cancelSchema>;
