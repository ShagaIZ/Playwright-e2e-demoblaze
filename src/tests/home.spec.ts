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

  test('Логотип -> отображается корректно, расположен верхнем в правом углу', async ({homePage}) => {
    await expect(homePage.navbarBrend).toBeVisible();
    await expect(homePage.navbarBrend).toContainText(homeDataString.navbarBrendText);
    await expect(homePage.countOfElementsInNavbarBrend).toHaveCount(homeDataNumber.numberOfElementsInNavbarBrend);
  });

  test('Слайдер окно -> отображается корректно', async ({homePage}) => {
    await expect(homePage.sliderWindow).toBeVisible();
  });  

});