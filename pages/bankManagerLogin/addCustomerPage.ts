import { Page,Locator } from '@playwright/test';
import { BasePage } from '../basePage';


export class AddCustomerPage extends BasePage {
  private addCustomerTab: Locator;
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private postCodeInput: Locator;
  private submitBtn: Locator;
  constructor(page: Page) {
    super(page);
     this.addCustomerTab = page.locator('//button[@ng-class="btnClass1"]');
     this.firstNameInput = page.getByPlaceholder("First Name");
     this.lastNameInput = page.getByPlaceholder("Last Name");
     this.postCodeInput = page.getByPlaceholder("Post Code");
     this.submitBtn = page.locator('xpath=//button[@type="submit"]');
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async fillFirstName(value:string){
    await this.firstNameInput.fill(value);

  }
  async fillLastName(value:string){
    await this.lastNameInput.fill(value);

  }
  async fillPostCode(value:string){
    await this.postCodeInput.fill(value);

  }

  async clickSubmitButton() {
     await this.submitBtn.click();
  }

}
