import type { PlaywrightTestConfig } from '@playwright/test'
import { devices } from '@playwright/test'

const config: PlaywrightTestConfig = {
   testDir: './src/tests',
   workers: 4,
   timeout: 70 * 1000,
   retries: 1,
   expect: {
      timeout: 10000,
      toMatchSnapshot: {
         maxDiffPixels: 100,
         threshold: 0.1,
      },
   },
   reporter: [['list', { printSteps: true }]],
   use: {
      headless: true,
      trace: 'retain-on-failure',
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
