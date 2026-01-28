import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class TransactionPage extends BasePage {
  private transactionTab: Locator;
  private latestRecord: Locator;
  private column: Locator;

  constructor(page: Page) {
    super(page);
    this.transactionTab = page.locator('xpath=//button[@ng-class="btnClass1"]');
    this.latestRecord = page.locator("tbody tr").last();
    this.column = this.latestRecord.locator("td");
  }

  async clickTransactionTab() {
    await this.transactionTab.click();
  }

  async getLastRowColumnValue(columnNumber: number): Promise<string> {
    return (await this.column.nth(columnNumber).textContent()) || "";
  }
}
