import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Button Component — Design System § CTA Hierarchy
 *
 * ┌─────────────────────────────────────────────────────────────┐
 * │ TIER 1 — PRIMARY (Conversion goal)                          │
 * │  variant="primary"   → sage gradient, white text            │
 * │  variant="donation"  → clay gradient, white text            │
 * │  Use for: "Mitglied werden", "Spenden", "Jetzt anmelden"    │
 * ├─────────────────────────────────────────────────────────────┤
 * │ TIER 2 — SECONDARY (Exploratory)                           │
 * │  variant="secondary" → outlined clay/white, charcoal text   │
 * │  variant="outline"   → outlined sage, sage text             │
 * │  Use for: "Mehr erfahren", "Weiterlesen", "Details"         │
 * ├─────────────────────────────────────────────────────────────┤
 * │ TIER 3 — TERTIARY (Low priority)                            │
 * │  variant="ghost"     → transparent, sage text (no border)   │
 * │  variant="default"   → solid sage-600 background            │
 * │  Use for: "Abbrechen", "Zurück", close/dismiss actions      │
 * └─────────────────────────────────────────────────────────────┘
 *
 * Size guidelines:
 *   size="lg" → Major CTAs (hero, donation sections)
 *   size="md" → Standard actions (default)
 *   size="sm" → Compact / inline actions, sticky bars
 */

const buttonVariants = cva(
  // Base: rounded-md (6px) per design system — buttons use CORNER-MD
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-all duration-300 focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-sage-600 text-white shadow-sm hover:bg-sage-700 active:bg-sage-800",
        primary:
          "bg-gradient-to-r from-sage-700 to-sage-600 text-white shadow-md hover:shadow-lg hover:from-sage-800 hover:to-sage-700 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md active:from-sage-900 active:to-sage-800",
        donation:
          "bg-gradient-to-r from-clay-700 to-coral-600 text-white shadow-md hover:shadow-lg hover:from-clay-800 hover:to-coral-700 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md active:from-clay-900 active:to-coral-800",
        secondary:
          "border-2 border-clay-200 bg-clay-50 text-charcoal-800 shadow-sm hover:bg-clay-100 hover:border-clay-300 active:bg-clay-200",
        outline:
          "border-2 border-sage-300 bg-transparent text-sage-700 hover:bg-sage-50 hover:border-sage-400 active:bg-sage-100",
        ghost:
          "bg-transparent text-sage-700 hover:bg-sage-50 hover:text-sage-800 active:bg-sage-100",
        passive:
          "bg-warm-400 text-charcoal shadow-sm hover:brightness-105 active:brightness-95",
      },
      size: {
        sm: "h-9 min-h-[36px] px-4 text-sm",
        md: "h-11 min-h-[44px] px-6 text-base",
        lg: "h-13 min-h-[52px] px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
