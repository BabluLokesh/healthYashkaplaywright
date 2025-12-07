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
      accountingLink: page.locator('a[href="#/Accounting"]'),
      reports: page.locator(''),
      dailyTransaction: page.locator(''),
      fiscalYear: page.locator(''),
      load: page.locator('.ag-center-cols-container .ag-row'),
      settings: page.locator('.page-breadcrumb a[href="#/Accounting/Settings"]'),
      searchBar: page.locator('#quickFilterInput'),
      activate: page.getByText('Activate'),
      deactivate: page.getByText('Deactivate'),
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

      await this.accounting.accountingLink.click();
      await this.page.waitForLoadState('networkidle');
      await this.accounting.settings.click();
      await this.accounting.searchBar.waitFor({ state: 'visible' });
      await this.accounting.searchBar.fill('BANK A/c #');
      await this.accounting.searchBar.press('Enter');
      const activateButton = this.accounting.activate;
      await activateButton.waitFor({ state: 'visible' });
      await activateButton.click();

      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });

      expect(this.page.locator('.main-message', { hasText: 'BANK A/C # is now Aactivated.' }));

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
      await this.page.waitForLoadState('networkidle');

      await this.accounting.settings.click();

      // Step 2: Search for the specific ledger
      await this.accounting.searchBar.waitFor({ state: 'visible' });
      await this.accounting.searchBar.fill('Sundry Debtors (Receivables)');
      await this.accounting.searchBar.press('Enter');

      const deactivateButton = this.accounting.deactivate;
      await deactivateButton.waitFor({ state: 'visible' });
      deactivateButton.click();

      this.page.once('dialog', async dialog => {
        await dialog.accept();
      });

      expect(this.page.locator('.main-message', { hasText: 'BANK A/C # is now Deactivated.' }));

    } catch (error) {
      console.error('Error while verifying deactivation of ledger:', error);
      throw error;
    }
  }

}
