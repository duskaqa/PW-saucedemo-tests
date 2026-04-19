# Playwright E2E Tests – SauceDemo

This project contains end-to-end automated tests for the SauceDemo application using Playwright.

## 🔧 Tech Stack

* Playwright
* TypeScript
* Node.js

## 📁 Test Structure

* **auth** – login tests
* **cart** – add/remove products
* **checkout** – complete checkout flow + price validation
* **sorting** – product sorting (A-Z, Z-A)

## ✅ Test Scenarios Covered

* User login
* Adding products to cart
* Removing products from cart
* Cart badge validation
* Checkout process
* Price consistency between Cart and Checkout
* Product sorting

## ▶️ How to Run Tests

```bash
npx playwright test
```

## 📌 Notes

This project is part of my QA automation practice and demonstrates real-world E2E scenarios.
