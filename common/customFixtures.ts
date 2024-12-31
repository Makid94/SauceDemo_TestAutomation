import {test as base, Page, expect} from '@playwright/test';
import getEnvConfig from "../config/env-config/envConfig";
import {LoginActions} from "../pageActions/app-modules/login/login.actions";
import {HomepageActions} from "../pageActions/app-modules/homepage/homepage.actions";
import {CartActions} from "../pageActions/app-modules/cart/cart.actions";
import {CheckoutActions} from "../pageActions/app-modules/checkout/checkout.actions";

const envConfig = getEnvConfig(process.env.NODE_ENV || 'QA');

type TestFixtures = {
    loginActions: LoginActions;
    homepageActions: HomepageActions;
    cartActions: CartActions;
    checkoutActions: CheckoutActions;
    page: Page;
};

const test = base.extend<TestFixtures>({
    page: async ({page}, use) => {
        await page.goto(`${envConfig.baseURL}inventory.html`);
        await use(page);
    },
    loginActions: async ({page}, use) => {
        const loginActions = new LoginActions(page);
        await use(loginActions);
    },
    homepageActions: async ({page}, use) => {
        const homepageActions = new HomepageActions(page);
        await use(homepageActions);
    },
    cartActions: async ({page}, use) => {
        const cartActions = new CartActions(page);
        await use(cartActions);
    },
    checkoutActions: async ({page}, use) => {
        const checkoutActions = new CheckoutActions(page);
        await use(checkoutActions);
    }
});

export {test, expect, Page};
