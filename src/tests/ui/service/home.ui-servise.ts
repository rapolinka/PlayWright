import { Page } from "@playwright/test";
import { HomeModuleButton, HomePage } from "ui/pages/home.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

export class HomeUIServise {
  homePage: HomePage;
  productListPage: ProductsListPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productListPage = new ProductsListPage(page);
  }

  async openModuleButton(moduleName: HomeModuleButton) {
    await this.homePage.clickOnViewModel(moduleName);
    if(moduleName === "Products"){
        await this.productListPage.waitForOpened();
    }
    if(moduleName === "Customers"){
      await this.productListPage.waitForOpened();
    }
  }
}
