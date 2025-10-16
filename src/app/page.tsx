"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Clock,
  Shield,
  Users,
  Calendar,
  Heart,
  MessageCircle,
  Star,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  TrendingUp,
  UserCheck,
  Video,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const features = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Schnelle Terminbuchung",
    description:
      "Termine in wenigen Klicks buchen. Automatische Zuweisung zu verfügbaren Helferinnen.",
    color: "bg-stone-100 text-stone-600",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Sichere Beratung",
    description:
      "DSGVO-konforme Datenverarbeitung und verschlüsselte Video-Gespräche.",
    color: "bg-sage-100 text-sage-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Fachkundige Helferinnen",
    description:
      "Qualifizierte Beratung in Psychologie, Sozialarbeit und Schwangerschaftsbegleitung.",
    color: "bg-slate-100 text-slate-600",
  },
];

const stats = [
  {
    label: "Erfolgreiche Beratungen",
    value: "500+",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    label: "Zufriedene Mitglieder",
    value: "98%",
    icon: <Star className="w-5 h-5" />,
  },
  {
    label: "Qualifizierte Helferinnen",
    value: "50+",
    icon: <Award className="w-5 h-5" />,
  },
];

const testimonials = [
  {
    text: "Die Beratung war genau das, was ich brauchte. Schnell, professionell und einfühlsam.",
    name: "Zahra M.",
    role: "Vereinsmitglied",
  },
  {
    text: "Als Helferin freue ich mich, anderen Frauen in schwierigen Situationen helfen zu können.",
    name: "Sainab H.",
    role: "Beraterin",
  },
  {
    text: "Ich kann sowohl als Mitglied Hilfe erhalten als auch anderen helfen. Das System ist perfekt.",
    name: "Fatima H.",
    role: "Mitglied & Helferin",
  },
];

export default function Home() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [statsRef, statsInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [featuresRef, featuresInView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Layout>
      {/* Hero Section with animated background */}
      <div className="relative overflow-hidden bg-warm-50">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-warm-300 rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cream-200 rounded-full blur-3xl"
          />
        </div>

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Badge
                variant="secondary"
                className="mb-4 px-4 py-2 text-sm font-medium"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Professionelle Beratung für Vereinsmitglieder
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight"
            >
              Professionelle Beratung
              <span className="block text-sage-700">für Vereinsmitglieder</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Schnelle, vertrauliche Beratung für alle Anliegen. Nur für
              verifizierte Vereinsmitglieder. Terminbuchung für
              Video-Sprechstunden in wenigen Klicks.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="text-lg px-8 py-4 h-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/login">
                    Anmelden
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-4 h-auto border-2 border-sage-600 text-sage-600 hover:bg-sage-50 shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/beratungsstellen">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Beratungsstellen finden
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mt-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <Card className="border-0 bg-white/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-sage-500 rounded-full text-white">
                      {stat.icon}
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>

      {/* How It Works Section */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              So funktioniert es für Mitglieder
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              In nur 3 einfachen Schritten zu Ihrer professionellen Beratung
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {/* Step 1: Login */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-sage-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-warm-200 rounded-full flex items-center justify-center">
                  <UserCheck className="w-4 h-4 text-warm-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-sage-700 transition-colors duration-300">
                Mit Login-Daten anmelden
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Verwenden Sie Ihre E-Mail-Adresse und erhalten Sie einen Magic
                Link oder melden Sie sich mit Ihrem Passwort an.
              </p>
            </motion.div>

            {/* Step 2: Book Appointment */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-warm-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-cream-200 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-coral-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-warm-700 transition-colors duration-300">
                Anliegen beschreiben und Termin wählen
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Wählen Sie Ihren Beratungstyp, beschreiben Sie kurz Ihr Anliegen
                und buchen Sie einen verfügbaren Termin.
              </p>
            </motion.div>

            {/* Step 3: Video Call */}
            <motion.div
              variants={scaleIn}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group text-center"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-coral-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-sage-200 rounded-full flex items-center justify-center">
                  <Video className="w-4 h-4 text-sage-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-coral-500 transition-colors duration-300">
                Online Video-Sprechstunde wahrnehmen
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Nehmen Sie an der sicheren Video-Sprechstunde teil und erhalten
                Sie professionelle Beratung von qualifizierten Helferinnen.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={featuresRef}
            initial={{ opacity: 0, y: 40 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Warum Muslimin-Beratung wählen?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wir bieten einen sicheren und vertrauensvollen Raum für Ihre
              Anliegen
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate={featuresInView ? "animate" : "initial"}
            className="grid md:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ scale: 1.02, y: -5 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-sage-50">
                  <CardHeader className="text-center pb-4">
                    <div
                      className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl group-hover:text-sage-700 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-sage-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Was unsere Mitglieder sagen
            </h2>
            <p className="text-xl text-gray-600">
              Vertrauen und Zufriedenheit stehen bei uns im Mittelpunkt
            </p>
          </motion.div>

          <motion.div
            variants={staggerChildren}
            initial="initial"
            animate={inView ? "animate" : "initial"}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full border-0 bg-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-warm-50">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <blockquote className="text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </blockquote>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-warm-500 rounded-full flex items-center justify-center text-white font-semibold mr-3">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-sage-600">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Bereit für Ihre erste Beratung?
          </h2>
          <p className="text-xl text-warm-100 mb-8 leading-relaxed">
            Als Vereinsmitglied haben Sie Zugang zu professioneller Beratung.
            Melden Sie sich an, um Termine zu buchen.
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-12 py-4 h-auto bg-white text-sage-600 hover:bg-sage-50 shadow-2xl hover:shadow-3xl transition-all duration-300"
              asChild
            >
              <Link href="/login">
                <Calendar className="mr-2 h-5 w-5" />
                Jetzt anmelden
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </Layout>
  );
}
