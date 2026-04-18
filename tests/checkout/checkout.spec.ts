import { expect, test, Page } from '@playwright/test';
  
  async function login(page: Page) {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  }
  
test('user can complete checkout', async ({ page }) => {
  await login(page);

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

