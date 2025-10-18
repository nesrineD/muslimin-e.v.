"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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

// Member dashboard steps for booking
const bookingSteps = [
  {
    number: "1",
    title: "Anliegen auswählen",
    description:
      "Wähle dein Anliegen aus - psychologische Beratung, Sozialberatung oder Schwangerschaftsbegleitung",
    icon: <Heart className="w-5 h-5 text-warm-500" />,
  },
  {
    number: "2",
    title: "Termin finden",
    description:
      "Schaue dir die verfügbaren Zeiten an und wähle einen passenden Slot",
    icon: <Calendar className="w-5 h-5 text-warm-500" />,
  },
  {
    number: "3",
    title: "Termin buchen",
    description: "Bestätige deinen Termin und erhalte alle Details per E-Mail",
    icon: <BookOpen className="w-5 h-5 text-warm-500" />,
  },
];

// Member dashboard features
const memberFeatures = [
  {
    title: "Termin buchen",
    description:
      "Buche ganz einfach einen Beratungstermin in wenigen Schritten",
    href: "/book",
    icon: <Calendar className="w-8 h-8 text-warm-500" />,
    color: "bg-warm-50 hover:bg-warm-100",
  },
  {
    title: "Beratungsstellen finden",
    description: "Finde externe Beratungsstellen in deiner Nähe",
    href: "/beratungsstellen",
    icon: <MapPin className="w-8 h-8 text-sage-500" />,
    color: "bg-sage-50 hover:bg-sage-100",
  },
  {
    title: "Helferin werden",
    description: "Möchtest du anderen helfen? Registriere dich als Helferin",
    href: "/helper/register",
    icon: <HeartHandshake className="w-12 h-12 text-coral-500" />,
    color: "bg-coral-50 hover:bg-coral-100",
  },
];

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

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

  // Redirect non-members to about page
  useEffect(() => {
    if (!loading && !user) {
      router.push("/about");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-sage-300 border-t-sage-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sage-600">Lade...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to about page
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      {/* Welcome Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">
            Salam{" "}
            <span className="bg-gradient-to-r from-warm-500 to-coral-500 bg-clip-text text-transparent">
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
                  className={`border-0 shadow-xl ${feature.color} backdrop-blur-sm hover:shadow-2xl transition-all duration-300 group-hover:scale-105 cursor-pointer h-full`}
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
                  <div className="w-16 h-16 bg-gradient-to-r from-warm-500 to-coral-500 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-lg">
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
                  <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-warm-300 to-coral-300 transform translate-x-8" />
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
              className="bg-gradient-to-r from-warm-500 to-coral-500 hover:from-warm-600 hover:to-coral-600 text-white font-medium px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
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
          <Card className="border-0 shadow-xl bg-gradient-to-r from-sage-50 to-warm-50 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-sage-800">
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
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Mit Liebe</span>
                </div>
                <div className="flex items-center gap-2 text-sage-600">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Verständnisvoll</span>
                </div>
                <div className="flex items-center gap-2 text-sage-600">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <span>Herzlich willkommen</span>
                </div>
              </div>
              <div className="bg-white/70 rounded-lg p-4 mt-6">
                <p className="text-sage-700 italic text-sm">
                  "Manchmal ist das schönste Geschenk, das wir einander machen
                  können, einfach da zu sein und zuzuhören." 💖
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
