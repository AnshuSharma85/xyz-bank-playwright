import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class OpenAccountPage extends BasePage {
  private bankManagerLoginBtn: Locator;
  private openActTab: Locator;
  private processButton: Locator;
  private customerNameDropDown: Promise<string[]>;
  private currencyDropDown: Promise<string[]>;
  constructor(page: Page) {
    super(page);
    this.openActTab = page.locator('xpath=//button[@ng-class="btnClass2"]');
    this.customerNameDropDown = page.selectOption("#userSelect", {
      label: "Harry Potter",
    });
    this.currencyDropDown = page.selectOption("#currency", {
      label: "Pound",
    });
    this.processButton = page.locator('xpath=//button[@type="submit"]');
  }

  async clickBankManagerBtn() {
    await this.bankManagerLoginBtn.click();
  }

  async openAccountTab() {
    await this.openActTab.click();
  }

  async selectOption(userType: string) {
    await this.page.getByText(userType).click();
  }

  async openAccountDropDown() {
    await this.customerNameDropDown;
  }

  async selectCurrencyDropDown() {
    await this.currencyDropDown;
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
