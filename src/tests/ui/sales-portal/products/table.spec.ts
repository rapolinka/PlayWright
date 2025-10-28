import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login/login.page";
import { AddNewProduct } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

test.describe("[Sales Portal][Products]", async () => {
  test.beforeEach("Login with valid credentials", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.waitForLogin();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin();
  });

  test("Newly added product is shown at the top of Products List with correct data", async ({
    page,
  }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProduct = new AddNewProduct(page);

    await homePage.waitForOpened();
    await homePage.clickOnViewModel("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProduct.waitForOpened();
    const productData = generateProductData();
    await addNewProduct.fillForm(productData);
    await addNewProduct.clickSave();
    await addNewProduct.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_CREATED
    );
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
