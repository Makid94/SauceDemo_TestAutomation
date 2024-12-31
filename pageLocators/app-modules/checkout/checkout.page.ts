import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName_TXT: Locator
    readonly lastName_TXT: Locator;
    readonly postal_DT: Locator;
    readonly checkoutButton_BTN: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName_TXT = page.locator('#first-name');
        this.lastName_TXT = page.locator('#last-name');
        this.postal_DT = page.locator('#postal-code');
        this.checkoutButton_BTN = page.locator('#continue');
    }

}
