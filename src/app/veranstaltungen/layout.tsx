import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veranstaltungen – Muslimin e.V.",
  description: "Entdecke unsere vielfältigen Veranstaltungen und Aktivitäten.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
