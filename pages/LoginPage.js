exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    
    // Locators for login page elements
    this.usernameInput = page.getByRole('textbox', { name: 'Username' });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }

  // Navigate to login page
  async navigateToLoginPage() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  // Verify page title
  async verifyPageTitle(expectedTitle) {
    const title = await this.page.title();
    return title === expectedTitle;
  }

  // Get page title
  async getPageTitle() {
    return await this.page.title();
  }

  // Enter username
  async enterUsername(username) {
    await this.usernameInput.fill(username);
  }

  // Enter password
  async enterPassword(password) {
    await this.passwordInput.fill(password);
  }

  // Click login button
  async clickLoginButton() {
    await this.loginButton.click();
  }

  // Combined method for login
  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }
};
