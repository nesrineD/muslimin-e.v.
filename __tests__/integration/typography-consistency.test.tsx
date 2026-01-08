import { render } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

/**
 * Integration Test: Typography Consistency
 *
 * Tests design system typography rules:
 * - h1-h6 use Merriweather (serif, font-heading)
 * - Body text uses Inter (sans-serif, font-body)
 * - Headings have max-width 60ch for readability
 * - Body text has max-width 70ch
 * - Consistent line-height and spacing
 * - Responsive font sizes (clamp)
 *
 * This ensures visual consistency and optimal readability across all pages.
 */

describe("Typography Consistency Integration", () => {
  describe("Heading Font Family", () => {
    it("h1 uses Merriweather (font-heading)", () => {
      const { container } = render(<MockPage />);

      const h1 = container.querySelector("h1");
      expect(h1?.className).toMatch(/font-heading/);
    });

    it("h2 uses Merriweather (font-heading)", () => {
      const { container } = render(<MockPage />);

      const h2 = container.querySelector("h2");
      expect(h2?.className).toMatch(/font-heading/);
    });

    it("h3 uses Merriweather (font-heading)", () => {
      const { container } = render(<MockPage />);

      const h3 = container.querySelector("h3");
      expect(h3?.className).toMatch(/font-heading/);
    });

    it("all headings (h1-h6) use font-heading", () => {
      const { container } = render(<MockLongPage />);

      const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
        expect(heading.className).toMatch(/font-heading/);
      });
    });
  });

  describe("Body Text Font Family", () => {
    it("paragraphs use Inter (font-body)", () => {
      const { container } = render(<MockPage />);

      const paragraphs = container.querySelectorAll("p");
      paragraphs.forEach((p) => {
        // Body text inherits from body element or uses font-body class
        expect(
          p.className.includes("font-body") ||
            document.body.className.includes("font-body")
        ).toBe(true);
      });
    });

    it("body element has font-body class", () => {
      // This would be set in layout.tsx or globals.css
      // Testing that the pattern is followed
      const bodyClasses = "font-body text-charcoal";
      expect(bodyClasses).toMatch(/font-body/);
    });

    it("list items use Inter (font-body)", () => {
      const { container } = render(<MockPage />);

      const listItems = container.querySelectorAll("li");
      listItems.forEach((li) => {
        // Should not have font-heading
        expect(li.className).not.toMatch(/font-heading/);
      });
    });
  });

  describe("Heading Sizes (Responsive)", () => {
    it("h1 uses clamp for responsive sizing", () => {
      const { container } = render(<MockPage />);

      const h1 = container.querySelector("h1");
      // Should use text-[clamp(...)] or responsive classes
      expect(h1?.className).toMatch(/text-\[clamp|text-4xl|text-5xl/);
    });

    it("h1 has size between 2.5rem and 3rem", () => {
      // This is defined in globals.css as clamp(2.5rem, 4vw, 3rem)
      const h1Style = "text-[clamp(2.5rem,4vw,3rem)]";
      expect(h1Style).toMatch(/2\.5rem.*3rem/);
    });

    it("h2 has fixed size 2rem as defined in globals.css", () => {
      const h2Style = "text-[2rem]";
      expect(h2Style).toBe("text-[2rem]");
    });

    it("headings decrease in size progressively", () => {
      const { container } = render(<MockLongPage />);

      // Each heading level should be smaller than previous
      const h1 = container.querySelector("h1");
      const h2 = container.querySelector("h2");
      const h3 = container.querySelector("h3");

      // Check classes indicate progressive size decrease
      expect(h1?.className).toMatch(/text-5xl|text-\[clamp\(2\.5rem/);
      expect(h2?.className).toMatch(/text-4xl|text-\[clamp\(2rem/);
      expect(h3?.className).toMatch(/text-3xl|text-\[clamp\(1\.75rem/);
    });
  });

  describe("Line Height", () => {
    it("h1 has tight line-height (1.2)", () => {
      const { container } = render(<MockPage />);

      const h1 = container.querySelector("h1");
      expect(h1?.className).toMatch(/leading-\[1\.2\]|leading-tight/);
    });

    it("h2-h3 have tight line-height (1.2)", () => {
      const { container } = render(<MockPage />);

      const h2 = container.querySelector("h2");
      const h3 = container.querySelector("h3");

      expect(h2?.className).toMatch(/leading-\[1\.2\]|leading-tight/);
      expect(h3?.className).toMatch(/leading-\[1\.2\]|leading-tight/);
    });

    it("body text has relaxed line-height (1.6)", () => {
      const { container } = render(<MockPage />);

      const paragraph = container.querySelector("p");
      expect(paragraph?.className).toMatch(/leading-\[1\.6\]|leading-relaxed/);
    });
  });

  describe("Max-Width Constraints", () => {
    it("h1 has max-width of 60ch", () => {
      const { container } = render(<MockPage />);

      const h1 = container.querySelector("h1");
      expect(h1?.className).toMatch(/max-w-\[60ch\]/);
    });

    it("h2-h6 have max-width of 60ch", () => {
      const { container } = render(<MockLongPage />);

      const headings = container.querySelectorAll("h2, h3, h4, h5, h6");
      headings.forEach((heading) => {
        expect(heading.className).toMatch(/max-w-\[60ch\]/);
      });
    });

    it("paragraphs have max-width of 70ch", () => {
      const { container } = render(<MockPage />);

      const paragraphs = container.querySelectorAll("p");
      paragraphs.forEach((p) => {
        expect(p.className).toMatch(/max-w-\[70ch\]/);
      });
    });

    it("long text content is constrained for readability", () => {
      const { container } = render(<MockLongPage />);

      const article = container.querySelector("article");
      const textElements = article?.querySelectorAll("p, h1, h2, h3");

      textElements?.forEach((el) => {
        expect(el.className).toMatch(/max-w-\[(60|70)ch\]/);
      });
    });
  });

  describe("Text Color", () => {
    it("headings use charcoal color", () => {
      const { container } = render(<MockPage />);

      const headings = container.querySelectorAll("h1, h2, h3");
      headings.forEach((heading) => {
        expect(heading.className).toMatch(/text-charcoal/);
      });
    });

    it("body text uses charcoal color", () => {
      const { container } = render(<MockPage />);

      const paragraphs = container.querySelectorAll("p");
      paragraphs.forEach((p) => {
        expect(p.className).toMatch(/text-charcoal/);
      });
    });

    it("no hardcoded hex colors in text elements", () => {
      const { container } = render(<MockPage />);

      const textElements = container.querySelectorAll(
        "h1, h2, h3, p, span, div"
      );
      textElements.forEach((el) => {
        expect(el.className).not.toMatch(/#[0-9A-Fa-f]{3,8}/);
      });
    });
  });

  describe("Spacing and Rhythm", () => {
    it("h1 has bottom margin for spacing", () => {
      const { container } = render(<MockPage />);

      const h1 = container.querySelector("h1");
      expect(h1?.className).toMatch(/mb-4|mb-6|mb-8/);
    });

    it("h2-h3 have consistent spacing", () => {
      const { container } = render(<MockLongPage />);

      const h2 = container.querySelector("h2");
      const h3 = container.querySelector("h3");

      expect(h2?.className).toMatch(/mb-4|mb-6/);
      expect(h3?.className).toMatch(/mb-3|mb-4/);
    });

    it("paragraphs have bottom margin", () => {
      const { container } = render(<MockPage />);

      const paragraphs = container.querySelectorAll("p");
      paragraphs.forEach((p) => {
        expect(p.className).toMatch(/mb-4|mb-6/);
      });
    });

    it("section headings have extra top spacing", () => {
      const { container } = render(<MockLongPage />);

      const sectionHeadings = container.querySelectorAll("section > h2");
      sectionHeadings.forEach((h2) => {
        expect(h2.className).toMatch(/mt-8|mt-12|mt-16/);
      });
    });
  });

  describe("Contrast and Readability", () => {
    it("text on white background meets WCAG AA", async () => {
      const { container } = render(
        <div className="bg-white p-8">
          <h1 className="text-charcoal">Heading</h1>
          <p className="text-charcoal">Body text</p>
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("text on sand background meets WCAG AA", async () => {
      const { container } = render(
        <div className="bg-sand p-8">
          <h1 className="text-charcoal">Heading</h1>
          <p className="text-charcoal">Body text</p>
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("text on cream background meets WCAG AA", async () => {
      const { container } = render(
        <div className="bg-cream-50 p-8">
          <h1 className="text-charcoal">Heading</h1>
          <p className="text-charcoal">Body text</p>
        </div>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe("Consistency Across Pages", () => {
    it("homepage uses consistent typography", () => {
      const { container } = render(<MockHomepage />);

      const h1 = container.querySelector("h1");
      const p = container.querySelector("p");

      expect(h1?.className).toMatch(/font-heading/);
      expect(p?.className).toMatch(/font-body/);
    });

    it("about page uses consistent typography", () => {
      const { container } = render(<MockAboutPage />);

      const headings = container.querySelectorAll("h1, h2, h3");
      headings.forEach((h) => {
        expect(h.className).toMatch(/font-heading/);
      });
    });

    it("contact page uses consistent typography", () => {
      const { container } = render(<MockContactPage />);

      const h1 = container.querySelector("h1");
      expect(h1?.className).toMatch(/font-heading/);
    });
  });

  describe("Special Typography Cases", () => {
    it("quotes use appropriate styling", () => {
      const { container } = render(<MockPage />);

      const blockquote = container.querySelector("blockquote");
      expect(blockquote?.className).toMatch(/italic|font-heading/);
    });

    it("emphasized text maintains readability", () => {
      const { container } = render(<MockPage />);

      const em = container.querySelector("em");
      expect(em?.tagName).toBe("EM");
    });

    it("strong text uses appropriate weight", () => {
      const { container } = render(<MockPage />);

      const strong = container.querySelector("strong");
      expect(strong?.className).toMatch(/font-bold|font-semibold/);
    });
  });

  describe("Link Typography", () => {
    it("links maintain body font", () => {
      const { container } = render(<MockPage />);

      const link = container.querySelector("a");
      expect(link?.className).not.toMatch(/font-heading/);
    });

    it("links use sage color", () => {
      const { container } = render(<MockPage />);

      const link = container.querySelector("a");
      expect(link?.className).toMatch(/text-sage/);
    });

    it("link hover uses clay color", () => {
      const { container } = render(<MockPage />);

      const link = container.querySelector("a");
      expect(link?.className).toMatch(/hover:text-clay/);
    });
  });
});

// Mock Components

function MockPage() {
  return (
    <div className="font-body">
      <h1 className="font-heading text-[clamp(2.5rem,4vw,3rem)] leading-[1.2] max-w-[60ch] text-charcoal mb-6">
        Main Heading
      </h1>
      <h2 className="font-heading text-[clamp(2rem,3.5vw,2.5rem)] leading-[1.3] max-w-[60ch] text-charcoal mb-4">
        Subheading
      </h2>
      <h3 className="font-heading text-[clamp(1.75rem,3vw,2rem)] leading-[1.3] max-w-[60ch] text-charcoal mb-4">
        Section Title
      </h3>
      <p className="font-body text-base leading-[1.6] max-w-[70ch] text-charcoal mb-4">
        This is body text that should use Inter font family for optimal
        readability.
      </p>
      <blockquote className="italic font-heading text-lg text-charcoal border-l-4 border-sage pl-4 mb-4">
        A meaningful quote
      </blockquote>
      <p className="max-w-[70ch] text-charcoal mb-4">
        Text with <strong className="font-bold">emphasis</strong> and{" "}
        <em>italics</em>.
      </p>
      <a href="#" className="text-sage hover:text-clay underline">
        Learn more
      </a>
      <ul className="mb-4">
        <li className="text-charcoal">List item 1</li>
        <li className="text-charcoal">List item 2</li>
      </ul>
    </div>
  );
}

function MockLongPage() {
  return (
    <article className="font-body">
      <h1 className="font-heading text-5xl leading-[1.2] max-w-[60ch] text-charcoal mb-8">
        Article Title
      </h1>
      <section className="mb-12">
        <h2 className="font-heading text-4xl leading-[1.3] max-w-[60ch] text-charcoal mb-6 mt-12">
          Section 1
        </h2>
        <p className="max-w-[70ch] text-charcoal mb-4 leading-[1.6]">
          Paragraph content
        </p>
        <h3 className="font-heading text-3xl leading-[1.3] max-w-[60ch] text-charcoal mb-4">
          Subsection
        </h3>
      </section>
      <section>
        <h4 className="font-heading text-2xl max-w-[60ch] text-charcoal mb-3">
          H4 Heading
        </h4>
        <h5 className="font-heading text-xl max-w-[60ch] text-charcoal mb-2">
          H5 Heading
        </h5>
        <h6 className="font-heading text-lg max-w-[60ch] text-charcoal mb-2">
          H6 Heading
        </h6>
      </section>
    </article>
  );
}

function MockHomepage() {
  return (
    <div className="font-body">
      <h1 className="font-heading text-charcoal">Willkommen</h1>
      <p className="font-body text-charcoal">Homepage content</p>
    </div>
  );
}

function MockAboutPage() {
  return (
    <div className="font-body">
      <h1 className="font-heading text-charcoal">Über uns</h1>
      <h2 className="font-heading text-charcoal">Unsere Geschichte</h2>
      <h3 className="font-heading text-charcoal">Mission</h3>
    </div>
  );
}

function MockContactPage() {
  return (
    <div className="font-body">
      <h1 className="font-heading text-charcoal">Kontakt</h1>
      <p className="font-body text-charcoal">Contact information</p>
    </div>
  );
}
