import { Page, Locator, expect } from '@playwright/test';

export default class ProcurementPage {
  readonly page: Page;

  private procurementModuleLink: Locator;
  private quotationTab: Locator;
  private requestForQuotationButton: Locator;
  private subjectInput: Locator;
  private descriptionTextArea: Locator;
  private vendorDropdown: Locator;
  private itemNameInput: Locator;
  private quantityInput: Locator;
  private requestButton: Locator;
  private successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.procurementModuleLink = page.locator('a[href*="Procurement"]');       // TODO
    this.quotationTab = page.locator('text=Quotation');                        // TODO
    this.requestForQuotationButton = page.locator('text=Request For Quotation'); // TODO
    this.subjectInput = page.locator('#Subject');                              // TODO
    this.descriptionTextArea = page.locator('#Description');                   // TODO
    this.vendorDropdown = page.locator('#Vendor');                             // TODO
    this.itemNameInput = page.locator('#ItemName');                            // TODO
    this.quantityInput = page.locator('#Quantity');                            // TODO
    this.requestButton = page.locator('button:has-text("Request")');           // TODO
    this.successToast = page.locator('text=Request for Quotation is Generated and Saved'); // TODO
  }

  /**
   * TC9 – Verify Request for Quotation Generation.
   */
  async verifyRequestForQuotationGeneration(
    subject: string,
    description: string,
    vendor: string,
    itemName: string,
    quantity: string
  ): Promise<void> {
    await this.procurementModuleLink.click();
    await this.quotationTab.click();
    await this.requestForQuotationButton.click();

    await this.subjectInput.fill(subject);
    await this.descriptionTextArea.fill(description);
    await this.vendorDropdown.selectOption({ label: vendor });
    await this.itemNameInput.fill(itemName);
    await this.quantityInput.fill(quantity);
    await this.requestButton.click();

    await expect(this.successToast).toBeVisible();
  }
}
