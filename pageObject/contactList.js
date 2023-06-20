import { expect } from '@playwright/test';

class ContactList {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.getAddANewContactButton = page.locator('#add-contact');
    this.getFirstNameField = page.locator('#firstName');
    this.getLastNameField = page.locator('#lastName');
    this.getSubmitButton = page.getByRole('button', { name: 'Submit' });
    this.getCityField = page.locator('#city');
    this.getContactListTitle = page.locator('h1', { text: 'Contact List' });
    this.getTableRow = page.locator('.contactTableBodyRow');
  }

  async addANewContactOnlyWithRequiredFields(firstName, lastName) {
    await this.getAddANewContactButton.click();
    expect(this.getFirstNameField).toBeVisible();
    await this.getFirstNameField.fill(firstName);
    await this.getLastNameField.fill(lastName);
    await this.getCityField.focus();
    await this.getCityField.focus();
  }

  async clickOnSubmitButton() {
    await this.page.waitForTimeout(6000);
    await this.getSubmitButton.focus();
    await this.getSubmitButton.click('force');
  }

  async verifyIfContactIsAdded(firstName, lastName) {
   await this.page.waitForSelector('.contactTableBodyRow td:nth-child(2)', { state: 'visible' });
    const tableRowElements = await this.page.$$('.contactTableBodyRow td:nth-child(2)');
    let isNameFound = false;
    for (const rowElement of tableRowElements) {
      const textContent = await rowElement.innerText();
      if (textContent.includes(firstName) && textContent.includes(lastName)) {
        isNameFound = true;
        break;
      }
    }
    expect(isNameFound).toBeTruthy();
  }
}

module.exports = ContactList;
