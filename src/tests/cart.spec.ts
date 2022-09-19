import {test, expect} from "@playwright/test"
import { CartPage } from "../pages/cartPage"
import { Urls } from "../common/url"
import {Titles, MoreInformation, Price} from '../data/cart'

let carPage:CartPage

test.beforeEach(async({page})=>{
    carPage = new CartPage(page)
    await page.goto('https://www.demoblaze.com/index.html')
})

test('Нажать на ссылку карточки Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
    await carPage.samsungGalaxySixItem.click()
    await carPage.checkCart(Urls.samsungGalaxySix, Titles.samsungGalaxySix, Price.samsungGalaxySix, MoreInformation.samsungGalaxySix, carPage.imageSamsungGalaxySix)
})

