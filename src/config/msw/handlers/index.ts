import { mutateCustomersHandlers } from "./mutateCustomersHandlers";
import { queryCustomersHandlers } from "./queryCustomersHandlers";

export const handlers = [...queryCustomersHandlers, ...mutateCustomersHandlers];
