import { expect, test, Page } from '@playwright/test';

  
  async function login(page: Page) {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  }
  
test('sort products by name', async ({ page }) => {
  await login(page);

  const productName = await page.locator('.inventory_item_name').allTextContents();

  await page.locator('.product_sort_container').selectOption('az');

  const sortAtoZ = await page.locator('.inventory_item_name').allTextContents();

  const sortAtoZExpected = [...productName].sort();

  expect(sortAtoZ).toEqual(sortAtoZExpected);

  await page.locator('.product_sort_container').selectOption('za');

  const sortZtoA = await page.locator('.inventory_item_name').allTextContents();

  const sortZtoAExpected = [...productName].sort().reverse();

  expect(sortZtoA).toEqual(sortZtoAExpected);
});

