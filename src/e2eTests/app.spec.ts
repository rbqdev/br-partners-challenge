import { expect, test } from "@playwright/test";

import { baseUrl } from "@/constants";
test.describe("App", () => {
  test("has title", async ({ page }) => {
    await page.goto(baseUrl);
    await expect(page).toHaveTitle(/BR Partners - Frontend Challenge/);
  });
});
