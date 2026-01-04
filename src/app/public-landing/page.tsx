"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Heart,
  Users,
  Gift,
  Shield,
  Sparkles,
  CheckCircle,
  TrendingUp,
  HeartHandshake,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { useState, useEffect } from "react";

interface CTACard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  color: string;
}

const ctaCards: CTACard[] = [
  {
    icon: <Heart className="w-12 h-12" />,
    title: "Mitglied werden",
    description:
      "Werde Teil unserer Gemeinschaft und unterstütze unsere Mission",
    href: "/mitglied-werden",
    color: "from-coral-50 to-coral-100 hover:to-coral-200",
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Spenden",
    description: "Unterstütze unsere Arbeit mit einer Spende",
    href: "/spenden",
    color: "from-sage-50 to-sage-100 hover:to-sage-200",
  },
  {
    icon: <Calendar className="w-12 h-12" />,
    title: "Veranstaltungen",
    description: "Entdecke unsere vielfältigen Veranstaltungen und Aktivitäten",
    href: "/veranstaltungen",
    color: "from-cream-50 to-cream-100 hover:to-cream-200",
  },
  {
    icon: <Gift className="w-12 h-12" />,
    title: "Projekte",
    description:
      "Unterstütze unsere aktuellen Spendenaktionen und Hilfsprojekte",
    href: "/projekte",
    color: "from-warm-50 to-warm-100 hover:to-warm-200",
  },
  {
    icon: <BookOpen className="w-12 h-12" />,
    title: "Über uns",
    description:
      "Erfahre mehr über Muslimin e.V., unsere Geschichte und Philosophie",
    href: "/uber-uns",
    color: "from-sage-50 to-sage-100 hover:to-sage-200",
  },
];

export default function PublicLandingPage() {
  const { scrollY } = useScroll();
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setShowStickyBar(latest > 800);
    });
  }, [scrollY]);

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Sticky CTA Bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: showStickyBar ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-sage-600 to-charcoal-700 shadow-xl"
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <span className="text-white font-semibold text-sm md:text-base">
            💚 Werde jetzt Teil unserer Gemeinschaft!
          </span>
          <div className="flex gap-2">
            <Link
              href="/mitglied-werden"
              className="px-4 py-2 bg-white text-sage-700 rounded-lg font-semibold text-sm hover:bg-cream-100 transition-colors"
            >
              Mitglied werden
            </Link>
            <Link
              href="/spenden"
              className="px-4 py-2 bg-transparent text-white border-2 border-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors hidden sm:block"
            >
              Spenden
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100/20 via-transparent to-cream-100/20" />

        <motion.div
          variants={itemVariants}
          className="max-w-6xl mx-auto text-center relative z-10"
        >
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-800 rounded-full text-sm font-medium mb-6"
          >
            <Shield className="w-4 h-4" />
            Gemeinnützig • DSGVO-konform • Seit 2011
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-charcoal-800 via-sage-700 to-coral-700 bg-clip-text text-transparent">
            Deine Schwesternschaft.
            <br />
            Deine Stärke.
          </h1>

          <p className="text-xl md:text-2xl text-sage-700 mb-8 font-medium max-w-3xl mx-auto">
            Werde Teil einer wachsenden Gemeinschaft von über 200+ Frauen, die
            sich gegenseitig unterstützen, inspirieren und stärken.
          </p>

          <p className="text-lg text-sage-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            🌟 Kostenlose Mitgliedschaft • Professionelle Beratung •
            Bildungsangebote • Spirituelles Wachstum
          </p>

          <div className="flex flex-col items-center gap-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/mitglied-werden"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-10 py-5 bg-gradient-to-r from-sage-600 to-coral-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all text-lg shadow-lg"
                >
                  <Heart className="w-6 h-6" />
                  Kostenlos Mitglied werden
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/spenden"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-10 py-5 bg-white text-coral-700 border-2 border-coral-300 rounded-xl font-bold hover:shadow-2xl transition-all text-lg shadow-md hover:bg-coral-50"
                >
                  <HeartHandshake className="w-6 h-6" />
                  Jetzt unterstützen
                </Link>
              </motion.div>
            </div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-4 text-sm text-sage-600 pt-2"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-coral-600" />
                <span className="font-medium">200+ aktive Mitglieder</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-coral-600" />
                <span className="font-medium">50+ Veranstaltungen/Jahr</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-coral-600" />
                <span className="font-medium">100% kostenlos</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* "Wer sind wir?" Section - Scannbare Bullet-Points (FR-005) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-cream-50 via-white to-sage-50/30">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4 text-sage-800"
            >
              Wer sind wir?
            </motion.h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Eine Gemeinschaft, die Frauen stärkt und unterstützt – unabhängig
              davon, wo sie gerade stehen.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: <Users className="w-6 h-6" />,
                title: "Für Frauen & Mädchen",
                description:
                  "Unsere Angebote richten sich an muslimische Frauen, junge Mädchen und Mütter – ein sicherer Raum für Austausch und Wachstum",
                color: "from-sage-50 to-sage-100",
              },
              {
                icon: <Heart className="w-6 h-6" />,
                title: "Gemeinnützig & unabhängig",
                description:
                  "Seit 2011 arbeiten wir gemeinnützig und setzen uns für Bildung, Beratung und Gemeinschaft ein – mit vollem Herzen",
                color: "from-sage-50 to-sage-100",
              },
              {
                icon: <Shield className="w-6 h-6" />,
                title: "Vertraulich & professionell",
                description:
                  "Alle Beratungen erfolgen diskret, DSGVO-konform und durch verifizierte Helferinnen – deine Privatsphäre ist uns wichtig",
                color: "from-warm-50 to-warm-100",
              },
              {
                icon: <HeartHandshake className="w-6 h-6" />,
                title: "Von Schwestern für Schwestern",
                description:
                  "Wir sind ein Netzwerk von Frauen, die sich gegenseitig stärken, verstehen und unterstützen – authentisch und auf Augenhöhe",
                color: "from-coral-50 to-coral-100",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`p-6 rounded-xl bg-gradient-to-br ${item.color} border border-sage-200/50 hover:shadow-lg transition-all duration-300`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/80 flex items-center justify-center text-sage-700">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-sage-800 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sage-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-coral-700 font-semibold hover:text-coral-800 hover:gap-3 transition-all"
            >
              Mehr über uns erfahren
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Social Media Section - Prominently Placed */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-sage-50/30 to-white">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="bg-gradient-to-r from-charcoal-800 via-sage-700 to-coral-700 bg-clip-text text-transparent">
                Folge uns & bleib verbunden! 📱
              </span>
            </motion.h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Aktuelle Flyer, Termine, Live-Updates und inspirierende Inhalte –
              täglich auf unseren Social-Media-Kanälen
            </p>
          </div>
          <SocialMediaSection variant="compact" showTitle={false} />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-800 mb-4">
              Was erwartet dich als Mitglied?
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Deine kostenlose Mitgliedschaft öffnet Türen zu einer starken
              Gemeinschaft
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Kostenlose Beratung",
                description:
                  "Professionelle psychologische & soziale Beratung von verifizierten Helferinnen",
                color: "from-pink-50 to-pink-100",
                iconBg: "bg-pink-500",
              },
              {
                icon: <BookOpen className="w-8 h-8" />,
                title: "Bildungsangebote",
                description:
                  "Workshops, Vorträge und Seminare zu spirituellen & gesellschaftlichen Themen",
                color: "from-purple-50 to-purple-100",
                iconBg: "bg-purple-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Starke Gemeinschaft",
                description:
                  "Vernetzung mit Schwestern, die dich verstehen und unterstützen",
                color: "from-emerald-50 to-emerald-100",
                iconBg: "bg-emerald-500",
              },
              {
                icon: <Sparkles className="w-8 h-8" />,
                title: "Events & Aktivitäten",
                description:
                  "Über 50 Veranstaltungen pro Jahr – von Vorträgen bis zu Wohltätigkeitsaktionen",
                color: "from-amber-50 to-amber-100",
                iconBg: "bg-amber-500",
              },
            ].map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className={`p-6 rounded-2xl bg-gradient-to-br ${benefit.color} border-2 border-transparent hover:border-coral-300 transition-all duration-300 shadow-md hover:shadow-xl`}
              >
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${benefit.iconBg} text-white mb-4`}
                >
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-sage-800 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sage-600 leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center mt-10"
          >
            <Link
              href="/mitglied-werden"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sage-600 to-coral-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg"
            >
              Jetzt kostenlos Mitglied werden
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Donation Impact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sage-100/40 via-white to-cream-50/30">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal-800 mb-4">
              Deine Spende bewirkt Großes 💚
            </h2>
            <p className="text-lg text-sage-600 max-w-2xl mx-auto">
              Jeder Beitrag hilft uns, unsere Mission zu erfüllen und Frauen in
              Not zu unterstützen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                amount: "10€",
                impact: "Bildungsmaterial für ein Kind",
                icon: <BookOpen className="w-6 h-6" />,
              },
              {
                amount: "25€",
                impact: "Medizinische Versorgung für 1 Person",
                icon: <Heart className="w-6 h-6" />,
              },
              {
                amount: "50€",
                impact: "Workshop für 10 Teilnehmerinnen",
                icon: <Users className="w-6 h-6" />,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-2xl bg-white border-2 border-coral-200 hover:border-coral-400 transition-all shadow-lg text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-coral-100 text-coral-600 mb-4">
                  {item.icon}
                </div>
                <p className="text-4xl font-bold text-coral-600 mb-2">
                  {item.amount}
                </p>
                <p className="text-sage-600 leading-relaxed">{item.impact}</p>
              </motion.div>
            ))}
          </div>

          {/* Donation Goal Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-xl border-2 border-coral-200 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-sage-800 mb-1">
                  Monatliches Spendenziel
                </h3>
                <p className="text-sage-600">
                  Für laufende Projekte und Veranstaltungen
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-coral-600">2.450€</p>
                <p className="text-sm text-sage-500">von 5.000€</p>
              </div>
            </div>
            <div className="w-full bg-sage-100 rounded-full h-4 mb-2">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "49%" }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-gradient-to-r from-coral-500 to-sage-500 h-4 rounded-full flex items-center justify-end pr-2"
              >
                <TrendingUp className="w-3 h-3 text-white" />
              </motion.div>
            </div>
            <p className="text-sm text-sage-500">
              49% erreicht • 2.550€ bis zum Ziel
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center"
          >
            <Link
              href="/spenden"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sage-600 to-sage-600 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg"
            >
              <HeartHandshake className="w-6 h-6" />
              Jetzt spenden & helfen
              <ArrowRight className="w-5 h-5" />
            </Link>
            <p className="text-sm text-sage-500 mt-3">
              100% deiner Spende kommt an • Gemeinnützig anerkannt
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* CTA Cards Section - Explore More */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-charcoal-800 mb-4 text-center">
            Entdecke mehr über uns
          </h2>
          <p className="text-lg text-sage-600 text-center mb-12 max-w-2xl mx-auto">
            Wähle einen Bereich, der dich interessiert
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {ctaCards.map((card) => (
              <motion.div
                key={card.title}
                variants={itemVariants}
                className="h-full"
              >
                <Link href={card.href} className="h-full block">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className={`h-full p-8 rounded-xl bg-gradient-to-br ${card.color} border-2 border-coral-200 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-coral-600 flex-shrink-0">
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                      {card.title}
                    </h3>

                    <p className="text-sage-700 mb-6 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="flex items-center gap-2 text-coral-600 font-semibold">
                      Mehr erfahren
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-cream-50/30 to-white">
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-charcoal-800 mb-4">
              Häufig gestellte Fragen
            </h2>
            <p className="text-lg text-sage-600">
              Hier findest du Antworten auf die wichtigsten Fragen
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "Ist die Mitgliedschaft wirklich kostenlos?",
                answer:
                  "Ja, absolut! Unsere Mitgliedschaft ist komplett kostenfrei. Du erhältst vollen Zugang zu allen Veranstaltungen, Beratungsangeboten und der Gemeinschaft ohne jegliche Gebühren.",
                icon: <CheckCircle className="w-6 h-6 text-coral-600" />,
              },
              {
                question: "Wie werden meine Spenden verwendet?",
                answer:
                  "80% deiner Spende fließen direkt in Hilfsprojekte, 15% in Verwaltung und 5% in Fundraising. Wir sind gemeinnützig anerkannt und veröffentlichen jährliche Transparenzberichte.",
                icon: <Shield className="w-6 h-6 text-coral-600" />,
              },
              {
                question: "Welche Vorteile habe ich als Mitglied?",
                answer:
                  "Als Mitglied erhältst du kostenlose psychologische & soziale Beratung, Zugang zu Bildungsangeboten, Events und einer starken Schwesternschaft, die dich versteht und unterstützt.",
                icon: <Heart className="w-6 h-6 text-coral-600" />,
              },
              {
                question: "Wie kann ich aktiv mitwirken?",
                answer:
                  "Du kannst als aktives Mitglied an der Vereinsarbeit teilnehmen, eigene Projekte initiieren, als Helferin Beratung anbieten oder einfach bei Events und Veranstaltungen dabei sein.",
                icon: <Users className="w-6 h-6 text-coral-600" />,
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="p-6 rounded-xl bg-white border-2 border-sage-200 hover:border-coral-300 transition-all shadow-md"
              >
                <div className="flex items-start gap-3 mb-3">
                  {faq.icon}
                  <h3 className="text-lg font-bold text-sage-800">
                    {faq.question}
                  </h3>
                </div>
                <p className="text-sage-600 leading-relaxed pl-9">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-gradient-to-r from-sage-600 via-sage-600 to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Bereit für den nächsten Schritt?
            </h2>
            <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto">
              Werde Teil einer Gemeinschaft, die dich versteht, unterstützt und
              stärkt. Gemeinsam sind wir stärker! 💚
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/mitglied-werden"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-coral-600 rounded-xl font-bold hover:shadow-2xl transition-all text-lg"
                >
                  <Heart className="w-6 h-6" />
                  Kostenlos Mitglied werden
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/spenden"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white rounded-xl font-bold hover:bg-white/10 transition-all text-lg"
                >
                  Jetzt spenden
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-90 mt-8">
              <Link
                href="/uber-uns"
                className="underline underline-offset-4 hover:opacity-100"
              >
                Mehr über uns
              </Link>
              <span>•</span>
              <Link
                href="/impressum"
                className="underline underline-offset-4 hover:opacity-100"
              >
                Impressum
              </Link>
              <span>•</span>
              <Link
                href="/datenschutz"
                className="underline underline-offset-4 hover:opacity-100"
              >
                Datenschutz
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
}
