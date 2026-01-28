let { test, expect } = require("@playwright/test");
import dayjs from "dayjs";

import { CustomerLoginPage } from "../pages/customerLoginPages/customerLoginPage.ts";
import { DepositPage } from "../pages/customerLoginPages/depositPage.ts";
import { TransactionPage } from "../pages/customerLoginPages/transactionPage.ts";

// Scenarios to login as a bank customer and make a deposit to one of the existing accounts of the customer.
// Validate that account balance gets updated after making deposit and new record gets added to the transaction table as
// credit.

test.describe("Deposit to the account sceanrios", () => {
  test("Deposit to the account", async ({ page }) => {
    const depositAmount = 200;
    const customerLoginPage = new CustomerLoginPage(page);
    const transactionPage = new TransactionPage(page);

    await customerLoginPage.goto();
    await customerLoginPage.selectUser("Customer Login");

    await customerLoginPage.selectCustomerDropDown();
    await customerLoginPage.clickLoginButton();

    const depositPage = new DepositPage(page);
    await depositPage.clickDepositTab();

    let initialAmount = await depositPage.getAmountValue();

    await depositPage.inputDepositAmount(depositAmount);
    await depositPage.clickDepositButton();
    const actualMessage = await depositPage.depositMessage();

    let finalAmount = await depositPage.getAmountValue();
    console.log("Final Amount diff:" + finalAmount);
    console.log("intial Amount:" + initialAmount);

    let actualAmountDiff = Number(finalAmount) - Number(initialAmount);
    console.log("Actual Amount diff:" + actualAmountDiff);

    expect(actualMessage).toContain("Deposit Successful");
    expect(actualAmountDiff).toBe(depositAmount);

    // Navigating to the transactions tab.

    await page.reload();
    await transactionPage.clickTransactionTab();
    await transactionPage.scrollUpPage();
    await page.evaluate(() => window.scrollTo(0, 0)); //base page
    const dateTime = await transactionPage.getLastRowColumnValue(0);
    const amount = await transactionPage.getLastRowColumnValue(1);
    const label = await transactionPage.getLastRowColumnValue(2);

    // Validate new record gets added to the transaction table and with transaction type as credit.

    let today = dayjs().format("MMM DD, YYYY");
    console.log("today:" + today);
    expect(dateTime).toContain(today);
    expect(amount).toBe(depositAmount.toString());
    expect(label).toBe("Credit");
  });

  // Validate when customer deposit empty amount tooltip gets displayed.

  test("Tool tip", async ({ page }, testInfo) => {
    const customerLoginPage = new CustomerLoginPage(page);
    const expectedMessages = {
      chromium: "Please fill out this field.",
      firefox: "Please enter a number.",
      webkit: "Fill out this field",
    };

    await customerLoginPage.goto();
    await customerLoginPage.selectUser("Customer Login");

    await customerLoginPage.selectCustomerDropDown();
    await customerLoginPage.clickLoginButton();

    const depositPage = new DepositPage(page);
    await depositPage.clickDepositTab();

    await depositPage.clickDepositAmountField();

    const validationMessage = await depositPage.getTooltip();
    expect(validationMessage).toBe(expectedMessages[testInfo.project.name]);
  });
});
