import { Page, Locator, expect } from '@playwright/test';

export default class PharmacyPage {
  readonly page: Page;

  private pharmacyModuleLink: Locator;
  private orderSectionLink: Locator;
  private exportButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pharmacyModuleLink = page.locator('a[href*="Pharmacy"]');  // TODO
    this.orderSectionLink = page.locator('text=Order');            // TODO
    this.exportButton = page.locator('button:has-text("Export")'); // TODO
  }

  /**
   * TC11 – Verify Export Order Section Data.
   */
  async verifyExportOrderSectionData(): Promise<void> {
    await this.pharmacyModuleLink.click();
    await this.orderSectionLink.click();

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      this.exportButton.click()
    ]);

    const path = await download.path();
    expect(path).not.toBeNull();
  }
}
