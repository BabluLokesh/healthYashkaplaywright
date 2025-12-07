import { Page, Locator, expect } from '@playwright/test';

export default class SettingsPage {
  readonly page: Page;
  private settingsLink: Locator;
  private more: Locator;
  private priceCategory: Locator;
  private disable: Locator;
  public activate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.settingsLink = page.locator('');
    this.more = page.locator('');
    this.disable = page.locator('');
    this.activate = page.locator('');
    this.priceCategory = page.locator('');
  }

  /**
   * @Test12 This method automates the process of enable/disable price category
   * in "More" section of the Settings module.
   *
   * @description This function performs the following actions:
   * 1. Navigate to "Settings" module.
   * 2. Click on more... and select "Price Category" tab.
   * 3. Click on "Disable" button to disable any Code in the table.
   * 4. Verify a success message appears with the message "Deactivated.".
   * 5. Activate the same code by clicking "Activate" button and verify the success message.
   */
  async verifyDisablePriceCategory(): Promise<void> {
    try {
      // 1. Navigate to "Settings" module.
      await this.settingsLink.click();

      // 2. Click on more... and select "Price Category" tab.
      await this.more.click();
      await this.priceCategory.click();

      // 3. Click on "Disable" button to disable any Code in the table.
      await this.disable.click();

      // 4. Verify "Deactivated." success message.
      const deactivatedToast = this.page.getByText('Deactivated', { exact: false });
      await expect(deactivatedToast).toBeVisible();

      // 5. Activate the same code by clicking "Activate" button and verify success.
      await this.activate.click();
      const activatedToast = this.page.getByText('Activated', { exact: false });
      await expect(activatedToast).toBeVisible();
    } catch (error) {
      console.error('Error while verifying disable/enable price category:', error);
      throw error;
    }
  }

  /**
   * @Test12 Verify enabling the Price Category option.
   *
   * @returns {Promise<void>} - Returns void; waits for page load after interaction.
   *
   * Steps:
   * 1. Highlight the "Activate" button for visual confirmation.
   * 2. Click on the "Activate" button to enable the Price Category.
   * 3. Wait for the page to complete loading.
   * 4. Pause execution for 2 seconds to ensure the action is fully processed.
   */
  async verifyEnablePriceCategory(): Promise<void> {
    try {
      // 1. Highlight the "Activate" button for visual confirmation.
      await this.activate.hover();

      // 2. Click on the "Activate" button.
      await this.activate.click();

      // 3. Wait for page load after interaction.
      await this.page.waitForLoadState('networkidle');

      // 4. Pause 2 seconds to ensure everything is processed.
      await this.page.waitForTimeout(2000);
    } catch (error) {
      console.error('Error while verifying enable price category:', error);
      throw error;
    }
  }
}
