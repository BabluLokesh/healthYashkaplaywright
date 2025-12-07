import { Page, Locator, expect } from '@playwright/test';

export default class DispensaryPage {
  readonly page: Page;

  private readonly dispensaryLink: Locator;
  private readonly mainDispensaryLink: Locator;
  private readonly dispensaryInfoIcon: Locator;
  private readonly dispensaryToolTip: Locator;

  constructor(page: Page) {
    this.page = page;
    // Example – define in constructor
    this.dispensaryLink = page.locator('a[href="#/Dispensary"]');
    this.mainDispensaryLink = page.locator('a.report_list', { hasText: 'Main Dispensary' });
    // page.locator('a:has(i:text("Main Dispensary"))').click();
    this.dispensaryInfoIcon = page.locator(".page-bar.fixed-top-bar").locator("i.fa-sign-out");
    this.dispensaryToolTip = page.locator(".modal-content");
  }

  /**
   * TC2 – Verify Outpatient Checkout Process.
   */
  async verifyAndReturnDispensaryToolTipText(): Promise<string> {
    // Expected tooltip message
    const expectedTooltipText =
      'You are currently in Main Dispensary dispensary. To change, you can always click here.';

    // STEP 1: Click on Dispensary link
    await this.dispensaryLink.click();
    await this.mainDispensaryLink.click();

    // STEP 2: Hover over right-pointing icon
    await this.dispensaryInfoIcon.hover();

    // STEP 3: Wait for tooltip to appear
    await this.dispensaryToolTip.waitFor({ state: 'visible' });

    // STEP 4: Capture tooltip text
    const actualTooltipText = (await this.dispensaryToolTip.innerText()).trim();

    // STEP 5: Verify tooltip text
    expect(actualTooltipText).toBe(expectedTooltipText);

    // STEP 6: Return actual tooltip text
    return actualTooltipText;
  }

}
