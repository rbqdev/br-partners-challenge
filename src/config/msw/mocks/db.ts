import { factory, nullable, primaryKey } from "@mswjs/data";

export const db = factory({
  customer: {
    id: primaryKey(String),
    type: String,
    name: String,
    businessName: nullable(String),
    document: Number,
    email: String,
    phone: Number,
  },
});
