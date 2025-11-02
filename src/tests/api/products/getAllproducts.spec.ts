import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import { allProductsSchema } from "data/schemas/products/product.schema";
import { validateResponse } from "utils/validateResponse.utils";
import _ from "lodash";
import { checkCreatedProductInProductInList } from "utils/validateProducts.utils";
import { apiConfig } from "config/apiConfig";

const { baseUrl, endpoints } = apiConfig;

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

  test.afterEach(async ({ request }) => {
    const response = await request.delete(
      `${baseUrl}${endpoints.products}/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.status()).toBe(204);
  });

  test("[API][Get all products]", async ({ request }) => {
    const loginResponse = await request.post(baseUrl + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });

    const headers = loginResponse.headers();
    token = headers["authorization"]!;
    expect(token).toBeTruthy();

    //CREATE PRODUCT
    const productData = generateProductData();
    const createProductResponse = await request.post(
      baseUrl + endpoints.products,
      {
        data: productData,
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const createProductBody = await createProductResponse.json();
    await validateResponse(createProductResponse, {
      status: 201,
    });

     id = createProductBody._id ?? createProductBody.Product?._id;


    //GET ALL PRODUCTS
    const getAllProductsResponse = await request.get(
      `${baseUrl}${endpoints.products}/all`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const getAllProductsBody = await getAllProductsResponse.json();
    await validateResponse(getAllProductsResponse, {
      status: 200,
      schema: allProductsSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    await checkCreatedProductInProductInList(getAllProductsBody.Products, {
      name: productData.name,
      price: productData.price,
      manufacturer: productData.manufacturer,
      amount: productData.amount,
    });

  });
});
