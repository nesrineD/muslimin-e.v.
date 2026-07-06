import { z } from "zod";

export const guestSchema = z.object({
  vorname: z.string().min(2, { message: "Vorname muss mindestens 2 Zeichen lang sein." }).max(100, { message: "Vorname darf maximal 100 Zeichen lang sein." }),
  nachname: z.string().min(2, { message: "Nachname muss mindestens 2 Zeichen lang sein." }).max(100, { message: "Nachname darf maximal 100 Zeichen lang sein." }),
});

export type GuestInput = z.infer<typeof guestSchema>;

export const registrationSchema = z.object({
  email: z.email({ message: "Bitte gib eine gültige E-Mail-Adresse ein." }),
  guests: z
    .array(guestSchema)
    .min(1, { message: "Mindestens 1 Gast erforderlich." })
    .max(20, { message: "Maximal 20 Gäste pro Anmeldung." }),
  datenschutz: z.literal(true, { message: "Bitte bestätige die Datenschutzhinweise." }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const cancelRequestSchema = z.object({
  email: z.email({ message: "Bitte gib eine gültige E-Mail-Adresse ein." }),
});

export type CancelRequestInput = z.infer<typeof cancelRequestSchema>;

export const cancelSchema = z.object({
  token: z.uuid({ message: "Ungültiger Stornierungslink." }),
  action: z.enum(["full", "reduce"]),
  guest_ids_to_remove: z.array(z.uuid()).optional(),
});

export type CancelInput = z.infer<typeof cancelSchema>;

export const waitlistSchema = registrationSchema;
export type WaitlistInput = RegistrationInput;
