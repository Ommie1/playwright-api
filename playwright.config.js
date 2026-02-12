import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',      // All tests will go here
  timeout: 30000,          // 30 seconds per test
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    baseURL: 'https://automation-backend-ec08fe65847a.herokuapp.com/api/v1', // Replace with your API base URL
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
  },
});
