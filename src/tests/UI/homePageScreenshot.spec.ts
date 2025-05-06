import { expect, test } from '@playwright/test'
import { AppPage } from '../../pages/applicationPage/appPage'
import dotenv from 'dotenv'

dotenv.config({
   path: '.env.prod',
   override: true,
})

let appPage: AppPage

test.beforeEach(async ({ page }) => {
   appPage = new AppPage(page)
   await appPage.mockResponce(process.env.JSON_MOCK_HOME_PAGE)
   await appPage.page.goto(process.env.HOME)
})

test('Соответствие скриншота cтраницы Home', async () => {
   await expect(appPage.page).toHaveScreenshot('homePage.png')
})
