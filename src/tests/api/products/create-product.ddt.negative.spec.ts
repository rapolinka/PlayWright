import { onligatoryFieldsSchema } from "data/schemas/products/product.schema";
import { test, expect } from "fixtures";
import { validateResponse } from "utils/validateResponse.utils";
import { STATUS_CODES } from "data/statusCodes";

import { NEGATIVE_CREATE_CASES } from "data/salesPortal/products/createProduct.ddt.data";
import { IProduct } from "data/types/product.types";
import { TAGS } from "data/tags";



test.describe("[API][Products][Create Product with DDT - Negative Tests]", () => {


  for (const tc of NEGATIVE_CREATE_CASES) {
    test(tc.title, 
      {
        tag: [TAGS.REGRESSION, TAGS.API]
      },async ({ loginApiService, productsApi }) => {
      const token = await loginApiService.loginAsAdmin();

      const productData = tc.input;

      const createdProduct = await productsApi.create(token, productData as unknown as IProduct);
      validateResponse(createdProduct, {
        status: STATUS_CODES.BAD_REQUEST,
        schema: onligatoryFieldsSchema,
        
      });

      expect(createdProduct.body.IsSuccess, "Expected IsSuccess to be false").toBe(false);
      expect(createdProduct.body.ErrorMessage, "Expected to receive message for ErrorMessage").toEqual("Incorrect request body");
    });
  }
});