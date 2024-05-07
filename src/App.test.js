import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  test("renders learn react link", async () => {
    render(<App />);

    await waitFor(() => {
      const linkElement = screen.getByText(/learn react/i);
      expect(linkElement).toBeInTheDocument();
    });
  });
});
