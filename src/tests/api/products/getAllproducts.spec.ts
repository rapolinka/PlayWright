import { validateResponse } from "utils/validateResponse.utils";
import { STATUS_CODES } from "data/statusCodes";
import { IProductFromResponse } from "data/types/product.types";
import { test, expect } from "fixtures/api.fixture";
import { TAGS } from "data/tags";

// const { baseUrl, endpoints } = apiConfig;

// Написать смоук API тест на получение всех продуктов (без фильтрационных параметров) со следующими шагами:
//   - Залогиниться
//   - Создать продукт и проверить 201й статус
//   - Получить все продукты
//   - создать и проверить схему
//   - проверить статус
//   - проверить, что в массиве тела респонса есть созданный продукт
//   - Проверить поля IsSuccess и ErrorMessage

test.describe("[API][Smoke][Get all products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    await productsApiService.delete(token, id);
  });

  test("[API][Get all products]", 
    {
      tag: [TAGS.REGRESSION, TAGS.API]
    },async ({
    loginApiService,
    productsApiService,
    productsApi,
  }) => {
    token = await loginApiService.loginAsAdmin();

    //CREATE PRODUCT
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;

    //GET ALL PRODUCTS
    const getAllProductsResponse = await productsApi.getAll(token);
    await validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const { body } = getAllProductsResponse;
    const found = body.Products.find(
      (p: IProductFromResponse) => p._id === createdProduct._id
    );
    expect(
      found,
      `Created product ${createdProduct.name} must be in the list`
    ).toBeTruthy();

    expect(found!.name, "Product name in the table should match created product name").toBe(createdProduct.name);
    expect(found!.manufacturer, "Product manufacturer in the table should match created  product manufacturer ").toBe(createdProduct.manufacturer);
    expect(found!.price, "Product price in the table should match created product price").toBe(createdProduct.price);
    expect(found!.amount, "Product amount in the table should match created  product amount").toBe(createdProduct.amount);
  });
});
