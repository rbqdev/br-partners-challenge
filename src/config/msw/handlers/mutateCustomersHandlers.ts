import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";

import { Customer } from "@/schema";
import { simulateApiLatency } from "@/utils/simulateApiLatency";

import { customersMap } from "../db";

export const mutateCustomersHandlers = [
  http.post<never, Customer>("/api/customers/create", async ({ request }) => {
    const newCustomer = await request.json();
    const customerGeneratedId = uuid();

    customersMap.set(customerGeneratedId, {
      ...newCustomer,
      id: customerGeneratedId,
    });

    await simulateApiLatency();
    return HttpResponse.json(newCustomer, { status: 201 });
  }),
  http.put<never, Customer>(
    "/api/customers/edit/:id",
    async ({ params, request }) => {
      const { id } = params;

      if (!id) {
        return HttpResponse.json("Customer ID is missing", { status: 400 });
      }

      const customer = await request.json();
      customersMap.set(id, {
        ...customer,
        id,
      });

      await simulateApiLatency();
      return HttpResponse.json({
        status: 204,
      });
    }
  ),
  http.delete<never, Customer>(
    "/api/customers/delete/:id",
    async ({ params }) => {
      const { id } = params;

      const deletedCustomer = customersMap.delete(id);

      if (!deletedCustomer) {
        return new HttpResponse("Customer not found", { status: 404 });
      }

      await simulateApiLatency();
      return HttpResponse.json({
        status: 204,
      });
    }
  ),
];
