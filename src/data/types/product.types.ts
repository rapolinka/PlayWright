import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import { ID, IResponseFileds, SortOrder } from "./core.types";

export interface IProduct {
  name: string;
  manufacturer: MANUFACTURERS;
  price: number;
  amount: number;
  notes?: string;
}

export interface ICreatedOn {
  createdOn: string;
}
export interface IProductInTable
  extends Pick<IProduct, "name" | "manufacturer" | "price">,
    ICreatedOn {}

export interface IProductDetails extends Required<IProduct>, ICreatedOn {}

export interface IProductFromResponse
  extends Required<IProduct>,
    ICreatedOn,
    ID {}

export interface IProductResponse extends IResponseFileds {
  Product: IProductFromResponse;
}

export interface IProductsResponse extends IResponseFileds {
  Products: IProductFromResponse[];
}

export interface IProductsSortedResponse extends IProductsResponse {
  total: number;
  page: number;
  limit: number;
  search: string;
  manufacturer: string[];
  sorting: {
    sortField: ProductsSortField;
    sortOrder: SortOrder;
  };
}

export type ProductsSortField = "createdOn" | "manufacturer" | "price" | "name";

export interface ICreatePositiveCase {
  title: string;
  input: {
    name: string;
    manufacturer: MANUFACTURERS;
    price: number;
    amount: number;
    notes?: string;
  };
}
export interface ICreateNegativeCase {
  title: string;
  input: {
    name: string | number;
    manufacturer: MANUFACTURERS;
    price: number | string;
    amount: number | string;
    notes?: string | number;
  };
}

export type ProductsTableHeader = "Name" | "Price" | "Manufacturer" | "Created On";
