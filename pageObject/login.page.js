import { expect } from '@playwright/test';

class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */

    constructor(page) {
        this.page = page;
        this.getEmailField = page.locator('#email');
        this.getPasswordField = page.locator('#password');
        this.getSubmitButton = page.locator('#submit', { hasText: 'Submit' });
        this.getLogoutButton = page.locator('#logout', { hasText: 'Logout' })
        this.getTitleText = page.locator();
        this.getErrorMessage = page.locator('#error')
    }

    async performLogin(email, password) {
        await this.getEmailField.fill(email);
        await this.getPasswordField.fill(password);
        await this.getSubmitButton.click();
    }

    async verifyIfUserIsLoggedIn() {
        await expect(await this.getLogoutButton).toBeVisible();
        // expect(page).toHaveURL('/contactList');
    }

    async verifyIfUserIsNotLoggedIn() {
        await expect(this.getErrorMessage).toHaveText('Incorrect username or password');
    }
}
module.exports = LoginPage;
