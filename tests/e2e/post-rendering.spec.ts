import { expect, test } from "@playwright/test";

import { gotoFirstPostFromHome } from "./helpers";

test("can view a post and see code highlighting container rendered", async ({ page }) => {
  await gotoFirstPostFromHome(page);

  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  // rehype-pretty-code wraps fences in a figure with this data attr.
  const codeFigure = page.locator(".mdx figure[data-rehype-pretty-code-figure]").first();
  await expect(codeFigure).toBeVisible();

  // Ensure the code block is actually present.
  await expect(codeFigure.locator("pre")).toBeVisible();
});
