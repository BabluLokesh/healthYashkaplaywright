import { Page, Locator, expect } from '@playwright/test';

export default class AccountingPage {
  readonly page: Page;

  public accounting: {
    accountingLink: Locator;
    reports: Locator;
    dailyTransaction: Locator;
    fiscalYear: Locator;
    load: Locator;
    settings: Locator;
    searchBar: Locator;
    activate: Locator;
    deactivate: Locator;
  };

  constructor(page: Page) {
    this.page = page;

    this.accounting = {
      accountingLink: page.locator(''),
      reports: page.locator(''),
      dailyTransaction: page.locator(''),
      fiscalYear: page.locator(''),
      load: page.locator(''),
      settings: page.locator(''),
      searchBar: page.locator(''),
      activate: page.locator(''),
      deactivate: page.locator(''),
    };
  }

  /**
 * @Test4 Verifies the activation process of the ledger by navigating to the accounting settings,
 * searching for a specific ledger, and activating it through a confirmation dialog.
 *
 * @param {Record<string, string>} data - Not used in this method but typically used to pass additional parameters if needed.
 * @returns {Promise<void>} - Returns void; logs error if any step fails.
 *
 * Steps:
 * 1. Navigate to the Accounting module.
 * 2. Go to Settings and search for the "BANK A/c #" ledger.
 * 3. Trigger the activation process, confirm the activation in the dialog, and finalize the action.
 */
  async verifyActivationLedger(): Promise<void> {
    try {
      // Step 1: Navigate to the Accounting module
      await this.accounting.accountingLink.click();

      // Step 2: Open Settings and search for the "BANK A/c #" ledger
      await this.accounting.settings.click();
      await this.accounting.searchBar.fill('BANK A/c #');
      await this.accounting.load.click(); // if there's a Load/Go button

      // Step 3: Trigger activation and confirm dialog
      const dialogPromise = this.page.waitForEvent('dialog');
      await this.accounting.activate.click();
      const dialog = await dialogPromise;
      await dialog.accept(); // confirm activation

    } catch (error) {
      console.error('Error while verifying activation of ledger:', error);
      throw error;
    }
  }

  /**
   * @Test5 Verifies the deactivation process of a ledger entry ("Sundry Debtors (Receivables)")
   * in the Accounting module settings.
   *
   * Steps:
   * 1. Navigates to the Accounting module and opens Settings.
   * 2. Searches for a specific ledger using the search bar.
   * 3. Handles the deactivation confirmation dialog.
   * 4. Clicks on the deactivate button to trigger the action.
   *
   * @returns {Promise<void>} - This method performs UI actions and does not return a value.
   */
  async verifyDeactivationLedger(): Promise<void> {
    try {
      // Step 1: Navigate to Accounting module and open Settings
      await this.accounting.accountingLink.click();
      await this.accounting.settings.click();

      // Step 2: Search for the specific ledger
      await this.accounting.searchBar.fill('Sundry Debtors (Receivables)');
      await this.accounting.load.click(); // if applicable

      // Steps 3 & 4: Click deactivate and handle confirmation dialog
      const dialogPromise = this.page.waitForEvent('dialog');
      await this.accounting.deactivate.click();
      const dialog = await dialogPromise;
      await dialog.accept(); // confirm deactivation

    } catch (error) {
      console.error('Error while verifying deactivation of ledger:', error);
      throw error;
    }
  }

}
