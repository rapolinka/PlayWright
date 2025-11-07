import { onligatoryFieldsSchema } from "data/schemas/products/product.schema";
import { test, expect } from "fixtures/api.fixture";
import { validateResponse } from "utils/validateResponse.utils";
import { STATUS_CODES } from "data/statusCodes";
import { NEGATIVE_CREATE_CASES } from "data/salesPortal/products/createProduct.data";
import {  IProduct } from "data/types/product.types";


test.describe("[API][Products][Create Product with DDT - Negative Tests]", () => {


  for (const tc of NEGATIVE_CREATE_CASES) {
    test(tc.title, async ({ loginApiService, productsApi }) => {
      const token = await loginApiService.loginAsAdmin();

      const productData = tc.input;

      const createdProduct = await productsApi.create(token, productData as unknown as IProduct);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        schema: onligatoryFieldsSchema,
        
      });

      expect(createdProduct.body.IsSuccess).toBe(false);
      expect(createdProduct.body.ErrorMessage).toEqual("Incorrect request body");
    });
  }
});
