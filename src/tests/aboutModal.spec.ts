import {test, expect} from "@playwright/test"
import { AboutData } from "../common/appData"
import { AboutModal } from "../pages/aboutModal"
import {Urls} from "../common/url"


test.describe.configure({ mode: 'parallel' })

let aboutModal: AboutModal

test.beforeEach(async({page})=>{
    aboutModal = new AboutModal(page)
    await page.goto(Urls.homePage)
    await aboutModal.aboutUsButtonHeader.click()
    await aboutModal.loadPage() 
})

test.describe('Общие проверки модального окна About Us', async()=>{

    test('Нажать на About Us -> открывается модальное окно', async()=>{
        await expect(aboutModal.videoModal).toHaveAttribute('class', 'modal fade show')
     })

    test('Элементы модального окна', async()=>{
        await expect(aboutModal.videoModalLabel).toBeVisible()
        await expect(aboutModal.videoModalLabel).toHaveText(AboutData.About_Us)
        await expect(aboutModal.closeModalCross).toBeVisible()
        await expect(aboutModal.videoBlock).toBeVisible()
        await expect(aboutModal.closeModalButton).toBeVisible()  
        await expect(aboutModal.closeModalButton).toHaveCSS('color','rgb(41, 43, 44)')
        await expect(aboutModal.closeModalButton).toHaveCSS('background-color','rgb(255, 255, 255)')      
    })

    test('Нажать на кнопку крестик -> модальное окно контактов закрывается', async()=>{
        await aboutModal.closeModalCross.click()
        await expect(aboutModal.videoModal).toHaveAttribute('class', 'modal fade')
    })

    test('Нажать на кнопку Close ->  модальное окно контактов закрывается', async()=>{
        await aboutModal.closeModalButton.click()
        await expect(aboutModal.videoModal).toHaveAttribute('class', 'modal fade')
    })
})


// PWDEBUG=1 npx playwright test