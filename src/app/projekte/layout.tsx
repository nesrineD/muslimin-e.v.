import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unsere Projekte & Spendenaktionen – Muslimin e.V.",
  description:
    "Erfahre mehr über unsere aktuellen Projekte und wie du uns unterstützen kannst.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
