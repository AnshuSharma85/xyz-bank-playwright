import { Page } from "@playwright/test";

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      "https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login",
    );
    await this.page.waitForTimeout(2000);
  }

  async selectUser(userType: string) {
    await this.page.getByText(userType).click();
  }

  async scrollUpPage() {
    await this.page.evaluate(() => window.scrollTo(0, 0));
  }
}
