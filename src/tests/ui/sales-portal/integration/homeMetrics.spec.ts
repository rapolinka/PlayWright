import { SALES_PORTAL_URL } from "config/env";
import { generateHomeMetricData } from "data/salesPortal/home/generateHomeMetrcicData";
import { test, expect } from "fixtures/business.fixture";
import { formatCurrency } from "utils/formating.utils";

test.describe("[Integretion][Home page]", () => {
  test("Mock home metrics", async ({ loginAsAdmin, homePage, page, mock }) => {
    const metricData = generateHomeMetricData();
    await mock.homePageMetrics({
      Metrics: metricData,
      IsSuccess: true,
      ErrorMessage: null,
    });
    await loginAsAdmin();
    await page.goto(SALES_PORTAL_URL + "home");
    await homePage.waitForOpened();

    const formattedTotalRevenue = formatCurrency(metricData.orders.totalRevenue);
    const formattedOrderValue = formatCurrency(metricData.orders.averageOrderValue);

    expect.soft (await homePage.ordersThisYearValue.innerText()).toEqual(metricData.orders.totalOrders.toString());
    expect.soft (await homePage.totalRevenueValue.innerText()).toEqual(formattedTotalRevenue);
    expect.soft (await homePage.newCustomersValue.innerText()).toEqual(metricData.customers.totalNewCustomers.toString())
    expect.soft (await homePage.avgOrderValue.innerText()).toEqual(formattedOrderValue);
    expect.soft (await homePage.canceledOrdersValue.innerText()).toEqual(metricData.orders.totalCanceledOrders.toString());    
  });
});
