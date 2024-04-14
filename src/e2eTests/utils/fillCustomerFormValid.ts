import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { CustomerType } from "@/schema";

import {
  defaultCompanyValuesMock,
  defaultIndividualValuesMock,
} from "../mocks/customerFormMocks";

export const fillCustomerFormValid = async ({
  page,
  type,
  isEdit = false,
  customName,
  shouldSubmit = true,
}: {
  page: Page;
  type: string;
  isEdit?: boolean;
  customName?: string;
  shouldSubmit?: boolean;
}) => {
  /** Submit button start disabled */
  if (!isEdit) {
    const disabledButton = page.getByTestId("submit-button");
    await expect(disabledButton).toBeDisabled();
  }

  if (type === CustomerType.PF) {
    const typeElement = page.getByLabel("Type");
    await typeElement.click();
    const typeOption = page.getByRole("option", { name: "Individual" });
    await typeOption.click();
    const nameElement = page.getByLabel("Name");
    await nameElement.fill(customName ?? defaultIndividualValuesMock.name);
    const documentElement = page.getByLabel("Document");
    await documentElement.fill(defaultIndividualValuesMock.document);
    const emailElement = page.getByLabel("Email");
    await emailElement.fill(defaultIndividualValuesMock.email);
    const phoneElement = page.getByLabel("Phone");
    await phoneElement.fill(defaultIndividualValuesMock.phone);
    const phoneMaskedElement = page.getByLabel("Phone");
    await expect(phoneMaskedElement).toHaveValue(
      defaultIndividualValuesMock.phoneMasked
    );
    const enabledButton = page.getByTestId("submit-button");
    await expect(enabledButton).toHaveCSS(
      "background-color",
      "rgb(46, 125, 50)"
    );
  }

  if (type === CustomerType.PJ) {
    const typeElement = page.getByLabel("Type");
    typeElement.click();
    await page.getByText("Company").click();
    const companyNameElement = page.getByLabel("Company Name");
    await companyNameElement.fill(customName ?? defaultCompanyValuesMock.name);
    const tradeNameElement = page.getByLabel("Trade name");
    await tradeNameElement.fill(defaultCompanyValuesMock.tradeName);
    const documentElement = page.getByLabel("Document");
    await documentElement.fill(defaultCompanyValuesMock.document);
    const emailElement = page.getByLabel("Email");
    await emailElement.fill(defaultCompanyValuesMock.email);
    const phoneElement = page.getByLabel("Phone");
    await phoneElement.fill(defaultCompanyValuesMock.phone);
    const phoneMaskedElement = page.getByLabel("Phone");
    await expect(phoneMaskedElement).toHaveValue(
      defaultIndividualValuesMock.phoneMasked
    );
    const enabledButton = page.getByTestId("submit-button");
    await expect(enabledButton).toHaveCSS(
      "background-color",
      "rgb(46, 125, 50)"
    );
  }

  if (shouldSubmit) {
    const enabledButton = page.getByTestId("submit-button");
    await expect(enabledButton).toBeEnabled();
    await enabledButton.click();
  }
};
