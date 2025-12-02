import { test as base, expect } from "@playwright/test";
import { LoginApi } from "api/apiClients/login.api";
import { RequestApi } from "api/apiClients/requestApi";
import { ProductsApi } from "api/api/products.api";
import { CustomerApi } from "api/api/customers.api";
import { ProductsApiService } from "api/service/product.service";
import { LoginService } from "api/service/login.service";
import { CustomerApiServise } from "api/service/customer.service";
import { OrdersApi } from "api/api/orders.api";

export interface IApi {
  //   api
  productsApi: ProductsApi;
  loginApi: LoginApi;
  customerApi: CustomerApi;
  ordersApi: OrdersApi;

  //services
  productsApiService: ProductsApiService;
  loginApiService: LoginService;
  customerApiServise: CustomerApiServise;
}

const test = base.extend<IApi>({
  //api
  productsApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new ProductsApi(apiClient);
    await use(api);
  },

  loginApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new LoginApi(apiClient);
    await use(api);
  },

   customerApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new CustomerApi(apiClient);
    await use(api);
  },
  ordersApi: async ({ request }, use) => {
    const apiClient = new RequestApi(request);
    const api = new OrdersApi(apiClient);
    await use(api);
  },

  //services
  productsApiService: async ({ productsApi }, use) => {
    await use(new ProductsApiService(productsApi));
  },

  loginApiService: async ({ loginApi }, use) => {
    await use(new LoginService(loginApi));
  },
  customerApiServise: async ({ customerApi }, use) => {
    await use(new CustomerApiServise(customerApi));
  },
});

export { test, expect };
