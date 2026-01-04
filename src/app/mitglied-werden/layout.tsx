import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mitglied werden – Muslimin e.V.",
  description:
    "Werde Teil unserer Gemeinschaft. Erfahre mehr über aktive und passive Mitgliedschaften.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
