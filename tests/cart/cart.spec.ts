import { expect, test, Page } from '@playwright/test';
  
  async function login(page: Page) {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  }
  
test('add products to cart', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  const productCard = page.locator('.inventory_item').filter({
    hasText: 'Sauce Labs Bike Light',  });
  await productCard.getByRole('button', { name: 'Add to cart' }).click();

  await page.locator('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()

  await expect(page.getByRole('button', { name: 'Remove' }).first()).toBeVisible();

  await page.locator('.shopping_cart_link').click();

  await expect(page.getByText('Sauce Labs Bike Light')).toBeVisible();
  await expect(page.locator('.cart_item')).toHaveCount(3);

  const removeItem = page.locator('.cart_item').filter({
    hasText: 'Sauce Labs Fleece Jacket',  });
  await removeItem.getByRole('button', { name: 'Remove' }).click();

  await expect(
    page.locator('.cart_item').filter({ hasText: 'Sauce Labs Fleece Jacket' })
  ).toHaveCount(0);

  await expect(page.locator('.cart_item')).toHaveCount(2);
  await expect(page.locator('.shopping_cart_badge')).toHaveText('2');

});

