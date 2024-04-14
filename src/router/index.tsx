import { createBrowserRouter, Navigate } from "react-router-dom";

import { CustomerFormController } from "@/pages/CostumerForm";
import { CustomersController } from "@/pages/Customers";
import { NotFound } from "@/pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/customers" />,
    errorElement: <NotFound />,
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
