import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',      // All tests will go here
  timeout: 30000,          // 30 seconds per test
  reporter: [
    ['list'], 
    ['html', { outputFolder: 'playwright-report' }]
  ],
  use: {
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
    },
    trace: 'on-first-retry', // optional: capture trace for failed tests
  },
});
