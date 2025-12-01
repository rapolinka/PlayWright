import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[E2E][Sales Portal][Products]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test(
    "Add new products with servises",
    {
      tag: [TAGS.REGRESSION, TAGS.SMOKE, TAGS.UI],
    },
    async ({ addNewProductUIServise, productsListPage }) => {

      await addNewProductUIServise.open();
      const createdProduct = await addNewProductUIServise.create();
      id = createdProduct._id;
      token = await productsListPage.getAuthToken();

      await expect(productsListPage.toastMessage, "Notification for a created product should contain corresponding text").toContainText(
        NOTIFICATIONS.PRODUCT_CREATED
      );
      await expect(
        productsListPage.tableRowByName(createdProduct.name),  "Created product name should present in product table").toBeVisible();
    }
  );
});
