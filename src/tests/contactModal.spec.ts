import { expect,test } from '@playwright/test'
import {DataString} from '../common/appData'
import { ContactModal } from "../pages/contactModal"
import {Urls} from "../common/url"






test.describe.configure({ mode: 'parallel' })

let contactModal:ContactModal
      
test.beforeEach(async({page})=>{
   contactModal = new ContactModal(page)
   await contactModal.page.goto(Urls.homePage)
   await contactModal.contactButtonHeader.click()
})


test.describe('Общие проверки модального окна Contact', async()=>{


      test('Нажать на Contact -> открывается модальное окно', async()=>{
         await expect(contactModal.exampleModal).toHaveAttribute('class', 'modal fade show')
      })

      test('Элементы модального окна -> отображаются корректно', async()=>{
         await expect(contactModal.modalTitle).toBeVisible()
         await expect(contactModal.modalTitle).toContainText(DataString.Title)
         await expect(contactModal.closeModalCross).toBeVisible()
         await expect(contactModal.emailField).toBeVisible()
         await expect(contactModal.emailField).toBeEditable()
         await expect(contactModal.nameField).toBeVisible()
         await expect(contactModal.nameField).toBeEditable()
         await expect(contactModal.messageField).toBeVisible()
         await expect(contactModal.messageField).toBeEditable()
         await expect(contactModal.closeModalButton).toBeVisible()
         await expect(contactModal.closeModalButton).toBeVisible()
         await expect(contactModal.closeModalButton).toHaveCSS('color','rgb(41, 43, 44)')
         await expect(contactModal.closeModalButton).toHaveCSS('background-color','rgb(255, 255, 255)') 
         await expect(contactModal.sendMessageButton).toBeVisible()
         await expect(contactModal.sendMessageButton).toHaveCSS('color','rgb(255, 255, 255)')
         await expect(contactModal.sendMessageButton).toHaveCSS('background-color','rgb(2, 117, 216)')      
      })

      test('Нажать на кнопку Send Mesage, поля не заполнены -> модальное окно контактов закрывается, сообщение отправлено', async()=>{
         await contactModal.sendMessageButton.click()
         await contactModal.loadPage()
         await expect(contactModal.exampleModal).toHaveAttribute('class', 'modal fade')
      })

      test('Нажать на кнопку Send Mesage, поля заполнены -> модальное окно контактов закрывается, сообщение отправлено', async()=>{
         await contactModal.emailField.fill(DataString.Email)
         await contactModal.nameField.fill(DataString.Name) 
         await contactModal.messageField.fill(DataString.Message)
         await contactModal.sendMessageButton.click()
         await contactModal.loadPage()
         await expect(contactModal.exampleModal).toHaveAttribute('class', 'modal fade')
      })

      test('Нажать на кнопку крестик -> модальное окно контактов закрывается', async()=>{
         await contactModal.closeModalCross.click()
         await contactModal.loadPage()
         await expect(contactModal.exampleModal).toHaveAttribute('class', 'modal fade')
      })

      test('Нажать на кнопку Close ->  модальное окно контактов закрывается', async()=>{
         await contactModal.closeModalButton.click()
         await contactModal.loadPage()
         await expect(contactModal.exampleModal).toHaveAttribute('class', 'modal fade')
      })
   })

