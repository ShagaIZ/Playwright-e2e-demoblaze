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

test.describe.only('Элементы страницы home',async()=>{

  test('Логотип -> отображается корректно, расположен верхнем в правом углу', async ({homePage}) => {
    await expect(homePage.titleOfHeader).toBeVisible();
    await expect(homePage.titleOfHeader).toContainText(homeDataString.titleHeaderText);
    await expect(homePage.countOfElementsInTitleOfHeader).toHaveCount(homeDataNumber.numberOfElementsInNavbarBrend);
  });

  test('Сайдбар хедера -> отображается корректно, расположен по центру в хедере', async ({homePage}) => {
    await expect(homePage.navbarHeaderElement).toBeVisible();
    
  });

  test('Кнопка Home в хедере -> отображается корректно', async ({homePage}) => {
    await expect(homePage.homeButtonHeader).toBeVisible();
    await expect(homePage.homeButtonHeader).toContainText(homeDataString.homeButtonHeaderText);
  });

  test('Кнопка Contact в хедере -> отображается корректно', async ({homePage}) => {
    await expect(homePage.contactButtonHeader).toBeVisible();
    await expect(homePage.contactButtonHeader).toContainText(homeDataString.contactButtonHeaderText);
  });

  test('Кнопка About us в хедере -> отображается корректно', async ({homePage}) => {
    await expect(homePage.aboutUsButtonHeader).toBeVisible();
    await expect(homePage.aboutUsButtonHeader).toContainText(homeDataString.aboutUsButtonHeaderText);
  });

  test('Кнопка Cart в хедере -> отображается корректно', async ({homePage}) => {
    await expect(homePage.cartButtonHeader).toBeVisible();
    await expect(homePage.cartButtonHeader).toContainText(homeDataString.cartButtonHeaderText);
  });

  test('Кнопка Log Out в хедере -> отображается корректно', async ({homePage}) => {
    await expect(homePage.logoutButtonHeader).toBeVisible();
    await expect(homePage.logoutButtonHeader).toContainText(homeDataString.logoutButtonHeaderText);
  });

  test('Кнопка "currenUser" в хедере -> отображается корректно', async ({homePage}) => {
    await expect(homePage.nameUserButtonHeader).toBeVisible();
    await expect(homePage.nameUserButtonHeader).toContainText(homeDataString.nameUserButtonHeaderText);
  });

  test('Слайдер товаров -> отображается корректно', async ({homePage}) => {
    await expect(homePage.sliderWindow).toBeVisible();
  });  

  test('Слайдер товаров, кнопка назад -> отображается корректно', async ({homePage}) => {
    await expect(homePage.sliderWindowPreviousButton).toBeVisible();
  });  

  test('Слайдер товаров, кнопка вперёд -> отображается корректно', async ({homePage}) => {
    await expect(homePage.sliderWindowNextButton).toBeVisible();
  });  

});