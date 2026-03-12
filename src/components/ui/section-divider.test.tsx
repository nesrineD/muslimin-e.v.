import { render } from "@testing-library/react";
import { SectionDivider } from "./section-divider";

describe("SectionDivider", () => {
  describe("wave variant", () => {
    it("renders an aria-hidden container", () => {
      const { container } = render(<SectionDivider variant="wave" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("aria-hidden", "true");
    });

    it("contains an SVG element", () => {
      const { container } = render(<SectionDivider variant="wave" />);
      expect(container.querySelector("svg")).toBeInTheDocument();
    });

    it("SVG has two path elements", () => {
      const { container } = render(<SectionDivider variant="wave" />);
      expect(container.querySelectorAll("path")).toHaveLength(2);
    });
  });

  describe("gradient-fade variant", () => {
    it("renders an aria-hidden div", () => {
      const { container } = render(<SectionDivider variant="gradient-fade" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("aria-hidden", "true");
    });

    it("does not render SVG", () => {
      const { container } = render(<SectionDivider variant="gradient-fade" />);
      expect(container.querySelector("svg")).not.toBeInTheDocument();
    });
  });

  describe("accent-line variant", () => {
    it("renders an aria-hidden container", () => {
      const { container } = render(<SectionDivider variant="accent-line" />);
      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveAttribute("aria-hidden", "true");
    });

    it("contains a decorative line div", () => {
      const { container } = render(<SectionDivider variant="accent-line" />);
      // The inner div with gradient acts as the visual line
      const lineEl = container.querySelector(".h-px");
      expect(lineEl).toBeInTheDocument();
    });
  });

  it("applies additional className to the wrapper", () => {
    const { container } = render(
      <SectionDivider variant="wave" className="mt-8" />,
    );
    expect(container.firstChild).toHaveClass("mt-8");
  });
});
