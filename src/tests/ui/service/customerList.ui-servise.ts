import { Page } from "@playwright/test";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomerListPage } from "ui/pages/customers/customerList";
import { HomePage } from "ui/pages/home.page";

export class CustomerListUIServise {
  homePage: HomePage;
  customerListPage: CustomerListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.customerListPage = new CustomerListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

  async openAddNewCustomerPage() {
    await this.customerListPage.clickAddNewCustomer();
    await this.addNewCustomerPage.waitForOpened();
  }
}
