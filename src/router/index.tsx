import { createBrowserRouter } from "react-router-dom";

import { CustomerFormController } from "@/pages/CostumerForm";
import { CustomersController } from "@/pages/Customers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomersController />,
  },
  {
    path: "/customer/create",
    element: <CustomerFormController />,
  },
  {
    path: "/customer/edit/:id",
    element: <CustomerFormController />,
  },
]);
