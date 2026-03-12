import { render, screen } from "@testing-library/react";
import { SectionHeading } from "./section-heading";

describe("SectionHeading", () => {
  it("renders the title as an h2", () => {
    render(<SectionHeading title="Unsere Kernziele" />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Unsere Kernziele");
  });

  it("does not render a subtitle when omitted", () => {
    render(<SectionHeading title="Titel" />);
    // Only the heading element should be present, no paragraph sibling
    expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
  });

  it("renders the subtitle paragraph when provided", () => {
    render(
      <SectionHeading
        title="Titel"
        subtitle="Die Säulen unserer Gemeinschaft."
      />,
    );
    expect(
      screen.getByText("Die Säulen unserer Gemeinschaft."),
    ).toBeInTheDocument();
  });

  it("highlights the accentWord in a span", () => {
    const { container } = render(
      <SectionHeading title="Transparenz & Vertrauen" accentWord="Vertrauen" />,
    );
    const accentSpan = container.querySelector("span.text-sage-700");
    expect(accentSpan).toBeInTheDocument();
    expect(accentSpan).toHaveTextContent("Vertrauen");
  });

  it("is centered by default", () => {
    const { container } = render(<SectionHeading title="Test" />);
    expect(container.firstChild).toHaveClass("text-center");
  });

  it("aligns left when centered is false", () => {
    const { container } = render(
      <SectionHeading title="Test" centered={false} />,
    );
    expect(container.firstChild).toHaveClass("text-left");
    expect(container.firstChild).not.toHaveClass("text-center");
  });

  it("applies additional className to wrapper", () => {
    const { container } = render(
      <SectionHeading title="Test" className="extra-class" />,
    );
    expect(container.firstChild).toHaveClass("extra-class");
  });
});
