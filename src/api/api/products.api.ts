import { apiConfig } from "config/apiConfig";
import { IrequestOptions } from "data/types/core.types";
import {
  IProduct,
  IProductResponse,
  IProductsResponse,
} from "data/types/product.types";
import { IApiClient } from "../apiClients/types";

export class ProductsApi {
  constructor(private apiClinet: IApiClient) {}

  async create( token: string, product: IProduct,) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.products,
      method: "post",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: product,
    };
    return await this.apiClinet.send<IProductResponse>(options);
  }

  async update(product: IProduct, token: string, _id: string) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.productById(_id),
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      data: product,
    };
    return await this.apiClinet.send<IProductResponse>(options);
  }

  async getById(token: string, _id: string) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.productById(_id),
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClinet.send<IProductResponse>(options);
  }

  async getAll(token: string) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.allProducts,
      method: "get",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClinet.send<IProductsResponse>(options);
  }

  async delete(token: string, _id: string) {
    const options: IrequestOptions = {
      baseUrl: apiConfig.baseUrl,
      url: apiConfig.endpoints.productById(_id),
      method: "delete",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    return await this.apiClinet.send<null>(options);
  }
}
