import { mutateCustomersMock } from "./mocks/mutateCustomersMock";
import { queryCustomersMock } from "./mocks/queryCustomersMock";

export const handlers = [...queryCustomersMock, ...mutateCustomersMock];
