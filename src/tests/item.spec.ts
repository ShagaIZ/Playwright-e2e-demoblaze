import { test } from '@playwright/test'
import { ItemPage } from '../pages/itemPage'
import { Titles, MoreInformation, Price } from '../common/appData'
import { urls } from 'src/utlis/urls'



let itemPage: ItemPage

test.beforeEach(async ({ page }) => {
   itemPage = new ItemPage(page)
   await page.goto(urls.home)
})

test.describe('Старница по умолчанию', async () => {
   test('Нажать на карточку Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async () => {
      await itemPage.samsungGalaxySixItem.click()
      await itemPage.checkItem(urls.samsungGalaxyCart, Titles.samsungGalaxySix, Price.samsungGalaxySix, MoreInformation.samsungGalaxySix, itemPage.imageSamsungGalaxySix)
   })

   test('Нажать на карточку Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async () => {
      await itemPage.sonyXperiazFiveItem.click()
      await itemPage.checkItem(urls.sonyExperiaCart, Titles.sonyXperiaZFive, Price.sonyXperiaZFive, MoreInformation.sonyXperiaZFive, itemPage.imagesonyXperiaZFive)
   })
})

test.describe('Следующая страница', async () => {
   test.beforeEach(async () => {
      await itemPage.clickNextButtonOfPagination()
   })
   test('Нажать на карточку Samsung Galaxy s6 -> открывается карточка Samsung Galaxy s6, данные корректны', async () => {
      await itemPage.macBookAirItem.waitFor()
      await itemPage.macBookAirItem.click()
      await itemPage.checkItem(urls.macbookAirCart, Titles.macBookAir, Price.macBookAir, MoreInformation.macBookAir, itemPage.imageMacBook)
   })

   test('Нажать на карточку  Sony Xperia Z5 -> открывается карточкаSony Xperia Z5, данные корректны', async () => {
      await itemPage.macBookProItem.waitFor()
      await itemPage.macBookProItem.click()
      await itemPage.checkItem(urls.mackbookProCart, Titles.macBookPro, Price.macBookPro, MoreInformation.macBookPro, itemPage.imageMacBook)
   })
})
