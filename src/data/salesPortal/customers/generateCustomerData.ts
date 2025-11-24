import { ICustomer } from "data/types/customer.types";
import { faker } from "@faker-js/faker";

import { getRandomEnumValue } from "utils/enum.utils";
import { COUNTRY } from "./counties";

  export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: `test${Date.now()}@gmail.com`,
    name: faker.person.firstName() + " " + faker.person.lastName(),
    country: getRandomEnumValue(COUNTRY),
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int({ min: 1, max: 99 }),
    flat: faker.number.int({ min: 1, max: 99}),
    phone: "+" + faker.string.numeric(11),
    notes: faker.string.alphanumeric(50),
    ...params,
  };
}


