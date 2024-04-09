import React from "react";
import ReactDOM from "react-dom/client";
import "./globalStyles/reset.css";
import { mockServiceWorker } from "./config/msw/index.ts";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.tsx";

if (process.env.NODE_ENV === "development") {
  await mockServiceWorker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
