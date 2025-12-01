import { SALES_PORTAL_URL } from "config/env";
import { POSITIVE_CREATE_CASES_HOME_METRICS } from "data/salesPortal/home/homeMetrics.ddt.data";
import { generateHomeMetricData } from "data/salesPortal/home/generateHomeMetrcicData";
import { test, expect } from "fixtures/business.fixture";
import { formatCurrency } from "utils/formating.utils";
import { TAGS } from "data/tags";

test.describe("[Integration][Mock][Home metrics]", () => {
  for (const tc of POSITIVE_CREATE_CASES_HOME_METRICS) {
    test(
      `${tc.title}`,
      {
        tag: [TAGS.REGRESSION, TAGS.UI],
      },
      async ({ homeUIServise, homePage, mock }) => {
        const metricData = generateHomeMetricData();
        await mock.homePageMetrics({
          Metrics: metricData,
          IsSuccess: true,
          ErrorMessage: null,
        });
        await homeUIServise.open();

        const formattedTotalRevenue = formatCurrency(
          metricData.orders.totalRevenue
        );
        const formattedOrderValue = formatCurrency(
          metricData.orders.averageOrderValue
        );

        expect
          .soft(
            await homePage.ordersThisYearValue.innerText(),
            "Home metrics: 'Orders This Year' value should match totalOrders from mocked data"
          )
          .toEqual(metricData.orders.totalOrders.toString());
        expect
          .soft(
            await homePage.totalRevenueValue.innerText(),
            "Home metrics: 'Total Revenue' value should match formattedTotalRevenue from mocked data"
          )
          .toEqual(formattedTotalRevenue);
        expect
          .soft(
            await homePage.newCustomersValue.innerText(),
            "Home metrics: 'New Customers' value should match totalNewCustomers from mocked data"
          )
          .toEqual(metricData.customers.totalNewCustomers.toString());
        expect
          .soft(
            await homePage.avgOrderValue.innerText(),
            "Home metrics: 'Avg Order Value' value should match formattedOrderValue from mocked data"
          )
          .toEqual(formattedOrderValue);
        expect
          .soft(await homePage.canceledOrdersValue.innerText(), "Home metrics: 'Canceled Orders' value should match totalCanceledOrders from mocked data")
          .toEqual(metricData.orders.totalCanceledOrders.toString());
      }
    );
  }
});
