import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EventCard } from "./EventCard";

describe("EventCard Accessibility", () => {
  const mockProps = {
    name: "Test Event",
    description: "Full description of the test event",
    teaser: "Short teaser text",
    regularity: "Weekly",
    targetAudience: "All members",
    format: "Online" as const,
    icon: "📅",
  };

  it("button has aria-expanded attribute that reflects state", async () => {
    const user = userEvent.setup();
    render(<EventCard {...mockProps} />);

    const button = screen.getByRole("button", { name: /mehr erfahren/i });

    // Initially collapsed
    expect(button).toHaveAttribute("aria-expanded", "false");

    // Expand
    await user.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "true");
    });

    // Collapse
    await user.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute("aria-expanded", "false");
    });
  });

  it("button has aria-controls linking to expanded content", async () => {
    const user = userEvent.setup();
    render(<EventCard {...mockProps} />);

    const button = screen.getByRole("button", { name: /mehr erfahren/i });
    const ariaControls = button.getAttribute("aria-controls");

    expect(ariaControls).toBeTruthy();
    expect(ariaControls).toMatch(/event-test-event-content/);

    // Expand to reveal content
    await user.click(button);

    await waitFor(() => {
      const expandedContent = document.getElementById(ariaControls!);
      expect(expandedContent).toBeInTheDocument();
    });
  });

  it("expanded content has proper ARIA region role and label", async () => {
    const user = userEvent.setup();
    render(<EventCard {...mockProps} />);

    const button = screen.getByRole("button", { name: /mehr erfahren/i });

    // Expand
    await user.click(button);

    await waitFor(() => {
      const region = screen.getByRole("region", {
        name: /weitere informationen zu test event/i,
      });
      expect(region).toBeInTheDocument();
    });
  });

  it("chevron icon is hidden from screen readers", async () => {
    render(<EventCard {...mockProps} />);

    const button = screen.getByRole("button", { name: /mehr erfahren/i });
    const chevronContainer = button.querySelector('[aria-hidden="true"]');

    expect(chevronContainer).toBeInTheDocument();
  });

  it("displays teaser initially and full description when expanded", async () => {
    const user = userEvent.setup();
    render(<EventCard {...mockProps} />);

    // Initially shows teaser
    expect(screen.getByText(mockProps.teaser)).toBeInTheDocument();
    expect(screen.queryByText(mockProps.description)).not.toBeInTheDocument();

    // Expand to show full description
    const button = screen.getByRole("button", { name: /mehr erfahren/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(mockProps.description)).toBeInTheDocument();
      expect(screen.queryByText(mockProps.teaser)).not.toBeInTheDocument();
    });
  });

  it("shows additional details when expanded", async () => {
    const user = userEvent.setup();
    render(<EventCard {...mockProps} />);

    const button = screen.getByRole("button", { name: /mehr erfahren/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/regelmäßigkeit/i)).toBeInTheDocument();
      expect(screen.getByText(mockProps.regularity)).toBeInTheDocument();
      expect(screen.getByText(/zielgruppe/i)).toBeInTheDocument();
      expect(screen.getByText(mockProps.targetAudience)).toBeInTheDocument();
    });
  });
});
