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
  readonly previousButtonOfPagination:Locator
  readonly nextButtonOfPagination:Locator
  readonly nokiaLumiaItem:Locator
  readonly nexusSixItem:Locator
  readonly samsungGalaxySevenItem:Locator
  readonly samsungGalaxySixItem:Locator
  readonly iphoneSixItem:Locator
  readonly sonyXperiazFiveItem:Locator
  readonly htcOnemNineItem:Locator
  readonly sonyVaioiFiveItem:Locator
  readonly sonyVaioiSevenItem:Locator
  readonly appleMonitorItem:Locator
  readonly macBookAirItem:Locator
  readonly delliSevenItem:Locator
  readonly dellInchItem:Locator
  readonly asusFullHDItem:Locator
  readonly macBookProItem:Locator
  readonly numberOfItems:Locator



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
    this.sliderWindowPreviousButton = page.locator('[data-slide="prev"]');
    this.sliderWindowNextButton = page.locator('[data-slide="next"]');
    this.categoriesTitle = page.locator('[id="cat"]');
    this.categoryPhones = page.locator('#itemc >> text=Phones');
    this.categoryLaptops = page.locator('#itemc >> text=Laptops');
    this.categoryMonitors = page.locator('#itemc >> text=Monitors');
    this.activenessOfSlideImg = page.locator('[class="carousel-item active"]>[class="d-block img-fluid"]');
    this.previousButtonOfPagination = page.locator('[id="prev2"]');
    this.nextButtonOfPagination = page.locator('[id="next2"]');
    this.samsungGalaxySixItem = page.locator('[class="card-title"]>[href="prod.html?idp_=1"]');
    this.nokiaLumiaItem = page.locator('[class="card-title"]>[href="prod.html?idp_=2"]');
    this.nexusSixItem = page.locator('[class="card-title"]>[href="prod.html?idp_=3"]');
    this.samsungGalaxySevenItem = page.locator('[class="card-title"]>[href="prod.html?idp_=4"]');
    this.iphoneSixItem = page.locator('[class="card-title"]>[href="prod.html?idp_=5"]');
    this.sonyXperiazFiveItem = page.locator('[class="card-title"]>[href="prod.html?idp_=6"]');
    this.htcOnemNineItem = page.locator('[class="card-title"]>[href="prod.html?idp_=7"]');
    this.sonyVaioiFiveItem = page.locator('[class="card-title"]>[href="prod.html?idp_=8"]');
    this.sonyVaioiSevenItem = page.locator('[class="card-title"]>[href="prod.html?idp_=9"]');
    this.appleMonitorItem = page.locator('[class="card-title"]>[href="prod.html?idp_=10"]');
    this.macBookAirItem = page.locator('[class="card-title"]>[href="prod.html?idp_=11"]');
    this.delliSevenItem = page.locator('[class="card-title"]>[href="prod.html?idp_=12"]');
    this.dellInchItem = page.locator('[class="card-title"]>[href="prod.html?idp_=13"]');
    this.asusFullHDItem = page.locator('[class="card-title"]>[href="prod.html?idp_=14"]');
    this.macBookProItem = page.locator('[class="card-title"]>[href="prod.html?idp_=15"]');
    this.numberOfItems = page.locator('[id="tbodyid"]>[class="col-lg-4 col-md-6 mb-4"]')



  
    
    
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
    await this.page.waitForLoadState('networkidle');
  };
  
  async clickSliderWindowPreviousButton(){
    await this.sliderWindowPreviousButton.click();
    await this.page.waitForLoadState('networkidle');
  };
  

  async clickPreviousButtonOfPagination(){
    await this.page.waitForTimeout(2000)
    await this.previousButtonOfPagination.click();
  };

  async clickNextButtonOfPagination() {
    await this.page.waitForTimeout(2000)
    await this.nextButtonOfPagination.click();
  };

  async clickNextAfterPreviousButtonOfPagination(){
    await this.page.waitForTimeout(2000)
    await this.nextButtonOfPagination.click();
    await this.page.waitForTimeout(2000)
    await this.previousButtonOfPagination.click();
  };

  async clickNextAfterPreviousThenNextButtonOfPagination(){
    await this.page.waitForTimeout(2000)
    await this.nextButtonOfPagination.click();
    await this.page.waitForTimeout(2000)
    await this.previousButtonOfPagination.click();
    await this.page.waitForTimeout(2000)
    await this.nextButtonOfPagination.click();
  };

};