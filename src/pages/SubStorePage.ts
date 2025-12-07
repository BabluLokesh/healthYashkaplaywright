import { Page, Locator, expect } from '@playwright/test';

export default class SubStorePage {

  readonly page: Page;
  private subStoreLink: Locator;
  private wardSupply: Locator;
  private accounts: Locator;
  private pharmacy: Locator;
  private inventory: Locator;
  private inventoryRequisition: Locator;
  private consumption: Locator;
  private reports: Locator;
  private patientConsumption: Locator;
  private return: Locator;
  private stock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subStoreLink = page.locator('');
    this.wardSupply = page.locator('');
    this.accounts = page.locator('');
    this.pharmacy = page.locator('');
    this.inventory = page.locator('');
    this.inventoryRequisition = page.locator('');
    this.consumption = page.locator('');
    this.reports = page.locator('');
    this.patientConsumption = page.locator('');
    this.return = page.locator('');
    this.stock = page.locator('');
  }


  /**
   * @Test6 Verify all sub-modules are displayed correctly after clicking on the "Substore" module.
   *
   * @returns {Promise<void>} Returns void; logs error if any step fails.
   */
  async verifySubModulesDisplay(): Promise<void> {
    try {
      await this.subStoreLink.click();
      await this.page.waitForTimeout(2000);

      await this.wardSupply.click();
      await this.page.waitForTimeout(1000);

      await this.accounts.waitFor({ state: 'visible' });
      await this.accounts.click();

    } catch (error) {
      console.error('Error verifying Substore sub-modules display:', error);
      throw error;
    }
  }


  /**
   * @Test13 Verifies navigation between different tabs within the "Inventory" tab.
   */
  async verifyNavigationToSubstoreModule(): Promise<void> {
    try {
      await this.subStoreLink.click();
      await this.accounts.click();
      await this.inventory.click();

      await this.stock.click();
      await this.inventoryRequisition.click();
      await this.consumption.click();
      await this.reports.click();
      await this.patientConsumption.click();
      await this.return.click();

    } catch (error) {
      console.error('Error navigating inventory sub-tabs:', error);
      throw error;
    }
  }


  /**
   * @Test13 Navigate to the Accounts section.
   */
  async navigateToAccounts(): Promise<void> {
    try {
      await this.accounts.hover();
      await this.accounts.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Accounts section:', error);
      throw error;
    }
  }


  /**
   * @Test13 Verify navigation to the Stock section.
   */
  async verifyNavigationToStock(): Promise<void> {
    try {
      await this.stock.hover();
      await this.stock.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Stock section:', error);
      throw error;
    }
  }


  /**
   * @Test13 Verify navigation to the Inventory Requisition section.
   */
  async verifyNavigationToInventoryRequisition(): Promise<void> {
    try {
      await this.inventoryRequisition.hover();
      await this.inventoryRequisition.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Inventory Requisition:', error);
      throw error;
    }
  }


  /**
   * @Test13 Verify navigation to the Consumptions section.
   */
  async verifyNavigationToConsumptions(): Promise<void> {
    try {
      await this.consumption.hover();
      await this.consumption.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Consumptions:', error);
      throw error;
    }
  }

  /**
   * @Test13 Verify navigation to the Reports section.
   */
  async verifyNavigationToReports(): Promise<void> {
    try {
      await this.reports.hover();
      await this.reports.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Reports:', error);
      throw error;
    }
  }

  /**
   * @Test13 Verify navigation to the Patient Consumptions section.
   */
  async verifyNavigationToPatientConsumptions(): Promise<void> {
    try {
      await this.patientConsumption.hover();
      await this.patientConsumption.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Patient Consumptions:', error);
      throw error;
    }
  }

  /**
   * @Test Verify navigation to the Return section.
   */
  async verifyNavigationToReturn(): Promise<void> {
    try {
      await this.return.hover();
      await this.return.click();
      await this.page.waitForLoadState('networkidle');
      await this.page.waitForTimeout(1000);

    } catch (error) {
      console.error('Error navigating to Return section:', error);
      throw error;
    }
  }

  /**
   * @Test14 Captures a screenshot of the Inventory Requisition section within the Substore module.
   *
   * @returns {Promise<Buffer>} Screenshot buffer
   */
  async captureScreenshotOfInventoryRequisitionSection(): Promise<Buffer> {
    try {
      await this.subStoreLink.click();
      await this.accounts.click();
      await this.inventory.click();
      await this.inventoryRequisition.click();

      return await this.page.screenshot();

    } catch (error) {
      console.error('Error capturing Inventory Requisition screenshot:', error);
      throw error;
    }
  }

}
