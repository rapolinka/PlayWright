import { IApiClient } from "api/apiClients/types";
import { apiConfig } from "config/apiConfig";
import { IrequestOptions } from "data/types/core.types";
import {
  IOrder,
  IOrderRequest,
  IOrderResponse,
} from "data/types/orders/orders.types";

export class OrdersApi {
  constructor(private apiClinet: IApiClient) {}

  async create(token: string, payload: IOrderRequest) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.orders,
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: payload,
    };
    return await this.apiClinet.send<IOrderResponse>(options);
  }

  async delete(token: string, _id: string) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.orderDelete(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClinet.send<null>(options);
  }
}
