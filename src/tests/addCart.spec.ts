import {test,expect} from "@playwright/test"
import { AddCartPage } from "../pages/addCartPage"


test.describe.configure({ mode: 'serial' });

let addCartPage: AddCartPage

test.beforeEach(async({page})=>{
    addCartPage = new AddCartPage(page)
    await page.goto('https://www.demoblaze.com/index.html')
})


test.describe('Старница по умолчанию', async()=>{
   
    test('Нажать на ссылку карточки Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
        await addCartPage.samsungGalaxySixItem.click()
        await addCartPage.checkAddCart(addCartPage.imageSamsungGalaxySix) 
    })

    test('Нажать на ссылку карточки Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async()=>{
        await addCartPage.sonyXperiazFiveItem.click()
        await addCartPage.checkAddCart(addCartPage.imagesonyXperiaZFive) 
    })
})

test.describe('Следующая страница', async()=>{

    test.beforeEach(async()=>{
        await addCartPage.clickNextButtonOfPagination()
    })

    test('Нажать на ссылку карточки Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async()=>{
        await addCartPage.macBookAirItem.click()
        await addCartPage.checkAddCart(addCartPage.imageMacBook) 
    })

    test('Нажать на ссылку карточки Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async()=>{
        await addCartPage.macBookProItem.click()
        await addCartPage.checkAddCart(addCartPage.imageMacBook) 
    })
})
