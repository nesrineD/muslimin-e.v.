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
          <h1 className="text-4xl md:text-6xl font-bold text-sage-800 mb-6">
            Kontaktieren Sie{" "}
            <span className="bg-gradient-to-r from-coral-500 to-warm-500 bg-clip-text text-transparent">
              uns
            </span>
          </h1>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto leading-relaxed">
            Wir freuen uns auf Ihre Nachricht und sind für Sie da.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-sage-200 shadow-xl bg-gradient-to-br from-white to-sage-50/30">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-sage-800">
                  Kontaktinformationen
                </CardTitle>
                <CardDescription>So können Sie uns erreichen</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-lg">
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="flex items-center gap-4 text-sage-700 hover:text-coral-600 transition-colors"
                >
                  <Mail className="h-8 w-8 text-coral-500" />
                  <span>{CONTACT_INFO.email}</span>
                </a>
                <div className="flex items-center gap-4 text-sage-700">
                  <MapPin className="h-8 w-8 text-coral-500" />
                  <span>Berlin, Deutschland</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form Section */}
          <motion.div variants={itemVariants}>
            <Card className="h-full border-2 border-sage-200 shadow-xl bg-white">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-sage-800">
                  Schreiben Sie uns
                </CardTitle>
                <CardDescription>
                  Wir werden uns so schnell wie möglich bei Ihnen melden.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-sage-800">
                      Name
                    </Label>
                    <Input id="name" placeholder="Ihr Name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sage-800">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ihre@email.de"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject" className="text-sage-800">
                      Betreff
                    </Label>
                    <Input
                      id="subject"
                      placeholder="Betreff Ihrer Nachricht"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sage-800">
                      Nachricht
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Ihre Nachricht an uns..."
                      className="mt-1"
                      rows={5}
                    />
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-sage-600 to-warm-600 hover:from-sage-700 hover:to-warm-700 text-white font-semibold px-8 py-3 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
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
