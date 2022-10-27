import {test, expect} from "@playwright/test"
import { ItemPage } from "../pages/itemPage"
import { Urls } from "../common/url"
import {Titles, MoreInformation, Price} from '../data/appData'

test.describe.configure({ mode: 'parallel' })

let itemPage:ItemPage

test.beforeEach(async({page})=>{
    itemPage = new ItemPage(page)
    await page.goto('https://www.demoblaze.com/index.html')
})

test.describe('Старница по умолчанию', async()=>{

    test('Нажать на карточку Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
        await itemPage.samsungGalaxySixItem.click()
        await itemPage.checkItem(Urls.samsungGalaxySix, Titles.samsungGalaxySix, Price.samsungGalaxySix, MoreInformation.samsungGalaxySix, itemPage.imageSamsungGalaxySix)
    })

    test('Нажать на карточку Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async()=>{
        await itemPage.sonyXperiazFiveItem.click()
        await itemPage.checkItem(Urls.sonyXperiaZFive, Titles.sonyXperiaZFive, Price.sonyXperiaZFive, MoreInformation.sonyXperiaZFive, itemPage.imagesonyXperiaZFive)
    })
})

test.describe('Следующая страница', async()=>{

    test.beforeEach(async()=>{
        await itemPage.clickNextButtonOfPagination()
    })
    test('Нажать на карточку Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
        await itemPage.macBookAirItem.click()
        await itemPage.checkItem(Urls.macBookAir, Titles.macBookAir, Price.macBookAir, MoreInformation.macBookAir, itemPage.imageMacBook)
    })
        
    test('Нажать на карточку  Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async()=>{
        await itemPage.macBookProItem.click()
        await itemPage.checkItem(Urls.macBookPro, Titles.macBookPro, Price.macBookPro, MoreInformation.macBookPro, itemPage.imageMacBook)
    })
})