import { Locator, Page, expect } from "@playwright/test"
import { HomePage } from "./home"


type strAndReg = string | RegExp

export class CartPage extends HomePage {
    readonly page: Page
    readonly nameCart:Locator
    readonly price: Locator
    readonly moreInformation: Locator
    readonly addCart: Locator
    readonly imageSamsungGalaxySix: Locator
    readonly imagesonyXperiaZFive: Locator
    readonly imageMacBook: Locator



    constructor(page:Page){
        super(page)
        this.page = page
        this.nameCart = page.locator('[class="name"]')
        this.price = page.locator('[class="price-container"]')
        this.moreInformation = page.locator('[id="more-information"]')
        this.addCart = page.locator('text="Add to cart"')
        this.imageSamsungGalaxySix = page.locator('[src="imgs/galaxy_s6.jpg"]')
        this.imagesonyXperiaZFive = page.locator('[src="imgs/xperia_z5.jpg"]')
        this.imageMacBook = page.locator('[src="imgs/macbook_air.jpg"]')
    }

    async checkCart(url:strAndReg, nameCartText:strAndReg, priceText: strAndReg, moreInformationText: strAndReg, locator: Locator){
        await expect(this.page).toHaveURL(url)
        await expect(this.nameCart).toBeVisible()
        await expect(this.nameCart).toHaveText(nameCartText)
        await expect(this.price).toBeVisible()
        await expect(this.price).toHaveText(priceText)
        await expect(this.moreInformation).toBeVisible()
        await expect(this.moreInformation).toHaveText(moreInformationText)
        await expect(this.addCart).toBeVisible()
        await expect(locator).toBeVisible()
    }
}