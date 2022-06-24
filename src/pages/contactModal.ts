import { Locator, Page } from '@playwright/test';



export class ContactModal{
    readonly page:Page
    readonly loginModal:Locator;
    readonly loginUsernameField:Locator;
    readonly loginPasswordField:Locator;
    readonly loginButton:Locator;
    readonly contactButtonHeader:Locator;
    readonly modalVisibility:Locator;

    constructor(page:Page){
        this.page = page;
        this.loginModal = page.locator('[data-target="#logInModal"]');
        this.loginUsernameField = page.locator('[id="loginusername"]');
        this.loginPasswordField = page.locator('[id="loginpassword"]');
        this.loginButton = page.locator('[onclick="logIn()"]');
        this.contactButtonHeader = page.locator('[data-target="#exampleModal"]');
        this.modalVisibility = page.locator('[class="modal fade show"]');
         
    };
    async openContactModal(CorrectUsername:string,CorrectPassword:string){
        await this.page.goto('https://www.demoblaze.com/index.html');
        await this.loginModal.click();
        await this.loginUsernameField.fill(CorrectUsername);
        await this.loginPasswordField.fill(CorrectPassword);
        await this.loginButton.click();
        await this.contactButtonHeader.click()

    };
};
