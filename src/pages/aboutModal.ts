import { Locator, Page as TYPE_Page } from '@playwright/test'
import { HomePage } from './home'

export class AboutModal extends HomePage {
  override readonly page: TYPE_Page
  readonly videoModal: Locator
  readonly videoModalLabel: Locator
  readonly crossButton: Locator
  readonly closeButton: Locator
  readonly videoBlock: Locator
  readonly modalVisble: Locator

  constructor(page: TYPE_Page) {
    super(page)
    this.page = page
    this.videoModal = page.locator('[id="videoModal"]')
    this.videoModalLabel = page.locator('[id="videoModalLabel"]')
    this.crossButton = page.locator('[class="close"]').nth(3)
    this.closeButton = page.locator('[data-dismiss="modal"]').nth(7)
    this.videoBlock = page.locator('[id="example-video"]')
    this.modalVisble = page.locator('[class="modal fade"]>>[id="videoModalLabel"]')
  }

  async openAboutModal(Username: string, Password: string): Promise<void> {
    await this.page.goto(process.env.HOME!)
    await this.loginInModal.click()
    await this.loginUsernameField.fill(Username)
    await this.loginPasswordField.fill(Password)
    await this.loginButton.click()
    await this.aboutUsButtonHeader.click()
  }
}
