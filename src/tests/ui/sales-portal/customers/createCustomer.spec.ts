// Реализовать E2E тест по созданию покупателя (модуль Customers) по аналогии c Products с шагами
//   - залогиниться
//   - Перейти на страницу Customers List
//   - Перейти на страницу Add New Customer
//   - Заполнить поля валидными данными
//   - Сохранить покупателя
//   - Проверить наличие покупателя в таблице
// - Удалить покупателя через API

import { apiConfig } from "config/apiConfig";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { STATUS_CODES } from "data/statusCodes";
import { expect, test } from "fixtures/business.fixture";

//   Требования найдете в валидационных сообщениях на фронте:)
// Уникальное поле - Email

test.describe("[E2E][Sales Portal][Create Product]", async () => {
  let id = "";
  let token = "";


  test("Create customer with servises", async ({
    loginUIServise,
    homeUIServise,
    customerListUIServise,
    addNewCustomerUIServise,
  
  }) => {
    token = await loginUIServise.loginAsAdmin();
    await homeUIServise.openModuleButton("Customers");
    await customerListUIServise.openAddNewCustomerPage();
    await addNewCustomerUIServise.create();
    // id = createdCustomer._id;

  });
});
