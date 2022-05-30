import { expect } from '@playwright/test';
import { DataString,DataNumber, Credentials } from '../data/login';
import {test} from '../fixtures/login';



test.beforeEach(async({loginPage})=>{
  await loginPage.clickLoginInModal()
})

test.describe('Элементы модального окна',async()=>{

    test('Модальное окно -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.modalWindow).toBeVisible();
      await expect(loginPage.modalWindow).toHaveAttribute(DataString.AttributeOfModalWindowNameIsStyle, DataString.AttributefModalWindowValueOfStyleTwo);
      await expect(loginPage.modalWindow).toHaveAttribute(DataString.AttributefModalWindowNameIsClass, DataString.AttributefModalWindowValueOfClassOne);
    });  

    test('Кнопка крести -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.closeModalCross).toBeVisible();
    }); 

    test('Тайтл модалки -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginInModalLabel).toBeVisible();
      await expect(loginPage.loginInModalLabel).toContainText(DataString.LogInModalLabelText);
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
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.typePasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(DataString.NameOfUserText);
  }); 

  test('Вставить из БО валидный логин и пароль, нажать на кнопку "Log in" -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.fillUsernameField(Credentials.CorrectUsername);
    await loginPage.fillPasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(DataString.NameOfUserText);
  });  

  test('Ввести невалидный логин и пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.InCorrectUsername);
    await loginPage.typePasswordField(Credentials.InCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageUserNotExistText)
      await dialog.accept();
      });
  }); 

  test('Ввести невалидный логин и валидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.InCorrectUsername);
    await loginPage.typePasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageUserNotExistText)
      await dialog.accept();
      });
  });

  test('Ввести валидный логин и невалидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка авторизации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.typePasswordField(Credentials.InCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageWrongPasswordText)
      await dialog.accept();
      });
  });

  test('Оставить поля пустыми, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageValidationErrorText)
      await dialog.accept();
      });
  });

  test('Ввести валидный логин и оставить пустым поле password , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageValidationErrorText)
      await dialog.accept();
      });
  });

  test('Оставить пустым поле username и ввести валидный пароль , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typePasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageValidationErrorText)
      await dialog.accept();
      });
  });

});

test.describe('Действия с модальным окном', async ()=>{


  test('Нажать на крестик -> модальное окно закрывается', async({loginPage})=>{
      await loginPage.clickCrossButton();
      await expect(loginPage.modalWindow).toHaveAttribute(DataString.AttributefModalWindowNameIsClass, DataString.AttributefModalWindowValueOfClassTwo);
      await expect(loginPage.modalWindow).toHaveAttribute(DataString.AttributeOfModalWindowNameIsStyle, DataString.AttributefModalWindowValueOfStyleOne);
  });

  test('Нажать на кнопку "Close" -> модальное окно закрывается', async({loginPage})=>{
    await loginPage.clickCloseButton();
    await expect(loginPage.modalWindow).toHaveAttribute(DataString.AttributefModalWindowNameIsClass, DataString.AttributefModalWindowValueOfClassTwo);
    await expect(loginPage.modalWindow).toHaveAttribute(DataString.AttributeOfModalWindowNameIsStyle, DataString.AttributefModalWindowValueOfStyleOne);
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
    await loginPage.typeUsernameField(Credentials.InCorrectUsername);
    await loginPage.typePasswordField(Credentials.InCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageUserNotExistText)
      await dialog.accept();
      });
    await loginPage.clearUsernameAndPasswordField(DataString.NameOfTheKeyOne,DataString.NameOfTheKeyTwo);
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.typePasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(DataString.NameOfUserText);
  }); 

  test('Залогиниться валидными данными после ошибки авторизации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.typePasswordField(Credentials.InCorrectPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageWrongPasswordText)
      await dialog.accept();
     
      });
    await loginPage.clearUsernameAndPasswordField(DataString.NameOfTheKeyOne,DataString.NameOfTheKeyTwo);
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.typePasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(DataString.NameOfUserText);
  });

  test('Залогиниться валидными данными после ошибки валидации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(DataString.NameOfUserText);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(DataString.DialogMessageValidationErrorText)
      await dialog.accept();
      });
    await loginPage.typeUsernameField(Credentials.CorrectUsername);
    await loginPage.typePasswordField(Credentials.CorrectPassword);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(DataString.NameOfUserText);
  });

})