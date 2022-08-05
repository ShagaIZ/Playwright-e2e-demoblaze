import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login';


export const test = base.extend<{ loginPage: LoginPage }>({
    loginPage: async ({page}, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.page.goto('https://www.demoblaze.com/index.html');
    await use(loginPage);
  
  },
});