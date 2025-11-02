import { SALES_PORTAL_API_URL } from "./env";


export const apiConfig = {
  baseUrl: SALES_PORTAL_API_URL,
  endpoints: {
    products: "/api/products",
    login: "/api/login",
    productDelete: (id: string) => `/api/products/${id}`,
    allProducts: "/api/products/all",
  },
};
