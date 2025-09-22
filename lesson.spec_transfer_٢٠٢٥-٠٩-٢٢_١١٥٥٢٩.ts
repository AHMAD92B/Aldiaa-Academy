import { test, expect } from '@playwright/test';

// E2E test: User starts course and completes first lesson quiz
test('start and complete lesson flow', async ({ page }) => {
  // Navigate to home page
  await page.goto('/');

  // Go to courses page
  await page.getByRole('link', { name: 'استعرض الدورات' }).click();

  // Click first course's start lesson link
  await page.getByRole('link', { name: /بدء الدرس الأول/ }).first().click();

  // Wait for lesson title to appear
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();

  // Select first radio option (index 0) -- may or may not be correct
  const radioButtons = page.locator('input[type="radio"]');
  await radioButtons.first().check();

  // Submit answer
  await page.getByRole('button', { name: 'إرسال الإجابة' }).click();

  // Expect feedback message to be visible
  await expect(
    page.locator('p').filter({ hasText: /إجابة/ }),
  ).toBeVisible();
});