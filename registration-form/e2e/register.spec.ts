import { test, expect } from '@playwright/test';
import { first } from 'rxjs';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:4200/register');
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
  await expect(page.getByTitle('password empty').first()).toBeVisible();
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
    
test('should display error for empty Repeat Password field', async ({ page }) => {
  await page.getByPlaceholder('Repeat Password').fill("");
  await page.getByRole('button').click();
  await expect(page.getByTitle('repPassword empty')).toBeVisible();
  });

test('should display error if the Repeat Password does not match the password', async ({ page }) => {
  await page.getByPlaceholder('Enter Password').fill("123456A");
  await page.getByPlaceholder('Repeat Password').fill("123A");
  await page.getByRole('button').click();
  await expect(page.getByTitle('repPassword match')).toBeVisible();
  });

test('should register with valid data', async ({ page }) => {
  await page.getByPlaceholder('Enter Email').fill("user@gmail.com");
  await page.getByPlaceholder('Enter Password').fill("12345678A");
  await page.getByPlaceholder('Repeat Password').fill("12345678A");
  await page.getByRole('button').click();
  await expect(page).toHaveURL('http://localhost:4200/login');
  });
