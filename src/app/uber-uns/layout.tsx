import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns – Muslimin e.V.",
  description:
    "Erfahren Sie mehr über Muslimin e.V., unsere Geschichte, Philosophie und Ziele.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
