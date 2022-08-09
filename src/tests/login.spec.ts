import { expect } from '@playwright/test';
import { VerificationText,Credentials,ErrorsText } from '../data/login';
import {test} from '../fixtures/login';



test.beforeEach(async({loginPage})=>{
  await loginPage.loginInModal.click()
})

test.describe('Общие проверки',async()=>{
 
  test('Элементы модального окна -> отображается корректно', async ({loginPage}) => {
    await expect(loginPage.modalWindow).toBeVisible()
    await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Style, VerificationText.DisplayBlock)
    await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Class, VerificationText.ModalFadeShow)
    await expect(loginPage.closeModalCross).toBeVisible()
    await expect(loginPage.loginInModalLabel).toBeVisible()
    await expect(loginPage.loginInModalLabel).toContainText(VerificationText.LogIn)
    await expect(loginPage.loginUsernameField).toBeVisible()
    await expect(loginPage.loginUsernameField).toBeEditable()
    await expect(loginPage.loginPasswordField).toBeVisible()
    await expect(loginPage.loginPasswordField).toBeEditable()
    await expect(loginPage.closeModalButton).toBeVisible()
    await expect(loginPage.loginButton).toBeVisible()
  })

  test('Ввести валидный логин и пароль, нажать на кнопку "Log in" -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.CorrectPassword)
    await loginPage.validationVisibilityUserName(VerificationText.Name)
  })

  test('Вставить из БО валидный логин и пароль, нажать на кнопку "Log in" -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.loginUsernameField.fill(Credentials.CorrectUsername)
    await loginPage.loginPasswordField.fill(Credentials.CorrectPassword)
    await loginPage.loginButton.click()
    await loginPage.validationVisibilityUserName(VerificationText.Name)
  })

  test('Ввести невалидный логин и пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.NotCorrectUsername,Credentials.NotCorrectPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.UserNotExist)
  })

  test('Ввести невалидный логин и валидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка аутентификации', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.NotCorrectUsername,Credentials.CorrectPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.UserNotExist)
  })

  test('Ввести валидный логин и невалидный пароль, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка авторизации', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.NotCorrectPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.WrongPassword)
  })

  test('Оставить поля пустыми, нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.EmptyUsername,Credentials.EmptyPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.ValidationError)
  })

  test('Ввести валидный логин и оставить пустым поле password , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.EmptyPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.ValidationError)
  })

  test('Оставить пустым поле username и ввести валидный пароль , нажать на кнопку "Log in" -> пользователь не залогинен, ошибка-валидации', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.EmptyUsername,Credentials.CorrectPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.ValidationError)
  })
})

test.describe('Действия с модальным окном', async ()=>{

  test('Нажать на крестик -> модальное окно закрывается', async({loginPage})=>{
      await loginPage.closeModalCross.click()
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Class, VerificationText.ModalFade)
      await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Style, VerificationText.DisplayNone)
  })

  test('Нажать на кнопку "Close" -> модальное окно закрывается', async({loginPage})=>{
    await loginPage.closeModalButton.click()
    await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Class, VerificationText.ModalFade)
    await expect(loginPage.modalWindow).toHaveAttribute(VerificationText.Style, VerificationText.DisplayNone)
  })
})

test.describe('Дополнительные проверки', async()=>{

  test('Залогиниться валидными данными после ошибки аутентификации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.NotCorrectUsername,Credentials.NotCorrectPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.UserNotExist)
    await loginPage.clearUsernameAndPasswordField()
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.CorrectPassword)
    await loginPage.validationVisibilityUserName(VerificationText.Name)
  })

  test('Залогиниться валидными данными после ошибки авторизации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.NotCorrectPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.WrongPassword)
    await loginPage.clearUsernameAndPasswordField()
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.CorrectPassword)
    await loginPage.validationVisibilityUserName(VerificationText.Name)
  })

  test('Залогиниться валидными данными после ошибки валидации -> пользователь залогинен', async ({loginPage}) => {
    await loginPage.typeAndLogin(Credentials.EmptyUsername,Credentials.EmptyPassword)
    await loginPage.page.waitForTimeout(1000)
    await loginPage.validationNotVisibilityUserName(VerificationText.Name)
    await loginPage.validationDialog(ErrorsText.ValidationError)
    await loginPage.typeAndLogin(Credentials.CorrectUsername,Credentials.CorrectPassword)
    await loginPage.validationVisibilityUserName(VerificationText.Name)
  })
})