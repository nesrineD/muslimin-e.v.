"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Heart,
  ArrowRight,
  BookOpen,
  HeartHandshake,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicLandingContent } from "@/components/landing/PublicLandingContent";

// Member dashboard steps for booking
const bookingSteps = [
  {
    number: "1",
    title: "Anliegen auswählen",
    description:
      "Wähle dein Anliegen aus - psychologische Beratung, Sozialberatung oder Schwangerschaftsbegleitung",
    icon: <Heart className="w-5 h-5 text-clay-500" />,
  },
  {
    number: "2",
    title: "Termin finden",
    description:
      "Schaue dir die verfügbaren Zeiten an und wähle einen passenden Slot",
    icon: <Calendar className="w-5 h-5 text-clay-500" />,
  },
  {
    number: "3",
    title: "Termin buchen",
    description: "Bestätige deinen Termin und erhalte alle Details per E-Mail",
    icon: <BookOpen className="w-5 h-5 text-clay-500" />,
  },
];

// Member dashboard features
const memberFeatures = [
  {
    title: "Termin buchen",
    description:
      "Buche ganz einfach einen Beratungstermin in wenigen Schritten",
    href: "/book",
    icon: <Calendar className="w-8 h-8 text-coral-600" />,
    color:
      "bg-gradient-to-br from-coral-50 via-warm-50 to-coral-100 hover:from-coral-100 hover:to-warm-100",
  },
  {
    title: "Beratungsstellen finden",
    description: "Finde externe Beratungsstellen in deiner Nähe",
    href: "/beratungsstellen",
    icon: <MapPin className="w-8 h-8 text-sage-600" />,
    color:
      "bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100 hover:from-sage-100 hover:to-sage-200",
  },
  {
    title: "Helferin werden",
    description: "Möchtest du anderen helfen? Registriere dich als Helferin",
    href: "/helper/register",
    icon: <HeartHandshake className="w-12 h-12 text-clay-600" />,
    color:
      "bg-gradient-to-br from-clay-50 via-coral-50 to-clay-100 hover:from-clay-100 hover:to-coral-100",
  },
];

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // event_admin has no business on the member landing page — send to their dashboard
  useEffect(() => {
    if (!loading && user?.role === "event_admin") {
      router.replace("/admin/aschura");
    }
  }, [user, loading, router]);

  // Filter memberFeatures based on user status
  const filteredMemberFeatures = user
    ? memberFeatures.filter((feature) => {
        // Hide "Helferin werden" for users who are already helpers
        if (feature.title === "Helferin werden" && user.is_helper) {
          return false;
        }
        return true;
      })
    : memberFeatures;

  // No redirect needed — unauthenticated visitors see the public landing page

  // While auth is loading — or an event_admin is being redirected away —
  // show the spinner instead of flashing the member landing page
  if (loading || user?.role === "event_admin") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-coral-300 border-t-coral-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sage-700">Lade...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated visitors see the public landing page at the canonical URL
  if (!user) {
    return <PublicLandingContent />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100">
      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent mb-6">
            Salam{" "}
            <span className="bg-gradient-to-r from-clay-600 via-coral-600 to-warm-600 bg-clip-text text-transparent">
              {user.user_metadata?.vorname || "liebe Schwester"}
            </span>
            ! 👋
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Schön, dass du da bist! Hier kannst du ganz einfach einen
            Beratungstermin buchen, Beratungsstellen finden oder dich als
            Helferin registrieren.
          </p>
        </motion.div>

        {/* Member Actions */}
        <div
          className={`grid gap-8 ${filteredMemberFeatures.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3 max-w-6xl"} mx-auto mb-16`}
        >
          {filteredMemberFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <Link href={feature.href}>
                <Card
                  className={`border-0 shadow-md ${feature.color} backdrop-blur-sm hover:-translate-y-1 hover:shadow-xl transition-all duration-300 cursor-pointer h-full`}
                >
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-sage-800 group-hover:text-sage-900 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sage-600 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="flex items-center justify-center text-sage-500 group-hover:text-sage-700 transition-colors">
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Booking Steps */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-12">
            So buchst du einen Termin
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {bookingSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                className="text-center relative"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-coral-600 via-clay-600 to-warm-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
                    {step.number}
                  </div>
                  <div className="flex justify-center mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-sage-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sage-600 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
                {index < bookingSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-coral-300 via-clay-300 to-warm-300 transform translate-x-8" />
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="text-center mt-12"
          >
            <Button
              size="lg"
              variant="primary"
              className="shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/book">
                <Calendar className="mr-2 h-5 w-5" />
                Jetzt Termin buchen
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Community Support */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="max-w-4xl mx-auto mt-16"
        >
          <Card className="border-0 shadow-xl bg-gradient-to-br from-coral-50 via-warm-50 to-cream-50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-sage-800 via-coral-700 to-clay-700 bg-clip-text text-transparent">
                🤗 Von Mitgliedern für Mitglieder
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <p className="text-sage-700 leading-relaxed text-lg">
                Liebe Schwester, du bist nicht allein! 💕 Unsere wundervolle
                Gemeinschaft steht dir zur Seite, wann immer du Unterstützung
                brauchst. Egal ob du dir Sorgen machst, Fragen hast oder einfach
                jemanden zum Reden brauchst - wir sind für dich da.
              </p>
              <p className="text-sage-600 leading-relaxed">
                Hier findest du ein offenes Ohr, warme Herzen und Schwestern,
                die dich verstehen. Manchmal brauchen wir alle einen Moment der
                Stille, ein ermutigendes Wort oder einfach das Gefühl, gehört zu
                werden. Das ist völlig normal und okay!
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm pt-4">
                <div className="flex items-center gap-2 text-sage-600">
                  <div className="w-2 h-2 bg-clay-300 rounded-full"></div>
                  <span>Mit Liebe</span>
                </div>
                <div className="flex items-center gap-2 text-sage-600">
                  <div className="w-2 h-2 bg-clay-300 rounded-full"></div>
                  <span>Verständnisvoll</span>
                </div>
                <div className="flex items-center gap-2 text-sage-600">
                  <div className="w-2 h-2 bg-clay-300 rounded-full"></div>
                  <span>Herzlich willkommen</span>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-4 mt-6">
                <p className="text-sage-700 italic text-sm">
                  &quot;Manchmal ist das schönste Geschenk, das wir einander
                  machen können, einfach da zu sein und zuzuhören.&quot; 💖
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
