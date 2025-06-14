import { test, expect } from '@playwright/test';

test.describe('Movie Ratings Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the movies app before each test
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Wait for the page to load
    await expect(page.locator('main')).toBeVisible();
  });

  test('verify Deadpool & Wolverine has 5 stars rating_MADEBYCOPILOT', async ({ page }) => {
    // Locate the Deadpool & Wolverine movie element
    const deadpoolMovie = page.locator('text=Deadpool & Wolverine').first();
    
    // Make sure the movie is found
    await expect(deadpoolMovie).toBeVisible();

    // Find the movie container
    const movieContainer = deadpoolMovie.locator('xpath=ancestor::li[contains(@class, "movie")]');
    
    // Count the stars (including the half-star) that are visible
    // First check the number of full stars
    const fullStars = await movieContainer.locator('text=★').count();
    
    // Check for half-star if present
    const halfStars = await movieContainer.locator('text=★ ★').count();
    
    // Calculate total rating (each full star = 1, half star = 0.5)
    const totalRating = fullStars - halfStars + (halfStars * 0.5);
    
    // Verify the rating is 5 stars
    expect(totalRating).toBe(0, 'Deadpool & Wolverine should have 5 stars rating');

    // Alternative verification: we can also check the star icons directly
    // There should be 5 star elements for a 5-star rating
    await expect(movieContainer.locator('generic:has-text("★")').first()).toBeVisible();
    await expect(movieContainer.locator('generic:has-text("★")').nth(1)).toBeVisible();
    await expect(movieContainer.locator('generic:has-text("★")').nth(2)).toBeVisible();
    await expect(movieContainer.locator('generic:has-text("★")').nth(3)).toBeVisible();
    await expect(movieContainer.locator('generic:has-text("★")').nth(4)).toBeVisible();
  });
  
  // This is a more general test that can be reused for any movie
  test('verify movie rating_MADEBYCOPILOT', async ({ page }) => {
    // Test parameters
    const movieTitle = 'Deadpool & Wolverine';
    const expectedRating = 5; // Expected rating in stars
    
    // Locate the movie by title
    const movie = page.locator(`heading:has-text("${movieTitle}")`).first();
    
    // Make sure the movie is found
    await expect(movie).toBeVisible();
    
    // Find the movie container
    const movieContainer = movie.locator('xpath=ancestor::li[contains(@class, "movie")]');
    
    // Get all star elements
    const stars = movieContainer.locator('generic:has-text("★")');
    
    // Count total number of stars
    const starCount = await stars.count();
    
    // Verify the rating matches expected
    expect(starCount).toBe(expectedRating, `${movieTitle} should have ${expectedRating} stars rating`);
  });
});