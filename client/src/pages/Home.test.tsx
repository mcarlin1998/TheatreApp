import { act, render, screen, waitFor } from "@testing-library/react";
import Home from "./Home";

// Mocking the global fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          name: "Wicked",
          image: "https://example.com/wicked.jpg",
          bookingLink: "https://example.com/book-wicked",
        },
        {
          name: "The Lion King",
          image: "https://example.com/lion-king.jpg",
          bookingLink: "SOLD OUT",
        },
      ]),
  })
) as jest.Mock;

describe("Home Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(screen.getByText("Today's Deals")).toBeInTheDocument();
  });

  it("calls fetch on component mount", async () => {
    await act(async () => {
      render(<Home />);
    });

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles fetch error gracefully", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch data"))
    );

    await act(async () => {
      render(<Home />);
    });

    expect(await screen.findByText("Failed to fetch data")).toBeInTheDocument();
  });
});
