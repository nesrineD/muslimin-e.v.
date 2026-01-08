import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-all focus:outline focus:outline-2 focus:outline-sage focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-clay text-white shadow-md hover:brightness-110 active:brightness-95",
        secondary:
          "border-2 border-sage text-sage bg-transparent hover:bg-sage hover:text-white active:bg-sage/90",
        passive:
          "bg-warm-400 text-charcoal shadow-sm hover:brightness-105 active:brightness-95",
      },
      size: {
        sm: "h-9 min-h-[36px] px-4 text-sm",
        md: "h-11 min-h-[44px] px-6 text-base",
        lg: "h-13 min-h-[52px] px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "secondary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
