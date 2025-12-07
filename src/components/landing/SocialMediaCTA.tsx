"use client";

import { SocialMediaSection } from "@/components/SocialMediaSection";

interface SocialMediaCTAProps {
  title?: string;
  subtitle?: string;
}

export function SocialMediaCTA({
  title = "Folgen Sie uns auf Social Media",
  subtitle = "Aktuelle Flyer, genaue Termine und Live-Updates!",
}: SocialMediaCTAProps) {
  return (
    <SocialMediaSection variant="card" title={title} subtitle={subtitle} />
  );
}
