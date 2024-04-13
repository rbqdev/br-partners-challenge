import { http, HttpResponse } from "msw";

import { Customer } from "@/schema";
import { simulateApiLatency } from "@/utils/simulateApiLatency";

import { customersMap } from "../db";

export const queryCustomersMock = [
  http.get("/api/customers", async () => {
    await simulateApiLatency();
    return HttpResponse.json<Customer[]>([...customersMap.values()], {
      status: 200,
    });
  }),
  http.get("/api/customers/:id", async ({ params }) => {
    const { id } = params;

    if (!customersMap.has(id)) {
      return HttpResponse.error();
    }

    await simulateApiLatency();
    return HttpResponse.json<Customer>(customersMap.get(id), { status: 200 });
  }),
];
