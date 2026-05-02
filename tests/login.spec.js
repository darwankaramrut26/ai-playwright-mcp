import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('OrangeHRM Login Tests', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
  });

  test('Should login successfully with valid credentials', async ({ page }) => {
    // Step 1: Navigate to the login page
    await loginPage.navigateToLoginPage();

    // Step 2: Enter the username and password
    await loginPage.enterUsername('Admin');
    await loginPage.enterPassword('admin123');

    // Step 3: Click the login button
    await loginPage.clickLoginButton();

    // Wait for navigation to complete - verify successful login by URL
    await page.waitForURL(/dashboard/, { timeout: 10000 });
    expect(page.url()).toContain('dashboard');
  });
});

