import { Page, Locator, expect } from '@playwright/test';

export class BaseActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(url: string) {
    await this.page.goto(url, { timeout: 100000 });
  }

  async getTitle() {
    return await this.page.title();
  }

  async getUrl() {
    return await this.page.url();
  }

  async waitAndFill(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(text);
  }

  async waitAndClick(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async wait(time: number) {
    return this.page.waitForTimeout(time);
  }

  async waitForPageLoad() {
    return await this.page.waitForLoadState('load');
  }

  async waitForDomContentLoad() {
    return await this.page.waitForLoadState('domcontentloaded');
  }

  async waitAndHardClick(selector: string) {
    await this.page.waitForSelector(selector);
    return await this.page.$eval(selector, (element) => {
      if (element instanceof HTMLElement) {
        element.click();
      } else {
        throw new Error(
          `Element with selector "${selector}" is not an HTMLElement.`
        );
      }
    });
  }

  async keyPress(selector: string, key: string) {
    await this.page.press(selector, key);
  }

  async takeScreenshot() {
    return expect(await this.page.screenshot()).toMatchSnapshot(
      'MyScreenShot.png'
    );
  }

  async verifyElementText(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    const textValue = await locator.textContent();

    if (textValue === null) {
      throw new Error(
        `Element with selector "${locator}" has no text content.`
      );
    }

    return expect(textValue.trim()).toBe(text);
  }

  async verifyElementContainsText(locator: Locator, expectedText: string) {
    const textContent = await locator.textContent();
    if (!textContent || !textContent.includes(expectedText)) {
      throw new Error(`Expected text "${expectedText}" not found in element.`);
    }
  }

  async verifyJSElementValue(selector: string, expectedValue: string) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.$eval(selector, (element) => {
      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement
      ) {
        return element.value;
      }
      return null;
    });

    if (textValue === null) {
      throw new Error(
        `Element with selector "${selector}" does not have a value property.`
      );
    }
    return expect(textValue.trim()).toBe(expectedValue);
  }

  async selectValueFromDropdown(locator: Locator, text: string) {
    await locator.click();
    return await locator.selectOption({ value: text });
  }


  async verifyElementAttribute(
    selector: string,
    attribute: string,
    expectedValue: string
  ) {
    await this.page.waitForSelector(selector);
    const textValue = await this.page.getAttribute(selector, attribute);

    if (textValue === null) {
      throw new Error(
        `Element with selector "${selector}" does not have the attribute "${attribute}".`
      );
    }

    return expect(textValue.trim()).toBe(expectedValue);
  }

  async getFirstElementFromTheList(selector: string) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    if (count > 0) {
      return await rows.nth(0).textContent();
    }
    return null;
  }

  async getLastElementFromTheList(selector: string) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    if (count > 0) {
      return await rows.nth(count - 1).textContent();
    }
    return null;
  }

  async clickAllElements(selector: string) {
    const rows = this.page.locator(selector);
    const count = await rows.count();
    for (let i = 0; i < count; ++i) {
      await rows.nth(i).click();
    }
  }

  async isElementVisible(
    locator: Locator,
    errorMessage: string
  ): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible' });
      return true;
    } catch {
      throw new Error(errorMessage);
    }
  }

  async isElementNotVisible(selector: string) {
    const element = this.page.locator(selector);
    return expect(element).toBeHidden();
  }

  async isElementEnabled(selector: string, errorMessage: string) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isEnabled = await element.isEnabled();
      expect(isEnabled).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async isElementChecked(selector: string, errorMessage: string) {
    await this.page.waitForSelector(selector);
    const element = this.page.locator(selector);
    try {
      const isChecked = await element.isChecked();
      expect(isChecked).toBeTruthy();
    } catch (error) {
      throw new Error(`${errorMessage}`);
    }
  }

  async getTextFromElement(locator: Locator): Promise<string> {
    await locator.waitFor();
    const textContent = await locator.textContent();
    return textContent || '';
  }

  async waitForAttributeValue(
    selector: string,
    attribute: string,
    value: string,
    timeout = 5000
  ) {
    const startTime = Date.now();

    const checkAttribute = async () => {
      const element = await this.page.locator(selector).elementHandle();
      if (element) {
        const attributeValue = await element.getAttribute(attribute);
        if (attributeValue === value) {
          return true;
        }
      }
      return false;
    };

    while (Date.now() - startTime < timeout) {
      if (await checkAttribute()) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    throw new Error(
      `Timeout: Attribute "${attribute}" did not reach value "${value}" for selector "${selector}" within ${timeout}ms.`
    );
  }
}
