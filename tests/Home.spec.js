require('dotenv').config();
const { test, expect } = require('@playwright/test');

test('Check Home page after login', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
    await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForLoadState('networkidle');

    console.log('URL after login:', page.url());
    console.log('Page heading:', await page.locator('h1').allTextContents());
});


test('Verify Browse Events navigation', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
    await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL('https://eventhub.rahulshettyacademy.com/');

   const browseButton = page.getByRole('link', {name: 'Browse Events →'});

    await expect(browseButton).toBeVisible();
    await browseButton.click();

    await expect(page).toHaveURL(/\/events\/?$/);
});



test('Verify My Bookings navigation', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
    await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL('https://eventhub.rahulshettyacademy.com/');

    const bookingsLink = page.getByTestId('nav-bookings');
    await expect(bookingsLink).toBeVisible();
    await bookingsLink.click();
    await expect(page).toHaveURL(/\/bookings\/?$/);
});


test('Verify Events navigation link', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');
    await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
    await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await page.waitForURL('https://eventhub.rahulshettyacademy.com/');

    const eventsLink = page.getByTestId('nav-events');
    await expect(eventsLink).toBeVisible();
    await eventsLink.click();
    await expect(page).toHaveURL(/\/events\/?$/);
});
