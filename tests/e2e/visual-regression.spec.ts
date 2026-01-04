import { expect, test } from "@playwright/test";

test.describe("visual regression", () => {
  test("home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveScreenshot("home.png", { fullPage: true });
  });

  test("post page", async ({ page }) => {
    await page.goto("/posts/hello-world");

    // Engagement counts can change (view increments), so mask the engagement section.
    const engagementSection = page.locator("article > section").first();

    await expect(page).toHaveScreenshot("post.png", { fullPage: true, mask: [engagementSection] });
  });

  test("newsletter page", async ({ page }) => {
    await page.goto("/newsletter");
    await expect(page).toHaveScreenshot("newsletter.png", { fullPage: true });
  });

  test("sign-in page", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await expect(page).toHaveScreenshot("sign-in.png", { fullPage: true });
  });

  test("about page", async ({ page }) => {
    await page.goto("/about");
    await expect(page).toHaveScreenshot("about.png", { fullPage: true });
  });
});
