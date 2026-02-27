import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Card Component — Design System v1.0
 *
 * Two card variants:
 *   "white"   — Content cards (events, campaigns, articles). shadow-md hover lift.
 *   "cream"   — Value/feature cards ("Wer sind wir"). shadow-sm hover highlight.
 *
 * Hover modes (applied automatically based on variant when interactive):
 *   "lift"      — -translate-y-1 + shadow-lg  (Content Card default)
 *   "highlight" — shadow-md + border highlight (Feature Card default)
 *
 * Shadow elevation scale:
 *   Elevation 1 (subtle)   — shadow-sm   → badges, inputs, feature cards
 *   Elevation 2 (standard) — shadow-card-standard → default card resting state
 *   Elevation 3 (prominent)— shadow-lg   → hover / featured content
 */
interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "white" | "cream" | "event" | "campaign" | "team" | "feature";
  padding?: "sm" | "md" | "lg";
  hover?: "lift" | "highlight";
  href?: string;
  as?: "div" | "article" | "section";
  gradient?: boolean;
}

const Card = React.forwardRef<HTMLElement, CardProps>(
  (
    {
      className,
      variant = "white",
      padding = "md",
      hover,
      href,
      as = "article",
      onClick,
      ...props
    },
    ref,
  ) => {
    // Determine effective hover mode: explicit prop wins, then infer from variant
    const isInteractive = !!(href || onClick);
    const effectiveHover: "lift" | "highlight" =
      hover ?? (variant === "cream" ? "highlight" : "lift");

  const baseClasses = cn(
    "relative rounded-xl transition-all",
    // Resting shadow and background based on variant
    variant === "white" && "shadow-card-standard bg-white",
    variant === "cream" && "shadow-sm bg-cream-50",
    // Gradient variants
    variant === "event" && "shadow-sm bg-gradient-to-br from-sage-100 to-sage-50",
    variant === "campaign" && "shadow-sm bg-gradient-to-br from-clay-100 to-coral-50",
    variant === "team" && "shadow-sm bg-gradient-to-br from-sage-50 to-sand-100",
    variant === "feature" && "shadow-sm bg-gradient-to-br from-cream-100 to-transparent",
    // Padding scale
    padding === "sm" && "p-4",
    padding === "md" && "p-6",
    padding === "lg" && "p-8",
    // Interactive hover states
    isInteractive && "cursor-pointer",
    // LIFT hover: card rises + shadow deepens (Content Card — Type A)
    isInteractive &&
      effectiveHover === "lift" &&
      "hover:-translate-y-1 hover:shadow-lg focus-visible:-translate-y-1 focus-visible:shadow-lg",
    // HIGHLIGHT hover: border highlight + shadow deepens (Feature Card — Type B)
    isInteractive &&
      effectiveHover === "highlight" &&
      "border-2 border-transparent hover:border-coral-200 hover:shadow-md focus-visible:border-coral-200 focus-visible:shadow-md",
    // Gradient overlay for lift cards only
    isInteractive &&
      effectiveHover === "lift" &&
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:from-sage-400/10 before:via-transparent before:to-charcoal-400/10 before:opacity-0 before:transition-opacity hover:before:opacity-100 focus-visible:before:opacity-100 after:pointer-events-none after:absolute after:inset-0 after:rounded-xl after:ring-1 after:ring-sand-200/60 after:opacity-0 after:transition-opacity hover:after:opacity-100 focus-visible:after:opacity-100",
    // Enhanced gradient overlay for gradient variants
    (variant === "event" || variant === "campaign" || variant === "team") &&
      isInteractive &&
      effectiveHover === "lift" &&
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-xl before:bg-gradient-to-br before:opacity-0 before:transition-opacity hover:before:opacity-30 focus-visible:before:opacity-30",
    className,
  );

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(
            baseClasses,
            "block focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2",
          )}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      );
    }

    const Component = as;
    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          baseClasses,
          onClick &&
            "focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2",
        )}
        onClick={onClick}
        {...(onClick ? { tabIndex: 0 } : {})}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
