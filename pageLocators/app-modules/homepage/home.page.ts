import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly productSort_DD: Locator;
    readonly itemsList: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productSort_DD = page.locator('.product_sort_container');
        this.itemsList = page.locator('.inventory_item_name');
    }
}

