**XYZ Bank - Playwright Typescript Automation Framework**

**Project Overview:**
This project has automated UI tests for the XYZ Bank Application using Playwright with Typescript.
Framework follows the Page Object Model (POM) design pattern to ensure maintainability and clear separation between test logic and UI interaction.

**Setup Instructions:**
Clone Repository
Install Node
Run npm install

**Cross-Browser Support:**
Chromium
Firefox
Webkit

**How to Run Tests:**
Run all tests - npx playwright test
Run specific suite -
npx playwright test tests/createCustomer.spec.ts
npx playwright test tests/makeDeposit.spec.ts
npx playwright test tests/openAccount.spec.ts

Run specific browser - npx playwright test --project=chromium --headed
Headed mode - npx playwright test --headed
UI mode - npx playwright test --ui

**Reporting:**
npx playwright show-report
