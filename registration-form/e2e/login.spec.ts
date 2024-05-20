import { test, expect } from '@playwright/test';
import assert from 'assert';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/login');
  });

test('should display error for empty email field', async ({ page }) => {
    await page.getByPlaceholder('Enter Email').fill("");
    await page.getByRole('button').click();
    await expect(page.getByTitle('email empty')).toBeVisible();
    });

test('should display error for invalid email format', async ({ page }) => {
    await page.getByPlaceholder('Enter Email').fill("user");
    await page.getByRole('button').click();
    await expect(page.getByTitle('email valid')).toBeVisible();
    });

test('should display error for empty password field', async ({ page }) => {
    await page.getByPlaceholder('Enter Password').fill("");
    await page.getByRole('button').click();
    await expect(page.getByTitle('password empty')).toBeVisible();
    });

  
test('should display error if the password is less than 6 characters long', async ({ page }) => {
    await page.getByPlaceholder('Enter Password').fill("1234A");
    await page.getByRole('button').click();
    await expect(page.getByTitle('password short')).toBeVisible();
    });
    
test('should display error if the password does not contain an uppercase letter', async ({ page }) => {
    await page.getByPlaceholder('Enter Password').fill("123456");
    await page.getByRole('button').click();
    await expect(page.getByTitle('password upcase')).toBeVisible();
    });

test('should display a massege if the email or password is invalid', async ({ page }) => {
    let getText = page.getByText('Invalid email or password');

    await page.getByPlaceholder('Enter Email').fill('user123@gmail.com');
    await page.getByPlaceholder('Enter Password').fill('12345678Aa');
    await page.getByRole('button').click();
    await expect(getText.first()).toBeVisible();
    });



test('should register and then login with the same user', async ({ page }) => {
    const user = 'user@gmail.com';
    const password = '123456ABC';
    const getText = page.getByText('Login successful!');
    
    await page.goto('http://localhost:4200/register');
    
    await page.getByPlaceholder('Enter Email').fill(user);
    await page.getByPlaceholder('Enter Password').fill(password);
    await page.getByPlaceholder('Repeat Password').fill(password);
    await page.getByRole('button').click();
    
    await expect(page).toHaveURL('http://localhost:4200/login');
    
    await page.getByPlaceholder('Enter Email').fill(user);
    await page.getByPlaceholder('Enter Password').fill(password);
    await page.getByRole('button').click();

    await expect(getText).toBeVisible();
    });