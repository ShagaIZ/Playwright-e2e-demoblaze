import {test, expect} from "@playwright/test"
import { CartPage } from "../pages/cartPage"
import { Urls } from "../common/url"
import {Titles, MoreInformation, Price} from '../data/cart'

let cartPage:CartPage

test.beforeEach(async({page})=>{
    cartPage = new CartPage(page)
    await page.goto('https://www.demoblaze.com/index.html')
})

test.describe('Старница по умолчанию', async()=>{
    test('Нажать на ссылку карточки Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
        await cartPage.samsungGalaxySixItem.click()
        await cartPage.checkCart(Urls.samsungGalaxySix, Titles.samsungGalaxySix, Price.samsungGalaxySix, MoreInformation.samsungGalaxySix, cartPage.imageSamsungGalaxySix)
    })

    test('Нажать на ссылку карточки Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async()=>{
        await cartPage.sonyXperiazFiveItem.click()
        await cartPage.checkCart(Urls.sonyXperiaZFive, Titles.sonyXperiaZFive, Price.sonyXperiaZFive, MoreInformation.sonyXperiaZFive, cartPage.imagesonyXperiaZFive)
    })
})

test.describe('Следующая страница', async()=>{

    test.beforeEach(async()=>{
        await cartPage.clickNextButtonOfPagination()
    })
        test('Нажать на ссылку карточки Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
        await cartPage.macBookAirItem.click()
        await cartPage.checkCart(Urls.macBookAir, Titles.macBookAir, Price.macBookAir, MoreInformation.macBookAir, cartPage.imageMacBook)
    })
        
        test('Нажать на ссылку карточки Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async()=>{
        await cartPage.macBookProItem.click()
        await cartPage.checkCart(Urls.macBookPro, Titles.macBookPro, Price.macBookPro, MoreInformation.macBookPro, cartPage.imageMacBook)
    })
})