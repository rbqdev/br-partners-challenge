import { z } from "zod";

export enum CustomerType {
  PF = "PF",
  PJ = "PJ",
}

export const CustomerSchema = z
  .object({
    id: z.string().uuid().describe("primaryKey").optional(),
    type: z.enum([CustomerType.PF, CustomerType.PJ]),
    name: z.string(),
    tradeName: z.string().optional(),
    document: z.number(),
    email: z.string().email("Invalid email address"),
    phone: z.number(),
  })
  .superRefine((val, ctx) => {
    if (val.type === CustomerType.PJ && !val.tradeName) {
      ctx.addIssue({
        path: ["tradeName"],
        code: z.ZodIssueCode.custom,
        message: `Trade name is required`,
      });
    }
  });

export type Customer = z.infer<typeof CustomerSchema>;
