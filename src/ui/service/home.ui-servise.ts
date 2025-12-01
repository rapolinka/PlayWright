import test, { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { logStep } from "utils/report/logStep.utils";

export class HomeUIServise {
  homePage: HomePage;
  productListPage: ProductsListPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productListPage = new ProductsListPage(page);
  }

  async openModuleButton(moduleName: HomeModuleButton) {
    await test.step(`Click ${moduleName} module on Home page`, async () => {
      await test.step(`Go to ${moduleName} List page`, async () => {
        await this.homePage.clickOnViewModel(moduleName);
        if (moduleName === "Products") {
          await this.productListPage.waitForOpened();
        }
        if (moduleName === "Customers") {
          await this.productListPage.waitForOpened();
        }
      });
    });
  }

  @logStep("Go to Home page")
  async open() {
    await this.homePage.open("home");
    await this.homePage.waitForOpened();
  }
}
