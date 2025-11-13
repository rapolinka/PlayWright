import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[E2E][Sales Portal][Products]", async () => {
  test.beforeEach("Login with valid credentials", async ({ page, loginPage }) => {
    await loginPage.open();
    await loginPage.waitForElementToBeDisplyed();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin();
  });

  test("Add new product", async ({
    page,homePage, productsListPage, addNewProduct
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
  });
});
