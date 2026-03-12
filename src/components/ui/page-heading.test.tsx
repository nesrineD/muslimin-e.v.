import { render, screen } from "@testing-library/react";
import { PageHeading } from "./page-heading";

describe("PageHeading", () => {
  it("renders the title as an h1", () => {
    render(<PageHeading title="Über Muslimin e.V." />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Über Muslimin e.V.");
  });

  it("does not render a subtitle when omitted", () => {
    render(<PageHeading title="Titel" />);
    expect(screen.queryByText(/subtitle/i)).not.toBeInTheDocument();
  });

  it("renders the subtitle paragraph when provided", () => {
    render(<PageHeading title="Titel" subtitle="Unser Verein im Überblick" />);
    expect(screen.getByText("Unser Verein im Überblick")).toBeInTheDocument();
  });

  it("highlights the accentWord word in a span", () => {
    const { container } = render(
      <PageHeading title="Über Muslimin e.V." accentWord="Muslimin" />,
    );
    const accentSpan = container.querySelector("span.text-sage-700");
    expect(accentSpan).toBeInTheDocument();
    expect(accentSpan).toHaveTextContent("Muslimin");
  });

  it("does not add extra spans when accentWord is not in title", () => {
    const { container } = render(
      <PageHeading title="Hallo Welt" accentWord="xyz" />,
    );
    // Should render plain text without span
    expect(
      container.querySelector("span.text-sage-700"),
    ).not.toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "Hallo Welt",
    );
  });

  it("applies additional className to the wrapper", () => {
    const { container } = render(
      <PageHeading title="Test" className="my-custom-class" />,
    );
    expect(container.firstChild).toHaveClass("my-custom-class");
  });
});
