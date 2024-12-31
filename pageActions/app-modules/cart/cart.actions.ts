import {Page} from '@playwright/test';
import {BaseActions} from "../../../common/baseActions";
import {CartPage} from "../../../pageLocators/app-modules/cart/cart.page";

export class CartActions extends BaseActions {
    private cartPage: CartPage;

    constructor(page: Page) {
        super(page);
        this.cartPage = new CartPage(page);
    }

    async addItemsToCart(item: string) {
        const addToCartButton = this.page.locator(`#add-to-cart-${item}`);
        await addToCartButton.click();
    }

    async clickCartLink() {
        await this.cartPage.cartIcon_LK.click();
    }

    async getCartItemCount(): Promise<number> {
        const itemCount = await this.cartPage.cartBadge.textContent();
        return itemCount ? parseInt(itemCount) : 0;
    }

    async getCartItemNames(): Promise<string[]> {
        return await this.cartPage.cartItems.allTextContents();
    }

    async proceedToCheckout() {
        await this.cartPage.checkoutButton.click();

    }
}
