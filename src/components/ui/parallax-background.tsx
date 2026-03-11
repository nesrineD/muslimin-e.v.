'use client';

import React, { useEffect, useState } from 'react';

interface ParallaxBackgroundProps {
  children?: React.ReactNode;
  speed?: number; // 0.1 to 1.0, lower = slower parallax
  className?: string;
}

/**
 * ParallaxBackground Component
 * Creates a parallax scrolling effect for background elements
 * 
 * @param speed - Parallax speed factor (default: 0.5, range: 0-1)
 *   0.3 = slow and subtle
 *   0.5 = moderate (recommended)
 *   0.7 = noticeable effect
 * 
 * Usage:
 * <ParallaxBackground speed={0.5}>
 *   <YourContent />
 * </ParallaxBackground>
 */
export function ParallaxBackground({
  children,
  speed = 0.5,
  className = '',
}: ParallaxBackgroundProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    // Disable parallax for users who prefer reduced motion
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Reduce parallax effect on mobile devices
    const isMobile = window.innerWidth < 768;
    const effectiveSpeed = isMobile ? speed * 0.3 : speed;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        setOffset(window.scrollY * effectiveSpeed);
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
        transition: 'transform 0.2s ease-out',
      }}
    >
      {children}
    </div>
  );
}

interface DecorativeElementProps {
  type: 'circle' | 'blob' | 'gradient';
  size: 'sm' | 'md' | 'lg';
  color: 'sage' | 'clay' | 'sand';
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  opacity?: number;
  animate?: boolean;
}

/**
 * DecorativeElement Component
 * Renders decorative background shapes for visual depth
 * 
 * Usage:
 * <DecorativeElement
 *   type="circle"
 *   size="lg"
 *   color="sage"
 *   position={{ top: '10%', right: '-5%' }}
 *   animate
 * />
 */
export function DecorativeElement({
  type,
  size,
  color,
  position,
  opacity = 0.08,
  animate = false,
}: DecorativeElementProps) {
  const sizeMap = {
    sm: '80px',
    md: '200px',
    lg: '400px',
  };

  const colorMap = {
    sage: 'from-sage-400 to-sage-300',
    clay: 'from-clay-400 to-clay-300',
    sand: 'from-sand-400 to-sand-300',
  };

  const dimensions = sizeMap[size];

  return (
    <div
      className={`absolute pointer-events-none ${
        animate ? 'animate-float' : ''
      }`}
      style={{
        width: dimensions,
        height: dimensions,
        ...position,
        opacity,
        zIndex: 0,
      }}
    >
      {type === 'circle' && (
        <div
          className={`w-full h-full rounded-full bg-gradient-to-br ${colorMap[color]} blur-3xl`}
        />
      )}
      {type === 'blob' && (
        <div
          className={`w-full h-full bg-gradient-to-br ${colorMap[color]} blur-2xl`}
          style={{
            borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          }}
        />
      )}
      {type === 'gradient' && (
        <div
          className={`w-full h-full bg-gradient-to-br ${colorMap[color]} blur-3xl`}
        />
      )}
    </div>
  );
}

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    label: string;
    href: string;
  };
  secondaryCTA?: {
    label: string;
    href: string;
  };
  backgroundVariant?: 'sage' | 'gradient' | 'with-decorations';
  children?: React.ReactNode;
  parallax?: boolean;
}

/**
 * HeroSection Component
 * Comprehensive hero section with parallax, decorations, and animations
 * 
 * Usage:
 * <HeroSection
 *   title="Welcome to Muslimin e.V."
 *   subtitle="Building Community Through Service"
 *   primaryCTA={{ label: "Join Us", href: "/join" }}
 *   backgroundVariant="with-decorations"
 *   parallax
 * />
 */
export function HeroSection({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundVariant = 'with-decorations',
  children,
  parallax = true,
}: HeroSectionProps) {
  const bgClass = {
    sage: 'bg-sage-50',
    gradient: 'bg-gradient-to-br from-sage-50 via-white to-sand-50',
    'with-decorations':
      'bg-gradient-to-br from-white via-sage-50/20 to-sand-50/30',
  }[backgroundVariant];

  const heroContent = (
    <section
      className={`relative ${bgClass} overflow-hidden py-16 md:py-24 lg:py-32`}
    >
      {/* Decorative elements */}
      {backgroundVariant === 'with-decorations' && (
        <>
          <DecorativeElement
            type="circle"
            size="lg"
            color="sage"
            position={{ top: '0%', right: '-10%' }}
            opacity={0.06}
            animate
          />
          <DecorativeElement
            type="blob"
            size="md"
            color="clay"
            position={{ bottom: '10%', left: '-5%' }}
            opacity={0.05}
          />
          <DecorativeElement
            type="circle"
            size="sm"
            color="sand"
            position={{ top: '20%', left: '5%' }}
            opacity={0.04}
            animate
          />
        </>
      )}

      {/* Content container */}
      <div className="container relative z-10 mx-auto px-6 md:px-8">
        <div className="max-w-3xl">
          {/* Subtitle/Label */}
          {subtitle && (
            <div className="mb-4 inline-flex items-center gap-2">
              <span className="h-1 w-8 bg-gradient-to-r from-sage-500 to-clay-500 rounded-full" />
              <span className="text-sm font-semibold uppercase tracking-widest text-sage-700">
                {subtitle}
              </span>
            </div>
          )}

          {/* Main title with animation */}
          <h1 className="mb-6 font-heading text-balance text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal animate-fade-in-up">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className="mb-8 max-w-2xl font-body text-lg text-charcoal-600 leading-relaxed animate-fade-in-up">
              {description}
            </p>
          )}

          {/* CTA Buttons */}
          {(primaryCTA || secondaryCTA) && (
            <div className="flex flex-wrap gap-4 animate-fade-in-up">
              {primaryCTA && (
                <a
                  href={primaryCTA.href}
                  className="inline-flex items-center justify-center h-11 min-h-[44px] px-8 text-base font-medium bg-gradient-to-r from-sage-700 to-sage-600 text-white rounded-md shadow-md hover:shadow-lg hover:from-sage-800 hover:to-sage-700 hover:-translate-y-0.5 active:translate-y-0 active:shadow-md transition-all duration-300 focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2"
                >
                  {primaryCTA.label}
                </a>
              )}
              {secondaryCTA && (
                <a
                  href={secondaryCTA.href}
                  className="inline-flex items-center justify-center h-11 min-h-[44px] px-8 text-base font-medium border-2 border-clay-200 bg-clay-50 text-charcoal-800 rounded-md shadow-sm hover:bg-clay-100 hover:border-clay-300 transition-all duration-300 focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2"
                >
                  {secondaryCTA.label}
                </a>
              )}
            </div>
          )}

          {/* Custom children content */}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </div>
    </section>
  );

  return parallax ? (
    <ParallaxBackground speed={0.3}>
      {heroContent}
    </ParallaxBackground>
  ) : (
    heroContent
  );
}
