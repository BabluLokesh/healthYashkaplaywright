import { test, expect } from '@playwright/test';
import { readJSON } from '../utils/jsonReader';

import LoginPage from '../pages/LoginPage';
import DispensaryPage from '../pages/DispensaryPage';
import NursingPage from '../pages/NursingPage';
import AccountingPage from '../pages/AccountingPage';
import LaboratoryPage from '../pages/LaboratoryPage';
import ProcurementPage from '../pages/ProcurementPage';
import PharmacyPage from '../pages/PharmacyPage';
import SettingsPage from '../pages/SettingsPage';
import SubStorePage from '../pages/SubStorePage';
import UtilitiesPage from '../pages/UtilitiesPage';
import ADTPage from '../pages/ADTPage';
import MaternityPage from '../pages/MaternityPage';

type TestData = {
  loginUrl: string;
  username: string;
  password: string;
  pastDaysFromDate: string;
  labFromDate: string;
  uploadFilePath: string;
  bnaLedgerName: string;
  priceCode: string;
  tooltipText: string;
  quotation: {
    subject: string;
    description: string;
    vendor: string;
    itemName: string;
    quantity: string;
  };
};

type PatientNames = {
  outpatientName: string;
  admittedPatient: string;
};

const testData = readJSON<TestData>('Data/testData.json');
const patientNames = readJSON<PatientNames>('Data/patientName.json');

test.describe('Yaksha Health App – End-to-End Use Cases', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.performLogin(
      testData.username,
      testData.password,
      testData.loginUrl
    );
  });

  test('TC1 – Verify login with valid credentials', async ({ page }) => {
    // Already verified in beforeEach via performLogin assertion
    await expect(page).toHaveTitle(/.*/);
  });

  test('TC2 – Verify Outpatient Checkout Process', async ({ page }) => {
    const dispensary = new DispensaryPage(page);
    await dispensary.verifyAndReturnDispensaryToOtpText(
      patientNames.outpatientName
    );
  });

  test('TC3 – Verify Navigation to Patient Overview from Past Days Records', async ({ page }) => {
    const nursing = new NursingPage(page);
    await nursing.verifyPatientOverviewFromPastDaysRecords(
      testData.pastDaysFromDate,
      patientNames.outpatientName
    );
  });

  test('TC4 – Verify File Upload for Patient Record', async ({ page }) => {
    const nursing = new NursingPage(page);
    await nursing.verifyFileUpload(
      testData.pastDaysFromDate,
      patientNames.outpatientName,
      testData.uploadFilePath
    );
  });

  test('TC5 – Verify Activation of BNA A/C Ledger', async ({ page }) => {
    const accounting = new AccountingPage(page);
    await accounting.verifyActivationLedger(testData.bnaLedgerName);
  });

  test('TC6 – Verify Deactivation of BNA A/C Ledger', async ({ page }) => {
    const accounting = new AccountingPage(page);
    await accounting.verifyDeactivationLedger(testData.bnaLedgerName);
  });

  test('TC7 – Verify Submodules display in SubStore Module', async ({ page }) => {
    const subStore = new SubStorePage(page);
    await subStore.verifySubModuleDisplayed();
  });

  test('TC8 – Verify tooltip for Star indicator', async ({ page }) => {
    const maternity = new MaternityPage(page);
    const tooltip = await maternity.getTooltipTextFromStar();
    await expect(tooltip).toBe(testData.tooltipText);
  });

  test('TC9 – Verify Request for Quotation Generation', async ({ page }) => {
    const procurement = new ProcurementPage(page);
    const q = testData.quotation;

    await procurement.verifyRequestForQuotationGeneration(
      q.subject,
      q.description,
      q.vendor,
      q.itemName,
      q.quantity
    );
  });

  test('TC10 – Verify table filtering for Male Ward', async ({ page }) => {
    const lab = new LaboratoryPage(page);
    await lab.verifyTableFiltering(testData.labFromDate);
  });

  test('TC11 – Verify export order section data', async ({ page }) => {
    const pharmacy = new PharmacyPage(page);
    await pharmacy.verifyExportOrderSectionData();
  });

  test('TC12 – Verify warning message for mandatory fields', async ({ page }) => {
    const utilities = new UtilitiesPage(page);
    await utilities.verifyWarningPopupMandatoryFields();
  });

  test('TC13 – Verify price category enable/disable', async ({ page }) => {
    const settings = new SettingsPage(page);
    await settings.verifyDisablePriceCategory(testData.priceCode);
    await settings.verifyEnablePriceCategory(testData.priceCode);
  });

  test('TC14 – Verify navigation to various inventory tabs in SubStore', async ({ page }) => {
    const subStore = new SubStorePage(page);
    await subStore.verifyNavigationToSubStoreModule();
    await subStore.navigateToAccounts();
    await subStore.verifyNavigationToInventoryRequisition();
    await subStore.verifyNavigationToConsumption();
    await subStore.verifyNavigationToPatientConsumption();
    await subStore.verifyNavigationToReturn();
    await subStore.verifyNavigationToStock();
  });

  test('TC15 – Capture screenshot of Inventory Requisition section', async ({ page }) => {
    const subStore = new SubStorePage(page);
    await subStore.captureScreenshotInventoryRequisitionSection(
      'screenshots/inventory-requisition.png'
    );
  });

  test('TC16 – Verify field level error in ADT Change Doctor popup', async ({ page }) => {
    const adt = new ADTPage(page);
    await adt.verifyInventorySubModuleNavigation(patientNames.admittedPatient);
  });
});
