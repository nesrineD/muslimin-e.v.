"use client";

import { motion } from "framer-motion";
import { Mail, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ImpressumPage() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">
            <span className="bg-gradient-to-r from-coral-500 to-warm-500 bg-clip-text text-transparent">
              Impressum
            </span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Rechtliche Angaben gemäß § 5 TMG
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Impressum Section */}
          <motion.div variants={itemVariants}>
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl font-bold text-sage-800">
                  <Building2 className="w-6 h-6 mr-3 text-sage-600" />
                  Impressum
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <p className="text-sage-600 mb-4">Angaben gemäß § 5 TMG</p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Vereinsname:
                      </h3>
                      <p className="text-sage-700">Muslimin e.V.</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Anschrift:
                      </h3>
                      <p className="text-sage-700">
                        Berlin
                        <br />
                        Deutschland
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Vertreten durch:
                      </h3>
                      <p className="text-sage-700">Durkaya, Perihan</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Kontakt:
                      </h3>
                      <div className="flex items-center text-sage-700">
                        <Mail className="w-4 h-4 mr-2 text-sage-600" />
                        <a
                          href="mailto:info@muslimin-ev.de"
                          className="hover:text-sage-900 transition-colors duration-200"
                        >
                          info@muslimin-ev.de
                        </a>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-sage-800 mb-2">
                        Registereintrag:
                      </h3>
                      <p className="text-sage-700">
                        Eintragung im Vereinsregister
                        <br />
                        Registergericht: Amtsgericht Charlottenburg
                        <br />
                        Registernummer: VR 36818 B
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
