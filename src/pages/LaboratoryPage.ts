import { Page, Locator } from '@playwright/test';

export default class LaboratoryPage {

  private page: Page;
  private laboratoryLink: Locator;
  private laboratoryDashboard: Locator;
  private sampleCollectionTab: Locator;
  private from_date: Locator;
  private ok_button: Locator;
  private col_requestingDept: Locator;
  private requestdept_hamburger: Locator;
  private select_dropdown: Locator;
  private start_with_option: Locator;
  private req_dept_search: Locator;

  constructor(page: Page) {
    this.page = page;
    this.laboratoryLink = page.locator('');
    this.laboratoryDashboard = page.locator('');
    this.sampleCollectionTab = page.locator('');
    this.from_date = page.locator('');
    this.ok_button = page.locator('');
    this.col_requestingDept = page.locator('');
    this.requestdept_hamburger = page.locator('');
    this.select_dropdown = page.locator('');
    this.start_with_option = page.locator('');
    this.req_dept_search = page.locator('');
  }

  /**
   * @Test9 Verify table filtering for "Male Ward"
   *
   * Steps:
   * 1. Navigate to https://healthapp.yaksha.com/Home/Index#/Lab/Dashboard
   * 2. Select the Sample Collections tab.
   * 3. Enter From Date as 01-01-2020 and click OK.
   * 4. Hover over the Requesting Department column and click Hamburger Menu.
   * 5. Select "Starts with" from the dropdown.
   * 6. Enter "Male Ward" in the text field.
   *
   * @returns {Promise<void>}
   */
  async verifyTableFiltering(): Promise<void> {
    try {
      // Step 1: Navigate to Laboratory Dashboard
      await this.page.goto('https://healthapp.yaksha.com/Home/Index#/Lab/Dashboard');

      // Step 2: Click on Sample Collection tab
      await this.sampleCollectionTab.click();

      // Step 3: Select From Date and click OK
      await this.from_date.fill('01-01-2020');
      await this.ok_button.click();

      // Step 4: Hover Requesting Dept column and click hamburger
      await this.col_requestingDept.hover();
      await this.requestdept_hamburger.click();

      // Step 5: Select "Starts with" option
      await this.select_dropdown.click();
      await this.start_with_option.click();

      // Step 6: Enter "Male Ward"
      await this.req_dept_search.fill('Male Ward');

    } catch (error) {
      console.error('Error while verifying table filtering for Male Ward:', error);
      throw error;
    }
  }
}
