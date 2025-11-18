import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { SALES_PORTAL_URL } from "config/env";
import { apiConfig } from "config/apiConfig";
import {
  generateProductResponseData,
} from "data/salesPortal/generateProductData";
import { Mock } from "mock/mock";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  test("Table sorting: createdOn, direction: asc", async ({
    loginAsAdmin,
    productsListPage,
    mock,
    page,
  }) => {
    const product1 = generateProductResponseData();
    const product2 = generateProductResponseData();

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "products");
    await productsListPage.waitForOpened();

    await mock.productspage({
      Products: [product1, product2],
      IsSuccess: true,
      ErrorMessage: null,
      limit: 10,
      manufacturer: [],
      page: 1,
      search: "",
      sorting: { sortField: "createdOn", sortOrder: "asc" },
      total: 3,
    });

    const request = await productsListPage.interceptRequest(
      apiConfig.endpoints.products,
      productsListPage.clickTableHeader.bind(productsListPage),
      "Created On"
    );
    await productsListPage.waitForOpened();
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=asc&page=1&limit=10`
    );
    expect(
      productsListPage.tableHeaderArrow("Created On", { direction: "asc" })
    ).toBeVisible();
  });

  test("Field: createdOn, direction: desc", async ({
    loginAsAdmin,
    productsListPage,
    page,
    mock,
  }) => {
    const product1 = generateProductResponseData();
    const product2 = generateProductResponseData();
    await mock.productspage({
      Products: [product1, product2],
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "asc",
      },
    });

    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "products");
    await productsListPage.waitForOpened();

    await mock.productspage({
      Products: [product1, product2],
      IsSuccess: true,
      ErrorMessage: null,
      total: 1,
      page: 1,
      limit: 10,
      search: "",
      manufacturer: [],
      sorting: {
        sortField: "createdOn",
        sortOrder: "desc",
      },
    });
    const request = await productsListPage.interceptRequest(
      apiConfig.endpoints.products,
      productsListPage.clickTableHeader.bind(productsListPage),
      "Created On"
    );

    await productsListPage.waitForOpened();
    expect(request.url()).toBe(
      `${apiConfig.baseUrl}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=desc&page=1&limit=10`
    );

    expect(
      productsListPage.tableHeaderArrow("Created On", { direction: "desc" })
    ).toBeVisible();
  });
});
