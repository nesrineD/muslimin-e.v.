import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'circle' | 'rounded';
}

/**
 * Skeleton Component
 * Base skeleton loader with shimmer animation
 */
export function Skeleton({
  className,
  variant = 'default',
  ...props
}: SkeletonProps) {
  const variants = {
    default: 'rounded-md',
    circle: 'rounded-full',
    rounded: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        'bg-gradient-to-r from-charcoal-200 via-charcoal-100 to-charcoal-200',
        'bg-[length:200%_100%] animate-shimmer',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

interface SkeletonCardProps {
  lines?: number;
  variant?: 'white' | 'cream' | 'event' | 'campaign';
}

/**
 * SkeletonCard Component
 * Full card skeleton loader matching real card layout
 */
export function SkeletonCard({ lines = 3, variant = 'white' }: SkeletonCardProps) {
  const bgClass = {
    white: 'bg-white',
    cream: 'bg-cream-50',
    event: 'bg-sage-50',
    campaign: 'bg-clay-50',
  }[variant];

  return (
    <div className={cn('rounded-xl p-6 shadow-sm', bgClass)}>
      {/* Image placeholder */}
      <Skeleton className="h-48 w-full mb-4" />

      {/* Title */}
      <Skeleton className="h-6 w-3/4 mb-3" />

      {/* Text lines */}
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            className={cn('h-4 w-full', i === lines - 1 && 'w-4/5')}
          />
        ))}
      </div>

      {/* Button placeholder */}
      <Skeleton className="h-10 w-full mt-4 rounded-md" />
    </div>
  );
}

interface SkeletonTextProps {
  lines?: number;
  className?: string;
}

/**
 * SkeletonText Component
 * Skeleton for text content with variable line widths
 */
export function SkeletonText({ lines = 3, className }: SkeletonTextProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4 w-full', i === lines - 1 && 'w-4/5')}
        />
      ))}
    </div>
  );
}

interface SkeletonHeadingProps {
  level?: 'h1' | 'h2' | 'h3';
  width?: string;
}

/**
 * SkeletonHeading Component
 * Skeleton for heading elements
 */
export function SkeletonHeading({ level = 'h2', width = 'w-2/3' }: SkeletonHeadingProps) {
  const heights = {
    h1: 'h-10',
    h2: 'h-8',
    h3: 'h-6',
  };

  return <Skeleton className={cn(heights[level], width)} />;
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'dots' | 'ring' | 'smooth';
  color?: string;
}

/**
 * LoadingSpinner Component
 * Animated loading indicator with multiple styles
 */
export function LoadingSpinner({
  size = 'md',
  variant = 'smooth',
  color = 'text-sage-600',
}: LoadingSpinnerProps) {
  const sizeMap = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (variant === 'dots') {
    return (
      <div className={cn('flex items-center justify-center gap-1', sizeMap[size])}>
        <div className={cn('rounded-full bg-sage-500 animate-bounce', 'w-1.5 h-1.5')} />
        <div
          className={cn('rounded-full bg-sage-500 animate-bounce', 'w-1.5 h-1.5')}
          style={{ animationDelay: '0.1s' }}
        />
        <div
          className={cn('rounded-full bg-sage-500 animate-bounce', 'w-1.5 h-1.5')}
          style={{ animationDelay: '0.2s' }}
        />
      </div>
    );
  }

  if (variant === 'ring') {
    return (
      <div
        className={cn(
          'border-2 border-sage-200 border-t-sage-600 rounded-full animate-spin',
          sizeMap[size],
        )}
      />
    );
  }

  // smooth (default)
  return (
    <svg
      className={cn('animate-spin-smooth', sizeMap[size], color)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  message?: string;
}

/**
 * LoadingOverlay Component
 * Overlay with loading indicator while content loads
 */
export function LoadingOverlay({
  isLoading,
  children,
  message = 'Laden...',
}: LoadingOverlayProps) {
  return (
    <div className="relative">
      {children}
      {isLoading && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-lg flex items-center justify-center z-50">
          <div className="space-y-3 text-center">
            <LoadingSpinner variant="smooth" />
            <p className="text-sm font-medium text-charcoal-700">{message}</p>
          </div>
        </div>
      )}
    </div>
  );
}

interface SkeletonGridProps {
  count?: number;
  columns?: number;
  variant?: 'card' | 'text' | 'mixed';
}

/**
 * SkeletonGrid Component
 * Grid of skeleton loaders for lists and galleries
 */
export function SkeletonGrid({
  count = 6,
  columns = 3,
  variant = 'card',
}: SkeletonGridProps) {
  const gridClass = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[Math.min(columns, 4) as 1 | 2 | 3 | 4];

  return (
    <div className={cn('grid gap-6', gridClass)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i}>
          {variant === 'card' && <SkeletonCard />}
          {variant === 'text' && <SkeletonText lines={4} />}
          {variant === 'mixed' && (i % 2 === 0 ? <SkeletonCard /> : <SkeletonText />)}
        </div>
      ))}
    </div>
  );
}
