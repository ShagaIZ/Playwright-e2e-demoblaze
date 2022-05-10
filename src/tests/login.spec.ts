import { expect } from '@playwright/test';
import { loginData } from '../data/login';
import {test} from '../fixtures/login';





test.beforeEach(async({loginPage})=>{
  await loginPage.clickLoginInModal()
})

test.describe('Элементы модального окна',async()=>{

    test('Модальное окно -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.modalWindow).toBeVisible();
    });  

    test('Кнопка крести -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.closeModalCross).toBeVisible();
    }); 

    test('Тайтл модалки -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginInModalLabel).toBeVisible();
      await expect(loginPage.loginInModalLabel).toContainText(loginData.logInModalLabelText);
    });

    test('Поле username -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginUsernameField).toBeVisible();
    });

    test('Поле password -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginPasswordField).toBeVisible();
    });

    test('Кнопка close -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.closeModalButton).toBeVisible();
    });

    test('Кнопка login -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginButton).toBeVisible();
    });

});


test.describe('Общие проверки',async()=>{

  test('Поле username -> редактируемо', async ({loginPage}) => {
    await expect(loginPage.loginUsernameField).toBeEditable();
  });

  test('Поле password -> редактируемо', async ({loginPage}) => {
    await expect(loginPage.loginPasswordField).toBeEditable();
  });
 
  test('Ввести валидный логин и пароль -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(loginData.correctUsername);
    await loginPage.typePasswordField(loginData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginData.nameOfUserText);
  }); 

  test('Вставить из БО валидный логин и пароль -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.fillUsernameField(loginData.correctUsername);
    await loginPage.fillPasswordField(loginData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginData.nameOfUserText);
  });  

  test('Ввести невалидный логин и пароль -> пользователь не залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(loginData.inCorrectUsername);
    await loginPage.typePasswordField(loginData.inCorrectPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginData.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginData.dialogMessageUserNotExistText)
      await dialog.accept();
      });
    await loginPage.page.waitForTimeout(1000);
  }); 

});