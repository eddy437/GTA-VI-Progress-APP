import { test, expect } from '@playwright/test';

test.describe('Demo Dashboard', () => {
  test.beforeEach(async ({ page }) => {
    // Set demo mode
    await page.addInitScript(() => {
      window.localStorage.setItem('demo-mode', 'true');
    });
    
    await page.goto('/dashboard');
  });

  test('should display user information', async ({ page }) => {
    await expect(page.getByText('Welcome back,')).toBeVisible();
    await expect(page.getByText('ViceLegend')).toBeVisible();
  });

  test('should display progress cards', async ({ page }) => {
    await expect(page.getByText('Your Progress')).toBeVisible();
    await expect(page.getByText('Achievements')).toBeVisible();
    await expect(page.getByText('Rewards')).toBeVisible();
  });

  test('should display mission summary', async ({ page }) => {
    await expect(page.getByText('Missions')).toBeVisible();
    await expect(page.getByText('View All')).toBeVisible();
  });

  test('should display garage', async ({ page }) => {
    await expect(page.getByText('Garage')).toBeVisible();
  });
});