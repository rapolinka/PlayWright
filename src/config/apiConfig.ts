import { SALES_PORTAL_API_URL } from "./env";

export const apiConfig = {
  baseUrl: SALES_PORTAL_API_URL,
  endpoints: {
    login: "/api/login",
    products: "/api/products",
    productDelete: (id: string) => `/api/products/${id}/`,
    productById: (id: string) => `/api/products/${id}/`,
    allProducts: "/api/products/all",
    metrics: "/api/metrics",
    customers: "/api/customers",
    customerById: (id: string) => `/api/customers/${id}/`,
    orders: "/api/orders",
    orderDelete: (id: string) => `/api/orders${id}/`
  },
};