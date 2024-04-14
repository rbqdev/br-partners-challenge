import { Page } from "@playwright/test";
import { expect } from "@playwright/test";

import { CustomerType } from "@/schema";

import {
  defaultCompanyValuesMock,
  defaultIndividualValuesMock,
} from "../mocks/customerFormMocks";

export const fillCustomerFormInvalid = async ({
  page,
  type,
  isEdit = false,
}: {
  page: Page;
  type: string;
  isEdit?: boolean;
}) => {
  const isCompany = type === CustomerType.PJ;

  if (!isEdit) {
    const disabledButton = page.getByTestId("submit-button");
    await expect(disabledButton).toBeDisabled();
  }

  const typeElement = page.getByLabel("Type");
  await typeElement.click();
  const typeOption = page.getByRole("option", {
    name: isCompany ? "Company" : "Individual",
  });
  await typeOption.click();

  if (isCompany) {
    const companyNameElement = page.getByLabel("Company Name");
    await companyNameElement.fill(defaultCompanyValuesMock.name);
    await companyNameElement.fill("");
    await expect(page.getByText("Field is required")).toBeVisible();
  } else {
    const nameElement = page.getByLabel("Name");
    await nameElement.fill(defaultIndividualValuesMock.name);
    await expect(nameElement).toHaveValue(defaultIndividualValuesMock.name);
    await nameElement.fill("");
    await expect(page.getByText("Field is required")).toBeVisible();
  }

  const documentElement = page.getByLabel("Document");
  await documentElement.fill(defaultIndividualValuesMock.document);
  await expect(documentElement).toHaveValue(
    defaultIndividualValuesMock.document
  );
  await documentElement.fill("");
  await expect(page.getByText("Document is required")).toBeVisible();

  const emailElement = page.getByLabel("Email");
  await emailElement.fill(defaultIndividualValuesMock.email);
  await expect(emailElement).toHaveValue(defaultIndividualValuesMock.email);
  await emailElement.fill("invalidEmail!!!");
  await expect(page.getByText("Invalid email address")).toBeVisible();

  const phoneElement = page.getByLabel("Phone");
  await phoneElement.fill(defaultIndividualValuesMock.phone);
  const phoneMaskedElement = page.getByLabel("Phone");
  await expect(phoneMaskedElement).toHaveValue(
    defaultIndividualValuesMock.phoneMasked
  );
  await phoneMaskedElement.fill("");
  await expect(page.getByText("Phone is required")).toBeVisible();

  const disabledButton = page.getByTestId("submit-button");
  await expect(disabledButton).toBeDisabled();
};
