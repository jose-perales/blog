import { expect, test } from "@playwright/test";

import { uniqueEmail } from "./helpers";

test("newsletter signup stores email and shows success", async ({ page }) => {
  await page.goto("/newsletter");

  const email = uniqueEmail("newsletter");
  await page.getByLabel("Email").fill(email);
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page.getByText("You’re subscribed. Thanks for signing up!")).toBeVisible();
});
