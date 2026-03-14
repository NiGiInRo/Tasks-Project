import { expect, test } from '@playwright/test';

test('creates a task and shows it in the list', async ({ page }) => {
  const suffix = Date.now();
  const title = `Playwright task ${suffix}`;
  const description = `E2E validation ${suffix}`;

  await page.goto('/');

  await page.getByTestId('task-title-input').fill(title);
  await page.getByTestId('task-description-input').fill(description);
  await page.getByTestId('task-submit-button').click();

  const createdTask = page.getByTestId('task-item').filter({ hasText: title }).first();
  await expect(createdTask).toBeVisible();
  await expect(createdTask).toContainText(description);
});
