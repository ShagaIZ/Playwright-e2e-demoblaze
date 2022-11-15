import { test, expect } from '@playwright/test'
import { ModalVisibility } from '../common/appData'
import { PlaceOrderModal } from '../pages/placeOrderModal'
import dotenv from 'dotenv'

dotenv.config({
  path: '.env.prod',
  override: true,
})

test.describe.configure({ mode: 'serial' })

let placeOrderModal: PlaceOrderModal

test.beforeEach(async ({ page }) => {
  placeOrderModal = new PlaceOrderModal(page)
})

test.describe('Общие проверки модального окна Place Order', async () => {
  test('Элементы модального окна с товаром -> модальное открывается, Total==цене продукта, поля пустые, кнопки "Close", "Purchase" и "Крестик" отображаются корректно', async () => {
    await placeOrderModal.page.goto(process.env.HOME)
    await placeOrderModal.samsungGalaxySixItem.click()
    await placeOrderModal.addItem()
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.checkModal('Total: 360')
    await placeOrderModal.crossButton.click()
    await placeOrderModal.deleteItems()
  })

  test('Элементы модального окна без товара -> модальное открывается, Total==0, поля пустые, кнопки "Close", "Purchase" и "Крестик" отображаются корректно', async () => {
    await placeOrderModal.page.goto(process.env.CART)
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.checkModal('Total:')
    await placeOrderModal.crossButton.click()
  })

  test('Закрыть модальное окно с помощью кнопки Close, без товара -> модальное закрывается', async () => {
    await placeOrderModal.page.goto(process.env.CART)
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.closeButton.click()
    await expect(placeOrderModal.orderModal).toHaveAttribute('class', ModalVisibility.ModalFade)
  })

  test('Нажать на кнопку Purchase, поля не заполнены, без товара -> модальное не закрывается', async () => {
    await placeOrderModal.page.goto(process.env.CART)
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.purchaseButton.click()
    await expect(placeOrderModal.orderModal).not.toHaveAttribute('class', ModalVisibility.ModalFade)
  })

  test('Нажать на кнопку Purchase, поля заполнены с Name до City, с товаром -> модальное не закрывается. покупка не совершена', async () => {
    await placeOrderModal.page.goto(process.env.HOME)
    await placeOrderModal.samsungGalaxySixItem.click()
    await placeOrderModal.addItem()
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.nameField.fill('Zod')
    await placeOrderModal.countryField.fill('Monco')
    await placeOrderModal.cityField.fill('Raketa')
    await placeOrderModal.purchaseButton.click()
    await expect(placeOrderModal.orderModal).not.toHaveAttribute('class', ModalVisibility.ModalFade)
    await placeOrderModal.closeButton.click()
    await placeOrderModal.deleteItems()
  })

  test('Нажать на кнопку Purchase, поля заполнены с Credit card до Year, с товаром ->  модальное не закрывается. покупка не совершена', async () => {
    await placeOrderModal.page.goto(process.env.HOME)
    await placeOrderModal.samsungGalaxySixItem.click()
    await placeOrderModal.addItem()
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.creditCardField.fill('1232564789532154')
    await placeOrderModal.monthField.fill('November')
    await placeOrderModal.yearTitle.fill('2022')
    await placeOrderModal.purchaseButton.click()
    await expect(placeOrderModal.orderModal).not.toHaveAttribute('class', ModalVisibility.ModalFade)
    await placeOrderModal.closeButton.click()
    await placeOrderModal.deleteItems()
  })

  test('Нажать на кнопку Purchase, поля заполнены, не нажимать кнопку Ок, с товаром  -> отображается алёрт об успешной покупки с корректными данными', async () => {
    await placeOrderModal.page.goto('https://www.demoblaze.com/index.html')
    await placeOrderModal.samsungGalaxySixItem.click()
    await placeOrderModal.addItem()
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.nameField.fill('Zod')
    await placeOrderModal.countryField.fill('Monco')
    await placeOrderModal.cityField.fill('Raketa')
    await placeOrderModal.creditCardField.fill('1232564789532154')
    await placeOrderModal.monthField.fill('November')
    await placeOrderModal.yearField.fill('2022')
    await placeOrderModal.purchaseButton.click()
    await expect(placeOrderModal.alertOfSuccess).toBeVisible()
    await expect(placeOrderModal.alertOfSuccessTitle).toBeVisible()
    await expect(placeOrderModal.infomartion).toBeVisible()
    // await expect(placeOrderModal.amountSamsungGalaxySix).toBeVisible() проблема с утверждением
    await expect(placeOrderModal.cardNumber).toBeVisible()
    await expect(placeOrderModal.nameClient).toBeVisible()
  })

  test('Нажать на кнопку Purchase, поля заполнены, нажать кнопку Ок, с товаром -> осуществляется переход на страниц Home', async () => {
    await placeOrderModal.page.goto(process.env.HOME)
    await placeOrderModal.samsungGalaxySixItem.click()
    await placeOrderModal.addItem()
    await placeOrderModal.orderModalButton.click()
    await placeOrderModal.nameField.fill('Zod')
    await placeOrderModal.countryField.fill('Monco')
    await placeOrderModal.cityField.fill('Raketa')
    await placeOrderModal.creditCardField.fill('1232564789532154')
    await placeOrderModal.monthField.fill('November')
    await placeOrderModal.yearField.fill('2022')
    await placeOrderModal.purchaseButton.click()
    await placeOrderModal.page.waitForLoadState('networkidle')
    await placeOrderModal.confirmButton.click()
    await expect(placeOrderModal.page).toHaveURL(process.env.HOME)
  })
})
