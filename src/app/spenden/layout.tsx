import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Spenden – Muslimin e.V.",
  description:
    "Unterstütze unsere Arbeit mit einer Spende. Jede Spende hilft Menschen in Not.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
