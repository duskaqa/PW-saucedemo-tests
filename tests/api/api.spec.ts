import { test, expect } from '@playwright/test';

test('GET products list', async ({ request }) => {
    const response = await request.get('https://automationexercise.com/api/productsList');
  
    expect(response.status()).toBe(200);
  
    const body = await response.json();
  
    expect(body.products.length).toBeGreaterThan(0);
  });

  test('POST verify login with valid credentials', async ({ request }) => {
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
      form: {
        email: 'duska@duska.com',
        password: 'Psw123'
      }
    });
  
    expect(response.status()).toBe(200);
  
    const body = await response.json();
  
    expect(body.message).toBe('User exists!');
  });