import { createBrowserRouter, Navigate } from "react-router-dom";

import { CustomerFormController } from "@/pages/CostumerForm";
import { CustomersController } from "@/pages/Customers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/customers" />,
  },
  {
    path: "/customers",
    element: <CustomersController />,
  },
  {
    path: "/customers/create",
    element: <CustomerFormController />,
  },
  {
    path: "/customers/edit/:id",
    element: <CustomerFormController />,
  },
]);
