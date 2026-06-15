/**
 * SectionDivider — FR-131/132
 * Visual transition component between page sections.
 * Three variants:
 *   wave          — subtle SVG wave using brand colors (used on Landing + Events)
 *   gradient-fade — vertical gradient fade (used on Donation + Membership)
 *   accent-line   — thin horizontal gradient line (used on About)
 *
 * Usage:
 *   <SectionDivider variant="wave" />
 *   <SectionDivider variant="gradient-fade" fromColor="bg-sand-50" toColor="bg-white" />
 */

interface SectionDividerProps {
  variant: "wave" | "gradient-fade" | "accent-line";
  /** Only used with gradient-fade: top color (Tailwind bg class). Defaults to transparent → sand blend. */
  className?: string;
  /** Only used with accent-line: optional centred label text. */
  label?: string;
}

export function SectionDivider({
  variant,
  className = "",
  label,
}: SectionDividerProps) {
  if (variant === "wave") {
    return (
      <div
        aria-hidden="true"
        className={`w-full overflow-hidden leading-none ${className}`}
      >
        <svg
          viewBox="0 0 1440 56"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-10 md:h-14"
        >
          <path
            d="M0,28 C240,56 480,0 720,28 C960,56 1200,0 1440,28 L1440,56 L0,56 Z"
            fill="rgba(212, 203, 184, 0.25)"
          />
          <path
            d="M0,36 C360,8 720,52 1080,20 C1260,4 1380,36 1440,36 L1440,56 L0,56 Z"
            fill="rgba(91, 105, 96, 0.07)"
          />
        </svg>
      </div>
    );
  }

  if (variant === "gradient-fade") {
    return (
      <div
        aria-hidden="true"
        className={`h-12 md:h-16 w-full bg-gradient-to-b from-sand-100/0 via-sand-100/40 to-sand-100/0 ${className}`}
      />
    );
  }

  // accent-line
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-4 py-4 ${className}`}
    >
      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-sand-200" />
      {label && (
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-charcoal-400">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-sand-200" />
    </div>
  );
}
