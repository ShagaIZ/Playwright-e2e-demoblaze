import { test } from "../fixtures/contactModal";
import { expect } from '@playwright/test';




test.describe('Общие проверки', async()=>{

    test('Нажать на Contact -> открывается модальное окно контактов', async({contactModal})=>{
       await expect(contactModal.modalVisibility).toBeVisible();
    });
});