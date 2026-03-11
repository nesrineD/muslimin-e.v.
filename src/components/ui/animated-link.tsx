'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface AnimatedLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  variant?: 'underline' | 'gradient' | 'glow' | 'arrow';
  color?: 'sage' | 'clay' | 'charcoal';
  external?: boolean;
  className?: string;
}

/**
 * AnimatedLink Component
 * Link with various animated hover effects
 * 
 * Variants:
 * - underline: Growing underline from left to right
 * - gradient: Gradient color transition
 * - glow: Glowing effect on hover
 * - arrow: Arrow slides in on hover
 * 
 * Usage:
 * <AnimatedLink href="/about" variant="underline">
 *   Learn More
 * </AnimatedLink>
 */
export const AnimatedLink = React.forwardRef<HTMLAnchorElement, AnimatedLinkProps>(
  (
    {
      href,
      children,
      variant = 'underline',
      color = 'sage',
      external = false,
      className,
      ...props
    },
    ref,
  ) => {
    const colorMap = {
      sage: 'hover:text-sage-700 text-sage-600',
      clay: 'hover:text-clay-700 text-clay-600',
      charcoal: 'hover:text-charcoal-900 text-charcoal-700',
    };

    const gradientColorMap: Record<NonNullable<AnimatedLinkProps['color']>, string> = {
      sage: 'bg-gradient-to-r from-sage-600 to-sage-700',
      clay: 'bg-gradient-to-r from-clay-600 to-clay-700',
      charcoal: 'bg-gradient-to-r from-charcoal-700 to-charcoal-900',
    };

    const variantClasses = {
      underline: `relative inline-block transition-colors duration-300 ${colorMap[color]}
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5
        after:bg-current after:transform after:scale-x-0 after:origin-left after:transition-transform
        after:duration-300 hover:after:scale-x-100`,
      
      gradient: `inline-block transition-all duration-300 ${gradientColorMap[color]}
        bg-clip-text text-transparent opacity-70 hover:opacity-100`,
      
      glow: `inline-block transition-all duration-300 ${colorMap[color]} relative
        hover:drop-shadow-[0_0_8px_rgba(91,105,96,0.3)]`,
      
      arrow: `inline-flex items-center gap-1 transition-all duration-300 ${colorMap[color]}
        group hover:gap-2`,
    };

    const baseClasses = cn(
      'font-medium focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2',
      variantClasses[variant],
      className,
    );

    const Comp = external ? 'a' : Link;

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
          {...props}
        >
          {variant === 'arrow' ? (
            <>
              {children}
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </>
          ) : (
            children
          )}
        </a>
      );
    }

    return (
      <Comp
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={baseClasses}
        {...props}
      >
        {variant === 'arrow' ? (
          <>
            {children}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);

AnimatedLink.displayName = 'AnimatedLink';

interface AnimatedNavLinkProps extends Omit<AnimatedLinkProps, 'variant'> {
  isActive?: boolean;
}

/**
 * AnimatedNavLink Component
 * Navigation link with active state indicator
 */
export const AnimatedNavLink = React.forwardRef<
  HTMLAnchorElement,
  AnimatedNavLinkProps
>(({ href, isActive = false, className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      href={href}
      className={cn(
        'relative px-2 py-1.5 font-medium text-charcoal-600 transition-colors duration-300',
        'hover:text-sage-700 focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2',
        isActive && 'text-sage-700 font-semibold',
        className,
      )}
      {...props}
    >
      {props.children}
      {/* Active indicator */}
      {isActive && (
        <span
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-sage-600 to-clay-500 rounded-full"
          style={{
            animation: 'underline-grow 0.4s ease-out',
          }}
        />
      )}
    </Link>
  );
});

AnimatedNavLink.displayName = 'AnimatedNavLink';
