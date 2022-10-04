import { Locator, Page, expect } from "@playwright/test"
import { ItemPage } from "./itemPage"

export class AddCartPage extends ItemPage{
    readonly page: Page
    readonly deleteItem: Locator
    readonly countItems:Locator

    constructor(page:Page){
        super(page)
        this.page = page
        this.deleteItem = page.locator('text="Delete"')
        this.countItems = page.locator('[id="tbodyid"] >> text=Delete')

    }

    // Нужно доработать метод

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


    async checkAddCart(locator:Locator){
        await this.addCart.click()
        await this.page.waitForLoadState('networkidle')
        await this.page.goto('https://www.demoblaze.com/cart.html#')
        await expect(locator).toBeVisible()
        await this.deleteItem.click()
        await this.page.waitForLoadState('networkidle')
    }
}