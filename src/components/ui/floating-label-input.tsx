'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface FloatingLabelInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  error?: string;
  hint?: string;
  variant?: 'default' | 'success' | 'error';
}

/**
 * FloatingLabelInput Component
 * Input with animated floating label that rises on focus/fill
 * 
 * Features:
 * - Smooth label animation
 * - Focus ring with sage color
 * - Optional icon support
 * - Error/success states
 * - Hint text support
 * - Mobile-friendly
 * 
 * Usage:
 * <FloatingLabelInput
 *   label="Email Address"
 *   type="email"
 *   icon={<Mail className="w-4 h-4" />}
 * />
 */
export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      className,
      size = 'md',
      icon,
      error,
      hint,
      variant = 'default',
      onFocus,
      onBlur,
      value,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.toString().length > 0;
    const isActive = isFocused || hasValue;

    const sizeClasses = {
      sm: 'px-3 py-2 text-sm h-9',
      md: 'px-4 py-2.5 text-base h-11',
      lg: 'px-5 py-3 text-lg h-13',
    };

    const borderClass = {
      default:
        'border-sage-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500/20',
      success: 'border-emerald-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20',
      error:
        'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500/20',
    }[variant];

    return (
      <div className="relative w-full">
        <div className="relative">
          {/* Icon */}
          {icon && (
            <div
              className={cn(
                'absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none transition-colors duration-200',
                {
                  'text-sage-600': isFocused,
                  'text-charcoal-400': !isFocused,
                },
              )}
            >
              {icon}
            </div>
          )}

          {/* Input */}
          <input
            ref={ref}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              'w-full bg-white border-2 rounded-lg transition-all duration-300',
              'focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
              sizeClasses[size],
              borderClass,
              icon && 'pl-10',
              className,
            )}
            placeholder=" "
            {...props}
          />

          {/* Floating Label */}
          <label
            className={cn(
              'absolute left-4 origin-left transition-all duration-300 pointer-events-none',
              'font-body text-charcoal-700 font-medium',
              {
                // Active state (floating)
                '-top-2.5 scale-75 bg-white px-1 text-sage-700':
                  isActive,
                // Inactive state (inside input)
                'top-1/2 -translate-y-1/2 scale-100 text-charcoal-400':
                  !isActive,
              },
              icon && !isActive && 'left-10',
            )}
          >
            {label}
          </label>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-600 animate-fade-in-up">
            {error}
          </p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-charcoal-500">{hint}</p>
        )}
      </div>
    );
  },
);

FloatingLabelInput.displayName = 'FloatingLabelInput';

/**
 * FloatingLabelTextarea Component
 * Textarea with floating label (similar to input)
 */
export const FloatingLabelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    error?: string;
    hint?: string;
    variant?: 'default' | 'success' | 'error';
  }
>(
  (
    {
      label,
      className,
      error,
      hint,
      variant = 'default',
      onFocus,
      onBlur,
      value,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasValue = value && value.toString().length > 0;
    const isActive = isFocused || hasValue;

    const borderClass = {
      default:
        'border-sage-200 focus:border-sage-500 focus:ring-1 focus:ring-sage-500/20',
      success: 'border-emerald-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20',
      error:
        'border-red-300 focus:border-red-500 focus:ring-1 focus:ring-red-500/20',
    }[variant];

    return (
      <div className="relative w-full">
        <div className="relative">
          {/* Textarea */}
          <textarea
            ref={ref}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            className={cn(
              'w-full bg-white border-2 rounded-lg px-4 py-2.5 resize-vertical',
              'transition-all duration-300 focus:outline-none min-h-[120px]',
              'disabled:cursor-not-allowed disabled:opacity-50',
              borderClass,
              className,
            )}
            placeholder=" "
            {...props}
          />

          {/* Floating Label */}
          <label
            className={cn(
              'absolute left-4 origin-left transition-all duration-300 pointer-events-none',
              'font-body text-charcoal-700 font-medium',
              {
                // Active state (floating)
                'top-2 scale-75 bg-white px-1 text-sage-700': isActive,
                // Inactive state (inside textarea)
                'top-3 scale-100 text-charcoal-400': !isActive,
              },
            )}
          >
            {label}
          </label>
        </div>

        {/* Error message */}
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-600 animate-fade-in-up">
            {error}
          </p>
        )}

        {/* Hint text */}
        {hint && !error && (
          <p className="mt-1.5 text-xs text-charcoal-500">{hint}</p>
        )}
      </div>
    );
  },
);

FloatingLabelTextarea.displayName = 'FloatingLabelTextarea';
