import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { CustomerType } from "@/schema";

import {
  defaultCompanyValuesMock,
  defaultIndividualValuesMock,
} from "../mocks/customerFormMocks";
import { fillCustomerFormValid } from "./fillCustomerFormValid";

export const createCustomer = async (page: Page, type: CustomerType) => {
  page.getByRole("button", { name: "Create" }).click();

  await expect(page.getByText("Create customer")).toBeVisible();

  fillCustomerFormValid({ page, type });

  await expect(page.getByText("Customers")).toBeVisible();

  if (type === CustomerType.PF) {
    await expect(
      page.getByText(defaultIndividualValuesMock.name)
    ).toBeVisible();
  }

  if (type === CustomerType.PJ) {
    await expect(page.getByText(defaultCompanyValuesMock.name)).toBeVisible();
    await expect(
      page.getByText(defaultCompanyValuesMock.tradeName)
    ).toBeVisible();
  }
};
