import { test } from '@playwright/test';
import LoginPage from '../../pageObject/login.page';
import { credentials } from '../../models/credentials';

test.describe(() => {
    //XXX test cases description is a name of automation test.
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/');
    });

    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.context().close();
    });

    test('Verify that a user can successfully log in with valid credentials', async ({ page }) => {
        await loginPage.performLogin(credentials.email, credentials.password);
        await loginPage.verifyIfUserIsLoggedIn();
    });

    test('Verify that a user cannot log in with invalid credentials.', async ({ page }) => {
        await loginPage.performLogin(credentials.email, 'test100500');
        await loginPage.verifyIfUserIsNotLoggedIn();
    });
});