import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { STATUS_CODES } from "data/statusCodes";
import { IProduct, IProductResponse } from "data/types/product.types";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import _ from "lodash";
import { logStep } from "utils/report/logStep.utils";

export class AddNewProductUIServise {
  addNewProductPage: AddNewProductPage;
  productsListPage: ProductsListPage;
  constructor(private page: Page) {
    this.addNewProductPage = new AddNewProductPage(page);
    this.productsListPage = new ProductsListPage(page);
  }

  @logStep("Create a new pruduct and come back to Product List page")
  async create(productData?: Partial<IProduct>) {
    const data = generateProductData();
    await this.addNewProductPage.fillForm(data);
    const response = await this.productsListPage.interceptResponse<
      IProductResponse,
      any
    >(
      apiConfig.endpoints.products,
      this.addNewProductPage.clickSave.bind(this.addNewProductPage)
    );
    expect(
      response.status,
      `Expected response status to be ${STATUS_CODES.CREATED}`
    ).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Product, "Product from response should match created product",  "_id", "createdOn")).toEqual(data);
    await this.productsListPage.waitForOpened();
    return response.body.Product;
  }

  @logStep("Go to Add New Product page")
  async open() {
    await this.addNewProductPage.open("products/add");
    await this.addNewProductPage.waitForOpened();
  }
}
