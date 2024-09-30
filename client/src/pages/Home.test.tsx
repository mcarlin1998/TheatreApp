// Home.test.tsx
import { act, render, screen } from "@testing-library/react";
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
    await act(() => {
      render(<Home />);
    });
    expect(screen.getByText("Today's Deals")).toBeInTheDocument();
  });

  it("fetches and displays show data", async () => {
    await act(() => {
      render(<Home />);
    });

    expect(await screen.findByText("Wicked")).toBeInTheDocument();
    expect(await screen.findByText("The Lion King")).toBeInTheDocument();
  });

  it("calls fetch on component mount", async () => {
    render(<Home />);

    await screen.findByText("Wicked");
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("handles fetch error gracefully", async () => {
    // Mock fetch to return a rejected promise
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error("Fetch error"))
    );

    await (async () => {
      render(<Home />);
    });

    // Check for the error message in the UI
    expect(await screen.findByText("Failed to fetch data")).toBeInTheDocument(); // Adjust based on your implementation
  });
});
