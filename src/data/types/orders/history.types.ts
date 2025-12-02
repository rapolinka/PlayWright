import { ACTIONS } from "data/salesPortal/orders/actions";
import { IOrderProduct } from "./orders.product.types";
import { IOrderPerformer } from "./performer.types";
import { IOrderID } from "../core.types";
import { STATUS } from "data/salesPortal/orders/status";

export interface IOrderHistory {
  status: STATUS;
  customer: IOrderID; 
  products: IOrderProduct[];
  total_price: number;
  delivery: null; //IOrderDelivery
  changedOn: string;
  action: ACTIONS;
  performer: IOrderPerformer;
  assignedManager:  null; // IOrderManager
}
