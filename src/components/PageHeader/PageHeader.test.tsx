import { render, screen } from "@testing-library/react";

import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  const mockTitle = "mockTitle";
  it("should render title", () => {
    render(<PageHeader title={mockTitle} />);
    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });
  it("should render action", () => {
    const mockAction = <>Action</>;
    render(<PageHeader title={mockTitle} action={mockAction} />);
    expect(screen.getByText("Action")).toBeInTheDocument();
  });
});
