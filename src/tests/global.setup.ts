import { test as setup } from '@playwright/test'
import { Credentials } from 'src/common/userData'
import { LoginPage } from 'src/pages/loginPage'
import { urls } from 'src/utlis/urls'

setup('setup cookies', async ({ page }) => {
   let loginPage: LoginPage = new LoginPage(page)
   await loginPage.page.goto(urls.home)
   await loginPage.loginInModal.click()
   await loginPage.loginUsernameField.fill(Credentials.CorrectUsername)
   await loginPage.loginPasswordField.fill(Credentials.CorrectPassword)
   await loginPage.loginButton.click()
   await loginPage.page.waitForNavigation()
   await loginPage.page.context().storageState({ path: 'session/auth.json' })
   await loginPage.page.close()
})
