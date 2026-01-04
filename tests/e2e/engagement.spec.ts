import { expect, test } from "@playwright/test";

import { gotoFirstPostFromHome, signIn, signUp, uniqueEmail } from "./helpers";

test("logged-in user can like/unlike a post", async ({ page }) => {
  const email = uniqueEmail("like");
  const password = "password-123";

  await signUp(page, { displayName: "Like User", email, password });
  await signIn(page, email, password);

  await gotoFirstPostFromHome(page);

  await expect(page.getByText(/\d+\s+likes/)).toBeVisible();

  await page.getByRole("button", { name: "Like" }).click();
  await expect(page.getByRole("button", { name: "Unlike" })).toBeVisible();

  await page.getByRole("button", { name: "Unlike" }).click();
  await expect(page.getByRole("button", { name: "Like" })).toBeVisible();
});

test("logged-in user can add a comment and see it appear", async ({ page }) => {
  const email = uniqueEmail("comment");
  const password = "password-123";
  const commentText = `Hello from Playwright ${Date.now()}`;

  await signUp(page, { displayName: "Commenter", email, password });
  await signIn(page, email, password);

  await gotoFirstPostFromHome(page);

  await expect(page.getByRole("heading", { name: "Comments" })).toBeVisible();

  await page.getByPlaceholder("Write a comment…").fill(commentText);
  await page.getByRole("button", { name: "Post comment" }).click();

  await expect(page.getByText(commentText)).toBeVisible();
  await expect(page.getByText("Commenter")).toBeVisible();
});
