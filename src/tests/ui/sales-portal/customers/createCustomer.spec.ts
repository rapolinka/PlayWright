import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { expect, test } from "fixtures/business.fixture";

test.describe("[E2E][Sales Portal][Create Product]", async () => {
  let id = "";
  let token = "";

  test.beforeEach(
    async ({ loginUIServise, homeUIServise, customerListUIServise }) => {
      token = await loginUIServise.loginAsAdmin();
      await homeUIServise.openModuleButton("Customers");
      await customerListUIServise.openAddNewCustomerPage();
    }
  );

  test.afterEach(async ({ customerApiServise }) => {
    if (id) await customerApiServise.delete(token, id);
    id = "";
  });

  test("Create customer with servises", async ({
    addNewCustomerUIServise,
    customerListPage,
  }) => {
    const createdCustomer = await addNewCustomerUIServise.create();
    id = createdCustomer._id;

    await expect(customerListPage.toastMessage).toContainText(
      NOTIFICATIONS.CUSTOMER_CREATED
    );
    await expect(
      customerListPage.tableRowByName(createdCustomer.name)
    ).toBeVisible();
  });
});
