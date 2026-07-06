import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import {
  FloatingLabelInput,
  FloatingLabelTextarea,
} from "./floating-label-input";

expect.extend(toHaveNoViolations);

describe("FloatingLabelInput", () => {
  describe("Rendering", () => {
    it("renders with label text", () => {
      render(<FloatingLabelInput label="E-Mail" />);
      expect(screen.getByText("E-Mail")).toBeInTheDocument();
    });

    it("renders an input element", () => {
      render(<FloatingLabelInput label="Name" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("renders hint text when provided", () => {
      render(<FloatingLabelInput label="Name" hint="Dein vollständiger Name" />);
      expect(screen.getByText("Dein vollständiger Name")).toBeInTheDocument();
    });

    it("renders error message when provided", () => {
      render(<FloatingLabelInput label="Name" error="Name ist erforderlich" />);
      expect(screen.getByText("Name ist erforderlich")).toBeInTheDocument();
    });

    it("hides hint when error is shown", () => {
      render(
        <FloatingLabelInput
          label="Name"
          hint="Hilfetext"
          error="Fehler aufgetreten"
        />
      );
      expect(screen.getByText("Fehler aufgetreten")).toBeInTheDocument();
      expect(screen.queryByText("Hilfetext")).not.toBeInTheDocument();
    });
  });

  describe("Label Association (Accessibility)", () => {
    it("associates label with input via htmlFor/id", () => {
      render(<FloatingLabelInput label="E-Mail" />);
      const input = screen.getByRole("textbox");
      const label = screen.getByText("E-Mail");
      expect(label).toHaveAttribute("for", input.id);
    });

    it("uses provided id for the input", () => {
      render(<FloatingLabelInput label="E-Mail" id="email-input" />);
      const input = screen.getByRole("textbox");
      expect(input).toHaveAttribute("id", "email-input");
    });

    it("label htmlFor matches the provided input id", () => {
      render(<FloatingLabelInput label="E-Mail" id="email-input" />);
      const label = screen.getByText("E-Mail");
      expect(label).toHaveAttribute("for", "email-input");
    });
  });

  describe("Floating Label Behavior", () => {
    it("label is in rest position initially (no value, no focus)", () => {
      render(<FloatingLabelInput label="Name" />);
      const label = screen.getByText("Name");
      expect(label.className).toMatch(/top-1\/2|-translate-y-1\/2/);
    });

    it("label floats up on focus", async () => {
      render(<FloatingLabelInput label="Name" />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      const label = screen.getByText("Name");
      expect(label.className).toMatch(/-top-2\.5|scale-75/);
    });

    it("label floats up when value is set", () => {
      render(<FloatingLabelInput label="Name" value="Aisha" onChange={() => {}} />);
      const label = screen.getByText("Name");
      expect(label.className).toMatch(/-top-2\.5|scale-75/);
    });

    it("label floats up for numeric value 0", () => {
      render(<FloatingLabelInput label="Anzahl" value={0} onChange={() => {}} />);
      const label = screen.getByText("Anzahl");
      expect(label.className).toMatch(/-top-2\.5|scale-75/);
    });

    it("label returns to rest position when blurred without value", async () => {
      render(<FloatingLabelInput label="Name" />);
      const input = screen.getByRole("textbox");
      fireEvent.focus(input);
      fireEvent.blur(input);
      const label = screen.getByText("Name");
      expect(label.className).toMatch(/top-1\/2|-translate-y-1\/2/);
    });
  });

  describe("Variant Styling", () => {
    it("applies default border styling by default", () => {
      const { container } = render(<FloatingLabelInput label="Name" />);
      const input = container.querySelector("input");
      expect(input?.className).toMatch(/border-sage-200/);
    });

    it("applies error border styling for error variant", () => {
      const { container } = render(
        <FloatingLabelInput label="Name" variant="error" />
      );
      const input = container.querySelector("input");
      expect(input?.className).toMatch(/border-red-300/);
    });

    it("applies success border styling for success variant", () => {
      const { container } = render(
        <FloatingLabelInput label="Name" variant="success" />
      );
      const input = container.querySelector("input");
      expect(input?.className).toMatch(/border-emerald-300/);
    });
  });

  describe("Size Variants", () => {
    it("applies md size classes by default", () => {
      const { container } = render(<FloatingLabelInput label="Name" />);
      const input = container.querySelector("input");
      expect(input?.className).toMatch(/h-11/);
    });

    it("applies sm size classes for size='sm'", () => {
      const { container } = render(<FloatingLabelInput label="Name" size="sm" />);
      const input = container.querySelector("input");
      expect(input?.className).toMatch(/h-9/);
    });

    it("applies lg size classes for size='lg'", () => {
      const { container } = render(<FloatingLabelInput label="Name" size="lg" />);
      const input = container.querySelector("input");
      expect(input?.className).toMatch(/h-13/);
    });
  });

  describe("Accessibility", () => {
    it("has no axe violations", async () => {
      const { container } = render(
        <FloatingLabelInput label="E-Mail" id="email" />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations with error state", async () => {
      const { container } = render(
        <FloatingLabelInput
          label="E-Mail"
          id="email-error"
          error="Ungültige E-Mail"
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});

describe("FloatingLabelTextarea", () => {
  describe("Rendering", () => {
    it("renders with label text", () => {
      render(<FloatingLabelTextarea label="Nachricht" />);
      expect(screen.getByText("Nachricht")).toBeInTheDocument();
    });

    it("renders a textarea element", () => {
      render(<FloatingLabelTextarea label="Nachricht" />);
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });

  describe("Label Association (Accessibility)", () => {
    it("associates label with textarea via htmlFor/id", () => {
      render(<FloatingLabelTextarea label="Nachricht" />);
      const textarea = screen.getByRole("textbox");
      const label = screen.getByText("Nachricht");
      expect(label).toHaveAttribute("for", textarea.id);
    });

    it("uses provided id for the textarea", () => {
      render(<FloatingLabelTextarea label="Nachricht" id="message-area" />);
      const textarea = screen.getByRole("textbox");
      expect(textarea).toHaveAttribute("id", "message-area");
    });
  });

  describe("Floating Label Behavior", () => {
    it("label floats up when value is set", () => {
      render(
        <FloatingLabelTextarea
          label="Nachricht"
          value="Hallo"
          onChange={() => {}}
        />
      );
      const label = screen.getByText("Nachricht");
      expect(label.className).toMatch(/scale-75/);
    });

    it("label floats up for numeric value 0", () => {
      render(
        <FloatingLabelTextarea label="Anzahl" value="0" onChange={() => {}} />
      );
      const label = screen.getByText("Anzahl");
      expect(label.className).toMatch(/scale-75/);
    });
  });
});
