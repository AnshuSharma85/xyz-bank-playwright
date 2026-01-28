import { Page, Locator } from "@playwright/test";
import { BasePage } from "../basePage";

export class CustomerLoginPage extends BasePage {
  private customerDropDown: Promise<string[]>;
  private loginButton: Locator;
  constructor(page: Page) {
    super(page);
    this.customerDropDown = page.selectOption("#userSelect", {
      label: "Harry Potter",
    });
    this.loginButton = page.getByText("Login");
  }

  async selectCustomerDropDown() {
    await this.customerDropDown;
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }
}
