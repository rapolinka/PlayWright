import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";


test.describe("[E2E][Sales Portal][Products]", async () => {
  test.beforeEach(
    "Login with valid credentials",
    async ({ page, loginPage }) => {
      await loginPage.open();
      await loginPage.waitForElementToBeDisplyed();
      await loginPage.fillCredentials(credentials);
      await loginPage.clickLogin();
    }
  );

  test("Delete product via modal and verify it’s removed from the table", async ({
    page,
    homePage,
    productsListPage,
    addNewProduct,
    productDeleteModal,
  }) => {
    await homePage.waitForOpened();
    await homePage.clickOnViewModel("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProduct.waitForOpened();
    const productData = generateProductData();
    await addNewProduct.fillForm(productData);
    await addNewProduct.clickSave();
    await addNewProduct.waitForOpened();

    await productsListPage.waitForNotification(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(
      productsListPage.tableRowByName(productData.name)
    ).toBeVisible();

    await expect(
      productsListPage.fisrtTableRowByName(productData.name)
    ).toBeVisible();

    const productFromTable = await productsListPage.getProductData(
      productData.name
    );
    const expectedProduct = _.omit(productData, ["notes", "amount"]);
    const actualProduct = _.omit(productFromTable, ["createdOn"]);
    expect(actualProduct).toEqual(expectedProduct);

    await productsListPage.clickDeleteProduct(productData.name);
    await productDeleteModal.waitForOpened();
    await productDeleteModal.delete();
    await productDeleteModal.waitForClosed();
    await productsListPage.waitForNotification(NOTIFICATIONS.PRODUCT_DELETED);
    await productsListPage.expectProductDeleted(productData.name);
  });
});
