import { expect, test } from "@playwright/test";

test.describe("profile page", () => {
	test("should display gallery title", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("h1")).toContainText("Dax");
	});
});

test.describe("landing page", () => {
	test("should display hero heading", async ({ page }) => {
		await page.goto("/landing");
		await expect(page.locator("h1")).toContainText(
			"Intuitive Landing Page Builder for",
		);
	});
});
