import { createBrowserRouter } from "react-router-dom";

import { CostumersController } from "@/pages/Costumers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <CostumersController />,
  },
]);
