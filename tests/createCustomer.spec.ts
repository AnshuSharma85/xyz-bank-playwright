let { test, expect } = require("@playwright/test");
import { AddCustomerPage } from "../pages/bankManagerLogin/addCustomerPage.ts";
import { CustomerPage } from "../pages/bankManagerLogin/customers.ts";

// Scenarios to create a customer when login as a bank manager.
// Create customer - Customer is added successfully and customer id gets generated.

test.describe("Customer Login sceanrios", () => {
  test("Create Customer", async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customerPage = new CustomerPage(page);
    const firstNameValue = "Anshu1";
    const lastNameValue = "Anshu2";
    const postCodevalue = "SN21FD";

    await addCustomerPage.goto();

    await addCustomerPage.selectUser("Bank Manager Login");

    // click on your Add Customer button
    await addCustomerPage.clickAddCustomerTab();

    //input the first name, last name, post code
    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodevalue);

    //Alert box
    let alertMessage = "";
    page.once("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      alertMessage = dialog.message();
      await dialog.accept(); // or dialog.dismiss()
    });

    //click on submit button
    await addCustomerPage.clickSubmitButton();

    expect(alertMessage).toContain("Customer added successfully");

    // Click on customer details tab
    await customerPage.clickCustomerTab();

    // scroll to the last row in the table

    // await customerPage.getLastCustomerRow();

    const firstname = await customerPage.getFirstName();
    const lastname = await customerPage.getLastName();
    const postcode = await customerPage.getPostCode();

    expect(firstname).toBe(firstNameValue);
    expect(lastname).toBe(lastNameValue);
    expect(postcode).toBe(postCodevalue);
  });

  // Test to validate duplicate customer record and display alert box with the message "Customer may be duplicate"

  test("Duplicate Customer Record", async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const customerPage = new CustomerPage(page);
    const firstNameValue = "Harry";
    const lastNameValue = "Potter";
    const postCodevalue = "E725JB";

    await addCustomerPage.goto();

    await addCustomerPage.selectUser("Bank Manager Login");
    //click on add customer
    await addCustomerPage.clickAddCustomerTab();

    //Enter duplicate details in first name, lastname , postcode
    //Input the first name, last name, post code
    await addCustomerPage.fillFirstName(firstNameValue);
    await addCustomerPage.fillLastName(lastNameValue);
    await addCustomerPage.fillPostCode(postCodevalue);

    // Alertbox
    let alertMessage = "";
    page.once("dialog", async (dialog) => {
      console.log("Alert message:", dialog.message());
      alertMessage = dialog.message();
      await dialog.accept();
    });

    await addCustomerPage.clickSubmitButton();

    // Validate alertbox message
    expect(alertMessage).toContain("Customer may be duplicate");
  });
});
