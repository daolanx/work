import { expect, test } from "@playwright/test";

test.describe("Navigation", () => {
	test("should navigate between pages", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveURL("/");

		await page.goto("/landing");
		await expect(page).toHaveURL("/landing");
	});
});

test.describe("Landing Page", () => {
	test("should load landing page successfully", async ({ page }) => {
		await page.goto("/landing");
		await expect(page.locator("body")).toBeVisible();
	});
});

test.describe("Profile Page", () => {
	test("should load profile page successfully", async ({ page }) => {
		await page.goto("/");
		await expect(page.locator("body")).toBeVisible();
	});
});
