import {test, expect} from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[E2E][Sales Portal][Products]", async () => {
  test.beforeEach("Login with valid credentials", async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.waitForElementToBeDisplyed();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin();
  });

  test("Newly added product is shown at the top of Products List with correct data", async ({
    page,homePage, productsListPage, addNewProductPage
  }) => {
    
    await homePage.waitForOpened();
    await homePage.clickOnViewModel("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await addNewProductPage.waitForOpened();

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
  });
});
