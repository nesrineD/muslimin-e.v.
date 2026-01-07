import { render, screen, within } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

/**
 * Integration Test: Button Hierarchy & Usage Patterns
 * 
 * Tests design system rules:
 * - Max 1 primary button (clay) per view/section
 * - Primary button for main CTA ("Mitglied werden", "Spenden", "Termin buchen")
 * - Secondary buttons (sage outline) for supporting actions
 * - Passive buttons (warm) only for passive membership
 * 
 * This ensures clear visual hierarchy and user focus on primary actions.
 */

describe("Button Hierarchy Integration", () => {
  describe("Primary Button Limit", () => {
    it("page has maximum 1 primary button (clay background)", () => {
      const { container } = render(<MockLandingPage />);
      
      // Count primary buttons (bg-clay)
      const primaryButtons = container.querySelectorAll("[class*='bg-clay']");
      expect(primaryButtons.length).toBeLessThanOrEqual(1);
    });

    it("section has maximum 1 primary button", () => {
      const { container } = render(<MockHeroSection />);
      
      const section = container.querySelector("section");
      const primaryButtons = section?.querySelectorAll("[class*='bg-clay']");
      expect(primaryButtons?.length || 0).toBeLessThanOrEqual(1);
    });

    it("card group has maximum 1 primary button across all cards", () => {
      const { container } = render(<MockMembershipCards />);
      
      const primaryButtons = container.querySelectorAll("[class*='bg-clay']");
      expect(primaryButtons.length).toBeLessThanOrEqual(1);
    });
  });

  describe("Primary Button Usage (Clay)", () => {
    it("main CTA uses primary button", () => {
      render(<MockHeroSection />);
      
      const primaryCTA = screen.getByRole("button", { name: /mitglied werden/i });
      expect(primaryCTA.className).toMatch(/bg-clay/);
    });

    it("donation button uses primary button", () => {
      render(<MockDonationSection />);
      
      const donateButton = screen.getByRole("button", { name: /jetzt spenden/i });
      expect(donateButton.className).toMatch(/bg-clay/);
    });

    it("booking CTA uses primary button", () => {
      render(<MockBookingSection />);
      
      const bookButton = screen.getByRole("button", { name: /termin buchen/i });
      expect(bookButton.className).toMatch(/bg-clay/);
    });

    it("primary button has white text for contrast", () => {
      const { container } = render(<MockHeroSection />);
      
      const primaryButton = container.querySelector("[class*='bg-clay']");
      expect(primaryButton?.className).toMatch(/text-white/);
    });
  });

  describe("Secondary Button Usage (Sage)", () => {
    it("supporting actions use secondary buttons", () => {
      render(<MockHeroSection />);
      
      const secondaryButton = screen.getByRole("button", { name: /mehr erfahren/i });
      expect(secondaryButton.className).toMatch(/bg-sage|border-sage/);
    });

    it("navigation links use secondary button style", () => {
      render(<MockNavigationSection />);
      
      const navButtons = screen.getAllByRole("button");
      const secondaryButtons = navButtons.filter((btn) =>
        btn.className.match(/bg-sage|border-sage/)
      );
      expect(secondaryButtons.length).toBeGreaterThan(0);
    });

    it("secondary button has sage text or border", () => {
      const { container } = render(<MockHeroSection />);
      
      const secondaryButtons = container.querySelectorAll("[class*='border-sage']");
      expect(secondaryButtons.length).toBeGreaterThan(0);
      
      secondaryButtons.forEach((btn) => {
        expect(btn.className).toMatch(/text-sage|border-sage/);
      });
    });
  });

  describe("Passive Button Usage (Warm)", () => {
    it("passive membership uses warm-colored button", () => {
      render(<MockMembershipCards />);
      
      const passiveButton = screen.getByRole("button", { name: /passives mitglied/i });
      expect(passiveButton.className).toMatch(/bg-warm-400|bg-warm-500/);
    });

    it("warm button ONLY used for passive membership", () => {
      const { container } = render(<MockLandingPage />);
      
      // Find all warm buttons
      const warmButtons = container.querySelectorAll("[class*='bg-warm']");
      
      // Each warm button should be associated with "passiv" text
      warmButtons.forEach((btn) => {
        const btnText = btn.textContent?.toLowerCase() || "";
        const parentText = btn.parentElement?.textContent?.toLowerCase() || "";
        
        expect(btnText + parentText).toMatch(/passiv|fördermitglied/);
      });
    });

    it("active membership does NOT use warm button", () => {
      render(<MockMembershipCards />);
      
      const activeButton = screen.getByRole("button", { name: /aktives mitglied/i });
      expect(activeButton.className).not.toMatch(/bg-warm/);
      expect(activeButton.className).toMatch(/bg-clay|bg-sage/);
    });
  });

  describe("Visual Hierarchy", () => {
    it("primary button is visually dominant (solid, high contrast)", () => {
      const { container } = render(<MockHeroSection />);
      
      const primaryButton = container.querySelector("[class*='bg-clay']");
      
      // Primary button should be solid (not outline)
      expect(primaryButton?.className).not.toMatch(/border-2/);
      expect(primaryButton?.className).toMatch(/bg-clay/);
      expect(primaryButton?.className).toMatch(/text-white/);
    });

    it("secondary button is less dominant (outline or lighter)", () => {
      const { container } = render(<MockHeroSection />);
      
      const secondaryButton = container.querySelector("[class*='border-sage']");
      
      // Secondary button should be outline or lighter bg
      expect(secondaryButton?.className).toMatch(/border-sage|bg-transparent/);
    });

    it("buttons decrease in visual weight: primary > secondary > passive", () => {
      const { container } = render(<MockMembershipCards />);
      
      const primaryBtn = container.querySelector("[class*='bg-clay']");
      const secondaryBtn = container.querySelector("[class*='border-sage']");
      const passiveBtn = container.querySelector("[class*='bg-warm']");
      
      // Check that each exists and has appropriate styling
      expect(primaryBtn?.className).toMatch(/bg-clay/);
      expect(secondaryBtn?.className).toMatch(/border-sage/);
      expect(passiveBtn?.className).toMatch(/bg-warm-400/);
    });
  });

  describe("Button Grouping", () => {
    it("button groups have consistent spacing", () => {
      const { container } = render(<MockHeroSection />);
      
      const buttonGroup = container.querySelector("[class*='flex']");
      expect(buttonGroup?.className).toMatch(/gap-4|space-x-4/);
    });

    it("button groups are horizontally aligned", () => {
      const { container } = render(<MockHeroSection />);
      
      const buttonGroup = container.querySelector("[class*='flex']");
      expect(buttonGroup?.className).toMatch(/flex-row|inline-flex/);
    });

    it("button groups wrap on mobile", () => {
      const { container } = render(<MockHeroSection />);
      
      const buttonGroup = container.querySelector("[class*='flex']");
      expect(buttonGroup?.className).toMatch(/flex-wrap|flex-col/);
    });
  });

  describe("CTA Context", () => {
    it("hero section has primary CTA", () => {
      render(<MockHeroSection />);
      
      const primaryCTA = screen.getByRole("button", { name: /mitglied werden/i });
      expect(primaryCTA).toBeInTheDocument();
      expect(primaryCTA.className).toMatch(/bg-clay/);
    });

    it("donation section has primary CTA", () => {
      render(<MockDonationSection />);
      
      const donateCTA = screen.getByRole("button", { name: /jetzt spenden/i });
      expect(donateCTA).toBeInTheDocument();
      expect(donateCTA.className).toMatch(/bg-clay/);
    });

    it("booking section has primary CTA", () => {
      render(<MockBookingSection />);
      
      const bookCTA = screen.getByRole("button", { name: /termin buchen/i });
      expect(bookCTA).toBeInTheDocument();
      expect(bookCTA.className).toMatch(/bg-clay/);
    });

    it("only ONE of hero/donation/booking CTA is primary on same page", () => {
      const { container } = render(<MockMultiCTAPage />);
      
      const primaryButtons = container.querySelectorAll("[class*='bg-clay']");
      expect(primaryButtons.length).toBe(1);
    });
  });

  describe("Accessibility", () => {
    it("primary button has sufficient contrast (4.5:1)", async () => {
      const { container } = render(<MockHeroSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("secondary button has sufficient contrast", async () => {
      const { container } = render(
        <button className="border-2 border-sage text-sage px-6 py-3">
          Secondary Action
        </button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("buttons are keyboard accessible", () => {
      render(<MockHeroSection />);
      
      const primaryButton = screen.getByRole("button", { name: /mitglied werden/i });
      primaryButton.focus();
      expect(primaryButton).toHaveFocus();
    });

    it("buttons have visible focus indicators", () => {
      const { container } = render(<MockHeroSection />);
      
      const buttons = container.querySelectorAll("button");
      buttons.forEach((btn) => {
        expect(btn.className).toMatch(/focus:outline|focus:ring/);
      });
    });
  });

  describe("Hover States", () => {
    it("primary button has hover state (brightness increase)", () => {
      const { container } = render(<MockHeroSection />);
      
      const primaryButton = container.querySelector("[class*='bg-clay']");
      expect(primaryButton?.className).toMatch(/hover:brightness|hover:bg-/);
    });

    it("secondary button has hover state (background fill)", () => {
      const { container } = render(<MockHeroSection />);
      
      const secondaryButton = container.querySelector("[class*='border-sage']");
      expect(secondaryButton?.className).toMatch(/hover:bg-sage|hover:brightness/);
    });
  });

  describe("Edge Cases", () => {
    it("form submit button is treated as primary CTA", () => {
      const { container } = render(<MockContactForm />);
      
      const submitButton = screen.getByRole("button", { name: /absenden|senden/i });
      expect(submitButton.className).toMatch(/bg-clay/);
      
      // Form should have only 1 primary button (submit)
      const primaryButtons = container.querySelectorAll("[class*='bg-clay']");
      expect(primaryButtons.length).toBe(1);
    });

    it("disabled primary button maintains styling", () => {
      const { container } = render(
        <button className="bg-clay text-white px-6 py-3" disabled>
          Disabled Primary
        </button>
      );
      
      const button = container.querySelector("button");
      expect(button?.className).toMatch(/bg-clay/);
      expect(button?.className).toMatch(/opacity-50|opacity-60/);
    });

    it("link styled as button follows hierarchy rules", () => {
      render(<MockHeroSection />);
      
      // Links styled as buttons should follow same hierarchy
      const primaryLink = screen.getByRole("link", { name: /mitglied werden/i });
      expect(primaryLink.className).toMatch(/bg-clay/);
    });
  });
});

// Mock Components

function MockLandingPage() {
  return (
    <div>
      <MockHeroSection />
      <MockDonationSection />
      <MockNavigationSection />
    </div>
  );
}

function MockHeroSection() {
  return (
    <section className="bg-white py-16">
      <h1>Willkommen bei Muslimin e.V.</h1>
      <div className="flex flex-wrap gap-4 mt-6">
        <button className="bg-clay text-white px-6 py-3 rounded-lg hover:brightness-110 focus:outline focus:outline-2 focus:outline-sage">
          Mitglied werden
        </button>
        <button className="border-2 border-sage text-sage px-6 py-3 rounded-lg hover:bg-sage hover:text-white focus:outline focus:outline-2 focus:outline-sage">
          Mehr erfahren
        </button>
      </div>
    </section>
  );
}

function MockDonationSection() {
  return (
    <section className="bg-sand py-16">
      <h2>Unterstützen Sie uns</h2>
      <button className="bg-clay text-white px-6 py-3 rounded-lg">
        Jetzt spenden
      </button>
    </section>
  );
}

function MockBookingSection() {
  return (
    <section className="bg-white py-16">
      <h2>Beratungstermin vereinbaren</h2>
      <button className="bg-clay text-white px-6 py-3 rounded-lg">
        Termin buchen
      </button>
    </section>
  );
}

function MockNavigationSection() {
  return (
    <nav>
      <button className="border-2 border-sage text-sage px-4 py-2 rounded">
        Über uns
      </button>
      <button className="border-2 border-sage text-sage px-4 py-2 rounded">
        Veranstaltungen
      </button>
    </nav>
  );
}

function MockMembershipCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h3>Aktives Mitglied</h3>
        <button className="bg-clay text-white px-6 py-3 rounded-lg w-full">
          Aktives Mitglied werden
        </button>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h3>Passives Mitglied</h3>
        <button className="bg-warm-400 text-white px-6 py-3 rounded-lg w-full">
          Passives Mitglied werden
        </button>
      </div>
    </div>
  );
}

function MockContactForm() {
  return (
    <form>
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <button type="submit" className="bg-clay text-white px-6 py-3 rounded-lg">
        Absenden
      </button>
    </form>
  );
}

function MockMultiCTAPage() {
  return (
    <div>
      <section>
        <button className="bg-clay text-white px-6 py-3 rounded-lg">
          Mitglied werden
        </button>
      </section>
      <section>
        {/* Secondary styling even though it's a CTA */}
        <button className="border-2 border-sage text-sage px-6 py-3 rounded-lg">
          Jetzt spenden
        </button>
      </section>
      <section>
        <button className="border-2 border-sage text-sage px-6 py-3 rounded-lg">
          Termin buchen
        </button>
      </section>
    </div>
  );
}
