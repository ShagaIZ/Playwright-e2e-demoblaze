import { expect } from '@playwright/test';
import { homeDataString, credentialsData, homeDataNumber } from '../data/home';
import {test} from '../fixtures/home';


test.beforeEach(async({homePage})=>{
  await homePage.openDemoblaze();
  await homePage.clickLoginInModal();
  await homePage.typeUsernameField(credentialsData.correctUsername);
  await homePage.typePasswordField(credentialsData.correctPassword);
  await homePage.clickLoginButton();
});

test.describe('Элементы страницы home',async()=>{

  test.describe('Хедер страницы', async()=>{
    
    test('Логотип -> отображается корректно, расположен верхнем в правом углу', async ({homePage}) => {
      await expect(homePage.titleOfHeader).toBeVisible();
      await expect(homePage.titleOfHeader).toContainText(homeDataString.titleHeaderText);
      await expect(homePage.countOfElementsInTitleOfHeader).toHaveCount(homeDataNumber.numberOfElementsInNavbarBrend);
    });

    test('Сайдбар -> отображается корректно, расположен по центру в хедере', async ({homePage}) => {
      await expect(homePage.navbarHeaderElement).toBeVisible();
    });

    test('Кнопка Home  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.homeButtonHeader).toBeVisible();
      await expect(homePage.homeButtonHeader).toContainText(homeDataString.homeButtonHeaderText);
    });

    test('Кнопка Contact  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.contactButtonHeader).toBeVisible();
      await expect(homePage.contactButtonHeader).toContainText(homeDataString.contactButtonHeaderText);
    });

    test('Кнопка About us  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.aboutUsButtonHeader).toBeVisible();
      await expect(homePage.aboutUsButtonHeader).toContainText(homeDataString.aboutUsButtonHeaderText);
    });

    test('Кнопка Cart  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.cartButtonHeader).toBeVisible();
      await expect(homePage.cartButtonHeader).toContainText(homeDataString.cartButtonHeaderText);
    });

    test('Кнопка Log Out  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.logoutButtonHeader).toBeVisible();
      await expect(homePage.logoutButtonHeader).toContainText(homeDataString.logoutButtonHeaderText);
    });

    test('Кнопка "currenUser"  -> отображается корректно', async ({homePage}) => {
      await expect(homePage.nameUserButtonHeader).toBeVisible();
      await expect(homePage.nameUserButtonHeader).toContainText(homeDataString.nameUserButtonHeaderText);
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
      await expect(homePage.categoriesTitle).toContainText(homeDataString.categoriesTitleText);
    });

    test('Категория Phones -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryPhones).toBeVisible();
      await expect(homePage.categoryPhones).toContainText(homeDataString.categoryPhonesText);
    });

    test('Категория Laptops -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryLaptops).toBeVisible();
      await expect(homePage.categoryLaptops).toContainText(homeDataString.categoryLaptopsText);
    });

    test('Категория Monitors -> отображается корректно', async ({homePage}) => {
      await expect(homePage.categoryMonitors).toBeVisible();
      await expect(homePage.categoryMonitors).toContainText(homeDataString.categoryMonitorsText);
    }); 
  });
});
test.describe('Действия слайдером', async ()=>{
  test('Слайд по умолчанию -> отображается первый слайд', async ({homePage})=>{
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsFirstSlide);
  });

  test('Отображается первый слайд, нажать на следующую стрелку -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsSecondSlide);
  });

  test('Отображается первый слайд, нажать на предыдущую стрелку -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsThirdSlide);
  });

  test('Отображается второй слайд, нажать на следующую стрелку -> отображается третий слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsThirdSlide);
  });

  test('Отображается второй слайд, нажать на предыдущую стрелку -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsFirstSlide);
  });

  test('Отображается третий слайд, нажать на следующую стрелку -> отображается первый слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsFirstSlide);
  });

  test('Отображается третий слайд, нажать на предыдущую стрелку -> отображается второй слайд', async ({homePage})=>{
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowNextButton();
    await homePage.clickSliderWindowPreviousButton();
    await expect(homePage.activenessOfSlideImg).toHaveAttribute(homeDataString.attributeOfSlideImgNameIsAlt,homeDataString.attributeOfSlideImgValueIsSecondSlide);
  });
})