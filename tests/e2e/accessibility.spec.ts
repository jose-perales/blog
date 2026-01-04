import { expect, test } from "@playwright/test";

async function tabUntilFocused(options: {
  page: import("@playwright/test").Page;
  locator: import("@playwright/test").Locator;
  maxTabs?: number;
}) {
  const { page, locator, maxTabs = 25 } = options;

  for (let i = 0; i < maxTabs; i += 1) {
    if (await locator.evaluate((el) => el === document.activeElement)) return;
    await page.keyboard.press("Tab");
  }

  await expect(locator).toBeFocused();
}

test.describe("accessibility", () => {
  test("keyboard navigation: sign-in form controls reachable", async ({ page }) => {
    await page.goto("/auth/sign-in");

    const email = page.getByLabel("Email");
    const password = page.getByLabel("Password");
    const submit = page.getByRole("button", { name: "Sign in" });

    await tabUntilFocused({ page, locator: email });
    await expect(email).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(password).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(submit).toBeFocused();
  });

  test("keyboard navigation: newsletter form controls reachable", async ({ page }) => {
    await page.goto("/newsletter");

    const email = page.getByLabel("Email");
    const submit = page.getByRole("button", { name: "Sign up" });

    await tabUntilFocused({ page, locator: email });
    await expect(email).toBeFocused();

    await page.keyboard.press("Tab");
    await expect(submit).toBeFocused();
  });

  test("keyboard navigation: home page has reachable post links", async ({ page }) => {
    await page.goto("/");

    const firstPostLink = page.locator("main a[href^='/posts/']").first();
    await tabUntilFocused({ page, locator: firstPostLink });
    await expect(firstPostLink).toBeFocused();
  });
});
