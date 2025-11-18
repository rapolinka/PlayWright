import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { convertToFullDateAndTime } from "utils/date.utils";

test.describe("[E2E][Sales Portal][Products]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Products Details ", async ({
    loginUIServise,
    productsApiService,
    homeUIServise,
    productsListUIServise,
    productsListPage,
  }) => {
    token = await loginUIServise.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIServise.openModuleButton("Products");

    await productsListUIServise.openDetailsModal(createdProduct.name);
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();

    const actual = await detailsModal.getData();
    console.log(actual);
    await expect(actual).toEqual({
      ..._.omit(createdProduct, ["_id"]),
      createdOn: convertToFullDateAndTime(createdProduct.createdOn),
    });
  });
});
 