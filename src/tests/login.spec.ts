import { expect } from '@playwright/test';
import { VerificationText,Credentials,ErrorsText } from '../data/login';
import {test} from '../fixtures/login';



test.beforeEach(async({loginPage})=>{
  await loginPage.clickLoginInModal()
})

test.describe('Элементы модального окна',async()=>{

    test('Модальное окно -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.modalWindow).toBeVisible();
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Style, VerificationText.DisplayBlock);
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Class, VerificationText.ModalFadeShow);
    });  

    test('Кнопка крести -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.closeModalCross).toBeVisible();
    }); 

    test('Тайтл модалки -> отображается корректно', async ({loginPage}) => {
      await expect(loginPage.loginInModalLabel).toBeVisible();
      await expect(loginPage.loginInModalLabel).toContainText(VerificationText.LogIn);
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
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.typePasswordField(Credentials.Password);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(VerificationText.Name);
  }); 

  test('Вставить из БО валидный логин и пароль, нажать на кнопку "Log in" -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.fillUsernameField(Credentials.Username);
    await loginPage.fillPasswordField(Credentials.Password);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(VerificationText.Name);
  });  

  test('Ввести невалидный логин и пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.NotUsername);
    await loginPage.typePasswordField(Credentials.NotPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.UserNotExist)
      await dialog.accept();
      });
  }); 

  test('Ввести невалидный логин и валидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.NotUsername);
    await loginPage.typePasswordField(Credentials.NotPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.UserNotExist)
      await dialog.accept();
      });
  });

  test('Ввести валидный логин и невалидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка авторизации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.typePasswordField(Credentials.NotPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.WrongPassword)
      await dialog.accept();
      });
  });

  test('Оставить поля пустыми, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.ValidationError)
      await dialog.accept();
      });
  });

  test('Ввести валидный логин и оставить пустым поле password , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.ValidationError)
      await dialog.accept();
      });
  });

  test('Оставить пустым поле username и ввести валидный пароль , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typePasswordField(Credentials.Password);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.ValidationError)
      await dialog.accept();
      });
  });

});

test.describe('Действия с модальным окном', async ()=>{


  test('Нажать на крестик -> модальное окно закрывается', async({loginPage})=>{
      await loginPage.clickCrossButton();
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Class, VerificationText.ModalFade);
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Style, VerificationText.DisplayNone);
  });

  test('Нажать на кнопку "Close" -> модальное окно закрывается', async({loginPage})=>{
    await loginPage.clickCloseButton();
    await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Class, VerificationText.ModalFade);
    await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Style, VerificationText.DisplayNone);
  });
});

test.describe('Дополнительные проверки', async()=>{

  test('Залогиниться валидными данными после ошибки аутентификации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.NotUsername);
    await loginPage.typePasswordField(Credentials.NotPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.UserNotExist)
      await dialog.accept();
      });
    await loginPage.clearUsernameAndPasswordField('Control+A','Backspace');
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.typePasswordField(Credentials.Password);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(VerificationText.Name);
  }); 

  test('Залогиниться валидными данными после ошибки авторизации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.typePasswordField(Credentials.NotPassword);
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.WrongPassword)
      await dialog.accept();
     
      });
    await loginPage.clearUsernameAndPasswordField('Control+A','Backspace');
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.typePasswordField(Credentials.Password);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(VerificationText.Name);
  });

  test('Залогиниться валидными данными после ошибки валидации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.clickLoginButton();
    await loginPage.page.waitForTimeout(1000);
    await expect(loginPage.nameOfUser).not.toBeVisible();
    await expect(loginPage.nameOfUser).not.toContainText(VerificationText.Name);
    loginPage.page.on('dialog', async (dialog) => {
      expect(dialog.message()).toContain(ErrorsText.ValidationError)
      await dialog.accept();
      });
    await loginPage.typeUsernameField(Credentials.Username);
    await loginPage.typePasswordField(Credentials.Password);
    await loginPage.clickLoginButton();
    await expect(loginPage.nameOfUser).toBeVisible();
    await expect(loginPage.nameOfUser).toContainText(VerificationText.Name);
  });

})