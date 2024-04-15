import { render, screen } from "@testing-library/react";

import { fullBoxLoaderId } from "./constants";
import { PageLayout, PageLayoutProps } from "./PageLayout";

const mockChildren = "Children";
const PageLayoutWrapper = (props: Omit<PageLayoutProps, "children">) => (
  <PageLayout {...props}>
    <>{mockChildren}</>
  </PageLayout>
);

describe("PageLayout", () => {
  it("should render children element", () => {
    render(<PageLayoutWrapper />);
    expect(screen.getByText(mockChildren)).toBeInTheDocument();
  });
  it("should render loading element", () => {
    render(<PageLayoutWrapper isLoading />);
    expect(screen.getByTestId(fullBoxLoaderId)).toBeInTheDocument();
    expect(screen.queryByText("Children")).not.toBeInTheDocument();
  });
  it("should render empty message", () => {
    const mockEmptyMessage = "No customer found";
    render(<PageLayoutWrapper emptyMessage={mockEmptyMessage} />);
    expect(screen.getByText(mockEmptyMessage)).toBeInTheDocument();
    expect(screen.queryByText("Children")).not.toBeInTheDocument();
  });
  it("should render error message", () => {
    const mockErrorMessage = "Something went wrong";
    render(<PageLayoutWrapper errorMessage={mockErrorMessage} />);
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    expect(screen.queryByText("Children")).not.toBeInTheDocument();
  });
  it("should render error action", () => {
    const mockErrorMessage = "Something went wrong";
    const mockErrorAction = <>Error Action</>;
    render(
      <PageLayoutWrapper
        errorMessage={mockErrorMessage}
        errorAction={mockErrorAction}
      />
    );
    expect(screen.getByText(mockErrorMessage)).toBeInTheDocument();
    expect(screen.getByText("Error Action")).toBeInTheDocument();
    expect(screen.queryByText("Children")).not.toBeInTheDocument();
  });
});
