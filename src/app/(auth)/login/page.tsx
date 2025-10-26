"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Loader2,
  CheckCircle,
  Info,
  Heart,
  Sparkles,
  Shield,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading: authLoading, signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showHelperMessage, setShowHelperMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const redirectUrl = searchParams.get("redirect");

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      const destination = redirectUrl || "/dashboard";
      router.push(destination);
    }
  }, [user, authLoading, router, redirectUrl]);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    }

    if (searchParams.get("message") === "helper-registration") {
      setShowHelperMessage(true);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await signIn(formData.email, formData.password);

      if (success) {
        // Login successful
        console.log("Login successful:", formData);
        setIsLoading(false);

        // Redirect to the requested page or dashboard
        const destination = redirectUrl || "/dashboard";
        router.push(destination);
      } else {
        // Login failed
        setErrors({ general: "E-Mail oder Passwort falsch" });
        setIsLoading(false);
      }
    } catch (error) {
      setErrors({
        general: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      });
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear errors when user types
    if (errors.general) {
      setErrors({});
    }
  };

  return (
    <Layout className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-warm-50">
        <div className="absolute inset-0 bg-coral-50/30"></div>

        {/* Floating Background Elements */}
        <motion.div
          animate={{
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 text-warm-200/30"
        >
          <Heart size={32} />
        </motion.div>
        <motion.div
          animate={{
            y: [-8, 12, -8],
            rotate: [0, -3, 3, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-40 right-20 text-coral-200/30"
        >
          <Sparkles size={28} />
        </motion.div>
        <motion.div
          animate={{
            y: [-6, 8, -6],
            rotate: [0, 4, -4, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          className="absolute bottom-32 left-20 text-sage-200/30"
        >
          <Shield size={24} />
        </motion.div>
      </div>

      <div className="relative flex items-center justify-center min-h-screen py-12 px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md space-y-6"
        >
          {/* Success Messages */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Alert className="border-sage-200 bg-sage-50/80 backdrop-blur-sm shadow-lg">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6, repeat: 2 }}
                  >
                    <CheckCircle className="h-4 w-4 text-sage-600" />
                  </motion.div>
                  <AlertTitle className="text-sage-800">
                    Registrierung erfolgreich!
                  </AlertTitle>
                  <AlertDescription className="text-sage-700">
                    Sie können sich jetzt mit Ihren Zugangsdaten anmelden.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}

            {showHelperMessage && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Alert className="border-warm-200 bg-warm-50/80 backdrop-blur-sm shadow-lg">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Info className="h-4 w-4 text-warm-600" />
                  </motion.div>
                  <AlertTitle className="text-warm-800">Information</AlertTitle>
                  <AlertDescription className="text-warm-700">
                    Ihre Registrierung als Helferin ist eingegangen. Ein
                    Administrator wird Ihr Profil prüfen und Sie erhalten eine
                    Bestätigung per E-Mail.
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Login Form */}
          <motion.div variants={itemVariants}>
            <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-md overflow-hidden">
              <div className="absolute inset-0 bg-sage-500/5 pointer-events-none" />

              <CardHeader className="text-center relative">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                  className="mx-auto mb-4 w-16 h-16 bg-sage-600 rounded-full flex items-center justify-center shadow-lg"
                >
                  <Lock className="w-8 h-8 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <CardTitle className="text-3xl font-bold text-sage-800">
                    Willkommen zurück
                  </CardTitle>
                  <CardDescription className="text-gray-600 mt-2">
                    Melden Sie sich mit Ihren Zugangsdaten an
                  </CardDescription>
                </motion.div>
              </CardHeader>

              <CardContent className="relative">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* General Error */}
                  <AnimatePresence>
                    {errors.general && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <Alert
                          variant="destructive"
                          className="bg-red-50/80 border-red-200"
                        >
                          <AlertDescription>{errors.general}</AlertDescription>
                        </Alert>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Email */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      E-Mail-Adresse
                    </Label>
                    <div className="relative group">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute left-3 top-3 text-gray-400 group-focus-within:text-emerald-600 transition-colors duration-200"
                      >
                        <Mail className="h-4 w-4" />
                      </motion.div>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="ihre@email.de"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-200 bg-white/50"
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={itemVariants} className="space-y-2">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 font-medium"
                    >
                      Passwort
                    </Label>
                    <div className="relative group">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="absolute left-3 top-3 text-gray-400 group-focus-within:text-emerald-600 transition-colors duration-200"
                      >
                        <Lock className="h-4 w-4" />
                      </motion.div>
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Ihr Passwort"
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 pr-10 border-gray-200 focus:border-emerald-500 focus:ring-emerald-500 transition-all duration-200 bg-white/50"
                        required
                      />
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Remember Me */}
                  <motion.div
                    variants={itemVariants}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({
                          ...prev,
                          rememberMe: !!checked,
                        }))
                      }
                      className="border-gray-300 data-[state=checked]:bg-sage-600 data-[state=checked]:border-sage-600"
                    />
                    <Label
                      htmlFor="rememberMe"
                      className="text-sm font-normal text-gray-600"
                    >
                      Angemeldet bleiben
                    </Label>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    variants={itemVariants}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      className="w-full bg-sage-600 hover:bg-sage-700 text-white font-medium py-3 shadow-lg hover:shadow-xl transition-all duration-300"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Anmeldung läuft...
                        </>
                      ) : (
                        <>
                          Anmelden
                          <motion.span
                            animate={{ x: [0, 2, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="ml-2"
                          >
                            →
                          </motion.span>
                        </>
                      )}
                    </Button>
                  </motion.div>

                  {/* Links */}
                  <motion.div
                    variants={itemVariants}
                    className="text-center space-y-3"
                  >
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-gray-600 hover:text-sage-600 underline-offset-4 hover:underline transition-colors duration-200"
                      >
                        Passwort vergessen?
                      </Link>
                    </motion.div>

                    <div className="text-sm text-gray-600">
                      Noch kein Konto?{" "}
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-block"
                      >
                        <Link
                          href="/register"
                          className="text-coral-600 underline-offset-4 hover:underline font-medium hover:text-coral-700 transition-colors duration-200"
                        >
                          Jetzt registrieren
                        </Link>
                      </motion.span>
                    </div>

                    <div className="text-sm text-gray-600">
                      Möchten Sie helfen?{" "}
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        className="inline-block"
                      >
                        <Link
                          href="/helper/register"
                          className="text-warm-600 underline-offset-4 hover:underline font-medium hover:text-warm-700 transition-colors duration-200"
                        >
                          Als Helferin registrieren ✨
                        </Link>
                      </motion.span>
                    </div>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          Loading...
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
