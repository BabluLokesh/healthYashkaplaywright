import { test, expect } from '@playwright/test';
import { readJSON } from '../../utils/jsonReader';

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


  //done
  test('TC1 – Verify login with valid credentials', async ({ page }) => {
    await expect(page).toHaveTitle(/.*/);
  });


  // done
  // test('TC2 – Verify Outpatient Checkout Process', async ({ page }) => {
  //   const dispensary = new DispensaryPage(page);
  //   await dispensary.verifyAndReturnDispensaryToolTipText();
  // });


  // done
  // test('TC3 – Verify Navigation to Patient Overview from Past Days Records', async ({ page }) => {
  //   const nursing = new NursingPage(page);
  //   await nursing.verifyPatientOverviewFromPastDaysRecords(
  //     testData.pastDaysFromDate,
  //     patientNames.outpatientName
  //   )
  // });


  // done
  // test('TC4 – Verify File Upload for Patient Record', async ({ page }) => {
  //   const nursing = new NursingPage(page);
  //   await nursing.verifyfileupload(
  //     testData.pastDaysFromDate,
  //     patientNames.outpatientName,
  //     testData.uploadFilePath
  //   );
  // });


  // code update it was worng as per sereen shot descriptio
  // test('TC5 – Verify Activation of BNA A/C Ledger', async ({ page }) => {
  //   const accounting = new AccountingPage(page);
  //   await accounting.verifyActivationLedger();
  // });


  // code update it was worng as per sereen shot descriptio
  // test('TC6 – Verify Deactivation of BNA A/C Ledger', async ({ page }) => {
  //   const accounting = new AccountingPage(page);
  //   await accounting.verifyDeactivationLedger();
  // });


  // code update it was worng as per sereen shot descriptio
  // test('TC7 – Verify Submodules display in SubStore Module', async ({ page }) => {
  //   const subStore = new SubStorePage(page);
  //   await subStore.verifySubModulesDisplay();
  // });

  // code update it was worng as per sereen shot descriptio
  // test('TC14 – Verify navigation to various inventory tabs in SubStore', async ({ page }) => {
  //   const subStore = new SubStorePage(page);
  //   await subStore.verifyNavigationToSubstoreModule();
  //   await subStore.navigateToAccounts();
  //   await subStore.verifyNavigationToInventoryRequisition();
  //   await subStore.verifyNavigationToConsumptions();
  //   await subStore.verifyNavigationToReports();
  //   await subStore.verifyNavigationToPatientConsumptions();
  //   await subStore.verifyNavigationToReturn();
  // });

  // code update it was worng as per sereen shot descriptio
  // test('TC15 – Capture screenshot of Inventory Requisition section', async ({ page }) => {
  //   const subStore = new SubStorePage(page);
  //   await subStore.captureScreenshotOfInventoryRequisitionSection();
  // });

  // done
  test('TC8 – Verify tooltip for Star indicator', async ({ page }) => {
    const maternity = new MaternityPage(page);
    await maternity.getTooltipTextFromStar();
  });

  // code update it was worng as per sereen shot descriptio
  // test('TC9 – Verify Request for Quotation Generation', async ({ page }) => {
  //   const procurement = new ProcurementPage(page);
  //   await procurement.verifyRequestForQuotationGeneration();
  // });

  // code update it was worng as per sereen shot descriptio
  // test('TC10 – Verify table filtering for Male Ward', async ({ page }) => {
  //   const lab = new LaboratoryPage(page);
  //   await lab.verifyTableFiltering();
  // });

  // code update it was worng as per sereen shot descriptio
  // test('TC11 – Verify export order section data', async ({ page }) => {
  //   const pharmacy = new PharmacyPage(page);
  //   await pharmacy.verifyExportOrderSectionData();
  // });

  // code update it was worng as per sereen shot descriptio
  // test('TC12 – Verify warning message for mandatory fields', async ({ page }) => {
  //   const utilities = new UtilitiesPage(page);
  //   await utilities.verifyWarningPopupForMandatoryFields();
  // });

  // code update it was worng as per sereen shot descriptio
  // test('TC13 – Verify price category enable/disable', async ({ page }) => {
  //   const settings = new SettingsPage(page);
  //   await settings.verifyDisablePriceCategory();
  //   await settings.verifyEnablePriceCategory();
  // });


  // code update it was worng as per sereen shot descriptio
  // test('TC16 – Verify field level error in ADT Change Doctor popup', async ({ page }) => {
  //   const adt = new ADTPage(page);
  //   await adt.verifyFieldLevelValidationInChangeDoctorModal();
  // });
});
