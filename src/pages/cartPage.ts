import { Locator, Page, expect } from '@playwright/test'
import { ItemPage } from './itemPage'
import { urls } from 'src/utlis/urls'

export class CartPage extends ItemPage {
   override readonly page: Page
   readonly deleteItem: Locator
   readonly countItems: Locator
   readonly products: Locator
   readonly picture: Locator
   readonly title: Locator
   readonly priceCart: Locator
   readonly cross: Locator
   readonly samsungGalaxySix: Locator
   readonly priceSamsungGalaxySix: Locator
   readonly totalCart: Locator
   readonly totalSamsungGalaxySix: Locator
   readonly orderModalButton: Locator
   readonly itemsVisibility: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.deleteItem = page.locator('[id="tbodyid"] >> text="Delete"')
      this.products = page.locator('text="Products"')
      this.picture = page.locator('text="Pic"')
      this.title = page.locator('text="Title"')
      this.priceCart = page.locator('text="Price"')
      this.cross = page.locator('text="x"')
      this.samsungGalaxySix = page.locator('text="Samsung galaxy s6"')
      this.priceSamsungGalaxySix = page.locator('text="360"').first()
      this.totalCart = page.locator('text="Total"')
      this.totalSamsungGalaxySix = page.locator('[class="panel-title"]', { hasText: '360' })
      this.orderModalButton = page.locator('[data-target="#orderModal"]')
      this.itemsVisibility = page.locator('[id="tbodyid"]')
   }

   async checkAddCart(locator: Locator): Promise<void> {
      await this.addItem()
      await expect(locator).toBeVisible()
      await this.deleteItems()
   }

   async addItem(): Promise<void> {
      await this.page.waitForTimeout(2000)
      await this.addCart.click()
      await this.page.waitForTimeout(1000)
      await this.page.goto(urls.cart)
   }

   async deleteItems(): Promise<void> {
      await this.page.waitForTimeout(1000)
      await this.deleteItem.click()
      await this.page.waitForTimeout(2000)
   }
   async deleteAllProducts() {
      await this.page.waitForTimeout(3000);
      const deleteButton = this.page.locator('[id="tbodyid"] >> text="Delete"')
      let count = await deleteButton.count();
      while (count > 0) {
         await deleteButton.first().click({ force: true });
         await this.page.waitForTimeout(2000);
         count = await deleteButton.count();
      }
   }
}
