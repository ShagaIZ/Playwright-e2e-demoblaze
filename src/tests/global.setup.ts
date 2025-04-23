import { chromium, test as setup } from '@playwright/test'
import { Credentials } from 'src/common/appData'

setup('setup cookies', async () => {
   const browser = await chromium.launch()
   const page = await browser.newPage()
   await page.goto('https://www.demoblaze.com/index.html')
   await page.click('[data-target="#logInModal"]')
   await page.fill('[id="loginusername"]', Credentials.CorrectUsername)
   await page.fill('[id="loginpassword"]', Credentials.CorrectPassword)
   await page.click('[onclick="logIn()"]')
   await page.waitForNavigation()
   await page.context().storageState({ path: 'session/auth.json' })
   await browser.close()
})
