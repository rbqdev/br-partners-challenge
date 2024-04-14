import { render, screen } from "@testing-library/react";

import { ErrorMessage } from "./ErrorMessage";

describe("ErrorMessage", () => {
  const mockMessage = "mockMessage";
  it("should render message", () => {
    render(<ErrorMessage message={mockMessage} />);
    expect(screen.getByText(mockMessage)).toBeInTheDocument();
  });
  it("should return undefined", () => {
    const { container } = render(<ErrorMessage />);
    expect(container).toBeEmptyDOMElement();
  });
});
