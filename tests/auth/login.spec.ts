import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/loginPage';
  
  test('logs in and shows products page', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    
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
test('shows error for invalid login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('wrong_user', 'wrong_pass');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password');
  });
