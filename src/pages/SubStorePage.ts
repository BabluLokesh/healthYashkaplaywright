import { Page, Locator, expect } from '@playwright/test';

export default class SubStorePage {
  readonly page: Page;

  private subStoreModuleLink: Locator;
  private accountsButton: Locator;
  private inventoryRequisitionTab: Locator;
  private stockTab: Locator;
  private consumptionReportsTab: Locator;
  private patientConsumptionTab: Locator;
  private returnTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subStoreModuleLink = page.locator('a[href*="SubStore"]');           // TODO
    this.accountsButton = page.locator('text=Accounts');                     // TODO
    this.inventoryRequisitionTab = page.locator('text=Inventory Requisition'); // TODO
    this.stockTab = page.locator('text=Stock');                              // TODO
    this.consumptionReportsTab = page.locator('text=Consumption Reports');   // TODO
    this.patientConsumptionTab = page.locator('text=Patient Consumption');   // TODO
    this.returnTab = page.locator('text=Return');                            // TODO
  }

  /**
   * TC7 – Verify Submodules after clicking SubStore Module.
   */
  async verifySubModuleDisplayed(): Promise<void> {
    await this.subStoreModuleLink.click();
    await expect(this.accountsButton).toBeVisible();
    await expect(this.inventoryRequisitionTab).toBeVisible();
    await expect(this.stockTab).toBeVisible();
    await expect(this.consumptionReportsTab).toBeVisible();
    await expect(this.patientConsumptionTab).toBeVisible();
    await expect(this.returnTab).toBeVisible();
  }

  async verifyNavigationToSubStoreModule(): Promise<void> {
    await this.subStoreModuleLink.click();
    await expect(this.accountsButton).toBeVisible();
  }

  async navigateToAccounts(): Promise<void> {
    await this.accountsButton.click();
  }

  async verifyNavigationToInventoryRequisition(): Promise<void> {
    await this.inventoryRequisitionTab.click();
    await expect(this.page).toHaveURL(/.*InventoryRequisition.*/);
  }

  async verifyNavigationToConsumption(): Promise<void> {
    await this.consumptionReportsTab.click();
    await expect(this.page).toHaveURL(/.*ConsumptionReports.*/);
  }

  async verifyNavigationToPatientConsumption(): Promise<void> {
    await this.patientConsumptionTab.click();
    await expect(this.page).toHaveURL(/.*PatientConsumption.*/);
  }

  async verifyNavigationToReturn(): Promise<void> {
    await this.returnTab.click();
    await expect(this.page).toHaveURL(/.*Return.*/);
  }

  async verifyNavigationToStock(): Promise<void> {
    await this.stockTab.click();
    await expect(this.page).toHaveURL(/.*Stock.*/);
  }

  /**
   * TC15 – Capture Screenshot of Inventory Requisition Section.
   */
  async captureScreenshotInventoryRequisitionSection(path: string): Promise<void> {
    await this.verifyNavigationToInventoryRequisition();
    await this.page.screenshot({ path, fullPage: true });
  }
}
