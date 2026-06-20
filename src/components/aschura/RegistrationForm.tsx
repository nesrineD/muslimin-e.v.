"use client";

import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  registrationSchema,
  type RegistrationInput,
} from "@/lib/validations/aschura";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface Props {
  isFull: boolean;
}

export function RegistrationForm({ isFull }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  const [serverError, setServerError] = useState<string | null>(null);
  const [emailDelayed, setEmailDelayed] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: "",
      guests: [{ vorname: "", nachname: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "guests",
  });

  const datenschutz = watch("datenschutz");
  const guestCount = fields.length;

  function handleCountChange(newCount: number) {
    const clamped = Math.max(1, Math.min(20, newCount));
    const diff = clamped - fields.length;
    if (diff > 0) {
      for (let i = 0; i < diff; i++) append({ vorname: "", nachname: "" });
    } else if (diff < 0) {
      for (let i = 0; i < -diff; i++) remove(fields.length - 1 - i);
    }
  }

  const onSubmit: SubmitHandler<RegistrationInput> = async (data) => {
    setServerError(null);
    setEmailDelayed(false);

    const res = await fetch("/api/events/aschura/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      setSubmittedEmail(data.email);
      setSubmitted(true);
    } else if (res.status === 409) {
      setServerError("Leider sind alle Plätze bereits vergeben.");
    } else {
      setServerError("Ein Fehler ist aufgetreten. Bitte versuche es erneut.");
    }
  };

  if (isFull && !submitted) {
    return (
      <p className="py-6 text-center font-medium text-red-300">
        Anmeldung geschlossen — alle Plätze sind vergeben.
      </p>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-charcoal-700 border border-charcoal-600 p-6 text-center space-y-2">
        <p className="font-semibold text-cream-50">
          Vielen Dank für deine Anmeldung!
        </p>
        {emailDelayed ? (
          <p className="text-charcoal-300 text-sm">
            Deine Anmeldung wurde gespeichert. Die Bestätigungs-E-Mail an{" "}
            <span className="text-cream-100 font-medium">{submittedEmail}</span>{" "}
            kann einige Minuten dauern. Bitte prüfe auch deinen Spam-Ordner.
          </p>
        ) : (
          <p className="text-charcoal-300 text-sm">
            Wir haben dir eine Bestätigungs-E-Mail an{" "}
            <span className="text-cream-100 font-medium">{submittedEmail}</span>{" "}
            mit der Liste aller angemeldeten Gäste geschickt. Bitte prüfe auch
            deinen Spam-Ordner.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {serverError && (
        <p role="alert" className="text-sm font-medium text-red-300">
          {serverError}
        </p>
      )}

      {/* E-Mail */}
      <div className="space-y-1">
        <Label htmlFor="email" className="text-charcoal-200">
          E-Mail-Adresse *
        </Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="email"
          error={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          className={`${errors.email ? "border-red-300" : "border-charcoal-500"} bg-charcoal-700 text-cream-50 placeholder:text-charcoal-400 focus:border-red-300 focus:ring-red-300/30`}
        />
        {errors.email && (
          <p id="email-error" className="text-xs text-red-300">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* Guest count stepper */}
      <div className="space-y-1">
        <Label className="text-charcoal-200">
          Anzahl der Teilnehmerinnen *
        </Label>
        <div
          className="flex items-center gap-3"
          role="group"
          aria-label="Anzahl der Teilnehmerinnen"
        >
          <button
            type="button"
            onClick={() => handleCountChange(guestCount - 1)}
            disabled={guestCount <= 1}
            className="h-11 w-11 rounded-full border border-charcoal-500 text-lg font-bold leading-none text-charcoal-200 transition-colors hover:border-charcoal-400 hover:bg-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Weniger Gäste"
          >
            −
          </button>
          <span
            aria-live="polite"
            className="w-6 text-center text-lg font-semibold text-cream-50"
          >
            {guestCount}
          </span>
          <button
            type="button"
            onClick={() => handleCountChange(guestCount + 1)}
            disabled={guestCount >= 20}
            className="h-11 w-11 rounded-full border border-charcoal-500 text-lg font-bold leading-none text-charcoal-200 transition-colors hover:border-charcoal-400 hover:bg-charcoal-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Mehr Gäste"
          >
            +
          </button>
        </div>
        <p className="text-charcoal-300 text-xs">
          Inklusive dir selbst. Maximal 20 pro Anmeldung.
        </p>
        {errors.guests?.root && (
          <p className="text-xs text-red-300">{errors.guests.root.message}</p>
        )}
      </div>

      {/* Dynamic guest name fields */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-3 rounded-lg border border-charcoal-600 bg-charcoal-900/40 p-4"
          >
            <p className="text-xs font-medium text-charcoal-300 uppercase tracking-wide">
              {index === 0 ? "Dein Name" : `Gast ${index + 1}`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label
                  htmlFor={`guests.${index}.vorname`}
                  className="text-charcoal-200"
                >
                  Vorname *
                </Label>
                <Input
                  id={`guests.${index}.vorname`}
                  {...register(`guests.${index}.vorname`)}
                  autoComplete={index === 0 ? "given-name" : "off"}
                  error={!!errors.guests?.[index]?.vorname}
                  aria-describedby={
                    errors.guests?.[index]?.vorname
                      ? `guests-${index}-vorname-error`
                      : undefined
                  }
                  className={`${errors.guests?.[index]?.vorname ? "border-red-300" : "border-charcoal-500"} bg-charcoal-700 text-cream-50 placeholder:text-charcoal-400 focus:border-red-300 focus:ring-red-300/30`}
                />
                {errors.guests?.[index]?.vorname && (
                  <p
                    id={`guests-${index}-vorname-error`}
                    className="text-xs text-red-300"
                  >
                    {errors.guests[index]?.vorname?.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor={`guests.${index}.nachname`}
                  className="text-charcoal-200"
                >
                  Nachname *
                </Label>
                <Input
                  id={`guests.${index}.nachname`}
                  {...register(`guests.${index}.nachname`)}
                  autoComplete={index === 0 ? "family-name" : "off"}
                  error={!!errors.guests?.[index]?.nachname}
                  aria-describedby={
                    errors.guests?.[index]?.nachname
                      ? `guests-${index}-nachname-error`
                      : undefined
                  }
                  className={`${errors.guests?.[index]?.nachname ? "border-red-300" : "border-charcoal-500"} bg-charcoal-700 text-cream-50 placeholder:text-charcoal-400 focus:border-red-300 focus:ring-red-300/30`}
                />
                {errors.guests?.[index]?.nachname && (
                  <p
                    id={`guests-${index}-nachname-error`}
                    className="text-xs text-red-300"
                  >
                    {errors.guests[index]?.nachname?.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Datenschutz */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="datenschutz"
          checked={!!datenschutz}
          aria-describedby={
            errors.datenschutz ? "datenschutz-error" : undefined
          }
          aria-invalid={errors.datenschutz ? "true" : undefined}
          className="h-5 w-5 border-charcoal-400 focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-800 data-[state=checked]:border-red-300 data-[state=checked]:bg-red-950 data-[state=checked]:text-white"
          onCheckedChange={(checked) =>
            setValue("datenschutz", (checked === true) as true, {
              shouldValidate: true,
            })
          }
        />
        <Label
          htmlFor="datenschutz"
          className="text-sm leading-snug cursor-pointer text-charcoal-200"
        >
          Ich habe die{" "}
          <a
            href="/datenschutz"
            className="text-red-300 underline underline-offset-2 transition-colors hover:text-red-200 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Datenschutzhinweise
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten für die Veranstaltung
          zu. *
        </Label>
      </div>
      {errors.datenschutz && (
        <p id="datenschutz-error" className="-mt-3 text-xs text-red-300">
          {errors.datenschutz.message}
        </p>
      )}

      {/* Hinweise zur Teilnahme */}
      <div className="rounded-xl border border-red-800/70 bg-charcoal-900/60 px-5 py-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
          Bitte beachte
        </p>
        <ul className="divide-y divide-charcoal-700 text-sm">
          <li className="py-3 first:pt-0">
            <strong className="block text-cream-50">
              Schwestern und Mädchen ab 9 Jahren
            </strong>
            <span className="mt-1 block text-white/80">
              Es gibt keine Kinderbetreuung. Säuglinge bis 2 Jahre dürfen bei
              der Mutter bleiben.
            </span>
          </li>
          <li className="py-3">
            <strong className="block text-cream-50">
              Verbindliche Anmeldung
            </strong>
            <span className="mt-1 block text-white/80">
              Bitte nutze bei Verhinderung den Abmeldelink, damit
              Wartelistenplätze frei werden.
            </span>
          </li>
          <li className="py-3 last:pb-0">
            <strong className="block text-cream-50">
              Keine Foto- und Videoaufnahmen
            </strong>
            <span className="mt-1 block text-white/80">
              Während der gesamten Veranstaltung bitten wir um Rücksicht und
              Einhaltung dieser Regel.
            </span>
          </li>
        </ul>
      </div>

      <Button
        variant="default"
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] w-full border-0 bg-red-950 text-white hover:bg-red-900 active:bg-red-950 focus-visible:outline-red-300"
      >
        {isSubmitting ? "Wird gesendet…" : "Jetzt anmelden"}
      </Button>
    </form>
  );
}
