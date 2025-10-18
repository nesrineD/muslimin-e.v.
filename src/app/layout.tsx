import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/hooks/useAuth";
import { Toaster } from "@/components/ui/toaster";
import { CookieBanner } from "@/components/layout/cookie-banner";
import { PWAPromptBanner } from "@/components/PWAPromptBanner";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Muslimin-Beratung",
    template: "%s | Muslimin-Beratung",
  },
  description:
    "Professionelle Terminbuchungsplattform für Beratung und Unterstützung. Vertrauensvoll, diskret und kompetent.",
  keywords: [
    "Beratung",
    "Terminbuchung",
    "Muslimin",
    "Psychologische Beratung",
    "Sozialberatung",
    "Schwangerschaftsbegleitung",
  ],
  authors: [{ name: "Muslimin-Beratung Team" }],
  creator: "Muslimin-Beratung",
  publisher: "Muslimin-Beratung",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://muslimin-beratung.vercel.app"
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    title: "Muslimin-Beratung",
    description:
      "Professionelle Terminbuchungsplattform für Beratung und Unterstützung",
    siteName: "Muslimin-Beratung",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslimin-Beratung",
    description:
      "Professionelle Terminbuchungsplattform für Beratung und Unterstützung",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#10b981",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Muslimin-Beratung",
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
    <html lang="de" className={inter.variable} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
