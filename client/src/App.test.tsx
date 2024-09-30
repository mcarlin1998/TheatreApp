// App.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Home component", () => {
  render(<App />);

  // Check if the "Today's Deals" header from the Home component is present
  const headerElement = screen.getByText(/Today's Deals/i); // Adjust to match actual text
  expect(headerElement).toBeInTheDocument();
});
