import { expect, test } from "@playwright/test";

import { baseUrl } from "@/constants";

test.describe("CustomersController", () => {
  test("page not found", async ({ page }) => {
    await page.goto(`${baseUrl}/not-found-page`);
    await expect(page.getByText("Page not found!")).toBeVisible();
    await expect(page.getByText("Go Back")).toBeVisible();
  });
  test("page not found click go back button", async ({ page }) => {
    await page.goto(`${baseUrl}/not-found-page`);
    await expect(page.getByText("Page not found!")).toBeVisible();

    const goBackButton = page.getByRole("button", { name: "Go Back" });
    await goBackButton.click();

    await expect(page.getByText("Customers")).toBeVisible();
  });
});
