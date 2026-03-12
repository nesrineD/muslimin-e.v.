"use client";
import { render, screen } from "@testing-library/react";
import { AnimatedCounter } from "./animated-counter";

// Mock IntersectionObserver (not available in jsdom)
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockImplementation((callback) => ({
  observe: jest.fn(() => callback([{ isIntersecting: true }])),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock requestAnimationFrame to run synchronously
jest.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
  cb(performance.now() + 2001);
  return 0;
});

// Mock matchMedia — no reduced-motion preference by default
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});

describe("AnimatedCounter", () => {
  it("renders a span element", () => {
    const { container } = render(<AnimatedCounter target={100} />);
    expect(container.querySelector("span")).toBeInTheDocument();
  });

  it("renders the prefix when provided", () => {
    render(<AnimatedCounter target={150} prefix="€" />);
    const span = screen.getByText(/€/);
    expect(span).toBeInTheDocument();
  });

  it("renders the suffix when provided", () => {
    render(<AnimatedCounter target={50} suffix="+" />);
    const span = screen.getByText(/\+/);
    expect(span).toBeInTheDocument();
  });

  it("shows the final value immediately when prefers-reduced-motion is active", () => {
    // Override matchMedia to report prefers-reduced-motion: reduce
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: true, // prefers-reduced-motion: reduce
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });

    render(<AnimatedCounter target={8} />);
    // Should display final value (formatted with de-DE locale)
    expect(screen.getByText(/8/)).toBeInTheDocument();

    // Reset matchMedia back to no-preference
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("applies additional className to the span", () => {
    const { container } = render(
      <AnimatedCounter target={10} className="text-xl" />,
    );
    expect(container.querySelector("span")).toHaveClass("text-xl");
  });
});
