import { Page, Locator, expect } from '@playwright/test';

export default class MaternityPage {

  readonly page: Page;
  private maternity: Locator;
  private starIcon: Locator;
  private tooltip: Locator;

  constructor(page: Page) {
    this.page = page;
    this.maternity = page.locator('//span[normalize-space()="Maternity"]');
    this.starIcon = page.locator('i[title="Remember this Date"]');
    this.tooltip = page.locator('.tooltip-inner');
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

  await this.maternity.waitFor({ state: 'visible', timeout: 15000 });
    await this.maternity.scrollIntoViewIfNeeded();
    await this.maternity.click();
    await this.starIcon.hover();


  //   // Small wait to allow tooltip to appear
    await this.page.waitForTimeout(500);

  // Get tooltip text from title attribute
  const tooltipText = await this.starIcon.getAttribute('title');

   return tooltipText;
  } catch (error: any) {
    console.error('Error retrieving tooltip text from star icon:', error);
    return null;
  }


 }
}
