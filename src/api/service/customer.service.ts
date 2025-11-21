// export class ProductsApiService {
//   constructor(private productsApi: ProductsApi) {}

import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";

import { ICustomer, ICustomerResponse } from "data/types/customer.types";
import { IResponse, IResponseFileds } from "data/types/core.types";
import { validateResponse } from "utils/validateResponse.utils";
import { STATUS_CODES } from "data/statusCodes";

export class CustomerApiServise {
  // constructor(private customerApi: CustomerApi) {}

  // async create(token: string, productData?: ICustomer) {
  //   const data = generateCustomerData(productData);
  //   const response = await this.customerApi.create(token, data);
  //   validateResponse(response, {
  //     status: STATUS_CODES.CREATED,
  //     IsSuccess: true,
  //     ErrorMessage: null,
  //   });

  //   return response.body.Customer;
  // }

  // async delete(token: string, id: string) {
  //   const response = await this.customerApi.delete(id, token);
  //   validateResponse(response, {
  //     status: STATUS_CODES.DELETED,
  //   });
  // }
}
