import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import { IResponseFileds } from "./core.types";

// ORDERS
interface IRecentOrdersCustomer {
  _id: string;
  email: string;
  name: string;
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  createdOn: string;
  notes: string;
}

interface IRecentOrdersProduct {
  _id: string;
  name: string;
  amount: number;
  price: number;
  manufacturer: MANUFACTURERS;
  received: boolean;
}

interface IRecentOrdersAddress {
  country: string;
  city: string;
  street: string;
  house: number;
  flat: number;
}

interface IRecentOrdersDelivery {
  finalDate: string;
  condition: string; // later: union type
  address: IRecentOrdersAddress;
}

interface IRecentOrdersComment {
  _id: string;
  text: string;
  createdOn: string;
}

interface IRecentOrdersHistory {
  status: string;
  customer: string;
  products: IRecentOrdersProduct[];
  totalPrice: number;
  action: string; // later: union type
  changedOn: string;
}

interface IRecentOrder {
  _id: string;
  status: string;
  customer: IRecentOrdersCustomer;
  products: IRecentOrdersProduct[];
  total_price: number;
  createdOn: string;
  delivery: IRecentOrdersDelivery;
  comments: IRecentOrdersComment[];
  history: IRecentOrdersHistory[];
}

// COMMON DATE/COUNT
interface IDateInfo {
  year: number;
  month: number;
  day: number;
}

interface IOrdersCountPerDay {
  date: IDateInfo;
  count: number;
}

// ORDERS SECTION
interface IOrders {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IRecentOrder[];
  ordersCountPerDay: IOrdersCountPerDay[];
}

// CUSTOMERS SECTION
interface ITopCustomer {
  customerName: string;
  customerEmail: string;
  totalSpent: number;
  ordersCount: number;
}

interface ICustomers {
  totalNewCustomers: number;
  topCustomers: ITopCustomer[];
  customerGrowth: IOrdersCountPerDay[];
}

// PRODUCTS SECTION
interface ITopProduct {
  name: string;
  sales: number;
}

interface IProducts {
  topProducts: ITopProduct[];
}

// ALL SECTIONS
export interface IHomeMetric {
  orders: IOrders;
  customers: ICustomers;
  products: IProducts;
}

// FULL RESPONSE
export interface IMetricFromResponse extends IResponseFileds {
  Metrics: IHomeMetric;
}

export interface IHomeMetricTestCases {
  title: string;
}