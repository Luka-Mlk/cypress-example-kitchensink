import { expect, type Page, type Locator } from "@playwright/test";
import { allure } from "allure-playwright";

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected async step<T>(name: string, body: () => Promise<T>): Promise<T> {
    return allure.step(name, body);
  }

  async navigate(path: string = "") {
    await this.step(path, async () => {
      await this.page.goto(path);
    });
  }

  async click(elementName: string, locator: Locator) {
    await this.step(`click ${elementName}`, async () => {
      await locator.evaluate((el) => (el.style.border = "3px solid orange"));
      await locator.click();
    });
  }

  async fill(
    elementName: string,
    locator: Locator,
    value: string,
    options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number },
  ) {
    await this.step(`fill ${elementName}: ${value}`, async () => {
      await locator.fill(value, options);
    });
  }

  async expectVisible(
    elementName: string,
    locator: Locator,
    options?: { timeout?: number },
  ) {
    await this.step(`verify ${elementName} is visible`, async () => {
      await expect(locator).toBeVisible(options);
    });
  }

  async expectText(
    elementName: string,
    locator: Locator,
    expectedText: string | RegExp,
  ) {
    await this.step(
      `verify ${elementName} has text: "${expectedText}"`,
      async () => {
        await expect(locator).toHaveText(expectedText);
      },
    );
  }

  async expectHidden(
    elementName: string,
    locator: Locator,
    options?: { timeout?: number },
  ) {
    await this.step(`verify ${elementName} is hidden`, async () => {
      await expect(locator).toBeHidden(options);
    });
  }

  async expectStyle(
    elementName: string,
    locator: Locator,
    property: string,
    expectedValue: string | RegExp,
  ) {
    await this.step(
      `verify ${elementName} has ${property}: "${expectedValue}"`,
      async () => {
        await expect(locator).toHaveCSS(property, expectedValue);
      },
    );
  }
}
