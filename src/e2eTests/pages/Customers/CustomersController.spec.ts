import { expect, test } from "@playwright/test";

import { baseUrl } from "@/constants";
import { defaultIndividualValuesMock } from "@/e2eTests/mocks/customerFormMocks";
import { createCustomer } from "@/e2eTests/utils/createCustomer";
import { fillCustomerFormValid } from "@/e2eTests/utils/fillCustomerFormValid";
import { CustomerType } from "@/schema";

test.describe("CustomersController", () => {
  test("customers page", async ({ page }) => {
    await page.goto(`${baseUrl}/customers`);
    await expect(page.getByText("Customers")).toBeVisible();
  });
  test("customers empty page", async ({ page }) => {
    await page.goto(`${baseUrl}/customers`);
    await expect(page.getByText("Customers")).toBeVisible();

    await expect(page.getByText("No customers found")).toBeVisible();
  });

  test("create Individual customer", async ({ page }) => {
    await page.goto(`${baseUrl}/customers`);
    await expect(page.getByText("Customers")).toBeVisible();

    await createCustomer(page, CustomerType.PF);
    const snackBar = page.getByText("Customer created");
    await expect(snackBar).toBeVisible();
  });

  test("create Company customer", async ({ page }) => {
    await page.goto(`${baseUrl}/customers`);
    await expect(page.getByText("Customers")).toBeVisible();

    await createCustomer(page, CustomerType.PJ);
    const snackBar = page.getByText("Customer created");
    await expect(snackBar).toBeVisible();
  });

  test("edit customer", async ({ page }) => {
    await page.goto(`${baseUrl}/customers`);
    await expect(page.getByText("Customers")).toBeVisible();

    await createCustomer(page, CustomerType.PF);

    const editIconButton = page.locator("[aria-label='edit customer']");
    await expect(editIconButton).toBeVisible();
    await editIconButton.click();
    await expect(page.getByText("Edit customer")).toBeVisible();

    /** Old name */
    await expect(page.getByLabel("Name")).toHaveValue(
      defaultIndividualValuesMock.name
    );

    const customName = "Custom Name Edited";
    await fillCustomerFormValid({
      page,
      type: CustomerType.PF,
      customName,
      isEdit: true,
    });

    const snackBar = page.getByText("Customer edited");
    await expect(snackBar).toBeVisible();
    await expect(page.getByText("Customers")).toBeVisible();
    await expect(page.getByText(customName)).toBeVisible();
    await expect(
      page.getByText(defaultIndividualValuesMock.name)
    ).not.toBeVisible();
  });

  test("edit customer not found", async ({ page }) => {
    await page.goto(`${baseUrl}/customers/edit/undefinedId`);
    await expect(page.getByText("Edit customer")).toBeVisible();

    await expect(
      page.getByText("No customer found with provided ID")
    ).toBeVisible();
  });

  test("delete customer", async ({ page }) => {
    await page.goto(`${baseUrl}/customers`);
    await expect(page.getByText("Customers")).toBeVisible();

    await createCustomer(page, CustomerType.PF);

    const deleteIconButton = page.locator("[aria-label='delete customer']");
    await expect(deleteIconButton).toBeVisible();
    await deleteIconButton.click();

    await expect(
      page.getByText("Are you sure you want to delete this item?")
    ).toBeVisible();

    const deleteDialogButton = page.getByRole("button", { name: "Delete" });
    await deleteDialogButton.click();

    const snackBar = page.getByText("Customer deleted");
    await expect(snackBar).toBeVisible();
    await expect(page.getByText("Customers")).toBeVisible();
    await expect(
      page.getByText(defaultIndividualValuesMock.name)
    ).not.toBeVisible();
  });
});
