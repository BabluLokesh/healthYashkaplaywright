import { Page, Locator, expect } from '@playwright/test';

export default class MaternityPage {
  readonly page: Page;

  private maternityModuleLink: Locator;
  private starIcon: Locator;
  private tooltip: Locator;

  constructor(page: Page) {
    this.page = page;
    this.maternityModuleLink = page.locator('a[href*="Maternity"]'); // TODO
    this.starIcon = page.locator('i.fa-star');                       // TODO
    this.tooltip = page.locator('.tooltip-inner');                   // TODO
  }

  /**
   * TC8 – Verify tooltip for Star mark indicator.
   */
  async getTooltipTextFromStar(): Promise<string> {
    await this.maternityModuleLink.click();
    await this.starIcon.hover();
    await expect(this.tooltip).toBeVisible();
    const text = await this.tooltip.textContent();
    return text?.trim() ?? '';
  }
}
