import { Page } from "@playwright/test";
import { IProductDetails } from "data/types/product.types";
import { ProductDetailsModal } from "ui/pages/products/details.modal";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { logStep } from "utils/report/logStep.utils";

export class DetailsProductUIServise {
  productListPage: ProductsListPage;
  productDetailsModal: ProductDetailsModal;

  constructor(private page: Page) {
    this.productListPage = new ProductsListPage(page);
    this.productDetailsModal = new ProductDetailsModal(page);
  }

  @logStep("Get data from Details modal for updated product")
  async getProductInDetailsModal(updatedProduct: IProductDetails) {
    return await this.productDetailsModal.getData();
  }
}
