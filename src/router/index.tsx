import { createBrowserRouter } from "react-router-dom";

import { CustomersController } from "@/pages/Customers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomersController />,
  },
]);
