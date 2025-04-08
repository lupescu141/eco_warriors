import { test, expect } from "@playwright/test";

test("Links for post work", async ({ page }) => {
  await page.goto("http://127.0.0.1:5173/");

  // navigates to Posts
  await page.getByRole("link", { name: "Posts" }).click();
  // expect page to have headin Posts
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();

  // Checks that Posts creator and title match when navigating to single post
  await expect(page.getByRole("heading")).toHaveText("Posted by: Ella92");
  await expect(page.getByRole("heading")).toHaveText("Composting at home");
  await page.getByRole("heading", { name: "Composting at home" }).click();

  await page
    .getByRole("main")
    .locator("div")
    .filter({
      hasText:
        "Posted by: Ella925.3.2025Composting at homeTips and tricks for composting in",
    })
    .getByRole("link")
    .click();

  await page
    .locator("div")
    .filter({ hasText: /^PostsComposting at home$/ })
    .locator("h2")
    .click();
  await page
    .getByRole("heading", { name: "Composting at home" })
    .nth(1)
    .click();
});
