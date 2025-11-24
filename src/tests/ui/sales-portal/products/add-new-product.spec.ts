import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[E2E][Sales Portal][Products]", async () => {
  let id = "";
  let token = "";

  test.beforeEach(
    async ({ loginUIServise, homeUIServise, productsListUIServise }) => {
      token = await loginUIServise.loginAsAdmin();
      await homeUIServise.openModuleButton("Products");
      await productsListUIServise.openAddNewProductPage();
    }
  );

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Add new products with servises", async ({
    addNewProductUIServise,
    productsListPage,
  }) => {
    const createdProduct = await addNewProductUIServise.create();
    id = createdProduct._id;

    await expect(productsListPage.toastMessage).toContainText(
      NOTIFICATIONS.PRODUCT_CREATED
    );
    await expect(
      productsListPage.tableRowByName(createdProduct.name)
    ).toBeVisible();
  });
});
