import { test } from '@playwright/test';
import { name } from 'faker';

import ContactList from '../../pageObject/contactList';
import LoginPage from '../../pageObject/login.page';
import { credentials } from '../../models/credentials';

test.describe(() => {
    let loginPage;
    let contactList;
    const firstName = name.firstName();
    const lastName = name.lastName();

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        contactList = new ContactList(page);
        await page.goto('/');
    });

    test('Verify that a new contact can be added with only the required fields filled.', async ({ page }) => {
        await loginPage.performLogin(credentials.email, credentials.password);
        await contactList.addANewContactOnlyWithRequiredFields(firstName, lastName);
        await contactList.clickOnSubmitButton();
        await contactList.verifyIfContactIsAdded(firstName, lastName, page);
    });
});

