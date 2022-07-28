import { expect } from '@playwright/test';
import { DataString, Credentials, DataNumber } from '../data/home';
import {test} from '../fixtures/home';
import { HomePage } from '../pages/home';


test.beforeEach(async({homePage})=>{
  await homePage.openDemoblaze();
  await homePage.clickLoginInModal();
  await homePage.typeUsernameField(Credentials.Username);
  await homePage.typePasswordField(Credentials.Password);
  await homePage.clickLoginButton();
});

test.describe('Элементы страницы home',async()=>{

  test.describe('Хедер страницы', async()=>{
    
    test('Логотип -> отображается корректно, расположен верхнем в правом углу', async ({homePage}) => {
      await expect(homePage.titleOfHeader).toBeVisible();
      await expect(homePage.titleOfHeader).toContainText(DataString.PRODUCT_STORE);
      await expect(homePage.countOfElementsInTitleOfHeader).toHaveCount(DataNumber.NumberOfElementsInNavbarBrend);
    });

    test('Сайдбар -> отображается корректно, расположен по центру в хедере', async ({homePage}) => {
      await expect(homePage.navbarHeaderElement).toBeVisible();
    });

    test('Кнопка Home  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.homeButtonHeader).toBeVisible();
      await expect(homePage.homeButtonHeader).toContainText(DataString.Home);
    });

    test('Кнопка Contact  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.contactButtonHeader).toBeVisible();
      await expect(homePage.contactButtonHeader).toContainText(DataString.Contact);
    });

    test('Кнопка About us  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.aboutUsButtonHeader).toBeVisible();
      await expect(homePage.aboutUsButtonHeader).toContainText(DataString.AboutUs);
    });

    test('Кнопка Cart  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.cartButtonHeader).toBeVisible();
      await expect(homePage.cartButtonHeader).toContainText(DataString.Cart);
    });

    test('Кнопка Log Out  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.logoutButtonHeader).toBeVisible();
      await expect(homePage.logoutButtonHeader).toContainText(DataString.Logout);
    });

    test('Кнопка "currenUser"  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.nameUserButtonHeader).toBeVisible();
      await expect(homePage.nameUserButtonHeader).toContainText(DataString.Name);
    });
  });

  test.describe('Слайдер товаров', async()=>{

    test('Слайдер товаров -> отображается корректно', async ({homePage}) => {
      await expect(homePage.sliderWindow).toBeVisible();
    });  

    test('Кнопка назад -> отображается корректно', async ({homePage}) => {
      await expect(homePage.sliderWindowPreviousButton).toBeVisible();
    });  

    test('Кнопка вперёд -> отображается корректно', async ({homePage}) => {
      await expect(homePage.sliderWindowNextButton).toBeVisible();
    });
    
    test('Кнопка первый слайдер -> отображается корректно', async ({homePage}) => {
      await expect(homePage.firstButtonInSliderWindow).toBeVisible();
    });  

    test('Кнопка второй слайдер -> отображается корректно', async ({homePage}) => {
      await expect(homePage.secondButtonInSliderWindow).toBeVisible();
    });

    test('Кнопка третий слайдер -> отображается корректно', async ({homePage}) => {
      await expect(homePage.thirdButtonInSliderWindow).toBeVisible();
    });
  });
  
  test.describe('Категория', async()=>{

    test('Тайтл категории -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoriesTitle).toBeVisible();
      await expect(homePage.categoriesTitle).toContainText(DataString.PRODUCT_STORE);
    });

    test('Категория Phones -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryPhones).toBeVisible();
      await expect(homePage.categoryPhones).toContainText(DataString.Phones);
    });

    test('Категория Laptops -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryLaptops).toBeVisible();
      await expect(homePage.categoryLaptops).toContainText(DataString.Laptops);
    });

    test('Категория Monitors -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryMonitors).toBeVisible();
      await expect(homePage.categoryMonitors).toContainText(DataString.Monitors);
    }); 
  });
});
test.describe('Действия слайдером', async ()=>{

  test('Слайд по умолчанию -> отображается первый слайд', async ({homePage})=>{
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.FirstSlide);
  });

  test('Отображается первый слайд, нажать на следующую стрелку -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.SecondSlide);
  });

  test('Отображается первый слайд, нажать на предыдущую стрелку -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.ThirdSlide);
  });

  test('Отображается второй слайд, нажать на следующую стрелку -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.ThirdSlide);
  });

  test('Отображается второй слайд, нажать на предыдущую стрелку -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.FirstSlide);
  });

  test('Отображается третий слайд, нажать на следующую стрелку -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.FirstSlide);
  });

  test('Отображается третий слайд, нажать на предыдущую стрелку -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.SecondSlide);
  });

  test('Отображается первый слайд, нажать на вторую кнопку в слайде -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickOnSecondButtonInSliderWindow();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.SecondSlide);
  });

  test('Отображается первый слайд, нажать на третью кнопку в слайде -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickOnThirdButtonInSliderWindow();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.ThirdSlide);
  });

  test('Отображается второй слайд, нажать на третью кнопку в слайде -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickOnSecondButtonInSliderWindow();
    await homePage.clickOnThirdButtonInSliderWindow();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.ThirdSlide);
  });

  test('Отображается второй слайд, нажать на первую кнопку в слайде -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickOnSecondButtonInSliderWindow();
    await homePage.clickOnFirstButtonInSliderWindow();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.FirstSlide);
  });

  test('Отображается третий слайд, нажать на первую кнопку в слайде -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickOnThirdButtonInSliderWindow();
    await homePage.clickOnFirstButtonInSliderWindow();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.FirstSlide);
  });

  test('Отображается третий слайд, нажать на вторую кнопку в слайде -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickOnThirdButtonInSliderWindow();
    await homePage.clickOnSecondButtonInSliderWindow();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.Alt,DataString.SecondSlide);
  });
})

test.describe('Пагинация', async()=>{

  test('По умолчанию -> отображается 9 позиций первой страницы', async ({homePage})=>{
    await expect(homePage.numberOfItems).toHaveCount(9);
    await expect(homePage.samsungGalaxySixItem).toBeVisible();
    await expect(homePage.nokiaLumiaItem).toBeVisible();
    await expect(homePage.nexusSixItem).toBeVisible();
    await expect(homePage.samsungGalaxySevenItem).toBeVisible();
    await expect(homePage.iphoneSixItem).toBeVisible();
    await expect(homePage.sonyXperiazFiveItem).toBeVisible();
    await expect(homePage.htcOnemNineItem).toBeVisible();
    await expect(homePage.sonyVaioiFiveItem).toBeVisible();
    await expect(homePage.sonyVaioiSevenItem).toBeVisible();
  });

  test('Нажать на кнопку пред.страница, первая страница по умолчанию -> остаёмся на первой странице, отображается 9 позиций, вместо samsung galaxy s6--apple monitor', async ({homePage})=>{
    await homePage.clickPreviousButtonOfPagination();
    await expect(homePage.numberOfItems).toHaveCount(9);
    await expect(homePage.nokiaLumiaItem).toBeVisible();
    await expect(homePage.nexusSixItem).toBeVisible();
    await expect(homePage.samsungGalaxySevenItem).toBeVisible();
    await expect(homePage.iphoneSixItem).toBeVisible();
    await expect(homePage.sonyXperiazFiveItem).toBeVisible();
    await expect(homePage.htcOnemNineItem).toBeVisible();
    await expect(homePage.sonyVaioiFiveItem).toBeVisible();
    await expect(homePage.sonyVaioiSevenItem).toBeVisible();
    await expect(homePage.appleMonitorItem).toBeVisible();
  });

  test('Перейти на последнюю страницу -> осуществляется переход на последнюю страницу, отображается 6 позиций', async ({homePage})=>{
    await homePage.clickNextButtonOfPagination();
    await expect(homePage.numberOfItems).toHaveCount(6);
    await expect(homePage.appleMonitorItem).toBeVisible();
    await expect(homePage.macBookAirItem).toBeVisible();
    await expect(homePage.delliSevenItem).toBeVisible();
    await expect(homePage.dellInchItem).toBeVisible();
    await expect(homePage.asusFullHDItem).toBeVisible();
    await expect(homePage.macBookProItem).toBeVisible();
  });

  test('Перейти на первую страницу из последней странице -> осуществляется переход на первую страницу, отображается 9 позиций, вместо samsung galaxy s6--apple monitor', async ({homePage})=>{
    await homePage.clickNextAfterPreviousButtonOfPagination();
    await expect(homePage.numberOfItems).toHaveCount(9);
    await expect(homePage.nokiaLumiaItem).toBeVisible();
    await expect(homePage.nexusSixItem).toBeVisible();
    await expect(homePage.samsungGalaxySevenItem).toBeVisible();
    await expect(homePage.iphoneSixItem).toBeVisible();
    await expect(homePage.sonyXperiazFiveItem).toBeVisible();
    await expect(homePage.htcOnemNineItem).toBeVisible();
    await expect(homePage.sonyVaioiFiveItem).toBeVisible();
    await expect(homePage.sonyVaioiSevenItem).toBeVisible();
    await expect(homePage.appleMonitorItem).toBeVisible();
  });

  test('Перейти на последнюю страницу после перехода из последней в первую -> осуществляется переход на последнюю страницу, отображается 5 позиций, apple monitor--не отображается', async ({homePage})=>{
    await homePage.clickNextAfterPreviousThenNextButtonOfPagination();
    await expect(homePage.numberOfItems).toHaveCount(5);
    await expect(homePage.macBookAirItem).toBeVisible();
    await expect(homePage.delliSevenItem).toBeVisible();
    await expect(homePage.dellInchItem).toBeVisible();
    await expect(homePage.asusFullHDItem).toBeVisible();
    await expect(homePage.macBookProItem).toBeVisible();
  });
});

test.describe('Сортировка по категориям', async()=>{

  test('Нажать на Phones -> позиции сортируется по категории Phones', async ({homePage})=>{
    await homePage.clickOnCategoryPhones();
    await expect(homePage.numberOfItems).toHaveCount(7);
    await expect(homePage.samsungGalaxySixItem).toBeVisible();
    await expect(homePage.nokiaLumiaItem).toBeVisible();
    await expect(homePage.nexusSixItem).toBeVisible();
    await expect(homePage.samsungGalaxySevenItem).toBeVisible();
    await expect(homePage.iphoneSixItem).toBeVisible();
    await expect(homePage.sonyXperiazFiveItem).toBeVisible();
    await expect(homePage.htcOnemNineItem).toBeVisible();
  });

test('Нажать на Laptops -> позиции сортируется по категории Laptops', async ({homePage})=>{
  await homePage.clickOnCategoryLaptops();
  await expect(homePage.numberOfItems).toHaveCount(6);
  await expect(homePage.sonyVaioiFiveItem).toBeVisible();
  await expect(homePage.sonyVaioiSevenItem).toBeVisible();
  await expect(homePage.macBookAirItem).toBeVisible();
  await expect(homePage.delliSevenItem).toBeVisible();
  await expect(homePage.dellInchItem).toBeVisible();
  await expect(homePage.macBookProItem).toBeVisible();
  });

test('Нажать на Monitors -> позиции сортируется по категории Monitors', async ({homePage})=>{
  await homePage.clickOnCategoryMonitors();
  await expect(homePage.numberOfItems).toHaveCount(2);
  await expect(homePage.appleMonitorItem).toBeVisible();
  await expect(homePage.asusFullHDItem).toBeVisible();
  });
});
