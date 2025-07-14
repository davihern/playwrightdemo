import { test, expect } from '@playwright/test';

test('test NEW', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('Hello this is a new item');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByTestId('todo-title')).toContainText('Hello this is a new item');
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeEmpty();
});

