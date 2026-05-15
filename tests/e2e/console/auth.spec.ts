import { expect, test } from "@playwright/test";

test.describe("Login Page", () => {
	test("displays login form", async ({ page }) => {
		await page.goto("/auth/login");
		await expect(page.locator("form")).toBeVisible();
		await expect(page.getByRole("textbox", { name: /email/i })).toBeVisible();
		await expect(
			page.getByRole("textbox", { name: /password/i }),
		).toBeVisible();
		await expect(page.getByRole("button", { name: /sign in/i })).toBeVisible();
	});

	test("shows validation error for invalid email", async ({ page }) => {
		await page.goto("/auth/login");
		await page.getByRole("textbox", { name: /email/i }).fill("not-an-email");
		await page.getByRole("textbox", { name: /password/i }).fill("password1");
		await page.getByRole("button", { name: /sign in/i }).click();
		await expect(page.getByText(/invalid email/i)).toBeVisible();
	});

	test("has demo access button", async ({ page }) => {
		await page.goto("/auth/login");
		const demoButton = page.getByRole("button", { name: /demo/i });
		const demoLink = page.getByRole("link", { name: /demo/i });
		const hasDemo =
			(await demoButton.count()) > 0 || (await demoLink.count()) > 0;
		expect(hasDemo).toBe(true);
	});
});

test.describe("Console Layout", () => {
	test("redirects unauthenticated user to login", async ({ page }) => {
		await page.goto("/console");
		await expect(page).toHaveURL(/\/auth\/login/);
	});
});
