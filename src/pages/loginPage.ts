import { expect, Locator, Page } from '@playwright/test'

export class LoginPage {
   readonly page: Page
   readonly modalWindow: Locator
   readonly loginInModal: Locator
   readonly loginInModalLabel: Locator
   readonly closeModalCross: Locator
   readonly loginUsernameField: Locator
   readonly loginPasswordField: Locator
   readonly closeModalButton: Locator
   readonly loginButton: Locator
   readonly nameOfUser: Locator
   readonly modalFade: Locator

   constructor(page: Page) {
      this.page = page
      this.modalWindow = page.locator('[id="logInModal"]')
      this.loginInModal = page.locator('[data-target="#logInModal"]')
      this.loginInModalLabel = page.locator('[id="logInModalLabel"]')
      this.closeModalCross = page.locator('text=Log in × >> [aria-label="Close"]')
      this.loginUsernameField = page.locator('[id="loginusername"]')
      this.loginPasswordField = page.locator('[id="loginpassword"]')
      this.closeModalButton = page.locator('#logInModal >> text=Close')
      this.loginButton = page.locator('[onclick="logIn()"]')
      this.nameOfUser = page.locator('[id="nameofuser"]')
      this.modalFade = page.locator('[class="modal fade"]')
   }

   async validationDialog(ErrorsText: string) {
      this.page.on('dialog', async dialog => {
         expect(dialog.message()).toContain(ErrorsText)
         await dialog.accept()
      })
   }

   async typeAndLogin(username: string, password: string): Promise<void> {
      await this.loginUsernameField.fill(username)
      await this.loginPasswordField.fill(password)
      await this.loginButton.click()
   }

   async validationNotVisibilityUserName(VerificationText: string): Promise<void> {
      await expect(this.nameOfUser).not.toBeVisible()
      await expect(this.nameOfUser).not.toContainText(VerificationText)
   }

   async validationVisibilityUserName(VerificationText: string): Promise<void> {
      await this.nameOfUser.waitFor()
      await expect(this.nameOfUser).toBeVisible()
      await expect(this.nameOfUser).toContainText(VerificationText)
   }

   async clearUsernameAndPasswordField(): Promise<void> {
      await this.loginUsernameField.click()
      await this.page.keyboard.press('Control+A')
      await this.page.keyboard.press('Backspace')
      await this.loginPasswordField.click()
      await this.page.keyboard.press('Control+A')
      await this.page.keyboard.press('Backspace')
   }
}
