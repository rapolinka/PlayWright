import test, { expect } from "@playwright/test";
import { credentials } from "config/env";
import { generateProductData } from "data/salesPortal/generateProductData";
import { NOTOFICATIONS } from "data/salesPortal/notifications";
import { HomePage } from "ui/pages/home.page";
import { AddNewProduct } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";


test.describe("[Sales Portal][Products]", async () => {
  test("Add new product", async ({ page }) => {
    const homePage = new HomePage(page);
    const productsListPage = new ProductsListPage(page);
    const addNewProduct = new AddNewProduct(page); 

    const emailInput = page.locator("#emailinput");
    const passwordInput = page.locator("#passwordinput");
    const submitButton = page.locator("button[type= 'submit']");

    await homePage.open(); //ДОЛЖНО ВЫЗЫВАТЬСЯ ИЗ LOGIN страницы, ДЗ
    await expect(emailInput).toBeVisible();
    await emailInput.fill(credentials.username);
    await passwordInput.fill(credentials.password);
    await submitButton.click();

    await homePage.waitForOpened();
    await homePage.clickOnViewModel("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProduct.waitForOpened();
    const productDdata = generateProductData()
    await addNewProduct.fillForm(productDdata);
    await addNewProduct.clickSave();
    await addNewProduct.waitForOpened();

    await expect(productsListPage.toastMessage).toContainText(NOTOFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productDdata.name)).toBeVisible();
  });
});
