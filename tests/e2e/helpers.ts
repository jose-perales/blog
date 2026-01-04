import type { Page } from "@playwright/test";

export type SignupUser = {
  displayName: string;
  email: string;
  password: string;
};

export function uniqueEmail(prefix = "e2e"): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}@example.com`;
}

export async function signUp(page: Page, user: SignupUser) {
  await page.goto("/auth/sign-up");
  await page.getByLabel("Display name").fill(user.displayName);
  await page.getByLabel("Email").fill(user.email);
  await page.getByLabel("Password").fill(user.password);
  await page.getByRole("button", { name: "Create account" }).click();
}

export async function signIn(page: Page, email: string, password: string) {
  await page.goto("/auth/sign-in");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Sign in" }).click();

  // Wait for successful redirect to home (session takes a moment)
  await page.waitForURL("**/*", { waitUntil: "networkidle", timeout: 15000 });
}

export async function gotoFirstPostFromHome(page: Page) {
  await page.goto("/");
  const postsHeading = page.getByRole("heading", { name: "Posts", exact: true });
  await postsHeading.waitFor();

  const firstPostLink = page.locator("main a[href^='/posts/']").first();
  await firstPostLink.click();
}
