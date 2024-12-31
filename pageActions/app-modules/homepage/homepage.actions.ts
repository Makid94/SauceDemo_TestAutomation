import {Page} from '@playwright/test';
import {BaseActions} from "../../../common/baseActions";
import {HomePage} from "../../../pageLocators/app-modules/homepage/home.page";


export class HomepageActions extends BaseActions {
    private homePage: HomePage;

    constructor(page: Page) {
        super(page);
        this.homePage = new HomePage(page);
    }

    async sortItemsByZA() {
        await this.selectValueFromDropdown(this.homePage.productSort_DD, 'za');
        await this.waitForPageLoad();
        await this.wait(10000);
    }

    async getSortedItemNames(): Promise<string[]> {
        const itemNames = await this.getItemNames();
        const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a));
        return sortedNames;
    }

    async getItemNames(): Promise<string[]> {
        const items = this.page.locator('.item-name-selector');
        const itemNames = await items.allTextContents();
        return itemNames;
    }

    async sortItemsByPriceHighToLow() {
        await this.selectValueFromDropdown(this.homePage.productSort_DD, 'hilo');
    }

    async getSortedPricesHighToLow(): Promise<number[]> {
        const priceElements = this.page.locator('.inventory_item_price');
        const itemPrices = await priceElements.allTextContents();
        const numericPrices = itemPrices.map(price => parseFloat(price.replace('$', '')));
        return numericPrices.sort((a, b) => b - a);
    }

    async getDisplayedPrices(): Promise<number[]> {
        const priceElements = this.page.locator('.inventory_item_price');
        const itemPrices = await priceElements.allTextContents();
        return itemPrices.map(price => parseFloat(price.replace('$', '')));
    }


}

