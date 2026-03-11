/**
 * Skeleton Component — Design System § Loading States
 *
 * Provides loading placeholder animations for various UI elements.
 *
 * Usage patterns:
 *
 * 1. Text line skeleton:
 *    <Skeleton className="h-4 w-48" />
 *
 * 2. Card skeleton:
 *    <SkeletonCard />
 *
 * 3. Button skeleton:
 *    <Skeleton variant="button" className="w-32" />
 *
 * Animation: "shimmer" — left-to-right shine with animate-pulse fallback.
 * The shimmer keyframe is defined in globals.css.
 * Respects prefers-reduced-motion: reduces to static pulse.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

// ── Base Skeleton ──────────────────────────────────────────────

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual variant — controls height / shape defaults */
  variant?: "text" | "circular" | "rectangular" | "button";
}

function Skeleton({
  className,
  variant = "rectangular",
  ...props
}: SkeletonProps) {
  return (
    <div
      role="status"
      aria-label="Wird geladen…"
      className={cn(
        // Base styles: shimmer effect over a muted sand background
        "relative overflow-hidden bg-sand-200 before:absolute before:inset-0",
        "before:bg-gradient-to-r before:from-transparent before:via-white/50 before:to-transparent",
        "before:animate-shimmer motion-reduce:before:animate-none",
        "motion-reduce:animate-pulse",
        // Variant shapes
        variant === "text" && "h-4 w-full rounded-md",
        variant === "circular" && "h-10 w-10 rounded-full",
        variant === "rectangular" && "rounded-lg",
        variant === "button" && "h-11 rounded-lg",
        className,
      )}
      {...props}
    />
  );
}

// ── Card Skeleton ──────────────────────────────────────────────

/**
 * SkeletonCard — placeholder matching Card variant="white" + padding="md"
 * Mirrors the typical content card layout:
 *   icon row | title | description lines | CTA
 */
function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-white shadow-card-standard p-6 space-y-4",
        className,
      )}
      role="status"
      aria-label="Inhalt wird geladen…"
    >
      {/* Icon & badge row */}
      <div className="flex items-start justify-between gap-4">
        <Skeleton variant="rectangular" className="h-14 w-14 flex-shrink-0" />
        <Skeleton variant="rectangular" className="h-6 w-20 rounded-full" />
      </div>

      {/* Title */}
      <Skeleton variant="text" className="h-6 w-3/4" />

      {/* Description lines */}
      <div className="space-y-2">
        <Skeleton variant="text" className="w-full" />
        <Skeleton variant="text" className="w-5/6" />
        <Skeleton variant="text" className="w-4/6" />
      </div>

      {/* CTA button */}
      <Skeleton variant="button" className="w-36 mt-2" />
    </div>
  );
}

// ── Event Card Skeleton (3-up grid) ─────────────────────────────

/**
 * SkeletonEventGrid — 3-column grid of SkeletonCards matching EventCard layout.
 * Use while events are loading.
 */
function SkeletonEventGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={`skeleton-event-card-${i}`} />
      ))}
    </div>
  );
}

// ── Inline spinner (for buttons in loading state) ───────────────

/**
 * ButtonSpinner — small spinning indicator for use inside a disabled Button.
 *
 * Usage:
 *   <Button disabled>
 *     <ButtonSpinner />
 *     Wird gesendet…
 *   </Button>
 */
function ButtonSpinner({ className }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Lädt"
      className={cn(
        "inline-block h-4 w-4 rounded-full border-2 border-current border-t-transparent",
        "animate-spin motion-reduce:animate-none",
        className,
      )}
    />
  );
}

export { Skeleton, SkeletonCard, SkeletonEventGrid, ButtonSpinner };
