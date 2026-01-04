"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, Instagram, Facebook } from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import { CONTACT_INFO, SOCIAL_LINKS, hasAnySocialLink } from "@/lib/constants";

export default function KontaktPage() {
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-800 rounded-full text-sm font-medium mb-6"
          >
            <Send className="w-4 h-4" />
            Kontakt
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sage-900 via-emerald-800 to-sage-900 bg-clip-text text-transparent">
            Wir sind für dich da
          </h1>

          <p className="text-xl text-sage-700 mb-8 max-w-3xl mx-auto leading-relaxed">
            Hast du Fragen zu unseren Angeboten, zur Mitgliedschaft oder
            möchtest du mehr über Muslimin e.V. erfahren? Wir freuen uns auf
            deine Nachricht!
          </p>
        </motion.div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Email */}
            <motion.div
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200 hover:border-emerald-400 transition-all shadow-md hover:shadow-lg"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <Mail className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-sage-800 mb-2">
                    E-Mail
                  </h3>
                  <p className="text-sage-600 mb-3">
                    Schreib uns eine E-Mail – wir antworten in der Regel
                    innerhalb von 48 Stunden.
                  </p>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 hover:gap-3 transition-all"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Social Media (Conditional) */}
            {hasAnySocialLink() && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-sage-50 to-sage-100 border-2 border-sage-200 hover:border-sage-400 transition-all shadow-md hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-sage-500 text-white flex items-center justify-center">
                    <Send className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-sage-800 mb-2">
                      Social Media
                    </h3>
                    <p className="text-sage-600 mb-4">
                      Folge uns für aktuelle Updates, Termine und inspirierende
                      Inhalte.
                    </p>
                    <div className="flex gap-3">
                      {SOCIAL_LINKS.instagram && (
                        <a
                          href={SOCIAL_LINKS.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 text-white flex items-center justify-center hover:scale-110 transition-transform"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-5 h-5" />
                        </a>
                      )}
                      {SOCIAL_LINKS.facebook && (
                        <a
                          href={SOCIAL_LINKS.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* WhatsApp (Conditional) */}
            {CONTACT_INFO.whatsappUrl && (
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 hover:border-green-400 transition-all shadow-md hover:shadow-lg"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-green-500 text-white flex items-center justify-center">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-sage-800 mb-2">
                      WhatsApp
                    </h3>
                    <p className="text-sage-600 mb-3">
                      Schnelle Rückfragen? Schreib uns direkt über WhatsApp.
                    </p>
                    <a
                      href={CONTACT_INFO.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 hover:gap-3 transition-all"
                    >
                      WhatsApp öffnen
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 rounded-xl bg-sage-50/50 border border-sage-200"
          >
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-sage-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-sage-800 mb-1">
                  Wichtiger Hinweis
                </h4>
                <p className="text-sage-600 text-sm leading-relaxed">
                  Alle Anfragen werden vertraulich behandelt. Für
                  Beratungstermine musst du Mitglied sein.{" "}
                  <Link
                    href="/mitglied-werden"
                    className="text-emerald-700 font-semibold hover:underline"
                  >
                    Hier kostenlos Mitglied werden →
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
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
            Noch nicht Mitglied?
          </h2>
          <p className="text-lg text-sage-600 mb-8 max-w-2xl mx-auto">
            Werde Teil unserer Gemeinschaft und erhalte Zugang zu allen
            Angeboten – kostenlos und unverbindlich.
          </p>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/mitglied-werden"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-sage-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all shadow-lg"
            >
              Jetzt kostenlos Mitglied werden
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </motion.main>
  );
}
