const { test, expect } = require('@playwright/test');
const LoginPage = require('../pageObject/login.page');

test.describe(() => {
    //XXX test cases description is a name of automation test.
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    });
    
    test.afterEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.context().close();
    });

    test('Verify that a user can successfully log in with valid credentials', async ({ page }) => {
        await loginPage.performLogin('liubov_andriiuk@pecodesoftware.com', 'Szpkgb@wK9phCP');
        await loginPage.verifyIfUserIsLoggedIn();
    });

    test('Verify that a user cannot log in with invalid credentials.', async ({ page }) => {
        await loginPage.performLogin('liubov_andriiuk@pecodesoftware.com', 'test100500');
    });
});