import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';

interface FormErrorProps {
  message?: string;
  icon?: React.ReactNode;
}

/**
 * FormError Component
 * Displays error message with icon and animation
 */
export function FormError({ message, icon }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="mt-1.5 flex items-center gap-2 animate-fade-in-up">
      {icon || <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />}
      <p className="text-xs font-medium text-red-600">{message}</p>
    </div>
  );
}

interface FormHintProps {
  message?: string;
  icon?: React.ReactNode;
}

/**
 * FormHint Component
 * Displays helper/hint text below inputs
 */
export function FormHint({ message, icon }: FormHintProps) {
  if (!message) return null;

  return (
    <div className="mt-1.5 flex items-center gap-2">
      {icon || <Info className="w-4 h-4 text-charcoal-400 flex-shrink-0" />}
      <p className="text-xs text-charcoal-500">{message}</p>
    </div>
  );
}

interface FormSuccessProps {
  message?: string;
  icon?: React.ReactNode;
}

/**
 * FormSuccess Component
 * Displays success message with animation
 */
export function FormSuccess({ message, icon }: FormSuccessProps) {
  if (!message) return null;

  return (
    <div className="mt-1.5 flex items-center gap-2 animate-fade-in-up">
      {icon || (
        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
      )}
      <p className="text-xs font-medium text-emerald-600">{message}</p>
    </div>
  );
}

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  hint?: string;
}

/**
 * FormLabel Component
 * Enhanced label with optional required indicator and hint
 */
export function FormLabel({
  className,
  required,
  hint,
  children,
  ...props
}: FormLabelProps) {
  return (
    <div className="space-y-1">
      <label
        className={cn(
          'text-sm font-semibold text-charcoal-800 transition-colors',
          className,
        )}
        {...props}
      >
        {children}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {hint && (
        <p className="text-xs text-charcoal-500">{hint}</p>
      )}
    </div>
  );
}

interface FormFieldProps {
  children: React.ReactNode;
  label?: string;
  required?: boolean;
  hint?: string;
  error?: string;
  success?: boolean;
  className?: string;
}

/**
 * FormField Component
 * Wraps input + label + error/hint for consistent spacing
 */
export function FormField({
  children,
  label,
  required,
  hint,
  error,
  success,
  className,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2', className)}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      {children}
      {error && <FormError message={error} />}
      {success && !error && <FormSuccess message="Sieht gut aus!" />}
      {hint && !error && <FormHint message={hint} />}
    </div>
  );
}

interface PasswordStrengthProps {
  password?: string;
}

/**
 * PasswordStrength Component
 * Shows password strength indicator
 */
export function PasswordStrength({ password }: PasswordStrengthProps) {
  if (!password) return null;

  const getStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[^a-zA-Z\d]/.test(pwd)) strength++;
    return strength;
  };

  const strength = getStrength(password);
  const strengthMap = {
    0: { label: 'Schwach', color: 'bg-red-500' },
    1: { label: 'Schwach', color: 'bg-red-500' },
    2: { label: 'Mittel', color: 'bg-amber-500' },
    3: { label: 'Gut', color: 'bg-blue-500' },
    4: { label: 'Stark', color: 'bg-emerald-500' },
  };

  const current = strengthMap[strength as keyof typeof strengthMap];

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-colors',
              i < strength ? current.color : 'bg-charcoal-200',
            )}
          />
        ))}
      </div>
      <p className="text-xs text-charcoal-500">
        Passwortstärke: <span className="font-semibold">{current.label}</span>
      </p>
    </div>
  );
}
