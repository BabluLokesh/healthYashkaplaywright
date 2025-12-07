import { Page, Locator, expect } from '@playwright/test';

export default class DispensaryPage {
  readonly page: Page;

  private dispensaryModuleLink: Locator;
  private outPatientTab: Locator;
  private patientSearchInput: Locator;
  private patientCheckbox: Locator;
  private concludeButton: Locator;
  private confirmCheckoutButton: Locator;
  private successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dispensaryModuleLink = page.locator('a[href*="Dispensary"]'); // TODO
    this.outPatientTab = page.locator('text=OutPatient');             // TODO
    this.patientSearchInput = page.locator('#txtSearch');             // TODO
    this.patientCheckbox = page.locator('tbody tr:first-child input[type="checkbox"]'); // TODO
    this.concludeButton = page.locator('button:has-text("Conclude")'); // TODO
    this.confirmCheckoutButton = page.locator('button:has-text("Yes")'); // TODO
    this.successToast = page.locator('text=Checkout Successfully');   // TODO
  }

  /**
   * TC2 – Verify Outpatient Checkout Process.
   */
  async verifyAndReturnDispensaryToOtpText(patientName: string): Promise<void> {
    await this.dispensaryModuleLink.click();
    await this.outPatientTab.click();
    await this.patientSearchInput.fill(patientName);
    await this.patientSearchInput.press('Enter');

    await this.patientCheckbox.check();
    await this.concludeButton.click();
    await this.confirmCheckoutButton.click();

    await expect(this.successToast).toBeVisible();
  }
}
