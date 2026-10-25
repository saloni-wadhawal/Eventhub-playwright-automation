require('dotenv').config();
const { test, expect } = require('@playwright/test');
const email = process.env.EVENTHUB_EMAIL;
const password = process.env.EVENTHUB_PASSWORD;

test('Verify Login page heading', async ({ page }) => {
    await page.goto('https://eventhub.rahulshettyacademy.com/login');

    await expect(
        page.getByRole('heading', { name: 'Sign in to EventHub' })
    ).toBeVisible();
});
test("Login With Valid Password",async({page})=>{
    
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.locator("#password").fill(password);
    await page.getByRole("button",{name:"Sign In"}).click();
    await expect(page.locator("#password")).toBeVisible();
})


test("Login with invalid password", async ({ page }) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill(email);
    await page.locator("#password").fill("WrongPassword123!");
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page.getByText("Invalid email or password")).toBeVisible();
});









