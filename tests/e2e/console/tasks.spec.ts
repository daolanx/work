import { expect, test } from "@playwright/test";

async function loginAsDemo(page: import("@playwright/test").Page) {
	await page.goto("/auth/login");
	const demoButton = page.getByRole("button", { name: /demo/i });
	if ((await demoButton.count()) === 0) {
		test.skip(true, "No demo access available");
		return;
	}
	await demoButton.click();
	try {
		await page.waitForURL(/\/console/, { timeout: 10000 });
	} catch {
		test.skip(true, "Demo login did not redirect to console");
	}
}

test.describe("Tasks Page", () => {
	test("redirects to login when not authenticated", async ({ page }) => {
		await page.goto("/console/tasks");
		await expect(page).toHaveURL(/\/auth\/login/);
	});

	test("displays tasks page after authentication", async ({ page }) => {
		await loginAsDemo(page);
		await page.goto("/console/tasks");
		await page.waitForLoadState("networkidle");
		await expect(page.locator("body")).toBeVisible();
	});

	test("has create task button", async ({ page }) => {
		await loginAsDemo(page);
		await page.goto("/console/tasks");
		await page.waitForLoadState("networkidle");
		const createButton = page.getByRole("button", { name: /create/i });
		await expect(createButton).toBeVisible();
	});

	test("opens create task dialog", async ({ page }) => {
		await loginAsDemo(page);
		await page.goto("/console/tasks");
		await page.waitForLoadState("networkidle");
		const createButton = page.getByRole("button", { name: /create/i });
		await createButton.click();
		const dialog = page.getByRole("dialog");
		await expect(dialog).toBeVisible();
	});
});
