import { test } from "../fixtures/contactModal";
import { expect } from '@playwright/test';
import {DataString} from '../data/contactModal'




test.describe('Общие проверки', async()=>{

    test('Нажать на Contact -> открывается модальное окно контактов', async({contactModal})=>{
       await expect(contactModal.modalVisibility).toBeVisible();
    });
});

test.describe('Элементы модального окна', async()=>{

    test('Тайтл модального -> отображается "New message"', async({contactModal})=>{
        await expect(contactModal.modalTitle).toBeVisible();
        await expect(contactModal.modalTitle).toContainText(DataString.modalTitleText);
    });

    test('Крестик -> отображается корректно', async({contactModal})=>{
        await expect(contactModal.closeModalCross).toBeVisible();
    });

    test('Поля для заполнения -> отображаются корректно и редактируемы', async({contactModal})=>{
        await expect(contactModal.emailField).toBeVisible();
        await expect(contactModal.emailField).toBeEditable();
        await expect(contactModal.nameField).toBeVisible();
        await expect(contactModal.nameField).toBeEditable();
        await expect(contactModal.messageField).toBeVisible();
        await expect(contactModal.messageField).toBeEditable();
    });

    test('Кнопка закрытия -> отображается корректно', async({contactModal})=>{
        await expect(contactModal.closeModalButton).toBeVisible();
    });

    test('Кнопка отправка сообщения -> отображается корректно', async({contactModal})=>{
        await expect(contactModal.sendMessageButton).toBeVisible();
    });
})