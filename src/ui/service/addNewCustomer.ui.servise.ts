import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { ICustomer, ICustomerResponse } from "data/types/customer.types";
import _ from "lodash";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { CustomerListPage } from "ui/pages/customers/customerList";
import { logStep } from "utils/report/logStep.utils";

export class AddNewCustomerUIServise {
  customerListPage: CustomerListPage;
  addNewCustomerPage: AddNewCustomerPage;

  constructor(private page: Page) {
    this.customerListPage = new CustomerListPage(page);
    this.addNewCustomerPage = new AddNewCustomerPage(page);
  }

@logStep("Create a new customer and come back to Customer List page")  
async create(customerData?: Partial<ICustomer>) {
    const data = generateCustomerData(customerData);
    await this.addNewCustomerPage.fillForm(data);
    const response = await this.addNewCustomerPage.interceptResponse<ICustomerResponse, any>(
      apiConfig.endpoints.customers,
      this.addNewCustomerPage.clickSave.bind(this.addNewCustomerPage),
    );
    expect(response.status, `Expected response status to be ${STATUS_CODES.CREATED}`).toBe(STATUS_CODES.CREATED);
    expect(_.omit(response.body.Customer,"Customer from response should match created cutomer", "_id", "createdOn")).toEqual(data);

    await this.customerListPage.waitForOpened();
    return response.body.Customer;
  }
}
