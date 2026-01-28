import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class DepositPage extends BasePage {
  private depositTab: Locator;
  private amountValue: Locator;
  private depositAmount: Locator;
  private depositBtn: Locator;
  private actualMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.depositTab = page.locator('xpath=//button[@ng-class="btnClass2"]');
    this.amountValue = page.locator("strong.ng-binding").nth(1);
    this.depositAmount = page.getByPlaceholder("amount");
    this.depositBtn = page.locator("xpath=//button[@type='submit']");
    this.actualMessage = page.locator('xpath=//span[@ng-show="message"]');
  }

  async clickDepositTab() {
    await this.depositTab.click();
  }

  async getAmountValue(): Promise<string> {
    return (await this.amountValue.textContent()) || "";
  }

  async inputDepositAmount(value: number) {
    await this.depositAmount.fill(value.toString());
  }

  async clickDepositAmountField() {
    await this.depositAmount.click();
  }

  async getTooltip(): Promise<string> {
    //first
    const msg = this.depositAmount.evaluate((el: HTMLInputElement) => {
      return el.validationMessage;
    });
    console.log("msg:" + msg);
    return msg || "";
  }

  async clickDepositButton() {
    await this.depositBtn.click();
  }

  async depositMessage(): Promise<string> {
    const msg = await this.actualMessage.textContent();
    return msg || "";
  }
}
