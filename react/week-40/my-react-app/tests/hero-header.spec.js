// @ts-check
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Elektriker Jansson/);
});

test('get started link', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Lämna omdöme' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Tyck till!' })).toBeVisible();
});
