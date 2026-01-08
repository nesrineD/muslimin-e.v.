"use client";

import { motion } from "framer-motion";
import { CONTACT_INFO } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { containerVariants, itemVariants } from "@/lib/animations";
import { Mail, MapPin } from "lucide-react";

export default function KontaktPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 py-12"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-charcoal-800 mb-6">
            Kontaktieren Sie uns
          </h1>
          <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
            Wir freuen uns auf Ihre Nachricht und sind für Sie da.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-sand-200 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal-800">
                  Kontaktinformationen
                </CardTitle>
                <CardDescription className="text-charcoal-600">
                  So können Sie uns erreichen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 text-charcoal-700 hover:text-sage-600 transition-colors"
                >
                  <Mail className="h-8 w-8 text-sage-500" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
                <div className="flex items-center gap-4 text-charcoal-700">
                  <MapPin className="h-8 w-8 text-sage-500" />
                  <span>Berlin, Deutschland</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-sand-200 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-charcoal-800">
                  Schreiben Sie uns
                </CardTitle>
                <CardDescription className="text-charcoal-600">
                  Wir werden uns so schnell wie möglich bei Ihnen melden.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-charcoal-800">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Ihr Name"
                      className="mt-1 border-sand-300 focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-charcoal-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ihre@email.de"
                      className="mt-1 border-sand-300 focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-charcoal-800">
                      Betreff
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Betreff Ihrer Nachricht"
                      className="mt-1 border-sand-300 focus:border-sage-500"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-charcoal-800">
                      Nachricht
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Ihre Nachricht an uns..."
                      className="mt-1 border-sand-300 focus:border-sage-500"
                      rows={5}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      Nachricht senden
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
