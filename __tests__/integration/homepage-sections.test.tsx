import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

/**
 * Integration Test: Homepage Section Backgrounds & Card Variants
 *
 * Tests design system rule:
 * - White sections → cream cards (bg-cream-50)
 * - Sand sections → white cards (bg-white)
 *
 * This ensures visual contrast and hierarchy across the homepage.
 */

describe("Homepage Sections Integration", () => {
  // Mock the homepage component
  // In actual implementation, import from src/app/page.tsx or src/app/(public)/page.tsx

  describe("Section Background Alternation", () => {
    it("homepage has alternating white and sand section backgrounds", async () => {
      // This test will fail until T031 (apply alternating backgrounds) is implemented
      const { container } = render(<MockHomepage />);

      const sections = container.querySelectorAll("section");
      expect(sections.length).toBeGreaterThanOrEqual(4);

      // Check alternating pattern: white → sand → white → sand
      const section1 = sections[0];
      const section2 = sections[1];
      const section3 = sections[2];
      const section4 = sections[3];

      expect(section1.className).toMatch(/bg-white/);
      expect(section2.className).toMatch(/bg-sand/);
      expect(section3.className).toMatch(/bg-white/);
      expect(section4.className).toMatch(/bg-sand/);
    });

    it("first section (hero) has white background", () => {
      const { container } = render(<MockHomepage />);
      const heroSection = container.querySelector("section");
      expect(heroSection?.className).toMatch(/bg-white/);
    });
  });

  describe("Card Variants Based on Section Background", () => {
    it("white sections contain cream cards", () => {
      const { container } = render(
        <section className="bg-white">
          <MockMissionSection />
        </section>
      );

      const cards = container.querySelectorAll("[class*='bg-cream']");
      expect(cards.length).toBeGreaterThan(0);

      // Verify cards use bg-cream-50 specifically
      cards.forEach((card) => {
        expect(card.className).toMatch(/bg-cream-50|bg-cream/);
      });
    });

    it("sand sections contain white cards", () => {
      const { container } = render(
        <section className="bg-sand">
          <MockValuesSection />
        </section>
      );

      const cards = container.querySelectorAll("[class*='bg-white']");
      expect(cards.length).toBeGreaterThan(0);

      cards.forEach((card) => {
        expect(card).toHaveClass("bg-white");
      });
    });

    it("cream sections contain white cards", () => {
      // Cream sections may be used occasionally
      const { container } = render(
        <section className="bg-cream-50">
          <MockEventsSection />
        </section>
      );

      const cards = container.querySelectorAll("[class*='bg-white']");
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe("Visual Contrast Validation", () => {
    it("cream cards on white background have sufficient contrast", () => {
      const { container } = render(
        <section className="bg-white">
          <div className="bg-cream-50 p-6">
            <p className="text-charcoal">Card content</p>
          </div>
        </section>
      );

      const card = container.querySelector(".bg-cream-50");
      expect(card).toBeInTheDocument();

      // Cream on white should be subtle but visible (shadow helps)
      expect(card?.className).toMatch(/shadow/);
    });

    it("white cards on sand background have sufficient contrast", () => {
      const { container } = render(
        <section className="bg-sand">
          <div className="bg-white p-6">
            <p className="text-charcoal">Card content</p>
          </div>
        </section>
      );

      const card = container.querySelector(".bg-white");
      expect(card).toBeInTheDocument();
      expect(card?.className).toMatch(/shadow/);
    });
  });

  describe("Mission Section (White Background)", () => {
    it("mission section has white background", () => {
      const { container } = render(<MockMissionSection />);
      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-white/);
    });

    it("mission cards use cream variant", () => {
      const { container } = render(<MockMissionSection />);
      const cards = container.querySelectorAll("[class*='bg-cream']");
      expect(cards.length).toBeGreaterThanOrEqual(3); // Typically 3-4 mission cards
    });

    it("mission section has no accessibility violations", async () => {
      const { container } = render(<MockMissionSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Values Section (Sand Background)", () => {
    it("values section has sand background", () => {
      const { container } = render(<MockValuesSection />);
      const section = container.querySelector("section");
      expect(section?.className).toMatch(/bg-sand/);
    });

    it("values cards use white variant", () => {
      const { container } = render(<MockValuesSection />);
      const cards = container.querySelectorAll("[class*='bg-white']");
      expect(cards.length).toBeGreaterThanOrEqual(3); // Typically 3-4 value cards
    });

    it("values section has no accessibility violations", async () => {
      const { container } = render(<MockValuesSection />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Events Section", () => {
    it("event cards have correct variant based on parent section", () => {
      // Events on white background
      const { container: whiteContainer } = render(
        <section className="bg-white">
          <MockEventsSection />
        </section>
      );

      const creamCards = whiteContainer.querySelectorAll("[class*='bg-cream']");
      expect(creamCards.length).toBeGreaterThan(0);

      // Events on sand background
      const { container: sandContainer } = render(
        <section className="bg-sand">
          <MockEventsSection />
        </section>
      );

      const whiteCards = sandContainer.querySelectorAll("[class*='bg-white']");
      expect(whiteCards.length).toBeGreaterThan(0);
    });

    it("event cards maintain standard styling regardless of variant", () => {
      const { container } = render(<MockEventsSection />);
      const cards = container.querySelectorAll("[class*='rounded']");

      cards.forEach((card) => {
        // All cards should have 12px border-radius
        expect(card.className).toMatch(/rounded-\[12px\]|rounded-xl/);
        // All cards should have standard shadow
        expect(card.className).toMatch(/shadow/);
      });
    });
  });

  describe("Content Width Constraints", () => {
    it("sections use max-width container for content", () => {
      const { container } = render(<MockHomepage />);
      const sections = container.querySelectorAll("section");

      sections.forEach((section) => {
        const contentContainer = section.querySelector("[class*='max-w']");
        expect(contentContainer).toBeInTheDocument();

        // Should use standard max-width (typically max-w-7xl or max-w-6xl)
        expect(contentContainer?.className).toMatch(
          /max-w-(6xl|7xl|screen-xl)/
        );
      });
    });

    it("sections have consistent horizontal padding", () => {
      const { container } = render(<MockHomepage />);
      const sections = container.querySelectorAll("section");

      sections.forEach((section) => {
        // Should have responsive padding (px-4 sm:px-6 lg:px-8 or similar)
        expect(section.className).toMatch(/px-/);
      });
    });
  });

  describe("Section Spacing", () => {
    it("sections have consistent vertical spacing", () => {
      const { container } = render(<MockHomepage />);
      const sections = container.querySelectorAll("section");

      sections.forEach((section) => {
        // Should have consistent py-12 or py-16 spacing
        expect(section.className).toMatch(/py-(12|16|20|24)/);
      });
    });
  });

  describe("Mobile Responsiveness", () => {
    it("card grids adapt to mobile viewports", () => {
      const { container } = render(<MockMissionSection />);
      const grid = container.querySelector("[class*='grid']");

      expect(grid?.className).toMatch(/grid-cols-1/); // Mobile: 1 column
      expect(grid?.className).toMatch(/md:grid-cols-2|lg:grid-cols-3/); // Desktop: 2-3 columns
    });

    it("section padding reduces on mobile", () => {
      const { container } = render(<MockHomepage />);
      const sections = container.querySelectorAll("section");

      sections.forEach((section) => {
        // Mobile padding smaller than desktop
        expect(section.className).toMatch(/py-8|py-12/);
        expect(section.className).toMatch(/md:py-16|lg:py-20/);
      });
    });
  });
});

// Mock Components (will be replaced with actual imports after implementation)

function MockHomepage() {
  return (
    <div>
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1>Hero Section</h1>
        </div>
      </section>
      <MockMissionSection />
      <MockValuesSection />
      <MockEventsSection />
    </div>
  );
}

function MockMissionSection() {
  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2>Unsere Mission</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cream-50 rounded-xl shadow-card-standard p-6">
            <h3>Mission 1</h3>
            <p className="text-charcoal">Description</p>
          </div>
          <div className="bg-cream-50 rounded-xl shadow-card-standard p-6">
            <h3>Mission 2</h3>
            <p className="text-charcoal">Description</p>
          </div>
          <div className="bg-cream-50 rounded-xl shadow-card-standard p-6">
            <h3>Mission 3</h3>
            <p className="text-charcoal">Description</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockValuesSection() {
  return (
    <section className="bg-sand py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2>Unsere Werte</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-card-standard p-6">
            <h3>Value 1</h3>
            <p className="text-charcoal">Description</p>
          </div>
          <div className="bg-white rounded-xl shadow-card-standard p-6">
            <h3>Value 2</h3>
            <p className="text-charcoal">Description</p>
          </div>
          <div className="bg-white rounded-xl shadow-card-standard p-6">
            <h3>Value 3</h3>
            <p className="text-charcoal">Description</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MockEventsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-cream-50 rounded-xl shadow-card-standard p-6">
        <h3>Event 1</h3>
        <p className="text-charcoal">Details</p>
      </div>
      <div className="bg-cream-50 rounded-xl shadow-card-standard p-6">
        <h3>Event 2</h3>
        <p className="text-charcoal">Details</p>
      </div>
    </div>
  );
}
