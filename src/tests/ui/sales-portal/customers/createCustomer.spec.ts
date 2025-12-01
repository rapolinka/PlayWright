import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";
import { expect, test } from "fixtures/business.fixture";

test.describe("[E2E][Sales Portal][Create Product]", async () => {
  let id = "";
  let token = "";

  test.beforeEach(async ({ homeUIServise, customerListUIServise }) => {
    await homeUIServise.open();
    await homeUIServise.openModuleButton("Customers");
    await customerListUIServise.openAddNewCustomerPage();
  });

  test.afterEach(async ({ customerApiServise }) => {
    if (id) await customerApiServise.delete(token, id);
    id = "";
  });

  test("Create customer with servises",
    {
      tag: [TAGS.REGRESSION, TAGS.SMOKE, TAGS.UI]
    }, async ({
    addNewCustomerUIServise,
    customerListPage,
  }) => {
    token = await customerListPage.getAuthToken();
    const createdCustomer = await addNewCustomerUIServise.create();
    id = createdCustomer._id;

    await expect(customerListPage.toastMessage, "Notification for a created customer should contain corresponding text").toContainText(
      NOTIFICATIONS.CUSTOMER_CREATED
    );
    await expect(customerListPage.tableRowByName(createdCustomer.name), "Created customer name should present in customer table").toBeVisible();
  });
});
