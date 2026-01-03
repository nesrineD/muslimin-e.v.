"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Heart,
  Users,
  Gift,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

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
    color: "from-emerald-50 to-emerald-100 hover:to-emerald-200",
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
    color: "from-sage-50 to-sage-100 hover:to-sage-200",
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
    color: "from-emerald-50 to-emerald-100 hover:to-emerald-200",
  },
];

export default function PublicLandingPage() {
  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/20 via-transparent to-sage-100/20" />

        <motion.div
          variants={itemVariants}
          className="max-w-5xl mx-auto text-center relative z-10"
        >
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-900 via-sage-800 to-emerald-900 bg-clip-text text-transparent">
            Muslimin e.V.
          </h1>

          <p className="text-2xl md:text-3xl text-sage-700 mb-8 font-light">
            Ein aktiver muslimischer Mädchen- und Frauenverein seit 2011
          </p>

          <p className="text-lg text-sage-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Wir schaffen Räume für Austausch, Wissensaustausch und gegenseitige
            Unterstützung. Entdecke unsere vielfältigen Angebote und werde Teil
            unserer Gemeinschaft.
          </p>

          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/mitglied-werden"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-sage-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow text-lg"
                >
                  Mitgliedschaft starten
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/spenden"
                  className="inline-flex w-full sm:w-auto items-center justify-center gap-3 px-8 py-4 bg-white text-emerald-700 border-2 border-emerald-200 rounded-lg font-semibold hover:shadow-lg transition-shadow text-lg"
                >
                  Jetzt spenden
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-sage-600">
              <Link href="/uber-uns" className="underline underline-offset-4">
                Mehr über uns
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link href="/impressum" className="underline underline-offset-4">
                Impressum
              </Link>
              <span className="hidden sm:inline">•</span>
              <Link
                href="/datenschutz"
                className="underline underline-offset-4"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Cards Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-emerald-900 mb-4 text-center">
            Erkunde unsere Angebote
          </h2>
          <p className="text-lg text-sage-600 text-center mb-16 max-w-2xl mx-auto">
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
                    className={`h-full p-8 rounded-xl bg-gradient-to-br ${card.color} border-2 border-emerald-200 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="text-emerald-700 flex-shrink-0">
                        {card.icon}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-emerald-900 mb-3">
                      {card.title}
                    </h3>

                    <p className="text-sage-700 mb-6 leading-relaxed">
                      {card.description}
                    </p>

                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      Entdecken
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-emerald-900 mb-6">
            Warum Muslimin e.V.?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                emoji: "💚",
                title: "Gemeinschaft",
                text: "Unterstützung und Zusammenhalt in einem sicheren Raum",
              },
              {
                emoji: "📚",
                title: "Bildung",
                text: "Wissensaustausch und kontinuierliche Fortbildung",
              },
              {
                emoji: "🤝",
                title: "Hilfe",
                text: "Beratung in psychologischen, sozialen und spirituellen Fragen",
              },
            ].map((highlight, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-lg bg-emerald-50 border border-emerald-200"
              >
                <p className="text-4xl mb-3">{highlight.emoji}</p>
                <h3 className="text-xl font-bold text-emerald-900 mb-2">
                  {highlight.title}
                </h3>
                <p className="text-sage-600">{highlight.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto bg-gradient-to-r from-emerald-600 to-sage-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Bereit, mehr zu erfahren?</h2>
          <p className="text-lg mb-8 opacity-90">
            Stöbere durch unsere Seiten und entdecke, wie du Teil unserer
            Gemeinschaft werden kannst.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/uber-uns"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Los geht&apos;s
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
}
