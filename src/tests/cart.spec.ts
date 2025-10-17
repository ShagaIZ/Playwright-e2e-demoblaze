import { test, expect } from '@playwright/test'
import { CartPage } from '../pages/cartPage'
import { Colors } from '../common/appData'
import { urls } from 'src/utlis/urls'


let cartPage: CartPage

test.beforeEach(async ({ page }) => {
   cartPage = new CartPage(page)
   await page.goto(urls.cart)
   await cartPage.deleteAllProducts()
   await page.goto(urls.home)
})

test.describe('Общие проверки страницы карточки', async () => {
   test('Элементы страницы с карточкой', async () => {
      await cartPage.samsungGalaxySixItem.click()
      await cartPage.addItem()
      await cartPage.page.waitForTimeout(1000)
      await expect(cartPage.itemsVisibility).not.toBeEmpty()
      await expect(cartPage.products).toBeVisible()
      await expect(cartPage.picture).toBeVisible()
      await expect(cartPage.title).toBeVisible()
      await expect(cartPage.samsungGalaxySix).toBeVisible()
      await expect(cartPage.priceCart).toBeVisible()
      await expect(cartPage.priceSamsungGalaxySix).toBeVisible()
      await expect(cartPage.deleteItem).toBeVisible()
      await expect(cartPage.totalCart).toBeVisible()
      await expect(cartPage.totalSamsungGalaxySix).toBeVisible()
      await expect(cartPage.orderModalButton).toBeVisible()
      await expect(cartPage.orderModalButton).toHaveText('Place Order')
      await expect(cartPage.orderModalButton).toHaveCSS('color', Colors.White)
      await expect(cartPage.orderModalButton).toHaveCSS('background-color', Colors.LightGreen)
      await cartPage.deleteItems()
   })

   test('Элементы страницы без карточки', async () => {
      await cartPage.page.goto(urls.cart)
      await expect(cartPage.products).toBeVisible()
      await expect(cartPage.picture).toBeVisible()
      await expect(cartPage.title).toBeVisible()
      await expect(cartPage.priceCart).toBeVisible()
      await expect(cartPage.totalCart).toBeVisible()
      await expect(cartPage.itemsVisibility).toBeEmpty()
      await expect(cartPage.orderModalButton).toBeVisible()
      await expect(cartPage.orderModalButton).toHaveText('Place Order')
      await expect(cartPage.orderModalButton).toHaveCSS('color', Colors.White)
      await expect(cartPage.orderModalButton).toHaveCSS('background-color', Colors.LightGreen)
   })
})

test.describe('Добавление продуктов на страницу Cart', async () => {
   test.describe('Старница по умолчанию', async () => {
      test('Добавить Samsung Galaxy s6 ->  карточка Samsung Galaxy s6 добавлена, данные корректны', async () => {
         await cartPage.samsungGalaxySixItem.click()
         await cartPage.checkAddCart(cartPage.imageSamsungGalaxySix)
      })

      test('Добавить Sony Xperia Z5 -> карточка Sony Xperia Z5 добавлена, данные корректны', async () => {
         await cartPage.sonyXperiazFiveItem.click()
         await cartPage.checkAddCart(cartPage.imagesonyXperiaZFive)
      })
   })

   test.describe('Следующая страница', async () => {
      test.beforeEach(async () => {
         await cartPage.clickNextButtonOfPagination()
      })

      test('Добавить Samsung Galaxy s6 -> карточка Samsung Galaxy s6 добавлена, данные корректны', async () => {
         await cartPage.macBookAirItem.waitFor()
         await cartPage.macBookAirItem.click()
         await cartPage.checkAddCart(cartPage.imageMacBook)
      })

      test('Добавить Sony Xperia Z5 -> карточка Sony Xperia Z5 добавлена, данные корректны', async () => {
         await cartPage.macBookProItem.waitFor()
         await cartPage.macBookProItem.click()
         await cartPage.checkAddCart(cartPage.imageMacBook)
      })
   })
})
