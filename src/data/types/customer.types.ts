import { COUNTRY } from "data/salesPortal/products/manufactures";
import { ICreatedOn } from "./product.types";
import { ID, IResponseFileds } from "./core.types";

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRY;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
}

export interface ICustomerFromResponse
  extends Required<ICustomer>,
    ICreatedOn,
    ID {}

export interface ICustomerResponse extends IResponseFileds {
  Customer: ICustomerFromResponse;
}
