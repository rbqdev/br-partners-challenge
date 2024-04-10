import "./globalStyles/reset.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./App.tsx";
import { mockServiceWorker } from "./config/msw/index.ts";

if (process.env.NODE_ENV === "development") {
  await mockServiceWorker.start();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
