import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { generateProductResponseData } from "data/salesPortal/products/generateProductData";
import { TAGS } from "data/tags";

test.describe("[Integration] [Sales Portal] [Products]", () => {
  test("Product Details", 
    {
      tag: [TAGS.REGRESSION, TAGS.UI]
    },async ({
    productsListPage,
    mock,
    homeUIServise,
  }) => {
    const expectedProductResponse = generateProductResponseData();

    // const mock = new Mock(page);
    await mock.productspage({
      Products: [expectedProductResponse],
      IsSuccess: true,
      ErrorMessage: null,
      limit: 10,
      manufacturer: [],
      page: 1,
      search: "",
      sorting: { sortField: "createdOn", sortOrder: "desc" },
      total: 3,
    });

    await mock.productsDetailModal({
      Product: expectedProductResponse,
      IsSuccess: true,
      ErrorMessage: null,
    });

    // await page.route(/\/api\/products(\/?.*)?$/, async (route) => {
    //   await route.fulfill({
    //     status: 200,
    //     contentType: "application/json",
    // body: JSON.stringify({
    //   Products: [expectedProductResponse],
    //   IsSuccess: true,
    //   ErrorMessage: null,
    //   limit: 10,
    //   manufacturer: [],
    //   page: 1,
    //   search: "",
    //   sorting: { sortField: "createdOn", sortOrder: "desc" },
    //   total: 3,
    // }),
    //   });
    // });

    // await page.route(
    //   apiConfig.baseUrl + apiConfig.endpoints.productById(productId),
    //   async (route) => {
    //     await route.fulfill({
    //       status: 200,
    //       contentType: "application/json",
    // body: JSON.stringify({
    //   Product: expectedProductResponse,
    //   IsSuccess: true,
    //   ErrorMessage: null,
    // }),
    //     });
    //   }
    // );
  
    await homeUIServise.open();
    await homeUIServise.openModuleButton("Products");
    await productsListPage.clickAction(expectedProductResponse.name, "details");
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();

    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"]), "Product data in Edit modal should match with mocked product data ").toEqual(_.omit(expectedProductResponse, ["createdOn", "_id"])
    );
  });
});
