import { Locator, Page } from '@playwright/test'
import {HomePage } from './home'


export class AboutModal extends HomePage {
    readonly page:Page
    readonly videoModal: Locator
    readonly videoModalLabel:Locator
    readonly closeModalCross: Locator
    readonly closeModalButton: Locator
    readonly videoBlock: Locator
    readonly modalVisble: Locator
    

    constructor(page:Page){
        super(page)
        this.page = page
        this.videoModal = page.locator('[id="videoModal"]')
        this.videoModalLabel = page.locator('[id="videoModalLabel"]')
        this.closeModalCross = page.locator('[class="close"]').nth(3)
        this.closeModalButton = page.locator('[data-dismiss="modal"]').nth(7)
        this.videoBlock = page.locator('[id="example-video"]')   
        this.modalVisble = page.locator('[class="modal fade"]>>[id="videoModalLabel"]')
    }

    async openAboutModal(Username:string,Password:string){
        await this.page.goto('https://www.demoblaze.com/index.html')
        await this.loginInModal.click()
        await this.loginUsernameField.fill(Username)
        await this.loginPasswordField.fill(Password)
        await this.loginButton.click()
        await this.aboutUsButtonHeader.click()
    }

   
}
