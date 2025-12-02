import { CREATE_CUSTOMER_POSITIVE_CASES } from "data/salesPortal/customers/createCustomer.ddt.data";
import { STATUS_CODES } from "data/statusCodes";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures";
import { validateResponse } from "utils/validateResponse.utils";
import { createCustomerSchema } from "data/schemas/customers/customer.schema";
import _ from "lodash";

test.describe("[API][Products][Create Product with DDT - Positive Tests]", () => {
  let id = "";
  let token = "";

  test.beforeAll(async ({ loginApiService }) => {
    token = await loginApiService.loginAsAdmin();
  });

  test.afterEach(async ({ customerApiServise }) => {
    if (id) await customerApiServise.delete(token, id);
    id = "";
  });

  for (const tc of CREATE_CUSTOMER_POSITIVE_CASES) {
    test(
      tc.title,
      {
        tag: [TAGS.REGRESSION, TAGS.API],
      },
      async ({ customerApi }) => {
        const customerData = tc.customerData;
        const createdCustomer = await customerApi.create(token, customerData);
        await validateResponse(createdCustomer, {
          status: STATUS_CODES.CREATED,
          schema: createCustomerSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        id = createdCustomer.body.Customer._id;

        const actualCustomerData = createdCustomer.body.Customer;
        expect(_.omit(actualCustomerData, ["_id", "createdOn"])).toEqual(
          customerData
        );
      }
    );
  }
});
