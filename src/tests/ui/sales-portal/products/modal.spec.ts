import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[E2E][Sales Portal][Products]", async () => {
  test(
    "Delete product via modal and verify it’s removed from the table",
    {
      tag: [TAGS.REGRESSION, TAGS.SMOKE, TAGS.UI],
    },
    async ({
      productsListPage,
      addNewProductPage,
      productDeleteModal,
      homeUIServise,
    }) => {
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
        "Products table: newly created product should appear in the first row"
      ).toBeVisible();

      const productFromTable = await productsListPage.getProductData(
        productData.name
      );
      const expectedProduct = _.omit(productData, ["notes", "amount"]);
      const actualProduct = _.omit(productFromTable, ["createdOn"]);
      expect(
        actualProduct,
        "Products table: displayed row data should match the created product"
      ).toEqual(expectedProduct);

      await productsListPage.clickDeleteProduct(productData.name);
      await productDeleteModal.waitForOpened();
      await productDeleteModal.delete();
      await productDeleteModal.waitForClosed();
      await productsListPage.waitForNotification(NOTIFICATIONS.PRODUCT_DELETED);
      await productsListPage.expectProductDeleted(productData.name);
    }
  );
});
