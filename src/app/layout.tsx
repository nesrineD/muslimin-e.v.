import type { Metadata, Viewport } from "next";
import { Inter, Merriweather } from "next/font/google";
import { MotionConfig } from "framer-motion";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { PWAPromptBanner } from "@/components/PWAPromptBanner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: {
    default: "Muslimin e.V. – Muslimischer Mädchen- und Frauenverein",
    template: "%s – Muslimin e.V.",
  },
  description:
    "Ein aktiver muslimischer Mädchen- und Frauenverein mit Beratung, Beratungsstellen und Veranstaltungen.",
  creator: "Muslimin e.V.",
  publisher: "Muslimin e.V.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://muslimin-ev.vercel.app",
    siteName: "Muslimin e.V.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="de"
      className={`${inter.variable} ${merriweather.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="msapplication-TileColor" content="#10b981" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <MotionConfig reducedMotion="user">
          <AuthProvider>
            <PWAPromptBanner />
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <CookieBanner />
          </AuthProvider>
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  );
}
