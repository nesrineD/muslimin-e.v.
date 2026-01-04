"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Gift,
  ArrowRight,
  Users,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";

interface OfferingCard {
  icon: React.ReactNode;
  title: string;
  nutzen: string;
  zielgruppe: string;
  href: string;
  color: string;
  iconBg: string;
}

const offerings: OfferingCard[] = [
  {
    icon: <Calendar className="w-8 h-8" />,
    title: "Veranstaltungen",
    nutzen:
      "Inspirierende Vorträge, Workshops und Seminare zu spirituellen und gesellschaftlichen Themen",
    zielgruppe: "Für alle Mitglieder und Interessierte",
    href: "/veranstaltungen",
    color: "from-purple-50 to-purple-100",
    iconBg: "bg-purple-500",
  },
  {
    icon: <Gift className="w-8 h-8" />,
    title: "Projekte & Spendenaktionen",
    nutzen:
      "Aktive Teilnahme an Wohltätigkeitsprojekten und Hilfsinitiativen für Bedürftige",
    zielgruppe: "Für engagierte Mitglieder und Unterstützer",
    href: "/projekte",
    color: "from-amber-50 to-amber-100",
    iconBg: "bg-amber-500",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Beratungsangebote",
    nutzen:
      "Professionelle psychologische und soziale Beratung von verifizierten Helferinnen (nur für Mitglieder)",
    zielgruppe: "Für Vereinsmitglieder",
    href: "/book",
    color: "from-emerald-50 to-emerald-100",
    iconBg: "bg-emerald-500",
  },
];

export default function AngebotePage() {
  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-100/20 via-transparent to-emerald-100/20" />

        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-800 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Unsere Angebote
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sage-900 via-emerald-800 to-sage-900 bg-clip-text text-transparent">
            Was wir anbieten
          </h1>

          <p className="text-xl text-sage-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Von Bildungsveranstaltungen über Wohltätigkeitsprojekte bis hin zu
            professioneller Beratung – entdecke die vielfältigen Möglichkeiten,
            Teil unserer Gemeinschaft zu werden.
          </p>
        </motion.div>
      </section>

      {/* Offerings Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerings.map((offering, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link
                  href={offering.href}
                  className={`block h-full p-8 rounded-2xl bg-gradient-to-br ${offering.color} border-2 border-transparent hover:border-emerald-300 transition-all duration-300 shadow-md hover:shadow-xl`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-xl ${offering.iconBg} text-white mb-6`}
                  >
                    {offering.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-sage-800 mb-4 group-hover:text-emerald-700 transition-colors">
                    {offering.title}
                  </h3>

                  {/* Nutzen */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1">
                      Was bekomme ich?
                    </p>
                    <p className="text-sage-700 leading-relaxed">
                      {offering.nutzen}
                    </p>
                  </div>

                  {/* Zielgruppe */}
                  <div className="mb-6">
                    <p className="text-xs font-semibold text-sage-500 uppercase tracking-wide mb-1">
                      Für wen?
                    </p>
                    <p className="text-sage-600 font-medium">
                      {offering.zielgruppe}
                    </p>
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-emerald-700 font-semibold group-hover:gap-3 transition-all">
                    <span>Mehr erfahren</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-emerald-50 via-sage-50 to-cream-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-sage-800 mb-4">
            Bereit, aktiv zu werden?
          </h2>
          <p className="text-lg text-sage-600 mb-8 max-w-2xl mx-auto">
            Werde Mitglied und profitiere von allen Angeboten – kostenlos und
            unverbindlich.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/mitglied-werden"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-sage-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg"
              >
                <BookOpen className="w-5 h-5" />
                Jetzt Mitglied werden
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/spenden"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-emerald-700 border-2 border-emerald-300 rounded-xl font-bold hover:shadow-2xl transition-all shadow-md hover:bg-emerald-50"
              >
                <Gift className="w-5 h-5" />
                Unterstützen
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </motion.main>
  );
}
