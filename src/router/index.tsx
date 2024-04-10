import { createBrowserRouter } from "react-router-dom";

import { CostumersController } from "@/pages/costumers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CostumersController />,
  },
]);
