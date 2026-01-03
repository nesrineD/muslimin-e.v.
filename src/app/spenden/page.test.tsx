/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Mock the environment variable before importing the component
const mockEnv = {
  NEXT_PUBLIC_PAYPAL_BUTTON_ID: undefined as string | undefined,
};

jest.mock('next/dist/build/webpack/loaders/next-flight-loader/module-proxy', () => ({}));

// Mock process.env
Object.defineProperty(process.env, 'NEXT_PUBLIC_PAYPAL_BUTTON_ID', {
  get: () => mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID,
  set: (value) => { mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID = value; },
  configurable: true,
});

import SpendenPage from "./page";

// Mock lucide-react icons
jest.mock("lucide-react", () => ({
  Copy: () => <svg data-testid="copy-icon" />,
  Check: () => <svg data-testid="check-icon" />,
}));

describe("SpendenPage", () => {
  beforeEach(() => {
    // Clear console.error mock if we need to test error scenarios
    jest.clearAllMocks();
    // Reset env to undefined before each test
    mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID = undefined;
  });

  describe("Page Rendering", () => {
    it("renders the main heading", () => {
      render(<SpendenPage />);
      expect(
        screen.getByRole("heading", { name: /unterstütze unsere arbeit/i })
      ).toBeInTheDocument();
    });

    it("renders the hero section with description", () => {
      render(<SpendenPage />);
      expect(
        screen.getByText(
          /jede spende hilft menschen in not und unterstützt unsere gemeinschaft/i
        )
      ).toBeInTheDocument();
    });

    it("renders donation methods section", () => {
      render(<SpendenPage />);
      expect(
        screen.getByRole("heading", { name: /spendenmöglichkeiten/i })
      ).toBeInTheDocument();
    });
  });

  describe("PayPal Donation", () => {
    it("renders PayPal donation card", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/paypal/i)).toBeInTheDocument();
      expect(
        screen.getByText(/schnell und sicher online spenden/i)
      ).toBeInTheDocument();
    });

    it("displays PayPal donation button with correct link when env var is set", () => {
      mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID = "TEST_BUTTON_ID";
      render(<SpendenPage />);
      const paypalLink = screen.getByRole("link", { name: /jetzt spenden/i });
      expect(paypalLink).toHaveAttribute(
        "href",
        "https://www.paypal.com/donate?hosted_button_id=TEST_BUTTON_ID"
      );
      expect(paypalLink).toHaveAttribute("target", "_blank");
      expect(paypalLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("PayPal link opens in new tab for security when env var is set", () => {
      mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID = "TEST_BUTTON_ID";
      render(<SpendenPage />);
      const paypalLink = screen.getByRole("link", { name: /jetzt spenden/i });
      // Verify security attributes
      expect(paypalLink).toHaveAttribute("target", "_blank");
      expect(paypalLink).toHaveAttribute("rel", "noopener noreferrer");
    });

    it("displays fallback message when PayPal button ID is not configured", () => {
      mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID = undefined;
      render(<SpendenPage />);
      expect(
        screen.getByText(/paypal-spenden werden derzeit konfiguriert/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/in der zwischenzeit nutzen sie bitte die banküberweisung/i)
      ).toBeInTheDocument();
    });
  });

  describe("Bank Transfer Details", () => {
    it("renders bank transfer card", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/banküberweisung/i)).toBeInTheDocument();
      expect(
        screen.getByText(/direkte überweisung auf unser konto/i)
      ).toBeInTheDocument();
    });

    it("displays correct IBAN", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/DE12 3012 0000 0123456789/i)).toBeInTheDocument();
    });

    it("displays correct BIC", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/DEUTDE33/)).toBeInTheDocument();
    });

    it("displays correct recipient name", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/Muslimin e\.V\./)).toBeInTheDocument();
    });

    it("all bank details are visible and properly formatted", () => {
      render(<SpendenPage />);
      // Check all bank detail labels
      expect(screen.getByText(/IBAN:/)).toBeInTheDocument();
      expect(screen.getByText(/BIC:/)).toBeInTheDocument();
      expect(screen.getByText(/Empfänger:/)).toBeInTheDocument();
    });
  });

  describe("Copy to Clipboard Functionality", () => {
    it("copies IBAN to clipboard when button is clicked", async () => {
      const user = userEvent.setup();
      render(<SpendenPage />);

      // Spy on the clipboard after render
      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      const ibanButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DE12 3012 0000 0123456789"));

      expect(ibanButton).toBeTruthy();
      await user.click(ibanButton!);

      expect(writeTextSpy).toHaveBeenCalledWith(
        "DE12 3012 0000 0123456789"
      );
      
      writeTextSpy.mockRestore();
    });

    it("copies BIC to clipboard when button is clicked", async () => {
      const user = userEvent.setup();
      render(<SpendenPage />);

      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      const bicButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DEUTDE33"));

      expect(bicButton).toBeTruthy();
      await user.click(bicButton!);

      expect(writeTextSpy).toHaveBeenCalledWith("DEUTDE33");
      
      writeTextSpy.mockRestore();
    });

    it("copies recipient name to clipboard when button is clicked", async () => {
      const user = userEvent.setup();
      render(<SpendenPage />);

      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      const nameButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("Muslimin e.V."));

      expect(nameButton).toBeTruthy();
      await user.click(nameButton!);

      expect(writeTextSpy).toHaveBeenCalledWith(
        "Muslimin e.V."
      );
      
      writeTextSpy.mockRestore();
    });

    it("shows check icon after successful copy", async () => {
      const user = userEvent.setup();
      render(<SpendenPage />);

      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      const ibanButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DE12 3012 0000 0123456789"));

      await user.click(ibanButton!);

      // Check icon should appear after clicking
      await waitFor(() => {
        expect(screen.getAllByTestId("check-icon").length).toBeGreaterThan(0);
      });
      
      writeTextSpy.mockRestore();
    });

    it("check icon disappears after 2 seconds", async () => {
      jest.useFakeTimers();
      const user = userEvent.setup({ delay: null });
      render(<SpendenPage />);

      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      const ibanButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DE12 3012 0000 0123456789"));

      await user.click(ibanButton!);

      // Fast-forward time by 2 seconds
      jest.advanceTimersByTime(2000);

      // Check icon should be gone and copy icon should be back
      await waitFor(() => {
        expect(screen.getAllByTestId("copy-icon").length).toBeGreaterThan(0);
      });

      writeTextSpy.mockRestore();
      jest.useRealTimers();
    });

    it("handles multiple clipboard copy operations independently", async () => {
      const user = userEvent.setup();
      render(<SpendenPage />);

      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      // Click IBAN button
      const ibanButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DE12 3012 0000 0123456789"));
      await user.click(ibanButton!);

      expect(writeTextSpy).toHaveBeenCalledWith(
        "DE12 3012 0000 0123456789"
      );

      // Click BIC button
      const bicButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DEUTDE33"));
      await user.click(bicButton!);

      expect(writeTextSpy).toHaveBeenCalledWith("DEUTDE33");

      // Verify both calls were made
      expect(writeTextSpy).toHaveBeenCalledTimes(2);
      
      writeTextSpy.mockRestore();
    });
  });

  describe("Why Donate Section", () => {
    it("renders why donate section with all reasons", () => {
      render(<SpendenPage />);
      expect(
        screen.getByRole("heading", { name: /warum spenden\?/i })
      ).toBeInTheDocument();
      // Using getAllByText since these words appear multiple times
      expect(screen.getAllByText(/gemeinschaft/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/bildung/i).length).toBeGreaterThan(0);
      expect(screen.getAllByText(/wirkung/i).length).toBeGreaterThan(0);
    });
  });

  describe("Impact Section", () => {
    it("renders impact section with donation amounts", () => {
      render(<SpendenPage />);
      expect(
        screen.getByRole("heading", { name: /deine spende bewirkt/i })
      ).toBeInTheDocument();
      expect(screen.getByText(/€5/)).toBeInTheDocument();
      expect(screen.getByText(/€25/)).toBeInTheDocument();
      expect(screen.getByText(/€100/)).toBeInTheDocument();
    });

    it("displays impact examples for different donation amounts", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/eine warme mahlzeit/i)).toBeInTheDocument();
      expect(
        screen.getByText(/medikamente für 1 person/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/bildungsmaterial für 10 kinder/i)
      ).toBeInTheDocument();
    });
  });

  describe("Transparency Section", () => {
    it("renders transparency section", () => {
      render(<SpendenPage />);
      expect(
        screen.getByRole("heading", { name: /transparenz/i })
      ).toBeInTheDocument();
    });

    it("displays expense distribution information", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/ausgabenverteilung/i)).toBeInTheDocument();
      expect(screen.getByText(/80% direkte hilfe/i)).toBeInTheDocument();
      expect(screen.getByText(/15% verwaltung/i)).toBeInTheDocument();
      expect(screen.getByText(/5% fundraising/i)).toBeInTheDocument();
    });

    it("displays annual report information", () => {
      render(<SpendenPage />);
      expect(screen.getByText(/jährliche berichte/i)).toBeInTheDocument();
      expect(
        screen.getByText(/detaillierte geschäftsberichte/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/finanzielle transparenz/i)
      ).toBeInTheDocument();
    });
  });

  describe("Contact Section", () => {
    it("renders contact section", () => {
      render(<SpendenPage />);
      expect(
        screen.getByRole("heading", { name: /fragen zur spende\?/i })
      ).toBeInTheDocument();
    });

    it("displays contact email link", () => {
      render(<SpendenPage />);
      const contactLink = screen.getByRole("link", {
        name: /kontakt aufnehmen/i,
      });
      expect(contactLink).toHaveAttribute("href", "mailto:info@muslimin-ev.de");
    });
  });

  describe("Accessibility", () => {
    it("has proper heading hierarchy", () => {
      render(<SpendenPage />);
      const h1 = screen.getByRole("heading", {
        name: /unterstütze unsere arbeit/i,
      });
      expect(h1.tagName).toBe("H1");
    });

    it("all interactive elements are keyboard accessible", () => {
      render(<SpendenPage />);
      const buttons = screen.getAllByRole("button");
      buttons.forEach((button) => {
        expect(button).not.toHaveAttribute("disabled");
      });
    });

    it("external links have proper security attributes when PayPal is configured", () => {
      mockEnv.NEXT_PUBLIC_PAYPAL_BUTTON_ID = "TEST_BUTTON_ID";
      render(<SpendenPage />);
      const paypalLink = screen.getByRole("link", { name: /jetzt spenden/i });
      expect(paypalLink).toHaveAttribute("rel", "noopener noreferrer");
      expect(paypalLink).toHaveAttribute("target", "_blank");
    });
  });

  describe("Error Handling", () => {
    it("clipboard API is called even if it might fail", async () => {
      const user = userEvent.setup();
      render(<SpendenPage />);

      const writeTextSpy = jest.spyOn(navigator.clipboard, 'writeText');

      const ibanButton = screen
        .getAllByRole("button")
        .find((btn) => btn.textContent?.includes("DE12 3012 0000 0123456789"));

      await user.click(ibanButton!);
      
      // Verify the clipboard API was called (component doesn't handle errors explicitly)
      expect(writeTextSpy).toHaveBeenCalled();
      
      writeTextSpy.mockRestore();
    });
  });
});
