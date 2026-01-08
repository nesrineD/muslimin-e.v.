import * as React from "react"

import { cn } from "@/lib/utils"

interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  error?: boolean
  success?: boolean
  errorMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", error, success, errorMessage, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-11 min-h-[44px] w-full rounded-lg border px-4 py-3 text-base text-charcoal bg-white shadow-sm transition-all",
              "placeholder:text-gray-400",
              "focus:outline-none focus:ring-2 focus:ring-sage/20",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-200",
              {
                "border-cream-300 focus:border-sage": !error && !success,
                "border-clay focus:border-clay focus:ring-clay/20": error,
                "border-sage focus:border-sage focus:ring-sage/20": success && !error,
              },
              className
            )}
            ref={ref}
            aria-invalid={error ? "true" : undefined}
            {...props}
          />
          {error && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-clay">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </span>
          )}
          {success && !error && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sage">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>
        {error && errorMessage && (
          <p className="text-clay text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
