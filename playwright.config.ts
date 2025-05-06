import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
   testDir: './src/tests',
   workers: 1,
   timeout: 50 * 1000,
   expect: {
      timeout: 5000,
   },

   reporter: 'line',
   use: {
      headless: true,
      trace: 'on-first-retry',
   },

   projects: [
      {
         name: 'setup cookies',
         testMatch: 'global.setup.ts',
      },

      {
         name: 'playwright-e2e-demoblaze',
         use: {
            ...devices['Desktop Chrome'],
            storageState: 'session/auth.json',
         },
         dependencies: ['setup cookies'],
      },
   ],
}

export default config
