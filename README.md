# EventHub Playwright Automation

## Project Overview

This project automates functional testing of the EventHub web application using Playwright and JavaScript. It focuses on validating important user workflows and checking that the application behaves as expected.


## Technologies Used

- JavaScript

- Playwright

- Node.js

- Git and GitHub



## Test Coverage

\- Login page heading validation

\- Login with valid and invalid credentials

\- Home page navigation

\- Event category and city filters

\- Event search

\- Event booking and ticket quantity

\- Booking form validation

\- My Bookings page

\- Booking cancellation and confirmation

\- Logout functionality



## Test Execution

The project uses Playwright Test to execute automated browser tests.



### Prerequisites

\- Node.js installed

\- npm installed



### Setup

Clone the repository:



```bash

git clone https://github.com/saloni-wadhawal/Eventhub-playwright-automation.git

cd Eventhub-playwright-automation

npm install

npx playwright install

```



### Run the tests



Run all tests:



```bash

npx playwright test --workers=1

```



Run tests in headed mode:



```bash

npx playwright test --headed

```



Open the HTML report:



```bash

npx playwright show-report

```



## Test Credentials

Store test credentials in a local `.env` file. Never commit passwords or other secrets to GitHub. Configure the required environment variables before running tests that need login.



## Author

Saloni Wadhawal
GitHub: https://github.com/saloni-wadhawal



