// export class ProductsApiService {
//   constructor(private productsApi: ProductsApi) {}

import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";

import { ICustomer, ICustomerResponse } from "data/types/customer.types";
import { IResponse, IResponseFileds } from "data/types/core.types";
import { validateResponse } from "utils/validateResponse.utils";
import { STATUS_CODES } from "data/statusCodes";
import { CustomerApi } from "api/api/customers.api";
import { logStep } from "utils/report/logStep.utils";
import test from "@playwright/test";

export class CustomerApiServise {
  constructor(private customerApi: CustomerApi) {}

  async create(token: string, customerData?: ICustomer) {
    const data = generateCustomerData(customerData);
    const response = await this.customerApi.create(token, data);
    validateResponse(response, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    });

    return response.body.Customer;
  }

  @logStep("Delete customer via API")
  async delete(token: string, id: string) {
    const response = await this.customerApi.delete(id, token);
    await test.step("Check response", async () => {
      validateResponse(response, {
        status: STATUS_CODES.DELETED,
      });
    });
  }
}
