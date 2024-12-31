import {Page} from '@playwright/test';
import {BaseActions} from "../../../common/baseActions";
import {CheckoutPage} from "../../../pageLocators/app-modules/checkout/checkout.page";

export class CheckoutActions extends BaseActions {
    private checkoutPage: CheckoutPage;

    constructor(page: Page) {
        super(page);
        this.checkoutPage = new CheckoutPage(page);
    }

    async fillCheckoutDetails(firstName: string, lastName: string, postalCode: string) {
        await this.waitAndFill(this.checkoutPage.firstName_TXT, firstName);
        await this.waitAndFill(this.checkoutPage.lastName_TXT, lastName);
        await this.waitAndFill(this.checkoutPage.postal_DT, postalCode);
    }

    async performCheckoutStep(firstName: string, lastName: string, postalCode: string) {
        await this.fillCheckoutDetails(firstName, lastName, postalCode);
        await this.waitAndClick(this.checkoutPage.checkoutButton_BTN);
    }
}
