import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  background?: "white" | "sand" | "cream";
  as?: "section" | "div" | "article";
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      className,
      background = "white",
      as: Component = "section",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        className={cn(
          "w-full",
          {
            "bg-white": background === "white",
            "bg-sand": background === "sand",
            "bg-cream-50": background === "cream",
          },
          className
        )}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {children}
        </div>
      </Component>
    );
  }
);
Section.displayName = "Section";

export { Section };
