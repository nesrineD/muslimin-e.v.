import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Willkommen – Muslimin e.V.",
  description:
    "Ein aktiver muslimischer Mädchen- und Frauenverein seit 2011. Entdecke unsere Veranstaltungen, werde Mitglied oder spende.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
