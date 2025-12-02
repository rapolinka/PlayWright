import { STATUS } from "data/salesPortal/orders/status";
import { ICustomerFromResponse } from "../customer.types";
import { IOrderHistory } from "./history.types";
import { IOrderProduct } from "./orders.product.types";
import { ICustomerID, ID, IOrderID, IResponseFileds } from "../core.types";

export interface IOrder {
  _id: IOrderID;
  status: STATUS; 
  customer: ICustomerFromResponse;
  products: IOrderProduct[];
  delivery: null; // IOrderDelivery
  total_price: number;
  createdOn: string; 
  comments: []; //IOrderComment[]
  history: IOrderHistory[];
  assignedManager: null; //IOrderManager
}

export interface IOrderResponse extends IResponseFileds {
  Order: IOrder;
}

export interface IOrderRequest {
  customer: string,
  products: string[];

}