import { test, expect } from '@playwright/test'
import { AboutData, Colors, ModalVisibility } from '../common/appData'
import { AboutModal } from '../pages/applicationPage/modals/aboutModal'
import dotenv from 'dotenv'

dotenv.config({
   path: '.env.prod',
   override: true,
})

test.describe.configure({ mode: 'parallel' })

let aboutModal: AboutModal

test.beforeEach(async ({ page }) => {
   aboutModal = new AboutModal(page)
   await page.goto(process.env.HOME)
   await aboutModal.aboutUsButtonHeader.click()
   await aboutModal.loadPage()
})

test.describe('Общие проверки модального окна About Us', async () => {
   test('Нажать на About Us -> открывается модальное окно', async () => {
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFadeShow)
   })

   test('Элементы модального окна', async () => {
      await expect(aboutModal.videoModalLabel).toBeVisible()
      await expect(aboutModal.videoModalLabel).toHaveText(AboutData.About_Us)
      await expect(aboutModal.crossButton).toBeVisible()
      await expect(aboutModal.videoBlock).toBeVisible()
      await expect(aboutModal.closeButton).toBeVisible()
      await expect(aboutModal.closeButton).toHaveCSS('color', Colors.Onyx)
      await expect(aboutModal.closeButton).toHaveCSS('background-color', Colors.White)
   })

   test('Нажать на кнопку крестик -> модальное окно контактов закрывается', async () => {
      await aboutModal.crossButton.click()
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('Нажать на кнопку Close ->  модальное окно контактов закрывается', async () => {
      await aboutModal.closeModalButton.click()
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })
})
