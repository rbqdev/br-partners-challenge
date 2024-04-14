import { z } from "zod";

import { isPhoneNumberValid } from "@/utils/isPhoneNumberValid";

export enum CustomerType {
  PF = "PF",
  PJ = "PJ",
}

export const CustomerSchema = z
  .object({
    id: z.string().uuid().describe("primaryKey").optional(),
    type: z.enum([CustomerType.PF, CustomerType.PJ]),
    name: z.string().refine((val) => val !== "", {
      message: "Field is required",
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
    const isCompany = val.type === CustomerType.PJ;
    if (isCompany && !val.tradeName) {
      ctx.addIssue({
        path: ["tradeName"],
        code: z.ZodIssueCode.custom,
        message: `Trade name is required`,
      });
    }
    if (!isPhoneNumberValid(val.phone)) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: `Phone number is invalid`,
      });
    }
  });

export type Customer = z.infer<typeof CustomerSchema>;
