import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[E2E][Sales Portal][Products]", async () => {
  let id = "";
  let token = "";

  test.afterAll(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
  
  test("Add new products with servises", async ({
    loginUIServise,
    homeUIServise,
    productsListUIServise,
    addNewProductUIServise,
    productsListPage,
  }) => {
    token = await loginUIServise.loginAsAdmin();
    await homeUIServise.openModuleButton("Products");
    await productsListUIServise.openAddNewProductPage();
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
