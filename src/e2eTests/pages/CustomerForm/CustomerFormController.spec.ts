import { expect, test } from "@playwright/test";

import { baseUrl } from "@/constants";
import { fillCustomerFormValid } from "@/e2eTests/utils/fillCustomerFormValid";
import { CustomerType } from "@/schema";
test.describe("CustomerFormController", () => {
  test.describe("Fill form", () => {
    const createPageUrl = `${baseUrl}/customers/create`;
    test("customer form initial page", async ({ page }) => {
      await page.goto(createPageUrl);
      await expect(page.getByText("Create Customer")).toBeVisible();
    });

    test("fill form for Individual customer", async ({ page }) => {
      await page.goto(createPageUrl);

      await fillCustomerFormValid({
        page,
        type: CustomerType.PF,
        shouldSubmit: false,
      });
    });

    test("fill form for Company customer", async ({ page }) => {
      await page.goto(createPageUrl);

      await fillCustomerFormValid({
        page,
        type: CustomerType.PJ,
        shouldSubmit: false,
      });
    });
  });
});
