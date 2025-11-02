import { test as base, expect } from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login/login.page";
import { AddNewProduct } from "ui/pages/products/addNewProduct.page";
import { ProductDeleteModal } from "ui/pages/products/delete.modals";
import { ProductsListPage } from "ui/pages/products/productsList.page";

interface IPages {
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProduct: AddNewProduct;
  productDeleteModal: ProductDeleteModal;
}

const test = base.extend<IPages>({
    loginPage: async ({page}, use) => {
        await use(new LoginPage(page));
    },
    homePage: async ({page}, use) => {
        await use(new HomePage(page));
    },
    productsListPage: async ({page}, use) => {
        await use(new ProductsListPage(page));
    },
    addNewProduct: async ({page}, use) => {
        await use(new AddNewProduct(page));
    },
    productDeleteModal: async ({page}, use) => {
        await use(new ProductDeleteModal(page));
    },
});

export {test, expect};
