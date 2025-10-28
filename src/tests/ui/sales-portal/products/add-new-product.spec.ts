import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login/login.page";
import { AddNewProduct } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";


test.describe("[Sales Portal][Products]", async () => {
  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProduct = new AddNewProduct(page);
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.waitForLogin();
    await loginPage.fillCredentials(credentials);
    await loginPage.clickLogin();

    await homePage.waitForOpened();
    await homePage.clickOnViewModel("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProduct.waitForOpened();
    const productData = generateProductData()
    await addNewProduct.fillForm(productData);
    await addNewProduct.clickSave();
    await addNewProduct.waitForOpened();

  
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  });
});
