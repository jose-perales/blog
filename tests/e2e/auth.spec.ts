import { expect, test } from "@playwright/test";

import { signIn, signUp, uniqueEmail } from "./helpers";

test("can sign up and sign in with credentials", async ({ page }) => {
  const email = uniqueEmail("signup");
  const password = "password-123";

  await signUp(page, {
    displayName: "E2E User",
    email,
    password,
  });

  await expect(page.getByRole("heading", { name: "Sign in" })).toBeVisible();
  await expect(page.getByText("Account created. Please sign in.")).toBeVisible();

  await signIn(page, email, password);

  await expect(page.getByRole("link", { name: "Career Blog" })).toBeVisible();
  await expect(page.getByText(/Signed in as/i)).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
