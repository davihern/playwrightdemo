// EXPLORATORY TESTING CUSTOMIZED FOR DOTNET CONF 2025

/**
 * Description:
 * This exploratory test verifies the TodoMVC application functionality for adding multiple items.
 * It tests the ability to add multiple todo items and validates the counter shows the correct count.
 * The test also captures screenshots at key points for documentation purposes.
 * 
 * This test is part of the DOTNET CONF 2025 exploratory testing suite, focusing on
 * user workflows and edge cases in the TodoMVC application.
 */

import { test, expect } from '@playwright/test';

// Constants
const TODO_COUNT_SELECTOR = '.todo-count';

test.describe('TodoMVC Multiple Items Counter Verification', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to TodoMVC before each test
    await page.goto('https://demo.playwright.dev/todomvc/#/');
    
    // Wait for the page to be fully loaded
    await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeVisible();
  });

  test('TODOMVC__ADDMULTIPLE__VERIFYCOUNTER', async ({ page }) => {
    // Test data - multiple items to add
    const todoItems = [
      'Preparar presentación para DOTNET CONF 2025',
      'Revisar documentación de Playwright',
      'Escribir pruebas exploratorias'
    ];

    // Get the input field
    const todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });

    // Add multiple todo items
    for (const item of todoItems) {
      await todoInput.fill(item);
      await todoInput.press('Enter');
      
      // Verify the item was added
      await expect(page.getByTestId('todo-title').filter({ hasText: item })).toBeVisible();
    }

    // Capture screenshot after adding all items
    await page.screenshot({ 
      path: 'screenshots/todomvc-multiple-items-added.png', 
      fullPage: true 
    });

    // Verify the counter shows the correct number of items
    const todoCount = page.locator(TODO_COUNT_SELECTOR);
    const itemsText = todoItems.length === 1 ? 'item' : 'items';
    await expect(todoCount).toContainText(`${todoItems.length} ${itemsText} left`);

    // Verify all items are present in the list
    const todoTitles = page.getByTestId('todo-title');
    await expect(todoTitles).toHaveCount(todoItems.length);

    // Mark one item as completed
    const firstCheckbox = page.getByRole('checkbox', { name: 'Toggle Todo' }).first();
    await firstCheckbox.check();

    // Verify counter decreases
    const remainingItems = todoItems.length - 1;
    const remainingItemsText = remainingItems === 1 ? 'item' : 'items';
    await expect(todoCount).toContainText(`${remainingItems} ${remainingItemsText} left`);

    // Capture screenshot after marking one item as complete
    await page.screenshot({ 
      path: 'screenshots/todomvc-one-item-completed.png', 
      fullPage: true 
    });

    // Click on Active filter
    await page.getByRole('link', { name: 'Active' }).click();
    
    // Verify only active items are shown
    await expect(todoTitles).toHaveCount(todoItems.length - 1);

    // Click on Completed filter
    await page.getByRole('link', { name: 'Completed' }).click();
    
    // Verify only completed items are shown
    await expect(todoTitles).toHaveCount(1);

    // Capture final screenshot
    await page.screenshot({ 
      path: 'screenshots/todomvc-completed-filter.png', 
      fullPage: true 
    });
  });

  test('TODOMVC__ADDEMPTY__VERIFYNOADDITION', async ({ page }) => {
    // Attempt to add an empty todo item
    const todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });
    
    // Press Enter without typing anything
    await todoInput.press('Enter');

    // Verify no items were added
    const todoTitles = page.getByTestId('todo-title');
    await expect(todoTitles).toHaveCount(0);

    // Verify counter is not displayed (no items)
    const todoCount = page.locator(TODO_COUNT_SELECTOR);
    await expect(todoCount).not.toBeVisible();

    // Capture screenshot showing no items added
    await page.screenshot({ 
      path: 'screenshots/todomvc-empty-input-validation.png', 
      fullPage: true 
    });
  });

  test('TODOMVC__CLEARALLCOMPLETED__VERIFYREMOVAL', async ({ page }) => {
    // Add some test items
    const todoItems = [
      'Item 1 for DOTNET CONF',
      'Item 2 for DOTNET CONF'
    ];

    const todoInput = page.getByRole('textbox', { name: 'What needs to be done?' });

    // Add items
    for (const item of todoItems) {
      await todoInput.fill(item);
      await todoInput.press('Enter');
    }

    // Mark all items as completed
    const checkboxes = page.getByRole('checkbox', { name: 'Toggle Todo' });
    const count = await checkboxes.count();
    
    for (let i = 0; i < count; i++) {
      await checkboxes.nth(i).check();
    }

    // Verify "Clear completed" button appears
    const clearButton = page.getByRole('button', { name: 'Clear completed' });
    await expect(clearButton).toBeVisible();

    // Capture screenshot before clearing
    await page.screenshot({ 
      path: 'screenshots/todomvc-before-clear-completed.png', 
      fullPage: true 
    });

    // Click clear completed
    await clearButton.click();

    // Verify all items are removed
    const todoTitles = page.getByTestId('todo-title');
    await expect(todoTitles).toHaveCount(0);

    // Verify counter is not visible
    const todoCount = page.locator(TODO_COUNT_SELECTOR);
    await expect(todoCount).not.toBeVisible();

    // Capture screenshot after clearing
    await page.screenshot({ 
      path: 'screenshots/todomvc-after-clear-completed.png', 
      fullPage: true 
    });
  });
});
