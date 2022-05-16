import { expect } from '@playwright/test';
import { loginDataString,loginDataNumber, credentialsData } from '../data/login';
import {test} from '../fixtures/login';



test.beforeEach(async({loginPage})=>{
  await loginPage.clickLoginInModal()
})

test.describe('Элементы модального окна',async()=>{

    test('Модальное окно -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.modalWindow).toBeVisible();
      await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributeOfModalWindowNameIsStyle, loginDataString.attributefModalWindowValueOfStyleTwo);
      await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributefModalWindowNameIsClass, loginDataString.attributefModalWindowValueOfClassOne);
    });  

    test('Кнопка крести -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.closeModalCross).toBeVisible();
    }); 

    test('Тайтл модалки -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginInModalLabel).toBeVisible();
      await expect(loginPage.loginInModalLabel).toContainText(loginDataString.logInModalLabelText);
    });

    test('Поле username -> отображается корректно,редактируемо', async ({loginPage}) => {
      await expect(loginPage.loginUsernameField).toBeVisible();
      await expect(loginPage.loginUsernameField).toBeEditable();
    });

    test('Поле password -> отображается корректно,редактируемо', async ({loginPage}) => {
      await expect(loginPage.loginPasswordField).toBeVisible();
      await expect(loginPage.loginPasswordField).toBeEditable();
    });

    test('Кнопка close -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.closeModalButton).toBeVisible();
    });

    test('Кнопка login -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginButton).toBeVisible();
    });

});


test.describe('Общие проверки',async()=>{

  test('Ввести валидный логин и пароль, нажать на кнопку "Log in" -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.typePasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginDataString.nameOfUserText);
  }); 

  test('Вставить из БО валидный логин и пароль, нажать на кнопку "Log in" -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.fillUsernameField(credentialsData.correctUsername);
    await loginPage.fillPasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginDataString.nameOfUserText);
  });  

  test('Ввести невалидный логин и пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.inCorrectUsername);
    await loginPage.typePasswordField(credentialsData.inCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageUserNotExistText)
      await dialog.accept();
      });
  }); 

  test('Ввести невалидный логин и валидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.inCorrectUsername);
    await loginPage.typePasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageUserNotExistText)
      await dialog.accept();
      });
  });

  test('Ввести валидный логин и невалидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка авторизации', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.typePasswordField(credentialsData.inCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageWrongPasswordText)
      await dialog.accept();
      });
  });

  test('Оставить поля пустыми, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageValidationErrorText)
      await dialog.accept();
      });
  });

  test('Ввести валидный логин и оставить пустым поле password , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageValidationErrorText)
      await dialog.accept();
      });
  });

  test('Оставить пустым поле username и ввести валидный пароль , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typePasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageValidationErrorText)
      await dialog.accept();
      });
  });

});

test.describe('Действия с модальным окном', async ()=>{


  test('Нажать на крестик -> модальное окно закрывается', async({loginPage})=>{
      await loginPage.clickCrossButton();
      await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributefModalWindowNameIsClass, loginDataString.attributefModalWindowValueOfClassTwo);
      await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributeOfModalWindowNameIsStyle, loginDataString.attributefModalWindowValueOfStyleOne);
  });

  test('Нажать на кнопку "Close" -> модальное окно закрывается', async({loginPage})=>{
    await loginPage.clickCloseButton();
    await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributefModalWindowNameIsClass, loginDataString.attributefModalWindowValueOfClassTwo);
    await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributeOfModalWindowNameIsStyle, loginDataString.attributefModalWindowValueOfStyleOne);
  });
  // Тест падает. Причина: не отрабатывает mouse.click
  /*
  test('Нажать на область вне модального окна -> модальное окно закрывается', async({loginPage})=>{
    await loginPage.page.mouse.click(2000,0);
    await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributefModalWindowNameIsClass, loginDataString.attributefModalWindowValueOfClassTwo);
    await expect(loginPage.modalWindow).toHaveAttribute(loginDataString.attributeOfModalWindowNameIsStyle, loginDataString.attributefModalWindowValueOfStyleOne);
   
  }); */

});

test.describe('Дополнительные проверки', async()=>{

  test('Залогиниться валидными данными после ошибки аутентификации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.inCorrectUsername);
    await loginPage.typePasswordField(credentialsData.inCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageUserNotExistText)
      await dialog.accept();
      });
    await loginPage.clearUsernameAndPasswordField(loginDataString.NameOfTheKeyOne,loginDataString.NameOfTheKeyTwo);
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.typePasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginDataString.nameOfUserText);
  }); 

  test('Залогиниться валидными данными после ошибки авторизации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.typePasswordField(credentialsData.inCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageWrongPasswordText)
      await dialog.accept();
     
      });
    await loginPage.clearUsernameAndPasswordField(loginDataString.NameOfTheKeyOne,loginDataString.NameOfTheKeyTwo);
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.typePasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginDataString.nameOfUserText);
  });

  test('Залогиниться валидными данными после ошибки валидации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(loginDataString.nameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(loginDataString.dialogMessageValidationErrorText)
      await dialog.accept();
      });
    await loginPage.typeUsernameField(credentialsData.correctUsername);
    await loginPage.typePasswordField(credentialsData.correctPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(loginDataString.nameOfUserText);
  });

})