# API Automation Tests with Playwright

Playwright enables reliable end-to-end testing for modern web apps.

## Getting Started

Clone the code from repository, https://github.com/Ommie1/playwright-api.git

### Prerequisites

- NodeJS
- Npm

### Installation

In root folder,enter the following command . It will Install all the dependencies present in `package.json`

```
npm install
```

```
npx playwright install
```

## Framework Structure

- **Faker-generated test data** for unique values  
- **HTML reporting** for test results  
- **Base URL stored in `.env`** for environment configuration  

## Project Structure

project-root/
│
├─ tests/ # API test files
│ └─ api.spec.js
│
├─ utils/ # Test data and environment variables
│ ├─ testData.js # Login credentials, Faker data
│ └─ baseUrl.js # Base URL from .env
│
├─ .env # Environment configuration
├─ playwright.config.js # Playwright configuration
└─ README.md # Project documentation and setup

## Running the tests

Run all tests, use following command,

```
npx playwright test
```

## Author

- **Syed Umair Hassan**













































