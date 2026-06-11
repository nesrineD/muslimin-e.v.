"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RegistrationData {
  id: string;
  vorname: string;
  nachname: string;
  anzahl_teilnehmer: number;
  email: string;
}

const reduceSchema = z.object({
  neue_anzahl: z
    .number()
    .int("Bitte gib eine ganze Zahl ein.")
    .min(1, "Mindestens 1 Teilnehmerin."),
});

type ReduceInput = z.infer<typeof reduceSchema>;

interface Props {
  token: string;
  registration: RegistrationData;
}

export function CancellationConfirmForm({ token, registration }: Props) {
  const [result, setResult] = useState<"full" | "reduce" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showReduce, setShowReduce] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReduceInput>({
    resolver: zodResolver(reduceSchema),
    defaultValues: {
      neue_anzahl:
        registration.anzahl_teilnehmer > 1
          ? registration.anzahl_teilnehmer - 1
          : 1,
    },
  });

  async function cancelFull() {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/events/ashura/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, action: "full" }),
    });
    setLoading(false);
    if (res.ok) {
      setResult("full");
    } else {
      const data = await res.json();
      setError(
        data.error ?? "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      );
    }
  }

  async function onReduce(data: ReduceInput) {
    setLoading(true);
    setError(null);
    const res = await fetch("/api/events/ashura/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        action: "reduce",
        neue_anzahl: data.neue_anzahl,
      }),
    });
    setLoading(false);
    if (res.ok) {
      setResult("reduce");
    } else {
      const responseData = await res.json();
      setError(
        responseData.error ??
          "Ein Fehler ist aufgetreten. Bitte versuche es erneut.",
      );
    }
  }

  if (result === "full") {
    return (
      <div className="rounded-xl bg-cream-50 border border-sage-200 p-6 text-center space-y-2">
        <p className="font-semibold text-charcoal-800">Anmeldung storniert.</p>
        <p className="text-sm text-charcoal-600">
          Deine gesamte Anmeldung wurde erfolgreich storniert. Eine Bestätigung
          wurde an <strong>{registration.email}</strong> gesendet.
        </p>
      </div>
    );
  }

  if (result === "reduce") {
    return (
      <div className="rounded-xl bg-cream-50 border border-sage-200 p-6 text-center space-y-2">
        <p className="font-semibold text-charcoal-800">Änderung gespeichert.</p>
        <p className="text-sm text-charcoal-600">
          Die Anzahl deiner Teilnehmerinnen wurde angepasst. Eine Bestätigung
          wurde an <strong>{registration.email}</strong> gesendet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current registration summary */}
      <div className="rounded-lg bg-cream-50 border border-sage-200 p-4 space-y-1 text-sm">
        <p className="text-charcoal-500 text-xs uppercase tracking-wide font-medium mb-2">
          Deine Anmeldung
        </p>
        <p className="text-charcoal-800">
          <strong>Name:</strong> {registration.vorname} {registration.nachname}
        </p>
        <p className="text-charcoal-800">
          <strong>E-Mail:</strong> {registration.email}
        </p>
        <p className="text-charcoal-800">
          <strong>Teilnehmerinnen:</strong> {registration.anzahl_teilnehmer}
        </p>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      {/* Option A: Full cancellation */}
      <Button
        onClick={cancelFull}
        disabled={loading}
        variant="default"
        className="w-full min-h-[44px] bg-red-600 hover:bg-red-700 text-white"
      >
        {loading ? "Wird verarbeitet…" : "Gesamte Anmeldung stornieren"}
      </Button>

      {/* Option B: Reduce count */}
      {!showReduce ? (
        <Button
          onClick={() => setShowReduce(true)}
          variant="outline"
          className="w-full min-h-[44px] border-sage-300 text-sage-700 hover:bg-sage-50"
          disabled={registration.anzahl_teilnehmer <= 1}
        >
          Anzahl der Teilnehmerinnen reduzieren
        </Button>
      ) : (
        <form onSubmit={handleSubmit(onReduce)} className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="neue_anzahl">Neue Anzahl der Teilnehmerinnen</Label>
            <Input
              id="neue_anzahl"
              type="number"
              min={1}
              max={registration.anzahl_teilnehmer - 1}
              {...register("neue_anzahl", { valueAsNumber: true })}
            />
            {errors.neue_anzahl && (
              <p className="text-red-600 text-xs">
                {errors.neue_anzahl.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-sage-600 hover:bg-sage-700 text-white min-h-[44px]"
          >
            {loading ? "Wird gespeichert…" : "Änderung bestätigen"}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full text-charcoal-500"
            onClick={() => setShowReduce(false)}
          >
            Abbrechen
          </Button>
        </form>
      )}
    </div>
  );
}
