import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';


const config: PlaywrightTestConfig = {
  testDir: './src/tests',
  fullyParallel: true,
  workers: 1,
  timeout: 30 * 1000,
  expect: {
    
    timeout: 5000
  },
 
  reporter: 'line',

  use: {
    headless: false,
    actionTimeout: 0,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],

};

export default config;
