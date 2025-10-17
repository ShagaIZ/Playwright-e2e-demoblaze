import { expect, test } from '@playwright/test'
import { AppPage } from '../../pages/applicationPage/appPage'
import { urls } from 'src/utlis/urls'

let appPage: AppPage

test.beforeEach(async ({ page }) => {
   appPage = new AppPage(page)
   await appPage.mockResponce(urls.homePageJson)
   await appPage.page.goto(urls.home)
   await appPage.page.waitForLoadState('load')
})

test('Соответствие скриншота cтраницы Home', async () => {
   await appPage.page.waitForTimeout(2000)
   await expect(appPage.page).toHaveScreenshot('homePage.png')
})
