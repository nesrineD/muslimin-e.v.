"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  Heart,
  Users,
  Shield,
  Gift,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function MitgliedWerdenPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    vorname: "",
    nachname: "",
    email: "",
    telefon: "",
    geburtsdatum: "",
    standort: "",
    interessen: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Willkommen in unserer Schwesternschaft! 🌟",
      description:
        "Wir haben Ihre Anfrage erhalten und werden uns bald bei Ihnen melden.",
    });

    // Reset form
    setFormData({
      vorname: "",
      nachname: "",
      email: "",
      telefon: "",
      geburtsdatum: "",
      standort: "",
      interessen: "",
    });

    setIsSubmitting(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const benefits = [
    {
      icon: Heart,
      title: "Vertrauliche Beratung",
      description:
        "Zugang zu kostenloser, professioneller Beratung durch verifizierte Helferinnen",
      color: "text-coral-500",
    },
    {
      icon: Users,
      title: "Starke Gemeinschaft",
      description:
        "Verbindung zu über 50 Mitgliedern und Teilnahme an Veranstaltungen im Dienste von Ahl Albyt",
      color: "text-warm-500",
    },
    {
      icon: Shield,
      title: "Geschützter Raum",
      description:
        "Sichere und vertrauliche Atmosphäre für alle Gespräche und Beratungen",
      color: "text-sage-500",
    },
    {
      icon: Gift,
      title: "Kostenlos",
      description:
        "Alle Leistungen sind völlig kostenfrei - keine versteckten Gebühren",
      color: "text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Hero Section with Warm Invitation */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-8">
            <span className="bg-gradient-to-r from-sage-500 to-warm-500 bg-clip-text text-transparent">
              Willkommen, liebe Schwester!
            </span>
          </h1>

          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-2xl md:text-3xl text-warm-600 font-semibold leading-relaxed">
              💝 Werden Sie Teil unserer warmherzigen Schwesternschaft
            </p>

            <div className="bg-gradient-to-r from-coral-50 to-warm-50 rounded-2xl p-8 border border-coral-100">
              <p className="text-xl text-sage-700 leading-relaxed mb-6">
                <span className="text-2xl">🌸</span> Bei{" "}
                <strong>Muslimin e.V.</strong> finden Sie nicht nur
                Unterstützung, sondern echte Schwesternschaft. Hier sind Sie
                verstanden, geschätzt und niemals allein.
              </p>

              <p className="text-lg text-sage-600 leading-relaxed mb-4">
                Unsere Gemeinschaft ist ein Ort der Wärme, des Vertrauens und
                der gegenseitigen Stärkung. Hier können Sie authentisch sein,
                Ihre Sorgen teilen und Ihre Träume verfolgen.
              </p>

              <p className="text-lg text-warm-700 font-medium">
                <span className="text-xl">✨</span> Lassen Sie uns gemeinsam
                wachsen, lachen und uns gegenseitig inspirieren!
              </p>
            </div>

            <p className="text-lg text-sage-600">
              Füllen Sie einfach das Formular unten aus und beginnen Sie Ihre
              Reise mit uns. Wir freuen uns so sehr darauf, Sie kennenzulernen!
              🤗
            </p>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-12">
            Was Sie als Mitglied erwartet
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div key={index} variants={itemVariants} className="group">
                <Card className="h-full border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-sage-100 to-warm-100 mb-4 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className={`w-8 h-8 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-sage-800 mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-sage-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Membership Form */}
        <motion.div variants={itemVariants} id="mitglied-werden-form">
          <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-coral-400 to-warm-400 text-white">
                  <Sparkles className="w-10 h-10" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
                🌟 Ihre Mitgliedschaftsanfrage
              </CardTitle>
              <p className="text-lg text-sage-600 max-w-2xl mx-auto">
                Wir können es kaum erwarten, Sie in unserer Familie willkommen
                zu heißen! Teilen Sie uns etwas über sich mit – jede Geschichte
                ist einzigartig und wertvoll.
              </p>
            </CardHeader>
            <CardContent className="max-w-3xl mx-auto">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="vorname"
                      className="text-sage-700 font-semibold text-lg"
                    >
                      Vorname *
                    </Label>
                    <Input
                      id="vorname"
                      name="vorname"
                      value={formData.vorname}
                      onChange={handleInputChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 h-12 text-lg"
                      placeholder="Ihr schöner Vorname"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="nachname"
                      className="text-sage-700 font-semibold text-lg"
                    >
                      Nachname *
                    </Label>
                    <Input
                      id="nachname"
                      name="nachname"
                      value={formData.nachname}
                      onChange={handleInputChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 h-12 text-lg"
                      placeholder="Ihr Familienname"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sage-700 font-semibold text-lg"
                    >
                      E-Mail-Adresse *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 h-12 text-lg"
                      placeholder="ihre.email@example.com"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="telefon"
                      className="text-sage-700 font-semibold text-lg"
                    >
                      Telefonnummer (optional)
                    </Label>
                    <Input
                      id="telefon"
                      name="telefon"
                      type="tel"
                      value={formData.telefon}
                      onChange={handleInputChange}
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 h-12 text-lg"
                      placeholder="+49 123 456789"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="geburtsdatum"
                      className="text-sage-700 font-semibold text-lg"
                    >
                      Geburtsdatum *
                    </Label>
                    <Input
                      id="geburtsdatum"
                      name="geburtsdatum"
                      type="date"
                      value={formData.geburtsdatum}
                      onChange={handleInputChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 h-12 text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="standort"
                      className="text-sage-700 font-semibold text-lg"
                    >
                      Ihr Standort *
                    </Label>
                    <Input
                      id="standort"
                      name="standort"
                      value={formData.standort}
                      onChange={handleInputChange}
                      required
                      className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 h-12 text-lg"
                      placeholder="Ihre Stadt oder PLZ"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="interessen"
                    className="text-sage-700 font-semibold text-lg"
                  >
                    Was bewegt Sie? (Optional aber sehr willkommen! 💝)
                  </Label>
                  <Textarea
                    id="interessen"
                    name="interessen"
                    value={formData.interessen}
                    onChange={handleInputChange}
                    rows={5}
                    className="border-sage-200 focus:border-sage-500 focus:ring-sage-500 text-lg"
                    placeholder="Erzählen Sie uns gerne von sich: Was hat Sie zu uns geführt? Welche Bereiche interessieren Sie? Oder teilen Sie einfach mit, worauf Sie sich freuen... Wir hören zu! 🌸"
                  />
                </div>

                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-coral-500 to-warm-500 hover:from-coral-600 hover:to-warm-600 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Ihre Anfrage wird übermittelt... ✨
                      </div>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Heart className="w-6 h-6 mr-3" />
                        Ja, ich möchte dabei sein! 🌟
                      </span>
                    )}
                  </Button>

                  <div className="text-center mt-6 space-y-2">
                    <div className="flex items-center justify-center gap-3 text-sm text-sage-600">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Kostenlose Mitgliedschaft</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 text-sm text-sage-600">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>Antwort innerhalb von 2-3 Werktagen</span>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div variants={itemVariants} className="mt-20">
          <h2 className="text-3xl font-bold text-center text-sage-800 mb-12">
            Häufig gestellte Fragen
          </h2>
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-sage-800 mb-3 text-lg">
                  💝 Kostet die Mitgliedschaft etwas?
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  Nein, unsere Schwesternschaft ist völlig kostenfrei! Alle
                  Beratungsleistungen, Veranstaltungen und die Gemeinschaft sind
                  ein Geschenk für Sie.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-sage-800 mb-3 text-lg">
                  ⏰ Wie lange dauert die Bearbeitung?
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  Wir melden uns innerhalb von 2-3 Werktagen bei Ihnen. Wir
                  nehmen uns die Zeit, jede Anfrage persönlich zu prüfen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-sage-800 mb-3 text-lg">
                  🌸 Wer kann Mitglied werden?
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  Jede Frau, die Unterstützung sucht oder anderen helfen möchte,
                  ist herzlich willkommen – unabhängig von Herkunft oder
                  Lebenssituation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="font-bold text-sage-800 mb-3 text-lg">
                  🔒 Ist alles wirklich vertraulich?
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  Absolut! Ihre Privatsphäre ist uns heilig. Alle Gespräche sind
                  streng vertraulich und Ihre Daten werden nach höchsten
                  Standards geschützt.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
