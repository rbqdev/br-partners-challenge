import { render, screen } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { NotFound } from "./NotFound";

const RouterProviderWrapper = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

describe("NotFound", () => {
  it("should render title", () => {
    render(<NotFound />, { wrapper: RouterProviderWrapper });
    expect(screen.getByText("Page not found!")).toBeInTheDocument();
    expect(screen.getByText("Go Back")).toBeInTheDocument();
  });
});
