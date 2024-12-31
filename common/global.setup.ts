import getEnvConfig from "../config/env-config/envConfig";
import {test, expect} from "./customFixtures";

import {promises as fs} from 'fs';
import path from "path";


const envConfig = getEnvConfig(process.env.NODE_ENV || 'QA');

test('Setup Login', async ({loginActions, page}) => {
    const {username, password} = envConfig;
    const authFilePath = path.resolve('playwright/.auth/auth.json');

    try {
        await fs.unlink(authFilePath);
        console.log('Deleted existing auth.json file.');
    } catch (error: any) {
        if (error.code !== 'ENOENT') {
            console.error('Error deleting auth.json:', error);
        } else {
            console.log('No existing auth.json file to delete.');
        }
    }

    try {
        console.log(`Navigating to: ${envConfig.baseURL}`);
        await page.goto(envConfig.baseURL);
        await expect(page).toHaveURL(envConfig.baseURL); // Ensure correct URL

        console.log('Logging in...');
        await loginActions.login(username, password);

        // Add explicit wait to ensure the page has loaded after login
        await page.waitForTimeout(2000); // Adjust timeout as needed

        // Check for a specific element after login to confirm success
        await expect(page.locator('#shopping_cart_container')).toBeVisible({timeout: 10000});
        console.log('Login successful.');

        await page.context().storageState({path: authFilePath});
        console.log('Authentication state saved.');
    } catch (error) {
        console.error('Login setup failed:', error);
        throw error; // Re-throw the error to fail the test
    }
});