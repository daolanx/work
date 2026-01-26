import { test, expect } from '@playwright/test';

test.describe('profile page', () => {
  test('should load the profile page and display key elements', async ({
    page,
  }) => {
    // Start from the profile page
    await page.goto('/');
    await expect(page.locator('h1')).toContainText('Dax');
  });
});

test.describe('landing page', () => {
  test('should navigate to landing page from profile', async ({ page }) => {
    // Start from the profile page
    await page.goto('/landing');

    // Verify landing page content
    await expect(page.locator('h1.text-2xl')).toContainText('Midaland');
  });
});
