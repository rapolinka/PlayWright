
import { POSITIVE_CREATE_CASES } from "data/salesPortal/products/createProduct.ddt.data";
import { createProductSchema } from "data/schemas/products/product.schema";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures";
import { validateResponse } from "utils/validateResponse.utils";



// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками

//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols

test.describe("[API][Products][Create Product with DDT - Positive Tests]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  for (const tc of POSITIVE_CREATE_CASES) {
    test(tc.title, 
      {
        tag: [TAGS.REGRESSION, TAGS.API]
      }, async ({ loginApiService, productsApi }) => {
      token = await loginApiService.loginAsAdmin();

      const productData = tc.input;

      const createdProduct = await productsApi.create(token, productData);
      validateResponse(createdProduct, {
        status: STATUS_CODES.CREATED,
        schema: createProductSchema,
        IsSuccess: true,
        ErrorMessage: null,
      });

      id = createdProduct.body.Product._id;

      const p = createdProduct.body.Product;
      expect(p.name).toBe(productData.name);
      expect(p.manufacturer).toBe(productData.manufacturer);
      expect(p.price).toBe(productData.price);
      expect(p.amount).toBe(productData.amount);
      if (productData.notes !== undefined) {
        expect(p.notes ?? "").toBe(productData.notes);
      }

      expect(createdProduct.body.IsSuccess, "Expected IsSuccess to be true").toBe(true);
      expect(createdProduct.body.ErrorMessage, "Expected not to  receive message for ErrorMessage").toBeNull();
    });
  }
});
