import { test, expect } from '@playwright/test'
import { AboutData, Colors, ModalVisibility } from '../common/appData'
import { AboutModal } from '../pages/applicationPage/modals/aboutModal'
import { urls } from 'src/utlis/urls'

let aboutModal: AboutModal

test.beforeEach(async ({ page }) => {
   aboutModal = new AboutModal(page)
   await page.goto(urls.home)
   await aboutModal.aboutUsButtonHeader.click()
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
      await aboutModal.page.waitForTimeout(1000)
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })

   test('Нажать на кнопку Close ->  модальное окно контактов закрывается', async () => {
      await aboutModal.closeButton.click()
       await aboutModal.page.waitForTimeout(1000)
      await expect(aboutModal.videoModal).toHaveAttribute('class', ModalVisibility.ModalFade)
   })
})
