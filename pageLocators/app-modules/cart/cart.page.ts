import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartIcon_LK: Locator
    readonly cartBadge: Locator;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartIcon_LK = page.locator('.shopping_cart_badge');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartItems = page.locator('.cart_item .inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
    }

}
