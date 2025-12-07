import { Page, Locator } from '@playwright/test';

export default class PharmacyPage {
  readonly page: Page;
  private pharmacy: Locator;
  private order: Locator;
  private export: Locator;
  downloadPath: string | undefined;

  constructor(page: Page) {
    this.page = page;
    this.pharmacy = page.locator('');
    this.order = page.locator('');
    this.export = page.locator('');
  }

  /**
   * This method verifies the functionality of exporting the order section data.
   * It first waits for a brief timeout to ensure that the page elements are fully loaded.
   * Then, it navigates through the pharmacy section and selects the order option once it’s visible.
   * After that, the method waits for the file download to begin by listening for the `download` event.
   * Once the export button is clicked, it waits for the download to complete and saves the file
   * path into the `downloadPath` variable for further use or validation.
   * This method helps in validating that the export functionality works as expected and
   * the file is successfully downloaded.
   */

  /**
   * @Test10 Verify to export the order section data
   *
   * Steps:
   * 1. Navigate to https://healthapp.yaksha.com/Home/Index#/Pharmacy/Dashboard
   * 2. Click on order section
   * 3. Click on "Export" button
   */
  async verifyExportOrderSectionData(): Promise<void> {
    try {
      // Step 1: Navigate to Pharmacy dashboard
      await this.page.goto('https://healthapp.yaksha.com/Home/Index#/Pharmacy/Dashboard');
      await this.page.waitForTimeout(2000);

      // Step 2: Click on order section
      await this.order.click();

      // Step 3: Click Export and capture download
      const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.export.click(),
      ]);

      const path = await download.path();
      this.downloadPath = path ?? undefined;
    } catch (error) {
      console.error('Error while verifying export of order section data:', error);
      throw error;
    }
  }
}
