import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "white" | "cream"
  padding?: "sm" | "md" | "lg"
  href?: string
  as?: "div" | "article" | "section"
}

const Card = React.forwardRef<HTMLElement, CardProps>(
  ({ className, variant = "white", padding = "md", href, as = "article", onClick, ...props }, ref) => {
    const baseClasses = cn(
      "rounded-xl shadow-card-standard transition-all",
      {
        "bg-white": variant === "white",
        "bg-cream-50": variant === "cream",
        "p-4": padding === "sm",
        "p-6": padding === "md",
        "p-8": padding === "lg",
        "hover:-translate-y-1 hover:shadow-lg cursor-pointer": href || onClick,
      },
      className
    )

    if (href) {
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={cn(baseClasses, "block focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2")}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        />
      )
    }

    const Component = as
    return (
      <Component
        ref={ref as React.Ref<HTMLElement>}
        className={cn(baseClasses, onClick && "focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2")}
        onClick={onClick}
        {...(onClick ? { tabIndex: 0 } : {})}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
