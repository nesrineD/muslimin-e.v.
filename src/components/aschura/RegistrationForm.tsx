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
      setSubmitted(true);
    } else if (res.status === 409) {
      setServerError("Leider sind alle Plätze bereits vergeben.");
    } else {
      setEmailDelayed(true);
      setSubmitted(true);
    }
  };

  if (isFull && !submitted) {
    return (
      <p className="text-center text-sage-700 font-medium py-6">
        Anmeldung geschlossen — alle Plätze sind vergeben.
      </p>
    );
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-cream-50 border border-sage-200 p-6 text-center space-y-2">
        <p className="font-semibold text-charcoal-800">
          Vielen Dank für deine Anmeldung!
        </p>
        {emailDelayed ? (
          <p className="text-charcoal-600 text-sm">
            Deine Anmeldung wurde gespeichert. Die Bestätigungs-E-Mail kann
            einige Minuten dauern. Bitte prüfe auch deinen Spam-Ordner.
          </p>
        ) : (
          <p className="text-charcoal-600 text-sm">
            Wir haben dir eine Bestätigungs-E-Mail mit der Liste aller
            angemeldeten Gäste geschickt. Bitte prüfe auch deinen Spam-Ordner.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {serverError && (
        <p className="text-red-600 text-sm font-medium">{serverError}</p>
      )}

      {/* E-Mail */}
      <div className="space-y-1">
        <Label htmlFor="email">E-Mail-Adresse *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">{errors.email.message}</p>
        )}
      </div>

      {/* Guest count stepper */}
      <div className="space-y-1">
        <Label htmlFor="guestCount">Anzahl der Teilnehmerinnen *</Label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleCountChange(guestCount - 1)}
            disabled={guestCount <= 1}
            className="w-9 h-9 rounded-full border border-sage-300 text-charcoal-700 hover:bg-sage-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg leading-none"
            aria-label="Weniger Gäste"
          >
            −
          </button>
          <span className="w-6 text-center text-lg font-semibold text-charcoal-800">
            {guestCount}
          </span>
          <button
            type="button"
            onClick={() => handleCountChange(guestCount + 1)}
            disabled={guestCount >= 20}
            className="w-9 h-9 rounded-full border border-sage-300 text-charcoal-700 hover:bg-sage-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg leading-none"
            aria-label="Mehr Gäste"
          >
            +
          </button>
        </div>
        <p className="text-charcoal-500 text-xs">
          Inklusive dir selbst. Maximal 20 pro Anmeldung.
        </p>
        {errors.guests?.root && (
          <p className="text-red-600 text-xs">{errors.guests.root.message}</p>
        )}
      </div>

      {/* Dynamic guest name fields */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-lg border border-sage-200 p-4 space-y-3"
          >
            <p className="text-xs font-medium text-charcoal-500 uppercase tracking-wide">
              {index === 0 ? "Dein Name" : `Gast ${index + 1}`}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor={`guests.${index}.vorname`}>Vorname *</Label>
                <Input
                  id={`guests.${index}.vorname`}
                  {...register(`guests.${index}.vorname`)}
                  autoComplete={index === 0 ? "given-name" : "off"}
                />
                {errors.guests?.[index]?.vorname && (
                  <p className="text-red-600 text-xs">
                    {errors.guests[index]?.vorname?.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor={`guests.${index}.nachname`}>Nachname *</Label>
                <Input
                  id={`guests.${index}.nachname`}
                  {...register(`guests.${index}.nachname`)}
                  autoComplete={index === 0 ? "family-name" : "off"}
                />
                {errors.guests?.[index]?.nachname && (
                  <p className="text-red-600 text-xs">
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
          onCheckedChange={(checked) =>
            setValue("datenschutz", (checked === true) as true, {
              shouldValidate: true,
            })
          }
        />
        <Label
          htmlFor="datenschutz"
          className="text-sm leading-snug cursor-pointer"
        >
          Ich habe die{" "}
          <a
            href="/datenschutz"
            className="underline text-sage-700"
            target="_blank"
            rel="noopener"
          >
            Datenschutzhinweise
          </a>{" "}
          gelesen und stimme der Verarbeitung meiner Daten für die Veranstaltung
          zu. *
        </Label>
      </div>
      {errors.datenschutz && (
        <p className="text-red-600 text-xs -mt-3">
          {errors.datenschutz.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-sage-600 hover:bg-sage-700 text-white min-h-[44px]"
      >
        {isSubmitting ? "Wird gesendet…" : "Jetzt anmelden"}
      </Button>
    </form>
  );
}
