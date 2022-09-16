import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page
  readonly modalWindow:Locator
  readonly loginInModal:Locator
  readonly loginInModalLabel:Locator
  readonly closeModalCross:Locator
  readonly loginUsernameField:Locator
  readonly loginPasswordField:Locator
  readonly closeModalButton:Locator
  readonly loginButton:Locator
  readonly nameOfUser:Locator
  readonly modalFade:Locator

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

  async typeUsernameField(username:string){
    await this.loginUsernameField.click()
    await this.loginUsernameField.type(username)
  }

  async typePasswordField(password:string){
    await this.loginPasswordField.click();
    await this.loginPasswordField.type(password)
  }

  async validationDialog(ErrorsText:string){
    this.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText)
      await dialog.accept()
      })
  }

  async typeAndLogin(NotUsername:string,NotPassword:string){
    await this.typeUsernameField(NotUsername)
    await this.typePasswordField(NotPassword)
    await this.loginButton.click()
  }

  async validationNotVisibilityUserName(VerificationText:string){
    await expect(this.nameOfUser).not.toBeVisible()
    await expect(this.nameOfUser).not.toContainText(VerificationText)
  }

  async validationVisibilityUserName(VerificationText:string){
    await expect(this.nameOfUser).toBeVisible()
    await expect(this.nameOfUser).toContainText(VerificationText)
  }

  async clearUsernameAndPasswordField(){
    await this.loginUsernameField.click()
    await this.page.keyboard.press('Control+A')
    await this.page.keyboard.press('Backspace')
    await this.loginPasswordField.click()
    await this.page.keyboard.press('Control+A')
    await this.page.keyboard.press('Backspace')
  }

  async loadPage():Promise<void>{
    await this.page.waitForLoadState('load')
    await this.page.waitForLoadState('domcontentloaded')
    await this.page.waitForLoadState('networkidle')
}
}