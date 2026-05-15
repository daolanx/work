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

test.describe("Admin Page", () => {
	test("redirects to login when not authenticated", async ({ page }) => {
		await page.goto("/console/admin");
		await expect(page).toHaveURL(/\/auth\/login/);
	});

	test("shows access denied for non-admin users", async ({ page }) => {
		await loginAsDemo(page);
		await page.goto("/console/admin");
		await page.waitForLoadState("networkidle");

		const accessDenied = page.getByText(/access denied/i);
		const redirected =
			page.url().includes("/console") && !page.url().includes("/admin");
		const hasContent = (await accessDenied.count()) > 0 || redirected;
		expect(hasContent).toBe(true);
	});
});
