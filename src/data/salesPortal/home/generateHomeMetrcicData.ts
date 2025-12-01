import { faker } from "@faker-js/faker";
import { IHomeMetric, IMetricFromResponse } from "data/types/homeMetric.types";

export function generateHomeMetricData(
  params?: Partial<IHomeMetric>
): IHomeMetric {
  return {
    orders: {
      totalRevenue: faker.number.int({ min: 0, max: 1000 }),
      totalOrders: faker.number.int({ min: 0, max: 1000 }),
      averageOrderValue: faker.number.int({ min: 0, max: 1000 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 1000 }),
      recentOrders: [],
      ordersCountPerDay: [],

    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 0, max: 1000 }),
      topCustomers: [],
      customerGrowth: [],
    },
    products: {
      topProducts: [],
    },
  };
}