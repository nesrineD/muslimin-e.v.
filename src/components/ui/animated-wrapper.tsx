'use client';

import React, { useEffect, useRef, useState } from 'react';

interface AnimatedWrapperProps {
  children: React.ReactNode;
  animation?: 'fade-in-up' | 'fade-in' | 'scale-in' | 'slide-in-left' | 'slide-in-right';
  delay?: number; // in ms
  duration?: number; // in ms
  threshold?: number; // 0-1, how much of the element should be visible
  triggerOnce?: boolean; // only animate once
  className?: string;
}

/**
 * AnimatedWrapper Component
 * Wraps elements to trigger animations on scroll visibility
 * 
 * Animations:
 * - fade-in-up: fade in while sliding up (recommended for cards)
 * - fade-in: simple fade without movement
 * - scale-in: grow from center
 * - slide-in-left: slide from left
 * - slide-in-right: slide from right
 * 
 * Usage:
 * <AnimatedWrapper animation="fade-in-up" threshold={0.2}>
 *   <Card />
 * </AnimatedWrapper>
 */
export function AnimatedWrapper({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  triggerOnce = true,
  className = '',
}: AnimatedWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip if already animated and triggerOnce is true
    if (triggerOnce && hasAnimated) return;

    // Skip animation on reduced motion preference — render content immediately visible
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      if (triggerOnce) setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            setHasAnimated(true);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, triggerOnce, threshold]);

  const animationClass = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in': 'animate-fade-in',
    'scale-in': 'animate-scale-in',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
  }[animation];

  return (
    <div
      ref={ref}
      className={`${className} ${isVisible ? animationClass : 'opacity-0'}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionProperty: isVisible ? 'all' : 'none',
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number; // delay between each child (ms)
  animation?: 'fade-in-up' | 'fade-in' | 'scale-in' | 'slide-in-left' | 'slide-in-right';
  className?: string;
}

/**
 * StaggerContainer Component
 * Automatically staggers animation of children
 * 
 * Usage:
 * <StaggerContainer staggerDelay={100}>
 *   <Card />
 *   <Card />
 *   <Card />
 * </StaggerContainer>
 */
export function StaggerContainer({
  children,
  staggerDelay = 100,
  animation = 'fade-in-up',
  className = '',
}: StaggerContainerProps) {
  const childrenArray = React.Children.toArray(children);

  return (
    <div className={className}>
      {childrenArray.map((child, index) => (
        <AnimatedWrapper
          key={index}
          animation={animation}
          delay={index * staggerDelay}
        >
          {child}
        </AnimatedWrapper>
      ))}
    </div>
  );
}

interface ScrollProgressBarProps {
  color?: string; // Tailwind color class
  height?: string; // height in px
  className?: string;
}

/**
 * ScrollProgressBar Component
 * Shows page scroll progress at the top
 * 
 * Usage:
 * <ScrollProgressBar color="bg-sage-500" height="4" />
 */
export function ScrollProgressBar({
  color = 'bg-gradient-to-r from-sage-500 to-clay-500',
  height = '3',
  className = '',
}: ScrollProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / windowHeight) * 100;
      setProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 z-50 ${color} transition-all duration-300 ${className}`}
      style={{
        width: `${progress}%`,
        height: `${height}px`,
      }}
    />
  );
}

interface CountUpProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

/**
 * CountUp Component
 * Animates counting from start to end number on scroll
 * Perfect for statistics and metrics
 * 
 * Usage:
 * <CountUp end={1000} suffix="+" duration={2000} />
 */
export function CountUp({
  end,
  start = 0,
  duration = 2000,
  suffix = '',
  prefix = '',
  className = '',
}: CountUpProps) {
  const [count, setCount] = useState(start);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let animationFrameId: number;
    let startTime: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const currentCount = Math.floor(start + (end - start) * progress);
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, start, end, duration]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </div>
  );
}
