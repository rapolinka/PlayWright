import { Page } from "@playwright/test";
import { IProduct } from "data/types/product.types";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductEditModal } from "ui/pages/products/edit.modal";
import { ProductsListPage } from "ui/pages/products/productsList.page";

export class ProductsListUIServise {
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  productEditModal: ProductEditModal;

  constructor(private page: Page) {
    this.productsListPage = new ProductsListPage(page);
    this.addNewProductPage = new AddNewProductPage(page);
    this.productEditModal = new ProductEditModal(page);
  }

  async openAddNewProductPage() {
    await this.productsListPage.clickAddNewProduct();
    await this.addNewProductPage.waitForOpened();
  }

  async openDetailsModal(productName: string) {
    await this.productsListPage.detailsButton(productName).click();
    await this.productsListPage.detailsModal.waitForOpened();
  }

  async openEditModal(productName: string) {
    await this.productsListPage.editButton(productName).click();
    await this.productsListPage.editModal.waitForOpened();
  }

  async getProductDataInTable(updatedProduct: IProduct) {
    return await this.productsListPage.getProductData(updatedProduct.name);
  }
}
