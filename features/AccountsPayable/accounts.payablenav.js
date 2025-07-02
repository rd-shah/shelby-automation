const { Given, when, then, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../PageObjectModule/loginPage'); // adjust path if needed
const { AccountsPayable } = require('../../PageObjectModule/accountsPayable'); // adjust path if needed

Given('the user is logged in to the Shelby financial application', { timeout: 60000 }, async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
  await this.loginPage.login('sam', 'password1');
  // Optionally, verify login succeeded
  const loggedIn = await this.loginPage.isUsernameDisplayed('Sam Wells');
  expect(loggedIn).toBeTruthy();
  this.accountsPayable = new AccountsPayable(this.page);
  await expect(await this.page.locator('xpath=/html/body/form/nav/div/ul/li[1]/ul/li[1]/a')).toHaveText("Accounts Payable");

});

When('the user navigates to the Accounts Payable module',{ timeout: 500000 }, async function () {
  await this.accountsPayable.navigateViaMenu(); 
});

Then('the Accounts Payable page should be displayed',{ timeout: 50000}, async function () {
  
 await this.accountsPayable.isAccountsPayablePageVisible();
  
});

Then('hovering over Enter menu should show the "Enter Transaction" option', {timeout:80000}, async function(){
  await this.accountsPayable.navigateToTransaction();
  await this.accountsPayable.verifyVendorModal();
  await this.accountsPayable.verifyAvidBankAccountValidation();
  await this.accountsPayable.selectVendor();
  await this.accountsPayable.radio_checkbox();
  await this.accountsPayable.uncheckAvidPay();
  await this.accountsPayable.enterTransactionDetails();
  
});

Then('the user should be able to create Non Avid Invoice  transaction', {timeout:80000}, async function(){
  await this.accountsPayable.saveTransaction();
});

Then('Click on Add new transaction button for creating ACH transaction', {timeout:100000}, async function(){
  await this.accountsPayable.addNewTransaction();
  await this.accountsPayable.selectVendor();
  await this.accountsPayable.uncheckAvidPay();
  await this.accountsPayable.checkACHcheckbox();
  await this.accountsPayable.verifyACHtabVisible();
  await this.accountsPayable.enterTransactionDetails();
  await this.accountsPayable.navigateToACH();
  await this.accountsPayable.ACHTabFields();
  await this.accountsPayable.saveTransaction();

});

Then('click on Add new transaction button for Avid pay transaction', {timeout:100000}, async function(){
  await this.accountsPayable.addNewTransaction();
  await this.accountsPayable.selectVendor();
  await this.accountsPayable.ensureAvidPayChecked();
  await this.accountsPayable.enterTransactionDetails();
  await this.accountsPayable.saveTransaction();
});

Then('post the created Non Avid Invoice transaction', {timeout:50000}, async function(){
  await this.accountsPayable.uncheckAvidPayFilter();    
  await this.accountsPayable.postTransaction();
});

Then('navigate to Payment processing screen', {timeout:100000}, async function(){
  await this.accountsPayable.navigateToPaymentProcessing();
  await this.accountsPayable.verifyAndUncheckAvidPayFilter();
  await this.accountsPayable.selectLastNonACHPayment(this.invoiceVal);
  await this.accountsPayable.processLastPostedNonACHTransaction();
  await this.accountsPayable.finalizePost();
});

Then('post the ACH Invoice transaction', {timeout:50000}, async function(){
  await this.accountsPayable.selectLastACHPaymentByInvoice(this.invoiceVal);
  await this.accountsPayable.processLastPostedACHTransaction();
  await this.accountsPayable.finalizePost();
});

