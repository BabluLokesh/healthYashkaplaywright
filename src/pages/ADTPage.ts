import { Page, Locator, expect } from '@playwright/test';

export default class ADTPage {
  readonly page: Page;

  private adtModuleLink: Locator;
  private admittedPatientsTab: Locator;
  private searchInput: Locator;
  private ellipsisButton: Locator;
  private changeDoctorOption: Locator;
  private updateButton: Locator;
  private errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.adtModuleLink = page.locator('a[href*="ADT"]');               // TODO
    this.admittedPatientsTab = page.locator('text=Admitted Patients'); // TODO
    this.searchInput = page.locator('#txtSearch');                     // TODO
    this.ellipsisButton = page.locator('button[aria-label="More"]');  // TODO
    this.changeDoctorOption = page.locator('text=Change Doctor');     // TODO
    this.updateButton = page.locator('button:has-text("Update")');    // TODO
    this.errorMessage = page.locator('text=Select doctor from the list'); // TODO
  }

  /**
   * TC16 – Verify field level error in Change Doctor popup.
   */
  async verifyInventorySubModuleNavigation(patientName: string): Promise<void> {
    await this.adtModuleLink.click();
    await this.admittedPatientsTab.click();

    await this.searchInput.fill(patientName);
    await this.searchInput.press('Enter');

    await this.ellipsisButton.click();
    await this.changeDoctorOption.click();
    await this.updateButton.click();

    await expect(this.errorMessage).toBeVisible();
  }
}
