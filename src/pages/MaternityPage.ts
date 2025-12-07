import { Page, Locator, expect } from '@playwright/test';

export default class MaternityPage {

  readonly page: Page;
  private maternity: Locator;
  private starIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.maternity = page.locator('');
    this.starIcon = page.locator('');
  }

  /**
   * @Test7 Verify File Upload for a Past Patient Record
   *
   * This method performs the interaction required to retrieve the tooltip text from the star icon.
   * It first waits for the page to fully load and clicks on the "maternity" section to ensure the relevant elements are visible.
   * Then it hovers over the star icon to trigger the tooltip and waits briefly to allow the tooltip to render.
   * Finally, it captures and returns the value of the 'title' attribute, which holds the tooltip text.
   *
   * @returns {Promise<string | null>} Returns the tooltip text or null if not found.
   */
  async getTooltipTextFromStar(): Promise<string | null> {
    try {
      // Wait for page to load
      await this.page.waitForLoadState('networkidle');

      // Click on maternity section
      await this.maternity.click();

      // Hover over the star icon to trigger tooltip
      await this.starIcon.hover();

      // Small wait to allow tooltip to appear
      await this.page.waitForTimeout(500);

      // Get tooltip text from title attribute
      const tooltipText = await this.starIcon.getAttribute('title');

      return tooltipText;
    } catch (error) {
      console.error('Error retrieving tooltip text from star icon:', error);
      return null;
    }
  }

}
