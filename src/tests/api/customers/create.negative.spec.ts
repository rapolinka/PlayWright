import { CREATE_CUSTOMER_NEGATIVE_CASES, CREATE_CUSTOMER_POSITIVE_CASES } from "data/salesPortal/customers/createCustomer.ddt.data";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures";
import { validateResponse } from "utils/validateResponse.utils";
import { createCustomerSchema } from "data/schemas/customers/customer.schema";
import _ from "lodash";
import { ERROR_MESSAGE } from "data/salesPortal/notifications";

test.describe("[API][Products][Create Product with DDT - Negative Tests]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customerApiServise }) => {
    if (id) await customerApiServise.delete(token, id);
    id = "";
  });

  for (const tc of CREATE_CUSTOMER_NEGATIVE_CASES) {
    test(
      tc.title,
      {
        tag: [TAGS.REGRESSION, TAGS.API],
      },
      async ({ customerApi }) => {
        const customerData = tc.customerData;
        const createdCustomer = await customerApi.create(token, customerData);
        await validateResponse(createdCustomer, {
          status: STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: ERROR_MESSAGE.BAD_REQUEST,
        });

      }
    );
  }
});
