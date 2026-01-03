"use client";

import { motion } from "framer-motion";
import { Heart, Users } from "lucide-react";

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

interface DonationCampaign {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: React.ReactNode;
  goal?: string;
  impact?: string;
}

const donationCampaigns: DonationCampaign[] = [
  {
    id: "yemen-relief",
    title: "Jemen-Hilfe",
    description: "Unterstützung für die humanitäre Situation im Jemen",
    details: [
      "Medizinische Hilfe für Krankenhäuser",
      "Lebensmittelpakete für Familien",
      "Wasser- und Sanitärversorgung",
      "Bildungsprogramme für Kinder",
    ],
    icon: <Heart className="w-12 h-12" />,
    goal: "Damit du weißt, wie deine Spende verwendet wird",
    impact: "Jede Spende rettet Leben",
  },
  {
    id: "local-support",
    title: "Lokale Unterstützungsprogramme",
    description: "Hilfe für bedürftige Familien in Deutschland",
    details: [
      "Finanzielle Unterstützung bei Miete",
      "Hilfe bei Kinderbetreuung",
      "Bildungs- und Integrationsprogramme",
      "Mentoring für junge Frauen",
    ],
    icon: <Users className="w-12 h-12" />,
    goal: "Stärke die Gemeinschaft hier bei uns",
    impact: "Gemeinsam sind wir stark",
  },
];

export default function ProjektePage() {
  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-sage-800 mb-6">
            Unsere Projekte & Spendenaktionen
          </h1>
          <p className="text-xl text-warm-600">
            Unterstütze Projekte, die einen echten Unterschied machen
          </p>
        </motion.div>
      </section>

      {/* Donation Campaigns */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {donationCampaigns.map((campaign) => (
              <motion.div
                key={campaign.id}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                className="p-8 bg-white rounded-xl border-2 border-warm-200 hover:border-warm-400 hover:shadow-lg transition-all"
              >
                <div className="text-warm-600 mb-4">{campaign.icon}</div>

                <h2 className="text-2xl font-bold text-sage-800 mb-3">
                  {campaign.title}
                </h2>

                <p className="text-warm-600 mb-6">{campaign.description}</p>

                <div className="space-y-2 mb-6">
                  {campaign.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-warm-500 mt-1">✓</span>
                      <p className="text-warm-600">{detail}</p>
                    </div>
                  ))}
                </div>

                {campaign.goal && (
                  <div className="p-4 bg-warm-50 rounded-lg mb-4 border border-warm-200">
                    <p className="text-sm font-semibold text-sage-800">
                      💡 {campaign.goal}
                    </p>
                  </div>
                )}

                {campaign.impact && (
                  <p className="text-warm-600 font-semibold italic">
                    &ldquo;{campaign.impact}&rdquo;
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Transparency Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold text-sage-800 mb-6">
            Transparenz ist uns wichtig
          </h2>

          <p className="text-lg text-warm-600 mb-8 max-w-2xl mx-auto">
            Wir berichten regelmäßig über die Verwendung deiner Spenden. Alle
            Projekte werden dokumentiert und überprüft.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { label: "Spender weltweit", value: "500+" },
              { label: "Jährlich verteilte Mittel", value: "€100k+" },
              { label: "Transparenzbericht", value: "Jährlich" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 bg-sage-50 rounded-lg border border-sage-200"
              >
                <p className="text-3xl font-bold text-sage-800 mb-2">
                  {stat.value}
                </p>
                <p className="text-warm-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto bg-gradient-to-r from-sage-600 to-warm-600 rounded-2xl p-12 text-center text-white"
        >
          <h2 className="text-3xl font-bold mb-4">Möchtest du helfen?</h2>
          <p className="text-lg mb-8 opacity-90">
            Erfahre mehr über unsere Spendenmöglichkeiten
          </p>
          <a
            href="/spenden"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sage-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
          >
            Zu den Spendenmöglichkeiten
          </a>
        </motion.div>
      </section>
    </motion.main>
  );
}
