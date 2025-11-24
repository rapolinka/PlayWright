import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IrequestOptions } from "data/types/core.types";
import { ICustomer, ICustomerFromResponse, ICustomerResponse } from "data/types/customer.types";

export class CustomerApi {
  constructor(private apiClinet: IApiClient) {}

  // async create( token: string, customer: ICustomer,) {
  //   const options: IrequestOptions = {
  //     baseUrl: apiConfig.baseUrl,
  //     url: apiConfig.endpoints.customers,
  //     method: "post",
  //     headers: {
  //       "content-type": "application/json",
  //       authorization: `Bearer ${token}`,
  //     },
  //     data: customer,
  //   };
  //   return await this.apiClinet.send<ICustomerResponse>(options);
  // }


   async delete(_id: string, token: string) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.customerById(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    return await this.apiClinet.send<null>(options);
  }
}
