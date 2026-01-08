import { test, expect } from '@playwright/test';

test.describe('Movie App Exploratory Testing', () => {
  test('should complete exploratory testing workflow: navigate to Action movies and verify Wolverine movie duration', async ({ page }) => {
    // Step 1: Navigate to the movie app
    await test.step('Navigate to the movie app', async () => {
      await page.goto('https://debs-obrien.github.io/playwright-movies-app');
      
      // Verify we're on the correct page
      await expect(page).toHaveTitle(/Popular Movies/);
      await expect(page.locator('h1')).toContainText('Popular');
      
      // Verify the app has loaded by checking for movie elements
      await expect(page.locator('list[aria-label="movies"]')).toBeVisible();
    });

    // Step 2: Open navigation and go to Action movies
    await test.step('Navigate to Action movies section', async () => {
      // Open the navigation menu by clicking the menu button
      await page.getByRole('menu').click();
      
      // Verify navigation menu is open and shows genres
      await expect(page.getByRole('heading', { name: 'Genres' })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Action' })).toBeVisible();
      
      // Click on Action genre
      await page.getByRole('link', { name: 'Action' }).click();
      
      // Verify we're now on the Action movies page
      await expect(page).toHaveTitle(/Action Movies/);
      await expect(page.locator('h1')).toContainText('Action');
    });

    // Step 3: Find and verify Deadpool & Wolverine movie
    await test.step('Find movie with Wolverine character', async () => {
      // Look for Deadpool & Wolverine movie in the Action section
      const wolverineMovie = page.getByRole('link', { name: /Deadpool & Wolverine/ }).first();
      await expect(wolverineMovie).toBeVisible();
      
      // Take a screenshot for documentation
      await page.screenshot({ path: 'screenshots/action-movies-page.png', fullPage: true });
      
      // Click on the movie to view details
      await wolverineMovie.click();
    });

    // Step 4: Verify movie details and duration
    await test.step('Verify movie duration is 128 minutes', async () => {
      // Wait for movie details page to load
      await expect(page).toHaveTitle(/Deadpool & Wolverine/);
      await expect(page.locator('h1')).toContainText('Deadpool & Wolverine');
      
      // Verify the duration is exactly 128 min
      const durationElement = page.locator('text=/128 min/');
      await expect(durationElement).toBeVisible();
      
      // Get the exact text to verify it matches our expectation
      const durationText = await durationElement.textContent();
      expect(durationText).toContain('128 min');
      
      // Take a screenshot of the movie details page
      await page.screenshot({ path: 'screenshots/deadpool-wolverine-details.png', fullPage: true });
    });

    // Step 5: Additional verifications
    await test.step('Perform additional verifications', async () => {
      // Verify Hugh Jackman (Wolverine actor) is in the cast
      await expect(page.getByRole('link', { name: /Hugh Jackman/ })).toBeVisible();
      
      // Verify Ryan Reynolds (Deadpool) is also in the cast
      await expect(page.getByRole('link', { name: /Ryan Reynolds/ })).toBeVisible();
      
      // Verify it's categorized as an Action movie
      await expect(page.getByRole('link', { name: 'Action' })).toBeVisible();
      
      // Verify the movie year is 2024
      await expect(page.locator('text=/2024/')).toBeVisible();
      
      // Verify the language is English
      await expect(page.locator('text=/English/')).toBeVisible();
      
      // Check the movie rating exists
      await expect(page.locator('text=/7.7/')).toBeVisible();
    });

    // Log completion
    console.log('🎬 Exploratory Testing Summary:');
    console.log('✅ Successfully navigated to movie app');
    console.log('✅ Opened navigation menu');
    console.log('✅ Accessed Action movies genre');
    console.log('✅ Found Deadpool & Wolverine (movie with Wolverine character)');
    console.log('✅ Verified movie duration: 128 minutes');
    console.log('✅ Confirmed cast includes Hugh Jackman (Wolverine)');
    console.log('✅ Verified additional movie details');
  });

  test('should verify navigation menu functionality', async ({ page }) => {
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Test navigation menu opens and closes
    await page.getByRole('menu').click();
    await expect(page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Genres' })).toBeVisible();
    
    // Verify all expected genre links are present
    const expectedGenres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Science Fiction', 'Thriller'];
    
    for (const genre of expectedGenres) {
      await expect(page.getByRole('link', { name: genre })).toBeVisible();
    }
  });

  test('should verify movie search functionality', async ({ page }) => {
    await page.goto('https://debs-obrien.github.io/playwright-movies-app');
    
    // Test search functionality
    const searchInput = page.getByPlaceholder('Search for a movie...');
    await expect(searchInput).toBeVisible();
    
    // Try searching for Deadpool
    await searchInput.fill('Deadpool');
    await page.keyboard.press('Enter');
    
    // Note: This test would need to be completed based on actual search behavior
    // The current implementation is just showing how to access the search feature
  });
});