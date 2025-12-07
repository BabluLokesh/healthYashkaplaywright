import { Page, Locator, expect } from '@playwright/test';

export default class LaboratoryPage {
  readonly page: Page;

  private laboratoryModuleLink: Locator;
  private sampleCollectionsTab: Locator;
  private fromDateInput: Locator;
  private okButton: Locator;
  private departmentDropdown: Locator;
  private filterMenuButton: Locator;
  private wardFilterInput: Locator;
  private tableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.laboratoryModuleLink = page.locator('a[href*="Laboratory"]'); // TODO
    this.sampleCollectionsTab = page.locator('text=Sample Collections'); // TODO
    this.fromDateInput = page.locator('#FromDate');                   // TODO
    this.okButton = page.locator('button:has-text("OK")');            // TODO
    this.departmentDropdown = page.locator('#Department');            // TODO
    this.filterMenuButton = page.locator('.fa-bars');                 // TODO
    this.wardFilterInput = page.locator('input[placeholder*="Ward"]');// TODO
    this.tableRows = page.locator('table tbody tr');                  // TODO
  }

  /**
   * TC10 – Verify Table Filtering for "Male Ward".
   */
  async verifyTableFiltering(date: string): Promise<void> {
    await this.laboratoryModuleLink.click();
    await this.sampleCollectionsTab.click();
    await this.fromDateInput.fill(date);
    await this.okButton.click();

    await this.departmentDropdown.selectOption({ label: 'Ward' }); // TODO
    await this.filterMenuButton.click();

    await this.wardFilterInput.fill('Male Ward');
    await this.wardFilterInput.press('Enter');

    const rowCount = await this.tableRows.count();
    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      await expect(this.tableRows.nth(i)).toContainText('Male Ward');
    }
  }
}
