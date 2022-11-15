import { expect, test } from '@playwright/test'
import { DataString, Colors, ModalVisibility } from '../common/appData'
import { ContactModal } from '../pages/contactModal'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env.prod',
  override: true,
})

test.describe.configure({ mode: 'parallel' })

let contactModal: ContactModal

test.beforeEach(async ({ page }) => {
  contactModal = new ContactModal(page)
  await contactModal.page.goto(process.env.HOME)
  await contactModal.contactButtonHeader.click()
})

test.describe('Общие проверки модального окна Contact', async () => {
  test('Нажать на Contact -> открывается модальное окно', async () => {
    await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFadeShow)
  })

  test('Элементы модального окна -> отображаются корректно', async () => {
    await expect(contactModal.modalTitle).toBeVisible()
    await expect(contactModal.modalTitle).toContainText(DataString.Title)
    await expect(contactModal.crossButtonContact).toBeVisible()
    await expect(contactModal.emailField).toBeVisible()
    await expect(contactModal.emailField).toBeEditable()
    await expect(contactModal.nameField).toBeVisible()
    await expect(contactModal.nameField).toBeEditable()
    await expect(contactModal.messageField).toBeVisible()
    await expect(contactModal.messageField).toBeEditable()
    await expect(contactModal.closeButtonContact).toBeVisible()
    await expect(contactModal.closeButtonContact).toBeVisible()
    await expect(contactModal.closeButtonContact).toHaveCSS('color', Colors.Onyx)
    await expect(contactModal.closeButtonContact).toHaveCSS('background-color', Colors.White)
    await expect(contactModal.sendMessageButton).toBeVisible()
    await expect(contactModal.sendMessageButton).toHaveCSS('color', Colors.White)
    await expect(contactModal.sendMessageButton).toHaveCSS('background-color', Colors.DarkBlue)
  })

  test('Нажать на кнопку Send Mesage, поля не заполнены -> модальное окно контактов закрывается, сообщение отправлено', async () => {
    await contactModal.sendMessageButton.click()
    await contactModal.loadPage()
    await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
  })

  test('Нажать на кнопку Send Mesage, поля заполнены -> модальное окно контактов закрывается, сообщение отправлено', async () => {
    await contactModal.emailField.fill(DataString.Email)
    await contactModal.nameField.fill(DataString.Name)
    await contactModal.messageField.fill(DataString.Message)
    await contactModal.sendMessageButton.click()
    await contactModal.loadPage()
    await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
  })

  test('Нажать на кнопку крестик -> модальное окно контактов закрывается', async () => {
    await contactModal.crossButtonContact.click()
    await contactModal.loadPage()
    await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
  })

  test('Нажать на кнопку Close ->  модальное окно контактов закрывается', async () => {
    await contactModal.closeButtonContact.click()
    await contactModal.loadPage()
    await expect(contactModal.exampleModal).toHaveAttribute('class', ModalVisibility.ModalFade)
  })
})
