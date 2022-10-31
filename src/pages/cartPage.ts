import { Locator, Page, expect } from "@playwright/test"
import { ItemPage } from "./itemPage"
import {Urls} from "../common/url"

export class CartPage extends ItemPage{
    readonly page: Page
    readonly deleteItem: Locator
    readonly countItems:Locator
    readonly products: Locator
    readonly picture: Locator
    readonly title: Locator
    readonly price: Locator
    readonly cross:Locator
    readonly samsungGalaxySix: Locator
    readonly priceSamsungGalaxySix: Locator
    readonly total:Locator
    readonly totalSamsungGalaxySix: Locator
    readonly orderModalButton:Locator
    readonly itemsVisibility:Locator

    constructor(page:Page){
        super(page)
        this.page = page
        this.deleteItem = page.locator('[id="tbodyid"] >> text="Delete"')
        this.products = page.locator('text="Products"')
        this.picture = page.locator('text="Pic"')
        this.title = page.locator('text="Title"')
        this.price = page.locator('text="Price"')
        this.cross = page.locator('text="x"')
        this.samsungGalaxySix = page.locator('text="Samsung galaxy s6"')
        this.priceSamsungGalaxySix = page.locator('text="360"').first()
        this.total = page.locator('text="Total"')
        this.totalSamsungGalaxySix = page.locator('[class="panel-title"]', {hasText:"360"})
        this.orderModalButton = page.locator('[data-target="#orderModal"]')
        this.itemsVisibility = page.locator('[id="tbodyid"]')


    }

    // Нужно доработать метод, нерабочий

   /* async checkAvailabilityItem(){
        await this.page.goto('https://www.demoblaze.com/cart.html#')
        await this.countItems.waitFor()
        const items:number = await this.countItems.count()
            if(items>0){ 
                for(let i = 0; items >= i; i++){
                    await this.deleteItem.first().click();
                }
            }      
        }*/


    async checkAddCart(locator:Locator):Promise<void>{
        await this.addItem()
        await expect(locator).toBeVisible()
        await this.deleteItems()
        
    }

    async addItem():Promise<void>{
        await this.addCart.click()
        await this.page.waitForLoadState('networkidle')
        await this.page.goto(Urls.cartPage)    
    }

    async deleteItems():Promise<void>{
        await this.deleteItem.click()
        await this.page.waitForLoadState('networkidle')
        await this.page.waitForTimeout(2000)
    }
}