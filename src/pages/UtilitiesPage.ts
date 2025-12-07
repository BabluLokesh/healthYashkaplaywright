import { Page, Locator, expect } from '@playwright/test';

export default class UtilitiesPage {
  readonly page: Page;

  private utilitiesModuleLink: Locator;
  private schemeRulesTab: Locator;
  private saveButton: Locator;
  private warningPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.utilitiesModuleLink = page.locator('a[href*="Utilities"]');   // TODO
    this.schemeRulesTab = page.locator('text=Scheme Rules');          // TODO
    this.saveButton = page.locator('button:has-text("Save")');        // TODO
    this.warningPopup = page.locator('text=Please fill the mandatory fields'); // TODO
  }

  /**
   * TC12 – Verify Warning Message for Mandatory Fields.
   */
  async verifyWarningPopupMandatoryFields(): Promise<void> {
    await this.utilitiesModuleLink.click();
    await this.schemeRulesTab.click();
    await this.saveButton.click();
    await expect(this.warningPopup).toBeVisible();
  }
}
