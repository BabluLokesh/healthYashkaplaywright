import { Page, Locator } from '@playwright/test';

export default class ProcurementPage {

  readonly page: Page;
  private procurement: Locator;
  private quotations: Locator;
  private requestForQuotation: Locator;
  private subject: Locator;
  private description: Locator;
  private selectVendor: Locator;
  private dropdownOption: Locator;
  private itemName: Locator;
  private itemValue: Locator;
  private dropdownArrowButton: Locator;
  private quantity: Locator;
  private requestButton: Locator;
  private quotationGeneratedPopup: Locator;
  quotationMessageText: string | null = null;

  constructor(page: Page) {
    this.page = page;
    this.procurement = page.locator('');
    this.quotations = page.locator('');
    this.requestForQuotation = page.locator('');
    this.subject = page.locator('');
    this.description = page.locator('');
    this.selectVendor = page.locator('');
    this.dropdownOption = page.locator('');
    this.itemName = page.locator('');
    this.itemValue = page.locator('');
    this.dropdownArrowButton = page.locator('');
    this.quantity = page.locator('');
    this.requestButton = page.locator('');
    this.quotationGeneratedPopup = page.locator('');
  }

  /**
   * @Test8 Verify Request for Quotation Generation
   *
   * This method verifies the process of generating a Request For Quotation (RFQ) in the Procurement section.
   *
   * It starts by navigating to the Procurement section and selecting the Quotation option,
   * followed by clicking on "Request for Quotation". The method then fills in the subject and description fields,
   * selects a vendor from the dropdown, and ensures the dropdown is visible and clicked.
   * Next, it waits for the item name and quantity to be visible, then fills in the item details (name and quantity).
   * After that, it clicks the "Request" button to submit the quotation request.
   * The method waits for the "Request For Quotation is Generated and Saved" popup to appear and retrieves its text content.
   * The text content of the popup is then stored in the `quotationMessageText` class property for further validation or assertion.
   * The method includes necessary waits to ensure that elements are visible and ready before interaction,
   * helping ensure that the process completes smoothly.
   *
   * @param {Record<string, string>} data - Not used in this method but typically used to pass additional parameters if needed.
   * @returns {Promise<void>} - Returns void; logs error if any step fails.
   */
  async verifyRequestForQuotationGeneration(data?: Record<string, string>): Promise<void> {
    try {
      // Navigate to Procurement → Quotations
      await this.procurement.click();
      await this.quotations.click();

      // Open "Request for Quotation"
      await this.requestForQuotation.click();

      // Fill subject and description
      await this.subject.fill('Test RFQ Subject');
      await this.description.fill('Test RFQ Description');

      // Select vendor from dropdown
      await this.selectVendor.click();
      await this.dropdownOption.waitFor({ state: 'visible' });
      await this.dropdownOption.click();

      // Fill item details (name, value, quantity)
      await this.itemName.waitFor({ state: 'visible' });
      await this.itemName.fill('Test Item');
      await this.itemValue.fill('1');
      await this.quantity.fill('10');

      // (Optional) interact with dropdown arrow if needed
      // await this.dropdownArrowButton.click();

      // Click on Request button to generate RFQ
      await this.requestButton.click();

      // Wait for popup and capture its text
      await this.quotationGeneratedPopup.waitFor({ state: 'visible' });
      this.quotationMessageText = await this.quotationGeneratedPopup.textContent();

    } catch (error) {
      console.error('Error during Request for Quotation generation:', error);
      throw error;
    }
  }
}
