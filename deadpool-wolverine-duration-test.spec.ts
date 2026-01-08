import { test, expect } from '@playwright/test';

test('should verify Deadpool & Wolverine movie duration in Action genre', async ({ page }) => {
  // Navigate to the movie app
  await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  
  // Wait for the page to load and verify we're on the Popular section
  await expect(page).toHaveTitle(/Popular Movies/);
  
  // Open the navigation menu
  await page.getByRole('menu').click();
  
  // Navigate to Action movies
  await page.getByRole('link', { name: 'Action' }).click();
  
  // Wait for Action movies page to load
  await expect(page).toHaveTitle(/Action Movies/);
  await expect(page.locator('h1')).toContainText('Action');
  
  // Find and click on Deadpool & Wolverine movie
  await page.getByRole('link', { name: /Deadpool & Wolverine/ }).first().click();
  
  // Wait for movie details page to load
  await expect(page).toHaveTitle(/Deadpool & Wolverine/);
  await expect(page.locator('h1')).toContainText('Deadpool & Wolverine');
  
  // Verify the movie duration is exactly 128 min
  const durationText = await page.locator('text=/128 min/').textContent();
  expect(durationText).toContain('128 min');
  
  // Additional verification - check that Hugh Jackman (Wolverine) is in the cast
  await expect(page.getByRole('link', { name: /Hugh Jackman/ })).toBeVisible();
  
  // Verify this is an Action movie
  await expect(page.getByRole('link', { name: 'Action' })).toBeVisible();
  
  console.log('✅ Test completed successfully:');
  console.log('- Navigated to the movie app');
  console.log('- Accessed Action movies section');
  console.log('- Found Deadpool & Wolverine movie');
  console.log('- Verified movie duration is 128 minutes');
  console.log('- Confirmed Hugh Jackman (Wolverine) is in the cast');
});