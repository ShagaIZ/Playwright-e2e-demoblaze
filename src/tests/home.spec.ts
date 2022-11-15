import { expect, test } from '@playwright/test'
import { Headers, Categories, Pagination, Colors } from '../common/appData'
import { AppPage } from '../pages/applicationPage/appPage'
import dotenv from 'dotenv'

dotenv.config({
   path: '.env.prod',
   override: true,
})

test.describe.configure({ mode: 'parallel' })

let appPage: AppPage

test.beforeEach(async ({ page }) => {
   appPage = new AppPage(page)
   await appPage.page.goto(process.env.HOME)
})

test.describe('Элементы страницы home', async () => {
   test('Элементы хедера -> отображаются корректно', async () => {
      await expect(appPage.titleOfHeader).toBeVisible()
      await expect(appPage.titleOfHeader).toContainText(Headers.PRODUCT_STORE)
      await expect(appPage.titleOfHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.countOfElementsInTitleOfHeader).toHaveCount(1)
      await expect(appPage.navbarHeaderElement).toBeVisible()
      await expect(appPage.homeButtonHeader).toBeVisible()
      await expect(appPage.homeButtonHeader).toContainText(Headers.Home)
      await expect(appPage.homeButtonHeader).toHaveCSS('color', Colors.DarkGrayishBlue)
      await expect(appPage.contactButtonHeader).toBeVisible()
      await expect(appPage.contactButtonHeader).toContainText(Headers.Contact)
      await expect(appPage.contactButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.aboutUsButtonHeader).toBeVisible()
      await expect(appPage.aboutUsButtonHeader).toContainText(Headers.AboutUs)
      await expect(appPage.aboutUsButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.cartButtonHeader).toBeVisible()
      await expect(appPage.cartButtonHeader).toContainText(Headers.Cart)
      await expect(appPage.cartButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.logoutButtonHeader).toBeVisible()
      await expect(appPage.logoutButtonHeader).toContainText(Headers.Logout)
      await expect(appPage.logoutButtonHeader).toHaveCSS('color', Colors.White)
      await expect(appPage.nameUserButtonHeader).toBeVisible()
      await expect(appPage.nameUserButtonHeader).toContainText(Headers.Name)
      await expect(appPage.nameUserButtonHeader).toHaveCSS('color', Colors.White)
   })

   test('Элементы слайдера товаров -> отображаются корректно', async () => {
      await expect(appPage.sliderWindow).toBeVisible()
      await expect(appPage.sliderWindowPreviousButton).toBeVisible()
      await expect(appPage.sliderWindowNextButton).toBeVisible()
      await expect(appPage.firstButtonInSliderWindow).toBeVisible()
      await expect(appPage.secondButtonInSliderWindow).toBeVisible()
      await expect(appPage.thirdButtonInSliderWindow).toBeVisible()
   })

   test('Элементы блока категории -> отображаются корректно', async () => {
      await expect(appPage.categoriesTitle).toBeVisible()
      await expect(appPage.categoriesTitle).toContainText(Categories.Categories)
      await expect(appPage.categoriesTitle).toHaveCSS('color', Colors.White)
      await expect(appPage.categoryPhones).toBeVisible()
      await expect(appPage.categoryPhones).toContainText(Categories.Phones)
      await expect(appPage.categoryPhones).toHaveCSS('color', Colors.GraniteGray)
      await expect(appPage.categoryLaptops).toBeVisible()
      await expect(appPage.categoryLaptops).toContainText(Categories.Laptops)
      await expect(appPage.categoryLaptops).toHaveCSS('color', Colors.GraniteGray)
      await expect(appPage.categoryMonitors).toBeVisible()
      await expect(appPage.categoryMonitors).toContainText(Categories.Monitors)
      await expect(appPage.categoryMonitors).toHaveCSS('color', Colors.GraniteGray)
   })

   test('Элементы пагинации -> отображаются корректно', async () => {
      await expect(appPage.previousButtonOfPagination).toBeVisible()
      await expect(appPage.previousButtonOfPagination).toContainText(Pagination.Previous)
      await expect(appPage.previousButtonOfPagination).toHaveCSS('color', Colors.DarkBlue)
      await expect(appPage.nextButtonOfPagination).toBeVisible()
      await expect(appPage.nextButtonOfPagination).toContainText(Pagination.Next)
      await expect(appPage.nextButtonOfPagination).toHaveCSS('color', Colors.DarkBlue)
   })
})

test.describe('Действия слайдером', async () => {
   test('Слайд по умолчанию -> отображается первый слайд', async () => {
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.FirstSlide)
   })

   test('Отображается первый слайд, нажать на следующую стрелку -> отображается второй слайд', async () => {
      await appPage.clickSliderWindowNextButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.SecondSlide)
   })

   test('Отображается первый слайд, нажать на предыдущую стрелку -> отображается третий слайд', async () => {
      await appPage.clickSliderWindowPreviousButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.ThirdSlide)
   })

   test('Отображается второй слайд, нажать на следующую стрелку -> отображается третий слайд', async () => {
      await appPage.clickTwiceSliderWindowNextButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.ThirdSlide)
   })

   test('Отображается второй слайд, нажать на предыдущую стрелку -> отображается первый слайд', async () => {
      await appPage.clickSliderWindowNextButton()
      await appPage.clickSliderWindowPreviousButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.FirstSlide)
   })

   test('Отображается третий слайд, нажать на следующую стрелку -> отображается первый слайд', async () => {
      await appPage.clickTwiceSliderWindowNextButton()
      await appPage.clickSliderWindowNextButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.FirstSlide)
   })

   test('Отображается третий слайд, нажать на предыдущую стрелку -> отображается второй слайд', async () => {
      await appPage.clickTwiceSliderWindowNextButton()
      await appPage.clickSliderWindowPreviousButton()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.SecondSlide)
   })

   test('Отображается первый слайд, нажать на вторую кнопку в слайде -> отображается второй слайд', async () => {
      await appPage.clickOnSecondButtonInSliderWindow()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.SecondSlide)
   })

   test('Отображается первый слайд, нажать на третью кнопку в слайде -> отображается третий слайд', async () => {
      await appPage.clickOnThirdButtonInSliderWindow()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.ThirdSlide)
   })

   test('Отображается второй слайд, нажать на третью кнопку в слайде -> отображается третий слайд', async () => {
      await appPage.clickOnSecondButtonInSliderWindow()
      await appPage.clickOnThirdButtonInSliderWindow()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.ThirdSlide)
   })

   test('Отображается второй слайд, нажать на первую кнопку в слайде -> отображается первый слайд', async () => {
      await appPage.clickOnSecondButtonInSliderWindow()
      await appPage.clickOnFirstButtonInSliderWindow()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.FirstSlide)
   })

   test('Отображается третий слайд, нажать на первую кнопку в слайде -> отображается первый слайд', async () => {
      await appPage.clickOnThirdButtonInSliderWindow()
      await appPage.clickOnFirstButtonInSliderWindow()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.FirstSlide)
   })

   test('Отображается третий слайд, нажать на вторую кнопку в слайде -> отображается второй слайд', async () => {
      await appPage.clickOnThirdButtonInSliderWindow()
      await appPage.clickOnSecondButtonInSliderWindow()
      await expect(appPage.activenessOfSlideImg).toHaveAttribute(Categories.Alt, Categories.SecondSlide)
   })
})

test.describe('Пагинация', async () => {
   test('По умолчанию -> отображается 9 позиций первой страницы', async () => {
      await expect(appPage.numberOfItems).toHaveCount(9)
      await expect(appPage.samsungGalaxySixItem).toBeVisible()
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexusSixItem).toBeVisible()
      await expect(appPage.samsungGalaxySevenItem).toBeVisible()
      await expect(appPage.iphoneSixItem).toBeVisible()
      await expect(appPage.sonyXperiazFiveItem).toBeVisible()
      await expect(appPage.htcOnemNineItem).toBeVisible()
      await expect(appPage.sonyVaioiFiveItem).toBeVisible()
      await expect(appPage.sonyVaioiSevenItem).toBeVisible()
   })

   test('Нажать на кнопку пред.страница, первая страница -> остаёмся на первой странице, отображается 9 позиций, вместо samsung galaxy s6--apple monitor', async () => {
      await appPage.clickPreviousButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(9)
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexusSixItem).toBeVisible()
      await expect(appPage.samsungGalaxySevenItem).toBeVisible()
      await expect(appPage.iphoneSixItem).toBeVisible()
      await expect(appPage.sonyXperiazFiveItem).toBeVisible()
      await expect(appPage.htcOnemNineItem).toBeVisible()
      await expect(appPage.sonyVaioiFiveItem).toBeVisible()
      await expect(appPage.sonyVaioiSevenItem).toBeVisible()
      await expect(appPage.appleMonitorItem).toBeVisible()
   })

   test('Перейти на последнюю страницу, первая страница -> осуществляется переход на последнюю страницу, отображается 6 позиций', async () => {
      await appPage.clickNextButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(6)
      await expect(appPage.appleMonitorItem).toBeVisible()
      await expect(appPage.macBookAirItem).toBeVisible()
      await expect(appPage.delliSevenItem).toBeVisible()
      await expect(appPage.dellInchItem).toBeVisible()
      await expect(appPage.asusFullHDItem).toBeVisible()
      await expect(appPage.macBookProItem).toBeVisible()
   })

   test('Перейти на первую страницу из последней странице -> осуществляется переход на первую страницу, отображается 9 позиций, вместо samsung galaxy s6--apple monitor', async () => {
      await appPage.clickNextAfterPreviousButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(9)
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexusSixItem).toBeVisible()
      await expect(appPage.samsungGalaxySevenItem).toBeVisible()
      await expect(appPage.iphoneSixItem).toBeVisible()
      await expect(appPage.sonyXperiazFiveItem).toBeVisible()
      await expect(appPage.htcOnemNineItem).toBeVisible()
      await expect(appPage.sonyVaioiFiveItem).toBeVisible()
      await expect(appPage.sonyVaioiSevenItem).toBeVisible()
      await expect(appPage.appleMonitorItem).toBeVisible()
   })

   test('Перейти на последнюю страницу после перехода из последней в первую -> осуществляется переход на последнюю страницу, отображается 5 позиций, apple monitor--не отображается', async () => {
      await appPage.clickNextAfterPreviousThenNextButtonOfPagination()
      await expect(appPage.numberOfItems).toHaveCount(5)
      await expect(appPage.macBookAirItem).toBeVisible()
      await expect(appPage.delliSevenItem).toBeVisible()
      await expect(appPage.dellInchItem).toBeVisible()
      await expect(appPage.asusFullHDItem).toBeVisible()
      await expect(appPage.macBookProItem).toBeVisible()
   })
})

test.describe('Сортировка по категориям', async () => {
   test('Нажать на Phones -> позиции сортируется по категории Phones', async () => {
      await appPage.categoryPhones.click()
      await expect(appPage.numberOfItems).toHaveCount(7)
      await expect(appPage.samsungGalaxySixItem).toBeVisible()
      await expect(appPage.nokiaLumiaItem).toBeVisible()
      await expect(appPage.nexusSixItem).toBeVisible()
      await expect(appPage.samsungGalaxySevenItem).toBeVisible()
      await expect(appPage.iphoneSixItem).toBeVisible()
      await expect(appPage.sonyXperiazFiveItem).toBeVisible()
      await expect(appPage.htcOnemNineItem).toBeVisible()
   })

   test('Нажать на Laptops -> позиции сортируется по категории Laptops', async () => {
      await appPage.categoryLaptops.click()
      await expect(appPage.numberOfItems).toHaveCount(6)
      await expect(appPage.sonyVaioiFiveItem).toBeVisible()
      await expect(appPage.sonyVaioiSevenItem).toBeVisible()
      await expect(appPage.macBookAirItem).toBeVisible()
      await expect(appPage.delliSevenItem).toBeVisible()
      await expect(appPage.dellInchItem).toBeVisible()
      await expect(appPage.macBookProItem).toBeVisible()
   })

   test('Нажать на Monitors -> позиции сортируется по категории Monitors', async () => {
      await appPage.categoryMonitors.click()
      await expect(appPage.numberOfItems).toHaveCount(2)
      await expect(appPage.appleMonitorItem).toBeVisible()
      await expect(appPage.asusFullHDItem).toBeVisible()
   })
})
