import { SalesPortalPage } from "../salesPortal.page";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addProductButton = this.page.locator("[name= 'add-button']");
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", {
      has: this.page.locator("td", { hasText: productName }),
    });

  readonly uniqueElement = this.addProductButton;

  async clickAddNewProduct() {
    await this.addProductButton.click();
  }
}
