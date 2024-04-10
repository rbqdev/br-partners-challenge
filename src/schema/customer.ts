import { z } from "zod";

export enum CustomerType {
  PF = "PF",
  PJ = "PJ",
}

export const CustomerSchema = z.object({
  id: z.string(),
  type: z.enum([CustomerType.PF, CustomerType.PJ]),
  name: z.string(),
  businessName: z.string().optional(),
  document: z.number(),
  email: z.string(),
  phone: z.number(),
});

export type Customer = z.infer<typeof CustomerSchema>;
