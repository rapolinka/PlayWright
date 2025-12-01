import { test, expect } from "fixtures/pages.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[E2E][Sales Portal][Products]", async () => {
  // test.beforeEach("Login with valid credentials", async ({ page, loginPage }) => {
  //   await loginPage.open();
  //   await loginPage.waitForElementToBeDisplyed();
  //   await loginPage.fillCredentials(credentials);
  //   await loginPage.clickLogin();
  // });

  test(
    "Newly added product is shown at the top of Products List with correct data",
    {
      tag: [TAGS.REGRESSION, TAGS.UI],
    },
    async ({ productsListPage, addNewProductPage, homeUIServise }) => {
      await homeUIServise.open();
      await homeUIServise.openModuleButton("Products");
      await productsListPage.clickAddNewProduct();
      await addNewProductPage.waitForOpened();
      const productData = generateProductData();
      await addNewProductPage.fillForm(productData);
      await addNewProductPage.clickSave();
      await addNewProductPage.waitForOpened();

      await productsListPage.waitForNotification(NOTIFICATIONS.PRODUCT_CREATED);

      await expect(
        productsListPage.tableRowByName(productData.name),
        "Products table: newly created product should be visible after creation"
      ).toBeVisible();

      await expect(
        productsListPage.fisrtTableRowByName(productData.name),
        "Products table: newly created product should appear at the top of the list"
      ).toBeVisible();

      const productFromTable = await productsListPage.getProductData(
        productData.name
      );
      const expectedProduct = _.omit(productData, ["notes", "amount"]);
      const actualProduct = _.omit(productFromTable, ["createdOn"]);
      expect(
        actualProduct,
        "Products table: displayed product data should match the created product"
      ).toEqual(expectedProduct);
    }
  );
});
