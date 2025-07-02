const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../../PageObjectModule/loginPage'); // adjust path if needed

Given('the user navigates to the login page', async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.goto();
});

When('the user logs in with valid credentials', async function () {
  await this.loginPage.login('sam', 'password1');
  //const content = await this.page.content();
  //console.log(content);
});

Then('the username "System Administrator" should be displayed', async function () {
  const visible = await this.loginPage.isUsernameDisplayed("Sam Wells");
  expect(visible).toBeTruthy();
});

When('the user logs out', async function () {
  await this.loginPage.logout();
});

Then('the user should be redirected to the login page', async function () {
  const visible = await this.loginPage.isLoginPageVisible();
  expect(visible).toBeTruthy();
});