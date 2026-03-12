import { render, screen } from "@testing-library/react";
import { SplitSection } from "./split-section";

// Mock framer-motion so animations don't interfere with jsdom rendering
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: React.ComponentPropsWithoutRef<"div">) => (
      <div className={className} {...rest}>
        {children}
      </div>
    ),
  },
  useInView: () => true,
}));

// Mock next/image to avoid Next.js image optimisation in tests
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    fill: _fill,
    sizes: _sizes,
    ...rest
  }: {
    src: string;
    alt: string;
    fill?: boolean;
    sizes?: string;
    [key: string]: unknown;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...rest} />
  ),
}));

describe("SplitSection", () => {
  const defaultProps = {
    imageSrc: "/images/test.jpg",
    imageAlt: "Test image",
    children: <p>Test content</p>,
  };

  it("renders the image with the given alt text", () => {
    render(<SplitSection {...defaultProps} />);
    expect(screen.getByAltText("Test image")).toBeInTheDocument();
  });

  it("renders the children content", () => {
    render(<SplitSection {...defaultProps} />);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("uses 4:3 aspect ratio by default (pb-[75%] padding class)", () => {
    const { container } = render(<SplitSection {...defaultProps} />);
    const imageWrapper = container.querySelector(".pb-\\[75\\%\\]");
    expect(imageWrapper).toBeInTheDocument();
  });

  it("uses 3:2 aspect ratio when specified", () => {
    const { container } = render(
      <SplitSection {...defaultProps} aspectRatio="3:2" />,
    );
    const imageWrapper = container.querySelector(".pb-\\[66\\.67\\%\\]");
    expect(imageWrapper).toBeInTheDocument();
  });

  it("image is first (non-reversed layout) by default", () => {
    const { container } = render(<SplitSection {...defaultProps} />);
    const flexRow = container.querySelector(".flex");
    const children = flexRow ? Array.from(flexRow.children) : [];
    // First child should contain the img
    expect(children[0].querySelector("img")).toBeInTheDocument();
    // Second child should contain the text content
    expect(children[1]).toHaveTextContent("Test content");
  });

  it("text comes first when reversed is true", () => {
    const { container } = render(<SplitSection {...defaultProps} reversed />);
    const flexRow = container.querySelector(".flex");
    const children = flexRow ? Array.from(flexRow.children) : [];
    // Text element should be first
    expect(children[0]).toHaveTextContent("Test content");
    // Image element should be second
    expect(children[1].querySelector("img")).toBeInTheDocument();
  });

  it("applies additional className to the wrapper", () => {
    const { container } = render(
      <SplitSection {...defaultProps} className="my-section-class" />,
    );
    expect(container.firstChild).toHaveClass("my-section-class");
  });
});
