import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly username_IN: Locator;
  readonly password_IN: Locator;
  readonly login_BTN: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username_IN = page.locator('#user-name');
    this.password_IN = page.locator('#password');
    this.login_BTN = page.locator('#login-button');
  }

}
