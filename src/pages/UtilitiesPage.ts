import { Page, Locator } from '@playwright/test';

export default class UtilitiesPage {

  readonly page: Page;

  public utilities: {
    utilitiesModule: Locator;
    ChangeBillingCounter: Locator;
    counters: Locator;
    counterItem: Locator;
    schemeRefund: Locator;
    newSchemeRefundEntry: Locator;
    saveButton: Locator;
    warningPopup: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.utilities = {
      utilitiesModule: page.locator(''),
      ChangeBillingCounter: page.locator(''),
      counters: page.locator(''),
      counterItem: page.locator(''),
      schemeRefund: page.locator('').nth(1),
      newSchemeRefundEntry: page.locator(''),
      saveButton: page.locator(''),
      warningPopup: page.locator(''),
    };
  }

  /**
   * This method verifies that the appropriate warning popup is displayed
   * when attempting to save a "Scheme Refund Entry" without filling in
   * the mandatory fields.
   *
   * It navigates to the Utilities module, selects the "Scheme Refund"
   * section, clicks on a counter item, and proceeds to the
   * "New Scheme Refund Entry" form. Without entering any data,
   * it clicks the save button to trigger and validate the warning popup.
   */

  /**
   * @Test11 Verify Warning Popup for Mandatory Fields in Scheme Refund
   *
   * Steps:
   * 1. Navigate to Utilities module and select "Scheme Refund" tab.
   * 2. If required, select any counter value and then select "Scheme Refund" tab.
   * 3. Click on "New Scheme Refund Entry" button.
   * 4. Click on save without entering value in any field.
   *
   * @returns {Promise<void>}
   */
  async verifyWarningPopupForMandatoryFields(): Promise<void> {
    try {
      // Step 1: Navigate to Utilities → Scheme Refund
      await this.utilities.utilitiesModule.click();
      await this.utilities.schemeRefund.click();

      // Step 2: Select counter if required
      await this.utilities.counters.click();
      await this.utilities.counterItem.click();

      // Step 3: Click on New Scheme Refund Entry
      await this.utilities.newSchemeRefundEntry.click();

      // Step 4: Click Save without entering any value
      await this.utilities.saveButton.click();

      // Verify warning popup is displayed
      await this.utilities.warningPopup.waitFor({ state: 'visible' });

    } catch (error) {
      console.error(
        'Error while verifying warning popup for mandatory fields in Scheme Refund:',
        error
      );
      throw error;
    }
  }
}
