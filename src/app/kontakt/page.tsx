"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { PUBLIC_PAGE_WRAPPER_CLASS } from "@/lib/page-config";
import { Mail, MapPin } from "lucide-react";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function KontaktPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorMsg(json.error ?? "Ein Fehler ist aufgetreten.");
        setStatus("error");
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setErrorMsg("Netzwerkfehler. Bitte versuche es später erneut.");
      setStatus("error");
    }
  }

  return (
    <div className={PUBLIC_PAGE_WRAPPER_CLASS}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-20 bg-gradient-to-b from-cream-50/40 via-white to-white rounded-2xl"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-charcoal-800">
            Kontaktier uns
          </h1>
          <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
            Wir freuen uns auf deine Nachricht und sind für dich da.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-sand-200 shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal-800">
                  Kontaktinformationen
                </CardTitle>
                <CardDescription className="text-charcoal-600">
                  So kannst du uns erreichen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 text-charcoal-700 hover:text-sage-600 transition-colors"
                >
                  <Mail className="h-8 w-8 text-sage-500" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
                <div className="flex items-center gap-4 text-charcoal-700">
                  <MapPin className="h-8 w-8 text-sage-500" />
                  <span>Berlin, Deutschland</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border border-sand-200 shadow-md bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal-800">
                  Schreiben Sie uns
                </CardTitle>
                <CardDescription className="text-charcoal-600">
                  Wir melden uns so schnell wie möglich bei dir.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {status === "success" ? (
                  <div className="rounded-xl bg-sage-50 border border-sage-200 px-6 py-8 text-center space-y-2">
                    <p className="text-sage-700 font-semibold text-lg">
                      Nachricht gesendet!
                    </p>
                    <p className="text-charcoal-600 text-sm">
                      Vielen Dank – wir melden uns so bald wie möglich bei dir.
                    </p>
                    <button
                      onClick={() => setStatus("idle")}
                      className="mt-2 text-sm text-sage-600 underline underline-offset-2 hover:text-sage-800"
                    >
                      Weitere Nachricht senden
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                    <div>
                      <Label htmlFor="name" className="text-charcoal-800">
                        Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Dein Name"
                        className="mt-1 border-sand-300 focus:border-sage-500 focus:bg-sage-50 transition-colors duration-200"
                        {...register("name", { required: "Name ist erforderlich." })}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-charcoal-800">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="deine@email.de"
                        className="mt-1 border-sand-300 focus:border-sage-500 focus:bg-sage-50 transition-colors duration-200"
                        {...register("email", {
                          required: "E-Mail ist erforderlich.",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Bitte eine gültige E-Mail-Adresse eingeben.",
                          },
                        })}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="subject" className="text-charcoal-800">
                        Betreff
                      </Label>
                      <Input
                        id="subject"
                        placeholder="Betreff deiner Nachricht"
                        className="mt-1 border-sand-300 focus:border-sage-500 focus:bg-sage-50 transition-colors duration-200"
                        {...register("subject", { required: "Betreff ist erforderlich." })}
                      />
                      {errors.subject && (
                        <p className="mt-1 text-xs text-red-600">{errors.subject.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="message" className="text-charcoal-800">
                        Nachricht
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Deine Nachricht an uns..."
                        className="mt-1 border-sand-300 focus:border-sage-500 focus:bg-sage-50 transition-colors duration-200"
                        rows={5}
                        {...register("message", { required: "Nachricht ist erforderlich." })}
                      />
                      {errors.message && (
                        <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                      )}
                    </div>
                    {status === "error" && (
                      <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
                        {errorMsg}
                      </p>
                    )}
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full"
                        disabled={status === "loading"}
                      >
                        {status === "loading" ? "Wird gesendet…" : "Nachricht senden"}
                      </Button>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
