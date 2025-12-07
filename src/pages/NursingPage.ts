import { Page, Locator, expect } from '@playwright/test';

export default class NursingPage {
  readonly page: Page;

  private nursingModuleLink: Locator;
  private pastDaysTab: Locator;
  private fromDateInput: Locator;
  private okButton: Locator;
  private patientSearchInput: Locator;
  private overviewButton: Locator;

  private uploadFilesLink: Locator;
  private departmentDropdown: Locator;
  private fileInput: Locator;
  private submitButton: Locator;
  private fileUploadToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nursingModuleLink = page.locator('a[href*="Nursing"]');           // TODO
    this.pastDaysTab = page.locator('text=Past Days');                     // TODO
    this.fromDateInput = page.locator('#FromDate');                        // TODO
    this.okButton = page.locator('button:has-text("OK")');                 // TODO
    this.patientSearchInput = page.locator('#txtSearch');                  // TODO
    this.overviewButton = page.locator('a:has-text("Overview")');          // TODO

    this.uploadFilesLink = page.locator('a:has-text("Upload Files")');     // TODO
    this.departmentDropdown = page.locator('#DepartmentId');               // TODO
    this.fileInput = page.locator('input[type="file"]');                   // TODO
    this.submitButton = page.locator('button:has-text("Submit")');         // TODO
    this.fileUploadToast = page.locator('text=File Uploaded');             // TODO
  }

  /**
   * TC3 – Verify Navigation to Patient Overview from Past Days Records.
   */
  async verifyPatientOverviewFromPastDaysRecords(date: string, patientName: string): Promise<void> {
    await this.nursingModuleLink.click();
    await this.pastDaysTab.click();
    await this.fromDateInput.fill(date);
    await this.okButton.click();

    await this.patientSearchInput.fill(patientName);
    await this.patientSearchInput.press('Enter');

    await this.overviewButton.click();
    await expect(this.page).toHaveURL(/.*PatientOverview.*/);
  }

  /**
   * TC4 – Verify File Upload for a Past Patient Record.
   */
  async verifyFileUpload(date: string, patientName: string, filePath: string): Promise<void> {
    await this.nursingModuleLink.click();
    await this.pastDaysTab.click();
    await this.fromDateInput.fill(date);
    await this.okButton.click();

    await this.patientSearchInput.fill(patientName);
    await this.patientSearchInput.press('Enter');

    await this.uploadFilesLink.click();
    await this.departmentDropdown.selectOption({ index: 1 }); // TODO set correct option
    await this.fileInput.setInputFiles(filePath);
    await this.submitButton.click();
    await expect(this.fileUploadToast).toBeVisible();
  }
}
