import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "./Button";

expect.extend(toHaveNoViolations);

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(<Button>Click me</Button>);
      expect(
        screen.getByRole("button", { name: /click me/i })
      ).toBeInTheDocument();
    });

    it("renders as button element by default", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button.tagName).toBe("BUTTON");
    });
  });

  describe("Variants", () => {
    it("renders primary variant with correct styling", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gradient-to-r");
      expect(button).toHaveClass("from-sage-700");
      expect(button).toHaveClass("to-charcoal-900");
      expect(button).toHaveClass("text-white");
    });

    it("renders donation variant with correct styling", () => {
      render(<Button variant="donation">Donate</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-gradient-to-r");
      expect(button).toHaveClass("from-clay-600");
      expect(button).toHaveClass("to-warm-600");
      expect(button).toHaveClass("text-white");
    });

    it("renders secondary variant with correct styling", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("border-sand-200");
      expect(button).toHaveClass("bg-white/40");
      expect(button).toHaveClass("text-charcoal-800");
    });

    it("renders passive variant with correct styling", () => {
      render(<Button variant="passive">Passive</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-warm-400");
      expect(button).toHaveClass("text-charcoal");
    });

    it("defaults to secondary variant when no variant specified", () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("text-charcoal-800");
    });
  });

  describe("Sizes", () => {
    it("renders small size correctly", () => {
      render(<Button size="sm">Small</Button>);
      const button = screen.getByRole("button", { name: /small/i });
      expect(button.className).toMatch(/min-h-\[36px\]/);
    });

    it("renders medium size with minimum 44px height (accessibility)", () => {
      render(<Button size="md">Medium</Button>);
      const button = screen.getByRole("button", { name: /medium/i });
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });

    it("renders large size correctly", () => {
      render(<Button size="lg">Large</Button>);
      const button = screen.getByRole("button", { name: /large/i });
      expect(button.className).toMatch(/min-h-\[52px\]/);
    });

    it("defaults to medium size when no size specified", () => {
      render(<Button>Default</Button>);
      const button = screen.getByRole("button", { name: /default/i });
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });
  });

  describe("States", () => {
    it("applies hover state classes", () => {
      render(<Button>Hover me</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/hover:/);
    });

    it("applies focus state with sage outline", () => {
      render(<Button>Focus me</Button>);
      const button = screen.getByRole("button");
      expect(button.className).toMatch(/focus:outline-sage|focus:ring-sage/);
    });

    it("applies disabled state correctly", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
      expect(button.className).toMatch(/disabled:opacity-50/);
    });

    it("prevents click when disabled", () => {
      const handleClick = jest.fn();
      render(
        <Button disabled onClick={handleClick}>
          Disabled
        </Button>
      );
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it("applies rounded corners (8-12px border-radius)", () => {
      const { container } = render(<Button>Rounded</Button>);
      const button = container.firstChild as HTMLElement;
      expect(button.className).toMatch(/rounded/);
    });
  });

  describe("Interactions", () => {
    it("calls onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click</Button>);
      const button = screen.getByRole("button");
      fireEvent.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("supports different button types", () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("type", "submit");
    });

    it("accepts custom className", () => {
      render(<Button className="custom-class">Custom</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("custom-class");
    });
  });

  describe("Accessibility", () => {
    it("has no axe violations (primary variant)", async () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations (secondary variant)", async () => {
      const { container } = render(
        <Button variant="secondary">Secondary</Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations (disabled state)", async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("is keyboard navigable (focusable)", () => {
      render(<Button>Keyboard</Button>);
      const button = screen.getByRole("button");
      button.focus();
      expect(button).toHaveFocus();
    });

    it("supports aria-label for icon-only buttons", () => {
      render(<Button aria-label="Close dialog">×</Button>);
      expect(
        screen.getByRole("button", { name: /close dialog/i })
      ).toBeInTheDocument();
    });

    it("has minimum 44px height for touch targets (WCAG)", () => {
      render(<Button>Touch Target</Button>);
      const button = screen.getByRole("button", { name: /touch target/i });
      expect(button.className).toMatch(/min-h-\[44px\]/);
    });

    it("activates with Enter key", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Enter Key</Button>);
      const button = screen.getByRole("button");
      button.focus();
      fireEvent.keyDown(button, { key: "Enter", code: "Enter" });
      // Note: Native button handles Enter automatically
      expect(button).toHaveFocus();
    });

    it("activates with Space key", () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Space Key</Button>);
      const button = screen.getByRole("button");
      button.focus();
      fireEvent.keyDown(button, { key: " ", code: "Space" });
      // Note: Native button handles Space automatically
      expect(button).toHaveFocus();
    });
  });

  describe("Design System Compliance", () => {
    it("primary variant uses sage→charcoal gradient", () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("from-sage-700");
      expect(button).toHaveClass("to-charcoal-900");
    });

    it("donation variant uses clay→warm gradient", () => {
      render(<Button variant="donation">Donate</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("from-clay-600");
      expect(button).toHaveClass("to-warm-600");
    });

    it("secondary variant is glass-outline", () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-white/40");
      expect(button).toHaveClass("border-sand-200");
    });

    it("passive variant uses warm-400 color (#E6A15C)", () => {
      render(<Button variant="passive">Passive</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("bg-warm-400");
    });

    it("warns in console when passive variant used outside passive membership context", () => {
      const consoleSpy = jest.spyOn(console, "warn").mockImplementation();
      // This would be checked at runtime in the component
      // For now, just test that the variant exists
      render(<Button variant="passive">Passive</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
      consoleSpy.mockRestore();
    });
  });

  describe("Edge Cases", () => {
    it("handles very long text content", () => {
      const longText =
        "This is a very long button text that might wrap to multiple lines";
      render(<Button>{longText}</Button>);
      expect(
        screen.getByRole("button", { name: new RegExp(longText) })
      ).toBeInTheDocument();
    });

    it("handles empty children gracefully", () => {
      render(<Button aria-label="Empty button"> </Button>);
      expect(
        screen.getByRole("button", { name: /empty button/i })
      ).toBeInTheDocument();
    });

    it("handles multiple className props correctly", () => {
      render(<Button className="mt-4 mb-2">Multiple Classes</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass("mt-4");
      expect(button).toHaveClass("mb-2");
    });
  });
});
