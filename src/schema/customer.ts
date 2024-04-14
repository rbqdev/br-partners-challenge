import { z } from "zod";

import { isPhoneNumberValid } from "@/utils/isPhoneNumberValid";

export enum CustomerType {
  PF = "PF",
  PJ = "PJ",
}

const phoneMaskedLength = 15;
export const phoneInvalidMessage = "Phone number is invalid";
const requiredMessage = (field: string) => `${field} is required`;

export const CustomerSchema = z
  .object({
    id: z.string().uuid().describe("primaryKey").optional(),
    type: z.enum([CustomerType.PF, CustomerType.PJ]),
    name: z.string().refine((val) => val !== "", {
      message: requiredMessage("Field"),
    }),
    document: z.number({
      invalid_type_error: requiredMessage("Document"),
    }),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(phoneMaskedLength, { message: phoneInvalidMessage })
      .max(phoneMaskedLength, { message: phoneInvalidMessage }),
    tradeName: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    const isCompany = val.type === CustomerType.PJ;
    if (isCompany && !val.tradeName) {
      ctx.addIssue({
        path: ["tradeName"],
        code: z.ZodIssueCode.custom,
        message: requiredMessage("Trade name"),
      });
    }
    if (!isPhoneNumberValid(val.phone)) {
      ctx.addIssue({
        path: ["phone"],
        code: z.ZodIssueCode.custom,
        message: phoneInvalidMessage,
      });
    }
  });

export type Customer = z.infer<typeof CustomerSchema>;
