import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProductResponse } from "data/types/product.types";
import { ProductEditModal } from "ui/pages/products/edit.modal";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import _ from "lodash";
import { logStep } from "utils/report/logStep.utils";

export class EditProductUIServise {
  productListPage: ProductsListPage;
  productEditModal: ProductEditModal;

  constructor(private page: Page) {
    this.productListPage = new ProductsListPage(page);
    this.productEditModal = new ProductEditModal(page);
  }

  @logStep("Update product and come back to Products List page")
  async updateProduct(productID: string) {
    const updatedProduct = generateProductData();
    await this.productEditModal.fillForm(updatedProduct);
    const response = await this.productEditModal.interceptResponse<
      IProductResponse,
      any
    >(
      apiConfig.endpoints.productById(productID),
      this.productEditModal.clickSave.bind(this.productEditModal)
    );
    expect(response.status).toBe(STATUS_CODES.OK);
    expect(_.omit(response.body.Product,"Updated product from response should match updated product", "_id", "createdOn")).toEqual(
      updatedProduct
    );
    await this.productListPage.waitForOpened();
    return response.body.Product;
  }
}
