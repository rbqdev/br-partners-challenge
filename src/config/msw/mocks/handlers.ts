import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";

import { Customer, CustomerType } from "@/schema";

export const handlers = [
  http.get("/api/customers", () => {
    return HttpResponse.json<Customer[]>([
      {
        id: uuid(),
        type: CustomerType.PF,
        name: "Frozen yoghurt",
        document: 159,
        email: "test@gmail.com",
        phone: 24,
      },
    ]);
  }),
];
