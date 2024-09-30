// ShowCard.test.tsx
import { render, screen } from "@testing-library/react";
import ShowCard from "./ShowCard";
import { ShowData } from "../../types";

// Sample show data for testing
const showInfo: ShowData = {
  name: "Wicked",
  image: "https://example.com/wicked.jpg",
  bookingLink: "https://example.com/book-wicked",
};

const soldOutShowInfo: ShowData = {
  name: "The Lion King",
  image: "https://example.com/lion-king.jpg",
  bookingLink: "SOLD OUT",
};

describe("ShowCard Component", () => {
  it("renders show information correctly", () => {
    render(<ShowCard {...showInfo} />);

    expect(screen.getByText("Wicked")).toBeInTheDocument();
    expect(screen.getByText("About the Show")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Wicked" })).toBeInTheDocument();
  });

  it("displays SOLD OUT when the show is sold out", () => {
    render(<ShowCard {...soldOutShowInfo} />);

    expect(screen.getByText("SOLD OUT")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "The Lion King" })).toHaveClass(
      "opacity-25"
    );
  });

  it("renders the booking link when the show is available", () => {
    render(<ShowCard {...showInfo} />);

    const bookNowButton = screen.getByText("Book Now");
    expect(bookNowButton).toBeInTheDocument();
    expect(bookNowButton).toHaveAttribute(
      "href",
      "https://example.com/book-wicked"
    );
  });
});
