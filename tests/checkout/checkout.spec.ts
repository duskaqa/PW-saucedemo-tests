import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
  
test('user can complete checkout', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('.shopping_cart_link').click();

  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();
  const priceInCartText = await page.locator('.inventory_item_price').first().textContent();
  if (!priceInCartText) throw new Error('Price not found');
  const priceInCart = parseFloat(priceInCartText.replace('$', ''));
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.locator('#first-name').fill('Duska');
  await page.locator('#last-name').fill('Test');
  await page.locator('#postal-code').fill('11000');
  await page.getByRole('button', { name: 'Continue' }).click();

  await expect(page).toHaveURL(/checkout-step-two/);
  const priceOverviewText = await page.locator('.inventory_item_price').first().textContent();
  const priceOverview = parseFloat(priceOverviewText!.replace('$', ''));
  await expect(page.getByText('Payment Information')).toBeVisible();
  await expect(page.getByText('Shipping Information')).toBeVisible();
  await expect(page.getByText('Price Total')).toBeVisible();
  await page.getByRole('button', { name: 'Finish' }).click();
  expect(priceOverview).toBe(priceInCart);

  await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

