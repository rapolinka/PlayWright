import { test, expect } from "fixtures";
import { IOrderRequest } from "data/types/orders/orders.types";
import { validateResponse } from "utils/validateResponse.utils";
import { STATUS } from "data/salesPortal/orders/status";
import { STATUS_CODES } from "data/statusCodes";

test.describe("[API][Orders][Create Order]", () => {
  let token = "";
  let orderId = "";
  let productId = "";
  let customerId = "";

  test.beforeAll(async ({ loginApiService, productsApiService, customerApiServise }) => {
    //login
    token = await loginApiService.loginAsAdmin();
    //create product
    const createdProduct = await productsApiService.create(token);
    productId = createdProduct._id;
    //create customer
    const createdCustomer = await customerApiServise.create(token);
    customerId = createdCustomer._id;
  });

  test.afterEach(async ({ordersApi}) => {
    if (orderId) {
      await ordersApi.delete(token, customerId);
    }
  })

  test("[API] [Create order]", async ({ ordersApi }) => {
    const payload: IOrderRequest = {
      customer: customerId,
      products: [productId],
    };

    const createOrderResponse = await ordersApi.create(token, payload);
    
    await validateResponse(createOrderResponse, {
      status: STATUS_CODES.CREATED,
      IsSuccess: true,
      ErrorMessage: null,
    });
    
  });
});
