import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly modalWindow:Locator;
  readonly loginInModal:Locator;
  readonly loginInModalLabel:Locator;
  readonly closeModalCross:Locator;
  readonly loginUsernameField:Locator;
  readonly loginPasswordField:Locator;
  readonly closeModalButton:Locator;
  readonly loginButton:Locator;
  readonly nameOfUser:Locator;



  constructor(page: Page) {
    this.page = page;
    this.modalWindow = page.locator('[id="logInModal"]');
    this.loginInModal = page.locator('[data-target="#logInModal"]');
    this.loginInModalLabel = page.locator('[id="logInModalLabel"]');
    this.closeModalCross = page.locator('text=Log in × >> [aria-label="Close"]');
    this.loginUsernameField = page.locator('[id="loginusername"]');
    this.loginPasswordField = page.locator('[id="loginpassword"]');
    this.closeModalButton = page.locator('#logInModal >> text=Close');
    this.loginButton = page.locator('[onclick="logIn()"]'); 
    this.nameOfUser = page.locator('[id="nameofuser"]');
    
  }
  async openDemoblaze(){
      await this.page.goto('https://www.demoblaze.com/index.html');
  };

  async clickLoginInModal(){
      await this.loginInModal.click();
  };

  async typeUsernameField(username:string){
    await this.loginUsernameField.click();
    await this.loginUsernameField.type(username);
  };

  async typePasswordField(password:string){
    await this.loginPasswordField.click();
    await this.loginPasswordField.type(password);
  };

  async fillUsernameField(username:string){
    await this.loginUsernameField.fill(username);
  };

  async fillPasswordField(password:string){
    await this.loginPasswordField.fill(password);
  };

  async clickLoginButton(){
    await this.loginButton.click();
  };

 
}