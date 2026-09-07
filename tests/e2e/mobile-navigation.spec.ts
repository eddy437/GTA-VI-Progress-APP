import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('should show mobile menu button', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Menu button should be visible on mobile
    const menuButton = page.getByRole('button', { name: /menu/i });
    await expect(menuButton).toBeVisible();
  });

  test('should open sidebar drawer', async ({ page }) => {
    await page.goto('/dashboard');
    
    await page.getByRole('button', { name: /menu/i }).click();
    
    // Sidebar should be visible
    await expect(page.getByText('VICECOMPANION')).toBeVisible();
    await expect(page.getByText('Missions')).toBeVisible();
    await expect(page.getByText('Settings')).toBeVisible();
  });

  test('should show bottom navigation', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Bottom nav should be visible on mobile
    await expect(page.getByText('Home')).toBeVisible();
    await expect(page.getByText('Missions')).toBeVisible();
    await expect(page.getByText('Map')).toBeVisible();
  });
});