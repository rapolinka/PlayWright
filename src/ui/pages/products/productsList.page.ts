import { IProductInTable } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufactures";

export class ProductsListPage extends SalesPortalPage {
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addProductButton = this.page.locator("[name= 'add-button']");
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", {
      has: this.page.locator("td", { hasText: productName }),
    });

  readonly fisrtTableRowByName = (productName: string) =>
    this.page.locator("table tbody tr", {
      has: this.page.getByRole("cell", { name: productName, exact: true }),
    });

  readonly nameCell = (productName: string) =>
    this.tableRowByName(productName).locator("td").nth(0);
  readonly priceCell = (productName: string) =>
    this.tableRowByName(productName).locator("td").nth(1);
  readonly manufacturerCell = (productName: string) =>
    this.tableRowByName(productName).locator("td").nth(2);
  readonly createdOnCell = (productName: string) =>
    this.tableRowByName(productName).locator("td").nth(3);

  readonly editButton = (productName: string) =>
    this.tableRowByName(productName).getByText("Edit");
  readonly deteilsButton = (productName: string) =>
    this.tableRowByName(productName).getByText("Details");
  readonly deleteButton = (productName: string) =>
    this.tableRowByName(productName).getByText("Delete");

  readonly uniqueElement = this.addProductButton;

  async clickAddNewProduct() {
    await this.addProductButton.click();
  }

  async getProductData(productName: string): Promise<IProductInTable> {
    const [name, price, manufacturer, createdOn] = await this.tableRowByName(
      productName
    )
      .locator("td")
      .allInnerTexts();
    return {
      name: name!,
      price: +price!.replace("$", ""),
      manufacturer: manufacturer! as MANUFACTURERS,
      createdOn: createdOn!,
    };
  }
}
