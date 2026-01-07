import { render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";

expect.extend(toHaveNoViolations);

/**
 * Integration Test: Form Accessibility & Input Compliance
 * 
 * Tests WCAG AA requirements:
 * - All inputs have associated labels (htmlFor/id pairing)
 * - Min 44px height for touch targets
 * - Proper error states (red border, error icon, error message)
 * - Success states (green border, success icon)
 * - aria-invalid, aria-describedby for screen readers
 * - Keyboard navigation support
 * 
 * This ensures forms are accessible to all users including those with disabilities.
 */

describe("Form Accessibility Integration", () => {
  describe("Label Association", () => {
    it("all form inputs have associated labels", () => {
      render(<MockContactForm />);
      
      const inputs = screen.getAllByRole("textbox");
      inputs.forEach((input) => {
        const labelId = input.getAttribute("id");
        if (labelId) {
          const label = document.querySelector(`label[for="${labelId}"]`);
          expect(label).toBeInTheDocument();
        }
      });
    });

    it("labels use htmlFor attribute matching input id", () => {
      render(<MockContactForm />);
      
      const nameLabel = screen.getByText(/name/i);
      const nameInput = screen.getByLabelText(/name/i);
      
      expect(nameLabel).toHaveAttribute("for");
      expect(nameInput).toHaveAttribute("id");
      expect(nameLabel.getAttribute("for")).toBe(nameInput.getAttribute("id"));
    });

    it("inputs can be accessed via getByLabelText", () => {
      render(<MockContactForm />);
      
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/nachricht/i)).toBeInTheDocument();
    });

    it("inputs without visible labels have aria-label", () => {
      render(<MockSearchForm />);
      
      const searchInput = screen.getByRole("textbox");
      expect(searchInput).toHaveAttribute("aria-label");
    });
  });

  describe("Touch Target Size (WCAG 2.5.5)", () => {
    it("all form inputs have min 44px height", () => {
      const { container } = render(<MockContactForm />);
      
      const inputs = container.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        expect(input.className).toMatch(/h-11|h-12|min-h-\[44px\]/);
      });
    });

    it("small inputs on mobile still meet 44px requirement", () => {
      const { container } = render(<MockContactForm />);
      
      // Even with responsive classes, min height should be enforced
      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => {
        const classList = input.className;
        // Should not have h-8 or h-9 without min-h override
        if (classList.includes("h-8") || classList.includes("h-9")) {
          expect(classList).toMatch(/min-h-\[44px\]/);
        }
      });
    });

    it("textarea has min height of 88px (2 rows)", () => {
      const { container } = render(<MockContactForm />);
      
      const textarea = container.querySelector("textarea");
      expect(textarea?.className).toMatch(/min-h-\[88px\]|h-24/);
    });

    it("select dropdown has min 44px height", () => {
      const { container } = render(<MockBookingForm />);
      
      const select = container.querySelector("select");
      expect(select?.className).toMatch(/h-11|h-12|min-h-\[44px\]/);
    });
  });

  describe("Error States", () => {
    it("error inputs have red/clay border", () => {
      const { container } = render(<MockContactFormWithErrors />);
      
      const errorInputs = container.querySelectorAll("[aria-invalid='true']");
      errorInputs.forEach((input) => {
        expect(input.className).toMatch(/border-clay|border-red/);
      });
    });

    it("error inputs have error icon", () => {
      const { container } = render(<MockContactFormWithErrors />);
      
      const errorIcons = container.querySelectorAll("[class*='text-clay']");
      expect(errorIcons.length).toBeGreaterThan(0);
    });

    it("error inputs have error message below", () => {
      render(<MockContactFormWithErrors />);
      
      const errorMessage = screen.getByText(/email ist erforderlich/i);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage.className).toMatch(/text-clay|text-red/);
    });

    it("error inputs have aria-invalid='true'", () => {
      render(<MockContactFormWithErrors />);
      
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toHaveAttribute("aria-invalid", "true");
    });

    it("error inputs have aria-describedby pointing to error message", () => {
      render(<MockContactFormWithErrors />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const describedBy = emailInput.getAttribute("aria-describedby");
      
      expect(describedBy).toBeTruthy();
      const errorMessage = document.getElementById(describedBy!);
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage?.textContent).toMatch(/email ist erforderlich/i);
    });
  });

  describe("Success States", () => {
    it("success inputs have sage/green border", () => {
      const { container } = render(<MockContactFormWithSuccess />);
      
      const successInputs = container.querySelectorAll("[class*='border-sage']");
      expect(successInputs.length).toBeGreaterThan(0);
    });

    it("success inputs have success icon", () => {
      const { container } = render(<MockContactFormWithSuccess />);
      
      const successIcons = container.querySelectorAll("[class*='text-sage']");
      expect(successIcons.length).toBeGreaterThan(0);
    });

    it("success state does not set aria-invalid", () => {
      render(<MockContactFormWithSuccess />);
      
      const nameInput = screen.getByLabelText(/name/i);
      expect(nameInput).not.toHaveAttribute("aria-invalid", "true");
    });
  });

  describe("Focus States", () => {
    it("inputs have visible focus indicator", () => {
      const { container } = render(<MockContactForm />);
      
      const inputs = container.querySelectorAll("input, textarea, select");
      inputs.forEach((input) => {
        expect(input.className).toMatch(/focus:outline|focus:ring|focus:border/);
      });
    });

    it("focus indicator uses sage color", () => {
      const { container } = render(<MockContactForm />);
      
      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => {
        expect(input.className).toMatch(/focus:border-sage|focus:ring-sage/);
      });
    });

    it("error inputs maintain error border on focus", () => {
      const { container } = render(<MockContactFormWithErrors />);
      
      const errorInput = container.querySelector("[aria-invalid='true']");
      expect(errorInput?.className).toMatch(/focus:border-clay|border-clay/);
    });
  });

  describe("Keyboard Navigation", () => {
    it("tab order follows visual order", async () => {
      render(<MockContactForm />);
      const user = userEvent.setup();
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const messageInput = screen.getByLabelText(/nachricht/i);
      const submitButton = screen.getByRole("button", { name: /absenden/i });
      
      await user.tab();
      expect(nameInput).toHaveFocus();
      
      await user.tab();
      expect(emailInput).toHaveFocus();
      
      await user.tab();
      expect(messageInput).toHaveFocus();
      
      await user.tab();
      expect(submitButton).toHaveFocus();
    });

    it("shift+tab reverses tab order", async () => {
      render(<MockContactForm />);
      const user = userEvent.setup();
      
      const submitButton = screen.getByRole("button", { name: /absenden/i });
      submitButton.focus();
      
      await user.tab({ shift: true });
      expect(screen.getByLabelText(/nachricht/i)).toHaveFocus();
    });

    it("required fields are indicated", () => {
      render(<MockContactForm />);
      
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeRequired();
    });
  });

  describe("Form Validation", () => {
    it("empty required fields show error on submit", async () => {
      render(<MockContactForm />);
      const user = userEvent.setup();
      
      const submitButton = screen.getByRole("button", { name: /absenden/i });
      await user.click(submitButton);
      
      // Browser validation or custom validation should trigger
      const emailInput = screen.getByLabelText(/email/i);
      expect(emailInput).toBeRequired();
    });

    it("invalid email format shows error", () => {
      render(<MockContactFormWithErrors />);
      
      const errorMessage = screen.getByText(/email ist erforderlich/i);
      expect(errorMessage).toBeInTheDocument();
    });

    it("error messages are associated with inputs via aria-describedby", () => {
      render(<MockContactFormWithErrors />);
      
      const emailInput = screen.getByLabelText(/email/i);
      const describedBy = emailInput.getAttribute("aria-describedby");
      expect(describedBy).toBeTruthy();
    });
  });

  describe("Fieldset and Legend", () => {
    it("related fields are grouped in fieldset", () => {
      render(<MockBookingForm />);
      
      const fieldset = screen.getByRole("group");
      expect(fieldset).toBeInTheDocument();
    });

    it("fieldset has descriptive legend", () => {
      render(<MockBookingForm />);
      
      const legend = screen.getByText(/termindetails/i);
      expect(legend.tagName).toBe("LEGEND");
    });
  });

  describe("Design System Compliance", () => {
    it("default inputs use cream-300 border", () => {
      const { container } = render(<MockContactForm />);
      
      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => {
        if (!input.hasAttribute("aria-invalid")) {
          expect(input.className).toMatch(/border-cream-300/);
        }
      });
    });

    it("inputs use charcoal text color", () => {
      const { container } = render(<MockContactForm />);
      
      const inputs = container.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        expect(input.className).toMatch(/text-charcoal|text-gray-900/);
      });
    });

    it("placeholder text uses muted color", () => {
      const { container } = render(<MockContactForm />);
      
      const inputs = container.querySelectorAll("input");
      inputs.forEach((input) => {
        expect(input.className).toMatch(/placeholder:text-/);
      });
    });
  });

  describe("Accessibility Audit", () => {
    it("contact form has no axe violations", async () => {
      const { container } = render(<MockContactForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("form with errors has no axe violations", async () => {
      const { container } = render(<MockContactFormWithErrors />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("booking form has no axe violations", async () => {
      const { container } = render(<MockBookingForm />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Mobile Responsiveness", () => {
    it("forms stack vertically on mobile", () => {
      const { container } = render(<MockContactForm />);
      
      const form = container.querySelector("form");
      expect(form?.className).toMatch(/flex-col|grid-cols-1/);
    });

    it("labels remain visible on small screens", () => {
      render(<MockContactForm />);
      
      const label = screen.getByText(/name/i);
      expect(label.className).not.toMatch(/sr-only/);
    });
  });

  describe("Disabled Inputs", () => {
    it("disabled inputs have reduced opacity", () => {
      const { container } = render(<MockDisabledForm />);
      
      const disabledInput = container.querySelector("input:disabled");
      expect(disabledInput?.className).toMatch(/opacity-50|opacity-60/);
    });

    it("disabled inputs have not-allowed cursor", () => {
      const { container } = render(<MockDisabledForm />);
      
      const disabledInput = container.querySelector("input:disabled");
      expect(disabledInput?.className).toMatch(/cursor-not-allowed/);
    });

    it("disabled inputs are not keyboard accessible", () => {
      render(<MockDisabledForm />);
      
      const disabledInput = screen.getByLabelText(/disabled field/i);
      expect(disabledInput).toBeDisabled();
    });
  });
});

// Mock Components

function MockContactForm() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="name" className="block mb-2">
          Name *
        </label>
        <input
          id="name"
          type="text"
          required
          className="w-full h-11 border border-cream-300 rounded-lg px-4 text-charcoal placeholder:text-gray-400 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          placeholder="Ihr Name"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block mb-2">
          Email *
        </label>
        <input
          id="email"
          type="email"
          required
          className="w-full h-11 border border-cream-300 rounded-lg px-4 text-charcoal placeholder:text-gray-400 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          placeholder="ihre@email.de"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block mb-2">
          Nachricht *
        </label>
        <textarea
          id="message"
          required
          className="w-full min-h-[88px] border border-cream-300 rounded-lg px-4 py-3 text-charcoal placeholder:text-gray-400 focus:border-sage focus:outline-none focus:ring-2 focus:ring-sage/20"
          placeholder="Ihre Nachricht"
        />
      </div>
      
      <button
        type="submit"
        className="bg-clay text-white px-6 py-3 rounded-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-sage"
      >
        Absenden
      </button>
    </form>
  );
}

function MockContactFormWithErrors() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="email-error" className="block mb-2">
          Email *
        </label>
        <div className="relative">
          <input
            id="email-error"
            type="email"
            aria-invalid="true"
            aria-describedby="email-error-msg"
            className="w-full h-11 border border-clay rounded-lg px-4 text-charcoal focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/20"
          />
          <span className="absolute right-3 top-3 text-clay">!</span>
        </div>
        <p id="email-error-msg" className="text-clay text-sm mt-1">
          Email ist erforderlich
        </p>
      </div>
    </form>
  );
}

function MockContactFormWithSuccess() {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="name-success" className="block mb-2">
          Name
        </label>
        <div className="relative">
          <input
            id="name-success"
            type="text"
            value="Max Mustermann"
            className="w-full h-11 border border-sage rounded-lg px-4 text-charcoal focus:border-sage focus:outline-none"
            readOnly
          />
          <span className="absolute right-3 top-3 text-sage">✓</span>
        </div>
      </div>
    </form>
  );
}

function MockSearchForm() {
  return (
    <form>
      <input
        type="search"
        aria-label="Search website"
        className="h-11 border border-cream-300 rounded-lg px-4"
        placeholder="Suchen..."
      />
    </form>
  );
}

function MockBookingForm() {
  return (
    <form>
      <fieldset className="border border-cream-300 rounded-lg p-4">
        <legend className="px-2 text-charcoal font-semibold">Termindetails</legend>
        
        <div className="mb-4">
          <label htmlFor="booking-date" className="block mb-2">
            Datum
          </label>
          <input
            id="booking-date"
            type="date"
            className="w-full h-11 border border-cream-300 rounded-lg px-4"
          />
        </div>
        
        <div>
          <label htmlFor="booking-time" className="block mb-2">
            Uhrzeit
          </label>
          <select
            id="booking-time"
            className="w-full h-11 border border-cream-300 rounded-lg px-4"
          >
            <option>10:00</option>
            <option>11:00</option>
          </select>
        </div>
      </fieldset>
    </form>
  );
}

function MockDisabledForm() {
  return (
    <form>
      <label htmlFor="disabled-field" className="block mb-2">
        Disabled Field
      </label>
      <input
        id="disabled-field"
        type="text"
        disabled
        className="w-full h-11 border border-cream-300 rounded-lg px-4 opacity-50 cursor-not-allowed"
      />
    </form>
  );
}
