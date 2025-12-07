import { Page, Locator, expect,  } from '@playwright/test';

export default class NursingPage {
  readonly page: Page;
  private nursing_tab: Locator;
  private past_days: Locator;
  private from_date: Locator;
  private ok_button: Locator;
  private search_field: Locator;
  private overview_button: Locator;
  private upload_button: Locator;
  private dept_dropdown: Locator;
  private upload_file: Locator;
  private submit_button: Locator;
  private checkbox: Locator;
  private conclude: Locator;
  private saveButton: Locator;
  downloadPath: string | undefined;

  

  constructor(page: Page) {
    this.page = page;

    this.nursing_tab = page.locator('');
    this.past_days = page.locator('');
    this.from_date = page.locator('');
    this.ok_button = page.locator('');
    this.search_field = page.locator('');
    this.overview_button = page.locator('');
    this.upload_button = page.locator('');
    this.dept_dropdown = page.locator('');
    this.upload_file = page.locator('');
    this.submit_button = page.locator('');
    this.checkbox = page.locator('');
    this.conclude = page.locator('');
    this.saveButton = page.locator('');
  }

  /** 
   * TC3 – Verify Navigation to Patient Overview from Past Days Records.
   */
  async verifyPatientOverviewFromPastDaysRecords(): Promise<void> {
    try {
      // Step 1: Navigate to Nursing → OutPatient
      await this.page.goto('https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient');

      // Step 2: Click on Past Days tab
      await this.past_days.click();

      // Step 3: Select From Date and click OK
      await this.from_date.fill('01/05/2020');
      await this.ok_button.click();

      // Step 4: Search for patient name
      await this.search_field.fill('Deepika Rani');

      // Step 5: Click Overview from Actions column
      await this.overview_button.click();

    } catch (error) {
      console.error('Error while verifying Patient Overview from Past Days Records:', error);
      throw error;
    }
  }

  /**
   * TC4 – Verify File Upload for a Past Patient Record.
   */
  async verifyfileupload(): Promise<void> {
    try {
      // Step 1: Navigate to Nursing → OutPatient
      await this.page.goto('https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient');

      // Step 2: Click on Past Days tab
      await this.past_days.click();

      // Step 3: Select From Date and click OK
      await this.from_date.fill('01-01-2020');
      await this.ok_button.click();

      // Step 4: Search for patient
      await this.search_field.fill('Deepika Rani');

      // Step 5: Click Upload files from Actions
      await this.upload_button.click();

      // Step 6: Verify Upload Files modal opens
      await expect(this.upload_file).toBeVisible();

      // Step 7: Select Department
      await this.dept_dropdown.selectOption('Pathology');

      // Step 8: Upload image file
      await this.upload_file.setInputFiles('path/to/image.png');

      // Step 9: Submit upload
      await this.submit_button.click();

    } catch (error) {
      console.error('Error while verifying file upload for past patient record:', error);
      throw error;
    }
  }

}
