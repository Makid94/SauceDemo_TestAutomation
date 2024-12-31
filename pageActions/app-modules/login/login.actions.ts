import {expect, Page} from '@playwright/test';
import {BaseActions} from "../../../common/baseActions";
import {LoginPage} from "../../../pageLocators/app-modules/login/login.page";

export class LoginActions extends BaseActions {
    private loginPage: LoginPage;

    constructor(page: Page) {
        super(page);
        this.loginPage = new LoginPage(page);
    }

    async login(username: string, password: string) {
        await this.waitAndFill(this.loginPage.username_IN, username);
        await this.waitAndFill(this.loginPage.password_IN, password);
        await this.waitAndClick(this.loginPage.login_BTN);

    }
}
