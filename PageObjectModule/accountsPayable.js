const { expect } = require('@playwright/test');
const { time } = require('console');
const { snapshot } = require('node:test');

class AccountsPayable {
  constructor(page) {
    this.page = page;

    // Main navigation
    this.application = '//a[normalize-space()="Applications"]';
    this.accountsPayable = '//a[normalize-space()="Accounts Payable"]';
    this.mainNavSelector = '#main-navigation';
    this.accountsPayableLink = 'a[href="AccountsPayable"]';
    this.pageHeader = '#breadcrumbs';
    this.enterMenu = '//a[normalize-space()="Enter"]';
    this.enterTransaction = '//a[normalize-space()="Enter Transaction"]';
    this.changeLinkAccountModal = '#ctl00_defaults_linkChooseDefaults';
    this.bankAccountDropdown = '#ctl00_mainContent_comboBankAccount';
    this.bankAccountIframe = '#ctl00_defaults_windowChooseDefaults_iframe';

    // Vendor
    this.vendorNameInput = '#ctl00_mainContent_textPersonName';
    this.vendorModal = '#ctl00_Modal_PersonSearch_content';
    this.vendorModalIframe = '#ctl00_Modal_PersonSearch_iframe';
    this.vendorModalSearchBtn = '#ctl00_mainContent_btnSearch';
    this.vendorModalSelectBtn = '#ctl00_mainContent_buttonSelect';
    this.vendorSelectedBtn = '#ctl00_mainContent_personPickerVendor_button';

    // Transaction
    this.validationSummary = '#ctl00_upValidationSummary';
    this.invoiceNumberInput = '#ctl00_mainContent_textInvoiceNumber';
    this.invoiceDatePicker = "(//img[@title='pick date'])[1]";
    this.invoiceTotalInput = '#ctl00_mainContent_textInvoiceTotal';
    this.creditInput = '#ctl00_mainContent_detailGrid_rpt_ctl00_textCredit';
    this.saveBtn = '#ctl00_mainContent_buttonUpdate';
    this.validationSummary = '#ctl00_upValidationSummary';
    this.addNewTransactionBtn = '(//a[normalize-space()="Add New Transaction"])[1]';
    this.avidPayCheckbox = '#ctl00_mainContent_checkAvidPay';
    this.achCheckbox = '#ctl00_mainContent_checkUseACH';
    this.radioCheckboxInvoice = 'input[type="radio"][name="ctl00$mainContent$radioGroupType"][value="I"]';
    this.iframeFuncLocator = '#ctl00_mainContent_ddlStatementTypes';
    this.iframeFuncLocator1 = '#ctl00_mainContent_gridAccounts_ctl00__1';

    //ACH tab
    this.achTab = '(//span[contains(text(),"ACH")])[1]';

    // Account/Department/Account search
    this.accountSearchBtn = "#ctl00_mainContent_detailGrid_rpt_ctl00_acctStructure_buttonSearchFund";
    this.departmentSearchBtn = '#ctl00_mainContent_detailGrid_rpt_ctl00_acctStructure_buttonSearchDepartment';
    this.accountSearchBtn2 = '#ctl00_mainContent_detailGrid_rpt_ctl00_acctStructure_buttonSearchAccount';
    this.accountModalIframe = '#ctl00___Page_levelSearch_iframe';
    this.accountModalIframe2 = '#ctl00___Page_accountSearch_iframe';
    this.accountGridRow = '#ctl00_mainContent_gridLevels_ctl00__0';
    this.departmentGridRow = '#ctl00_mainContent_gridLevels_ctl00__1';
    this.accountModalSelectBtn = '#ctl00_mainContent_buttonSelect';
    this.accountNumberInput = '#ctl00_mainContent_detailGrid_rpt_ctl00_acctStructure_textFundNumber';
    this.departmentNumberInput = '#ctl00_mainContent_detailGrid_rpt_ctl00_acctStructure_textDepartmentNumber';

    // Transaction grid
    this.unpostedGridRows = '#ctl00_mainContent_gridUnposted_ctl00 tr.rgRow, #ctl00_mainContent_gridUnposted_ctl00 tr.rgAltRow';
    this.unpostedGridCheckboxes = '#ctl00_mainContent_gridUnposted_ctl00 input[type="checkbox"]';

    // Toast/Notification
    this.toastPanel = '#ctl00_notification_XmlPanel';
    this.toastLabel = '#ctl00_notification_C_labelNotification';

    // Post/Finalize
    this.postBtn = '#ctl00_mainContent_buttonPostTransactions';
    this.finalizeBtn = '#ctl00_mainContent_buttonFinalizePostWithJournal_buttonPost';
    this.reportIframe = '#ctl00_mainContent_ReportViewer1_ReportViewerWebFormsReportFrame';

    // Confirmation dialog
    this.okButton = 'button span.ui-button-text';

    // 1099 dropdown and description
    this.descInput = '(//input[@id="ctl00_mainContent_detailGrid_rpt_ctl00_textName"])[1]';
    this.dropdown1099 = '(//select[@id="ctl00_mainContent_detailGrid_rpt_ctl00_drop1099"])[1]';
  
    //Payment Procossing
    this.manageMenuLocator = '//a[normalize-space()="Manage"]';
    this.paymentProcessingLinkLocator = '//a[normalize-space()="Payment Processing"]';
    
  
  }

  async navigateViaMenu() {
    const app = this.page.locator(this.application);
    const apLink = this.page.locator(this.accountsPayable);
    await this.page.waitForTimeout(5000);
    await app.hover();
    await apLink.hover();
    await this.page.waitForTimeout(2000);
    console.log("Clicking on Accounts Payable link...");
    await apLink.click({ force: true });
    await this.page.waitForTimeout(2000);
  }
  async isAccountsPayablePageVisible() {
    const title = await this.page.title();
    console.log("Page Title:", title);
    expect(title).toBe("Accounts Payable");
    await this.page.waitForTimeout(2000);
    const breadcrumbs = await this.page.locator(this.pageHeader).textContent();
    console.log("Accounts Payable breadcrumbs path:", breadcrumbs);
    const gridExists = await this.page.isVisible('(//div[@class="maincontent"])[1]');
    console.log("Grid Exists:", gridExists);
    expect(gridExists).toBeTruthy();
    return gridExists;
  }
  async navigateToTransaction() {
    const enterMenu = this.page.locator(this.enterMenu);
    const enterTransaction = this.page.locator(this.enterTransaction);
    await enterMenu.hover();
    await this.page.waitForTimeout(2000);
    
    console.log("Clicking on Enter Transaction link...");
    await enterTransaction.click({ force: true });
    await this.page.waitForTimeout(2000);
    const transactionPageHeader = await this.page.locator(this.pageHeader).textContent();

    console.log("Transaction Page Header:", transactionPageHeader);
    await this.page.waitForTimeout(2000);
  
  }
  async verifyVendorModal() {
    await this.page.waitForSelector(this.vendorModal, { state: 'visible', timeout: 10000 });
    const isVendorModalVisible = await this.page.isVisible(this.vendorModal);
    console.log("Transaction Vendor Modal Visible:", isVendorModalVisible);
    expect(isVendorModalVisible).toBeTruthy();

    await this.page.waitForSelector(this.vendorModal, { state: 'visible', timeout: 10000 });
    console.log("Vendor Search modal is visible.");
    const iframeLocator = this.page.frameLocator(this.vendorModalIframe);
    await iframeLocator.locator("#ctl00_mainContent_buttonCancel").click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked closed button in Vendor Search modal to close it.');
  }
  async verifyAvidBankAccountValidation() {
  // Click the "change" link to open the bank account modal
  const changeLink = this.page.locator(this.changeLinkAccountModal);
  await changeLink.waitFor({ state: 'visible', timeout: 10000 });
  await changeLink.click();
  await this.page.waitForTimeout(1000);
  console.log('Clicked on "Change" link to open bank account modal.');

   // Locators
  const bankAccountIframe = this.page.frameLocator(this.bankAccountIframe);
  const fiscalYearDropdown = bankAccountIframe.locator('#ctl00_mainContent_comboFiscalYear');
  const periodDropdown = bankAccountIframe.locator('#ctl00_mainContent_comboPeriod');
  const bankAccountDropdown = bankAccountIframe.locator('#ctl00_mainContent_comboBankAccount');
  const okButton = bankAccountIframe.locator('#ctl00_mainContent_buttonOK');

  // Wait for dropdowns to be visible
  await Promise.all([
    fiscalYearDropdown.waitFor({ state: 'visible', timeout: 10000 }),
    periodDropdown.waitFor({ state: 'visible', timeout: 10000 }),
    bankAccountDropdown.waitFor({ state: 'visible', timeout: 10000 }),
    okButton.waitFor({ state: 'visible', timeout: 10000 }),
  ]);

  // Select current fiscal year (first option)
  const fiscalYearOptions = await fiscalYearDropdown.locator('option').all();
  if (fiscalYearOptions.length > 0) {
    const currentFiscalYearValue = await fiscalYearOptions[0].getAttribute('value');
    await fiscalYearDropdown.selectOption(currentFiscalYearValue);
    console.log('Selected current Fiscal Year:', await fiscalYearOptions[0].textContent());
  }

  // Select current period (match current option)
  const periodOptions = await periodDropdown.locator('option').all();
const currentMonth = new Date().getMonth(); // 0-based: 0=Jan, 5=June
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
let selectedPeriodValue = null;
for (const option of periodOptions) {
  const text = (await option.textContent() || '').toLowerCase();
  if (text.includes(monthNames[currentMonth].toLowerCase())) {
    selectedPeriodValue = await option.getAttribute('value');
    break;
  }
}
if (selectedPeriodValue) {
  await periodDropdown.selectOption(selectedPeriodValue);
  console.log('Selected current Period:', monthNames[currentMonth]);
} else if (periodOptions.length > 0) {
  // fallback to first option
  const firstValue = await periodOptions[0].getAttribute('value');
  await periodDropdown.selectOption(firstValue);
  console.log('Current month not found, selected first period option.');
} else {
  throw new Error('No period options found.');
}

  // Select AvidPay bank account if available, else first bank account
  const bankOptions = await bankAccountDropdown.locator('option').all();
  let avidPayValue = null;
  for (const option of bankOptions) {
    const text = await option.textContent();
    if (/avidpay/i.test(text)) {
      avidPayValue = await option.getAttribute('value');
      break;
    }
  }
  if (avidPayValue) {
    await bankAccountDropdown.selectOption(avidPayValue);
    console.log('Selected AvidPay bank account.');
  } else if (bankOptions.length > 0) {
    const firstValue = await bankOptions[0].getAttribute('value');
    await bankAccountDropdown.selectOption(firstValue);
    console.log('AvidPay bank not found, selected first bank account.');
  } else {
    throw new Error('No bank account options found.');
  }

  // Click OK to save
  await okButton.click();
  console.log('Clicked OK button in the bank account modal.');

//   // Switch to the modal iframe
//   const bankAccountIframe = this.page.frameLocator(this.bankAccountIframe);

//   // Wait for the bank account dropdown to be visible
//   const bankAccountDropdown = bankAccountIframe.locator(this.bankAccountDropdown);
//   await bankAccountDropdown.waitFor({ state: 'visible', timeout: 10000 });

//   // Select the first non-Avid approved bank account (assuming none are marked as "Avid Approved" in the <option> text)
//   // If you have a way to identify Avid Approved accounts in the option text, adjust the selector accordingly
//   const options = await bankAccountDropdown.locator('option').all();
//   let found = false;
//   for (let i = 0; i < options.length; i++) {
//     const text = await options[i].textContent();
//     // Adjust this condition if you have a specific marker for Avid Approved
//     if (!text.includes('Avid Approved')) {
//       const value = await options[i].getAttribute('value');
//       await bankAccountDropdown.selectOption(value);
//       console.log(`Selected non-Avid approved bank account: ${text}`);
//       found = true;
//       break;
//     }
//   }
//   if (!found) {
//     throw new Error('No non-Avid approved bank account found in the dropdown.');
//   }
  
//   await bankAccountIframe.locator('#ctl00_mainContent_buttonOK').click();
//   console.log('Clicked OK button in the bank account modal.');
  

// // Fetch the actual validation message from the DOM and compare
// await this.page.waitForTimeout(5000); 
// const expectedMessage = await this.page.locator(this.validationSummary).locator('li').textContent();
// console.log('Fetched validation message from page:', expectedMessage);
// if (
//   expectedMessage &&
//   expectedMessage.includes('Please select an account which is Avid Pay enabled and in Approved status under Bank Account Information; Modify.')
// ) {
//   console.log('Correct validation message is shown for non-Avid approved bank account on edit screen.');
// } else {
//   throw new Error(
//     'Expected Avid Pay bank account validation message was NOT shown on edit screen. Actual message: ' + expectedMessage
//   );

//   }
  }
  async selectVendor() {
    await this.page.waitForSelector(this.vendorModal, { state: 'visible', timeout: 10000 });
    console.log("Vendor Search modal is visible.");
    const iframeLocator = this.page.frameLocator(this.vendorModalIframe);
    await iframeLocator.locator(this.vendorNameInput).waitFor({ state: 'visible', timeout: 20000 });
    await iframeLocator.locator(this.vendorNameInput).fill('Shah');
    console.log('Filled Vendor Name with "Shah".');

    await this.page.waitForTimeout(2000);
    await iframeLocator.locator(this.vendorModalSearchBtn).click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked Search button in Vendor modal.');

    await this.page.waitForTimeout(2000);
    await iframeLocator.locator(this.vendorModalSelectBtn).click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked the first "Select" button in the Vendor modal.');

    await this.page.waitForSelector(this.vendorSelectedBtn, { state: 'visible', timeout: 20000 });
    const selectedVendorName = await this.page.locator(this.vendorSelectedBtn).textContent();
    console.log('Selected Vendor Name (after selection):', selectedVendorName);
  }
  async radio_checkbox() {
    // Check if radio type is already set to "Invoice", else select it
    const radioInvoice = this.page.locator(this.radioCheckboxInvoice);
    const isInvoiceChecked = await radioInvoice.isChecked();
    if (!isInvoiceChecked) {
      await radioInvoice.check();
      console.log('Radio type was not set to "Invoice". Selected "Invoice" radio button.');
    } else {
      console.log('Radio type is already set to "Invoice".');
    }
  }
  async uncheckAvidPay() {
    // Check if Avid Pay is selected, then uncheck it
    const avidPayCheckbox = this.page.locator(this.avidPayCheckbox);
    if (await avidPayCheckbox.isChecked()) {
      await avidPayCheckbox.uncheck();
      
      await this.page.waitForTimeout(5000);
      console.log('Avid Pay was checked. Unchecked the Avid Pay checkbox.');
    } else {
      console.log('Avid Pay checkbox was already unchecked.');
    }

  }
  async enterTransactionDetails() {

    // Fill Invoice Number and Date
    this.generatedInvoiceNumber = `INV-${Date.now()}`;
    await this.page.locator(this.invoiceNumberInput).fill(this.generatedInvoiceNumber);
    console.log('Filled Invoice Number with', this.generatedInvoiceNumber);

    await this.page.waitForTimeout(2000);
    await this.page.locator(this.invoiceDatePicker).click();
    console.log('Clicked on Invoice Date picker.');

    await this.page.waitForTimeout(2000);
    const currentDate = new Date();
    const day = currentDate.getDate();
    await this.page.locator(`//td[@data-handler="selectDay"]//a[text()="${day}"]`).click();
    await this.page.waitForTimeout(2000);
    const invoiceAmount1 = this.page.locator(this.invoiceTotalInput);
    await invoiceAmount1.waitFor({ state: 'visible', timeout: 20000 });
    await invoiceAmount1.fill("1000.00");
    await invoiceAmount1.press('Tab');
    await this.page.waitForTimeout(1000);
    await expect(invoiceAmount1).toHaveValue("$1,000.00");
    const credit = this.page.locator(this.creditInput);
    await expect(credit).toHaveValue("$1,000.00");
    console.log('Filled Invoice Amount with "$1,000.00".');

    const value = await invoiceAmount1.inputValue();
    console.log('Verified Invoice Amount input value:', value);

    await this.page.waitForTimeout(2000);
    await this.page.locator(this.saveBtn).click();
    console.log('Clicked Save button.');

    await this.page.waitForTimeout(2000);
    const validationMessage = await this.page.locator(this.validationSummary).textContent();
    console.log('Validation Message:', validationMessage);

    // Select Fund
    await this.page.locator(this.accountSearchBtn).click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked on Account Search button.');

    const iframeAccLocator = this.page.frameLocator(this.accountModalIframe);
    await iframeAccLocator.locator(this.accountGridRow).waitFor({ state: 'visible', timeout: 20000 });
    await iframeAccLocator.locator(this.accountGridRow).click();
    console.log('Clicked on the first account in the Account Search modal.');

    await this.page.waitForTimeout(2000);
    await iframeAccLocator.locator(this.accountModalSelectBtn).click();
    console.log('Clicked the "Select" button in the Account Search modal.');

    await this.page.waitForTimeout(2000);
    await this.page.waitForSelector(this.accountNumberInput, { state: 'visible', timeout: 20000 });
    const selectedAccount = await this.page.locator(this.accountNumberInput).inputValue();
    await this.page.waitForTimeout(2000);
    console.log('Selected Account (after selection):', selectedAccount);

    // Select Department
    await this.page.locator(this.departmentSearchBtn).click();
    await this.page.waitForTimeout(2000);
    const iframeDeptLocator = this.page.frameLocator(this.accountModalIframe);
    await iframeDeptLocator.locator(this.departmentGridRow).waitFor({ state: 'visible', timeout: 20000 });
    await iframeDeptLocator.locator(this.departmentGridRow).click();
    console.log('Clicked on the department in the Department Search modal.');

    await this.page.waitForTimeout(2000);
    await iframeDeptLocator.locator(this.accountModalSelectBtn).click();
    await this.page.waitForSelector(this.departmentNumberInput, { state: 'visible', timeout: 20000 });
    const selectedDepartment = await this.page.locator(this.departmentNumberInput).inputValue();
    await this.page.waitForTimeout(2000);
    console.log('Selected Department (after selection):', selectedDepartment);

    // Select Account 
    console.log('Before waiting for Account Search button');
    const btn = this.page.locator(this.accountSearchBtn2);
    await btn.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Account Search button is visible');
    await btn.click();
    console.log('Clicked Account Search button');
    await this.page.waitForTimeout(10000);

    const iframeFuncLocator = this.page.frameLocator(this.accountModalIframe2);
    await iframeFuncLocator.locator(this.iframeFuncLocator).waitFor({ state: 'visible', timeout: 50000 });
    await iframeFuncLocator.locator(this.iframeFuncLocator).click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked on the Type dropdown in Account Search modal.');
    
    await iframeFuncLocator.locator(this.iframeFuncLocator).selectOption('I');
    console.log('Clicked on the first option in the Type dropdown in Account Search modal.');

    // Select account row in account search modal
    const iframeFuncLocator1 = this.page.frameLocator(this.accountModalIframe2);
    await iframeFuncLocator1.locator(this.iframeFuncLocator1).waitFor({ state: 'visible', timeout: 50000 });
    await iframeFuncLocator1.locator(this.iframeFuncLocator1).dblclick();
    await this.page.waitForTimeout(2000);
    console.log('Clicked on the first account row in the Account Search modal.');

    // Description and 1099
    await this.page.locator(this.descInput).waitFor({ state: 'visible', timeout: 50000 });
    const descInput = this.page.locator(this.descInput);
    await descInput.fill("Test Description");
    await expect(descInput).toHaveValue("Test Description");
    const actualValue = await descInput.inputValue();
    console.log('Verified description input value:', actualValue);
    await this.page.locator(this.dropdown1099).waitFor({ state: 'visible', timeout: 20000 });
    await this.page.locator(this.dropdown1099).selectOption('1');
    await this.page.waitForTimeout(5000);
    console.log('Selected "Misc. Box 1 - Rents" (3rd option) from the 1099 dropdown in the Transaction page.');

  }
  async saveTransaction() {
    
    // Save transaction
    await this.page.locator(this.saveBtn).click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked Save button in the Transaction page.');

    // Wait for either toast or validation summary
    const toastPanel = this.page.locator(this.toastPanel);
    const validationSummary = this.page.locator(this.validationSummary);

    // Wait up to 10s for either to be visible
    const toastPromise = toastPanel.waitFor({ state: 'visible', timeout: 10000 }).then(() => 'toast').catch(() => null);
    const validationPromise = validationSummary.waitFor({ state: 'visible', timeout: 10000 }).then(() => 'validation').catch(() => null);

    const result = await Promise.race([toastPromise, validationPromise]);

    if (result === 'toast') {
      const toastMessage = await this.page.locator(this.toastLabel).textContent();
      console.log('Toast message:', toastMessage);
      const invoiceMatch = toastMessage.match(/invoice\s*#\s*([A-Za-z0-9\-]+)/i);
      if (!invoiceMatch) {
        throw new Error('Invoice number not found in toast message! Actual message: ' + toastMessage);
      }
      const invoiceNumber = invoiceMatch[1];
      console.log('Extracted invoice number:', invoiceNumber);
    } else if (result === 'validation') {
      const validationMessage = await validationSummary.textContent();
      throw new Error('Validation error after saving transaction: ' + validationMessage);
    } else {
      throw new Error('Neither toast nor validation message appeared after saving transaction.');
    }

  }
  async addNewTransaction(){
    const addNewTransactionBtn = this.page.locator(this.addNewTransactionBtn);
    await addNewTransactionBtn.waitFor({ state: 'visible', timeout: 10000 });
    await addNewTransactionBtn.click();
    console.log('Clicked on Add New Transaction button in the Unposted Transactions page.');
  }
  async checkACHcheckbox() {
    const achCheckbox = this.page.locator(this.achCheckbox);
    const avidPayCheckbox = this.page.locator(this.avidPayCheckbox); // <-- Add this line

    await achCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await achCheckbox.setChecked(true); // Ensures it is checked
    await this.page.waitForTimeout(5000);
    const isNowChecked = await achCheckbox.isChecked();
    if (isNowChecked) {
        console.log('ACH checkbox is checked.');
    } else {
        throw new Error('ACH checkbox could not be checked!');
    }
    await this.page.screenshot({ path: 'ach_checkbox_checked.png', fullPage: true });

    //Verify Avid Pay checkbox is disabled when ACH is checked
    const isAvidDisabled = await avidPayCheckbox.isDisabled();
    console.log('Avid Pay checkbox disabled:', isAvidDisabled);
    if (!isAvidDisabled) {
        throw new Error('Avid Pay checkbox should be disabled when ACH is checked!');
    }
  }
  async verifyACHtabVisible() {
    const achTab = this.page.locator(this.achTab);
    try {
          await expect(achTab).toBeVisible({ timeout: 10000 });
          console.log('ACH tab is visible.');
        } catch (e) {
          await this.page.screenshot({ path: 'ach_tab_not_visible.png', fullPage: true });
          throw new Error('ACH tab did not become visible after checking ACH checkbox!');
      }
    await this.page.screenshot({ path: 'ach_checkbox_checked.png', fullPage: true });
  }
  async navigateToACH() {
    const achTab = this.page.locator(this.achTab);

    // Wait for modal background to disappear if present
    const modalBg = this.page.locator('#ctl00___Page_accountSearch_backgroundElement');
    if (await modalBg.isVisible({ timeout: 2000 }).catch(() => false)) {
        console.log('Waiting for modal background to disappear before clicking ACH tab...');
        await modalBg.waitFor({ state: 'hidden', timeout: 20000 });
        console.log('Modal background disappeared.');
    }

    await achTab.waitFor({ state: 'visible', timeout: 20000 });
    await achTab.click();
    console.log('Clicked on ACH link in the Accounts Payable module.');
    await this.page.waitForTimeout(2000);
  }
  async ACHTabFields() {
    // Verify ACH tab fields are visible
    const achTab = this.page.locator(this.achTab);
    await achTab.waitFor({ state: 'visible', timeout: 10000 });
    console.log('ACH tab is visible.');

    // Wait for the ACH fields to be visible
    const accountAssignedDropdown = this.page.locator('#ctl00_mainContent_ddlACH');
    const accountTypeDropdown = this.page.locator('#ctl00_mainContent_ddlAccountType');
    const routingInput = this.page.locator('#ctl00_mainContent_textReceivingDFIID');
    const accountInput = this.page.locator('#ctl00_mainContent_textReceivingDFIAccount');

    await accountAssignedDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await accountTypeDropdown.waitFor({ state: 'visible', timeout: 10000 });
    await routingInput.waitFor({ state: 'visible', timeout: 10000 });
    await accountInput.waitFor({ state: 'visible', timeout: 10000 });

    // Check if there are any assigned accounts (other than "add new account")
    const options = await accountAssignedDropdown.locator('option').all();
    let assignedFound = false;
    for (const option of options) {
        const value = await option.getAttribute('value');
        const text = await option.textContent();
        if (value && value !== '00000000-0000-0000-0000-000000000000') {
            // Select the assigned account
            await accountAssignedDropdown.selectOption(value);
            console.log(`Selected assigned account: ${text}`);
            assignedFound = true;
            break;
        }
    }

    if (!assignedFound) {
    // Fill in new bank routing and account numbers
    await routingInput.fill('062103592');
    await accountInput.fill('9876543210');
    await this.page.waitForTimeout(2000);
    console.log('Entered new Bank Routing # and Bank Account #.');

    // Wait for Account Type dropdown to become enabled
    await this.page.waitForFunction(
        (selector) => !document.querySelector(selector).disabled,
        '#ctl00_mainContent_ddlAccountType',
        { timeout: 10000 }
    );
    console.log('Account Type dropdown is now enabled.');
}

// Now select Account Type (only if enabled)
  if (await accountTypeDropdown.isEnabled()) {
    await accountTypeDropdown.selectOption('1'); // '0' for Checking, '1' for Savings
    console.log('Selected Account Type: Savings');
  } else {
    console.log('Account Type dropdown is still disabled, skipping selection.');
  } 
  await this.page.waitForTimeout(2000);
  await this.page.screenshot({ path: 'ach_tab_fields.png', fullPage: true });
  }
  async uncheckAvidPayFilter() {
    // Expand the Filters panel if collapsed
    const filtersToggle = this.page.locator('//span[contains(@class,"rpText") and normalize-space()="Filters"]');
    const avidPayFilterCheckbox = this.page.locator('#ctl00_mainContent_radPanelBarFilters_i0_showAvidPay');

    // Ensure Filters panel is expanded (click if not visible)
    if (!(await avidPayFilterCheckbox.isVisible())) {
      await filtersToggle.click();
      await this.page.waitForTimeout(1000); // wait for panel to expand
    }

    // Uncheck Avid Pay filter if checked
    if (await avidPayFilterCheckbox.isVisible()) {
      if (await avidPayFilterCheckbox.isChecked()) {
        await avidPayFilterCheckbox.uncheck();
        console.log('Avid Pay filter was checked. Unchecked the Avid Pay filter checkbox.');
        // Optionally, click Search to refresh the grid after changing the filter
        const searchBtn = this.page.locator('#ctl00_mainContent_radPanelBarFilters_i0_buttonSearch');
        if (await searchBtn.isVisible()) {
          await searchBtn.click();
          console.log('Clicked Search button after unchecking Avid Pay filter.');
        }
      } else {
        console.log('Avid Pay filter checkbox was already unchecked.');
      }
    } else {
      console.log('Avid Pay filter checkbox not found or not visible.');
    }
  } 
  async ensureAvidPayChecked() {
    const avidPayCheckbox = this.page.locator(this.avidPayCheckbox);
    await avidPayCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    const isChecked = await avidPayCheckbox.isChecked();
    if (!isChecked) {
        await avidPayCheckbox.check();
        console.log('Avid Pay checkbox was not checked. Now checked.');
    } else {
        console.log('Avid Pay checkbox is already checked.');
    }
    await this.page.waitForTimeout(2000);
    const isNowChecked = await avidPayCheckbox.isChecked();
  
    if (isNowChecked) {
        console.log('Avid Pay checkbox is checked.');
      }
    else {
        throw new Error('Avid Pay checkbox could not be checked!');
    }
  }
  async postTransaction(expectedInvoices = []) {
    // Sort grid by Invoice Date
    const invoiceDateHeader = this.page.locator('(//a[normalize-space()="Invoice Date"])[1]');
    await invoiceDateHeader.click();
    await this.page.waitForTimeout(2000);
    await invoiceDateHeader.click();
    await this.page.waitForTimeout(2000);

    // Uncheck all checkboxes first
    const allCheckboxes = this.page.locator(this.unpostedGridCheckboxes);
    const count = await allCheckboxes.count();
    for (let i = 0; i < count; i++) {
        if (await allCheckboxes.nth(i).isChecked()) {
            await allCheckboxes.nth(i).uncheck();
        }
    }

    // Select the first and second rows from the grid
    const rows = this.page.locator(this.unpostedGridRows);
    const firstRow = rows.nth(0);
    const secondRow = rows.nth(1);

    // Check the checkboxes in the first and second rows (first cell)
    const firstCheckbox = firstRow.locator('input[type="checkbox"]').first();
    const secondCheckbox = secondRow.locator('input[type="checkbox"]').first();
    await firstCheckbox.check();
    await secondCheckbox.check();

    // Helper to check if ACH is checked in a row (ACH column is index 11)
    async function isACHCheckedInRow(row) {
        const achCell = row.locator('td').nth(11);
        const img = achCell.locator('img');
        if (await img.count() === 0) {
            return false; // No image means not checked
        }
        const src = await img.first().getAttribute('src');
        return src && src.includes('CheckBoxOn.png');
    }

    // Fetch data for a row
    async function getRowData(row) {
        return Promise.all([
            row.locator('td').nth(4).textContent(),  // Vendor
            row.locator('td').nth(5).textContent(),  // Invoice Number
            row.locator('td').nth(14).textContent(), // Amount (adjust index if needed)
            isACHCheckedInRow(row)                   // ACH checked status
        ]);
    }

    // Fetch data for both rows
    const [firstData, secondData] = await Promise.all([
        getRowData(firstRow),
        getRowData(secondRow)
    ]);

    const invoices = [
        {
            vendor: (firstData[0] || '').trim(),
            invoice: (firstData[1] || '').trim(),
            amount: (firstData[2] || '').trim(),
            ach: firstData[3] ? 'YES' : 'NO'
        },
        {
            vendor: (secondData[0] || '').trim(),
            invoice: (secondData[1] || '').trim(),
            amount: (secondData[2] || '').trim(),
            ach: secondData[3] ? 'YES' : 'NO'
        }
    ];

    console.table([
        { Row: 1, ...invoices[0] },
        { Row: 2, ...invoices[1] }
    ]);
    console.log('Selected Invoices Data:', invoices);
const achIndex = invoices.findIndex(inv => inv.ach === 'YES');
if (achIndex !== -1) {
    this.achInvoiceNumber = invoices[achIndex].invoice;
    this.achVendorName = invoices[achIndex].vendor;
}
const nonAchIndex = invoices.findIndex(inv => inv.ach === 'NO');
if (nonAchIndex !== -1) {
    this.nonAchInvoiceNumber = invoices[nonAchIndex].invoice;
    this.nonAchVendorName = invoices[nonAchIndex].vendor;
}
    // Post transaction
    await this.page.locator(this.postBtn).click();
    await this.page.waitForTimeout(5000);
    console.log('Clicked Post button in the Transaction page.');

    // Wait for report
    const reportFrame = this.page.frameLocator(this.reportIframe);
    const reportBody = reportFrame.locator('body');
    await reportBody.waitFor({ state: 'visible', timeout: 20000 });
    const reportText = await reportBody.evaluate(node => node.innerText);

    // Normalize helper
    function normalize(str) {
        return (str || '').replace(/\s+/g, ' ').replace(/[\$,()]/g, '').trim().toLowerCase();
    }
    const normalizedReport = normalize(reportText);

    // Compare both invoices with the report
    for (let i = 0; i < invoices.length; i++) {
        const vendorNameOnly = invoices[i].vendor.split('(')[0].trim();
        const fieldsToCompare = [
            { label: 'Vendor', value: vendorNameOnly },
            { label: 'Invoice Number', value: invoices[i].invoice },
            { label: 'Amount', value: invoices[i].amount }
        ];
        const comparisonTable = fieldsToCompare.map(field => ({
            Field: field.label,
            Grid: field.value,
            Report: normalizedReport.includes(normalize(field.value)) ? field.value : 'NOT FOUND'
        }));
        console.table(comparisonTable);

        for (const row of comparisonTable) {
            if (row.Report === 'NOT FOUND') {
                throw new Error(`Row ${i + 1}: Mismatch for ${row.Field}: Grid value "${row.Grid}" not found in report!\nReport: ${reportText}`);
            }
        }
        console.log(`Row ${i + 1}: All fields matched in report.`);
    }

    // Finalize post
    const finalizeBtn = this.page.locator(this.finalizeBtn);
    await finalizeBtn.waitFor({ state: 'visible', timeout: 10000 });
    await finalizeBtn.click();
    await this.page.waitForTimeout(5000);
    await this.page.screenshot({ path: 'finalize_post_screen.png', fullPage: true });

    // Confirmation dialog
    const okButton = this.page.locator(this.okButton, { hasText: 'OK' });
    await okButton.waitFor({ state: 'visible', timeout: 10000 });
    await okButton.click();
    await this.page.waitForTimeout(3000);
    console.log('Clicked OK on confirmation dialog & user navigates back to unposted transaction page');

    // Breadcrumb check
    const breadcrumbs = await this.page.locator(this.pageHeader).textContent();
    if (!breadcrumbs.includes('Accounts Payable') || !breadcrumbs.includes('Transactions')) {
        throw new Error('User did not navigate back to Unposted Transactions screen!');
    }
    console.log('Verified user is on Unposted Transactions screen.');

    // Verify posted transactions are not present in the grid
    const gridRows = this.page.locator(this.unpostedGridRows);
    const rowCount = await gridRows.count();
    for (const inv of invoices) {
        const vendorNameOnly = inv.vendor.split('(')[0].trim();
        let found = false;
        for (let i = 0; i < rowCount; i++) {
            const rowText = await gridRows.nth(i).textContent();
            if (rowText && rowText.includes(inv.invoice) && rowText.includes(vendorNameOnly)) {
                found = true;
                break;
            }
        }
        if (found) {
            throw new Error(`Posted transaction (${inv.invoice}, ${vendorNameOnly}) is still present in the Unposted Transactions grid!`);
        }
        console.log(`Verified posted transaction (${inv.invoice}, ${vendorNameOnly}) is not present in the Unposted Transactions grid.`);
    }

    // After posting and collecting invoices array:
this.invoiceValues = invoices.map(inv => inv.invoice);
this.vendorNames = invoices.map(inv => inv.vendor);


  }
  async navigateToPaymentProcessing() {
    const manageMenu = this.page.locator(this.manageMenuLocator);
    if (await manageMenu.isVisible()) {
        await manageMenu.hover();
        // Wait for the submenu to appear by waiting for the Payment Processing link to be visible
        const paymentProcessingLink = this.page.locator(this.paymentProcessingLinkLocator);
        await paymentProcessingLink.waitFor({ state: 'visible', timeout: 10000 });
        await paymentProcessingLink.hover();
        console.log("Clicking on Payment Processing link...");
        await this.page.screenshot({ path: 'payment_Processing_hover.png', fullPage: true });
        await paymentProcessingLink.click();
        await this.page.waitForTimeout(5000);
        console.log('Clicked on Payment Processing link.');
        await this.page.screenshot({ path: 'payment_processing_screen.png', fullPage: true });
        const title = await this.page.title();
        console.log("Page Title:", title);
        expect(title).toBe("Payment Processing");
        const breadcrumbs = await this.page.locator(this.pageHeader).textContent();
        console.log("Payment Processing breadcrumbs path:", breadcrumbs);
    } else {
        throw new Error('Manage menu is not visible');
    }
  }
  async verifyAndUncheckAvidPayFilter() {
    // 1. Verify if filter panel is expanded
    const filtersPanel = this.page.locator('#ctl00_mainContent_radPanelBarFilters');
    await filtersPanel.waitFor({ state: 'visible', timeout: 10000 });

    // The filter panel is expanded if the Filters link has class 'rpExpanded'
    const filtersToggle = this.page.locator('//span[contains(@class,"rpText") and normalize-space()="Filters"]/ancestor::a[contains(@class,"rpExpanded")]');
    const isExpanded = await filtersToggle.isVisible();
    console.log('Filters panel expanded:', isExpanded);
    if (!isExpanded) {
        // Expand the filter panel if not already expanded
        const filtersLink = this.page.locator('//span[contains(@class,"rpText") and normalize-space()="Filters"]/ancestor::a');
        await filtersLink.click();
        await this.page.waitForTimeout(500);
    }

    // 2. Check if Avid Pay checkbox is checked
    const avidPayCheckbox = this.page.locator('#ctl00_mainContent_radPanelBarFilters_i0_chkAvidPay');
    await avidPayCheckbox.waitFor({ state: 'visible', timeout: 5000 });
    const isChecked = await avidPayCheckbox.isChecked();
    console.log('Avid Pay checkbox checked:', isChecked);

    // 3. If checked, uncheck and click Search
    if (isChecked) {
        await avidPayCheckbox.uncheck();
        console.log('Avid Pay checkbox was checked. Now unchecked.');
        // Click the Search button to apply the filter
        const searchBtn = this.page.locator('#ctl00_mainContent_radPanelBarFilters_i0_buttonSearch');
        await searchBtn.waitFor({ state: 'visible', timeout: 5000 });
        await searchBtn.click();
        console.log('Clicked Search button after unchecking Avid Pay.');
    } else {
        console.log('Avid Pay checkbox was already unchecked.');
    }
  
    await this.page.waitForTimeout(2000);
    await this.page.locator('#ctl00_mainContent_radPanelBarFilters_i0_buttonSearch').click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked Search button after unchecking Avid Pay filter.');
    
  }
  async selectLastNonACHPayment() {
    const nonAchInvoiceNumber = this.nonAchInvoiceNumber;
    if (!nonAchInvoiceNumber) {
        throw new Error('No non-ACH invoice number found from posted transactions!');
    }

    // Wait for the posted grid to be visible
    const postedGrid = this.page.locator('#ctl00_mainContent_gridPosted_ctl00');
    await postedGrid.waitFor({ state: 'visible', timeout: 10000 });

    // Find all rows
    const rows = postedGrid.locator('tbody > tr');
    const rowCount = await rows.count();
    console.log('Posted grid row count:', rowCount);
    if (rowCount === 0) {
        throw new Error('No rows found in the posted grid! The grid may be empty or not loaded.');
    }

    // Uncheck all checkboxes in the grid
    const allCheckboxes = postedGrid.locator('tbody input[type="checkbox"]');
    const checkboxCount = await allCheckboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
        if (await allCheckboxes.nth(i).isChecked()) {
            await allCheckboxes.nth(i).uncheck();
        }
    }
    console.log('Unchecked all payment checkboxes in the grid.');

    let found = false;

    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const colCount = await row.locator('td').count();
        if (colCount < 7) {
            console.warn(`Row ${i + 1} has only ${colCount} columns, skipping.`);
            continue;
        }
        const invoiceNumber = (await row.locator('td').nth(6).textContent() || '').trim();
        if (invoiceNumber === nonAchInvoiceNumber) {
            const achCell = row.locator('td').nth(11);
            const img = achCell.locator('img');
            const isACH = (await img.count() > 0) && (await img.first().getAttribute('src')).includes('CheckBoxOn.png');
            if (isACH) {
                throw new Error(`Invoice ${invoiceNumber} is marked as ACH in the posted grid!`);
            }
            // Fetch row data
            const vendor = (await row.locator('td').nth(3).textContent() || '').trim();
            const amount = (await row.locator('td').nth(14).textContent() || '').trim();

            // Print row data for debugging
            console.table([{
                Row: i + 1,
                Vendor: vendor,
                InvoiceNumber: invoiceNumber,
                Amount: amount,
                ACH: isACH ? 'YES' : 'NO'
            }]);

            this.lastNonACHInvoiceData = { vendor, invoiceNumber, amount, ach: 'NO' };
            const checkbox = row.locator('td input[type="checkbox"]');
            await checkbox.waitFor({ state: 'attached', timeout: 5000 });
            if (!(await checkbox.isChecked())) {
                await checkbox.check();
                console.log(`Checked the checkbox for non-ACH invoice number: ${invoiceNumber}`);
            } else {
                console.log(`Checkbox for non-ACH invoice number ${invoiceNumber} is already checked.`);
            }
            await this.page.screenshot({ path: 'last_non_ach_invoice_selected.png', fullPage: true });
            found = true;
            break;
        }
    }

    if (!found) {
        throw new Error(`Non-ACH invoice number ${nonAchInvoiceNumber} not found in the posted grid!`);
    }

    console.log('Selected posted non-ACH invoice data:');
    await this.page.screenshot({ path: 'last_non_ach_invoice_selected.png', fullPage: true });
    console.table([this.lastNonACHInvoiceData]);
  }
  async selectLastACHPaymentByInvoice() {
    const achInvoiceNumber = this.achInvoiceNumber;
    if (!achInvoiceNumber) {
        throw new Error('No ACH invoice number found from posted transactions!');
    }

    const postedGrid = this.page.locator('#ctl00_mainContent_gridPosted_ctl00');
    await postedGrid.waitFor({ state: 'visible', timeout: 10000 });

    const allCheckboxes = postedGrid.locator('tbody input[type="checkbox"]');
    const checkboxCount = await allCheckboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
        if (await allCheckboxes.nth(i).isChecked()) {
            await allCheckboxes.nth(i).uncheck();
        }
    }
    console.log('Unchecked all payment checkboxes in the grid.');

    const rows = postedGrid.locator('tbody > tr');
    const rowCount = await rows.count();
    console.log('Posted grid row count:', rowCount);
    if (rowCount === 0) {
        await this.page.screenshot({ path: 'posted_grid_empty.png', fullPage: true });
        throw new Error('No rows found in the posted grid! Screenshot saved as posted_grid_empty.png');
    }

    let found = false;
    let vendor = '';
    let invoiceNumber = '';
    let amount = '';

    for (let i = 0; i < rowCount; i++) {
        const row = rows.nth(i);
        const colCount = await row.locator('td').count();
        if (colCount < 7) {
            console.warn(`Row ${i + 1} has only ${colCount} columns, skipping.`);
            continue;
        }
        invoiceNumber = (await row.locator('td').nth(6).textContent() || '').trim();

        if (invoiceNumber === achInvoiceNumber) {
            vendor = (await row.locator('td').nth(3).textContent() || '').trim();
            amount = (await row.locator('td').nth(14).textContent() || '').trim();

            this.selectedACHInvoiceData = { vendor, invoiceNumber, amount, ach: 'YES' };
            const checkbox = row.locator('td input[type="checkbox"]');
            await checkbox.waitFor({ state: 'attached', timeout: 5000 });
            if (!(await checkbox.isChecked())) {
                await checkbox.check();
                console.log(`Checked the checkbox for ACH invoice number: ${invoiceNumber}`);
            } else {
                console.log(`Checkbox for ACH invoice number ${invoiceNumber} is already checked.`);
            }
            await this.page.screenshot({ path: 'selected_ach_invoice.png', fullPage: true });
            found = true;
            break;
        }
    }

    if (!found) {
        throw new Error(`ACH invoice number ${achInvoiceNumber} not found in the posted grid!`);
    }

    console.log('Selected posted ACH invoice data:');
    console.table([{
        Vendor: vendor,
        InvoiceNumber: invoiceNumber,
        Amount: amount,
        ACH: 'YES'
    }]);
  }
  async processLastPostedNonACHTransaction() {
    // Helper to normalize strings for comparison
    const normalize = str =>
        (str || '').toString().replace(/\s+/g, ' ').replace(/[\$,()]/g, '').trim().toLowerCase();

    // Helper to wait for overlay to disappear
    const waitForOverlayToHide = async () => {
        const overlay = this.page.locator('.ui-widget-overlay.ui-front');
        if (await overlay.isVisible()) {
            await overlay.waitFor({ state: 'hidden', timeout: 15000 });
        }
    };

    // 1. Uncheck all checkboxes in the posted grid
    const postedGrid = this.page.locator('#ctl00_mainContent_gridPosted_ctl00');
    await postedGrid.waitFor({ state: 'visible', timeout: 10000 });
    const allCheckboxes = postedGrid.locator('tbody input[type="checkbox"]');
    const checkboxCount = await allCheckboxes.count();
    for (let i = 0; i < checkboxCount; i++) {
        if (await allCheckboxes.nth(i).isChecked()) {
            await allCheckboxes.nth(i).uncheck();
        }
    }
    console.log('Unchecked all payment checkboxes in the posted grid.');
    await this.page.screenshot({ path: 'posted_grid_unchecked.png', fullPage: true });

    // 2. Check only the last non-ACH invoice
const nonAchInvoiceNumber = this.nonAchInvoiceNumber;
if (!nonAchInvoiceNumber) {
    throw new Error('No non-ACH invoice number found from posted transactions!');
}
const rows = postedGrid.locator('tbody > tr');
const rowCount = await rows.count();
console.log('Posted grid row count:', rowCount);
if (rowCount === 0) {
    await this.page.screenshot({ path: 'posted_grid_empty.png', fullPage: true });
    throw new Error('No rows found in the posted grid! Screenshot saved as posted_grid_empty.png');
}

let found = false;
for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);
    const colCount = await row.locator('td').count();
    if (colCount < 7) {
        console.warn(`Row ${i + 1} has only ${colCount} columns, skipping.`);
        continue;
    }
    const invoiceNumber = (await row.locator('td').nth(6).textContent() || '').trim();
    if (invoiceNumber === nonAchInvoiceNumber) {
        const achCell = row.locator('td').nth(10);
        const img = achCell.locator('img');
        const isACH = (await img.count() > 0) && (await img.first().getAttribute('src')).includes('CheckBoxOn.png');
        if (isACH) continue; // skip if ACH
        const checkbox = row.locator('td input[type="checkbox"]');
        await checkbox.waitFor({ state: 'attached', timeout: 5000 });
        if (!(await checkbox.isChecked())) {
            await checkbox.check();
            console.log(`Checked the checkbox for non-ACH invoice number: ${invoiceNumber}`);
        } else {
            console.log(`Checkbox for non-ACH invoice number ${invoiceNumber} is already checked.`);
        }
        found = true;
        break;
    }
}
if (!found) {
    throw new Error(`Non-ACH invoice number ${nonAchInvoiceNumber} not found in the posted grid!`);
}

    // 3. Click "Process Payments"
    const processPaymentsBtn = this.page.locator('#ctl00_mainContent_buttonPrint');
    await processPaymentsBtn.waitFor({ state: 'visible', timeout: 5000 });
    await processPaymentsBtn.click();
    console.log('Clicked Process Payments button.');

    // 4. Wait for modal and fetch check info
    const modal = this.page.locator('#ctl00_mainContent_mdlCheckInformation_pnlMPE');
    await modal.waitFor({ state: 'visible', timeout: 10000 });
    this.checkDate = await modal.locator('#ctl00_mainContent_dateChecks').inputValue();
    this.firstCheckNumber = await modal.locator('#ctl00_mainContent_textFirstCheckNumber').inputValue();

    // 5. Click OK in modal
    await modal.locator('#ctl00_mainContent_buttonOK').click();
    await waitForOverlayToHide();
    console.log('Clicked OK in Process Payments modal.');


    // 7. Click "Reprint Checks"
    const reprintBtn = this.page.locator('#ctl00_mainContent_buttonReprintChecks');
    await reprintBtn.waitFor({ state: 'visible', timeout: 10000 });
    await reprintBtn.click();
    console.log('Clicked Reprint Checks button.');

    // 8. Wait for Reprint modal and validate check numbers
    const reprintModal = this.page.locator('#ctl00_mainContent_mdlReprint_content');
    await reprintModal.waitFor({ state: 'visible', timeout: 10000 });
    const reprintFrom = await reprintModal.locator('#ctl00_mainContent_ddlFrom').inputValue();
    const reprintTo = await reprintModal.locator('#ctl00_mainContent_ddlTo').inputValue();
    const reprintCheckNumber = Number(await reprintModal.locator('#ctl00_mainContent_textBeginningCheckNumber').inputValue());
    const previousCheckNumber = Number(this.firstCheckNumber);

    if (reprintCheckNumber !== previousCheckNumber + 1)
        throw new Error(`Reprint check number (${reprintCheckNumber}) is not auto-incremented from previous (${previousCheckNumber})`);
    if (reprintFrom !== reprintTo)
        throw new Error(`Reprint To (${reprintTo}) does not match Reprint From (${reprintFrom})`);

    console.table([
        { field: 'Original Check Number', value: previousCheckNumber },
        { field: 'Reprint Check Number', value: reprintCheckNumber },
        { field: 'Auto-incremented?', value: reprintCheckNumber === previousCheckNumber + 1 ? 'YES' : 'NO' }
    ]);

    // 9. Click OK in Reprint modal
    await reprintModal.locator('#ctl00_mainContent_buttonReprintOK').click();
    await waitForOverlayToHide();
    console.log('Clicked OK in Reprint modal.');

    // 10. Wait for report and validate reprint check number
const reportFrame = this.page.frameLocator('#ctl00_mainContent_ReportViewer1_ReportViewerWebFormsReportFrame');
const reportBody = reportFrame.locator('body');
await reportBody.waitFor({ state: 'visible', timeout: 20000 });
const reportText2 = await reportBody.evaluate(node => node.innerText);
console.table([
    { field: 'Reprint Modal Check Number', value: reprintCheckNumber },
    { field: 'Check Number Found in Report?', value: normalize(reportText2).includes(normalize(String(reprintCheckNumber))) ? 'YES' : 'NO' }
]);
   
   // Click Continue
    const continueBtn = this.page.locator('#ctl00_mainContent_buttonContinue');
    await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
    await continueBtn.click();
    await waitForOverlayToHide();
    await this.page.waitForTimeout(2000);
    console.log('Clicked Continue button.');
  }
  async finalizePost() {

    // Wait for Finalize Post screen
    const finalizeBtn = this.page.locator('#ctl00_mainContent_buttonFinalize_buttonPost');
    await finalizeBtn.waitFor({ state: 'visible', timeout: 20000 });
    await this.page.waitForTimeout(7000);
    console.log('Finalize Post button is visible.');

    // Check the "Post Directly to GL" checkbox state
    const postDirectlyCheckbox = this.page.locator('#ctl00_mainContent_buttonFinalize_checkPostDirectlyToGeneralLedgerWithoutEditing');
    const isChecked = await postDirectlyCheckbox.isChecked();

    // Fetch the posting date
    const postingDateInput = this.page.locator('#ctl00_mainContent_buttonFinalize_buttonFinalize_DatePosting');
    const postingDate = await postingDateInput.inputValue();

    // Check if the Finalize button is available
    const isFinalizeBtnVisible = await finalizeBtn.isVisible();

    // Print the data in a table
    console.table([
        { field: 'Posting Date', value: postingDate },
        { field: 'Finalize Button Available', value: isFinalizeBtnVisible ? 'YES' : 'NO' },
        { field: 'Post Directly to GL Checked', value: isChecked ? 'YES' : 'NO' }
    ]);

    // Click Finalize Post
    await finalizeBtn.click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked Finalize Post button.');

    // Handle Finalize popup
    const finalizePopup = this.page.locator('(//div[@role="dialog"])[1]');
    await finalizePopup.waitFor({ state: 'visible', timeout: 10000 });
    console.log('Finalize popup is visible.');

    // Click OK in Finalize popup
    const finalizeOkButton = finalizePopup.locator('button', { hasText: 'OK' });
    await finalizeOkButton.waitFor({ state: 'visible', timeout: 10000 });
    await finalizeOkButton.click();
    await this.page.waitForTimeout(2000);
    console.log('Clicked OK in Finalize popup.');

    // Verify user navigates back to payment processing screen page
    const breadcrumbs = await this.page.locator(this.pageHeader).textContent();
    await this.page.waitForTimeout(2000);
    if (!breadcrumbs.includes('Payment Processing')) {
        throw new Error('User did not navigate back to Payment Processing screen!');
    }
    console.log('Verified user is on Payment Processing screen.');
    await this.page.screenshot({ path: 'finalize_post_screen.png', fullPage: true });
    await this.page.waitForTimeout(2000);
  }
  async waitForOverlayToHide() {
        const overlay = this.page.locator('.ui-widget-overlay.ui-front');
        if (await overlay.isVisible()) {
            await overlay.waitFor({ state: 'hidden', timeout: 15000 });
        }
  }
  async processLastPostedACHTransaction() {
    const processPaymentsBtn = this.page.locator('#ctl00_mainContent_buttonPrint');
    await processPaymentsBtn.waitFor({ state: 'visible', timeout: 5000 });
    await processPaymentsBtn.click();
    console.log('Clicked Process Payments button.');

  const modal = this.page.locator('#ctl00_mainContent_mdlCheckInformation_pnlMPE');
await modal.waitFor({ state: 'visible', timeout: 10000 });

// Fetch check date and check number BEFORE clicking OK
this.checkDate = await modal.locator('#ctl00_mainContent_dateChecks').inputValue();
this.firstCheckNumber = await modal.locator('#ctl00_mainContent_textFirstCheckNumber').inputValue();
console.log('Fetched Check Date:', this.checkDate);
console.log('Fetched First Check Number:', this.firstCheckNumber);

// Now click OK in modal
await modal.locator('#ctl00_mainContent_buttonOK').click();
await this.waitForOverlayToHide();
console.log('Clicked OK in Process Payments modal.');

await this.page.waitForTimeout(2000);
await this.page.screenshot({ path: 'process_payments_modal.png', fullPage: true });

//Verify ACH Verification report is shown
const reportFrame = this.page.frameLocator('#ctl00_mainContent_ReportViewer1_ReportViewerWebFormsReportFrame');
const reportBody = reportFrame.locator('body');
await reportBody.waitFor({ state: 'visible', timeout: 20000 });
const reportText = await reportBody.innerText();

if (!reportText.includes('ACH Verification Report')) {
    throw new Error('ACH Verification Report is not shown in the report viewer!');
}
console.log('Verified: ACH Verification Report is shown.');
await this.page.screenshot({ path: 'ach_verification_report.png', fullPage: true });

//Click on continue button
const continueBtn = this.page.locator('#ctl00_mainContent_buttonContinue');
await continueBtn.waitFor({ state: 'visible', timeout: 10000 });
await continueBtn.click();
console.log('Clicked Continue button.');
await this.page.waitForTimeout(2000);
await this.page.screenshot({ path: 'ACH_continue_button_clicked.png', fullPage: true });


const reportFrame01 = this.page.frameLocator('#ctl00_mainContent_ReportViewer1_ReportViewerWebFormsReportFrame');
const reportBody01 = reportFrame01.locator('body');
await reportBody01.waitFor({ state: 'visible', timeout: 20000 });
const reportText01 = await reportBody01.innerText();

if (!/payment\s+voucher/i.test(reportText01)) {
    throw new Error('Payment Voucher screen is not shown in the report viewer!');
}
console.log('Verified: Payment Voucher screen is shown.');

const continueBtn01 = this.page.locator('#ctl00_mainContent_buttonContinue');
await continueBtn01.waitFor({ state: 'visible', timeout: 10000 });
await continueBtn01.click();
console.log('Clicked Continue button.');
await this.page.waitForTimeout(2000);
await this.page.screenshot({ path: 'Finalize Checks.png', fullPage: true });

const downloadAchBtn = this.page.locator('#ctl00_mainContent_buttonDownloadAch');
await downloadAchBtn.waitFor({ state: 'visible', timeout: 10000 });
console.log('Verified: Download ACH File button is shown.');

// Wait for the download event when clicking the Download ACH File button
const [ download ] = await Promise.all([
    this.page.waitForEvent('download'),
    downloadAchBtn.click()
]);
console.log('Clicked Download ACH File button and download started.');

// Save the downloaded file to a desired path
const downloadPath = 'downloads/ach-file.txt'; // Change extension as needed
await download.saveAs(downloadPath);
console.log('Downloaded ACH file saved to:', downloadPath);

// Optionally, store the path or file for later use
this.downloadedAchFilePath = downloadPath;

await this.page.waitForTimeout(2000);
await this.page.screenshot({ path: 'FinalizeACHPost.png', fullPage: true });

// // 12. Wait for Finalize Post screen
// const finalizeBtn = this.page.locator('#ctl00_mainContent_buttonFinalize_buttonPost');
// await finalizeBtn.waitFor({ state: 'visible', timeout: 20000 });
// await this.page.waitForTimeout(7000);
// console.log('Finalize Post button is visible.');

// // 13. Check the "Post Directly to GL" checkbox state
// const postDirectlyCheckbox = this.page.locator('#ctl00_mainContent_buttonFinalize_checkPostDirectlyToGeneralLedgerWithoutEditing');
// const isChecked = await postDirectlyCheckbox.isChecked();

// // Fetch the posting date
// const postingDateInput = this.page.locator('#ctl00_mainContent_buttonFinalize_buttonFinalize_DatePosting');
// const postingDate = await postingDateInput.inputValue();

// // Check if the Finalize button is available
// const isFinalizeBtnVisible = await finalizeBtn.isVisible();

// // Print the data in a table
// console.table([
//     { field: 'Posting Date', value: postingDate },
//     { field: 'Finalize Button Available', value: isFinalizeBtnVisible ? 'YES' : 'NO' },
//     { field: 'Post Directly to GL Checked', value: isChecked ? 'YES' : 'NO' }
// ]);

// // 14. Click Finalize Post
// await finalizeBtn.click();
// await this.page.waitForTimeout(2000);
// console.log('Clicked Finalize Post button.');

// // 15. Handle Finalize popup
// const finalizePopup = this.page.locator('div[role="dialog"]:visible'); // More robust for visible dialog
// await finalizePopup.waitFor({ state: 'visible', timeout: 10000 });
// console.log('Finalize popup is visible.');

// // 16. Click OK in Finalize popup
// const finalizeOkButton = finalizePopup.locator('button', { hasText: 'OK' });
// await finalizeOkButton.waitFor({ state: 'visible', timeout: 10000 });
// await finalizeOkButton.click();
// await this.page.waitForTimeout(2000);
// console.log('Clicked OK in Finalize popup.');

// // 17. Verify user navigates back to payment processing screen page
// const breadcrumbs = await this.page.locator(this.pageHeader).textContent();
// await this.page.waitForTimeout(2000);
// if (!breadcrumbs.includes('Payment Processing')) {
//     throw new Error('User did not navigate back to Payment Processing screen!');
// }
// console.log('Verified user is on Payment Processing screen.');
// await this.page.screenshot({ path: 'finalize_post_screen.png', fullPage: true });
// await this.page.waitForTimeout(2000);
//   }
  }
}

module.exports = { AccountsPayable };