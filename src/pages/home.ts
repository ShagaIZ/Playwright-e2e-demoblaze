import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly loginInModal:Locator;
  readonly loginUsernameField:Locator;
  readonly loginPasswordField:Locator;
  readonly loginButton:Locator;
  readonly navbarBrend:Locator;
  readonly iconOfNavbarBrend:Locator;
  readonly countOfElementsInNavbarBrend:Locator;


  readonly sliderWindow:Locator;
  



  constructor(page: Page) {
    this.page = page;
    this.loginInModal = page.locator('[data-target="#logInModal"]');
    this.loginUsernameField = page.locator('[id="loginusername"]');
    this.loginPasswordField = page.locator('[id="loginpassword"]');
    this.loginButton = page.locator('[onclick="logIn()"]'); 
    this.navbarBrend = page.locator('[class="navbar-brand"]');
    this.countOfElementsInNavbarBrend = page.locator('[class="navbar-brand"]>[src="bm.png"]')

    this.sliderWindow = page.locator('[id="contcar"]');
    
    
    
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
  async clickLoginButton(){
    await this.loginButton.click();
  };

};