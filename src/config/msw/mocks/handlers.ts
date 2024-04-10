import { http, HttpResponse } from "msw";
import { v4 as uuid } from "uuid";

import { Costumer, CostumerType } from "@/pages/sharedTypes";

export const handlers = [
  http.get("/api/costumers", () => {
    return HttpResponse.json<Costumer[]>([
      {
        id: uuid(),
        type: CostumerType.PF,
        name: "Frozen yoghurt",
        document: 159,
        email: "test@gmail.com",
        phone: 24,
      },
    ]);
  }),
];
