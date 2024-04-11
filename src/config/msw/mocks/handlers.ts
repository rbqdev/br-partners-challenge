import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";

import { Customer } from "@/schema";

import { customersMap } from "./db";

export const handlers = [
  http.get("/api/customers", () => {
    return HttpResponse.json<Customer[]>([...customersMap.values()], {
      status: 200,
    });
  }),
  http.get("/api/customers/:id", ({ params }) => {
    const { id } = params;

    if (!customersMap.has(id)) {
      return HttpResponse.error();
    }

    return HttpResponse.json<Customer>(customersMap.get(id), { status: 200 });
  }),
  http.post<never, Customer>("/api/customers/create", async ({ request }) => {
    const newCustomer = await request.json();
    const customerGeneratedId = uuid();

    customersMap.set(customerGeneratedId, {
      ...newCustomer,
      id: customerGeneratedId,
    });

    return HttpResponse.json(newCustomer, { status: 201 });
  }),
  http.post<never, Customer>(
    "/api/customers/edit/:id",
    async ({ params, request }) => {
      const { id } = params;

      if (!id) {
        return HttpResponse.json("Customer ID is missing", { status: 400 });
      }

      const customer = await request.json();
      customersMap.set(id, {
        ...customer,
      });

      return HttpResponse.json(null, { status: 204 });
    }
  ),
  http.delete<never, Customer>(
    "/api/customers/delete/:id",
    async ({ params }) => {
      const { id } = params;

      const deletedCustomer = customersMap.delete(id);

      if (!deletedCustomer) {
        return new HttpResponse(null, { status: 404 });
      }

      return HttpResponse.json("Customer deleted!", { status: 201 });
    }
  ),
];
