// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Description:
 * This exploratory test suite comprehensively tests the Microsoft.com homepage.
 * It validates multiple features including:
 * - Page load and title verification
 * - Main navigation menu presence and functionality
 * - Search functionality
 * - Product sections visibility
 * - Footer links validation
 * - Responsive behavior checks
 * Screenshots and videos are captured for documentation and analysis.
 */

import { test, expect } from '@playwright/test';

test.describe('Microsoft.com Exploratory Testing', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigate to Microsoft homepage before each test
    await page.goto('https://www.microsoft.com');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test('MICROSOFTCOM__HOMEPAGE__TITLE_VERIFIED', async ({ page }) => {
    // Verify the page title contains "Microsoft"
    await expect(page).toHaveTitle(/Microsoft/i);
    
    // Capture screenshot for documentation
    await page.screenshot({ 
      path: 'screenshots/microsoft-homepage-title-verification.png', 
      fullPage: true 
    });
  });

  test('MICROSOFTCOM__LOGO__VISIBLE_AND_CLICKABLE', async ({ page }) => {
    // Verify Microsoft logo is present and visible
    const logo = page.locator('a[aria-label*="Microsoft"]').first();
    await expect(logo).toBeVisible();
    
    // Verify logo is clickable (has href attribute)
    await expect(logo).toHaveAttribute('href', /.+/);
    
    // Capture screenshot showing the logo
    await page.screenshot({ 
      path: 'screenshots/microsoft-logo-verification.png'
    });
  });

  test('MICROSOFTCOM__NAVIGATION_MENU__ITEMS_VISIBLE', async ({ page }) => {
    // Check for main navigation items
    // Microsoft.com typically has navigation items like Products, Store, Support, etc.
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
    
    // Take screenshot of navigation area
    await nav.screenshot({ 
      path: 'screenshots/microsoft-navigation-menu.png' 
    });
    
    // Verify navigation contains multiple links
    const navLinks = nav.locator('a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });

  test('MICROSOFTCOM__SEARCH_ICON__PRESENT_AND_INTERACTIVE', async ({ page }) => {
    // Look for search button/icon
    const searchButton = page.locator('[aria-label*="Search"]').first();
    
    // Verify search button is visible
    await expect(searchButton).toBeVisible({ timeout: 10000 });
    
    // Capture screenshot before interaction
    await page.screenshot({ 
      path: 'screenshots/microsoft-search-before-click.png' 
    });
    
    // Click search button
    await searchButton.click();
    
    // Wait a moment for search box to appear
    await page.waitForTimeout(1000);
    
    // Capture screenshot after clicking search
    await page.screenshot({ 
      path: 'screenshots/microsoft-search-after-click.png' 
    });
  });

  test('MICROSOFTCOM__MAIN_CONTENT__HERO_SECTION_VISIBLE', async ({ page }) => {
    // Verify main content/hero section is visible
    const mainContent = page.locator('main').first();
    await expect(mainContent).toBeVisible();
    
    // Take screenshot of the hero/main section
    await mainContent.screenshot({ 
      path: 'screenshots/microsoft-hero-section.png' 
    });
  });

  test('MICROSOFTCOM__FOOTER__LINKS_PRESENT', async ({ page }) => {
    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    
    // Verify footer exists
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
    
    // Verify footer has links
    const footerLinks = footer.locator('a');
    const footerLinkCount = await footerLinks.count();
    expect(footerLinkCount).toBeGreaterThan(0);
    
    // Capture screenshot of footer
    await footer.screenshot({ 
      path: 'screenshots/microsoft-footer.png' 
    });
  });

  test('MICROSOFTCOM__PAGE_STRUCTURE__SEMANTIC_HTML', async ({ page }) => {
    // Verify semantic HTML structure
    const header = page.locator('header');
    const main = page.locator('main');
    const footer = page.locator('footer');
    
    await expect(header).toHaveCount(1);
    await expect(main).toHaveCount(1);
    await expect(footer).toHaveCount(1);
    
    // Full page screenshot for structure analysis
    await page.screenshot({ 
      path: 'screenshots/microsoft-full-page-structure.png', 
      fullPage: true 
    });
  });

  test('MICROSOFTCOM__RESPONSIVE__MOBILE_VIEWPORT', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Reload page with mobile viewport
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Verify page is still accessible
    await expect(page).toHaveTitle(/Microsoft/i);
    
    // Check for mobile menu button (hamburger menu)
    const mobileMenuButton = page.locator('[aria-label*="menu"], [aria-label*="Menu"]').first();
    
    // Capture mobile view screenshot
    await page.screenshot({ 
      path: 'screenshots/microsoft-mobile-viewport.png', 
      fullPage: true 
    });
    
    // Verify mobile menu button is visible on mobile
    await expect(mobileMenuButton).toBeVisible({ timeout: 5000 });
  });
});
