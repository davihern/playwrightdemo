// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Description:
 * This exploratory test verifies navigation to https://www.microsoft.com.
 * It checks for a successful page load, validates the presence of the Microsoft logo,
 * and captures a screenshot and video for documentation and further analysis.
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation to Microsoft.com', () => {
  test('MICROSOFTCOM__NAVIGATE__SUCCESS', async ({ page }) => {
    // Start video recording (handled by Playwright config if enabled)
    await page.goto('https://www.microsoft.com');
    await expect(page).toHaveTitle(/Microsoft/i);

    const logo = page.locator('a[aria-label="Microsoft"]');
    await expect(logo).toBeVisible();

    // Capture screenshot after navigation and logo check
    await page.screenshot({ path: 'screenshots/microsoft-homepage.png', fullPage: true });
    // Video will be automatically saved if configured in playwright.config.ts
  });
});
