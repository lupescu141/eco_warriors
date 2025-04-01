import { test, expect } from "@playwright/test";

test("Login successfull, checks profile pic in nav and dropdown menu", async ({
  page,
}) => {
  await page.goto("http://127.0.0.1:5173/");

  await page.getByRole("navigation").locator("div").nth(2).hover();
  await expect(page.getByRole("button", { name: "Login" })).toBeVisible();

  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).click();
  await page.getByRole("textbox", { name: "Username" }).fill("Tester");
  await page.getByRole("textbox", { name: "Password" }).fill("Tester1!");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("img", { name: "Profile picture" })
  ).toBeVisible();

  await page.getByRole("navigation").locator("div").nth(2).hover();
  await expect(page.getByRole("button", { name: "My posts" })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Monthly Tasks" })
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
