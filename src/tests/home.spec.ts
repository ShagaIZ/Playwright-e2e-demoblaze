import { expect, test } from '@playwright/test'
import { Headers, Categories } from '../data/appData'
import { HomePage } from '../pages/home'


test.describe.configure({ mode: 'parallel' }) 

let homePage:HomePage

test.beforeEach(async({page})=>{
  homePage = new HomePage(page)
  await homePage.page.goto('https://www.demoblaze.com/index.html')
})

test.describe('Элементы страницы home',async()=>{

    test('Элементы хедера -> отображаются корректно', async () => {
        await expect(homePage.titleOfHeader).toBeVisible()
        await expect(homePage.titleOfHeader).toContainText(Headers.PRODUCT_STORE)
        await expect(homePage.countOfElementsInTitleOfHeader).toHaveCount(1)
        await expect(homePage.navbarHeaderElement).toBeVisible()
        await expect(homePage.homeButtonHeader).toBeVisible()
        await expect(homePage.homeButtonHeader).toContainText(Headers.Home)
        await expect(homePage.contactButtonHeader).toBeVisible()
        await expect(homePage.contactButtonHeader).toContainText(Headers.Contact)
        await expect(homePage.aboutUsButtonHeader).toBeVisible()
        await expect(homePage.aboutUsButtonHeader).toContainText(Headers.AboutUs)
        await expect(homePage.cartButtonHeader).toBeVisible()
        await expect(homePage.cartButtonHeader).toContainText(Headers.Cart)
        await expect(homePage.logoutButtonHeader).toBeVisible()
        await expect(homePage.logoutButtonHeader).toContainText(Headers.Logout)
        await expect(homePage.nameUserButtonHeader).toBeVisible()
        await expect(homePage.nameUserButtonHeader).toContainText(Headers.Name)
  })

    test('Элементы слайдера товаров -> отображаются корректно', async () => {
        await expect(homePage.sliderWindow).toBeVisible()
        await expect(homePage.sliderWindowPreviousButton).toBeVisible()
        await expect(homePage.sliderWindowNextButton).toBeVisible()
        await expect(homePage.firstButtonInSliderWindow).toBeVisible()
        await expect(homePage.secondButtonInSliderWindow).toBeVisible()
        await expect(homePage.thirdButtonInSliderWindow).toBeVisible()
    })
 
    test('Элементы блока категории -> отображаются корректно', async () => {
        await expect(homePage.categoriesTitle).toBeVisible()
        await expect(homePage.categoriesTitle).toContainText(Categories.Categories)
        await expect(homePage.categoryPhones).toBeVisible()
        await expect(homePage.categoryPhones).toContainText(Categories.Phones)
        await expect(homePage.categoryLaptops).toBeVisible()
        await expect(homePage.categoryLaptops).toContainText(Categories.Laptops)
        await expect(homePage.categoryMonitors).toBeVisible()
        await expect(homePage.categoryMonitors).toContainText(Categories.Monitors)
  })
})

test.describe('Действия слайдером', async ()=>{

    test('Слайд по умолчанию -> отображается первый слайд', async ()=>{
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.FirstSlide)
    })

    test('Отображается первый слайд, нажать на следующую стрелку -> отображается второй слайд', async ()=>{
        await homePage.clickSliderWindowNextButton()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.SecondSlide)
    })

    test('Отображается первый слайд, нажать на предыдущую стрелку -> отображается третий слайд', async ()=>{
        await homePage.clickSliderWindowPreviousButton()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.ThirdSlide)
    })

    test('Отображается второй слайд, нажать на следующую стрелку -> отображается третий слайд', async ()=>{
        await homePage.clickTwiceSliderWindowNextButton()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.ThirdSlide)
    })
    
    test('Отображается второй слайд, нажать на предыдущую стрелку -> отображается первый слайд', async ()=>{
        await homePage.clickSliderWindowNextButton()
        await homePage.clickSliderWindowPreviousButton()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.FirstSlide)
    })

    test('Отображается третий слайд, нажать на следующую стрелку -> отображается первый слайд', async ()=>{
        await homePage.clickTwiceSliderWindowNextButton()
        await homePage.clickSliderWindowNextButton()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.FirstSlide)
    })

    test('Отображается третий слайд, нажать на предыдущую стрелку -> отображается второй слайд', async ()=>{
        await homePage.clickTwiceSliderWindowNextButton()
        await homePage.clickSliderWindowPreviousButton()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.SecondSlide)
    })

    test('Отображается первый слайд, нажать на вторую кнопку в слайде -> отображается второй слайд', async ()=>{
        await homePage.clickOnSecondButtonInSliderWindow()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.SecondSlide)
    })

    test('Отображается первый слайд, нажать на третью кнопку в слайде -> отображается третий слайд', async ()=>{
        await homePage.clickOnThirdButtonInSliderWindow()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.ThirdSlide)
    })

    test('Отображается второй слайд, нажать на третью кнопку в слайде -> отображается третий слайд', async ()=>{
        await homePage.clickOnSecondButtonInSliderWindow()
        await homePage.clickOnThirdButtonInSliderWindow()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.ThirdSlide)
    })

    test('Отображается второй слайд, нажать на первую кнопку в слайде -> отображается первый слайд', async ()=>{
        await homePage.clickOnSecondButtonInSliderWindow()
        await homePage.clickOnFirstButtonInSliderWindow()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.FirstSlide)
    })

    test('Отображается третий слайд, нажать на первую кнопку в слайде -> отображается первый слайд', async ()=>{
        await homePage.clickOnThirdButtonInSliderWindow()
        await homePage.clickOnFirstButtonInSliderWindow()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.FirstSlide)
    })

    test('Отображается третий слайд, нажать на вторую кнопку в слайде -> отображается второй слайд', async ()=>{
        await homePage.clickOnThirdButtonInSliderWindow()
        await homePage.clickOnSecondButtonInSliderWindow()
        await expect(homePage.activenessOfSlideImg).toHaveAttribute(Categories.Alt,Categories.SecondSlide)
    })
})

test.describe('Пагинация', async()=>{

    test('По умолчанию -> отображается 9 позиций первой страницы', async ()=>{
        await expect(homePage.numberOfItems).toHaveCount(9)
        await expect(homePage.samsungGalaxySixItem).toBeVisible()
        await expect(homePage.nokiaLumiaItem).toBeVisible()
        await expect(homePage.nexusSixItem).toBeVisible()
        await expect(homePage.samsungGalaxySevenItem).toBeVisible()
        await expect(homePage.iphoneSixItem).toBeVisible()
        await expect(homePage.sonyXperiazFiveItem).toBeVisible()
        await expect(homePage.htcOnemNineItem).toBeVisible()
        await expect(homePage.sonyVaioiFiveItem).toBeVisible()
        await expect(homePage.sonyVaioiSevenItem).toBeVisible()
    })

    test('Нажать на кнопку пред.страница, первая страница -> остаёмся на первой странице, отображается 9 позиций, вместо samsung galaxy s6--apple monitor', async ()=>{
        await homePage.clickPreviousButtonOfPagination()
        await expect(homePage.numberOfItems).toHaveCount(9)
        await expect(homePage.nokiaLumiaItem).toBeVisible()
        await expect(homePage.nexusSixItem).toBeVisible()
        await expect(homePage.samsungGalaxySevenItem).toBeVisible()
        await expect(homePage.iphoneSixItem).toBeVisible()
        await expect(homePage.sonyXperiazFiveItem).toBeVisible()
        await expect(homePage.htcOnemNineItem).toBeVisible()
        await expect(homePage.sonyVaioiFiveItem).toBeVisible()
        await expect(homePage.sonyVaioiSevenItem).toBeVisible()
        await expect(homePage.appleMonitorItem).toBeVisible()
    })

    test('Перейти на последнюю страницу, первая страница -> осуществляется переход на последнюю страницу, отображается 6 позиций', async ()=>{
        await homePage.clickNextButtonOfPagination()
        await expect(homePage.numberOfItems).toHaveCount(6)
        await expect(homePage.appleMonitorItem).toBeVisible()
        await expect(homePage.macBookAirItem).toBeVisible()
        await expect(homePage.delliSevenItem).toBeVisible()
        await expect(homePage.dellInchItem).toBeVisible()
        await expect(homePage.asusFullHDItem).toBeVisible()
        await expect(homePage.macBookProItem).toBeVisible()
    })

    test('Перейти на первую страницу из последней странице -> осуществляется переход на первую страницу, отображается 9 позиций, вместо samsung galaxy s6--apple monitor', async ()=>{
        await homePage.clickNextAfterPreviousButtonOfPagination()
        await expect(homePage.numberOfItems).toHaveCount(9)
        await expect(homePage.nokiaLumiaItem).toBeVisible()
        await expect(homePage.nexusSixItem).toBeVisible()
        await expect(homePage.samsungGalaxySevenItem).toBeVisible()
        await expect(homePage.iphoneSixItem).toBeVisible()
        await expect(homePage.sonyXperiazFiveItem).toBeVisible()
        await expect(homePage.htcOnemNineItem).toBeVisible()
        await expect(homePage.sonyVaioiFiveItem).toBeVisible()
        await expect(homePage.sonyVaioiSevenItem).toBeVisible()
        await expect(homePage.appleMonitorItem).toBeVisible()
    })

    test('Перейти на последнюю страницу после перехода из последней в первую -> осуществляется переход на последнюю страницу, отображается 5 позиций, apple monitor--не отображается', async ()=>{
        await homePage.clickNextAfterPreviousThenNextButtonOfPagination()
        await expect(homePage.numberOfItems).toHaveCount(5)
        await expect(homePage.macBookAirItem).toBeVisible()
        await expect(homePage.delliSevenItem).toBeVisible()
        await expect(homePage.dellInchItem).toBeVisible()
        await expect(homePage.asusFullHDItem).toBeVisible()
        await expect(homePage.macBookProItem).toBeVisible()
    })
})

test.describe('Сортировка по категориям', async()=>{

    test('Нажать на Phones -> позиции сортируется по категории Phones', async ()=>{
        await homePage.categoryPhones.click()
        await expect(homePage.numberOfItems).toHaveCount(7)
        await expect(homePage.samsungGalaxySixItem).toBeVisible()
        await expect(homePage.nokiaLumiaItem).toBeVisible()
        await expect(homePage.nexusSixItem).toBeVisible()
        await expect(homePage.samsungGalaxySevenItem).toBeVisible()
        await expect(homePage.iphoneSixItem).toBeVisible()
        await expect(homePage.sonyXperiazFiveItem).toBeVisible()
        await expect(homePage.htcOnemNineItem).toBeVisible()
  })

  test('Нажать на Laptops -> позиции сортируется по категории Laptops', async ()=>{
      await homePage.categoryLaptops.click()
      await expect(homePage.numberOfItems).toHaveCount(6)
      await expect(homePage.sonyVaioiFiveItem).toBeVisible()
      await expect(homePage.sonyVaioiSevenItem).toBeVisible()
      await expect(homePage.macBookAirItem).toBeVisible()
      await expect(homePage.delliSevenItem).toBeVisible()
      await expect(homePage.dellInchItem).toBeVisible()
      await expect(homePage.macBookProItem).toBeVisible()
  })

  test('Нажать на Monitors -> позиции сортируется по категории Monitors', async ()=>{
      await homePage.categoryMonitors.click()
      await expect(homePage.numberOfItems).toHaveCount(2)
      await expect(homePage.appleMonitorItem).toBeVisible()
      await expect(homePage.asusFullHDItem).toBeVisible()
  })
})
