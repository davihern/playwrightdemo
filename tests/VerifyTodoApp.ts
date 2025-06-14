import { test, expect } from '@playwright/test';

test.describe('Verify Todo WebApp', () => {

  test('verify todo app functionality', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    await page.locator('html').click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hello');
    await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
    await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.getByTestId('todo-title')).toBeVisible();
  });
  
});