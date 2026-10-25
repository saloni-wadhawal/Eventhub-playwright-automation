require('dotenv').config();
const { test, expect } = require('@playwright/test');

test('Verify Events page after login', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  // Verify successful login and home page redirect
  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/');

  // Navigate to the Events page after login
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  // Verify Events page URL
  await expect(page).toHaveURL(/\/events\/?$/);


  await expect(page.getByText('Upcoming Events', { exact: true })).toBeVisible(); 
  await expect(page.getByText('Dilli Diwali Mela', { exact: true })).toBeVisible({ timeout: 10000 });

  // Verify page is visible
  await expect(page.locator('body')).toBeVisible();

  console.log('Page title:', await page.title());
  console.log('Page headings:', await page.locator('h1, h2').allTextContents());

 
console.log('Main content:',
  (await page.locator('main').innerText().catch(() => 'No main element found')).slice(0, 1500)
);

console.log('Buttons:',
  await page.getByRole('button').allTextContents()
);


console.log('Category elements:',
  await page.getByText('Concert', { exact: true }).count()
);

console.log('Concert element tag:',
  await page.getByText('Concert', { exact: true }).first().evaluate(element => element.tagName)
);


const concert = page.getByText('Concert', { exact: true });

console.log('Concert parent HTML:',
  await concert.evaluate(element => element.parentElement.outerHTML)
);

});




test('Verify category filter displays only Concert events', async ({ page }) => {

  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/',{timeout:15000});
  await page.goto("https://eventhub.rahulshettyacademy.com/events");

  const eventCards=page.getByTestId("event-card");
  await page.locator('select').nth(0).selectOption('Concert');
  await page.waitForTimeout(1000);

  console.log('All event cards count:', await page.locator('[data-testid="event-card"]').count());
  console.log('Event card text:', await page.locator('[data-testid="event-card"]').allTextContents());

  await expect(eventCards.first()).toBeVisible();

  const cardCount = await eventCards.count();

  for(let i=0;i<cardCount;i++){
    await expect(eventCards.nth(i)).toContainText('Concert');
  }

});

test('Verify city filter displays matching events',async({page})=>{
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto("https://eventhub.rahulshettyacademy.com/events");

  const cityDropDown=page.locator('select').nth(1);
  const eventCards=page.getByTestId('event-card');

  await cityDropDown.selectOption("Hyderabad");

  await expect(page.getByText('World Tech Summit', { exact: true })).toBeVisible({ timeout: 10000 });

  console.log('Event cards:',await page.getByTestId('event-card').allTextContents());
  console.log('Selected City:', await cityDropDown.inputValue());
  console.log('Event Card Count:',await eventCards.count());
  

  await expect(eventCards.first()).toBeVisible();

});



test('Verify Search By Events & Menu',async({page})=>{
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto("https://eventhub.rahulshettyacademy.com/events");
  await expect(page).toHaveURL(/\/events/);
  await page.locator('input[placeholder*="Search events"]').fill('Hollywood Monsoon Night');
  await expect(page.getByText('Hollywood Monsoon Night — Los Angeles', { exact: true })).toBeVisible();
  
  await expect(
  page.getByText('Dilli Diwali Mela', { exact: true })
).toHaveCount(0);
});


test('Verify Clear Filters functionality', async ({ page }) => {
  // Reuse your existing login steps here
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  await page.locator('select').nth(0).selectOption('Concert');

  await page.getByRole('button', { name: 'Clear filters' }).click();

  await expect(page.locator('select').nth(0)).toHaveValue('');
  await expect(page.locator('select').nth(1)).toHaveValue('');
});


test('Verify Book Now navigation', async ({ page }) => {

  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  // Click the Book Now button for this event
  const eventCard = page.getByTestId('event-card')
  .filter({ hasText: 'Hollywood Monsoon Night — Los Angeles' });

await eventCard.getByTestId('book-now-btn').click();
  // Verify the booking page
  await expect(
  page.getByRole('heading', {
    name: 'Hollywood Monsoon Night — Los Angeles',
    exact: true
  })
).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Confirm Booking' })
  ).toBeVisible();
});




test('Verify ticket quantity and total price update', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  const eventCard = page.getByTestId('event-card')
    .filter({ hasText: 'Hollywood Monsoon Night — Los Angeles' });

  await eventCard.getByTestId('book-now-btn').click();

  
  // Read the current ticket quantity
  const ticketCount = page.locator('#ticket-count');
  const initialQuantity = Number(await ticketCount.textContent());

  // Read the current total price
  const totalPrice = page.getByText(/^\$[\d,]+$/).last();
  const initialTotal = Number(
    (await totalPrice.textContent()).replace(/[$,]/g, '')
  );

  // Click the + button
  await page.getByRole('button', { name: '+' }).click();

  // Verify quantity increases by one
  await expect(ticketCount).toHaveText(String(initialQuantity + 1));

  // Verify total increases by one ticket's price
  await expect(totalPrice).toHaveText(
    '$' + (initialTotal + initialTotal / initialQuantity).toLocaleString('en-US')
  );

});



test('Verify booking form required field validation', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  const eventCard = page.getByTestId('event-card').filter({ hasText: 'Hollywood Monsoon Night — Los Angeles' });

  await eventCard.getByTestId('book-now-btn').click();

  // Click Confirm Booking without entering any details
  await page.getByRole('button', { name: 'Confirm Booking' }).click();

  // Verify validation messages
  await expect(page.getByText('Name must be at least 2 chars')).toBeVisible();
  await expect(page.getByText('Enter a valid email')).toBeVisible();
  await expect(page.getByText('Enter a valid 10-digit phone')).toBeVisible();
});




test('Verify successful event booking', async ({ page }) => {
  // Reuse your existing login steps here
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  await page.goto('https://eventhub.rahulshettyacademy.com/events');

  const eventCard = page.getByTestId('event-card').filter({ hasText: 'Hollywood Monsoon Night — Los Angeles' });
  await eventCard.getByTestId('book-now-btn').click();

  // Fill in the booking form
  await page.locator('#customerName').fill('Saloni Test');
  await page.getByTestId('customer-email').fill('saloni.test@example.com');
  await page.locator('#phone').fill('9876543210');

  // Submit the booking
  await page.getByRole('button', { name: 'Confirm Booking' }).click();

  // Verify booking confirmation
  await expect(page.getByText('Booking Confirmed!')).toBeVisible();

  await expect(page.getByText('Your tickets are reserved.')).toBeVisible();

  await expect(page.getByRole('link', { name: 'View My Bookings' })).toBeVisible();

  await expect(page.getByRole('link', { name: 'Browse More Events' })).toBeVisible();
});


test('Verify booking appears in My Bookings', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL('https://eventhub.rahulshettyacademy.com/',
    { timeout: 15000 }
  );

  await page.goto('https://eventhub.rahulshettyacademy.com/bookings');
  await expect(page.locator('h1')).toHaveText('My Bookings');

  const bookingCard = page
    .getByTestId('booking-card')
    .filter({ hasText: '#39696' });

  await expect(bookingCard).toHaveCount(1);
  await expect(bookingCard).toContainText('Hollywood Monsoon Night');
  await expect(bookingCard).toContainText('confirmed');
  await expect(bookingCard).toContainText('$2,500');
  await expect(
    bookingCard.getByRole('link', { name: 'View Details' })
  ).toBeVisible();
});



test('Verify booking details page', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
    await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/",{timeout:15000});
  // Step 2: Open My Bookings
  await page.goto('https://eventhub.rahulshettyacademy.com/bookings');

  // Step 3: Find the required booking
  const bookingCard = page.getByTestId('booking-card')
  .filter({ hasText: '#39696' });

await expect(bookingCard).toHaveCount(1);

  await expect(bookingCard).toBeVisible();

  // Step 4: Open booking details
  await bookingCard.getByRole('link', { name: 'View Details' }).click();

  // Step 5: Verify booking details page
  await expect(
    page.getByText('Hollywood Monsoon Night — Los Angeles', { exact: true }).first()
  ).toBeVisible();

  await expect(page.getByText('confirmed', { exact: true }).first()).toBeVisible();

  // Step 6: Verify event information
  await expect(page.getByText('Concert', { exact: true })).toBeVisible();
  await expect(page.getByText('Los Angeles', { exact: true })).toBeVisible();

  
  // Step 7: Verify customer and payment information
  await expect(
    page.getByText('$2,500', { exact: true }).first()
  ).toBeVisible();

  // Verify that customer information is displayed
  // without assuming a specific customer name
  await expect(
    page.getByText('Customer', { exact: false }).first()
  ).toBeVisible();

  // Step 8: Verify booking ID and navigation
  // The booking ID should be displayed, but its value can change
  await expect(
    page.getByText(/#\d+/).first()
  ).toBeVisible();

  await expect(
    page.getByRole('link', { name: /Back to My Bookings/ })
  ).toBeVisible();

});



test('Verify booking cancellation confirmation dialog', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(
    'https://eventhub.rahulshettyacademy.com/',
    { timeout: 15000 }
  );

  // Step 2: Open My Bookings
  await page.goto('https://eventhub.rahulshettyacademy.com/bookings');

  // Step 3: Find the Hollywood booking
const bookingCard = page.getByTestId('booking-card')
  .filter({ hasText: '#39696' });

await expect(bookingCard).toHaveCount(1);

  await expect(bookingCard).toBeVisible();

  // Step 4: Open the cancellation dialog
  await bookingCard.getByRole('button', { name: 'Cancel Booking' }).click();

  // Step 5: Verify the dialog and its warning
  const dialog = page.getByRole('dialog');

  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText('Cancel this booking?');
  await expect(dialog).toContainText('This action cannot be undone.');

  // Step 6: Choose Cancel, not Yes, cancel it
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click();

  // Step 7: Verify the dialog closes and booking remains
  await expect(dialog).not.toBeVisible();
  await expect(bookingCard).toBeVisible();
  await expect(bookingCard).toContainText('confirmed');
});



test('Verify successful booking cancellation', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);

  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(
    'https://eventhub.rahulshettyacademy.com/',
    { timeout: 15000 }
  );

  // Step 2: Open My Bookings
  await page.goto('https://eventhub.rahulshettyacademy.com/bookings');

  // Step 3: Locate only the Hollywood booking
  
   const bookingCard = page.getByTestId('booking-card')
  .filter({ hasText: '#39696' });

await expect(bookingCard).toHaveCount(1);

  await expect(bookingCard).toBeVisible();

  // Step 4: Open the cancellation dialog
  await bookingCard.getByRole('button', { name: 'Cancel Booking' }).click();

  const dialog = page.getByRole('dialog');

  await expect(dialog).toBeVisible();

  // Step 5: Confirm cancellation
  await dialog.getByTestId('confirm-dialog-yes').click();

  // Step 6: Verify Hollywood booking is no longer listed
  await expect(bookingCard).toHaveCount(0);

  // Step 7: Verify the Diwali booking remains
  await expect(
    page.getByTestId('booking-card').filter({ hasText: 'Dilli Diwali Mela' })
  ).toBeVisible();
});


test('Verify Clear All Bookings confirmation can be cancelled', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();

  await expect(page).toHaveURL(
    'https://eventhub.rahulshettyacademy.com/',
    { timeout: 15000 }
  );
// Step 2: Open My Bookings
  await page.goto('https://eventhub.rahulshettyacademy.com/bookings');

  const bookingCards = page.getByTestId('booking-card');

  // Step 3: Verify the existing booking is visible
  await expect(
    bookingCards.filter({ hasText: 'Dilli Diwali Mela' })
  ).toBeVisible();

  // Step 4: Cancel the native browser confirmation
  page.once('dialog', async dialog => {
    console.log('Confirmation:', dialog.message());
    await dialog.dismiss();
  });

  await page.getByRole('button', {
    name: 'Clear all bookings'
  }).click();

  // Step 5: Verify the booking still exists
  await expect(
    bookingCards.filter({ hasText: 'Dilli Diwali Mela' })
  ).toBeVisible();
});



test('Verify Logout functionality', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://eventhub.rahulshettyacademy.com/login');

  await page.getByPlaceholder('you@email.com').fill(process.env.EVENTHUB_EMAIL);
  await page.locator('#password').fill(process.env.EVENTHUB_PASSWORD);

  await page.getByRole('button', { name: 'Sign In' }).click();

  // Step 2: Verify successful login
  await expect(page).toHaveURL(
    'https://eventhub.rahulshettyacademy.com/',
    { timeout: 15000 }
  );

  // Step 3: Click Logout
  await page.getByRole('button', { name: 'Logout' }).click();

  // Step 4: Verify login page appears again
  await expect(page.getByRole('heading', {
    name: 'Sign in to EventHub'
  })).toBeVisible();

  await expect(
    page.getByRole('button', { name: 'Sign In' })
  ).toBeVisible();
});
