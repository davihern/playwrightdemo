import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('http://localhost:4200/');
  await expect(page.locator('app-root')).toContainText('Hi! Ciao! Salut! Hoi! Here you get the message from Java:');
});

