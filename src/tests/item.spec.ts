import { test } from '@playwright/test'
import { ItemPage } from '../pages/itemPage'
import { Titles, MoreInformation, Price } from '../common/appData'
import dotenv from 'dotenv'

dotenv.config({
   path: '.env.prod',
   override: true,
})

let itemPage: ItemPage

test.beforeEach(async ({ page }) => {
   itemPage = new ItemPage(page)
   await page.goto(process.env.HOME)
})

test.describe('Старница по умолчанию', async () => {
   test('Нажать на карточку Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async () => {
      await itemPage.samsungGalaxySixItem.click()
      await itemPage.checkItem(process.env.SAMSUNG_GALAXY_SIX, Titles.samsungGalaxySix, Price.samsungGalaxySix, MoreInformation.samsungGalaxySix, itemPage.imageSamsungGalaxySix)
   })

   test('Нажать на карточку Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async () => {
      await itemPage.sonyXperiazFiveItem.click()
      await itemPage.checkItem(process.env.SONY_XPERIA_Z_FIVE, Titles.sonyXperiaZFive, Price.sonyXperiaZFive, MoreInformation.sonyXperiaZFive, itemPage.imagesonyXperiaZFive)
   })
})

test.describe('Следующая страница', async () => {
   test.beforeEach(async () => {
      await itemPage.clickNextButtonOfPagination()
   })
   test('Нажать на карточку Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async () => {
      await itemPage.macBookAirItem.click()
      await itemPage.checkItem(process.env.MAC_BOOK_AIR, Titles.macBookAir, Price.macBookAir, MoreInformation.macBookAir, itemPage.imageMacBook)
   })

   test('Нажать на карточку  Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async () => {
      await itemPage.macBookProItem.click()
      await itemPage.checkItem(process.env.MAC_BOOK_PRO, Titles.macBookPro, Price.macBookPro, MoreInformation.macBookPro, itemPage.imageMacBook)
   })
})
