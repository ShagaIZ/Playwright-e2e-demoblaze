import { expect, Locator, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginInModal:Locator;
  readonly loginInModalLabel:Locator;



  constructor(page: Page) {
    this.page = page;
    this.loginInModal = page.locator('[data-target="#logInModal"]');
    this.loginInModalLabel = page.locator('[id="logInModalLabel"]');
  
   
  }
  async openDemoblaze(){
      await this.page.goto('https://www.demoblaze.com/index.html');
  };
  async clickLoginInModal(){
      await this.loginInModal.click()
  };
 
}