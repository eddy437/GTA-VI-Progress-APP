import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('should load landing page successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading
    await expect(page.getByText('VICECOMPANION')).toBeVisible();
    
    // Check tagline
    await expect(page.getByText('Your game. Your progress. Your next move.')).toBeVisible();
    
    // Check CTAs
    await expect(page.getByRole('link', { name: 'Enter Dashboard' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Features' })).toBeVisible();
  });

  test('should navigate to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Enter Dashboard' }).click();
    
    // Should redirect to login if not authenticated
    await expect(page).toHaveURL(/login/);
  });

  test('should have footer disclaimer', async ({ page }) => {
    await page.goto('/');
    
    const disclaimer = page.getByText('independent third-party gaming companion');
    await expect(disclaimer).toBeVisible();
  });
});