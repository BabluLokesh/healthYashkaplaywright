import { Page, Locator, expect } from '@playwright/test';

export default class LoginPage {
  readonly page: Page;
  private usernameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private adminTag: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#username_id');               // TODO
    this.passwordInput = page.locator('#password');               // TODO
    this.loginButton = page.locator('button[type="submit"]');     // TODO
    this.adminTag = page.locator('.username.username-hide-on-mobile');                   // TODO
  }

  /**
   * TC1 – Verify login with valid credentials.
   */
  async performLogin(username: string, password: string, loginUrl: string): Promise<void> {
    await this.page.goto(loginUrl);
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    await expect(this.adminTag).toBeVisible();
  }
}
