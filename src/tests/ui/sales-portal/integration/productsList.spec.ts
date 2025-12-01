import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { apiConfig } from "config/apiConfig";
import { generateProductResponseData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  test(
    "Table sorting: createdOn, direction: asc",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ homeUIServise, productsListPage, mock }) => {
      const product1 = generateProductResponseData();
      const product2 = generateProductResponseData();

      await homeUIServise.open();
      await homeUIServise.openModuleButton("Products");

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
      expect(request.url(), "Products list: sorting request URL should include sortField=createdOn and sortOrder=asc").toBe(
        `${apiConfig.baseUrl}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=asc&page=1&limit=10`
      );
      expect(
        productsListPage.tableHeaderArrow("Created On", { direction: "asc" })
      ).toBeVisible();
    }
  );

  test(
    "Table sorting:: createdOn, direction: desc",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ productsListPage, mock, homeUIServise }) => {
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

      await homeUIServise.open();
      await homeUIServise.openModuleButton("Products");

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
      expect(request.url(), "Products list: sorting request URL should include sortField=createdOn and sortOrder=desc").toBe(
        `${apiConfig.baseUrl}${apiConfig.endpoints.products}?sortField=createdOn&sortOrder=desc&page=1&limit=10`
      );

      expect(
        productsListPage.tableHeaderArrow("Created On", { direction: "desc" })
      ).toBeVisible();
    }
  );
});
