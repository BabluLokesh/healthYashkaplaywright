import { Page, Locator, expect } from '@playwright/test';

export default class SettingsPage {
  readonly page: Page;

  private settingsModuleLink: Locator;
  private priceCategoryTab: Locator;
  private codeSearchInput: Locator;
  private disableButton: Locator;
  private enableButton: Locator;
  private toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsModuleLink = page.locator('a[href*="Settings"]');    // TODO
    this.priceCategoryTab = page.locator('text=Price Category');     // TODO
    this.codeSearchInput = page.locator('#Code');                     // TODO
    this.disableButton = page.locator('a:has-text("Disable")');       // TODO
    this.enableButton = page.locator('a:has-text("Activate")');       // TODO
    this.toastMessage = page.locator('.toast-message');               // TODO
  }

  /**
   * TC13 – Verify Disable Price Category.
   */
  async verifyDisablePriceCategory(code: string): Promise<void> {
    await this.settingsModuleLink.click();
    await this.priceCategoryTab.click();
    await this.codeSearchInput.fill(code);
    await this.codeSearchInput.press('Enter');

    await this.disableButton.click();
    await expect(this.toastMessage).toContainText('Deactivated');
  }

  /**
   * TC13 – Verify Enable Price Category.
   */
  async verifyEnablePriceCategory(code: string): Promise<void> {
    await this.settingsModuleLink.click();
    await this.priceCategoryTab.click();
    await this.codeSearchInput.fill(code);
    await this.codeSearchInput.press('Enter');

    await this.enableButton.click();
    await expect(this.toastMessage).toContainText('Activated');
  }
}
