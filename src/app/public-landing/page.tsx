"use client";

import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  Heart,
  Users,
  Shield,
  Sparkles,
  CheckCircle,
  HeartHandshake,
} from "lucide-react";
import { containerVariants, itemVariants } from "@/lib/animations";
import { SocialMediaSection } from "@/components/SocialMediaSection";import { Button } from "@/components/ui/button";import { useState, useEffect, useCallback, useMemo } from "react";
import { debounce } from "@/lib/utils";

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
    color: "from-sage-50 via-sage-100 to-coral-50 hover:to-coral-100",
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Spenden",
    description: "Unterstütze unsere Arbeit mit einer Spende",
    href: "/spenden",
    color: "from-coral-50 via-sage-50 to-sage-100 hover:to-sage-200",
  },
  {
    icon: <Calendar className="w-12 h-12" />,
    title: "Veranstaltungen",
    description: "Entdecke unsere vielfältigen Veranstaltungen und Aktivitäten",
    href: "/veranstaltungen",
    color: "from-sand-50 via-cream-50 to-sage-50 hover:to-sage-100",
  },
  {
    icon: <BookOpen className="w-12 h-12" />,
    title: "Über uns",
    description:
      "Erfahre mehr über Muslimin e.V., unsere Geschichte und Philosophie",
    href: "/uber-uns",
    color: "from-sage-50 via-coral-50 to-sage-100 hover:to-sage-200",
  },
];

export default function PublicLandingPage() {
  const { scrollY } = useScroll();
  const [showStickyBar, setShowStickyBar] = useState(false);

  const handleScroll = useCallback((latest: number) => {
    setShowStickyBar((prev) => {
      const next = latest > 800;
      return prev === next ? prev : next;
    });
  }, []);

  // Debounce the scroll handler to reduce frequency of state updates
  // 100ms provides a good balance between responsiveness and performance
  const debouncedHandleScroll = useMemo(
    () => debounce(handleScroll, 100),
    [handleScroll]
  );

  useEffect(() => {
    const unsubscribe = scrollY.on("change", debouncedHandleScroll);
    
    // Cleanup: cancel any pending debounced calls and unsubscribe
    return () => {
      debouncedHandleScroll.cancel();
      unsubscribe();
    };
  }, [scrollY, debouncedHandleScroll]);

  return (
    <motion.main
      className="min-h-screen bg-gradient-to-br from-cream-50 via-sand-50 to-sage-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        {/* Sticky CTA Bar */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: showStickyBar ? 0 : 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-0 left-0 right-0 z-41 bg-gradient-to-r from-sage-600 to-charcoal-700 shadow-2xl"
        >
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <span className="text-white font-semibold text-sm md:text-base">
              💚 Werde jetzt Teil unserer Gemeinschaft!
            </span>
            <div className="flex gap-2">
              <Link
                href="/mitglied-werden"
                className="px-4 py-2 bg-transparent text-white border-2 border-white rounded-lg font-semibold text-sm hover:bg-white/10 transition-colors hidden sm:block"
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
        <section className="relative py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-100/30 via-coral-50/20 to-cream-100/30" />

          <motion.div
            variants={itemVariants}
            className="max-w-6xl mx-auto text-center relative z-10"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-coral-100 to-sage-100 text-charcoal-800 rounded-full text-sm font-medium mb-6 border border-coral-200"
            >
              <Shield className="w-4 h-4" />
              Gemeinnützig • DSGVO-konform • Seit 2011
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-charcoal-800 via-sage-700 to-coral-600 bg-clip-text text-transparent">
              Deine Schwesternschaft.
              <br />
              Deine Stärke im Glauben.
            </h1>

            <p className="text-xl md:text-2xl text-charcoal-700 mb-8 font-medium max-w-3xl mx-auto">
              Werde Teil einer lebendigen Gemeinschaft muslimischer Frauen. Wir
              fördern islamische Bildung, spirituelles Wachstum und den
              Zusammenhalt.
            </p>

            <p className="text-lg text-charcoal-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              🌟 Islamische Vorträge • Seminare • Begegnung
            </p>

            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="primary"
                    asChild
                  >
                    <Link href="/mitglied-werden" className="gap-3">
                      <Heart className="w-6 h-6" />
                      Mitglied werden
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                  >
                    <Link href="/spenden" className="gap-3">
                      <HeartHandshake className="w-6 h-6" />
                      Jetzt unterstützen
                    </Link>
                  </Button>
                </motion.div>
              </div>

              {/* Social Proof */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-700 pt-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-charcoal-600" />
                  <span className="font-medium">
                    Muslimische Frauen-Community
                  </span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-charcoal-600" />
                  <span className="font-medium">Islamische Weiterbildung</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* "Wer sind wir?" Section - Scannbare Bullet-Points (FR-005) */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-sand-50 via-white to-sage-50/30">
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
                className="text-3xl md:text-4xl font-bold mb-4 text-charcoal-800"
              >
                Wer sind wir?
              </motion.h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Eine Gemeinschaft, die Frauen stärkt und unterstützt –
                unabhängig davon, wo sie gerade stehen.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Für Frauen & Mädchen",
                  description:
                    "Unsere Angebote richten sich an muslimische Frauen, junge Mädchen und Mütter – ein sicherer Raum für Austausch und Wachstum",
                  color: "from-sage-50 via-coral-50 to-sage-100",
                },
                {
                  icon: <Heart className="w-6 h-6" />,
                  title: "Gemeinnützig & unabhängig",
                  description:
                    "Seit 2011 arbeiten wir gemeinnützig und setzen uns für Bildung und Gemeinschaft ein – mit vollem Herzen",
                  color: "from-coral-50 via-sage-50 to-coral-100",
                },
                {
                  icon: <HeartHandshake className="w-6 h-6" />,
                  title: "Von Schwestern für Schwestern",
                  description:
                    "Wir sind eine Schwesternschaft muslimischer Frauen, die sich im Geiste des Islam gegenseitig stärken, verstehen und unterstützen – authentisch und auf Augenhöhe",
                  color: "from-coral-50 via-sage-50 to-coral-100",
                },
                {
                  icon: <Sparkles className="w-6 h-6" />,
                  title: "Einheit in Vielfalt",
                  description:
                    "Mitglieder verschiedenster Herkünfte und Generationen – eine bunte Gemeinschaft, die zusammenwächst",
                  color: "from-sand-50 via-sage-50 to-sand-100",
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
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-coral-100 to-sage-200 flex items-center justify-center text-charcoal-700 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-charcoal-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-charcoal-700 leading-relaxed">
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
                href="/uber-uns"
                className="inline-flex items-center gap-2 text-coral-700 font-semibold hover:text-coral-800 hover:gap-3 transition-all"
              >
                Mehr über uns erfahren
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal-800 mb-4">
                Was erwartet dich als Mitglied?
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Deine Mitgliedschaft öffnet Türen zu einer starken Gemeinschaft
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Starke Gemeinschaft",
                  description:
                    "Vernetzung mit Schwestern, die dich verstehen und unterstützen",
                  color: "from-sand-50 via-sage-50 to-sand-100",
                  iconBg: "bg-gradient-to-br from-sage-600 to-coral-600",
                },
                {
                  icon: <BookOpen className="w-8 h-8" />,
                  title: "Bildungsangebote",
                  description:
                    "Workshops, Vorträge und Seminare zu spirituellen & gesellschaftlichen Themen",
                  color: "from-sage-50 via-coral-50 to-sage-100",
                  iconBg: "bg-gradient-to-br from-sage-600 to-coral-600",
                },
                {
                  icon: <Sparkles className="w-8 h-8" />,
                  title: "Events & Aktivitäten",
                  description:
                    "Regelmäßige Veranstaltungen – von Vorträgen bis zu Wohltätigkeitsaktionen",
                  color: "from-coral-50 via-sage-50 to-coral-100",
                  iconBg: "bg-gradient-to-br from-coral-600 to-sage-700",
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
                  <h3 className="text-xl font-bold text-charcoal-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-charcoal-700 leading-relaxed">
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
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sage-600 to-sage-700 text-white rounded-xl font-bold hover:shadow-xl transition-all text-lg"
              >
                Jetzt Mitglied werden
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Cards Section - Explore More */}
        <section className="py-20 md:py-24">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-charcoal-800 mb-4 text-center">
              Entdecke mehr über uns
            </h2>
            <p className="text-lg text-charcoal-700 text-center mb-12 max-w-2xl mx-auto">
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
                      className={`h-full p-8 rounded-xl bg-gradient-to-br ${card.color} border-2 border-sage-200 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl`}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="text-charcoal-600 flex-shrink-0">
                          {card.icon}
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-charcoal-800 mb-3">
                        {card.title}
                      </h3>

                      <p className="text-charcoal-700 mb-6 leading-relaxed">
                        {card.description}
                      </p>

                      <div className="flex items-center gap-2 text-charcoal-700 font-semibold">
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
        {/* Social Media Section - Prominently Placed */}
        <section className="py-16 bg-gradient-to-br from-sage-50 via-sand-50 to-sage-50">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-charcoal-800 mb-4">
                Folge uns auf Social Media! 📱
              </h2>
              <p className="text-lg text-charcoal-700 max-w-2xl mx-auto">
                Bleib auf dem Laufenden mit aktuellen Flyern, Terminen und
                Live-Updates
              </p>
            </div>
            <SocialMediaSection variant="compact" showTitle={false} />
          </motion.div>
        </section>
        {/* Final CTA Section */}
        <section className="py-20">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto bg-gradient-to-r from-sage-600 via-sage-700 to-sage-800 rounded-3xl p-12 text-center text-white shadow-2xl"
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
                Werde Teil einer Gemeinschaft, die dich versteht, unterstützt
                und stärkt. Gemeinsam sind wir stärker! 💚
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                  >
                    <Link href="/mitglied-werden" className="gap-2">
                      <Heart className="w-6 h-6" />
                      Mitglied werden
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    variant="secondary"
                    asChild
                  >
                    <Link href="/spenden" className="gap-2">
                      Jetzt spenden
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
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
      </div>
    </motion.main>
  );
}
