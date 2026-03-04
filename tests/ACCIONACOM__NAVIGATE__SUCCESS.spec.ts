// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Description:
 * This exploratory test verifies navigation to https://www.acciona.com.
 * It checks for a successful page load, validates the presence of the ACCIONA brand,
 * confirms key navigation sections are visible, and captures screenshots and videos
 * for documentation and further analysis.
 */

import { test, expect } from '@playwright/test';

test.describe('Navigation to Acciona.com', () => {

  test('ACCIONACOM__NAVIGATE__SUCCESS', async ({ page }) => {
    await page.goto('https://www.acciona.com');
    await expect(page).toHaveTitle(/ACCIONA/i);

    // Capture screenshot after page load
    await page.screenshot({ path: 'screenshots/acciona-homepage.png', fullPage: true });
  });

  test('ACCIONACOM__LOGO__VISIBLE', async ({ page }) => {
    await page.goto('https://www.acciona.com');

    // Verify the ACCIONA logo or brand link is visible in the header
    const logo = page.locator('a[aria-label*="ACCIONA"], a[title*="ACCIONA"], header img[alt*="ACCIONA"], img[alt*="acciona"]').first();
    await expect(logo).toBeVisible();

    await page.screenshot({ path: 'screenshots/acciona-logo.png' });
  });

  test('ACCIONACOM__NAVIGATION__SECTIONS_VISIBLE', async ({ page }) => {
    await page.goto('https://www.acciona.com');

    // Verify main navigation sections are present
    const nav = page.locator('nav, [role="navigation"]').first();
    await expect(nav).toBeVisible();

    await page.screenshot({ path: 'screenshots/acciona-navigation.png' });
  });

  test('ACCIONACOM__SUSTAINABILITY__NAVIGATE', async ({ page }) => {
    await page.goto('https://www.acciona.com');

    // Verify the Sustainability section link is accessible
    const sustainabilityLink = page.getByRole('link', { name: /sustainability/i }).first();
    await expect(sustainabilityLink).toBeVisible();

    await sustainabilityLink.click();
    await expect(page).toHaveURL(/sustainability/i);

    await page.screenshot({ path: 'screenshots/acciona-sustainability.png', fullPage: true });
  });

});
