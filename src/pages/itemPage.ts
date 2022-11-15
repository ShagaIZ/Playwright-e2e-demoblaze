import { Locator, Page, expect } from '@playwright/test'
import { AppPage } from './../pages/applicationPage/appPage'
import { Colors } from '../common/appData'

type strAndReg = string | RegExp

export class ItemPage extends AppPage {
   override readonly page: Page
   readonly nameItem: Locator
   readonly priceItem: Locator
   readonly moreInformation: Locator
   readonly addCart: Locator
   readonly imageSamsungGalaxySix: Locator
   readonly imagesonyXperiaZFive: Locator
   readonly imageMacBook: Locator

   constructor(page: Page) {
      super(page)
      this.page = page
      this.nameItem = page.locator('[class="name"]')
      this.priceItem = page.locator('[class="price-container"]')
      this.moreInformation = page.locator('[id="more-information"]')
      this.addCart = page.locator('text="Add to cart"')
      this.imageSamsungGalaxySix = page.locator('[src="imgs/galaxy_s6.jpg"]')
      this.imagesonyXperiaZFive = page.locator('[src="imgs/xperia_z5.jpg"]')
      this.imageMacBook = page.locator('[src="imgs/macbook_air.jpg"]')
   }

   async checkItem(url: strAndReg, nameCartText: strAndReg, priceText: strAndReg, moreInformationText: strAndReg, locator: Locator): Promise<void> {
      await expect(this.page).toHaveURL(url)
      await expect(this.nameItem).toBeVisible()
      await expect(this.nameItem).toHaveText(nameCartText)
      await expect(this.priceItem).toBeVisible()
      await expect(this.priceItem).toHaveText(priceText)
      await expect(this.moreInformation).toBeVisible()
      await expect(this.moreInformation).toHaveText(moreInformationText)
      await expect(this.addCart).toBeVisible()
      await expect(this.addCart).toHaveCSS('color', Colors.White)
      await expect(this.addCart).toHaveCSS('background-color', Colors.LightGreen)
      await expect(locator).toBeVisible()
   }
}
