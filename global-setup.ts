import { chromium } from '@playwright/test'
import { Credentials} from './src/data/appData'


const globalSetup = async (): Promise<void> => {
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
}


export default globalSetup