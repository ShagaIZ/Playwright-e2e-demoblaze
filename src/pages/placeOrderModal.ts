import { Page, Locator, expect } from '@playwright/test'
import { CartPage } from './cartPage'
import { Colors, ModalVisibility } from '../common/appData'

export class PlaceOrderModal extends CartPage {
   override readonly page: Page
   readonly modalTitle: Locator
   readonly orderModal: Locator
   readonly crossButton: Locator
   readonly totalOrder: Locator
   readonly nameTitle: Locator
   readonly nameField: Locator
   readonly countryTitle: Locator
   readonly countryField: Locator
   readonly cityTitle: Locator
   readonly cityField: Locator
   readonly creditCardTitle: Locator
   readonly creditCardField: Locator
   readonly monthTitle: Locator
   readonly monthField: Locator
   readonly yearTitle: Locator
   readonly yearField: Locator
   readonly closeButton: Locator
   readonly purchaseButton: Locator
   readonly alertOfSuccess: Locator
   readonly alertOfSuccessTitle: Locator
   readonly infomartion: Locator
   readonly orderId: Locator
   readonly amountSamsungGalaxySix: Locator
   readonly cardNumber: Locator
   readonly nameClient: Locator
   readonly confirmButton: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.modalTitle = page.locator('[class="modal fade show"]>>[id="orderModalLabel"]')
      this.orderModal = page.locator('[id="orderModal"]')
      this.crossButton = page.locator('text=Place order × >> [aria-label="Close"]')
      this.totalOrder = page.locator('[id="totalm"]')
      this.nameTitle = page.locator('text="Name:"')
      this.nameField = page.locator('[id="name"]')
      this.countryTitle = page.locator('text="Country:"')
      this.countryField = page.locator('[id="country"]')
      this.cityTitle = page.locator('text="City:"')
      this.cityField = page.locator('[id="city"]')
      this.creditCardTitle = page.locator('text="Credit card:"')
      this.creditCardField = page.locator('[id="card"]')
      this.monthTitle = page.locator('text="Month:"')
      this.monthField = page.locator('[id="month"]')
      this.yearTitle = page.locator('text="Year:"')
      this.yearField = page.locator('[id="year"]')
      this.closeButton = page.locator('#orderModal >> text=Close')
      this.purchaseButton = page.locator('text="Purchase"')
      this.alertOfSuccess = page.locator('[class="sweet-alert  showSweetAlert visible"]')
      this.alertOfSuccessTitle = page.locator('text="Thank you for your purchase!"')
      this.infomartion = page.locator('[class="lead text-muted "]')
      this.orderId = page.locator(`text="Id:${new RegExp('^[0-9]+$')}"`)
      this.amountSamsungGalaxySix = page.locator('[data-animation="pop"] >> text="Amount: 360 USD"')
      this.cardNumber = page.locator('text="Card Number: 1232564789532154"')
      this.nameClient = page.locator('text="Name: Zod"')
      this.confirmButton = page.locator('[class="sa-button-container"] >> text="OK"')
   }

   async checkModal(total: string): Promise<void> {
      await this.page.waitForLoadState('networkidle')
      await expect(this.orderModal).toHaveAttribute('class', ModalVisibility.ModalFadeShow)
      await expect(this.modalTitle).toHaveText('Place order')
      await expect(this.crossButton).toBeVisible()
      await expect(this.totalOrder).toBeVisible()
      await expect(this.totalOrder).toHaveText(total)
      await expect(this.nameTitle).toBeVisible()
      await expect(this.nameField).toBeVisible()
      await expect(this.nameField).toBeEditable()
      await expect(this.countryTitle).toBeVisible()
      await expect(this.countryField).toBeVisible()
      await expect(this.countryField).toBeEditable()
      await expect(this.cityTitle).toBeVisible()
      await expect(this.cityField).toBeVisible()
      await expect(this.cityField).toBeEditable()
      await expect(this.creditCardTitle).toBeVisible()
      await expect(this.creditCardField).toBeVisible()
      await expect(this.creditCardField).toBeEditable()
      await expect(this.monthTitle).toBeVisible()
      await expect(this.monthField).toBeVisible()
      await expect(this.monthField).toBeEditable()
      await expect(this.yearTitle).toBeVisible()
      await expect(this.yearField).toBeVisible()
      await expect(this.yearField).toBeEditable()
      await expect(this.closeButton).toBeVisible()
      await expect(this.closeButton).toHaveCSS('color', Colors.Onyx)
      await expect(this.closeButton).toHaveCSS('background-color', Colors.White)
      await expect(this.purchaseButton).toBeVisible()
      await expect(this.purchaseButton).toHaveCSS('color', Colors.White)
      await expect(this.purchaseButton).toHaveCSS('background-color', Colors.DarkBlue)
   }
}
