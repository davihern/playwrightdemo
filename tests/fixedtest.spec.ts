
import { test, expect } from '@playwright/test';

test.describe('Movie Ratings Tests', () => {
       test.beforeEach(async ({ page }) => {
         // Navigate to the movies app before each test
         await page.goto('https://debs-obrien.github.io/playwright-movies-app');
         
         // Wait for the page to load
         await expect(page.locator('main')).toBeVisible();
      });

test('verify movie rating_MADEBYCOPILOT', async ({ page }) => {
  

  
  // Test parameters
  const movieTitle = 'Deadpool & Wolverine';
  const expectedRating = 5; // Expected rating in stars

  // Locate the movie container by title (adjust selector as needed)
  const movieContainer = page.locator(`li:has(h2:has-text("${movieTitle}"))`).first();

  // Make sure the movie is found
  await expect(movieContainer).toBeVisible();

  // Get all star elements
  const stars = movieContainer.locator('text=★');

  // Count total number of stars
  const starCount = await stars.count();

  // Verify the rating matches expected
  // ${movieTitle} should have ${expectedRating} stars rating
  expect(starCount).toBe(expectedRating);
});

});