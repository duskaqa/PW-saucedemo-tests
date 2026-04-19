import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
  
  

  
test('sort products by name', async ({ page }) => {
const loginPage = new LoginPage(page);
await loginPage.goto();
await loginPage.login('standard_user', 'secret_sauce');
        
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

