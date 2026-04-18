import { expect, test, Page } from '@playwright/test';

  
  async function login(page: Page) {
    await page.goto('https://www.saucedemo.com');
    await page.locator('#user-name').fill('standard_user')
    await page.locator('#password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  }
  test('logs in and shows products page', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.locator('.title')).toHaveText('Products'); 
    const items = page.locator('.inventory_item');
    await expect(items).toHaveCount(6);
    const count = await items.count();

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);
    await expect(item.locator('.inventory_item_name')).toBeVisible();
    await expect(item.locator('.inventory_item_desc')).toBeVisible();
    await expect(item.locator('.inventory_item_price')).toBeVisible();
    await expect(item.locator('img')).toBeVisible();
    await expect(item.getByRole('button', { name: 'Add to cart' })).toBeVisible();
  }
});

