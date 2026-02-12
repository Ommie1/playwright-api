# API Automation Tests with Playwright

## Overview

This project contains **API automation tests** using **Playwright** with:

- **Faker-generated test data** for unique values  
- **HTML reporting** for test results  
- **Base URL stored in `.env`** for environment configuration  

---

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


---

## Setup

1. **Clone the repository**

```bash
git clone https://github.com/Ommie1/playwright-api.git
cd playwright-api

2. ** Install dependencies **

```bash
npm install

3. ** Running Tests **

```bash
npx playwright test

4. ** HTML Reports **

```bash
npx playwright show-report

## Author
Syed Umair Hassan