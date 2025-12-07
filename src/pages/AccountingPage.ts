import { Page, Locator, expect } from '@playwright/test';

export default class AccountingPage {
  readonly page: Page;

  private accountingModuleLink: Locator;
  private settingsTab: Locator;
  private ledgerSearchInput: Locator;
  private activateButton: Locator;
  private deactivateButton: Locator;
  private confirmOkButton: Locator;
  private toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.accountingModuleLink = page.locator('a[href*="Accounting"]');     // TODO
    this.settingsTab = page.locator('text=Settings');                      // TODO
    this.ledgerSearchInput = page.locator('#txtLedgerSearch');             // TODO
    this.activateButton = page.locator('a:has-text("Activate")');          // TODO
    this.deactivateButton = page.locator('a:has-text("Deactivate")');      // TODO
    this.confirmOkButton = page.locator('button:has-text("Yes")');         // TODO
    this.toastMessage = page.locator('.toast-message');                    // TODO
  }

  /**
   * TC5 – Verify Activation of BNA A/C Ledger.
   */
  async verifyActivationLedger(ledgerName: string): Promise<void> {
    await this.accountingModuleLink.click();
    await this.settingsTab.click();
    await this.ledgerSearchInput.fill(ledgerName);
    await this.ledgerSearchInput.press('Enter');

    await this.activateButton.click();
    await this.confirmOkButton.click();
    await expect(this.toastMessage).toContainText('activated');
  }

  /**
   * TC6 – Verify Deactivation of BNA A/C Ledger.
   */
  async verifyDeactivationLedger(ledgerName: string): Promise<void> {
    await this.accountingModuleLink.click();
    await this.settingsTab.click();
    await this.ledgerSearchInput.fill(ledgerName);
    await this.ledgerSearchInput.press('Enter');

    await this.deactivateButton.click();
    await this.confirmOkButton.click();
    await expect(this.toastMessage).toContainText('deactivated');
  }
}
