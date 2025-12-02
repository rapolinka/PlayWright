import { STATUS_CODES } from "data/statusCodes";
import { test, expect } from "fixtures";
import { validateResponse } from "utils/validateResponse.utils";

test.describe("[API] [Sales Portal] [Customers]", () => {
  let token = "";
  let id = "";

  test.beforeAll(async ({ loginApiService, customerApiServise }) => {
    token = await loginApiService.loginAsAdmin();
    const createdCustomer = await customerApiServise.create(token);
    id = createdCustomer._id;
  });

  test("Delete Product", async ({ customerApi }) => {
    const response = await customerApi.delete(id, token);
    await validateResponse(response, {
      status: STATUS_CODES.DELETED,
    });
  });
});
