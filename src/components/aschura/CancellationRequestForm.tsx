"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  cancelRequestSchema,
  type CancelRequestInput,
} from "@/lib/validations/aschura";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CancellationRequestForm() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CancelRequestInput>({
    resolver: zodResolver(cancelRequestSchema),
  });

  async function onSubmit(data: CancelRequestInput) {
    await fetch("/api/events/aschura/cancel-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // Always show neutral message regardless of result (DSGVO)
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl bg-cream-50 border border-sage-200 p-6 text-center">
        <p className="text-charcoal-700 text-sm">
          Falls eine Anmeldung mit dieser E-Mail-Adresse vorliegt, erhältst du
          in Kürze eine E-Mail mit einem Stornierungslink. Bitte prüfe auch
          deinen Spam-Ordner.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="space-y-1">
        <Label htmlFor="email">E-Mail-Adresse deiner Anmeldung *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          autoComplete="email"
          placeholder="deine@email.de"
        />
        {errors.email && (
          <p className="text-red-600 text-xs">{errors.email.message}</p>
        )}
      </div>

      <Button
        variant="default"
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] w-full border-0 bg-red-950 text-white hover:bg-red-900 active:bg-red-950 focus-visible:outline-red-300"
      >
        {isSubmitting ? "Wird gesendet…" : "Stornierungslink anfordern"}
      </Button>
    </form>
  );
}
