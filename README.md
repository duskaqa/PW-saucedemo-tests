Playwright QA Automation Project

This project demonstrates end-to-end UI and API testing using Playwright with TypeScript.

🔧 Tech Stack
Playwright (TypeScript)
Git & GitHub
GitHub Actions (CI)
🧪 Test Coverage
✅ UI Tests (SauceDemo)
Login functionality
Product validation
Add to cart
Cart and checkout flow
🌐 API Tests (Automation Exercise)

API tests are implemented using real endpoints from Automation Exercise:

GET /api/productsList
Validate product list is returned
POST /api/verifyLogin (valid credentials)
Verify successful login
POST /api/verifyLogin (invalid credentials)
Validate error handling
POST /api/createAccount
Create new user with dynamic email
⚙️ Continuous Integration

Tests are automatically executed using GitHub Actions on every push.

✔ Installs dependencies
✔ Runs Playwright tests
✔ Reports pass/fail status

🚀 How to Run Tests Locally
npm install
npx playwright test
📌 Notes
API tests use form-data requests
Dynamic data is used to avoid duplicate user creation
Project demonstrates both UI and API testing approaches
🔗 Project Link

https://github.com/duskaqa/PW-saucedemo-tests
