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
import { SocialMediaSection } from "@/components/SocialMediaSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect, useCallback, useMemo } from "react";
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
    color:
      "from-coral-50 via-cream-100 to-coral-100 hover:from-coral-100 hover:to-cream-100",
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Spenden",
    description: "Unterstütze unsere Arbeit mit einer Spende",
    href: "/spenden",
    color:
      "from-clay-50 via-coral-100 to-clay-100 hover:from-clay-100 hover:to-coral-100",
  },
  {
    icon: <Calendar className="w-12 h-12" />,
    title: "Veranstaltungen",
    description: "Entdecke unsere vielfältigen Veranstaltungen und Aktivitäten",
    href: "/veranstaltungen",
    color:
      "from-sand-50 via-coral-100 to-sand-100 hover:from-sand-100 hover:to-coral-100",
  },
  {
    icon: <BookOpen className="w-12 h-12" />,
    title: "Über uns",
    description:
      "Erfahre mehr über Muslimin e.V., unsere Geschichte und Philosophie",
    href: "/uber-uns",
    color:
      "from-sage-50 via-coral-100 to-sage-100 hover:from-sage-100 hover:to-coral-100",
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
      className="min-h-screen bg-gradient-to-br from-sage-50 via-cream-50 to-sand-50"
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
          className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-clay-700/95 to-coral-600/95 shadow-2xl border-t border-white/15"
        >
          <div className="container mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-white font-semibold text-sm md:text-base text-center sm:text-left">
              💚 Werde jetzt Teil unserer Gemeinschaft!
            </span>
            <div className="flex items-center justify-center sm:justify-end gap-2">
              <Button size="sm" variant="primary" asChild>
                <Link href="/mitglied-werden" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Mitglied werden
                </Link>
              </Button>
              <Button size="sm" variant="secondary" asChild>
                <Link href="/spenden" className="gap-2">
                  <HeartHandshake className="w-4 h-4" />
                  Jetzt unterstützen
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Hero Section */}
        <section className="relative py-20 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-sage-100/60 via-cream-100/40 to-sand-100/30" />

          <motion.div
            variants={itemVariants}
            className="max-w-6xl mx-auto text-center relative z-10"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sage-200 via-cream-200 to-sage-200 text-charcoal-900 rounded-full text-sm font-medium mb-6 border-2 border-sage-400 shadow-sm"
            >
              <Shield className="w-4 h-4 text-sage-800" />
              Ehrenamtlich • DSGVO-konform • Seit 2011
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
              Deine Schwesternschaft.
              <br />
              Deine Stärke im Glauben.
            </h1>

            <p className="text-xl md:text-2xl text-charcoal-800 mb-8 font-medium max-w-3xl mx-auto">
              Werde Teil einer lebendigen Gemeinschaft muslimischer Frauen. Wir
              fördern islamische Bildung, spirituelles Wachstum und den
              Zusammenhalt.
            </p>

            <p className="text-lg text-charcoal-800 mb-10 max-w-2xl mx-auto leading-relaxed">
              🌟 Islamische Vorträge • Seminare • Begegnung
            </p>

            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full sm:w-auto">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="primary" asChild>
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
                  <Button size="lg" variant="secondary" asChild>
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
                className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-800 pt-2"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-charcoal-800" />
                  <span className="font-medium">
                    Muslimische Frauen-Community
                  </span>
                </div>
                <span className="hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-charcoal-800" />
                  <span className="font-medium">Islamische Weiterbildung</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* "Wer sind wir?" Section - Scannbare Bullet-Points (FR-005) */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-coral-50">
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
                className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent"
              >
                Wer sind wir?
              </motion.h2>
              <p className="text-lg text-charcoal-800 max-w-2xl mx-auto">
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
                  title: "Ehrenamtlich & unabhängig",
                  description:
                    "Seit 2011 arbeiten wir ehrenamtlich und setzen uns für Bildung und Gemeinschaft ein – mit vollem Herzen",
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
                >
                  <Card
                    variant="cream"
                    className="h-full hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-coral-200"
                  >
                    <CardContent className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-coral-500 to-clay-600 flex items-center justify-center text-white shadow-md">
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
                    </CardContent>
                  </Card>
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
              <Button variant="secondary" asChild>
                <Link href="/uber-uns" className="gap-2">
                  Mehr über uns erfahren
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20 bg-gradient-to-br from-sand-50 via-coral-50 to-cream-50">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
                Was erwartet dich als Mitglied?
              </h2>
              <p className="text-lg text-charcoal-800 max-w-2xl mx-auto">
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
                  whileHover={{ y: -4 }}
                >
                  <Card
                    variant="cream"
                    className="h-full border-2 border-transparent hover:border-coral-300 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    <CardContent className="space-y-4">
                      <div
                        className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${benefit.iconBg} text-white shadow-lg`}
                      >
                        {benefit.icon}
                      </div>
                      <h3 className="text-xl font-bold text-charcoal-800">
                        {benefit.title}
                      </h3>
                      <p className="text-charcoal-700 leading-relaxed">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
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
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" variant="primary" asChild>
                  <Link href="/mitglied-werden" className="gap-3">
                    Jetzt Mitglied werden
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* CTA Cards Section - Explore More */}
        <section className="py-20 md:py-24 bg-gradient-to-br from-sage-50 via-cream-50 to-sand-50">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
              Entdecke mehr über uns
            </h2>
            <p className="text-lg text-charcoal-800 text-center mb-12 max-w-2xl mx-auto">
              Wähle einen Bereich, der dich interessiert
            </p>

            <div className="rounded-3xl border border-sage-200/60 bg-white/30 p-6 sm:p-8">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                {ctaCards.map((card) => (
                  <motion.div
                    key={card.title}
                    variants={itemVariants}
                    className="h-full"
                    whileHover={{ y: -4 }}
                  >
                    <Link
                      href={card.href}
                      className="h-full block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-2"
                    >
                      <Card
                        variant="cream"
                        className="h-full cursor-pointer transition-all duration-300 border-2 border-transparent hover:border-coral-200 hover:shadow-xl"
                      >
                        <CardContent className="space-y-4 h-full flex flex-col">
                          <div className="flex items-start gap-4">
                            <div className="text-coral-700 flex-shrink-0">
                              {card.icon}
                            </div>
                          </div>

                          <h3 className="text-2xl font-bold text-charcoal-800">
                            {card.title}
                          </h3>

                          <p className="text-charcoal-800 leading-relaxed flex-1">
                            {card.description}
                          </p>

                          <div className="flex items-center gap-2 text-charcoal-800 font-semibold pt-4">
                            Mehr erfahren
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>
        {/* Social Media Section - Prominently Placed */}
        <section className="py-16 px-4">
          <motion.div variants={itemVariants} className="max-w-6xl mx-auto">
            <div className="py-12 px-6 sm:px-8 bg-gradient-to-br from-sage-50 via-cream-50 to-sage-100/80 rounded-2xl shadow-lg border-2 border-sage-200">
              <SocialMediaSection
                variant="compact"
                showTitle={true}
                title="Folge uns auf Social Media! 📱"
                subtitle="Bleib auf dem Laufenden mit aktuellen Flyern, Terminen und Live-Updates"
              />
            </div>
          </motion.div>
        </section>
        {/* Final CTA Section */}
        <section className="py-20 bg-gradient-to-br from-sage-50 via-cream-50 to-coral-50">
          <motion.div
            variants={itemVariants}
            className="max-w-4xl mx-auto bg-gradient-to-br from-cream-100 via-sage-50 to-coral-100 rounded-3xl p-12 text-center shadow-2xl border-2 border-sage-200"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sage-700 via-sage-600 to-sage-700 bg-clip-text text-transparent">
                Bereit für den nächsten Schritt?
              </h2>
              <p className="text-xl mb-8 text-charcoal-800 max-w-2xl mx-auto leading-relaxed">
                Werde Teil einer Gemeinschaft, die dich versteht, unterstützt
                und stärkt. Gemeinsam sind wir stärker! 💚
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" variant="primary" asChild>
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
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/spenden" className="gap-3">
                      <HeartHandshake className="w-6 h-6" />
                      Jetzt unterstützen
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Button>
                </motion.div>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-charcoal-800 mt-8">
                <Link
                  href="/uber-uns"
                  className="underline underline-offset-4 hover:text-charcoal-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
                >
                  Mehr über uns
                </Link>
                <span>•</span>
                <Link
                  href="/impressum"
                  className="underline underline-offset-4 hover:text-charcoal-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
                >
                  Impressum
                </Link>
                <span>•</span>
                <Link
                  href="/datenschutz"
                  className="underline underline-offset-4 hover:text-charcoal-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage focus-visible:outline-offset-4 rounded"
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
