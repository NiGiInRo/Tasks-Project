import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry'
  },
  webServer: {
    command: 'npm run start -- --host localhost --port 4200',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 120 * 1000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
});
