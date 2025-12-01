import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";
import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { convertToFullDateAndTime } from "utils/date.utils";
// Реализовать е2е тест со следующими шагами:
//   - залогиниться
//   - Создать продукт через API
//   - Перейти на страницу Edit Product
//   - Заполнить поля валидными данными
//   - Сохранить продукт
//   - Проверить продукт в таблице
//   - Открыть модалку деталей продукта
//   - Проверить данные в модалке

//   За собой удаляем продукт через апи, разумеется:)

test.describe("[E2E] Products", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Verify that the product can be edit and the information accordingly updated",
    {
      tag: [TAGS.REGRESSION, TAGS.SMOKE, TAGS.UI]
    }, async ({
    productsApiService,
    homeUIServise,
    productsListUIServise,
    editProductUIServise,
    detailsProductUIServise,
    productsListPage,
  }) => {
    token = await productsListPage.getAuthToken();
    await homeUIServise.open();
    // token = await loginUIServise.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIServise.openModuleButton("Products");
    await productsListUIServise.openEditModal(createdProduct.name);

    //обновляем продукт и кладем значение в переменную для сравнения
    const updatedProduct = await editProductUIServise.updateProduct(id);
    await productsListPage.waitForNotification(NOTIFICATIONS.PRODUCT_UPDATED);

    const productDataInTable =
      await productsListUIServise.getProductDataInTable(updatedProduct);
    expect(productDataInTable).toEqual({
      name: updatedProduct.name,
      price: updatedProduct.price,
      manufacturer: updatedProduct.manufacturer,
      createdOn: productDataInTable.createdOn,
    });

    await productsListUIServise.openDetailsModal(updatedProduct.name);
    const productDataInDetailsModal =
      await detailsProductUIServise.getProductInDetailsModal(updatedProduct);
    expect(productDataInDetailsModal, "Products table: updated product row should match edited product data").toEqual({
      name: updatedProduct.name,
      amount: updatedProduct.amount,
      price: updatedProduct.price,
      manufacturer: updatedProduct.manufacturer,
      createdOn: convertToFullDateAndTime(updatedProduct.createdOn),
      notes: updatedProduct.notes,
    });
  });
});
