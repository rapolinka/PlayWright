import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/product.schema";
import { IProduct } from "data/types/product.types";
import { STATUS_CODES } from "data/statusCodes";
import { validateResponse } from "utils/validateResponse.utils";
import { ProductsApi } from "api/api/products.api";
import { logStep } from "utils/report/logStep.utils";


export class ProductsApiService {
  constructor(private productsApi: ProductsApi) {}

  @logStep("Create product via API")
  async create(token: string, productData?: IProduct) {
    const data = generateProductData(productData);
    const response = await this.productsApi.create(token, data);
    validateResponse(response, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
      schema: createProductSchema,
    });
    return response.body.Product;
  }

  @logStep("Delete product via API")
  async delete(token: string, id: string) {
    const response = await this.productsApi.delete(token, id);
    validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  }
}