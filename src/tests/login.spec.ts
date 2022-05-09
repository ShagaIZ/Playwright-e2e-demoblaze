import { expect } from '@playwright/test';
import { loginData } from '../data/login';
import {test} from '../fixtures/login';





test.beforeEach(async({loginPage})=>{
  await loginPage.clickLoginInModal()
})

test.describe('Элементы модального окна',async()=>{

    test('Тайтл модалки -> отображается корректно', async ({ loginPage }) => {
      await expect(loginPage.loginInModalLabel).toBeVisible();
      await expect(loginPage.loginInModalLabel).toContainText(loginData.logInModalLabelText)
    });

});


