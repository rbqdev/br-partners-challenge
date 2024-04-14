import { expect, test } from "@playwright/test";

import { baseUrl } from "@/constants";
import { fillCustomerFormInvalid } from "@/e2eTests/utils/fillCustomerFormInvalid";
import { fillCustomerFormValid } from "@/e2eTests/utils/fillCustomerFormValid";
import { CustomerType } from "@/schema";

const createPageUrl = `${baseUrl}/customers/create`;

test.describe("CustomerFormController", () => {
  test.describe("Fill form valid path", () => {
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

  test.describe("Fill form invalid path", () => {
    test("fill form Individual invalid", async ({ page }) => {
      await page.goto(createPageUrl);

      await fillCustomerFormInvalid({
        page,
        type: CustomerType.PF,
      });
    });
    test("fill form Company invalid", async ({ page }) => {
      await page.goto(createPageUrl);

      await fillCustomerFormInvalid({
        page,
        type: CustomerType.PJ,
      });
    });
  });
});
