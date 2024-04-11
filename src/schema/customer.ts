import { z } from "zod";

export enum CustomerType {
  PF = "PF",
  PJ = "PJ",
}

export const CustomerSchema = z
  .object({
    id: z.string().uuid().describe("primaryKey").optional(),
    type: z.enum([CustomerType.PF, CustomerType.PJ]),
    name: z.string().refine((val) => val !== "", {
      message: "Name is required",
    }),
    document: z.number({
      invalid_type_error: "Document is required",
    }),
    email: z.string().email("Invalid email address"),
    /**
     * As the phone input is masked
     * Had to add a refine validation
     */
    phone: z.string().refine((val) => val !== "", {
      message: "Phone is required",
    }),
    tradeName: z.string().optional(),
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
