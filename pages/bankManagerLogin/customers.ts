import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class CustomerPage extends BasePage {
  private customerTab: Locator;
  private lastCustomerRow: Locator;
  private secondCustomerRow: Locator;
  constructor(page: Page) {
    super(page);
    this.customerTab = page.locator('//button[@ng-class="btnClass3"]');
    this.lastCustomerRow = page.locator("tbody tr").last();
    this.secondCustomerRow = page.locator("tbody tr").nth(1);
  }

  async clickCustomerTab() {
    await this.customerTab.click();
    await this.page.waitForTimeout(1000);
  }

  async getLastCustomerRow(): Promise<Locator> {
    //moved to base page
    await this.lastCustomerRow.scrollIntoViewIfNeeded();
    return this.lastCustomerRow;
  }
  async getFirstName(): Promise<string> {
    const name = await this.lastCustomerRow.locator("td").nth(0).textContent();
    return name || "";
  }
  async getLastName(): Promise<string> {
    const name = await this.lastCustomerRow.locator("td").nth(1).textContent();
    return name || "";
  }

  async getPostCode(): Promise<string> {
    const code = await this.lastCustomerRow.locator("td").nth(2).textContent();
    return code || "";
  }

  async getAccountID(): Promise<string> {
    const accountNumber = await this.secondCustomerRow
      .locator("td")
      .nth(3)
      .locator("span")
      .last()
      .textContent();
    return accountNumber || "";
  }

  async getInitialAmount(): Promise<string> {
    const amt = await this.page
      .locator("strong.ng-binding")
      .nth(1)
      .textContent();
    return amt || "";
  }
}
