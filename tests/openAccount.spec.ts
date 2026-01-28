let { test, expect } = require("@playwright/test");

import { CustomerPage } from "../pages/bankManagerLogin/customers.ts";
import { OpenAccountPage } from "../pages/bankManagerLogin/openAccountPage.ts";

// Scenario to login as bank manager and open new accounts for existing customers.
// Validate if successfull, account gets created with account number
// Validate customer’s record in the Customers table is updated with the new account number

test.describe("Account Creation sceanrios", () => {
  test("Open Account", async ({ page }) => {
    const openAccountPage = new OpenAccountPage(page);
    const customerPage = new CustomerPage(page);

    await openAccountPage.goto();

    await openAccountPage.selectUser("Bank Manager Login");
    await openAccountPage.openAccountTab();

    let alertMessage = "";
    page.on("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      alertMessage = dialog.message();
      await dialog.accept(); // or dialog.dismiss()
    });
    await openAccountPage.openAccountDropDown();
    await openAccountPage.selectCurrencyDropDown();
    await openAccountPage.clickProcessButton();

    const actualAccountId = alertMessage.split(":")[1];

    await customerPage.clickCustomerTab();

    const expectedAccountId = await customerPage.getAccountID();

    expect(alertMessage).toContain("Account created successfully");
    expect(expectedAccountId).toContain(actualAccountId);
  });
});
