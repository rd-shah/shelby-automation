class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = '#ctl00_mainContent_textBoxUserName';
    this.passwordInput = '#ctl00_mainContent_textBoxPassword';
    this.loginButton = '#ctl00_mainContent_buttonLogin';
    this.logoutLink = '#ctl00_HeadLoginView_HeadLoginStatus';

    // Update this selector to match a unique dashboard element
    this.dashboardText = 'h1:has-text("Dashboard")'; // Example, adjust as needed
  }

 async goto() {
  await this.page.goto('http://localhost:83/Financials/', { timeout: 60000 }); // 60 seconds
}

  async login(username, password) {
    await this.page.waitForSelector(this.usernameInput, { timeout: 10000 });
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }

  async isUsernameDisplayed(expectedName) {
    const usernameSelector = '#ctl00_labelUserName';
    await this.page.waitForSelector(usernameSelector, { state: 'visible', timeout: 10000 });
    const username = await this.page.locator(usernameSelector).textContent();
    console.log("Displayed Username:", username?.trim());
    return username?.trim().includes(expectedName);
  }

  async isLoginPageVisible() {
    return await this.page.isVisible(this.usernameInput);
  }

  async logout() {
  await this.page.waitForSelector('#ctl00_HeadLoginView_HeadLoginStatus', { state: 'visible', timeout: 10000 });
  await this.page.click('#ctl00_HeadLoginView_HeadLoginStatus');
 
}
}
module.exports = { LoginPage };