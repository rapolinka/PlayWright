import { test as base, expect } from "@playwright/test";
import { AddNewCustomerUIServise } from "tests/ui/service/addNewCustomer.ui.servise";
import { AddNewProductUIServise } from "tests/ui/service/addNewProduct.ui-servise";
import { CustomerListUIServise } from "tests/ui/service/customerList.ui-servise";
import { DetailsProductUIServise } from "tests/ui/service/detailsProduct.ui-servise";
import { EditProductUIServise } from "tests/ui/service/editProduct.ui-servise";
import { HomeUIServise } from "tests/ui/service/home.ui-servise";
import { LoginUIServise } from "tests/ui/service/login.ui-servise";
import { ProductsListUIServise } from "tests/ui/service/productsList.ui-servise";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomerListPage } from "ui/pages/customers/customerList";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductDeleteModal } from "ui/pages/products/delete.modals";
import { ProductsListPage } from "ui/pages/products/productsList.page";

export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  productDeleteModal: ProductDeleteModal;
  customerListPage: CustomerListPage;
  addNewCustomerPage: AddNewProductPage;
  

  //ui services
  homeUIServise: HomeUIServise;
  productsListUIServise: ProductsListUIServise;
  addNewProductUIServise: AddNewProductUIServise;
  loginUIServise: LoginUIServise;
  editProductUIServise: EditProductUIServise;
  detailsProductUIServise: DetailsProductUIServise;
  customerListUIServise: CustomerListUIServise;
  addNewCustomerUIServise: AddNewCustomerUIServise;
}

const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  productDeleteModal: async ({ page }, use) => {
    await use(new ProductDeleteModal(page));
  },
  customerListPage: async ({ page }, use) => {
    await use(new CustomerListPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },

  //ui services
  homeUIServise: async ({ page }, use) => {
    await use(new HomeUIServise(page));
  },
  productsListUIServise: async ({ page }, use) => {
    await use(new ProductsListUIServise(page));
  },
  addNewProductUIServise: async ({ page }, use) => {
    await use(new AddNewProductUIServise(page));
  },
   loginUIServise: async ({ page }, use) => {
    await use(new LoginUIServise(page));
  },
  editProductUIServise: async ({ page }, use) => {
    await use(new EditProductUIServise(page));
  },
  detailsProductUIServise: async ({ page }, use) => {
    await use(new DetailsProductUIServise(page));
  },
  customerListUIServise: async ({ page }, use) => {
    await use(new CustomerListUIServise(page));
  },
   addNewCustomerUIServise: async ({ page }, use) => {
    await use(new AddNewCustomerUIServise(page));
  },
});

export { test, expect };
