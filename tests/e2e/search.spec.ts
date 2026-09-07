import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test('should open search command', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Press Ctrl+K to open search
    await page.keyboard.press('Control+K');
    
    // Check if search input is visible
    await expect(page.getByPlaceholder('Search missions, collectibles, vehicles...')).toBeVisible();
  });

  test('should close search with Escape', async ({ page }) => {
    await page.goto('/dashboard');
    
    await page.keyboard.press('Control+K');
    await expect(page.getByPlaceholder('Search missions, collectibles, vehicles...')).toBeVisible();
    
    await page.keyboard.press('Escape');
    await expect(page.getByPlaceholder('Search missions, collectibles, vehicles...')).not.toBeVisible();
  });
});