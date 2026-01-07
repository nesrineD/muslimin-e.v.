import { render, screen, fireEvent } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Card } from "./Card";

expect.extend(toHaveNoViolations);

describe("Card Component", () => {
  describe("Rendering", () => {
    it("renders children correctly", () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText(/card content/i)).toBeInTheDocument();
    });

    it("renders as article element by default", () => {
      const { container } = render(<Card>Content</Card>);
      expect(container.querySelector("article")).toBeInTheDocument();
    });
  });

  describe("Variants", () => {
    it("renders white variant with correct background", () => {
      const { container } = render(<Card variant="white">White Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-white");
    });

    it("renders cream variant with correct background", () => {
      const { container } = render(<Card variant="cream">Cream Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-cream-50");
    });

    it("defaults to white variant when no variant specified", () => {
      const { container } = render(<Card>Default Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-white");
    });
  });

  describe("Standard Styling", () => {
    it("applies 12px border-radius", () => {
      const { container } = render(<Card>Rounded Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/rounded-\[12px\]|rounded-xl/);
    });

    it("applies standard shadow (0 4px 12px rgba(0,0,0,0.05))", () => {
      const { container } = render(<Card>Shadow Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/shadow-card-standard/);
    });

    it("applies 24px padding by default", () => {
      const { container } = render(<Card>Padded Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-6"); // p-6 = 24px in Tailwind
    });

    it("has no hard borders by default", () => {
      const { container } = render(<Card>No Border Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toMatch(/border-\d/);
    });
  });

  describe("Padding Variants", () => {
    it("applies small padding (16px)", () => {
      const { container } = render(<Card padding="sm">Small Padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-4"); // p-4 = 16px
    });

    it("applies medium padding (24px) as default", () => {
      const { container } = render(<Card padding="md">Medium Padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-6"); // p-6 = 24px
    });

    it("applies large padding (32px)", () => {
      const { container } = render(<Card padding="lg">Large Padding</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("p-8"); // p-8 = 32px
    });
  });

  describe("Interactive States", () => {
    it("is not interactive by default (no hover effect)", () => {
      const { container } = render(<Card>Static Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toMatch(/hover:transform|hover:shadow/);
    });

    it("becomes interactive when onClick is provided", () => {
      const handleClick = jest.fn();
      const { container } = render(<Card onClick={handleClick}>Clickable Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/hover:|-translate-y-/);
    });

    it("becomes interactive when href is provided", () => {
      const { container } = render(<Card href="/test">Link Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/hover:|-translate-y-/);
    });

    it("applies hover shadow increase when interactive", () => {
      const { container } = render(<Card onClick={() => {}}>Hover Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/hover:shadow/);
    });

    it("applies translateY effect on hover when interactive", () => {
      const { container } = render(<Card onClick={() => {}}>Transform Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/hover:-translate-y-/);
    });

    it("shows pointer cursor when interactive", () => {
      const { container } = render(<Card onClick={() => {}}>Pointer Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("cursor-pointer");
    });
  });

  describe("Link Behavior", () => {
    it("renders as anchor element when href provided", () => {
      render(<Card href="/test">Link Card</Card>);
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
    });

    it("maintains card styling when rendered as link", () => {
      const { container } = render(<Card href="/test">Link Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-white");
      expect(card.className).toMatch(/rounded/);
    });
  });

  describe("Interactions", () => {
    it("calls onClick handler when clicked", () => {
      const handleClick = jest.fn();
      render(<Card onClick={handleClick}>Clickable</Card>);
      const card = screen.getByText(/clickable/i).parentElement;
      if (card) fireEvent.click(card);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it("accepts custom className", () => {
      const { container } = render(<Card className="custom-class">Custom</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("custom-class");
    });

    it("merges custom className with default classes", () => {
      const { container } = render(<Card className="mt-4">Merged</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("mt-4");
      expect(card).toHaveClass("bg-white"); // Default class preserved
    });
  });

  describe("Accessibility", () => {
    it("has no axe violations (white variant)", async () => {
      const { container } = render(<Card variant="white">White Card</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations (cream variant)", async () => {
      const { container } = render(<Card variant="cream">Cream Card</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("has no axe violations (interactive card)", async () => {
      const { container } = render(<Card onClick={() => {}}>Interactive</Card>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("is keyboard navigable when interactive (href)", () => {
      render(<Card href="/test">Keyboard Link</Card>);
      const link = screen.getByRole("link");
      link.focus();
      expect(link).toHaveFocus();
    });

    it("has visible focus indicator when interactive", () => {
      const { container } = render(<Card href="/test">Focus Card</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).toMatch(/focus:outline|focus:ring/);
    });

    it("supports keyboard activation (Enter) for links", () => {
      render(<Card href="/test">Enter Key Card</Card>);
      const link = screen.getByRole("link");
      link.focus();
      fireEvent.keyDown(link, { key: "Enter" });
      expect(link).toHaveFocus();
    });
  });

  describe("Visual Consistency", () => {
    it("all cards use same border-radius across pages", () => {
      const cards = [
        <Card key="1">Card 1</Card>,
        <Card key="2" variant="cream">Card 2</Card>,
        <Card key="3" padding="lg">Card 3</Card>,
      ];

      cards.forEach((card) => {
        const { container } = render(card);
        const element = container.firstChild as HTMLElement;
        expect(element.className).toMatch(/rounded-\[12px\]|rounded-xl/);
      });
    });

    it("all cards use standard shadow", () => {
      const cards = [
        <Card key="1">Card 1</Card>,
        <Card key="2" variant="cream">Card 2</Card>,
        <Card key="3" href="/test">Card 3</Card>,
      ];

      cards.forEach((card) => {
        const { container } = render(card);
        const element = container.firstChild as HTMLElement;
        expect(element.className).toMatch(/shadow/);
      });
    });
  });

  describe("Design System Compliance", () => {
    it("white variant uses pure white background", () => {
      const { container } = render(<Card variant="white">White</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-white");
    });

    it("cream variant uses cream-50 (#F7F5EF)", () => {
      const { container } = render(<Card variant="cream">Cream</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toHaveClass("bg-cream-50");
    });

    it("does not use hard borders unless specified", () => {
      const { container } = render(<Card>No Border</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card.className).not.toMatch(/border-[123]/);
    });
  });

  describe("Edge Cases", () => {
    it("handles very long content without overflow", () => {
      const longContent = "Lorem ipsum ".repeat(100);
      const { container } = render(<Card>{longContent}</Card>);
      const card = container.firstChild as HTMLElement;
      expect(card).toBeInTheDocument();
      expect(card.textContent).toContain("Lorem ipsum");
    });

    it("handles complex nested content", () => {
      render(
        <Card>
          <h3>Title</h3>
          <p>Description</p>
          <button>Action</button>
        </Card>
      );
      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Description")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /action/i })).toBeInTheDocument();
    });

    it("handles empty content gracefully", () => {
      const { container } = render(<Card> </Card>);
      expect(container.firstChild).toBeInTheDocument();
    });

    it("handles both onClick and href (prioritizes href)", () => {
      const handleClick = jest.fn();
      render(
        <Card href="/test" onClick={handleClick}>
          Both Props
        </Card>
      );
      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", "/test");
    });
  });

  describe("Context-Based Usage", () => {
    it("cream cards used on white section backgrounds", () => {
      // Simulating section context
      const { container } = render(
        <div className="bg-white">
          <Card variant="cream">Cream on White</Card>
        </div>
      );
      const card = container.querySelector("[class*='bg-cream']");
      expect(card).toBeInTheDocument();
    });

    it("white cards used on sand section backgrounds", () => {
      // Simulating section context
      const { container } = render(
        <div className="bg-sand">
          <Card variant="white">White on Sand</Card>
        </div>
      );
      const card = container.querySelector("[class*='bg-white']");
      expect(card).toBeInTheDocument();
    });
  });
});
