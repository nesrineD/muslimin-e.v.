import {
  SECTION_ALTERNATE_SURFACE_CLASS,
  CLOSING_SECTION_SURFACE_CLASS,
  FOOTER_BRIDGE_SURFACE_CLASS,
  SECTION_WHITE_SURFACE_CLASS,
  SECTION_DARK_FEATURE_CLASS,
} from "@/lib/page-config";

const VARIANT_CLASSES: Record<SectionBandProps["variant"], string> = {
  alternate: SECTION_ALTERNATE_SURFACE_CLASS,
  "dark-cta": CLOSING_SECTION_SURFACE_CLASS,
  bridge: FOOTER_BRIDGE_SURFACE_CLASS,
  white: SECTION_WHITE_SURFACE_CLASS,
  "dark-feature": SECTION_DARK_FEATURE_CLASS,
};

interface SectionBandProps {
  variant: "alternate" | "dark-cta" | "bridge" | "white" | "dark-feature";
  children: React.ReactNode;
  className?: string;
}

export function SectionBand({
  variant,
  children,
  className,
}: SectionBandProps) {
  return (
    <div
      className={`relative w-screen left-1/2 -translate-x-1/2 ${VARIANT_CLASSES[variant]} ${className ?? ""}`}
    >
      <div className="container mx-auto">{children}</div>
    </div>
  );
}
