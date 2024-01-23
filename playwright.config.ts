import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
   testDir: './src/tests',
   workers: 4,
   timeout: 50 * 1000,
   expect: {
      timeout: 5000,
   },

   reporter: 'line',
   globalSetup: require.resolve('./global-setup'),

   use: {
      headless: true,
      trace: 'on-first-retry',
      storageState: 'session/auth.json',
   },

   projects: [
      {
         name: 'playwright-e2e-demoblaze',
         use: {
            ...devices['Desktop Chrome'],
         },
      },
   ],
}

export default config
