import { IProductInTable, ProductsTableHeader } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import { expect } from "@playwright/test";
import { ProductDetailsModal } from "./details.modal";
import { ProductEditModal } from "./edit.modal";

export class ProductsListPage extends SalesPortalPage {
  readonly detailsModal = new ProductDetailsModal(this.page);
  readonly editModal = new ProductEditModal(this.page);
  readonly productsPageTitle = this.page.locator("h2.fw-bold");
  readonly addProductButton = this.page.locator('[name="add-button"]');
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

  readonly tableHeader = this.page.locator("thead th div[current]");
  // readonly nameHeader = this.tableHeader.nth(0);
  readonly tableHeaderNamed = (name: ProductsTableHeader) =>
    this.tableHeader.filter({ hasText: name });

  readonly tableHeaderArrow = (
    name: ProductsTableHeader,
    { direction }: { direction: "asc" | "desc" }
  ) =>
    this.page
      .locator("thead th", {
        has: this.page.locator("div[current]", { hasText: name }),
      })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle("Edit");
  readonly detailsButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle("Details");
  readonly deleteButton = (productName: string) =>
    this.tableRowByName(productName).getByTitle("Delete");

  readonly uniqueElement = this.addProductButton;

  //BUTTONS
  async clickAddNewProduct() {
    await this.addProductButton.click();
  }
  async clickDeleteProduct(productName: string) {
    await this.deleteButton(productName).click();
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

  async getTableData(): Promise<IProductInTable[]> {
    const data: IProductInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [name, price, manufacturer, createdOn] = await row
        .locator("td")
        .allInnerTexts();
      data.push({
        name: name!,
        price: +price!.replace("$", ""),
        manufacturer: manufacturer! as MANUFACTURERS,
        createdOn: createdOn!,
      });
    }
    return data;
  }

  async expectProductDeleted(productName: string) {
    const row = this.tableRowByName(productName);
    await expect(row).toHaveCount(0);
  }

  async clickAction(
    productName: string,
    button: "edit" | "delete" | "details"
  ) {
    if (button === "edit") await this.editButton(productName).click();
    if (button === "delete") await this.deleteButton(productName).click();
    if (button === "details") await this.detailsButton(productName).click();
  }

  async clickTableHeader(name: ProductsTableHeader) {
    await this.tableHeaderNamed(name).click();
  }
}
