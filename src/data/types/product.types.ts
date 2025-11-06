import { MANUFACTURERS } from "data/salesPortal/products/manufactures";
import { ID, IResponseFileds } from "./core.types";

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
    name?: string | null;
    manufacturer?: MANUFACTURERS;
    price?: number | string | null;
    amount?: number | string | null;
    notes?: string | null;
  };
}
