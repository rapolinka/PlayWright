import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import { createProductSchema } from "data/schemas/products/product.schema";
import { IProductFromResponse } from "data/types/product.types";
import { expect, test } from "fixtures/pages.fixture";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";

const { baseUrl, endpoints } = apiConfig;

test.describe("[API][Sales Portal][Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ request }) => {
    const response = await request.delete(
      `${baseUrl}${endpoints.products}/${id}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    expect(response.status()).toBe(204);
  });

  test("[API][Create Product]", async ({ request }) => {
    const loginResponse = await request.post(baseUrl + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      },
    });
    const loginBody = await loginResponse.json();
    expect(loginResponse.status()).toBe(200);
    expect(loginBody.IsSuccess).toBe(true);
    expect(loginBody.ErrorMessage).toBe(null);
    expect(loginBody.User.username).toBe(credentials.username);

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
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    const actualProductData = createProductBody.Product as IProductFromResponse;

    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(
      productData
    );
    id = actualProductData._id;

    //GET THE PRODUCT
    const getProductResponse = await request.get(
      `${baseUrl}${endpoints.products}/${actualProductData._id}`,
      {
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );

    const getProductBody = await getProductResponse.json();
    await validateResponse(getProductResponse, {
      status: 200,
      IsSuccess: true,
      ErrorMessage: null,
    });
    
    expect(_.omit(getProductBody.Product, ["_id", "createdOn"])).toEqual(
      productData
    );
  });
});
