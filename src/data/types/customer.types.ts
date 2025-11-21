import { COUNTRY } from "data/salesPortal/products/manufactures";
import { ICreatedOn } from "./product.types";
import { ID, IResponseFileds } from "./core.types";

export interface ICustomer {
  email: string;
  name: string;
  country: COUNTRY;
  city: string;
  street: string;
  house: string;
  flat: string;
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
