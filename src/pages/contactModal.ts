import { Locator, Page } from '@playwright/test';



export class ContactModal{
    readonly page:Page
    readonly loginModal:Locator;
    readonly loginUsernameField:Locator;
    readonly loginPasswordField:Locator;
    readonly loginButton:Locator;
    readonly contactButtonHeader:Locator;
    readonly modalVisibile:Locator;
    readonly modalTitle:Locator;
    readonly closeModalCross:Locator;
    readonly emailField:Locator;
    readonly nameField:Locator;
    readonly messageField:Locator;
    readonly closeModalButton:Locator;
    readonly sendMessageButton:Locator;

    constructor(page:Page){
        this.page = page;
        this.loginModal = page.locator('[data-target="#logInModal"]');
        this.loginUsernameField = page.locator('[id="loginusername"]');
        this.loginPasswordField = page.locator('[id="loginpassword"]');
        this.loginButton = page.locator('[onclick="logIn()"]');
        this.contactButtonHeader = page.locator('[data-target="#exampleModal"]');
        this.modalVisibile = page.locator('[class="modal fade show"]');
        this.modalTitle = page.locator('[id="exampleModalLabel"]');
        this.closeModalCross = page.locator('text=New message × >> [aria-label="Close"]');
        this.emailField = page.locator('[id="recipient-email"]');
        this.nameField = page.locator('[id="recipient-name"]');
        this.messageField = page.locator('[id="message-text"]');
        this.closeModalButton = page.locator('#exampleModal >> text=Close');
        this.sendMessageButton = page.locator('#exampleModal >> text=Send message')
         
    };
    async openContactModal(Username:string,Password:string){
        await this.page.goto('https://www.demoblaze.com/index.html');
        await this.loginModal.click();
        await this.loginUsernameField.fill(Username);
        await this.loginPasswordField.fill(Password);
        await this.loginButton.click();
        await this.page.waitForNavigation()
        await this.contactButtonHeader.click()
    };

    async clickCrossButton(){
        await this.closeModalCross.click();
    };
    async clickCloseButton(){
        await this.closeModalButton.click();
    };
    async clicksendMessageButton(){
        await this.sendMessageButton.click();
    };

    async fillemailField(value:string){
        await this.emailField.fill(value);
    };

    async fillnameField(value:string){
        await this.nameField.fill(value);
    };

    async fillmessageField(value:string){
        await this.messageField.fill(value);
    };

    async loadPage():Promise<void>{
        await this.page.waitForLoadState('load')
        await this.page.waitForLoadState('domcontentloaded')
        await this.page.waitForLoadState('networkidle')
    }
};
