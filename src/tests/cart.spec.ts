import {test,expect} from "@playwright/test"
import { CartPage } from "../pages/cartPage"
import {Urls} from "../common/url" 
import {Colors} from "../common/appData" 



test.describe.configure({ mode: 'serial' });

let cartPage: CartPage

test.beforeEach(async({page})=>{
    cartPage = new CartPage(page)
    await page.goto(Urls.homePage)
})


test.describe('Общие проверки страницы карточки', async()=>{

    test('Элементы страницы с карточкой', async()=>{
        await cartPage.samsungGalaxySixItem.click()
        await cartPage.addItem()
        await expect(cartPage.itemsVisibility).not.toBeEmpty()
        await expect(cartPage.products).toBeVisible()
        await expect(cartPage.picture).toBeVisible()
        await expect(cartPage.title).toBeVisible()
        await expect(cartPage.samsungGalaxySix).toBeVisible()
        await expect(cartPage.price).toBeVisible()
        await expect(cartPage.priceSamsungGalaxySix).toBeVisible()
        await expect(cartPage.deleteItem).toBeVisible()
        await expect(cartPage.total).toBeVisible()
        await expect(cartPage.totalSamsungGalaxySix).toBeVisible()
        await expect(cartPage.orderModalButton).toBeVisible()
        await expect(cartPage.orderModalButton).toHaveText('Place Order')
        await expect(cartPage.orderModalButton).toHaveCSS('color',Colors.White)
        await expect(cartPage.orderModalButton).toHaveCSS('background-color',Colors.LightGreen)   
        await cartPage.deleteItems()
    })

    
    test('Элементы страницы без карточки', async()=>{
        await cartPage.page.goto(Urls.cartPage)  
        await expect(cartPage.products).toBeVisible()
        await expect(cartPage.picture).toBeVisible()
        await expect(cartPage.title).toBeVisible()
        await expect(cartPage.price).toBeVisible()
        await expect(cartPage.total).toBeVisible()
        await expect(cartPage.itemsVisibility).toBeEmpty()
        await expect(cartPage.orderModalButton).toBeVisible()
        await expect(cartPage.orderModalButton).toHaveText('Place Order')
        await expect(cartPage.orderModalButton).toHaveCSS('color',Colors.White)
        await expect(cartPage.orderModalButton).toHaveCSS('background-color',Colors.LightGreen) 
        
    })
})


test.describe('Добавление продуктов на страницу Cart', async()=>{

test.describe('Старница по умолчанию', async()=>{
   
    test('Добавить Samsung Galaxy s6 ->  карточка Samsung Galaxy s6 добавлена, данные корректны', async()=>{
        await cartPage.samsungGalaxySixItem.click()
        await cartPage.checkAddCart(cartPage.imageSamsungGalaxySix) 
    })

    test('Добавить Sony Xperia Z5 -> карточка Sony Xperia Z5 добавлена, данные корректны', async()=>{
        await cartPage.sonyXperiazFiveItem.click()
        await cartPage.checkAddCart(cartPage.imagesonyXperiaZFive) 
    })
})


test.describe('Следующая страница', async()=>{

    test.beforeEach(async()=>{
        await cartPage.clickNextButtonOfPagination()
    })

    test('Добавить Samsung Galaxy s6 -> карточка Samsung Galaxy s6 добавлена, данные корректны', async()=>{
        await cartPage.macBookAirItem.click()
        await cartPage.checkAddCart(cartPage.imageMacBook) 
    })

    test('Добавить Sony Xperia Z5 -> карточка Sony Xperia Z5 добавлена, данные корректны', async()=>{
        await cartPage.macBookProItem.click()
        await cartPage.checkAddCart(cartPage.imageMacBook) 
    })
})
})

