import { Locator, Page } from '@playwright/test'
import { LoginPage } from '../../loginPage'

export class ContactModal extends LoginPage {
   override readonly page: Page
   readonly exampleModal: Locator
   readonly contactButtonHeader: Locator
   readonly modalTitle: Locator
   readonly crossButtonContact: Locator
   readonly emailField: Locator
   readonly nameField: Locator
   readonly messageField: Locator
   readonly closeButtonContact: Locator
   readonly sendMessageButton: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.exampleModal = page.locator('[id="exampleModal"]')
      this.contactButtonHeader = page.locator('text="Contact"')
      this.modalTitle = page.locator('[id="exampleModalLabel"]')
      this.crossButtonContact = page.locator('text=New message × >> [aria-label="Close"]')
      this.emailField = page.locator('[id="recipient-email"]')
      this.nameField = page.locator('[id="recipient-name"]')
      this.messageField = page.locator('[id="message-text"]')
      this.closeButtonContact = page.locator('#exampleModal >> text=Close')
      this.sendMessageButton = page.locator('#exampleModal >> text=Send message')
   }
}
