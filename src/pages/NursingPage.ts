import { Page, Locator, expect, } from '@playwright/test';

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
  private fileUploadToast: Locator;
  downloadPath: string | undefined;



  constructor(page: Page) {
    this.page = page;

    this.nursing_tab = page.locator('a[class="left-nav-active"] span[class="title"]');
    this.past_days = page.locator('//a[normalize-space()="Past Days"]');
    this.from_date = page.locator('(//input[@type="date"])[1]');
    this.ok_button = page.locator('//button[normalize-space()="OK"]');
    this.search_field = page.locator('#quickFilterInput');
    this.overview_button = page.locator('(//i[@title="overview"])[1]');
    this.upload_button = page.locator('(//i[@title="upload files"])[1]');
    this.dept_dropdown = this.page.locator('select[formcontrolname="FileType"]');
    this.upload_file = page.locator('//input[@type="file"]');
    this.submit_button = page.locator('input[value="Submit"]');
    this.fileUploadToast = page.locator('#patient-upload-files');
    this.checkbox = page.locator('');
    this.conclude = page.locator('');
    this.saveButton = page.locator('');
  }

  /** 
   * TC3 – Verify Navigation to Patient Overview from Past Days Records.
   */
  async verifyPatientOverviewFromPastDaysRecords(date: string, patientName: string,): Promise<void> {
    try {
      // Step 1: Navigate to Nursing → OutPatient
      await this.page.goto('https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient');

      // Step 2: Click on Past Days tab
      await this.past_days.click();

      // Step 3: Select From Date and click OK
      await this.from_date.fill(date);
      await this.ok_button.click();

      // Step 4: Search for patient name
      await this.search_field.fill(patientName);

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
  async verifyfileupload(date: string, patientName: string, filePath: string): Promise<void> {
    try {
      // Step 1: Navigate to Nursing → OutPatient
      await this.page.goto('https://healthapp.yaksha.com/Home/Index#/Nursing/OutPatient');

      // Step 2: Click on Past Days tab
      await this.past_days.click();

      // Step 3: Select From Date and click OK
      await this.from_date.fill(date);
      await this.ok_button.click();

      // Step 4: Search for patient
      await this.search_field.fill(patientName)
      await this.page.waitForTimeout(3000);
      await this.search_field.press('Enter');
      // Step 5: Click Upload files from Actions
      await this.upload_button.click();

      // Step 6: Verify Upload Files modal opens
      await expect(this.upload_file).toBeVisible();

      // Step 7: Select Department
      await this.dept_dropdown.selectOption('Pathology');

      // Step 8: Upload image file
      //await this.upload_file.setInputFiles(filePath);
      await this.upload_file.setInputFiles(filePath, { timeout: 5000 });


      // Step 9: Submit upload
      await this.submit_button.click();

      // Step 10: Verify success toast message
      //await expect(this.fileUploadToast).toBeVisible();
      await this.page.waitForSelector('#patient-upload-files', {
        state: 'detached',
        timeout: 15000
      });




    } catch (error) {
      console.error('Error while verifying file upload for past patient record:', error);
      throw error;
    }
  }

}
