import { Locator, Page } from '@playwright/test';


export class HomePage {
  readonly page: Page;
  readonly loginModal:Locator;
  readonly loginUsernameField:Locator;
  readonly loginPasswordField:Locator;
  readonly loginButton:Locator;
  readonly titleOfHeader:Locator;
  readonly iconOfNavbarBrend:Locator;
  readonly countOfElementsInTitleOfHeader:Locator;
  readonly navbarHeaderElement: Locator;
  readonly homeButtonHeader:Locator;
  readonly contactButtonHeader:Locator;
  readonly aboutUsButtonHeader:Locator;
  readonly cartButtonHeader:Locator;
  readonly logoutButtonHeader:Locator;
  readonly nameUserButtonHeader:Locator;
  readonly sliderWindow:Locator;
  readonly sliderWindowPreviousButton:Locator;
  readonly sliderWindowNextButton:Locator;
  readonly categoriesTitle:Locator;
  readonly categoryPhones:Locator;
  readonly categoryLaptops:Locator;
  readonly categoryMonitors:Locator;
  readonly activenessOfSlideImg:Locator
  readonly firstSlide:Locator;



  constructor(page: Page) {
    this.page = page;
    this.loginModal = page.locator('[data-target="#logInModal"]');
    this.loginUsernameField = page.locator('[id="loginusername"]');
    this.loginPasswordField = page.locator('[id="loginpassword"]');
    this.loginButton = page.locator('[onclick="logIn()"]'); 
    this.titleOfHeader = page.locator('[class="navbar-brand"]');
    this.countOfElementsInTitleOfHeader = page.locator('[class="navbar-brand"]>[src="bm.png"]');
    this.navbarHeaderElement = page.locator('[id="navbarExample"]');
    this.homeButtonHeader = page.locator('[class="nav-item active"]');
    this.contactButtonHeader = page.locator('[data-target="#exampleModal"]');
    this.aboutUsButtonHeader = page.locator('[data-target="#videoModal"]');
    this.cartButtonHeader = page.locator('[id="cartur"]');
    this.logoutButtonHeader = page.locator('[id="logout2"]');
    this.nameUserButtonHeader = page.locator('[id="nameofuser"]');
    this.sliderWindow = page.locator('[id="contcar"]');
    this.sliderWindowPreviousButton = page.locator('[class="carousel-control-prev-icon"]');
    this.sliderWindowNextButton = page.locator('[class="carousel-control-next-icon"]');
    this.categoriesTitle = page.locator('[id="cat"]');
    this.categoryPhones = page.locator('#itemc >> text=Phones');
    this.categoryLaptops = page.locator('#itemc >> text=Laptops');
    this.categoryMonitors = page.locator('#itemc >> text=Monitors');
    this.activenessOfSlideImg = page.locator('[class="carousel-item active"]>[class="d-block img-fluid"]');
  
    
    
  }
  async openDemoblaze(){
      await this.page.goto('https://www.demoblaze.com/index.html');
  };

  async clickLoginInModal(){
      await this.loginModal.click();
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

  async clickSliderWindowNextButton(){
    await this.sliderWindowNextButton.click();
    await this.page.waitForTimeout(1000);
  };
  
  async clickSliderWindowPreviousButton(){
    await this.sliderWindowPreviousButton.click();
    await this.page.waitForTimeout(1000);
  };
};