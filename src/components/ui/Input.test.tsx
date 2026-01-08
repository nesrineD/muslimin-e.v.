import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Input } from "./input";

expect.extend(toHaveNoViolations);

describe("Input Component", () => {
  describe("Rendering", () => {
    it("renders input element correctly", () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
    });

    it("renders as input element by default", () => {
      const { container } = render(<Input />);
      expect(container.querySelector("input")).toBeInTheDocument();
    });

    it("forwards ref correctly", () => {
      const ref = { current: null as HTMLInputElement | null };
      render(<Input ref={ref} />);
      expect(ref.current).toBeInstanceOf(HTMLInputElement);
    });
  });

  describe("States - Border Colors", () => {
    it("default state has cream-300 border", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("border-cream-300");
    });

    it("focus state has sage border", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/focus:border-sage/);
    });

    it("error state has clay border", () => {
      const { container } = render(<Input error />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("border-clay");
    });

    it("success state has sage border", () => {
      const { container } = render(<Input success />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("border-sage");
    });

    it("disabled state has lighter border", () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/border-cream-200|border-gray-200/);
    });
  });

  describe("State Icons", () => {
    it("error state shows error icon", () => {
      const { container } = render(
        <Input error errorMessage="Error message" />
      );
      // Look for error icon (typically AlertCircle or XCircle)
      const icon = container.querySelector('[class*="text-clay"]');
      expect(icon).toBeInTheDocument();
    });

    it("success state shows success icon", () => {
      const { container } = render(<Input success />);
      // Look for success icon (typically CheckCircle)
      const icon = container.querySelector('[class*="text-sage"]');
      expect(icon).toBeInTheDocument();
    });

    it("default state has no icon", () => {
      const { container } = render(<Input />);
      const icons = container.querySelectorAll("svg");
      expect(icons.length).toBe(0);
    });
  });

  describe("Error Messages", () => {
    it("displays error message when provided", () => {
      render(<Input error errorMessage="This field is required" />);
      expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    });

    it("error message has clay color", () => {
      const { container } = render(<Input error errorMessage="Error" />);
      const errorText = screen.getByText(/error/i);
      expect(errorText.className).toMatch(/text-clay/);
    });

    it("does not show error message when error is false", () => {
      render(<Input errorMessage="Should not appear" />);
      expect(screen.queryByText(/should not appear/i)).not.toBeInTheDocument();
    });
  });

  describe("Height Requirements (WCAG)", () => {
    it("has minimum 44px height for touch targets", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;

      // Allow for jsdom limitations, check class instead
      expect(input.className).toMatch(/h-11|h-12|min-h-\[44px\]/);
    });

    it("maintains 44px minimum height with padding", () => {
      const { container } = render(<Input className="py-2" />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/h-11|h-12|min-h-\[44px\]/);
    });
  });

  describe("Label Association", () => {
    it("associates with label via htmlFor and id", () => {
      render(
        <div>
          <label htmlFor="test-input">Label Text</label>
          <Input id="test-input" />
        </div>
      );
      const label = screen.getByText(/label text/i);
      const input = screen.getByRole("textbox");
      expect(label).toHaveAttribute("for", "test-input");
      expect(input).toHaveAttribute("id", "test-input");
    });

    it("can be accessed via getByLabelText", () => {
      render(
        <div>
          <label htmlFor="email-input">Email Address</label>
          <Input id="email-input" type="email" />
        </div>
      );
      const input = screen.getByLabelText(/email address/i);
      expect(input).toBeInTheDocument();
    });
  });

  describe("Input Types", () => {
    it("renders text input by default", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("type", "text");
    });

    it("supports email type", () => {
      const { container } = render(<Input type="email" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "email");
    });

    it("supports password type", () => {
      const { container } = render(<Input type="password" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "password");
    });

    it("supports tel type", () => {
      const { container } = render(<Input type="tel" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "tel");
    });

    it("supports number type", () => {
      const { container } = render(<Input type="number" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("type", "number");
    });
  });

  describe("Interactions", () => {
    it("calls onChange handler when value changes", () => {
      const handleChange = jest.fn();
      render(<Input onChange={handleChange} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    it("calls onFocus handler when focused", () => {
      const handleFocus = jest.fn();
      render(<Input onFocus={handleFocus} />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it("calls onBlur handler when blurred", () => {
      const handleBlur = jest.fn();
      render(<Input onBlur={handleBlur} />);
      const input = screen.getByRole("textbox");
      fireEvent.blur(input);
      expect(handleBlur).toHaveBeenCalledTimes(1);
    });

    it("updates value on user input", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLInputElement;
      fireEvent.change(input, { target: { value: "test value" } });
      expect(input.value).toBe("test value");
    });
  });

  describe("Disabled State", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Input disabled />);
      const input = screen.getByRole("textbox");
      expect(input).toBeDisabled();
    });

    it("does not call onChange when disabled", () => {
      const handleChange = jest.fn();
      render(<Input disabled onChange={handleChange} />);
      const input = screen.getByRole("textbox");
      fireEvent.change(input, { target: { value: "test" } });
      expect(handleChange).not.toHaveBeenCalled();
    });

    it("has reduced opacity when disabled", () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/opacity-50|opacity-60/);
    });

    it("has not-allowed cursor when disabled", () => {
      const { container } = render(<Input disabled />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/cursor-not-allowed/);
    });
  });

  describe("Placeholder and Value", () => {
    it("displays placeholder text", () => {
      render(<Input placeholder="Enter your name" />);
      expect(
        screen.getByPlaceholderText(/enter your name/i)
      ).toBeInTheDocument();
    });

    it("displays default value", () => {
      const { container } = render(<Input defaultValue="Default text" />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("Default text");
    });

    it("displays controlled value", () => {
      const { container } = render(
        <Input value="Controlled" onChange={() => {}} />
      );
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("Controlled");
    });
  });

  describe("Accessibility", () => {
    it("has no axe violations (default state)", async () => {
      const { container } = render(
        <div>
          <label htmlFor="input1">Label</label>
          <Input id="input1" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations (error state)", async () => {
      const { container } = render(
        <div>
          <label htmlFor="input2">Label</label>
          <Input id="input2" error errorMessage="Error message" />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations (disabled state)", async () => {
      const { container } = render(
        <div>
          <label htmlFor="input3">Label</label>
          <Input id="input3" disabled />
        </div>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("supports aria-label when no visible label", () => {
      render(<Input aria-label="Search" />);
      const input = screen.getByLabelText(/search/i);
      expect(input).toBeInTheDocument();
    });

    it("supports aria-describedby for error messages", () => {
      render(
        <div>
          <Input aria-describedby="error-msg" error />
          <span id="error-msg">Error description</span>
        </div>
      );
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-describedby", "error-msg");
    });

    it("has aria-invalid when error state", () => {
      render(<Input error />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Design System Compliance", () => {
    it("uses charcoal for text color", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/text-charcoal|text-gray-900/);
    });

    it("uses cream-300 border in default state", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("border-cream-300");
    });

    it("uses sage for focus state", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/focus:border-sage/);
    });

    it("uses clay for error state", () => {
      const { container } = render(<Input error />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("border-clay");
      expect(input.className).toMatch(/focus:border-clay/);
    });

    it("does not use hardcoded hex colors", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).not.toMatch(/#[0-9A-Fa-f]{3,8}/);
    });
  });

  describe("Focus States", () => {
    it("has visible focus indicator", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/focus:outline|focus:ring/);
    });

    it("focus indicator uses sage color", () => {
      const { container } = render(<Input />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input.className).toMatch(/focus:ring-sage|focus:border-sage/);
    });

    it("maintains focus state when typing", () => {
      render(<Input />);
      const input = screen.getByRole("textbox");
      input.focus();
      fireEvent.change(input, { target: { value: "typing" } });
      expect(input).toHaveFocus();
    });
  });

  describe("Custom Styling", () => {
    it("accepts custom className", () => {
      const { container } = render(<Input className="custom-class" />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("custom-class");
    });

    it("merges custom className with default classes", () => {
      const { container } = render(<Input className="mt-4" />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("mt-4");
      expect(input.className).toMatch(/border-cream-300/); // Default preserved
    });
  });

  describe("Edge Cases", () => {
    it("handles very long input text", () => {
      const longText = "a".repeat(200);
      const { container } = render(
        <Input value={longText} onChange={() => {}} />
      );
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe(longText);
    });

    it("handles empty string value", () => {
      const { container } = render(<Input value="" onChange={() => {}} />);
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe("");
    });

    it("handles special characters in value", () => {
      const specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const { container } = render(
        <Input value={specialChars} onChange={() => {}} />
      );
      const input = container.querySelector("input") as HTMLInputElement;
      expect(input.value).toBe(specialChars);
    });

    it("handles both error and success props (error takes precedence)", () => {
      const { container } = render(<Input error success />);
      const input = container.querySelector("input") as HTMLElement;
      expect(input).toHaveClass("border-clay");
      expect(input).not.toHaveClass("border-sage");
    });
  });

  describe("Form Integration", () => {
    it("can be used in a form", () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Input name="testInput" />
          <button type="submit">Submit</button>
        </form>
      );
      const button = screen.getByRole("button", { name: /submit/i });
      fireEvent.click(button);
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it("includes name attribute", () => {
      const { container } = render(<Input name="username" />);
      const input = container.querySelector("input");
      expect(input).toHaveAttribute("name", "username");
    });

    it("supports required attribute", () => {
      render(<Input required />);
      const input = screen.getByRole("textbox");
      expect(input).toBeRequired();
    });
  });
});
