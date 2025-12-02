import { ICreatedOn } from "./product.types";
import { ICustomerID, ID, IResponseFileds } from "./core.types";
import { COUNTRY } from "data/salesPortal/customers/counties";
import { STATUS_CODES } from "data/statusCodes";

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
    ICustomerID {}

export interface ICustomerResponse extends IResponseFileds {
  Customer: ICustomerFromResponse;
}


export interface ICreateCustomerCases {
  title: string;
  customerData: ICustomer;
}