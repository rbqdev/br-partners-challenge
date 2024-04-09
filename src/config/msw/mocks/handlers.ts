import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("/api/test-route", () => {
    return HttpResponse.json({ name: "Test route #1" });
  }),
];
