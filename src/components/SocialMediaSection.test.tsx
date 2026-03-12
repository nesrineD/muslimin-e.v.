import { render, screen } from "@testing-library/react";
import { SocialMediaSection } from "./SocialMediaSection";

// Mock framer-motion to render plain elements
jest.mock("framer-motion", () => ({
  motion: {
    div: ({
      children,
      className,
      ...rest
    }: React.HTMLAttributes<HTMLDivElement>) => (
      <div className={className} {...rest}>
        {children}
      </div>
    ),
    a: ({
      children,
      className,
      ...rest
    }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
      <a className={className} {...rest}>
        {children}
      </a>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

describe("SocialMediaSection", () => {
  describe("dark theme", () => {
    it("applies dark text classes to compact variant title when theme='dark'", () => {
      render(
        <SocialMediaSection
          variant="compact"
          theme="dark"
          title="Folge uns"
          subtitle="Test subtitle"
          showTitle={true}
        />,
      );

      const title = screen.getByText("Folge uns");
      expect(title).toHaveClass("text-white");
    });

    it("applies dark text classes to compact variant subtitle when theme='dark'", () => {
      render(
        <SocialMediaSection
          variant="compact"
          theme="dark"
          title="Folge uns"
          subtitle="Test subtitle"
          showTitle={true}
        />,
      );

      const subtitle = screen.getByText("Test subtitle");
      expect(subtitle).toHaveClass("text-cream-200");
    });

    it("applies light gradient text to title when theme is omitted", () => {
      render(
        <SocialMediaSection
          variant="compact"
          title="Folge uns"
          subtitle="Test subtitle"
          showTitle={true}
        />,
      );

      const title = screen.getByText("Folge uns");
      expect(title).toHaveClass("bg-clip-text");
      expect(title).toHaveClass("text-transparent");
    });

    it("applies light text class to subtitle when theme is omitted", () => {
      render(
        <SocialMediaSection
          variant="compact"
          title="Folge uns"
          subtitle="Test subtitle"
          showTitle={true}
        />,
      );

      const subtitle = screen.getByText("Test subtitle");
      expect(subtitle).toHaveClass("text-charcoal-700");
    });

    it("renders all 4 social platform links", () => {
      render(
        <SocialMediaSection variant="compact" theme="dark" showTitle={false} />,
      );

      expect(
        screen.getByRole("link", { name: /instagram/i }),
      ).toBeInTheDocument();
      expect(screen.getByRole("link", { name: /tiktok/i })).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /youtube/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("link", { name: /whatsapp/i }),
      ).toBeInTheDocument();
    });
  });
});
