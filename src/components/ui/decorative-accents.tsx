/**
 * DecorativeAccents — FR-128
 * Convenience wrapper around <DecorativeElement> with named section presets.
 * Renders absolutely-positioned, pointer-events-none blobs that add visual depth.
 *
 * Presets:
 *   hero     — sage blob top-right + clay blob bottom-left
 *   content  — sand blob mid-left + sage blob mid-right
 *   closing  — sand blob bottom-center + clay blob bottom-right
 *
 * The parent section must have `position: relative` (e.g. Tailwind `relative`).
 *
 * Usage:
 *   <section className="relative overflow-hidden">
 *     <DecorativeAccents preset="hero" />
 *     ...content...
 *   </section>
 */

import { DecorativeElement } from "@/components/ui/parallax-background";

interface DecorativeAccentsProps {
  preset: "hero" | "content" | "closing";
}

export function DecorativeAccents({ preset }: DecorativeAccentsProps) {
  if (preset === "hero") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <DecorativeElement
          type="blob"
          size="lg"
          color="sage"
          position={{ top: "-8%", right: "-6%" }}
          opacity={0.08}
          animate
        />
        <DecorativeElement
          type="blob"
          size="md"
          color="clay"
          position={{ bottom: "-4%", left: "-4%" }}
          opacity={0.06}
        />
      </div>
    );
  }

  if (preset === "content") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden z-0"
      >
        <DecorativeElement
          type="blob"
          size="md"
          color="sand"
          position={{ top: "30%", left: "-5%" }}
          opacity={0.1}
        />
        <DecorativeElement
          type="blob"
          size="md"
          color="sage"
          position={{ top: "20%", right: "-5%" }}
          opacity={0.07}
          animate
        />
      </div>
    );
  }

  // closing
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden z-0"
    >
      <DecorativeElement
        type="blob"
        size="md"
        color="sand"
        position={{ bottom: "-6%", left: "30%" }}
        opacity={0.1}
      />
      <DecorativeElement
        type="blob"
        size="sm"
        color="clay"
        position={{ bottom: "-2%", right: "-3%" }}
        opacity={0.07}
      />
    </div>
  );
}
