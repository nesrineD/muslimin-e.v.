import { render, screen } from "@testing-library/react";
import { SectionBand } from "./section-band";

// Mock page-config constants so tests are decoupled from actual values
jest.mock("@/lib/page-config", () => ({
  SECTION_ALTERNATE_SURFACE_CLASS: "mock-alternate-class",
  CLOSING_SECTION_SURFACE_CLASS: "mock-dark-cta-class",
  FOOTER_BRIDGE_SURFACE_CLASS: "mock-bridge-class",
}));

describe("SectionBand", () => {
  it("renders alternate variant with correct classes", () => {
    const { container } = render(
      <SectionBand variant="alternate">
        <p>Alternate content</p>
      </SectionBand>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("mock-alternate-class");
    expect(screen.getByText("Alternate content")).toBeInTheDocument();
  });

  it("renders dark-cta variant with correct classes", () => {
    const { container } = render(
      <SectionBand variant="dark-cta">
        <p>Dark CTA content</p>
      </SectionBand>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("mock-dark-cta-class");
    expect(screen.getByText("Dark CTA content")).toBeInTheDocument();
  });

  it("renders bridge variant with correct classes", () => {
    const { container } = render(
      <SectionBand variant="bridge">
        <p>Bridge content</p>
      </SectionBand>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("mock-bridge-class");
    expect(screen.getByText("Bridge content")).toBeInTheDocument();
  });

  it("renders children inside a container div", () => {
    render(
      <SectionBand variant="alternate">
        <p>Inner content</p>
      </SectionBand>,
    );

    const child = screen.getByText("Inner content");
    expect(child.parentElement?.className).toContain("container");
    expect(child.parentElement?.className).toContain("mx-auto");
  });

  it("merges className prop correctly", () => {
    const { container } = render(
      <SectionBand variant="alternate" className="custom-class">
        <p>Custom</p>
      </SectionBand>,
    );

    const wrapper = container.firstElementChild as HTMLElement;
    expect(wrapper.className).toContain("custom-class");
    expect(wrapper.className).toContain("mock-alternate-class");
  });
});
