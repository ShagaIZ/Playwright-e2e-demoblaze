import { expect } from '@playwright/test';
import { DataString, Credentials, DataNumber } from '../data/home';
import {test} from '../fixtures/home';


test.beforeEach(async({homePage})=>{
  await homePage.openDemoblaze();
  await homePage.clickLoginInModal();
  await homePage.typeUsernameField(Credentials.CorrectUsername);
  await homePage.typePasswordField(Credentials.CorrectPassword);
  await homePage.clickLoginButton();
});

test.describe('Элементы страницы home',async()=>{

  test.describe('Хедер страницы', async()=>{
    
    test('Логотип -> отображается корректно, расположен верхнем в правом углу', async ({homePage}) => {
      await expect(homePage.titleOfHeader).toBeVisible();
      await expect(homePage.titleOfHeader).toContainText(DataString.TitleHeaderText);
      await expect(homePage.countOfElementsInTitleOfHeader).toHaveCount(DataNumber.NumberOfElementsInNavbarBrend);
    });

    test('Сайдбар -> отображается корректно, расположен по центру в хедере', async ({homePage}) => {
      await expect(homePage.navbarHeaderElement).toBeVisible();
    });

    test('Кнопка Home  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.homeButtonHeader).toBeVisible();
      await expect(homePage.homeButtonHeader).toContainText(DataString.HomeButtonHeaderText);
    });

    test('Кнопка Contact  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.contactButtonHeader).toBeVisible();
      await expect(homePage.contactButtonHeader).toContainText(DataString.ContactButtonHeaderText);
    });

    test('Кнопка About us  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.aboutUsButtonHeader).toBeVisible();
      await expect(homePage.aboutUsButtonHeader).toContainText(DataString.AboutUsButtonHeaderText);
    });

    test('Кнопка Cart  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.cartButtonHeader).toBeVisible();
      await expect(homePage.cartButtonHeader).toContainText(DataString.CartButtonHeaderText);
    });

    test('Кнопка Log Out  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.logoutButtonHeader).toBeVisible();
      await expect(homePage.logoutButtonHeader).toContainText(DataString.LogoutButtonHeaderText);
    });

    test('Кнопка "currenUser"  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.nameUserButtonHeader).toBeVisible();
      await expect(homePage.nameUserButtonHeader).toContainText(DataString.NameUserButtonHeaderText);
    });
  });

  test.describe('Слайдер товаров', async()=>{

    test('Слайдер товаров -> отображается корректно', async ({homePage}) => {
      await expect(homePage.sliderWindow).toBeVisible();
    });  

    test('Rнопка назад -> отображается корректно', async ({homePage}) => {
      await expect(homePage.sliderWindowPreviousButton).toBeVisible();
    });  

    test('Rнопка вперёд -> отображается корректно', async ({homePage}) => {
      await expect(homePage.sliderWindowNextButton).toBeVisible();
    });  
  });
  
  test.describe('Категория', async()=>{

    test('Тайтл категории -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoriesTitle).toBeVisible();
      await expect(homePage.categoriesTitle).toContainText(DataString.CategoriesTitleText);
    });

    test('Категория Phones -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryPhones).toBeVisible();
      await expect(homePage.categoryPhones).toContainText(DataString.CategoryPhonesText);
    });

    test('Категория Laptops -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryLaptops).toBeVisible();
      await expect(homePage.categoryLaptops).toContainText(DataString.CategoryLaptopsText);
    });

    test('Категория Monitors -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryMonitors).toBeVisible();
      await expect(homePage.categoryMonitors).toContainText(DataString.CategoryMonitorsText);
    }); 
  });
});
test.describe('Действия слайдером', async ()=>{
  test('Слайд по умолчанию -> отображается первый слайд', async ({homePage})=>{
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsFirstSlide);
  });

  test('Отображается первый слайд, нажать на следующую стрелку -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsSecondSlide);
  });

  test('Отображается первый слайд, нажать на предыдущую стрелку -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsThirdSlide);
  });

  test('Отображается второй слайд, нажать на следующую стрелку -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsThirdSlide);
  });

  test('Отображается второй слайд, нажать на предыдущую стрелку -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsFirstSlide);
  });

  test('Отображается третий слайд, нажать на следующую стрелку -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsFirstSlide);
  });

  test('Отображается третий слайд, нажать на предыдущую стрелку -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(DataString.AttributeOfSlideImgNameIsAlt,DataString.AttributeOfSlideImgValueIsSecondSlide);
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