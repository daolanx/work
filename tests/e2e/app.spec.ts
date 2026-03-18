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

test.describe("Responsive Design", () => {
	test("should work on mobile viewport", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/landing");
		await expect(page).toHaveURL("/landing");
	});

	test("should work on desktop viewport", async ({ page }) => {
		await page.setViewportSize({ width: 1920, height: 1080 });
		await page.goto("/landing");
		await expect(page).toHaveURL("/landing");
	});
});

test.describe("Performance", () => {
	test("should load page within reasonable time", async ({ page }) => {
		const startTime = Date.now();
		await page.goto("/landing");
		const loadTime = Date.now() - startTime;

		expect(loadTime).toBeLessThan(10000);
	});
});
