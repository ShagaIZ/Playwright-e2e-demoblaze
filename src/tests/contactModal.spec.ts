import { expect,test } from '@playwright/test'
import {DataString} from '../data/contactModal'
import { Credentials} from '../data/login'
import { ContactModal } from "../pages/contactModal"




test.describe('Общие проверки', async()=>{

    let contactModal:ContactModal
    test.beforeEach(async({page})=>{
        contactModal = new ContactModal(page)
        await contactModal.page.goto('https://www.demoblaze.com/index.html')
        await contactModal.contactButtonHeader.click()
    })

    test('Элементы модального окна -> отображаются корректно', async()=>{
        //Тайтл модального 
        await expect(contactModal.modalTitle).toBeVisible()
        await expect(contactModal.modalTitle).toContainText(DataString.Title)
        //Крестик 
        await expect(contactModal.closeModalCross).toBeVisible()
        //Поля для заполнения 
        await expect(contactModal.emailField).toBeVisible()
        await expect(contactModal.emailField).toBeEditable()
        await expect(contactModal.nameField).toBeVisible()
        await expect(contactModal.nameField).toBeEditable()
        await expect(contactModal.messageField).toBeVisible()
        await expect(contactModal.messageField).toBeEditable()
        //Кнопка закрытия 
        await expect(contactModal.closeModalButton).toBeVisible()
        //Кнопка закрытия 
        await expect(contactModal.closeModalButton).toBeVisible()
        //Кнопка отправка сообщения
        await expect(contactModal.sendMessageButton).toBeVisible()
    
    })
    test('Нажать на Contact -> открывается модальное окно контактов', async()=>{
       await expect(contactModal.exampleModal).toHaveAttribute('class', 'modal fade')
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

