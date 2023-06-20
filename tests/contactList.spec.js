import { test } from '@playwright/test';
import { name } from 'faker';

import ContactList from '../pageObject/contactList';
import LoginPage from '../pageObject/login.page';

test.describe(() => {
    let loginPage;
    let contactList;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        contactList = new ContactList(page);
        await page.goto('https://thinking-tester-contact-list.herokuapp.com/');
    });

    test('Verify that a new contact can be added with only the required fields filled.', async ({ page }) => {
        await loginPage.performLogin('liubov_andriiuk@pecodesoftware.com', 'Szpkgb@wK9phCP');
        const firstName = name.firstName();
        const lastName = name.lastName();
        await contactList.addANewContactOnlyWithRequiredFields(firstName, lastName);
        await contactList.clickOnSubmitButton();
       await contactList.verifyIfContactIsAdded(firstName, lastName, page);
    });
});

