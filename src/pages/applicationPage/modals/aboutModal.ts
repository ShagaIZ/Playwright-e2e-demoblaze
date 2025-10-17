import { Locator, Page } from '@playwright/test'
import { AppPage } from './../appPage'
import dotenv from 'dotenv'
import { url } from 'inspector'
import { urls } from 'src/utlis/urls'

dotenv.config({
   path: '.env.prod',
   override: true,
})

export class AboutModal extends AppPage {
   override readonly page: Page
   readonly videoModal: Locator
   readonly videoModalLabel: Locator
   readonly crossButton: Locator
   readonly closeButton: Locator
   readonly videoBlock: Locator
   readonly modalVisble: Locator

   constructor(page: Page) {
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
      await this.page.goto(urls.home)
      await this.loginInModal.click()
      await this.loginUsernameField.fill(Username)
      await this.loginPasswordField.fill(Password)
      await this.loginButton.click()
      await this.aboutUsButtonHeader.click()
   }
}
