import { Page } from "@playwright/test";
import { credentials } from "config/env";
import { ICredentials } from "data/types/credentils.types";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login/login.page";
import { logStep } from "utils/report/logStep.utils";

export class LoginUIServise {
  loginPage: LoginPage;
  homePage: HomePage;
  constructor(private page: Page) {
    this.loginPage = new LoginPage(page);
    this.homePage = new HomePage(page);
  }
  @logStep("Login as Admin")
  async loginAsAdmin() {
    return await this.login(credentials);
  }

  @logStep("Login in and get Authorization token")
  async login(credentials: ICredentials) {
    await this.loginPage.open();
    await this.loginPage.fillCredentials(credentials);
    await this.loginPage.clickLogin();
    await this.homePage.waitForOpened();
    const token = (await this.page.context().cookies()).find(
      (c) => c.name === "Authorization"
    )!.value;
    return token;
  }
}
